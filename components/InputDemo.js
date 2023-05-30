import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Box,
  Center,
  NativeBaseProvider,
  View,
  HStack,
  VStack,
  Pressable,
  Text,
  Image,
  Button,
  ArrowForwardIcon,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputDemo = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Load the counter value from AsyncStorage
    AsyncStorage.getItem('counter')
      .then(value => {
        if (value !== null) {
          setCounter(parseInt(value));
        }
      })
      .catch(error => console.log('AsyncStorage getItem error:', error));
  }, []);

  const incrementCounter = () => {
    const newCounter = counter + 1;

    // Update the counter value in AsyncStorage
    AsyncStorage.setItem('counter', newCounter.toString())
      .then(() => {
        setCounter(newCounter);
      })
      .catch(error => console.log('AsyncStorage setItem error:', error));
  };

  const resetCounter = () => {
    // Reset the counter value in AsyncStorage
    AsyncStorage.removeItem('counter')
      .then(() => {
        let newCounter = 0;
        AsyncStorage.setItem('counter', newCounter.toString())
        .then(() => {
          setCounter(newCounter);
        })
        .catch(error => console.log('AsyncStorage setItem error:', error));
      })
      .catch(error => console.log('AsyncStorage removeItem error:', error));
  };

  return (
    <Box flex={1} bg="blue.200" alignItems="center" justifyContent="center">
  <Center bg="primary.400" _text={{
      color: "white",
      fontWeight: "bold"
    }} height={200} width={{
      base: 200,
      lg: 250
    }}>
      <Box>
      <Box alignSelf="center" // bg="primary.500"
       _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg"
      }} bg={["red.400", "blue.400"]}>
    <Button shadow={2} onPress={incrementCounter}>
     Add
    </Button>
    <Button shadow={2} onPress={resetCounter}>
      
     Reset
    </Button>
    <Text>Counter: {counter}</Text>
      </Box>
      </Box>
      </Center>
    </Box>
  );
};

export default InputDemo;
