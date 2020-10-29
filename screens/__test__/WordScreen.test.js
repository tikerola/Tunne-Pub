import { waitFor } from '@testing-library/react-native'
import React from 'react'
import { render, fireEvent, store } from '../../test-utils'
import WordScreen from '../WordScreen'

afterAll(() => {
    store.clearActions()
})

describe('<WordScreen />', () => {

    const navigationMock = {
        navigate: jest.fn()
    }

    it('should match snapshot', () => {
        const result = render(<WordScreen />).toJSON()

        expect(result).toMatchSnapshot()
    })

    it('should handle onSave, when wordType is feelingsWords', async () => {

        const mockRoute = {
            params: { wordType: 'feelingsWords', navigateBackTo: 'MainScreen'}
        }

        const rendered = render(<WordScreen navigation={navigationMock} route={mockRoute} />)
        const button = rendered.getByTestId('button')

        fireEvent.press(button)

        const actions = await waitFor(() => store.getActions())
        
        expect(actions[0].type).toEqual('SET SCREEN NUMBER')
        expect(actions[0].screenNumber).toBe(1)
        expect(navigationMock.navigate.mock.calls[0][0]).toEqual('MainScreen')

    })

    it('should handle onSave, when wordType is needs', async () => {

        store.clearActions()

        const mockRoute = {
            params: { wordType: 'needs', navigateBackTo: 'ThirdScreen'}
        }

        const rendered = render(<WordScreen navigation={navigationMock} route={mockRoute} />)
        const button = rendered.getByTestId('button')

        fireEvent.press(button)

        const actions = await waitFor(() => store.getActions())
        
        expect(actions[0].type).toEqual('SET SCREEN NUMBER')
       
        expect(actions[0].screenNumber).toBe(3)
        expect(navigationMock.navigate).toHaveBeenCalledWith('ThirdScreen')

    })
})