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
import x from '../package.json';
console.log(`🍔 Current app version: ${x.version}`);

const TextDemo = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {

      const interval = setInterval(() => {
        AsyncStorage.getItem('readValue')
        .then(value => {
          if (value !== null) {
            setCounter(parseInt(value));
          }
        })
        .catch(error => console.log('AsyncStorage getItem error:', error));
   
      }, 1000); // Interval of 1 second (1000 milliseconds)
  
      // Clean up the interval on component unmount
      return () => {
        clearInterval(interval);
      };
 
    }, []);


  return (
    <Box>
      <Text fontSize="6xl" color="white">
      🍔 {x.version}
      </Text>
    </Box>
  );
};

export default TextDemo;
