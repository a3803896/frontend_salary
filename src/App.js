import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

// svg 設定
const width = '1200';
const height = '650';
const margin = { top: 20, right: 20, bottom: 50, left: 140 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

export default function App() {
  // data
  const [data, setData] = useState([]);
  // mounted
  useEffect(() => {
    getData();
  }, []);
  // watch
  useEffect(() => {
    if (!data.length) return;
    const svg = d3.select('svg');
    const g = svg.append('g').attr('id', 'maingroup').attr('transform', `translate(${margin.left},${margin.top})`);
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d['2020'])])
      .range([0, innerWidth]);
    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.Country))
      .range([0, innerHeight])
      .padding(0.1);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    g.append('g').call(xAxis).attr('transform', `translate(0,${innerHeight})`);
    g.append('g').call(yAxis);
    g.selectAll('rect')
      .data(data, (d) => d.Country)
      .enter()
      .append('rect')
      .attr('width', (d) => xScale(+d['2020']))
      .attr('height', yScale.bandwidth())
      .attr('fill', 'skyblue')
      .attr('y', (d) => yScale(d.Country));
    setTimeout(() => {
      g.selectAll('rect')
        .data(data, (d) => d.Country)
        .transition()
        .duration(800)
        .attr('width', (d) => xScale(+d['1950']));
    }, 1000);
  }, [data]);
  // methods
  async function getData() {
    const res = await d3.csv(
      'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv'
    );
    setData(res.slice(0, 10));
  }
  // template
  return <svg width={width} height={height}></svg>;
}
