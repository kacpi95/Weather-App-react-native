import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

export default function FirstScreen() {
  const [showSearch, setSearch] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={require('../assets/images/tlo.jpg')}
        style={styles.imageBackground}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBox,
              {
                backgroundColor: showSearch
                  ? 'rgb(255, 255, 255)'
                  : 'transparent',
              },
            ]}
          >
            {showSearch ? (
              <TextInput
                placeholder='Szukaj miasta'
                placeholderTextColor={'lightgray'}
                style={styles.input}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => setSearch(!showSearch)}
              style={styles.searchButton}
            >
              <MagnifyingGlassIcon size={25} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    marginTop: 30,
    height: '7%',
    marginHorizontal: 16,
    position: 'relative',
    zIndex: 50,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
  },
  input: {
    paddingLeft: 24,
    height: 40,
    paddingBottom: 4,
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  searchButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 50,
    padding: 12,
    margin: 4,
  },
});
