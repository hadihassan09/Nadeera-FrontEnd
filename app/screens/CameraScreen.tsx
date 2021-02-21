import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
/* @ts-ignore */
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View
      style={{
        padding: 25,
        backgroundColor: colors.WHITE,
        flexDirection: 'row',
        borderRadius: 15,
        minWidth: '80%',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={colors.BLACK} />
      <Text
        style={{
          fontSize: 18,
          marginLeft: 10,
        }}>
        Awaiting Permission
      </Text>
    </View>
  </View>
);

class CameraScreen extends PureComponent {
  constructor(props: any) {
    super(props);
    this.state = {
      flashlight: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={
            /* @ts-ignore */
            this.state.flashlight
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status, recordAudioPermissionStatus}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      /* @ts-ignore */
                      flashlight: !this.state.flashlight,
                    });
                  }}
                  style={styles.capture}>
                  <MaterialCommunityIcons
                    name={
                      /* @ts-ignore */
                      this.state.flashlight ? 'flashlight-off' : 'flashlight'
                    }
                    color={colors.WHITE}
                    size={32}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.takePicture(camera)}
                  style={styles.capture}>
                  <MaterialCommunityIcons
                    name={'camera'}
                    color={colors.WHITE}
                    size={32}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async function (camera: any) {
    try {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
    } catch (e) {
      console.log(e);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flashlight: {},
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraScreen;
