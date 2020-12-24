import React from 'react'
import App from './App'
import 'jest-enzyme'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShalloWrapper for the App component.
 * @function setup
 * @return {ShallowWrapper}
 */
const setup = () => shallow(<App />)

const findByTestAtrr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`)

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAtrr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})

test('renders button', () => {
  const wrapper = shallow(<App />)
  const button = findByTestAtrr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test('renders counter display', () => {
  const wrapper = shallow(<App />)
  const counterDisplay = findByTestAtrr(wrapper, 'increment-button')
  expect(counterDisplay.length).toBe(1)
})

test('counter starts a 0', () => {
  const wrapper = setup()
  const count = findByTestAtrr(wrapper, 'count').text()
  expect(count).toBe('0')
})

test('clicking on button increments counter display', () => {
  const wrapper = setup()

  // find the button
  const button = findByTestAtrr(wrapper, 'increment-button')

  // click the button
  button.simulate('click')

  // find the display, and test that number has been incremented
  const count = findByTestAtrr(wrapper, 'count').text()
  expect(count).toBe('1')
})
