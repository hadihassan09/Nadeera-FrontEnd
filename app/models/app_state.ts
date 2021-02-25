import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

export const internetStatus = () => {
    NetInfo.fetch().then(state => {
        console.log("Is connected?", state.isConnected);
        return state.isConnected;
    });
};

export const login = async (data: any, onSuccess: any, onFailure: any) => {
    /* @ts-ignore */
    if (!internetStatus()){
        Alert.alert(
        "Network Connection Error",
        "Check your internet connection. You don't seem to have an active internet connection. Please check your connection and try again.",
        [
          { text: "OK", onPress: () => {} }
        ],
        { cancelable: true }
      );
        onFailure({
            "error":"Connection Error"
        });
    }
    else
    {    
        axios.post('/login', data).then(response => {
        onSuccess(response.data);
    }).catch(err => {
            onFailure({"error":err.response.data, "status": err.response.status});
    });}
};

export const addImage = async(data: any, onSuccess: any, onFailure: any) => {
    /* @ts-ignore */
    if (!internetStatus()){
        Alert.alert(
            "Network Connection Error",
            "Check your internet connection. You don't seem to have an active internet connection. Please check your connection and try again.",
            [
              { text: "OK", onPress: () => {} }
            ],
            { cancelable: true }
          );
            onFailure({
                "error":"Connection Error"
            });
        }
    else
    {    
        axios.post('/image', data).then(response => {
        onSuccess(response.data);
    }).catch(err => {
            onFailure(err);
    });}
};

export const getImages = async(onSuccess: any, onFailure: any) => {
    /* @ts-ignore */
    if (!internetStatus()){
        Alert.alert(
            "Network Connection Error",
            "Check your internet connection. You don't seem to have an active internet connection. Please check your connection and try again.",
            [
              { text: "OK", onPress: () => {} }
            ],
            { cancelable: true }
          );
            onFailure({
                "error":"Connection Error"
            });
        }
    else
    {    
        axios.get('/image/all').then(response => {
        onSuccess(response.data);
    }).catch(err => {
            onFailure(err);
    });}
};