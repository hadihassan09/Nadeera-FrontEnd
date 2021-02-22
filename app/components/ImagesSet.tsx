import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../styles/colors';
import ImageView from 'react-native-image-viewing';

const formatData = (data: any, numColumns: any) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 5;
export default class ImageSet extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      index: 0,
    };
  }
  renderItem = ({item, index}: any) => {
    if (item.empty === true) {
      return <View style={[styles.image, styles.emptyImage]} />;
    }
    return (
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => {
          this.setState({visible: true, index: index});
        }}>
        <Image
          style={styles.image}
          source={{
            uri: item.uri,
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* @ts-ignore */}
        <Text style={styles.category}>{this.props.data[0].category}:</Text>
        <FlatList
          /* @ts-ignore */
          data={formatData(this.props.data, 4)}
          keyExtractor={(item, index) => item.category + index}
          style={styles.list}
          renderItem={this.renderItem}
          numColumns={5}
        />
        <ImageView
          /* @ts-ignore */
          images={this.props.data}
          /* @ts-ignore */
          imageIndex={this.state.index}
          /* @ts-ignore */
          visible={this.state.visible}
          onRequestClose={() => this.setState({visible: false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: colors.WHITE,
  },
  list: {},
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns,
  },
  emptyImage: {
    backgroundColor: 'transparent',
  },
});
