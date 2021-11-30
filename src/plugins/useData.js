import { useEffect, useState } from 'react';
import * as d3 from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv';

export default function useData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    d3.csv(csvUrl, (data, index) => {
      data.petal_length = +data.petal_length;
      data.petal_width = +data.petal_width;
      data.sepal_length = +data.sepal_length;
      data.sepal_width = +data.sepal_width;
      data.id = index;
      return data;
    }).then((res) => {
      setData(res);
    });
  }, []);
  return data;
}
