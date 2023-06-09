export  function hexToRgbArray(hex: string): number[] {
    // Remove the '#' symbol if present
    hex = hex.replace('#', '');
  
    // Split the hex value into red, green, and blue components
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
  
    // Return an array of the RGB values
    return [red, green, blue];
  }
  
  // Usage example
  const hexColor = '#aa00ff';
  const rgbArray = hexToRgbArray(hexColor);
  console.log(rgbArray); // Output: [170, 0, 255]
  