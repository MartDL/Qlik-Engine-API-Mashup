import React, { useContext, useEffect, useState, useCallback, useRef  } from 'react';
import ExtractData from '../helper/ExtractData'
import ObjectsContext from '../context/ObjectsContext';
import VerticalBarChart from '../chartBuilds/VerticalBarChart'

const Chart = ({ objectId }) => {
    const [model, setModel] = useState(null)
    const [data, setData] = useState([])
    const { getObject, getObjectLayout } = useContext(ObjectsContext)

    const updateLayout = useCallback( 
        async (model) => {
            const layout = await getObjectLayout(model)
            const { qDimensionInfo, qMeasureInfo } = await layout.qHyperCube;
            console.log('qDim', qDimensionInfo)
            const qMatrix = await layout.qHyperCube.qDataPages[0].qMatrix;
            const newData = await ExtractData(qMatrix, qDimensionInfo, qMeasureInfo);
            console.log(newData)
            
            setData(newData)

    }, [getObjectLayout])


	useEffect(() => {
		(async () => {
			if (!model) {		
				if (objectId) {
					const model = await getObject(objectId);
					setModel(model);
					await updateLayout(model);
					await model.on("changed", () => updateLayout(model));
				} 
			}
		})();
		return () => {
			if (model) {
				setModel(null);
                model.removeAllListeners();
            }
		};
	}, [getObject,model, objectId, updateLayout]);



    return ( 
        <div>
            <VerticalBarChart
            data={data} />
            
        </div> 
    )
}

export default Chart
