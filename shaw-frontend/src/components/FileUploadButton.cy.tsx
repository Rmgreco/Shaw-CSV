import React from 'react'
import FileUploadButton from './FileUploadButton'

describe('<FileUploadButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FileUploadButton />)
  })
})