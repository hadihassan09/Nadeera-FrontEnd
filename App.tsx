import React from 'react';
import LoginScreen from './app/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './app/models/context';

const Stack = createStackNavigator();

interface LoginState {
  isLoading: boolean,
  token: string|null,
  id: string|null,
  isLoggedIn: boolean
};

const App = () => {

  const initialLoginState: LoginState = {
    isLoading: true,
    token: null,
    id: null,
    isLoggedIn: false
  };

  //Auth Actions
  const loginReducer = (prevState: LoginState, action: any) => {
    switch (action.action) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          id: action.id,
          isLoading: false,
          isLoggedIn: action.isLoggedIn
        };
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          id: action.id,
          isLoading: false,
          isLoggedIn: true
        };
      case 'LOGOUT':
        return {
          ...prevState,
          token: '',
          type: null,
          id: null,
          isLoading: false,
          isLoggedIn: false
        };
      case 'UPDATE_PROFILE':
        return {
          ...prevState,
          profileUri: action.profileUri,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  //Auth Context
  const authContext = React.useMemo(() => ({
    signIn: async (token: string, id: string) => {
      try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('id', id);
      } catch (e) {
        console.log(e);
      }
      dispatch({ action: 'LOGIN', token: token, id: id });
    },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id')
      } catch (e) {
        console.log(e);
      }
      dispatch({ action: 'LOGOUT' });
    },

    data: () => { return loginState }

  }), [loginState]);

  React.useEffect(() => {
    setTimeout(async () => {
      let isLoggedIn = false;
      let token: string|null = '';
      let id: string|null = '';
      try {
        id = await AsyncStorage.getItem('id');
        token = await AsyncStorage.getItem('token');
      dispatch({action: 'RETRIEVE_TOKEN', token: token,isLoggedIn: isLoggedIn, id: id});
    } catch (e) {
      console.log(e);
    }}, 1500);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
