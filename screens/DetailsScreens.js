import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Barometer, LightSensor } from 'expo-sensors';

const DetailsScreen = () => {
  const [pressure, setPressure] = useState(0);
  const [illuminance, setIlluminance] = useState(0);

  useEffect(() => {
    const barometerSubscription = Barometer.addListener(({ pressure }) => {
      setPressure(pressure);
    });

    const lightSubscription = LightSensor.addListener(({ illuminance }) => {
      setIlluminance(illuminance);
    });

    Barometer.setUpdateInterval(1000);
    LightSensor.setUpdateInterval(1000);

    return () => {
      barometerSubscription && barometerSubscription.remove();
      lightSubscription && lightSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pressão Atmosférica: {pressure.toFixed(2)} hPa</Text>
      <Text style={styles.text}>Luminosidade: {illuminance.toFixed(2)} lx</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default DetailsScreen;
