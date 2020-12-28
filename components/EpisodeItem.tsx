import * as React from 'react';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, Linking, StyleSheet, Alert } from 'react-native';
import { EpisodesObject } from '../types';

export default function AnimeItem (props: any) {
  const data: EpisodesObject = props.data

  const openInBrowser = async (uri: string) => {
    if (uri === undefined || uri === '')
      return;

    console.log('Open ' + uri + ' in browser !')
    const supported = await Linking.canOpenURL(uri)

    if (supported) {
      await Linking.openURL(uri);
    } else {
      Alert.alert(`Don't know how to open this URL: ${uri}`);
    }
  }

  const uriFindStyle = () => {
    if (data.uri === undefined || data.uri === '')
      return styles.titleError
    else
      return styles.title
  }

  return (
    <TouchableOpacity onPress={() => { openInBrowser(data.uri) }}>
      <View style={styles.main_container}>        
          <Text style={uriFindStyle()}>{data.text}</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'center',
    alignContent: 'center',
    textAlignVertical: 'center'
  },
  separator: {
    alignSelf: 'center',
    height: 1,
    width: '80%',
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
  },
  titleError: {
    textAlign: 'center',
    fontSize: 15,
    color: 'red'
  },
})