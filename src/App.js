import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Area from './components/Area';
import Gender from './components/Gender';
import Age from './components/Age';
import Major from './components/Major';
import SalaryTenure from './components/SalaryTenure';
import ThreeJs from './components/ThreeJs';

export default function App() {
  const [originData, setData] = useState([]);
  useEffect(() => {
    d3.json('https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json').then((res) => setData(res));
  }, []);
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-lg-12 position-relative'>
          <div className='wrap d-flex align-items-center justify-content-center'>
            <h1 className=''>前端薪資大調查</h1>
          </div>
          <ThreeJs />
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-lg-7 mx-auto'>
          <Area originData={originData} />
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-lg-6 mx-auto'>
          <Gender originData={originData} />
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-lg-7 mx-auto'>
          <Age originData={originData} />
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-lg-6 mx-auto'>
          <Major originData={originData} />
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-7 mx-auto'>
          <SalaryTenure originData={originData} />
        </div>
      </div>
    </div>
  );
}
