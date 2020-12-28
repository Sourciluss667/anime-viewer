import * as React from 'react';
import { StyleSheet, TextInput, Button, ActivityIndicator, FlatList } from 'react-native';
import { Text, View, ScrollView } from '../components/Themed';
import { searchByTitle } from '../controllers/vostfree';
import { SearchResultData } from '../types';
import AnimeItem from '../components/AnimeItem';

export default function SearchScreen() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [btnDisable, setBtnDisable] = React.useState(true)
  const [searchData, setSearchData] = React.useState<Array<SearchResultData> | null>()
  let searchInput = ''

  const _search = async () => {
    setIsLoading(true)
    setBtnDisable(true)
    setSearchData(await searchByTitle(searchInput))
    setIsLoading(false)
    setBtnDisable(false)
  }

  const _displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
  }

  const _dontfinddata = () => {
    if (searchData === null) {
      return (
        <Text>Rien a été trouvé...</Text>
      )
    }
  }

  const _onChangeText = (text: string) => {
    searchInput = text
    if (searchInput.length > 3) {
      setBtnDisable(false)
    } else {
      setBtnDisable(true)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.search_input} placeholder="Titre de l'anime" onSubmitEditing={() => _search()} onChangeText={(text) => _onChangeText(text)} />
      <Button title="Rechercher" disabled={btnDisable} onPress={() => _search()} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <FlatList style={styles.result_list} data={searchData} renderItem={ ({item}) => <AnimeItem data={item} /> } />

      { _dontfinddata() }
      { _displayLoading() }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search_input: {
    height: 40,
    fontSize: 16,
    textAlign: "center",
  },
  result_list: {
    flex: 1,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    alignSelf: 'center',
    marginTop: 20,
    height: 1,
    width: '80%',
  },
});
