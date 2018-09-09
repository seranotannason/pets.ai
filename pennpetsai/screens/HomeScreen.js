import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { createStackNavigator } from 'react-navigation';

var global_gif_uri;

class HomeScreen1 extends React.Component {
  static navigationOptions = {
    title: null,
  };
  render() {
    var pointer = this;
    var xhr = fetch("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=6cCWFhXew0IqQcfPdHzyIBj2ArBA0YTW&limit=1", {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => responseJson["data"][0]); // take first gif in hit

    var gif_uri;

    xhr.done(function(data) {
      console.log("success got data", data);
      gif_uri = data["images"]["original"]["url"];
      console.log("this is gif uri ", gif_uri);
      global_gif_uri = gif_uri;
      pointer.props.navigation.navigate('HomeScreen2');    
    }); 

    console.log("hello ", gif_uri);

    return (
      <ImageBackground source={require('../assets/images/wallpaper3.jpg')}
      resizeMode='cover'
      style={styles.backgroundImage}>
        <Image source={{uri: gif_uri}}
          resizeMode= 'center'
          style={styles.Image}/>
        <Button title="Giphy" onPress={() =>
          this.props.navigation.navigate('HomeScreen2')
          }
        />
        <Image source={require('../assets/images/platypus0.png')}
        resizeMode= 'center'
        style={styles.Pet}
        />
      </ImageBackground>
    );
  }
}

class HomeScreen2 extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    var gif_uri = global_gif_uri;
    console.log("screen2", gif_uri);
    return (
      <ImageBackground source={require('../assets/images/wallpaper3.jpg')}
      resizeMode='cover'
      style={styles.backgroundImage}>
        <Image source={{uri: gif_uri}}
          resizeMode= 'center'
          style={styles.Image}/>
        <Button title="Go Back"
        onPress={() =>this.props.navigation.navigate('HomeScreen1')
        }
        />
        <Image source={require('../assets/images/platypus0.png')}
        resizeMode= 'center'
        style={styles.Pet}
        />
      </ImageBackground>
    );
  }
}

const HomeScreen = createStackNavigator({
  HomeScreen1: { screen: HomeScreen1 },
  HomeScreen2: { screen: HomeScreen2 },
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    alignSelf: 'center',
    width: 100, height: 100,
  },
  Pet:{
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