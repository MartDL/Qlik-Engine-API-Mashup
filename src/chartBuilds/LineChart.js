import React, { useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'


const LineChart = ({ data }) =>  {
    const wrapperRef = useRef(null)
    const svgRef = useRef(null)
    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)
    // console.log('data', data)

    const yValue = (d) => d.dimensions[0].value;
    const xValue = (d) => d.dimensions[0].label;

    const newData = data.map(item => item.dimensions[0].value)
    // console.log('new', newData)

    const margin = { top: 0, right: 0, bottom: 20, left: 30 };

    useEffect(() => {
        const width = 450;
        const height = 180;

        const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

  // ---------------- months array 
  const xScale = d3.scaleBand()
  .domain(data.map(xValue))
  .range([margin.left, width - margin.right])
  .padding(0.6)
//   console.log('line', xScale.domain())


  // --------------------- sales amount  
  const yScale = d3.scaleLinear()
  .domain([d3.max(data.map(yValue)), 2500000])
  .range([margin.top, height - margin.bottom])
      

  // ---------------------------- xAxis
  const xAxisG = d3.select(xAxisRef.current)
      xAxisG
          .attr('class', 'xAxisG')
          .attr("transform", `translate(${0}, ${height - margin.bottom})`)
          .call(d3.axisBottom(xScale))
          .selectAll('.domain, .tick line').remove()

  // ----------------------------------yAxis
  const yAxisG = d3.select(yAxisRef.current)
      yAxisG
          .attr('class', 'yAxisG')
          .call(d3.axisLeft(yScale).tickFormat(d3.format('.2s')))
          .attr("transform", `translate(${margin.left}, 0)`)
          .selectAll('.domain, .tick line').remove()


    })
    return (
        <ChartDiv ref={wrapperRef} style={{ height: '100%', width: '100%'}}>
            <svg ref={svgRef}>
                <g ref={xAxisRef} />
                <g ref={yAxisRef} />
            </svg>
        </ChartDiv>
    )
}

export default LineChart

const ChartDiv = styled.div`

`
