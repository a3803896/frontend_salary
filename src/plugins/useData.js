import { useEffect, useState } from 'react';
import * as d3 from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/UN_Population_2019.csv';

export default function useData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    d3.csv(csvUrl, (data) => {
      data.Populaton2020 = Number(data['2020']);
      return data;
    }).then((res) => {
      setData(res.slice(0, 10));
    });
  }, []);
  return data;
}
