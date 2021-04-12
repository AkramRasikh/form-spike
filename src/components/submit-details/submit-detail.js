/* eslint-disable react/forbid-prop-types */
import {string} from 'prop-types'
import React from 'react'

const SubmitDetail = ({label, detail}) => (
  <div>
    <p>
      <span>{label}:</span> <span>{detail}</span>
    </p>
  </div>
)

SubmitDetail.propTypes = {
  detail: string.isRequired,
  label: string.isRequired,
}

export default SubmitDetail
