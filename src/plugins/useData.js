import { useEffect, useState } from 'react';
import * as d3 from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

export default function useData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    d3.csv(csvUrl, (d) => {
      d.temperature = (+d.temperature).toFixed(2);
      d.timestamp = new Date(d.timestamp);
      return d;
    }).then((res) => {
      setData(res);
    });
  }, []);
  return data;
}
