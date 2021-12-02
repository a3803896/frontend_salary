import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function App() {
  // data
  let innerWidth;
  let innerHeight;
  const [data, setData] = useState([]);
  // mounted
  useEffect(() => {
    getData();
  }, []);
  // watch
  useEffect(() => {
    if (!data.length) return;
    window.addEventListener('resize', draw);
    renderInit();
    draw();
    return () => {
      window.removeEventListener('resize', draw);
    };
  }, [data]);
  function getYearData(c) {
    return data.filter((d) => d.year === c);
  }
  function draw() {
    // 設定年份
    let c = 1989;
    // 繪製圖表軸線
    const g = d3.select('.main-group');
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(getYearData(c), (d) => d.date))
      .range([0, innerWidth]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.temp).reverse())
      .range([0, innerHeight]);
    const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(20).tickFormat(d3.timeFormat('%Y/%m/%d'));
    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);
    const xAxisGroup = g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerHeight})`);
    const yAxisGroup = g.append('g').attr('class', 'y-axis');
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
    // 開始畫線
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.temp))
      .curve(d3.curveCardinal.tension(0.5));
    g.append('path').attr('id', 'alterpath');
    d3.select('#alterpath')
      .datum(getYearData(c))
      .attr('stroke', 'black')
      .attr('stroke-width', '3')
      .attr('fill', 'none')
      .transition()
      .duration(1000)
      .attr('d', line);
    c++; // 從下一年開始循環
    const id = setInterval(() => {
      if (c === 2019) return clearInterval(id);
      // 重畫 XY 軸
      xScale.domain(d3.extent(getYearData(c), (d) => d.date));
      xAxisGroup.transition().duration(800).call(xAxis);
      // 重畫曲線
      d3.select('#alterpath').datum(getYearData(c)).transition().duration(1000).attr('d', line);
      c++;
    }, 1500);
  }
  function renderInit() {
    d3.select('.wrap svg').remove();
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = parseInt(d3.select('.wrap').style('width'));
    const height = width * 0.5;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.wrap').append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${margin.left},${margin.top})`);
  }
  async function getData() {
    const format = (d) => {
      d.date = new Date(`${d.year}-${d.month}-${d.day}`);
      d.temp = +d.temp;
      d.year = +d.year;
      d.month = +d.month;
      d.day = +d.day;
      return d;
    };
    const res = await d3.csv(
      'https://gist.githubusercontent.com/a3803896/90de5614ce0d93eef44e114897fcc65d/raw/1d50d48dade6c151eb408c476912b57700867a65/weather.csv',
      format
    );
    setData(res);
  }
  // template
  return <div className='wrap'></div>;
}
