import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import * as d3 from 'd3'
import { scaleLinear, max, axisLeft, axisBottom, format, scaleBand } from 'd3';


function BarChart({data }) {
    const svgRef = useRef()
    const wrapperRef = useRef();
    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)
 
    console.log('data', data)
    const BarData = data.slice(3,7)
    console.log('red', BarData)

    const yValue = (d) => d.dimensions[0].value
    const xValue = (d) => d.measures[0].value

    const margin = { top: 0, right: 0, bottom: 20, left: 30 };


    useEffect(() => {

        const width = 450;
        const height = 180;
    

        const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

// ------------------------ X Scale
        const xScale = scaleLinear()
        .domain([ 51300000, d3.max(BarData.map(xValue))])
        .range([margin.left,  600])
        // console.log('xScale dom', xScale.domain())

            
// ------------------------- Y Scale
        const yScale = scaleBand()
            .domain(BarData.map(yValue))
            .range([margin.left, height - margin.bottom])
            .padding(0.4)
            // console.log('yscale', yScale.domain())

// ------------------------ X Axis
        const xAxisG = d3.select(xAxisRef.current)
            xAxisG
            .attr('class', 'xAxisG')
            .attr("transform", `translate(${0}, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(6).tickFormat(format('.3s')))
            .selectAll('.domain, .tick line').remove()
            

// ------------------------ Y Axis
        const yAxisG = d3.select(yAxisRef.current)
            yAxisG
            .attr('class', 'yAxisG')
            .call(d3.axisLeft(yScale))
            .attr("transform", `translate(${margin.left}, 0)`)
            .selectAll('.domain, .tick line').remove()

// ------------------------- bar
        svg.selectAll('.bar')
            .data(BarData)
            .enter()
            .append('rect')
            .attr('width', d => xScale(xValue(d)) - 70)
            .attr('height', yScale.bandwidth())
            .attr('y', d => yScale(yValue(d)))
            .attr("x", 30)
            .attr('fill', 'orange')

        svg.selectAll('.secondBar')
            .data(BarData)
            .enter()
            .append('rect')
            .attr('width', d => xScale(xValue(d)) - 70)
            .attr('height', yScale.bandwidth())
            .attr('y', d => yScale(yValue(d)) - 4)
            .attr("x", 26)
            .attr('fill', '#00BEF1')

            // svg.selectAll('.second-bar')
            // .data(data)
            // .enter()
            // .append('rect')
            // .attr('height', d => height - margin.bottom - yScale(yValue(d)))
            // .attr('width', xScale.bandwidth())
            // .attr("x", (d) => xScale(d.dimensions[0].value) - 2)
            // .attr('y', d => yScale(yValue(d)) - 3)
            // .attr('fill', '#00BEF1')

}, [data, BarData, margin.bottom, margin.left, margin.right])


    return (
        <ChartDiv ref={wrapperRef} style={{ height: '100%', width: '100%'}}>
            <svg ref={svgRef} style={{ width: '90%'}}>
                <g ref={xAxisRef} />
                <g ref={yAxisRef} />
            </svg>
        </ChartDiv>
            )
}

export default BarChart;

const ChartDiv = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;

    g {
        font-size: 0.85em;
        color: grey;
    }
`