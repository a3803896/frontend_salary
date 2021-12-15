import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

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
    console.log(data);
    const g = renderInit();
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
