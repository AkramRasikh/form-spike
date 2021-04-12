/* eslint-disable react/forbid-prop-types */
import {func, object} from 'prop-types'
import React from 'react'
import SubmitDetail from './submit-detail'

const CompletedDetails = ({details, formKey, submitAllDetails}) => (
  <div>
    {Object.keys(details).map(key => (
      <SubmitDetail
        key={formKey[key]}
        label={formKey[key]}
        detail={details[key]}
      />
    ))}

    <div className="submit-details-btn">
      <button type="button" onClick={submitAllDetails}>
        Submit
      </button>
    </div>
  </div>
)

CompletedDetails.propTypes = {
  submitAllDetails: func.isRequired,
  details: object.isRequired,
  formKey: object.isRequired,
}

export default CompletedDetails
