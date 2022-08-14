import React from 'react';
import Welcome from '../index';
import { fireEvent, render } from '@testing-library/react-native';

describe('Welcome Screen', () => {
    it('should go to home screen if button on welcome screen clicked', () =>{
        const navigation = {navigate:() => {}}
        const page = render(<Welcome />);

        const nextButton = page.getByTextId('nextButton');

        fireEvent.press(nextButton);
        expect (navigation.navigate).toHaveBeenCalledWith("Home")
    })
})
