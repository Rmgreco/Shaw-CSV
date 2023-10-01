import React from 'react'
import ErrorDisplay from './ErrorDisplay'

describe('<ErrorDisplay />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ErrorDisplay error={"Erro"} />)
  })
})