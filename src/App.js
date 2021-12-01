import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// svg 設定
const width = '1200';
const height = '650';
const margin = { top: 20, right: 20, bottom: 50, left: 140 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

export default function App() {
  // data
  const svgRef = useRef();
  const [data, setData] = useState([]);
  // mounted
  useEffect(() => {
    getData();
  }, []);
  // watch
  useEffect(() => {
    if (!data.length) return;
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d['1950'])])
      .range([0, innerWidth]);
    const xAxis = d3.axisBottom(xScale);
    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.Country))
      .range([0, innerHeight])
      .padding(0.1);
    const yAxis = d3.axisLeft(yScale);
    const svg = d3.select(svgRef.current);
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    g.append('g').attr('id', 'x-axis').attr('transform', `translate(0, ${innerHeight})`).call(xAxis);
    g.append('g').attr('id', 'y-axis').call(yAxis);
    g.selectAll('rect')
      .data(data, (d) => d.Country)
      .enter()
      .append('rect')
      .attr('width', (d) => xScale(+d['1950']))
      .attr('height', yScale.bandwidth())
      .attr('y', (d) => yScale(d.Country))
      .attr('fill', 'skyblue');
    function draw(year) {
      xScale.domain([0, d3.max(data, (d) => +d[year])]);
      d3.select('#x-axis').transition().duration(500).call(xAxis);
      g.selectAll('rect')
        .transition()
        .duration(500)
        .attr('width', (d) => xScale(+d[year]));
    }
    let year = 1951;
    let id = setInterval(() => {
      if (year === 2020) clearInterval(id);
      draw(year);
      year++;
    }, 20);
  }, [data]);
  async function getData() {
    const res = await d3.csv(
      'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv'
    );
    setData(res.slice(0, 10));
  }
  // template
  return <svg ref={svgRef} width={width} height={height}></svg>;
}
