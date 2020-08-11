import React, { useState, useContext, useCallback, useEffect } from 'react'
import QlikContext from './QlikContext'

const ObjectsContext = React.createContext(null)
export default ObjectsContext;

const ObjectsProvider = ({ children }) => {
    const { app } = useContext(QlikContext)
    const [objects, setObjects] = useState([])

    const saveObjectToState = useCallback((newObj) => {
      setObjects((curr) => [...curr, newObj])
    }, [])

    const removeObjectFromState = useCallback(
      (id) => {
        // console.log('objs', objects) 
        const i = objects.findIndex((x) => x.id === id)
        setObjects((curr) => {
          const next = [...curr].splice(i, 1).splice(curr.length, 1)
          return next
        })
      },
      [objects]
    )

    // CREATE OBJECT NECESSARY FOR BUILDING OBJECT FROM QLIK DATA
    const createObject = useCallback(
      async (type, def, charType) => {
        let qType, key
        switch (type) {
          case 'cube':
            qType = 'qHyperCube'
            key = 'qHyperCubeDef'
            break
          case 'list':
            qType = 'qSelectionList'
            key = 'qSelectionListDef'
            break
          case 'selections':
            qType = 'CurrentSelections'
            key = 'qSelectionObjectDef'
            break
          default:
            qType = null
            key = null
            break
        }
        let objDef
        if (qType && key) {
          objDef = {
            qInfo: { qType: qType },
            [key]: def,
          }
        }
        return app.createSessionObject(objDef).then((model) => {
          saveObjectToState({
            id: model.id,
            type: type,
            test: charType,
          })
          return model
        })
      },[app, saveObjectToState]
    )


    // FETCHING AN ALREADY MADE OBJECT FROM QLIK 
    const getObject = useCallback(
      async (objectId) => {
        let model
        try {
          model = await app.getObject(objectId)
        } catch (err) {
          throw new Error ('unable to find this objectId')
        }
        const layout = await model.getLayout()
        const props = await model.getProperties()
        props.qHyperCubeDef.qInitialDataFetch = [
            {
              qTop: 0,
              qLeft: 0,
              qWidth: 7,
              qHeight: 7,
            },
          ]
          await model.setProperties(props) 
          saveObjectToState({
            id: model.id,
            type: 'cube'
          })
          return model
        },
        [app, saveObjectToState],
    )

    const destroyOldObjects = useCallback(
      async (modelId) => {
        removeObjectFromState(modelId)
        await app.destroySessionObject(modelId)
      },[app]
    )

    useEffect(() => {
      // console.log(objects)
    }, [objects])


    // FETCHING LAYOUT FROM QICK
    const getObjectLayout = useCallback(async (model) => {
      const timer = () => new Promise((res) => setTimeout(res, 200))
      let layout
      while (!layout) {
        try {
          layout = await model.getLayout()
          // console.log('layout', layout)
        } catch (err) {
        await timer()
        }
      }
      return layout
      }, []
    )
    
    return (
        <div>
        <ObjectsContext.Provider value={{ objects, getObject, getObjectLayout, createObject, destroyOldObjects }} >
            {children}
        </ObjectsContext.Provider>
        </div>
    )
}

export { ObjectsProvider }
