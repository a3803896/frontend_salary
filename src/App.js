import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// svg 設定
const width = '1100';
const height = '600';
const margin = { top: 20, right: 20, bottom: 70, left: 90 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

export default function App() {
  // data
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const xValue = (d) => d.cases;
  const yValue = (d) => d.deaths;
  const svg = d3.select(svgRef.current);
  let xScale;
  let yScale;
  let sizeScale;
  // mounted
  useEffect(() => {
    getData();
  }, []);
  // watch
  useEffect(() => {
    if (!data.length) return;
    renderInit();
    let c = 0;
    let intervalId = setInterval(() => {
      if (c === data.length) return clearInterval(intervalId);
      draw(data[c]);
      c++;
    }, 50);
  }, [data]);
  function draw(d) {
    d3.select('circle')
      .transition()
      .duration(100)
      .attr('cx', xScale(d.cases))
      .attr('cy', yScale(d.deaths))
      .attr('r', sizeScale(d.cases * d.deaths));
  }
  function renderInit() {
    xScale = d3.scaleLinear().domain(d3.extent(data, xValue)).range([0, innerWidth]).nice();
    yScale = d3.scaleLinear().domain(d3.extent(data, yValue).reverse()).range([0, innerHeight]).nice();
    sizeScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.cases * d.deaths))
      .range([10, 50]);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`).attr('id', 'maingroup');
    const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(10);
    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);
    const xAxisGroup = g.append('g').call(xAxis).attr('transform', `translate(0,${innerHeight})`);
    const yAxisGroup = g.append('g').call(yAxis);
    xAxisGroup
      .append('text')
      .text('確診人數')
      .attr('font-size', '2em')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${innerWidth / 2},50)`);
    yAxisGroup
      .append('text')
      .text('死亡人數')
      .attr('font-size', '2em')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(-40,${innerHeight / 2}) rotate(-90)`);
    d3.select('#maingroup')
      .append('circle')
      .attr('cx', xScale(data[0].cases))
      .attr('cy', yScale(data[0].deaths))
      .attr('r', '10')
      .attr('fill', 'black')
      .attr('opacity', 0.8);
  }
  async function getData() {
    const format = (d) => {
      d.date = new Date(d.date);
      d.cases = +d.cases;
      d.deaths = +d.deaths;
      return d;
    };
    const res = await d3.csv('https://gist.githubusercontent.com/caracao718/1e8f6c76bc818a7c29946f53e3db745f/raw/data.csv', format);
    setData(res);
  }
  // template
  return <svg ref={svgRef} width={width} height={height}></svg>;
}
