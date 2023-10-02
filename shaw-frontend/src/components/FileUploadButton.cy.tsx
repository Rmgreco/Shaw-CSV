import React from 'react'
import FileUploadButton from './FileUploadButton'

describe('<FileUploadButton />', () => {
  it('renders', () => {

    cy.mount(<FileUploadButton onFileUpload={()=>{}}/>)
  })
})