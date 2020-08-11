const ExtractData = async (qMatrix, qDimensionInfo, qMeasureInfo) => {
	const newData = await qMatrix.map((x) => (
		{
		qElemNumber: x[0].qElemNumber,
		dimensions: x.slice(0, qDimensionInfo.length).map((d) => {
			return {
				label: qDimensionInfo[0].qFallbackTitle,
				value: d.qText,
				qElemNumber: d.qElemNumber,
			};
		}),
		measures: x.slice(qDimensionInfo.length).map((d, i) => {
			return {
				label: qMeasureInfo[i].qFallbackTitle,
				value: d.qNum,
				qElemNumber: d.qElemNumber,
			};
		}),
	}));
	return newData;
};

export default ExtractData;