import React from 'react';
// import React, { useState, useEffect } from 'react';
// import * as d3 from 'd3';
// import Area from './components/Area';
// import Gender from './components/Gender';
// import Age from './components/Age';
// import Major from './components/Major';
// import SalaryTenure from './components/SalaryTenure';
import ThreeJs from './components/ThreeJs';

export default function App() {
  // const [originData, setData] = useState([]);
  // useEffect(() => {
  //   d3.json('https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json').then((res) => setData(res));
  // }, []);
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-lg-11 pt-3'>
          <ThreeJs />
        </div>
      </div>
    </div>
    // <div className=''>
    //   <div className='row'>
    //     <div className='col-lg-7'>
    //       <Area originData={originData} />
    //     </div>
    //   </div>
    //   <div className='row'>
    //     <div className='col-lg-6'>
    //       <Gender originData={originData} />
    //     </div>
    //   </div>
    //   <div className='row'>
    //     <div className='col-lg-7'>
    //       <Age originData={originData} />
    //     </div>
    //   </div>
    //   <div className='row'>
    //     <div className='col-lg-6'>
    //       <Major originData={originData} />
    //     </div>
    //   </div>
    //   <div className='row'>
    //     <div className='col-lg-7'>
    //       <SalaryTenure originData={originData} />
    //     </div>
    //   </div>
    // </div>
  );
}
