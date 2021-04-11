import React from 'react'

const CompletedDetails = ({details, formKey}) =>
  Object.keys(details).map(key => (
    <div key={formKey[key]}>
      <p>
        <span>{formKey[key]}:</span> <span>{details[key]}</span>
      </p>
    </div>
  ))

export default CompletedDetails
