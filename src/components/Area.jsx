import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function Area({ originData }) {
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
    const tempData = {};
    const data = [];
    const res = originData;
    res.forEach((item) => {
      if (!item.company.area.includes('台灣')) return;
      item.company.area = item.company.area.replace('台灣 - ', '');
      if (!tempData[item.company.area]) tempData[item.company.area] = [];
      tempData[item.company.area].push(item);
    });
    for (let key in tempData) {
      data.push({ area: key, amount: tempData[key].length });
    }
    data.sort((a, b) => b.amount - a.amount);
    setData(data);
  }
  function draw() {
    const g = renderInit();
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.area))
      .range([0, innerWidth])
      .padding(0.15);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.amount)])
      .range([innerHeight, 0])
      .nice();
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.area))
      .range(d3.schemePastel1);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    g.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${innerHeight})`).call(xAxis);
    g.append('g').attr('class', 'y-axis').call(yAxis);
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('x', (d) => xScale(d.area))
      .attr('y', innerHeight)
      .attr('fill', (d) => colorScale(d.area))
      .transition()
      .duration(500)
      .attr('y', (d) => yScale(d.amount))
      .attr('height', (d) => yScale(0) - yScale(d.amount));
    g.selectAll('amount-text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d.amount)
      .attr('text-anchor', 'middle')
      .attr('x', (d) => xScale(d.area) + xScale.bandwidth() / 2)
      .attr('y', innerHeight)
      .transition()
      .duration(500)
      .attr('y', (d) => yScale(d.amount) - 8);
    g.append('text')
      .text('地區分布')
      .attr('x', innerWidth * 0.7)
      .attr('y', innerHeight * 0.2);
  }
  function renderInit() {
    d3.select('.area svg').remove();
    const margin = { top: 10, right: 10, bottom: 30, left: 40 };
    const width = parseInt(d3.select('.area').style('width'));
    const height = width * 0.9;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.area').append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${margin.left},${margin.top})`);
    return g;
  }
  return <div className='area'></div>;
}
