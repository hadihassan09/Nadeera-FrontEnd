import React from 'react';
import LoginScreen from './app/screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './app/models/context';
import axios from 'axios';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native';
import colors from './app/styles/colors';

const Stack = createStackNavigator();

interface LoginState {
  isLoading: boolean;
  token: string | null;
  isLoggedIn: boolean;
}

const App = () => {
  const initialLoginState: LoginState = {
    isLoading: true,
    token: null,
    isLoggedIn: false,
  };

  //Auth Actions
  const loginReducer = (prevState: LoginState, action: any) => {
    switch (action.action) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
          isLoggedIn: action.isLoggedIn,
        };
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
          isLoggedIn: true,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          token: '',
          isLoading: false,
          isLoggedIn: false,
        };
      case 'UPDATE_PROFILE':
        return {
          ...prevState,
          profileUri: action.profileUri,
        };
    }
  };
  /* @ts-ignore */
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  //Auth Context
  const authContext = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        try {
          await AsyncStorage.setItem('token', token);
        } catch (e) {
          console.log(e);
        }
        /* @ts-ignore */
        dispatch({action: 'LOGIN', token: token});
      },

      signOut: async () => {
        try {
          await AsyncStorage.removeItem('token');
        } catch (e) {
          console.log(e);
        }
        /* @ts-ignore */
        dispatch({action: 'LOGOUT'});
      },

      data: () => {
        return loginState;
      },
    }),
    [loginState],
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let isLoggedIn = false;
      let token: string | null = '';
      try {
        token = await AsyncStorage.getItem('token');
        if (token !== '' && token != null) isLoggedIn = true;
        /* @ts-ignore */
        dispatch({
          action: 'RETRIEVE_TOKEN',
          token: token,
          isLoggedIn: isLoggedIn,
        });
      } catch (e) {
        console.log(e);
      }
    }, 1500);
  }, []);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response.status === 401) {
        authContext.signOut();
      }
      return Promise.reject(error);
    },
  );

  axios.defaults.baseURL = 'http://192.168.1.108:8000/api';
  axios.defaults.headers.common['Authorization'] =
    'Bearer' + ' ' + loginState.token;
  axios.defaults.headers.post['Content-Type'] =
    'application/json; charset=UTF-8';

  if (loginState.isLoading == true)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.GREEN} />
      </View>
    );
  if (loginState.isLoading == false)
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {loginState.isLoggedIn === true ? (
              <Stack.Screen name="Login" component={LoginScreen} options={{}} />
            ) : (
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
};

export default App;
