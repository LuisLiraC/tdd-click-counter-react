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

describe('App component', () => {
  test('renders without error', () => {
    const wrapper = setup()
    const appComponent = findByTestAtrr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1)
  })
})

describe('Counter display', () => {
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
})

describe('Increment', () => {
  test('renders increment button', () => {
    const wrapper = shallow(<App />)
    const incrementButton = findByTestAtrr(wrapper, 'increment-button')
    expect(incrementButton.length).toBe(1)
  })

  test('counter increments when button is clicked', () => {
    const wrapper = setup()

    const button = findByTestAtrr(wrapper, 'increment-button')
    button.simulate('click')

    const count = findByTestAtrr(wrapper, 'count').text()
    expect(count).toBe('1')
  })
})

describe('Decrement', () => {
  test('renders decrement button', () => {
    const wrapper = setup()
    const decrementButton = findByTestAtrr(wrapper, 'decrement-button')
    expect(decrementButton.length).toBe(1)
  })

  test('counter decrements when button is clicked and state is greater than zero', () => {
    const wrapper = setup()
    const incrementButton = findByTestAtrr(wrapper, 'increment-button')
    incrementButton.simulate('click')

    const decrementButton = findByTestAtrr(wrapper, 'decrement-button')
    decrementButton.simulate('click')

    const count = findByTestAtrr(wrapper, 'count').text()
    expect(count).toBe('0')
  })

  describe('Error when counter goes below 0', () => {
    test('error does not show when not needed', () => {
      const wrapper = setup()
      const errorDiv = findByTestAtrr(wrapper, 'error-message')

      const errorHasHiddenClass = errorDiv.hasClass('hidden')
      expect(errorHasHiddenClass).toBe(true)
    })
  })

  describe('Counter is 0 and decrement is clicked', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setup()
      const decrementButton = findByTestAtrr(wrapper, 'decrement-button')
      decrementButton.simulate('click')
    })

    test('error shows', () => {
      const errorDiv = findByTestAtrr(wrapper, 'error-message')
      const errorHasHiddenClass = errorDiv.hasClass('hidden')
      expect(errorHasHiddenClass).toBe(false)
    })

    test('counter still displays 0', () => {
      const count = findByTestAtrr(wrapper, 'count').text()
      expect(count).toBe('0')
    })

    test('clicking increment clears the error', () => {
      const incrementButton = findByTestAtrr(wrapper, 'increment-button')
      incrementButton.simulate('click')

      const errorDiv = findByTestAtrr(wrapper, 'error-message')
      const errorHasHiddenClass = errorDiv.hasClass('hidden')
      expect(errorHasHiddenClass).toBe(true)
    })
  })
})

// Challenges
// 1. Decrement Button
// 2. No count below zero
//  - Display a message saying the counter can't go below zero
// 3. Clear error on increment
