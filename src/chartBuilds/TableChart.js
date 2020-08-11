import React, { useState, useEffect, useContext} from 'react'
import QlikContext from '../context/QlikContext';

const Table = ({ data, objectId} ) => {
    const  {app} = useContext(QlikContext)
  
    const [newData, setNewData] = useState(null)

    console.log('dataTab', data)

    useEffect(() => {
    const getTable = async () => {
        const model = await app.getObject(objectId)
        const layout = await model.getLayout()
        let props = await model.getProperties()
      
        props.qHyperCubeDef.qInitialDataFetch = [
      {
        qTop: 0,
        qLeft: 0,
        qWidth: layout.qHyperCube.qSize.qcx,
        qHeight: layout.qHyperCube.qSize.qcy,
      },
    ]
        layout.qHyperCube.qDataPages = await model.getHyperCubeData(
            '/qHyperCubeDef',
            props.qHyperCubeDef.qInitialDataFetch
          )
        const { qDimensionInfo: dimensionInfo } = layout.qHyperCube
        console.log('qDimensionInfo', dimensionInfo)
        const newData = layout.qHyperCube.qDataPages[0].qMatrix.map((x) => {
          return {
            qElemNumber: x[0].qElemNumber,
            dimensions: x.slice(0, dimensionInfo.length).map((d, i) => {
              return {
                label: dimensionInfo[i].,
                value: d.qText,
              }
            })
            }
          })
          console.log(layout)
          console.log('n', newData)
   
      setNewData(layout)

    }
    getTable()
  }, [])

  


// console.log('newData', newData)



  
    return (
        <div>
         
        </div>
    )
}

export default Table;