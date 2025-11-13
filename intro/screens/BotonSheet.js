import { Text, StyleSheet, View, Dimensions, Animated, TouchableOpacity, PanResponder } from 'react-native'
import React, { useRef } from 'react'

export default function BottomSheetScreens() {

  const { height } = Dimensions.get("window");
  const BottomSheetHeight = height * 0.6;
  const startPosition = height - 100;
  const AnimatedValue = useRef(new Animated.Value(startPosition)).current;

  const topLimit = height - BottomSheetHeight;
  const bottomLimit = startPosition;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gestureState) => {
        let newY = gestureState.moveY;

        if (newY < topLimit) newY = topLimit;
        if (newY > bottomLimit) newY = bottomLimit;

        AnimatedValue.setValue(newY);
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.vy < -0.5 || gestureState.moveY < height / 2) {
          openSheet();
        } else {
          closeSheet();
        }
      },
    })
  ).current;

  const openSheet = () => {
    Animated.spring(AnimatedValue, {
      toValue: topLimit,
      useNativeDriver: false,
      tension: 50,
    }).start();
  };

  const closeSheet = () => {
    Animated.spring(AnimatedValue, {
      toValue: bottomLimit,
      useNativeDriver: false,
      tension: 50,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BottomSheet Arrastrable</Text>

      <TouchableOpacity style={styles.btn} onPress={openSheet}>
        <Text style={styles.btnText}>Abrir</Text>
      </TouchableOpacity>

      <Animated.View
        pointerEvents="auto"
        style={[
          styles.overlay,
          {
            opacity: AnimatedValue.interpolate({
              inputRange: [topLimit, bottomLimit],
              outputRange: [0.5, 0],
            }),
          },
        ]}
      />

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            top: AnimatedValue,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>OPCIONES</Text>

        <Text style={styles.option}>Perfil</Text>
        <Text style={styles.option}>Configuración</Text>
        <Text style={styles.option}>Ayuda</Text>

        <TouchableOpacity onPress={closeSheet}>
          <Text style={[styles.option, { color: 'red', marginTop: 10 }]}>Cerrar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20 },
  btn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: { color: '#fff', fontSize: 16 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: height * 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  handle: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
  },
  sheetTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  option: {
    fontSize: 16,
    paddingVertical: 8,
    textAlign: 'center',
  },
});