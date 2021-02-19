import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../styles/colors";

type Props = TextInputProps;

class FormInput extends React.Component<Props> {
  render() {
    const { style, ...otherProps } = this.props;
    return (
      <TextInput
        selectionColor={colors.GREEN}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: colors.BLACK,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  }
});

export default FormInput;