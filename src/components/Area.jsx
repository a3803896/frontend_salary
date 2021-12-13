import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function Area() {
  // data
  let innerWidth;
  let innerHeight;
  const [data, setData] = useState([]);
  // mounted
  useEffect(() => {
    getDataAndDraw();
    window.addEventListener('resize', draw);
    return () => {
      window.removeEventListener('resize', draw);
    };
  }, []);
  // methods
  function getDataAndDraw() {
    setData([]);
    draw();
  }
  function draw() {
    const g = renderInit();
  }
  function renderInit() {
    d3.select('.area svg').remove();
    const margin = { top: 20, right: 50, bottom: 20, left: 50 };
    const width = parseInt(d3.select('.area').style('width'));
    const height = width * 0.5;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.area').append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${margin.left},${margin.top})`);
    return g;
  }
  return <div className='area'></div>;
}
