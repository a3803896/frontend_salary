import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

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
    const tree = d3.tree().size([innerHeight, innerWidth])(data);
    const colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);
    // 畫線
    g.selectAll('path')
      .data(tree.links())
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      );
    // 畫點
    g.selectAll('circle')
      .data(tree.descendants())
      .join('circle')
      .attr('cx', (d) => d.y)
      .attr('cy', (d) => d.x)
      .attr('r', '4')
      .attr('fill', (d) => {
        if (d.depth === 0) return colorScale(d.data.name);
        let tempD = d;
        while (tempD.depth > 1) tempD = tempD.parent;
        return colorScale(tempD.data.name);
      });
    // 寫字
    g.selectAll('text')
      .data(tree.descendants())
      .join('text')
      .attr('x', (d) => {
        if (d.height === 0) return d.y + 6;
        return d.y - 6;
      })
      .attr('y', (d) => d.x + 4)
      .attr('text-anchor', (d) => {
        if (d.height === 0) return 'start';
        return 'end';
      })
      .text((d) => d.data.name);
  }
  function renderInit() {
    d3.select('.wrap svg').remove();
    const margin = { top: 20, right: 50, bottom: 20, left: 50 };
    const width = parseInt(d3.select('.wrap').style('width'));
    const height = width * 0.5;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.wrap').append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${margin.left},${margin.top})`);
    return g;
  }
  async function getData() {
    const res = await d3.json('https://raw.githubusercontent.com/Shao-Kui/D3.js-Demos/master/static/data/games.json');
    const hierarchy = d3.hierarchy(res);
    setData(hierarchy);
  }
  // template
  return <div className='wrap'></div>;
}
