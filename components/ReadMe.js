import React from 'react';
import { Link, Text, Center, NativeBaseProvider, Box } from 'native-base';

const ReadMe = () => {
  return (
    <Box>
      <Text mx="16" fontSize="lg" color="red.600">
        README
      </Text>
      {'\n'}
      <Text mx="16">
        NativeBase is a component library that enables devs to build universal
        design systems. It is built on top of React Native, allowing you to
        develop apps for Android, iOS and the Web.{' '}
        <Link
          href="https://nativebase.io"
          isExternal
          _text={{
            color: 'blue.400',
          }}
          mt={-0.5}
          _web={{
            mb: -2,
          }}>
          Read More
        </Link>{' '}
        <Link
          href="https://docs.nativebase.io/"
          isExternal
          _text={{
            color: 'blue.400',
          }}
          mt={-0.5}
          _web={{
            mb: -2,
          }}>
          Docs
        </Link>{' '}
        <Link
          href="https://kitchensink.nativebase.io/"
          isExternal
          _text={{
            color: 'blue.400',
          }}
          mt={-0.5}
          _web={{
            mb: -2,
          }}>
          Demos
        </Link>
        {' \n'} 🐝 click above links to learn 🚀.
      </Text>
    </Box>
  );
};

export default ReadMe;
