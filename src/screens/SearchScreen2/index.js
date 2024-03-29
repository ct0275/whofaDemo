// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { theme } from '../../data/props';

const SearchScreen2 = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const { colors } = useTheme();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={[ styles.itemStyle, {color: colors.text} ]} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder=" "
          lightTheme={(theme === 'light')}
          value={search}
        />
        <View style={styles.subContainer}>
        <TouchableOpacity style={styles.hashtag}><Text style={{color: colors.text}}># 가을노래</Text></TouchableOpacity>
        <TouchableOpacity style={styles.hashtag}><Text style={{color: colors.text}}># 트로트</Text></TouchableOpacity>
        <TouchableOpacity style={styles.hashtag}><Text style={{color: colors.text}}># 쿨재즈</Text></TouchableOpacity>
        <TouchableOpacity style={styles.hashtag}><Text style={{color: colors.text}}># 클래식연주</Text></TouchableOpacity>
        <TouchableOpacity style={styles.hashtag}><Text style={{color: colors.text}}># 드럼연주</Text></TouchableOpacity>
        <TouchableOpacity style={styles.hashtag}><Text style={{color: colors.text}}># 비보이즈댄스</Text></TouchableOpacity>
       </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // marginTop: 5,
    // padding: 5,
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  itemStyle: {
    padding: 10,
  },
  subContainer: {
    // marginTop: 30,
    // padding: 10,
    // flex: 1,
    flexDirection: 'row', 
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  hashtag: {
    // alignSelf: 'flex-start',
    // marginRight: 40,
    marginLeft: 5,
    marginTop: 10,
    padding: 5,
    // backgroundColor: 'darkorange',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'orange',
  },
});

export default SearchScreen2;
