import React from 'react';
import {StyleSheet, FlatList, Image, Text, View} from 'react-native';
import ImageSet from '../components/ImagesSet';
import {getImages} from '../models/app_state';

export default class GalleryScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    /* @ts-ignore */
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      getImages(
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

  componentWillUnmount() {
    /* @ts-ignore */
    this._unsubscribe();
  }

  render() {
    /* @ts-ignore */
    if (this.state.data.length === 0)
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
              No Images Found
            </Text>
          </View>
        </>
      );
    return (
      <FlatList
        /* @ts-ignore */
        data={this.state.data}
        style={styles.container}
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
