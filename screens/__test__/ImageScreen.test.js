import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { render, within } from '../../test-utils'
import ImageScreen from '../ImageScreen'


describe('<ImageScreen />', () => {
    it('should navigate to MainScreen, when button is pressed', () => {

        const navigationMock = {
            navigate: jest.fn()
        }

        const { getByTestId } = render(<ImageScreen navigation={navigationMock} />)
        const buttonContainer = getByTestId('buttonContainer')
        const button = within(buttonContainer).getByTestId('button')
        
        fireEvent.press(button)

        expect(navigationMock.navigate.mock.calls[0][0]).toEqual('MainScreen') 


    })
})