import React, {Component, createContext} from 'react';
import { Text, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export const AudioContext = createContext();
export class AudioProvider extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            audioFiles: [],
            permissionError: false
        };
    }

    permissionAllert = () => {
        Alert.alert("Permission Required", "Esse app precisa da permissão para ler suas músicas!", 
        [
          {
            text: 'Eu aceito',
            onPress: () => this.getPermission(),
          },
          {
            text: 'Cancelar',
            onPress: () => this.permissionAllert(),
        },
    ]);

    };

    getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        });

        this.setState({ ...this.state, audioFiles: media.assets });
    };

    getPermission = async () => {
    //{
     //   "canAskAgain": true,
     //   "expires": "never",
     //   "granted": false,
     //   "status": "undetermined",
     // }
       const permission = await MediaLibrary.getPermissionsAsync();
       if(permission.granted){
           // ler todas as musicas
           this.getAudioFiles();
       }

       if(!permission.canAskAgain && !permission.granted){
          this.setState({...this.state, permissionError: true})  
       }

       if (!permission.granted && permission.canAskAgain){
           const {
               status, 
               canAskAgain,
            } = await MediaLibrary.requestPermissionsAsync();

           if(status === 'denied' && canAskAgain){
               // alerta para permitir o aplicativo ler os audios files
               this.permissionAllert();         
           }
           if(status === 'granted'){
             // ler todas as musicas
             this.getAudioFiles();
           }

           if(status === 'denied' && !canAskAgain){
            // alerta de error para o usuario     
            this.setState({...this.state, permissionError: true});   
        }
       }
    }; 

componentDidMount(){
    this.getPermission();
}

    render() {
        if(this.state.permissionError) return <View style= {{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
    
        }}> 
            <Text style={{fontSize: 25, textAlign:'center', color: 'red'}}>
                Parece que você não aceitou a permissão</Text>
        </View>
        return (
        <AudioContext.Provider value={{audioFiles: this.state.audioFiles}}>
            {this.props.children}
        </AudioContext.Provider>
        );
    }

}

export default AudioProvider;