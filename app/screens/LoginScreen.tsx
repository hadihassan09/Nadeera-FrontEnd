import * as React from "react";
import { Image, StyleSheet, View, KeyboardAvoidingView, Dimensions  } from "react-native";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import FormInput from "../components/FormInput";
import colors from "../styles/colors";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class LoginScreen extends React.Component{
  constructor(props: any){
    super(props);
    this.state={
      email: "",
      password: "",
      error: false,
    }
  }

  handleEmailChange = (email: string) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  handleLoginPress = () => {
    console.log("Login button pressed");
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Math.round(windowHeight*-0.35)} >
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.form}>
          <FormInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            placeholder={"Email"}
            autoCorrect={false}
            keyboardType="email-address"
          />
          <FormInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={"Password"}
          />
          <Button label={"Login"} onPress={this.handleLoginPress} />
          {this.state.error ? <ErrorMessage error={'Credentials Incorrect'} visible={true} /> : <></>}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "80%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

export default LoginScreen;