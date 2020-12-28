export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Search: undefined;
  Settings: undefined;
};

export type SearchParamList = {
  SearchScreen: undefined;
  DetailScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};

export type SearchResultData = {
  id: string;
  title: string,
  img: string, 
  desc: string,
  version: string,
  totalEp: string,
  uri: string
}

export type EpisodesObject = {
  text: string,
  uri: string
}