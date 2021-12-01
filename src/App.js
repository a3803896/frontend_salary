import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

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
    window.addEventListener('resize', renderInit);
    renderInit();
  }, [data]);
  function renderInit() {
    d3.select('.wrap svg').remove();
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = parseInt(d3.select('.wrap').style('width'));
    const height = width * 0.5;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.wrap').append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.cases))
      .range([0, innerWidth]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.deaths).reverse())
      .range([0, innerHeight]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerHeight})`).call(xAxis);
    g.append('g').attr('class', 'y-axis').call(yAxis);
    let c = 0;
    let id = setInterval(() => {
      if (c === data.length) return clearInterval(id);
      g.append('circle').attr('cx', xScale(data[c].cases)).attr('cy', yScale(data[c].deaths)).attr('r', '2').attr('fill', 'black').attr('opacity', '0.6');
      c++;
    }, 0);
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
  return <div className='wrap'></div>;
}
