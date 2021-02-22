import React from 'react';
import {StyleSheet, ScrollView, FlatList} from 'react-native';
import ImageSet from '../components/ImagesSet';
import {getImages} from '../models/app_state';
import colors from '../styles/colors';

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
        (error: any) => {
          console.log(error);
        },
      );
    });
  }

  componentWillUnmount() {
    /* @ts-ignore */
    this._unsubscribe();
  }

  render() {
    return (
      <FlatList
        /* @ts-ignore */
        data={this.state.data}
        style={styles.container}
        keyExtractor={() => (Math.random() * 1000).toString()}
        /* @ts-ignore */
        renderItem={({item, index}) => <ImageSet data={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
});
