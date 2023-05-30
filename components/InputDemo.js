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

const InputDemo = () => {
  return (
    <Box flex={1} bg="yellow.200" alignItems="center" justifyContent="center">
      <Stack space="4">
        <FormControl>
          <Input placeholder="Chat Room ID" />
        </FormControl>
        <Button colorScheme="green" endIcon={<ArrowForwardIcon size="6" />}>
          Join In
        </Button>
      </Stack>
    </Box>
  );
};

export default InputDemo;
