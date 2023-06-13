/**
 * Sample BLE React Native App
 */
import {NativeBaseProvider, Center} from 'native-base';
import React, {useState, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import ColorControl from './components/ColorControl';
import Volume from './components/Version';
import BLEScan from './components/BLEScan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import x from './package.json';
console.log(`🍔 Current app version: ${x.version}`);

const SECONDS_TO_SCAN_FOR = 7;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;

import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral['id'], Peripheral>(),
  );

  return (
    <>
      <NativeBaseProvider>
        <Swiper loop={false} index={0} showsPagination={true}>
          <ColorControl />
          <BLEScan />
          <Center flex={1} px="3" bg="yellow.400">
            <Volume />
          </Center>
        </Swiper>
      </NativeBaseProvider>
      <StatusBar />
    </>
  );
};

export default App;
