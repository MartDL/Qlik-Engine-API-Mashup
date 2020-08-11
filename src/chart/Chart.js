import React, { useContext, useEffect, useState, useCallback, useRef  } from 'react';

import ObjectsContext from '../context/ObjectsContext';

import VerticalBarChart from '../chartBuilds/VerticalBarChart';
import BarChart from '../chartBuilds/BarChart';
import LineChart from '../chartBuilds/LineChart';
import TableChart from '../chartBuilds/TableChart';


const chartTypes = {
    vertbar: VerticalBarChart,
    barchart: BarChart,
    linechart: LineChart,
    tablechart: TableChart
}

const Chart = ({ objectId, dimensions, measures, type: propChartType }) => {

    const [model, setModel] = useState(null)
    const [data, setData] = useState([])
    const [showChart, setShowChart] = useState(false)

    const { getObject, getObjectLayout, createObject, destroyOldObjects } = useContext(ObjectsContext)
    
    const chartType = useRef()

    if (propChartType) {
      chartType.current = propChartType
    }
  
    const updateLayout = useCallback((model) => {
      return getObjectLayout(model).then(layout => {
      const { qDimensionInfo: dimensionInfo, qMeasureInfo: measureInfo } = layout.qHyperCube
      // console.log('qDimensionInfo', dimensionInfo)
      // console.log('qMeasureInfo', measureInfo)
      const newData = layout.qHyperCube.qDataPages[0].qMatrix.map((x) => {
        return {
          qElemNumber: x[0].qElemNumber,
          dimensions: x.slice(0, dimensionInfo.length).map((d, i) => {
            return {
              label: dimensionInfo[i].qFallbackTitle,
              value: d.qText,
            }
          }),
          measures: x.slice(dimensionInfo.length).map((d, i) => {
            return {
              label: measureInfo[i].qFallbackTitle,
              value: d.qNum,
            }
          }),
          }
        })
        // console.log('newData', newData)
        setData({ chartData: newData, chartType: propChartType || layout.qInfo.qType })
        setShowChart(true)
      })
       },
       [getObjectLayout, propChartType]
    )


    useEffect(() => {
      if(!model) {
        if(objectId) {
          getObject(objectId).then(model => {
            setModel(model)
            updateLayout(model).then(layout => {
            // console.log('new layout', layout)
            })
            model.on('changed', () => {
            updateLayout(model)
            })
          })
            .catch((error) => {
              console.log('GetObject error : ', error)
            })
        } else {
            let def = {
              qDimensions: dimensions.map(x => {
                return {
                  qDef: { qFieldDefs: [x.field] },
                  qNullSuppression: x.excludeNull ? true : false,
                }
              }),
              qMeasures: measures.map((x) => {
                const f = { qDef: { qDef: x.formula, qLabel: x.label } }
                return x.sorting ? { ...f, qSortBy: x.sorting } : f
              }),
              qInterColumnSortOrder: [1, 0],
              qInitialDataFetch: [
              {
                qTop: 0,
                qLeft: 0,
                qWidth: dimensions.length + measures.length,
                qHeight: 100,
              },
            ],
          }
          createObject('cube', def, propChartType).then((model) => {
            setModel(model)
            updateLayout(model)
            model.on('changed', () => {
            updateLayout(model)
            })
          })
        }
      }
      return () => {
        if(model) {
          setModel(null)
          model.removeAllListeners()
          destroyOldObjects(model.id)
        }
      }
    }, [
      getObject,
      createObject,
      model,
      dimensions,
      measures,
      objectId,
      updateLayout,
      destroyOldObjects,
      propChartType
    ])

    if(showChart) {
      const RenderComponent = chartTypes[data.chartType]
    
      if(!chartType) {
        throw new Error(`Invalid Chart type :${data.chartType}`)
      }


    return (
      <div className="chartContainer">
        <RenderComponent 
            data={data.chartData}/>
    
      </div>
    )
}

return null
}

export default Chart;