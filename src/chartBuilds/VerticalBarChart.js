import React, { useEffect, useRef} from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import styled from 'styled-components'
import * as d3 from 'd3'
import { format } from 'd3';


const VerticalBarChart = ({data}) => {
    const svgRef = useRef()
    const wrapperRef = useRef();
    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)
    // console.log('data', data)
   
    const xValue = (d) => d.dimensions[0].value
    const yValue = (d) => d.measures[0].value

    const margin = { top: 10, right: 10, bottom: 20, left: 45 };


    
    useEffect(() => {
 
            
        const width = 300;
        const height = 160;

        const svg = d3
			.select(svgRef.current)
			.attr("width", width)
            .attr("height", height);


    // ---------------- months array 
    const xScale = d3.scaleBand()
    .domain(data.map(xValue))
    .range([margin.left, width - margin.right])
    .padding(0.6)
    // console.log('bar', xScale.domain())
 

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
            .call(d3.axisLeft(yScale).tickFormat(format('.2s')))
            .attr("transform", `translate(${margin.left}, 0)`)
            .selectAll('.domain, .tick line').remove()

    
    // --------------------------- bars
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('height', d => height - margin.bottom - yScale(yValue(d)))
            .attr('width', xScale.bandwidth())
            .attr("x", (d) => xScale(d.dimensions[0].value) + 1)
            .attr('y', d => yScale(yValue(d)))
            .attr('fill', 'orange')

    //---------------------------- 2nd bars
        svg.selectAll('.second-bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('height', d => height - margin.bottom - yScale(yValue(d)))
            .attr('width', xScale.bandwidth())
            .attr("x", (d) => xScale(d.dimensions[0].value) - 2)
            .attr('y', d => yScale(yValue(d)) - 3)
            .attr('fill', '#00BEF1')

            
    }, [data])


    return (
        <ChartDiv ref={wrapperRef} style={{ height: '100%', width: '100%'}}>
            <svg ref={svgRef}>
                <g ref={xAxisRef} />
                <g ref={yAxisRef} />
            </svg>
        </ChartDiv>
    )
}

export default VerticalBarChart;

const ChartDiv = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;

    g {
        font-size: 0.85em;
        color: grey;
    }
`