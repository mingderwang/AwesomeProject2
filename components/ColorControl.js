import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ColorPicker, { Panel1, Swatches, colorKit, PreviewText, HueCircular } from 'reanimated-color-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ColorControl() {
  const [showModal, setShowModal] = useState(false);

  const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());
  
  const selectedColor = useSharedValue(customSwatches[0]);
  const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value }));

  const onColorSelect = (color) => {
    selectedColor.value = color.hex;
    console.log(`color: ${selectedColor.value}`)
    AsyncStorage.setItem('hexValue', selectedColor.value)
    .then(() => {
      console.debug(`new hex value ${selectedColor.value} is saved`);
    })
  };

  return (
    <>
    <Animated.View style={[styles.container, backgroundColorStyle]}>
          <View style={styles.pickerContainer}>
            <ColorPicker value={selectedColor.value} sliderThickness={20} thumbSize={24} onChange={onColorSelect} boundedThumb>
              <HueCircular containerStyle={styles.hueContainer} thumbShape='pill'>
                <Panel1 style={styles.panelStyle} />
              </HueCircular>
              <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} />
              <View style={styles.previewTxtContainer}>
                <PreviewText style={{ color: '#707070' }} colorFormat='hsl' />
              </View>
            </ColorPicker>
          </View>
        </Animated.View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'orange',
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  hueContainer: {
    justifyContent: 'center',
  },
  panelStyle: {
    width: '70%',
    height: '70%',
    alignSelf: 'center',
    borderRadius: 16,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  openButton: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
