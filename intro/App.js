//1. imports: Zona de importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React,{useState} from 'react';

//2. Mainimports: Zona de componentes
export default function App() {

const[contador, setContador]= useState(0);  

  return (
    <View style={styles.container}>
      <Text>Contador: {contador} </Text>
      <Button title='Agregar' onPress={()=> setContador(contador+1)}/>
      <Button title="Decrementar" onPress={()=> setContador(contador-1)}/>
      <Button title="Reiniciar" onPress={()=> setContador(0)}/>
      <StatusBar style="auto" />
    </View>
  );
}

//3. Estilos: Zona estetica y posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
