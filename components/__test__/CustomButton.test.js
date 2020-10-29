import React from 'react'
import { render, cleanup } from '../../test-utils'
import CustomButton from '../CustomButton'



describe('<CustomButton />', () => {
    it('should render a title', () => {
        const renderer = render(<CustomButton title="lähetä" />)
        
        const title = renderer.getByTestId('title')

        expect(title.children).toContain('lähetä')
    })
})

