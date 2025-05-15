import { View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export default function FirstScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={require('../assets/images/tlo.jpg')}
        style={styles.imageBackground}
      />
      <SafeAreaView style={styles.safeArea}></SafeAreaView>
    </View>
  );
}

