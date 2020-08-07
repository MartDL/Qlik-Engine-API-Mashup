import React, { useState, useEffect } from 'react'
import { openSession, closeSession } from '../utils/qlik_connectEnigma'

const QlikContext = React.createContext(null)
export default QlikContext

const QlikProvider = ({ children }) => {
  const [app, setApp] = useState(null)

  useEffect(() => {
    openSession().then((app) => {
      setApp(app)
    })
    return closeSession
  }, [])
  // console.log('QlikContext: app', app)
  return (
    <>
      {!app ? (
        <div>Loading...</div>
      ) : (
        <QlikContext.Provider value={{ app }}>{children}</QlikContext.Provider>
      )}
    </>
  )
}

export { QlikProvider }