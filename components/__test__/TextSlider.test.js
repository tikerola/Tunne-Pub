
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { render, fireEvent, store, waitFor, screen } from '../../test-utils'
import TextSlider from '../TextSlider'
import { toggleWord } from '../../store/actions/cards'

afterAll(() => {
    store.clearActions()
})


describe('<TextSlider />', () => {

    const textData = [
        {
            id: '1',
            word: 'moi'
        },
        {
            id: '2',
            word: 'hei'
        },
        {
            id: '3',
            word: 'jippii'
        }
    ]

    

    it('should match snapshot', () => {
        const result = render(<TextSlider />).toJSON()
        expect(result).toMatchSnapshot()
    })
    
    it('should trigger an action with right parameters depending on whats stored in redux', async () => {
        const rendered = render(<TextSlider textData={textData} saveToRedux={toggleWord} wordType="needs" />)
        
        let items = rendered.UNSAFE_getAllByType('Text')

        fireEvent.press(items[1])
        let actions = await waitFor(() => store.getActions())

        expect(actions[0].type).toEqual('TOGGLE WORD')
        expect(actions[0].isAdd).toEqual(true)
        expect(actions[0].typeOfWord).toEqual('needs')

        fireEvent.press(items[2])
        actions = await waitFor(() => store.getActions())
        expect(actions[1].isAdd).toEqual(false)
        
    })

})