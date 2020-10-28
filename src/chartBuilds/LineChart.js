import React, { useRef, useEffect} from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'
import './styles.css'
import { curveBasis } from 'd3';

const LineChart = ({ data }) =>  {
    const wrapperRef = useRef(null)
    const svgRef = useRef(null)
    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)

    const yValue = (d) => d.measures[1].value;
    const yValue0 = (d) => d.measures[0].value;

    // ------------------- budget dataset
    const budget_data = d3.nest()
        .key(d => d.measures[0].label)
        .entries(data)
        console.log('budget', budget_data)

    // -------------------- amount dataset
    const amount_data = d3.nest()
        .key(d => d.measures[1].label)
        .entries(data)
        console.log('amount', amount_data)
    
    // ------------------ color scale
    const colorScale = d3.scaleOrdinal()
        .domain()

    const margin = { top: 10, right:20, bottom: 20, left: 55 };

        useEffect(() => {
            const width = 950;
            const height = 193;

            const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // ------------------------------Y scale
            const yScale = d3.scaleLinear()
                .domain([d3.max(data, yValue0) + 3000000, d3.min(data, yValue0) - 10000000])
                .range([0, 150])
                .nice()

        // ------------------------------X scale
            const xScale = d3.scalePoint()
                .domain(data.map(d => d.dimensions[0].value))
                .range([0, width])
                .padding(1)
        
        // ---------------------------- xAxis
            const xAxisG = d3.select(xAxisRef.current)
            xAxisG
                .attr('class', 'xAxisG')
                .attr("transform", `translate(${32}, ${height - margin.bottom - 13})`)
                .call(d3.axisBottom(xScale))
                .selectAll('.domain, .tick line').remove()
                svg.selectAll('text')  // rotate xAxis labels 60 degrees 
                .attr('transform', 'rotate(-18)')
                .attr("y", 10)
                .attr("x", -5)

        // ------------------------------- yAxis
            const yAxisG = d3.select(yAxisRef.current)
            yAxisG
                .attr('class', 'yAxisG')
                .call(d3.axisLeft(yScale).tickFormat(d3.format('.2s')))
                .attr("transform", `translate(42, 10)`)
                .selectAll('.domain, .tick line').remove()

        // ------------------------------- budget line
            const budgetLine = d3.line()
                .x(d => xScale(d.dimensions[0].value))
                .y( d => yScale(yValue0(d)))
                .curve(curveBasis)

                yAxisG.selectAll('.budgetLine')
                    .data(budget_data)
                    .enter()
                    .append('path')
                    .attr('class', 'budgetLine')
                    .attr('d', d => budgetLine(d.values))

        // ------------------------------- amount line
            const amountLine = d3.line()
                .x(d => xScale(d.dimensions[0].value))
                .y( d => yScale(yValue(d)))
                .curve(curveBasis)

                yAxisG.selectAll('.amountLine')
                    .data(amount_data)
                    .enter()
                    .append('path')
                    .attr('class', 'amountLine')
                    .attr('d', d => amountLine(d.values))
        }, [])

    return (
        <ChartDiv ref={wrapperRef} style={{ height: '100%', width: '100%'}}>
            <svg ref={svgRef}>
                <g ref={xAxisRef} />
                <g ref={yAxisRef} />
            </svg>
            <Legend className="colorLegend">
                <div className="budgetLegend">
                    <p>budget</p>
                    <div className="budgetColor"></div>
                </div>
                <br/>
                </Legend>
        </ChartDiv>
    )
}

export default LineChart

const ChartDiv = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;

    g {
        font-size: 0.85em;
        color: grey;
    }
`
const Legend = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    .budgetLegend {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    p {
        font-size: 10px;
    }

    .budgetColor {
        height: 10px;
        width: 30px;
        border-radius: 10px;
        background-color:#00BEF1;
    }

`




// code for dotted points
    // ---------------------------------- dots
        // svg.selectAll('circle')
        //     .data(data)
        //     .enter()
        //     .append('circle')
        //     .attr('cx', xScale.bandwidth())
        //     .attr('r', 6)
        //     .attr('cx', d => xScale(d.dimensions[0].value) + 40)
        //     .attr('cy', d => yScale(yValue(d)))
        //     .attr('fill', '#00BEF1')