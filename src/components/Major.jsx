import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

export default function Major({ originData }) {
  const [data, setData] = useState(null);
  let innerWidth;
  let innerHeight;

  useEffect(() => {
    if (!originData.length) return;
    formatData();
  }, [originData]);
  useEffect(() => {
    if (!data) return;
    draw();
    window.addEventListener('resize', draw);
    return () => {
      window.removeEventListener('resize', draw);
    };
  }, [data]);
  function formatData() {
    const tempObj = {};
    let data = [];
    originData.forEach((item) => {
      if (!tempObj[item.major]) tempObj[item.major] = [];
      tempObj[item.major].push(item);
    });
    for (let key in tempObj) {
      data.push({ key, value: tempObj[key].length });
    }
    data = data.filter((item) => item.value > 1).sort((a, b) => b.value - a.value);
    setData(data);
  }
  function draw() {
    const tip = d3Tip().attr('class', 'd3-tip');
    const g = renderInit();
    const pie = d3.pie().value((d) => d.value);
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((item) => item.key))
      .range(d3.schemeAccent);
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(innerHeight / 2);
    tip.html(
      (d) => `<div>
                <span>${d.data.key}</span>
                <span>${d.data.value}人</span>
              </div>`
    );
    d3.select('svg').call(tip);
    g.selectAll('arc')
      .data(pie(data))
      .join('path')
      .attr('d', arc)
      .attr('fill', (d) => colorScale(d.data.key))
      .on('mouseover', function (event, data) {
        tip.show(data, this);
      })
      .on('mousemove', function (event, data) {
        let x = event.x - parseInt(tip.style('width')) / 2;
        let y = event.y - (parseInt(tip.style('height')) + 18);
        tip.style('position', 'fixed');
        tip.style('left', `${x}px`);
        tip.style('top', `${y}px`);
      })
      .on('mouseout', tip.hide);
    d3.select('.major svg')
      .append('text')
      .text('科系比例')
      .attr('x', innerWidth / 2)
      .attr('y', 50)
      .attr('text-anchor', 'middle');
  }
  function renderInit() {
    d3.select('.major svg').remove();
    d3.selectAll('.d3-tip').remove();
    const margin = { top: 66, right: 0, bottom: 0, left: 0 };
    const width = parseInt(d3.select('.major').style('width'));
    const height = width;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.major').append('svg').attr('width', width).attr('height', height);
    const g = svg
      .append('g')
      .attr('class', 'main-group')
      .attr('transform', `translate(${(width + margin.left) / 2},${(height + margin.top) / 2})`);
    return g;
  }
  return (
    <div>
      <div className='major'></div>
    </div>
  );
}
