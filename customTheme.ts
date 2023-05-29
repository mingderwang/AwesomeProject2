import { extendTheme } from 'native-base';

const customTheme = extendTheme({
  colors: {
    // Define your custom colors here
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    secondary: {
      // ...
    },
  },
  fonts: {
    // Define your custom fonts here
    body: 'Roboto, sans-serif',
    heading: 'Montserrat, sans-serif',
    mono: 'Menlo, monospace',
  },
  components: {
    // Define your custom component styles here
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      sizes: {
        lg: {
          py: 4,
          px: 8,
        },
        md: {
          py: 3,
          px: 6,
        },
        sm: {
          py: 2,
          px: 4,
        },
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
        outline: {
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
          },
        },
      },
    },
    // ...
  },
});

export { customTheme };
