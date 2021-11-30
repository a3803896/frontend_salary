import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import useData from './plugins/useData';

const width = '1200';
const height = '600';
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

export default function App() {
  const data = useData();
  const [setosa, setSetosa] = useState([]);
  const [versicolor, setVersicolor] = useState([]);
  const [virginica, setVirginica] = useState([]);
  const xChoose = 'sepal_length';
  const yChoose = 'sepal_width';
  const xValue = data.map((item) => item[xChoose]);
  const yValue = data.map((item) => item[yChoose]);
  const xScale = d3.scaleLinear().domain(d3.extent(xValue)).range([0, innerWidth]).nice();
  const yScale = d3.scaleLinear().domain(d3.extent(yValue)).range([0, innerHeight]);
  d3.select('.axis_bottom').call(d3.axisBottom(xScale));
  d3.select('.axis_left').call(d3.axisLeft(yScale));
  useEffect(() => {
    if (!data) return;
    setSetosa(data.filter((d) => d.species === 'setosa'));
    setVersicolor(data.filter((d) => d.species === 'versicolor'));
    setVirginica(data.filter((d) => d.species === 'virginica'));
  }, [data]);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g className='setosa'>
          {setosa.map((d) => (
            <Dot key={d.id} d={d} fill='#783B3C' xChoose={xChoose} yChoose={yChoose} xScale={xScale} yScale={yScale} />
          ))}
        </g>
        <g className='versicolor'>
          {versicolor.map((d) => (
            <Dot key={d.id} d={d} fill='#20988E' xChoose={xChoose} yChoose={yChoose} xScale={xScale} yScale={yScale} />
          ))}
        </g>
        <g className='virginica'>
          {virginica.map((d) => (
            <Dot key={d.id} d={d} fill='#CEB146' xChoose={xChoose} yChoose={yChoose} xScale={xScale} yScale={yScale} />
          ))}
        </g>
        <g className='axis_bottom' transform={`translate(0,${innerHeight + 10})`}></g>
        <g className='axis_left'></g>
      </g>
    </svg>
  );
}

function Dot({ d, fill, xScale, yScale, xChoose, yChoose }) {
  return <circle cx={xScale(d[xChoose])} cy={yScale(d[yChoose])} r='4' stroke={fill} strokeWidth='2' fill='transparent' opacity='0.8' />;
}
