import * as React from 'react';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchResultData } from '../types';

export default function AnimeItem (props: any) {
  const navigation = useNavigation()
  const data: SearchResultData = props.data

  const isFilm = () => {
    if (data.totalEp === '') {
      return 'Film'
    } else {
      return 'Total Ep: ' + data.totalEp
    }
  }

  return (
    <TouchableOpacity onPress={() => { navigation.navigate('DetailScreen', { data: data }) }}>
      <View style={styles.main_container}>        
          <Image source={{uri: data.img, width: 104, height: 162}} style={styles.image} />
          <View style={styles.second_container}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.desc}>{data.desc}</Text>
            <Text style={styles.version}>{data.version}</Text>
            <Text style={styles.totalEp}>{isFilm()}</Text>
          </View>
      </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3,
    height: 162
  },
  second_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D3D3D3'
  },
  image: {
    width: 104, height: 162
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 5
  },
  desc: {
    fontSize: 11
  },
  version: {
    textAlign: 'center'
  },
  totalEp: {
    textAlign: 'center'
  }
})