import React from 'react'
import classNames from 'classnames'
import {string} from 'prop-types'
import sidebarProcessSymbols from './sidebar-symbols'

const Symbol = ({status}) => {
  const symbol = sidebarProcessSymbols[status]
  const symbolClass = classNames({
    'success-symbol': status === 'success',
    'non-app-sybol': status === 'n/a',
  })

  return <span className={symbolClass}>{symbol}</span>
}

Symbol.propTypes = {
  status: string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
}

export default Symbol
