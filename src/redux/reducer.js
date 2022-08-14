

const initialContactState = {
    data:{
        firstName:'',
        lastName: '',
        age: 0,
        check_textInputChange: false,
        check_lastNameInputChange: false,
        check_ageInputChange: false,
        isValidName: true,
        isValidLastName: true,
        isValidAge:true,
    },
};

const ContactDataReducer = (state = initialContactState, action) => {
     //firstname
     if (action.type === 'SET_NAME_TRUE') {
        return {
            ...state,
            data:{
                ...state.data,
                firstName: action.inputValue,
                check_textInputChange: true,
                isValidName:true
            },
        };
    }
    if (action.type === 'SET_NAME_FALSE') {
        return{
            ...state,
            data:{
                ...state.data,
                firstName: action.inputValue,
                check_textInputChange: false,
                isValidName:false
            },
        };
    }
    //lastname
    if (action.type === 'SET_LASTNAME_TRUE') {
        return {
            ...state,
            data:{
                ...state.data,
                lastName: action.inputValue,
                check_lastNameInputChange: true,
                isValidLastName:true
            },
        };
    }
    if (action.type === 'SET_LASTNAME_FALSE') {
        return{
            ...state,
            data:{
                ...state.data,
                lastName: action.inputValue,
                check_lastNameInputChange: false,
                isValidLastName:false
            },
        };
    }
    //age
    if (action.type === 'SET_AGE_TRUE') {
        return {
            ...state,
            data:{
                ...state.data,
                age: action.inputValue,
                check_phoneInputChange: true,
                isValidPhone:true
            },
        };
    }
    if (action.type === 'SET_AGE_FALSE') {
        return{
            ...state,
            data:{
                ...state.data,
                age: action.inputValue,
                check_phoneInputChange: false,
                isValidPhone: false
            },
        };
    }
    if(action.type === 'SET_ISVALIDNAME_TRUE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidName: true
                }
        }
    }
    if(action.type === 'SET_ISVALIDNAME_FALSE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidName: false
                }
        }
    }
    if(action.type === 'SET_ISVALIDLASTNAME_TRUE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidLastName: true
                }
        }
    }
    if(action.type === 'SET_ISVALIDLASTNAME_FALSE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidLastName: false
                }
        }
    }
    if(action.type === 'SET_ISVALIDAGE_TRUE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidAge: true
                }
        }
    }
    if(action.type === 'SET_ISVALIDAGE_FALSE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidAge: false
                }
        }
    }



    return state;
};

export default ContactDataReducer;
