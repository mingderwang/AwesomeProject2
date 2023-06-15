import React, { useState, useEffect } from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Pressable, StyleSheet, View, NativeModules, NativeEventEmitter, } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ColorPicker, { Panel1, Swatches, colorKit, PreviewText, HueCircular } from 'reanimated-color-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';
import { hexToRgbArray } from '../libs/';
import debounce from 'lodash.debounce';
import { Link, Text, Center, NativeBaseProvider, Box } from 'native-base';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SECONDS_TO_SCAN_FOR = 1;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = false;
const COLOR_LED_STRIP_BLE_ID = 'de24da5d-eb58-07c3-403c-61012896a3b1'

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export default function ColorControl() {
  const [color, setColor] = useState('#000000');
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral['id'], Peripheral>(),
  );

  const onColorChange = (newColor: any) => {
    console.log('Color changed:', newColor);
    // Do something with the new color value
    selectedColor.value = newColor.hex;
    console.log(`color: ${selectedColor.value}`)
  AsyncStorage.setItem('hexValue', newColor.hex)
  .then(() => {
    setColor(newColor.hex);
  })
  .catch(error => console.log('AsyncStorage setItem error:', error));
    changeColor(newColor.hex);
  };

  function handleColorChange(newColor: any) {
    AsyncStorage.setItem('hexValue', newColor.hex)
    .then(() => {
      setColor(newColor.hex);
    })
    .catch(error => console.log('AsyncStorage setItem error:', error));
    debouncedOnColorChange(newColor);
  }

  const debouncedOnColorChange = debounce(onColorChange, 500);

  const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());
  const selectedColor = useSharedValue(customSwatches[0]);
  const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value }));

  const handleDiscoverPeripheral = () => {console.log('xx')};
  const handleStopScan = () => {console.log('yy')};
  const handleDisconnectedPeripheral = () => {console.log('zz')};
  function handleUpdateValueForCharacteristic() { console.log('oo'); }

  const changeColor = (color: any) => {
    togglePeripheralConnection(color, {id:COLOR_LED_STRIP_BLE_ID, name:'', advertising: {}, rssi:1});
    console.log('changeColor is called');
  }
  
  useEffect(() => {
    try {
      BleManager.start({showAlert: false})
        .then(() => console.debug('BleManager started.'))
        .catch(error =>
          console.error('BeManager could not be started.', error),
        );
    } catch (error) {
      console.error('unexpected error starting BleManager.', error);
      return;
    }

    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      ),
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
      bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      ),
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      ),
    ];

    BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
      matchMode: BleScanMatchMode.Sticky,
      scanMode: BleScanMode.LowLatency,
      callbackType: BleScanCallbackType.AllMatches,
    })

    return () => {
      for (const listener of listeners) {
        listener.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onColorSelect = (color: any) => {
    selectedColor.value = color.hex;
    console.log(`color: ${selectedColor.value}`)
    changeColor();
    setColor(selectedColor.value)
  };

  const addOrUpdatePeripheral = (id: string, updatedPeripheral: Peripheral) => {
    // new Map() enables changing the reference & refreshing UI.
    // TOFIX not efficient.
    setPeripherals(map => new Map(map.set(id, updatedPeripheral)));
  };

  const connectPeripheral = async (color: any, peripheral: Peripheral) => {
    try {
      if (peripheral) {
        addOrUpdatePeripheral(peripheral.id, {...peripheral, connecting: true});

        await BleManager.connect(peripheral.id);
        console.debug(`[connectPeripheral][${peripheral.id}] connected.`);

        addOrUpdatePeripheral(peripheral.id, {
          ...peripheral,
          connecting: false,
          connected: true,
        });

        // before retrieving services, it is often a good idea to let bonding & connection finish properly
        await sleep(900);

        /* Test read current RSSI value, retrieve services first */
        const peripheralData = await BleManager.retrieveServices(peripheral.id);
        console.debug(
          `[connectPeripheral][${peripheral.id}] retrieved peripheral services`,
          peripheralData,
        );

        if (peripheralData.characteristics) {
          for (let characteristic of peripheralData.characteristics) {
                if (characteristic != undefined) {
                try {
let newValue=0;
  let value=color;
  console.log(`--------------> hex getItem ${value}`);
  const rgbArray = hexToRgbArray(value +'');
  console.log(rgbArray); // Output: [170, 0, 255]

  if (value !== null) {
    newValue = (parseInt(value))
  
     BleManager.writeWithoutResponse(
     peripheral.id,
     characteristic.service,
     characteristic.characteristic,
     rgbArray
   );
}
                } catch (error) {
                  console.debug(
                    `[connectPeripheral][${peripheral.id}] failed to retrieve descriptor ${descriptor} for characteristic ${characteristic}:`,
                    error,
                  );
                }; 
              }
              }
        }
      }
    } catch (error) {
      console.error(
        `[connectPeripheral][${peripheral.id}] connectPeripheral error`,
        error,
      );
    }
  };

  const togglePeripheralConnection = async (color: any, peripheral: Peripheral) => {
    if (peripheral && peripheral.connected) {
      try {
        await BleManager.disconnect(peripheral.id);
      } catch (error) {
        console.error(
          `[togglePeripheralConnection][${peripheral.id}] error when trying to disconnect device.`,
          error,
        );
      }
    } else {
      console.debug(`mingx pl.id -> $ ${peripheral.id}`)
      console.debug(`mingx pl.name -> $ ${peripheral.name}`)
      console.debug(`mingx pl.adv -> $ ${peripheral.advertising}`)
      await connectPeripheral(color, peripheral);
    }
  };

  return (
    <>
    <Text mx="16">蔡勻甄
    </Text>
    <Animated.View style={[styles.container, backgroundColorStyle]}>
          <View style={styles.pickerContainer}>
            <ColorPicker value={selectedColor.value} sliderThickness={20} thumbSize={24} onChange={handleColorChange} boundedThumb>
              <HueCircular containerStyle={styles.hueContainer} thumbShape='pill'>
                <Panel1 style={styles.panelStyle} />
              </HueCircular>
              <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} />
            </ColorPicker>
          </View>
        </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'orange',
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  hueContainer: {
    justifyContent: 'center',
  },
  panelStyle: {
    width: '70%',
    height: '70%',
    alignSelf: 'center',
    borderRadius: 16,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  openButton: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
