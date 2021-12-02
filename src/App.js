import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import d3Tip from 'd3-tip';

export default function App() {
  // data
  let innerWidth;
  let innerHeight;
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
    // 地圖設定
    const projection = d3.geoNaturalEarth1().fitSize([innerWidth, innerHeight], data);
    const geo = d3.geoPath().projection(projection);
    // tip 設定
    const tip = d3Tip().attr('class', 'd3-tip');
    tip.html((d) => `<div>${d.properties.name}</div>`);
    d3.select('svg').call(tip);
    // 畫圖
    g.selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('d', geo)
      .attr('stroke', 'black')
      .attr('stroke-width', '1')
      .attr('fill', 'skyblue')
      // 事件綁定
      .on('mouseover', function () {
        d3.select(this).attr('fill', 'cyan');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', 'skyblue');
      })
      .on('click', function (e, d) {
        tip.show(d, this);
      });
  }
  function renderInit() {
    d3.select('.wrap svg').remove();
    const margin = { top: 30, right: 0, bottom: 0, left: 0 };
    const width = parseInt(d3.select('.wrap').style('width'));
    const height = width * 0.55;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.wrap').append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${margin.left},${margin.top})`);
    return g;
  }
  async function getData() {
    let res = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    let worldMap = topojson.feature(res, res.objects.countries);
    setData(worldMap);
  }
  // template
  return <div className='wrap'></div>;
}
