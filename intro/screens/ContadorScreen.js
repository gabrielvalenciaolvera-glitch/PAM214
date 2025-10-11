//1. imports: Zona de importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React,{useState} from 'react';

//2. Mainimports: Zona de componentes
export default function ContadorScreen() {

const[contador, setContador]= useState(0);  

  return (
    <View style={styles.container}>

      <Text style={styles.texto}>Contador:</Text>
      <text style={styles.texto2}>{contador}</text>

      <View style={styles.contenedorBotones}>
      <Button color='purple' title='Agregar' onPress={()=> setContador(contador+1)}/>
      <Button color='purple' title="Quitar" onPress={()=> setContador(contador-1)}/>
      <Button color='purple' title="Reiniciar" onPress={()=> setContador(0)}/>
      </View>

      <StatusBar style="auto" />

    </View>
  );
}

//3. Estilos: Zona estetica y posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0a0cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    color:'#58575cff',
    fontSize:30,
    fontFamily: 'Time New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine:'line-through',

  },
  texto2:{
    color:'#8209a7ff',
    fontSize:40,
    fontFamily: 'Courier',
    fontWeight: '100',
    textDecorationLine:'underline',

  },
  contenedorBotones:{
    marginTop: 20,
    flexDirection:'row',
    gap:15,
  },
});
