import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

export default function SalaryTenure({ originData }) {
  // data
  let innerWidth;
  let innerHeight;
  const [data, setData] = useState(null);
  // mounted
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
  // methods
  function formatData() {
    const tempData = originData.filter((item) => item.company.salary && item.company.job_tenure);
    const tempObj = {};
    const data = [];
    tempData.forEach((item) => {
      const reg = /(.+)~?(.+)\s/;
      const match = reg.exec(item.company.salary)[0].trim().split('~');
      if (match[1]) {
        item.company.salary = (+match[0] + +match[1]) / 2;
      } else {
        item.company.salary = +match[0];
      }
      if (!tempObj[item.company.job_tenure]) tempObj[item.company.job_tenure] = [];
      tempObj[item.company.job_tenure].push(item);
    });
    for (let key in tempObj) {
      const totalSalary = tempObj[key].reduce((total, item) => {
        return total + item.company.salary;
      }, 0);
      data.push({
        key,
        value: totalSalary / tempObj[key].length,
      });
    }
    const sorted = data.sort((a, b) => {
      return a.key.split(' 年')[0].split('~')[0] - b.key.split(' 年')[0].split('~')[0];
    });
    setData(sorted);
  }
  function draw() {
    const g = renderInit();
    const tip = d3Tip().attr('class', 'd3-tip');
    tip.html(
      (d) => `<div>
                <p class="mb-1">年資：${d.key}</p>
                <p class="mb-0">平均年薪：${d.value.toFixed(1)}萬</p>
              </div>`
    );
    tip.offset([-4, 0]);
    d3.select('svg').call(tip);
    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.key))
      .rangeRound([0, innerWidth])
      .padding(0.5);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.value))
      .range([innerHeight, 0])
      .nice();
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerHeight})`).call(xAxis);
    g.append('g').attr('class', 'y-axis').call(yAxis);
    // 畫線
    const line = d3
      .line()
      .x((d) => xScale(d.key))
      .y((d) => yScale(d.value));
    g.append('path').attr('class', 'salary-path');
    d3.select('.salary-path')
      .datum(data)
      .attr('stroke', '#FFC400')
      .attr('stroke-width', '12')
      .attr('fill', 'none')
      .transition()
      .duration(2000)
      .attr('d', line)
      .attr('stroke-linecap', 'round');
    // 畫點
    g.selectAll('.circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xScale(d.key))
      .attr('cy', (d) => yScale(d.value) + 1)
      .attr('r', '4')
      .attr('fill', '#1FC1B8');
    g.selectAll('.circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xScale(d.key))
      .attr('cy', (d) => yScale(d.value))
      .attr('r', '20')
      .attr('fill', 'transparent')
      .on('mouseover', function (event, data) {
        tip.show(data, this);
      })
      .on('mouseout', tip.hide);
  }
  function renderInit() {
    d3.select('.tenure svg').remove();
    const margin = { top: 30, right: 10, bottom: 30, left: 40 };
    const width = parseInt(d3.select('.tenure').style('width'));
    const height = width * 0.9;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('.tenure').append('svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${margin.left},${margin.top})`);
    return g;
  }
  return <div className='tenure'></div>;
}
