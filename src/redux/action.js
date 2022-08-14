//CONTACT
//FULLTIME
export const setNameTrue = (val) => {
    return {type:'SET_NAME_TRUE', inputValue: val};
};
export const setNameFalse = (val) => {
    return {type:'SET_NAME_FALSE', inputValue: val};
};
export const setLastNameTrue = (val) => {
    return {type:'SET_LASTNAME_TRUE', inputValue: val};
};
export const setLastNameFalse = (val) => {
    return {type:'SET_LASTNAME_FALSE', inputValue: val};
};
//AGE
export const setAgeTrue = (val) => {
    return {type:'SET_AGE_TRUE', inputValue: val};
};
export const setAgeFalse = (val) => {
    return {type:'SET_AGE_FALSE', inputValue: val};
};

export const setIsValidNameTrue = () => {
    return {type:'SET_ISVALIDNAME_TRUE'}
}
export const setIsValidNameFalse = () => {
    return {type:'SET_ISVALIDNAME_FALSE'}
}

export const setIsValidLastNameTrue = () => {
    return {type:'SET_ISVALIDLASTNAME_TRUE'}
}
export const setIsValidLastNameFalse = () => {
    return {type:'SET_ISVALIDLASTNAME_FALSE'}
}

export const setIsValidAgeTrue = () => {
    return {type:'SET_ISVALIDAGE_TRUE'}
}
export const setIsValidAgeFalse = () => {
    return {type:'SET_ISVALIDAGE_FALSE'}
}

