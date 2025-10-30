import { Text, StyleSheet, View , Button, ActivityIndicator } from 'react-native'
import React, { Component, useState } from 'react'

export default function ActivityIndicatorScreen() {

    const [cargando, setCargando] = useState(false);


    const iniciarCarga = () => {
      setCargando(true);
      setTimeout(()=> setCargando(false), 3000);
    }

    return (


      <View style={styles.container}>
        <Text style={styles.texto}>'Presiona aqui para iniciar carga'</Text>

        <ActivityIndicator
           style={styles.indicador}
           animating={cargando}
           size="large"
           color="purple"
           hidesWhenStopped={true}
        />
        <View style={styles.botonContainer}>

          <Button color='purple' title='iniciar carga' onPress={iniciarCarga} />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  texto: {
    fontFamily: 'Times New Roman',
    marginBottom: 20,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  indicador: {
    marginVertical: 10,
  },
  botonContainer: {
    marginTop: 30,
  },
});