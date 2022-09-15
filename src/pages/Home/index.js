import { colors, colors as constantColors } from '../../constant'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Image
} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '../../component'
import axios from 'axios';


const Home = ({ navigation }) => {

    const [provinsiData, setProvinsiData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [kecamatanData, setKecamatanData] = useState([]);
    const [provinsi,setProvinsi] = useState(null);
    const [city,setCity] = useState(null);
    const [kecamatan,setKecamatan] = useState(null);
    const [provinsiName,setProvinsiName] = useState(null);
    const [cityName,setCityName] = useState(null);
    const [kecamatanName,setKecamatanName] = useState(null);
    const [kelurahanName,setKelurahanName] = useState(null);
    const [kodeposName,setKodePosName] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://kodepos-2d475.firebaseio.com/list_propinsi.json'
        };

        axios(config)
        .then(function(res) {
            const count = Object.keys(res.data).length;
            const keyObject = Object.keys(res.data);
            const provinsiArr1 = [];
            const provinsiArr2 = [];

            for(const key of keyObject) {
                const objProvinsi = {
                    id : key,
                    name: res.data[key]
                };
                provinsiArr1.push(objProvinsi);
            }

            for(var i = 0; i < count; i ++) {
               provinsiArr2.push ({
                    value: provinsiArr1[i].id,
                    label: provinsiArr1[i].name
                });
            }
            setProvinsiData(provinsiArr2);
        })
        .catch(function(e) {
            console.log(e);
        })
    }, [])

    const handleCity = (idProvinsi) => {
        var config = {
            method: 'get',
            url: `https://kodepos-2d475.firebaseio.com/list_kotakab/${idProvinsi}.json`
        };
        axios(config)
        .then(function(res) {
            const count = Object.keys(res.data).length;
            const keyObject = Object.keys(res.data);
            const cityArr1 = [];
            const cityArr2 = [];

            for(const key of keyObject) {
                const objCity = {
                    id : key,
                    name: res.data[key]
                };
                cityArr1.push(objCity);
            }

            for(var i = 0; i < count; i ++) {
                cityArr2.push ({
                    value: cityArr1[i].id,
                    label: cityArr1[i].name
                });
            }

            setCityData(cityArr2);
        })
        .catch(function(e) {
            console.log(e);
        })
    }

    const handleKecamatan = (idKotaKab) => {
        var config = {
            method: 'get',
            url: `https://kodepos-2d475.firebaseio.com/kota_kab/${idKotaKab}.json`
        };
        axios(config)
        .then(function(res) {
            const count = Object.keys(res.data).length;

            const kecamatanArr1 = [];
            const kecamatanArr2 = [];
            
            for(var i = 0; i < count; i++){
                const objKecamatan = {
                    id: i+1,
                    kecamatan: res.data[i].kecamatan,
                    kelurahan: res.data[i].kelurahan,
                    kodepos: res.data[i].kodepos,
                    all : [res.data[i].kecamatan,res.data[i].kelurahan,res.data[i].kodepos].toString(),
                }
                kecamatanArr1.push(objKecamatan);
            }
            
            for(var i = 0; i < count; i++){
               kecamatanArr2.push({
                value: kecamatanArr1[i].id,
                label: kecamatanArr1[i].all,
                kecamatan: kecamatanArr1[i].kecamatan,
                kelurahan: kecamatanArr1[i].kelurahan,
                kodepos: kecamatanArr1[i].kodepos,
               })
            }
            setKecamatanData(kecamatanArr2)
        })
        .catch(function(e) {
            console.log(e);
        })
    }

  
    return (
            <View style = {styles.container}>
                <StatusBar 
                    barStyle= "light-content" 
                    backgroundColor={constantColors.default} 
                />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Indonesian Region</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={provinsiData}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Select Provinsi' : '...'}
                      searchPlaceholder="Search..."
                      value={provinsi}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setProvinsi(item.value);
                        handleCity(item.value);
                        setProvinsiName(item.label);
                        setIsFocus(false);
                      }}
                    />
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={cityData}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Select Kota/Kabupaten' : '...'}
                      searchPlaceholder="Search..."
                      value={city}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setCity(item.value);
                        handleKecamatan(item.value);
                        setCityName(item.label);
                        setIsFocus(false);
                      }}
                    />
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={kecamatanData}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Select Kecamatan, Kelurahan & Kodepos' : '...'}
                      searchPlaceholder="Search..."
                      value={kecamatan}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setKecamatan(item.value);
                        setKecamatanName(item.kecamatan);
                        setKelurahanName(item.kelurahan);
                        setKodePosName(item.kodepos);
                        setIsFocus(false);
                      }}
                    />
                    <View style={styles.button}>
                        <Button type='linear'
                            title='Submit'
                            name='started'
                            onPress={() => Alert.alert(
                                'You Have Selected',`Provinsi: ${provinsiName}\nCity: ${cityName}\nKecamatan: ${kecamatanName}\nKelurahan: ${kelurahanName}\nKode Pos: ${kodeposName}`
                            )}
                        />
                </View>
                </Animatable.View>
            </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantColors.default
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 80,
        paddingBottom: 40
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 40,
        paddingBottom : 350,
        paddingHorizontal: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 12
    },
    action: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 1
    },
    action2: {
        flex: 1,
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 1
    },
    action_image: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 3,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 3
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        paddingBottom: 1,
        height:28

    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    imgPicker: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    avatar: {flex: 1,
        width:80,
        height:80,
        borderRadius: 80
    },
    name : {
        fontSize:15,
        fontWeight: 'bold',
    },
    age: {
        fontSize:12,
        marginTop: 9
    },
    desc: {
        flex:1,
        marginLeft: 12,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 1
    },
    delete :{
        width:30,
        height:30,
        marginLeft: 70,  
        marginTop: 10,
    },
    containerDrop: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom : 15
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})