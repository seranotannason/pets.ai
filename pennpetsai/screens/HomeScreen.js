import React from 'react';
//import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground source={require('../assets/images/wallpaper3.jpg')}
      resizeMode='cover'
      style={styles.backgroundImage}
      >
        <Image source={require('../assets/images/platypus0.png')}
        resizeMode= 'center'
        style={styles.Image}
        >
        </Image>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    alignSelf: 'center',
  },
  containerTop: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    padding: 20,
  },
  containerBottom: {
    position: 'absolute',
    bottom: 125,
    alignItems: 'center',
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: 'black',
    paddingBottom: 2,
    fontFamily: 'roboto'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  button: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    alignSelf: 'center'
  },
  swipe: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    marginTop: 25,
    fontFamily: 'roboto',
    alignSelf: 'center'
  }
});