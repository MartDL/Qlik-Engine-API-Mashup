import React, { useEffect, useRef} from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import styled from 'styled-components'
import * as d3 from 'd3'
import { format } from 'd3';
const margin = { top: 20, right: 10, bottom: 10, left: 45 };

const VerticalBarChart = ({data}) => {
    const svgRef = useRef()
    const wrapperRef = useRef();
	// const resizedDimensions = useResizeObserver(wrapperRef);
    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)
    console.log({data})
   
    const xValue = (d) => d.dimensions[0].value
    const yValue = (d) => d.measures[0].value

    const width = 280
    const height = 170

    // ---------------- months array 
    const xScale = d3.scaleBand()
    .domain(data.map(xValue))
    .range([margin.left, width - margin.right])
    .padding(0.6)
    // console.log('xSca', xScale.range())

       
    const yScale = d3.scaleLinear()
    .domain([d3.max(data.map(yValue)), 2500000])
    .range([margin.top, height - margin.bottom])
        console.log('yscale:', yScale.domain())

        useEffect(() => {
            const xAxisG = d3.select(xAxisRef.current)
            .attr('class', 'xAxisG')
            .attr("transform", `translate(${0}, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .selectAll('.domain, .tick line').remove()

        }, [xScale])

        useEffect(() => {
            const yAxisG = d3.select(yAxisRef.current)
            yAxisG
                .attr('class', 'yAxisG')
                .call(d3.axisLeft(yScale).tickFormat(format('.2s')))
                .attr("transform", `translate(${margin.left}, 0)`)
                .selectAll('.domain, .tick line').remove()

            
        }, [yScale])

        useEffect(() => {
            const svg = d3.select(svgRef.current)
            svg.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('height', d => height - margin.bottom - yScale(yValue(d)))
                .attr('width', xScale.bandwidth())
                .attr("x", (d) => xScale(d.dimensions[0].value))
                .attr('y', d => yScale(yValue(d)))
                .attr('fill', '#00F1C7')
            
        })



    return (
        <ChartDiv style={{ height: '200px'}}>
            <svg ref={svgRef} style={{ height: '200px'}}>
                
                <g ref={xAxisRef} />
                <g ref={yAxisRef} />
            </svg>
        </ChartDiv>
    )

}

export default VerticalBarChart;

const ChartDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    g {
        font-size: 0.85em;
        color: grey;
    }

    g .tick {

    }
`