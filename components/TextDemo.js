import React from 'react';
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

const TextDemo = () => {
  return (
    <Box>
      <Text fontSize="xs" color="white">
        xs
      </Text>
      <Text fontSize="sm" color="white">
        sm
      </Text>
      <Text fontSize="lg" color="white">
        lg
      </Text>
      <Text fontSize="3xl" color="white">
        3xl
      </Text>
      <Text fontSize="6xl" color="white">
        6xl
      </Text>
    </Box>
  );
};

export default TextDemo;
