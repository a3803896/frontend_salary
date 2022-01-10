import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function Gender({ originData }) {
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
    let male = 0;
    let female = 0;
    originData.forEach((item) => {
      if (item.gender === '男性') return (male += 1);
      if (item.gender === '女性') return (female += 1);
    });
    setData([
      { key: '男性', value: male },
      { key: '女性', value: female },
    ]);
  }
  function draw() {
    const g = renderInit();
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(innerHeight / 2);
    const pie = d3.pie().value((d) => d.value);
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.key))
      .range(d3.schemePastel2);
    g.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => colorScale(d.data.key));
    const text = g
      .selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`);
    text
      .append('tspan')
      .attr('x', '0')
      .attr('dy', '0rem')
      .text((d) => `${d.data.key}`);
    text
      .append('tspan')
      .attr('x', '0')
      .attr('dy', '1rem')
      .text((d) => `${d.data.value}人`);
  }
  function renderInit() {
    d3.select('.gender svg').remove();
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = parseInt(d3.select('.gender').style('width'));
    const height = width;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.gender').append('svg').attr('width', width).attr('height', height);
    const g = svg
      .append('g')
      .attr('class', 'main-group')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    return g;
  }
  return (
    <>
      <p className='chart_title text-center mb-0'>性別分布（人數 / 性別）</p>
      <div className='gender'></div>
    </>
  );
}
