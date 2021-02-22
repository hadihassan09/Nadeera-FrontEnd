import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import FormInput from '../components/FormInput';
import {login} from '../models/app_state';
import colors from '../styles/colors';
import DeviceInfo from 'react-native-device-info';
import {AuthContext} from '../models/context';

const windowHeight = Dimensions.get('window').height;
class LoginScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
      message: '',
      deviceName: '',
    };
  }

  componentDidMount() {
    DeviceInfo.getDeviceName().then((deviceName) => {
      this.setState({deviceName: deviceName});
    });
  }

  handleEmailChange = (email: string) => {
    this.setState({email: email});
  };

  handlePasswordChange = (password: string) => {
    this.setState({password: password});
  };

  handleLoginPress = async () => {
    const {signIn} = this.context;
    await login(
      {
        /* @ts-ignore */
        email: this.state.email,
        /* @ts-ignore */
        password: this.state.password,
        /* @ts-ignore */
        device_name: this.state.deviceName,
      },
      (token: any) => {
        this.setState({error: false});
        signIn(token);
      },
      (data: any) => {
        if (data.error.error != undefined)
          this.setState({error: true, message: 'Credentials Incorrect'});
        else {
          this.setState({error: true, message: 'Invalid email, or password'});
        }
      },
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={Math.round(windowHeight * -0.35)}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.form}>
          <FormInput
            /* @ts-ignore */
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            placeholder={'Email'}
            autoCorrect={false}
            keyboardType="email-address"
          />
          <FormInput
            /* @ts-ignore */
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={'Password'}
            secureTextEntry
          />
          <Button label={'Login'} onPress={this.handleLoginPress} />
          {/* @ts-ignore */}
          {this.state.error ? (
            /* @ts-ignore */
            <ErrorMessage error={this.state.message} visible={true} />
          ) : (
            <></>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
});

export default LoginScreen;
