import React from 'react';
import * as d3 from 'd3';
import useData from './plugins/useData';

const width = '960';
const height = '500';
const margin = { top: 20, right: 20, bottom: 53, left: 200 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
export default function App() {
  const data = useData();
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight])
    .paddingInner(0.2);
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (item) => item.Populaton2020)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom innerHeight={innerHeight} xScale={xScale} />
        <AxisLeft yScale={yScale} />
        <Marks data={data} xScale={xScale} yScale={yScale} />
        <text x={innerWidth / 2} y={innerHeight + 33} style={{ textAnchor: 'middle' }}>
          Population
        </text>
      </g>
    </svg>
  );
}

function AxisBottom({ xScale, innerHeight }) {
  return xScale.ticks(10).map((val) => (
    <g key={xScale(val)} transform={`translate(${xScale(val)},0)`}>
      <line y2={innerHeight} stroke='black' />
      <text style={{ textAnchor: 'middle' }} dy='.71em' y={innerHeight + 3}>
        {d3
          .format('.2s')(val * 1000)
          .replace('G', 'B')}
      </text>
    </g>
  ));
}

function AxisLeft({ yScale }) {
  return yScale.domain().map((val) => (
    <text key={yScale(val)} style={{ textAnchor: 'end' }} x={-3} y={yScale(val) + yScale.bandwidth() / 2} dy='.31em'>
      {val}
    </text>
  ));
}

function Marks({ data, xScale, yScale }) {
  return data.map((item) => <rect key={item.Country} x={0} y={yScale(item.Country)} width={xScale(item.Populaton2020)} height={yScale.bandwidth()} />);
}
