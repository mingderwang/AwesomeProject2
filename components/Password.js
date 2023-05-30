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

const Password = () => {
  return (
    <Box
      w={{
        base: '90%',
        md: '25%',
      }}>
      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" value="12345" placeholder="password" />
          <FormControl.HelperText>
            Must be atleast 6 characters.
          </FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Atleast 6 characters are required.
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default Password;
