import { Text, StyleSheet, View, ImageBackground,TextInput, Alert, Switch, Pressable,TouchableOpacity } from 'react-native'
import React, {useEffect, useState } from 'react'

export default function RepasoScreen() {

    const[showSplash, setShowSplash]= useState(true);


    const[nombre, setNombre] = useState('');
    const[correo, setCorreo]= useState('');
    const[terminos, setTerminos]= useState(false);

    const Alertas = ()=>{
      if(!nombre.trim() && !correo.trim()){
        Alert.alert('Por favor completa todos los campos');
        /*alert('Por favor completa todos los campos');*/
      }else if(!nombre.trim()){
        Alert.alert('Por favor escribe tu nombre');
        //alert('Por favor escribe tu nombre');
      }else if(!correo.trim()){
        Alert.alert('Por favor escribe tu Correo');
        //alert('Por favor escribe tu Correo');
      }else if(!terminos){
        Alert.alert('Por favor Acepta los terminos y condiciones');
        //alert('Por favor Acepta los terminos y condiciones');
      }else{
        Alert.alert('Registro Exitoso', `Nombre: ${nombre}\n Email: ${correo}`);
        /*alert(`Registro Exitoso, Nombre: ${nombre}, Email: ${correo}`);*/
      }
      
      }





    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowSplash(false)
        }, 1000);
        return ()=> clearTimeout(timer);
    }, []);
    if (showSplash){
        return(
            <View style={styles.splash}>
                <ImageBackground
                source={
                    require('../assets/icono2.jpg')
                }
                style={styles.icono}
                />

                <Text style={styles.splashText}>Kaway</Text>
            </View>
        );

    }

    





    return (
      <View style={{flex: 1}}>
        <ImageBackground
            source={ require('../assets/FondoForms.jpg')}
            style={styles.background}
        >

        <View style={styles.overlay}>
          <Text style={styles.TextTitle}>Registro de Usuario</Text>

          <TextInput
            style={styles.input}
            placeholder='Nombre completo'
            value={nombre}
            onChangeText={setNombre}
            keyboardType="default"
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder='Correo electronico'
            value={correo}
            onChangeText={setCorreo}
            keyboardType='email-address'
            autoCapitalize='words'
          
          />
          <View style={styles.TyC}>
          <Text style={styles.text}>Acepte terminos y condiciones</Text>
          <Switch
              style={styles.switch}
              onValueChange={(v)=> setTerminos(v)}
              value={terminos}


          />

                                 

          </View>
          <TouchableOpacity
          style={styles.boton}
          onPress={Alertas}

           >
            <Text style={styles.textoBoton}>Registro</Text>
          </TouchableOpacity>


                  

        </View>




        </ImageBackground>


      </View>
    )
  }

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        backgroundColor: '#000000ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashText:{
        color:'#ffffffff',
        fontSize: 20,
    },
    TextTitle:{
      color: '#f8f8f8ff',
      fontSize: 20,
      marginBottom: 10,
    },
    text:{
      color: '#ffff'
    },
    icono:{
        width:90,
        height:90,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:50,
        overflow:'hidden',
    },
    background: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    color:'#ffffffff',
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1, //Sirve para ver el borde del input
    borderRadius: 8, // Bordes redondeados
    paddingHorizontal: 15, // Espacio interno a los lados
    marginBottom: 20, // Espacio debajo del input
    fontSize: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    height: 300,
  },
  TyC:{
    flexDirection: 'row'
  },
  switch:{
    marginLeft: 10,
  },
  boton:{
    backgroundColor: '#050505ff',
     fontSize: 20,
     color: '#281aebff',
     paddingVertical: 10,
     paddingHorizontal: 20,
     borderRadius: 8,
     alignItems: 'center',
    marginTop:0,
  },
  textoBoton:{
    color: "#0f0bfdff",
    fontSize: 20,
  }
})