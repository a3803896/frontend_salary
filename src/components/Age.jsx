import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function Age({ originData }) {
  // data
  let innerWidth;
  let innerHeight;
  const [data, setData] = useState(null);
  // mounted
  useEffect(() => {
    if (!originData.length) return;
    formatData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originData]);
  useEffect(() => {
    if (!data) return;
    draw();
    window.addEventListener('resize', draw);
    return () => {
      window.removeEventListener('resize', draw);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  // methods
  function formatData() {
    const tempObj = {};
    const data = [];
    originData.forEach((item) => {
      if (!tempObj[item.age]) tempObj[item.age] = [];
      tempObj[item.age].push(item);
    });
    for (let key in tempObj) {
      data.push({ key, value: tempObj[key].length });
    }
    setData(data);
  }
  function draw() {
    const g = renderInit();
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.key))
      .range([0, innerWidth])
      .padding(0.15);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([innerHeight, 0])
      .nice();
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.key))
      .range(d3.schemeCategory10);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    g.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${innerHeight})`).call(xAxis);
    g.append('g').attr('class', 'y-axis').call(yAxis);
    g.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('width', xScale.bandwidth())
      .attr('x', (d) => xScale(d.key))
      .attr('y', innerHeight)
      .attr('fill', (d) => colorScale(d.key))
      .transition()
      .duration(500)
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => yScale(0) - yScale(d.value));
    g.selectAll('.amount-text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d.value)
      .attr('text-anchor', 'middle')
      .attr('x', (d) => xScale(d.key) + xScale.bandwidth() / 2)
      .attr('y', innerHeight)
      .transition()
      .duration(500)
      .attr('y', (d) => yScale(d.value) - 8);
  }
  function renderInit() {
    d3.select('.age svg').remove();
    const margin = { top: 30, right: 10, bottom: 30, left: 40 };
    const width = parseInt(d3.select('.age').style('width'));
    const height = width * 0.9;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.age').append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${margin.left},${margin.top})`);
    return g;
  }
  return (
    <>
      <p className='chart_title text-center mb-0'>年齡分布（人數 / 年齡）</p>
      <div className='age'></div>;
    </>
  );
}
