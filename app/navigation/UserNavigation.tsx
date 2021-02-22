import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from '../screens/CameraScreen';
import GalleryScreen from '../screens/GalleryScreen';
import {TouchableOpacity, View} from 'react-native';
/* @ts-ignore */
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';

const Stack = createStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={({navigation}) => ({
          title: 'Gallery',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.WHITE,
            fontFamily: 'monospace',
            fontSize: 24,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: colors.BLACK,
            shadowColor: '#fff',
            elevation: 5,
          },
          headerRight: () => (
            <View style={{marginRight: 15}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Camera');
                }}>
                <MaterialCommunityIcons
                  name="camera"
                  color={colors.WHITE}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
