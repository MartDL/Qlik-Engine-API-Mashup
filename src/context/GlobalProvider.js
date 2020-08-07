import React from 'react'

import { QlikProvider } from './QlikContext'
import { ObjectsProvider } from './ObjectsContext'


const GlobalState = ({ children }) => {
  return (
    <QlikProvider>
      {/* <ObjectsProvider> */}
        {children}
        {/* </ObjectsProvider> */}
    </QlikProvider>
  )
}

export default GlobalState;