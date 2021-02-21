import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import colors from '../styles/colors';

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
  }
  renderItem = ({item, index}: any) => {
    if (item.empty === true) {
      return <View style={[styles.image, styles.emptyImage]} />;
    }
    return (
      <Image
        style={styles.image}
        source={{
          uri:
            'https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg',
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* @ts-ignore */}
        <Text style={styles.category}>{this.props.category}:</Text>
        <FlatList
          /* @ts-ignore */
          data={formatData(this.props.data, 4)}
          style={styles.list}
          renderItem={this.renderItem}
          numColumns={5}
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
