import React from 'react';
import { RefreshControl } from 'react-native';
import {StyleSheet, FlatList, Image, Text, View} from 'react-native';
import ImageSet from '../components/ImagesSet';
import {getImages} from '../models/app_state';

export default class GalleryScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      refresh: false
    };
  }

  componentDidMount() {
    /* @ts-ignore */
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      await getImages(
        (data: any) => {
          let arrayData = [];
          for (const category in data) {
            arrayData.push(data[category]);
          }
          this.setState({data: arrayData});
        },
        () => {},
      );
    });
  }

  onRefresh = async () => {
    this.setState({ refresh: true });
    await getImages(
      (data: any) => {
        let arrayData = [];
        for (const category in data) {
          arrayData.push(data[category]);
        }
        this.setState({data: arrayData, refresh: false});
      },
      () => {
        this.setState({refresh: false, data: []})
      },
    );
  };

  componentWillUnmount() {
    /* @ts-ignore */
    this._unsubscribe();
  }


  render() {
    /* @ts-ignore */
    if (this.state.data.length === 0 && this.state.refresh === false)
      return (
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Image source={require('../assets/no-data.png')} />
            <Text style={{color: 'black', fontWeight: 'bold', marginTop: 10}}>
              No images found
            </Text>
          </View>
        </>
      );
    return (
      <FlatList
        /* @ts-ignore */
        data={this.state.data}
        style={styles.container}
        refreshControl={
          <RefreshControl
                  /* @ts-ignore */
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh} />
      }
        keyExtractor={() => (Math.random() * 1000).toString()}
        /* @ts-ignore */
        renderItem={({item}) => <ImageSet data={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
