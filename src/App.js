import React from 'react';
import * as d3 from 'd3';
import useData from './plugins/useData';

// svg 設定
const width = '1200';
const height = '650';
const margin = { top: 20, right: 20, bottom: 70, left: 80 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

export default function App() {
  // 資料
  const data = useData();
  // 選項
  const xOption = 'timestamp';
  const yOption = 'temperature';
  // 圖表設定
  const xValue = data.map((item) => item[xOption]);
  const yValue = data.map((item) => item[yOption]);
  const xScale = d3.scaleTime().domain(d3.extent(xValue)).range([0, innerWidth]);
  const yScale = d3.scaleLinear().domain(d3.extent(yValue)).range([innerHeight, 0]).nice();
  // 產生 XY 軸線
  d3.select('.axis_bottom').call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%m/%d %H%p')));
  d3.select('.axis_left').call(d3.axisLeft(yScale));
  // 畫線
  const line = d3
    .line()
    .x((d) => xScale(d[xOption]))
    .y((d) => yScale(d[yOption]))
    .curve(d3.curveNatural);
  // template
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <path d={line(data)} fill='none' stroke='black' strokeWidth='5' strokeLinejoin='round' strokeLinecap='round'></path>
        <g className='axis_bottom' transform={`translate(0,${innerHeight})`}></g>
        <g className='axis_left'></g>
        <ChartLabel xOption={xOption} yOption={yOption} />
      </g>
    </svg>
  );
}

// XY 軸線標籤
function ChartLabel({ xOption, yOption }) {
  return (
    <>
      <text style={{ fontSize: '24px' }} textAnchor='middle' transform={`translate(${innerWidth / 2},${innerHeight + 60})`}>
        {xOption}
      </text>
      <text style={{ fontSize: '24px' }} textAnchor='middle' transform={`translate(-40,${innerHeight / 2}) rotate(-90)`}>
        {yOption}
      </text>
    </>
  );
}
