import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Area from './components/Area';
import Gender from './components/Gender';

export default function App() {
  const [originData, setData] = useState([]);
  useEffect(() => {
    d3.json('https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json').then((res) => setData(res));
  }, []);
  return (
    <div className='home container'>
      <div className='row'>
        <div className='col-lg-7'>
          <Area originData={originData} />
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6'>
          <Gender originData={originData} />
        </div>
      </div>
    </div>
  );
}
