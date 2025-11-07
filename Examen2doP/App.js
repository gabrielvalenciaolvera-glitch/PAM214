import { StatusBar } from 'expo-status-bar';
import { useEffect,useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,ImageBackground, Alert } from 'react-native';
import { Button, ScrollView } from 'react-native-web';

export default function App() {

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  if (showSplash){
    return(
      <View style={styles.splashContainer}>
        <Text style={styles.texto}>Hola Examen 2 parcial</Text>

      </View>
    )
  }

  const Alerta =()=>{
    alert("Elige una opcion: /Guardar/ /Cancelar/");
  }
  return (
   
    <View style={{flex: 1}}>
      <ImageBackground
        source={
          require('./assets/fondazo.jpg')
        }
        style={styles.background}
      >
        <View style={styles.overlay}>
          <ScrollView>
          <Text style={styles.title}> ¡Bienvenido!</Text>
          <Text style={styles.texto}>Gabriel Valencia Olvera</Text>
          <Text style={styles.texto}>TIID</Text>
          <Text style={styles.texto}>Gabriel Valencia olvera nacido en el 25 de agosto del 2025 es un chico estudiante de TIID en la UPQ</Text>
          <Text style={styles.texto}> estudio en el CBTIS 118 su preparatoria en Programacion</Text>
          <Text style={styles.texto}> Es amante de los video juegos y de leeer manga</Text>
          <Text style={styles.texto}>GabrielValenciaOlvera@gmail.com</Text>
          <Text style={styles.texto}>Cel: 4426126543</Text>
          <Text style={styles.texto}>lorem</Text>

          <Button onPress={Alerta} title='Editar Perfil' >Editar Perfil</Button>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

   splashContainer: {
    flex: 1,
    backgroundColor: '#000000ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto:{
    color: '#ffff',
    fontSize: 20,
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
    width: 500,
    height: 300,
    borderRadius: 10,
  },


  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },

});
