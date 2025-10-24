import { Text, StyleSheet, View, SafeAreaView, ImageBackground } from 'react-native'
import React, { Component, useEffect, useState } from 'react'

export default function ImageScreen() {

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>¡Bienvenido a la app!</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={
          require('../assets/fondazo.jpg')
        }
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}> ¡Bienvenido!</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );

}


// Estilos
const styles = StyleSheet.create({


  splashContainer: {
    flex: 1,
    backgroundColor: '#000000ff',
    justifyContent: 'center',
    alignItems: 'center',
  },


  splashText: {
    fontSize: 24,
    color: '#fff',
  },


  background: {
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
  },


  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
});