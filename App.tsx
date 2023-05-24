import React, { useEffect, useState } from 'react';
import { View, Text, Button , NativeModules} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';

const App = () => {

  interface Device {
    id: string;
    name: string | null;
    // Add other properties as per your requirements
  } 
  const peripherals = new Map();
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const BleManagerModule = NativeModules.BleManager;
  const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  const scanDevices = () => {
    BleManager.checkState().then((state) =>
  console.log(`scanning, current BLE state = '${state}'.`)
);

    if (!isScanning) {
    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning started');
        setIsScanning(true);
      })
      .catch((error) => {
        console.log('Failed to start scanning', error);
      });
    } else {
      console.log('duplicate scanning')
    }
  };

  const readCharacteristic = () => {
    if (connectedDevice) {
      const serviceUUID = 'YOUR_SERVICE_UUID';
      const characteristicUUID = 'YOUR_CHARACTERISTIC_UUID';

      BleManager.read(connectedDevice.id, serviceUUID, characteristicUUID)
        .then((data) => {
          console.log('Read characteristic', data);
          // Handle the received data
        })
        .catch((error) => {
          console.log('Failed to read characteristic', error);
        });
    }
  };
  
  useEffect(() => {
    BleManager.checkState().then((state) =>
  console.log(`2 current BLE state = '${state}'.`)
);

    console.log('useEffect2 is in!');
    const discoverPeripheralListener = DeviceEventEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      (device: Device) => {
        // Update the list of discovered devices
        console.log('BLE found' + device.name + device.id);
        setDevices((prevDevices) => [...prevDevices, device]);
      }
    );

    return () => {
      discoverPeripheralListener.remove();
    };
  }, []);

  useEffect(() => {
    BleManager.checkState().then((state) =>
  console.log(`3 current BLE state = '${state}'.`)
);

    let stopListener = BleManagerEmitter.addListener(
   'BleManagerStopScan',
   () => {
     setIsScanning(false);
     console.log('Scan is stopped');
   },
 );
}, []);

  useEffect(() => {
    BleManager.checkState().then((state) =>
  console.log(`4 current BLE state = '${state}'.`)
);

    // turn on bluetooth if it is not on
      console.log('useEffect is in!');
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    })
      BleManager.start({ showAlert: true })
      .then(() => {
        console.log('Bluetooth module initialized');
        BleManager.checkState().then((state) =>
  console.log(`after start, urrent BLE state = '${state}'.`)
);

      })
      .catch((error) => {
        console.log('Failed to initialize Bluetooth module', error);
      });
    
  }, []);

  const connectToDevice = (device: Device) => {
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to device', device.id);
        setConnectedDevice(device);
      })
      .catch((error) => {
        console.log('Failed to connect to device', device.id, error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Connected Device</Text>
      <Button title="Scan Devices" onPress={scanDevices} />
      {devices.map((device: Device) => (
      <Button
          key={device.id}
          title={`Connect to ${device.name || 'Unknown Device'}`}
          onPress={() => connectToDevice(device)}
        />
        ))}
        <Button title="Read Characteristic" onPress={readCharacteristic} disabled={!connectedDevice} />
        </View>
  );
};

export default App;
