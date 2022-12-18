import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Slide(props) {
  const [data, setData] = useState([
    {
      name: "",
      data: 0,
    },
  ]);
  useEffect(() => {
    if (props.check) return;
    else {
      let array = [];
      props?.data?.map((item, i) =>
        array.push({
          name: item.name,
          data: item.total_votes,
        })
      );
      setData(array);
    }
  }, [props.data]);
  return (
    <div
      style={{
        height: "500px",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "ridge",
      }}
      className="mx-auto"
    >
      <ResponsiveContainer width="100%" height={400}>
        {props.data ? (
          <BarChart
            style={{ marginTop: "40px" }}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="data" fill="#8884d8" />
          </BarChart>
        ) : (
          <BarChart
            style={{ marginTop: "40px" }}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="data" fill="#8884d8" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default Slide;
