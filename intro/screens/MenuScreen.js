import { Text, StyleSheet, View, Button } from 'react-native'
import React, { useState } from 'react'
import ContadorScreen from './ContadorScreen'
import BotonesScreen from './BotonesScreen'
import TextScreen from './TextScreen';
import ImageScreen from './ImageScreen';
import { ScrollView } from './ScrollViewScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen, { FlatList } from './FlatListScreen';
import ModalScreen from './ModalScreen';

export default function MenuScreen() {

    const[screen,setCreen]=useState('menu');

    switch(screen){
        case'contador':
            return<ContadorScreen/>
        case'botones':
            return<BotonesScreen/>
        case'Text input':
            return<TextScreen/>
        case'ImageBackground':
            return<ImageScreen/>
        case'ScrollView':
            return<ScrollView/>
        case'ActivityIndicator':
            return <ActivityIndicatorScreen/>
        case'FlatList':
            return<FlatListScreen/> 
        case'Modal':
            return<ModalScreen/>
        case 'menu':
            default:
                return (
                    <View style={styles.container}>
                    <Text style={styles.texto}> Menu de Practicas </Text>
                    <View style={styles.contenedorBotones}>
                    <Button color='purple'  onPress={()=>setCreen('contador')} title='Pract: Contador'/>
                    <Button color='purple'  onPress={()=>setCreen('botones')} title='Pract:Buttons'/>
                    <Button color='purple'  onPress={()=>setCreen('Text input')} title='Pract:Text Input & Alert'/>
                    <Button color='purple'  onPress={()=>setCreen('ImageBackground')} title='Pract:ImageBackground & SlapshScreen'/>
                    <Button color='purple'  onPress={()=>setCreen('ScrollView')} title='Pract:ScrollView'/>
                    <Button color='purple'  onPress={()=>setCreen('ActivityIndicator')} title='Pract:ActivityIndicator'/>
                    <Button color='purple'  onPress={()=>setCreen('FlatList')} title='Pract:FlatList y Section List'/>
                    <Button color='purple'  onPress={()=>setCreen('Modal')} title='Pract:Modal '/>
                    </View>

                    </View>
                )
    }

  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    contenedorBotones:{
    marginTop: 20,
    gap:15,
  },
    texto:{
    color:'#58575cff',
    fontSize:30,
    fontFamily: 'Time New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine:'line-through',

  },
})