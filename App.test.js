import React from 'react'
import App from './App'
import { render } from '@testing-library/react-native'

describe('<App />', () => {
  it('should match snapshot', () => {
    const result = render(<App />).toJSON()
    expect(result).toMatchSnapshot() 
  })
})