import React from 'react'
import ErrorDisplay from './ErrorDisplay'

describe('<ErrorDisplay />', () => {
  it('renders', () => {

    cy.mount(<ErrorDisplay error={"Erro"} />)
  })
})