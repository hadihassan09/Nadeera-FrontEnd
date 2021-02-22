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
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
/* @ts-ignore */
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../styles/colors';
import {addImage} from '../models/app_state';

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
      uploading: false,
      percentage: '0',
      message: '',
      uploaded: false,
      type: true,
    };

    auth()
      .signInAnonymously()
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }

  uploadImage = async (uri: string) => {
    const uploadUri = uri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const task = storage().ref(filename).putFile(uploadUri);
    try {
      this.setState({
        uploading: true,
      });
      task.on('state_changed', (taskSnapshot) => {
        const progress = Math.round(
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
        );
        this.setState({
          percentage: progress,
        });
      });
      task.then(async () => {
        let url = await storage().ref(filename).getDownloadURL();
        addImage(
          {
            uri: url,
          },
          (data: any) => {
            console.log(data);
            this.setState({
              uploading: false,
              percentage: '0',
              uploaded: true,
            });
            setTimeout(
              /* @ts-ignore */
              () => {
                this.setState({
                  uploaded: false,
                });
              },
              1500,
            );
          },
          async (data: any) => {
            let ref = storage().ref(filename);
            await ref.delete();
            this.setState({
              uploading: false,
              percentage: '0',
            });
          },
        );
      });
    } catch (error) {
      let ref = storage().ref(filename);
      await ref.delete();
      this.setState({
        uploading: false,
        percentage: '0',
      });
    }
  };

  takePicture = async (camera: any) => {
    try {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      this.uploadImage(data.uri);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={
            /* @ts-ignore */

            this.state.type
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
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
            /* @ts-ignore */
            if (this.state.uploading)
              return (
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
                      {/* @ts-ignore */}
                      Uploading image {this.state.percentage}%
                    </Text>
                  </View>
                </View>
              );
            /* @ts-ignore */
            if (this.state.uploaded)
              return (
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
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 10,
                      }}>
                      Upload complete
                    </Text>
                  </View>
                </View>
              );
            return (
              <>
                <View
                  style={{
                    flex: 1,
                    top: 20,
                    left: 15,
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    /* @ts-ignore */
                    onPress={() => this.props.navigation.goBack()}>
                    <View>
                      <Ionicons
                        name="arrow-back"
                        size={25}
                        color={colors.WHITE}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
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
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        /* @ts-ignore */
                        type: !this.state.type,
                      });
                    }}
                    style={styles.capture}>
                    <MaterialCommunityIcons
                      name={
                        /* @ts-ignore */
                        this.state.type ? 'camera-front' : 'camera-rear'
                      }
                      color={colors.WHITE}
                      size={32}
                    />
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </RNCamera>
      </View>
    );
  }
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
