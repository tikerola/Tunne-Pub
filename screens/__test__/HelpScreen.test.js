import React from 'react'
import HelpScreen from '../HelpScreen'
import { render, cleanup, store, waitFor } from '../../test-utils'



beforeEach(() => {
  cleanup()
  store.clearActions()
})

describe('<HelpScreen />', () => {
  it('should render a title', () => {
    const { getByTestId } = render(<HelpScreen />)
    const title = getByTestId('title')
    expect(title.children).toContain("Tervetuloa")
  })

  it('should match snapshot', () => {
    const result = render(<HelpScreen />).toJSON()
    expect(result).toMatchSnapshot()
  })

  it('should dispatch reset activeSummaryItemId if coming to helpscreen during editing', async () => {

    const rendered = render(<HelpScreen />)
    const actions = await waitFor(() => store.getActions(), { timeout: 5000 })
    
    expect(actions[0].type).toEqual('SET ACTIVE SUMMARY ITEM ID')
  })

  it('should load items when asyncstorage is not empty', async () => {

    const renderer = render(<HelpScreen />)
    const actions = await waitFor(() => store.getActions(), { timeout: 5000 })
    

    expect(actions[1].type).toEqual('LOAD SUMMARY ITEMS')

  })

})
