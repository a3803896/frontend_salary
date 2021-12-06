import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function App() {
  // data
  let innerWidth;
  let innerHeight;
  const [rawData] = useState([
    { month: new Date('2018-1-1'), apples: 100, bananas: 200, oranges: 150 },
    { month: new Date('2018-2-1'), apples: 150, bananas: 150, oranges: 150 },
    { month: new Date('2018-3-1'), apples: 200, bananas: 250, oranges: 150 },
    { month: new Date('2018-4-1'), apples: 250, bananas: 300, oranges: 150 },
  ]);
  const [data, setData] = useState(null);
  // mounted
  useEffect(() => {
    getData();
  }, []);
  // watch
  useEffect(() => {
    if (!data) return;
    draw();
    window.addEventListener('resize', draw);
    return () => {
      window.removeEventListener('resize', draw);
    };
  }, [data]);
  function draw() {
    const g = renderInit();
    const maxValue = d3.max(data, (d) => d3.max(d, (sub) => sub[1]));
    const xScale = d3
      .scaleBand()
      .domain(rawData.map((d) => d.month))
      .range([0, innerWidth])
      .padding(0.33);
    const yScale = d3.scaleLinear().domain([0, maxValue]).range([innerHeight, 0]).nice();
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.key))
      .range(d3.schemeSet3);
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y/%m')).tickSize(-innerHeight).tickPadding(10);
    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);
    g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerHeight})`).call(xAxis);
    g.append('g').attr('class', 'y-axis').call(yAxis);
    // 第一層
    g.selectAll('datagroup')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'datagroup')
      .attr('fill', (d) => colorScale(d.key))
      // 第二層
      .selectAll('datarect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('class', 'datarect')
      .attr('x', (sub) => xScale(sub.data.month))
      .attr('y', (sub) => yScale(sub[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => yScale(d[0]) - yScale(d[1]));
  }
  function renderInit() {
    d3.select('.wrap svg').remove();
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = parseInt(d3.select('.wrap').style('width'));
    const height = width * 0.5;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.wrap').append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${margin.left},${margin.top})`);
    return g;
  }
  async function getData() {
    const stack = d3.stack().keys(['apples', 'bananas', 'oranges']).order(d3.stackOrderNone);
    const nativeStack = stack(rawData);
    setData(nativeStack);
  }
  // template
  return <div className='wrap'></div>;
}
