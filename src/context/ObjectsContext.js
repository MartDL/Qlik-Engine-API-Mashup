import React, { useState, useEffect, useContext, useCallback } from 'react';
import QlikContext from './QlikContext';

const ObjectsContext = React.createContext(null)
export default ObjectsContext;



const ObjectsProvider = ({ children }) => {
    const { app } = useContext(QlikContext);
    const [objects, setObjects] = useState()


    const getObject = useCallback(async (objectId) => {
        const model = await app.getObject(objectId)
        const layout = await model.getLayout()
        const props = await model.getProperties()
        props.qHyperCubeDef.qInitialDataFetch = [
            {
                qTop: 0,
                qLeft: 0,
                qWidth: layout.qHyperCube.qSize.qcx,
                qHeight: 7,
              },
        ]
        const propsData = await model.setProperties(props)
        setObjects(propsData)
        return model;
    }, [app])


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
          <ObjectsContext.Provider value={{ app, getObject, getObjectLayout}}>
            {children}
          </ObjectsContext.Provider>
        </div>
    )
}

export { ObjectsProvider };

// import React, { useState,useContext, useEffect } from 'react'
// import QlikContext from '../context/QlikContext'

// const def = {
//     qInfo: {
//         qType: 'qHyperCube' 
//     },
//     qHyperCubeDef: {
//         qDimensions: [{ qDef: { qFieldDefs: ['Sales Rep Name']}}],
//         qMeasures: [ {qDef: { qDef: 'Avg([Lead Time])', qLabel: 'Average lead Time'}}],
//     }, 
//     qInitialDataFetch: [{ qTop: 0, qLeft: 0, qHeight: 100, qWidth: 3 }],  
// }


// const Chart = ({objectId}) => {
//     const {app} = useContext(QlikContext) 
//     const [data, setData] = useState(null)
//     const [madeData, setMadeData] = useState(null)

//     useEffect(() => {
//         const getObject = async () => {
//             const model = await app.getObject(objectId)
//             const layout = await model.getLayout()
//             const text = await layout.qHyperCube.qDataPages[0].qMatrix.map(item => item[0].qText)
//             const nums = await layout.qHyperCube.qDataPages[0].qMatrix.map(item => item[1].qNum)
//             const newData = [text, nums]
//             console.log('newData', newData)
//             setData(layout)
//         }
//         getObject()
//     }, [objectId, app])

//     useEffect(() => {
//         const createObject = async () => {
//             const model = await app.createSessionObject(def)
//             const layout = await model.getLayout()
//             const props = await model.getProperties()
//             console.log('createObject Layout:', layout)
//             console.log('createObject Properties:', props)
//             setMadeData(layout)
//         }
//         createObject()
//     }, [app])

    
//     return ( 
//             data || madeData ?
//         <div>
//             <h1>Chart</h1>
//         </div> 
//         : null
//     )
// }

// export default Chart;