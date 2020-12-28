import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { SearchResultData, EpisodesObject } from '../types';
import { Text, View, ScrollView } from '../components/Themed';
import EpisodeItem from '../components/EpisodeItem';
import { getAllEpisodes } from '../controllers/vostfree';

export default function DetailScreen(props: any) {
  const params: any = useRoute().params
  const data: SearchResultData = params.data
  const [episodes, setEpisodes] = React.useState<Array<EpisodesObject>>()

  React.useEffect(() => {
    getAllEpisodes(data.uri).then((episode) => { setEpisodes(episode) }).catch(e => {console.error(e)})
  }, [])

  const isFilm = () => {
    if (data.totalEp === '') {
      return 'Film'
    } else {
      return data.totalEp + ' épisodes'
    }
  }

  return (
    <ScrollView style={styles.main_container}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.container}>
        <Image source={{uri: data.img, width: 104, height: 162}} style={styles.image} />
        <Text style={styles.desc}>{data.desc}</Text>
        <Text>{data.version} / {isFilm()}</Text>
      </View>

      <FlatList data={episodes} renderItem={ ({item}) => <EpisodeItem data={item}/> } />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    alignSelf: 'center',
    width: '80%',
  },
  desc: {
    textAlign: 'center',
    marginVertical: 20,
    width: '90%'
  },
  image: {
    width: 104, height: 162
  },
});
