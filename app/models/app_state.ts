import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

const internetStatus = () => {
    NetInfo.fetch().then(state => {
        console.log("Is connected?", state.isConnected);
        return state.isConnected;
    });
};

export const login = async (data: any, onSuccess: any, onFailure: any) => {
    {/* @ts-ignore */} 
    if (internetStatus === false)
        onFailure({
            "error":"Connection Error"
        });
    else
    {    
        axios.post('/login', data).then(response => {
        onSuccess(response.data);
    }).catch(err => {
            onFailure({"error":err.response.data, "status": err.response.status});
    });}
};