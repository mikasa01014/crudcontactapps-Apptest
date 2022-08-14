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
import { useDispatch, useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from '../../component'
import { DeleteBot } from '../../assets'
import {
  setAgeFalse,
  setAgeTrue,
  setIsValidAgeFalse,
  setIsValidAgeTrue,
  setIsValidLastNameFalse,
  setIsValidLastNameTrue,
  setIsValidNameFalse,
  setIsValidNameTrue,
  setLastNameFalse,
  setLastNameTrue,
  setNameFalse,
  setNameTrue,

} from '../../redux'

const Home = ({ navigation }) => {
    const ContactDataReducer = useSelector(state => state);
    const dispatch = useDispatch();

    let numreg = /^[0-9]+$/;
    let namereg = /^[A-Za-z]+$/;

    const [images, setImages] = useState("N/A");
    const [contact, setContact] = useState([]);
    const [button, setButton] = useState("Submit");
    const [header, setHeader] = useState("Input Data Contact");
    const [selectedContact, setSelectedContact] = useState({});

    const choosePhotoFromLibarary = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
            compressImageQuality: 0.8,
            includeBase64: true,
            compressImageQuality: 0.2
        }).then((image) => {
            console.log(image);
            setImages(image.data)
            console.log(images)

        }).catch(e => {
            
        })
    } 
    

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        Axios.get('https://simple-contact-crud.herokuapp.com/contact')
        .then(res=> {
            console.log("res : ", res.data.data);
            setContact(res.data.data);
        })
    }

    const submit = () => {
        const data = {
            firstName : ContactDataReducer.data.firstName,
            lastName : ContactDataReducer.data.lastName,
            age: ContactDataReducer.data.age,
            photo : images
        }

        if (ContactDataReducer.data.firstName.length == 0 &&
            ContactDataReducer.data.lastName.length == 0 &&
            ContactDataReducer.data.age.length == 0 &&
            images.length == 0
        ) {
            Alert.alert('Wrong Input!', 'All field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        } else if (ContactDataReducer.data.firstName.length == 0) {
            Alert.alert('Wrong Input!', 'name field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        } else if (ContactDataReducer.data.lastName.length == 0) {
            Alert.alert('Wrong Input!', 'Last Name field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        } else if (ContactDataReducer.data.age.length == 0) {
            Alert.alert('Wrong Input!', 'Age field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        } else if (images.length == 0) {
            Alert.alert('Wrong Input!', 'Photo field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
        console.log("data : ",data)
        if(button === "Submit"){
            Axios.post('https://simple-contact-crud.herokuapp.com/contact', data)
            .then(res=> {
                console.log('res', res);
                dispatch(setNameTrue(""));
                dispatch(setLastNameTrue(""));
                dispatch(setAgeTrue(""));
                setImages("N/A");
                getData();
                
            }) 
        } else if(button === "Update") {
            Axios.put(`https://simple-contact-crud.herokuapp.com/contact/${selectedContact.id}`, data)
            .then(res=> {
                console.log('res', res);
                dispatch(setNameTrue(""));
                dispatch(setLastNameTrue(""));
                dispatch(setAgeTrue(""));
                setImages("N/A");
                setButton("Submit");
                setHeader("Input New Data");
                getData();
                
            }) 
        }

    }

    const nameInputChange = (val) => {
        if (val.trim().length !== 0 && namereg.test(val) === true) {
            dispatch(setNameTrue(val.replace(/^[0-9]+$/, '')));
        } else {
            dispatch(setNameFalse(val.replace(/^[0-9]+$/, '')));
        }
    };

    const lastNameInputChange = (val) => {
        if (val.trim().length !== 0 && namereg.test(val) === true) {
            dispatch(setLastNameTrue(val.replace(/^[0-9]+$/, '')));
        } else {
            dispatch(setLastNameFalse(val.replace(/^[0-9]+$/, '')));
        }
    };

    const ageInputChange = (val) => {
        if (numreg.test(val) === true) {
            //dispatch(setPhoneTrue(val));
            dispatch(setAgeTrue(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')))
        } else {
            //dispatch(setPhoneFalse(val));
            dispatch(setAgeFalse(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')))
        }
    };

    const handleValidName = (val) => {
        if (val.trim().length !== 0 && namereg.test(val) === true) {
            dispatch(setIsValidNameTrue());
        } else {
            dispatch(setIsValidNameFalse());
        }
    };
    const handleValidLastName = (val) => {
        if (val.trim().length !== 0 && namereg.test(val) === true) {
            dispatch(setIsValidLastNameTrue());
        } else {
            dispatch(setIsValidLastNameFalse());
        }
    };

    const handleValidAge = (val) => {
        if (val.trim().length <= 3 && numreg.test(val) === true) {
            dispatch(setIsValidAgeTrue())
        } else {
            dispatch(setIsValidAgeFalse())
        }
    }

    
    const Item = ({firstName, lastName, age, photo, onPress, onDelete }) => {
        return (
            <View style={styles.footer_container}>
                <TouchableOpacity onPress={onPress}>
                    <Image source={{uri: `${photo}` || `data:image/jpeg;base64,${photo}`}} style={styles.avatar}/>
                </TouchableOpacity>   
                    <View style={styles.desc}>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={styles.name}>Full Name : {firstName} {lastName}</Text>
                        <Text style={styles.age}>Age : {age}</Text>
                        </TouchableOpacity> 
                    </View>

                    <TouchableOpacity onPress={onDelete}>
                        <Image source={DeleteBot} style={styles.delete} />
                    </TouchableOpacity>
            </View>
        )
    }

    const selectItem = (item) => {
        console.log('se :', item);
        setSelectedContact(item)
        dispatch(setNameTrue(item.firstName));
        dispatch(setLastNameTrue(item.lastName));
        dispatch(setAgeTrue((item.age).toString()));
        setImages(item.photo);
        setButton("Update");
        setHeader("Update Contact")

    }

    const deleteItem = (item) => {
        console.log(item.id);
        Axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${item.id}`)
        .then(res => {
            console.log('res delete: ', res);
            getData();
        }) // cant be deleted based on id 
        //even in the documentation it always give respone code 400 
        //and in postman too. the message is "message": "contact unavailable"
    }

    return (
        <ScrollView>
            <View style = {styles.container}>
                <StatusBar 
                    barStyle= "light-content" 
                    backgroundColor={constantColors.default} 
                />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Contact</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                     <Text style={styles.text_footer_new}>{header}</Text>

                     <Text style={styles.text_footer}>First Name</Text>
                     <View style={styles.action}>
                        <TextInput 
                            placeholder='Your First Name'
                            value={ContactDataReducer.data.firstName}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='default'
                            onChangeText={(val) => nameInputChange(val)}
                            onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
                        />
                     </View>
                     {ContactDataReducer.data.isValidName ? null :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Firstname can't be empty and Only letters</Text>
                        </Animatable.View>
                    }

                     <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>LastName</Text>
                    <View style={styles.action}>
                        <TextInput
                            value={ContactDataReducer.data.lastName}
                            secureTextEntry={false}
                            placeholder='Your LastName'
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => lastNameInputChange(val)}
                            keyboardType='default'
                            onEndEditing={(e) => handleValidLastName(e.nativeEvent.text)} />
                    </View>
                    {ContactDataReducer.data.isValidLastName ? null :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Lastname can't be empty and Only letters</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Age</Text>
                    <View style={styles.action}>
                        <TextInput
                            value={ContactDataReducer.data.age}
                            secureTextEntry={false}
                            style={styles.textInput}
                            placeholder='Your Age'
                            autoCapitalize='none'
                            onChangeText={(val) => ageInputChange(val)}
                            keyboardType='numeric'
                            onEndEditing={(e) => handleValidAge(e.nativeEvent.text)} />
                    </View>
                    {ContactDataReducer.data.isValidAge ? null :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Age is Not Valid and Number Only</Text>
                        </Animatable.View>
                    }
                    <View style={styles.action_image}>
                        <TouchableOpacity style={[styles.imgPicker, {
                            borderColor: constantColors.default,
                            borderWidth: 1,
                            marginTop: 15
                        }]} onPress={() => choosePhotoFromLibarary()}>
                            <Text style={[styles.textSign, {
                                color: constantColors.default
                            }]}>
                                Upload Image
                            </Text>
                            
                        </TouchableOpacity>
                        <Text style={{
                            marginLeft: 10,
                            marginTop: 16
                        }}>{images}</Text>
                    </View>
                    <View style={styles.button}>
                        <Button type='linear'
                            title={button}
                            name='submit'
                            onPress={() => {submit()}}
                        />
                    </View>
                    
                    
                </Animatable.View>

                <View>
                    <Text>{"\n"}</Text>
                </View>

                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.action2}
                >   
                    <View style={styles.header}>
                        <Text style={styles.text_header}>Contact List</Text>
                     </View>
                     {contact.map(contact => {
                         return (
                            
                                <Item 
                                    key={contact.id}
                                    firstName={contact.firstName} 
                                    lastName={contact.lastName} 
                                    age={contact.age} 
                                    photo={contact.photo}
                                    onPress = {() => selectItem(contact)}
                                    onDelete ={() => deleteItem(contact)}
                                />)
                     })}
                    
                    
                </Animatable.View>
            </View>
        </ScrollView>
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
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    footer: {
        flex:1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 12
    },
    text_footer_new: {
        color: '#05375a',
        fontWeight: 'bold',
        fontSize: 14
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
        marginTop: 50
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
    footer_container: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        flexDirection:'row'
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
    }
})