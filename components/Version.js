import React, {useState, useEffect} from 'react';
import {Box, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import x from '../package.json';
console.log(`🍔 Current app version: ${x.version}`);

const Volume = () => {
  return (
    <Box>
      <Text fontSize="6xl" color="white">
        🍔 {x.version}
      </Text>
    </Box>
  );
};

export default Volume;
