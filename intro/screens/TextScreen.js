import { Text, StyleSheet, View, TextInput, Button, Alert, Switch} from 'react-native'
import React, { useEffect, useState} from 'react'


export default function TextScreen() {

    const [nombre, setNombre] = useState('');
    const [Password,setPassword]= useState("");
    const [comentario,setComentario]=useState('');

    // Esta alerta se ejecutara directamente en celular
    const mostrarAlerta = ()=>{
        if ([nombre.trim(), Password.trim(), comentario.trim()].includes('')){
            Alert.alert('Error,Por rellena los campos');
            alert('Error ,Por Favor rellena los campos')
        }else {
            Alert.alert(`Hola, ${nombre}!` ,'Tu nombre ha sido registrado con exito');
            alert(`Hola, ${nombre}! ,Tu nombre ha sido registrado con exito, tu contraseña es: ${Password}!`);
            setNombre('');
        }
    };


    return (
        <View style={styles.container}>
        <Text style={styles.label}>Ingresa tu nombre</Text>

        <TextInput
            style={styles.input}
            placeholder="Ej. Gabriel"
            value={nombre}
            onChangeText={setNombre}
            keyboardType="default"
            autoCapitalize="words"
        />

        <TextInput
        style={styles.input}
        value={Password}
        onChangeText={setPassword}
        placeholder='Ej. Password'
        keyboardType='numeric'
        secureTextEntry= {true}
        />

        <TextInput
        style={styles.input}
        value={comentario}
        onChangeText={setComentario}
        multiline={true}
        numberOfLines={4}
        />
        <Button
        title='Saludar'
        onPress={mostrarAlerta}
        color="purple"
        />

        </View>
    )
}

// 4. Estilos para nuestros componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1, //Sirve para ver el borde del input
    borderRadius: 8, // Bordes redondeados
    paddingHorizontal: 15, // Espacio interno a los lados
    marginBottom: 20, // Espacio debajo del input
    fontSize: 16,
  },
});