import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import colors from "../styles/colors";

interface State {
  email: string;
  password: string;
}

class LoginScreen extends React.Component<{}, State> {
  readonly state: State = {
    email: "",
    password: ""
  };

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
      <View style={styles.container}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.form}>
          <FormInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            placeholder={"Email"}
          />
          <FormInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={"Password"}
          />
          <Button label={"Login"} onPress={this.handleLoginPress} />
        </View>
      </View>
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