import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Container } from "react-bootstrap";
import { getListSlide } from "../services/UserService";

const data = [
  {
    name: "Page A",
    data: 4000,
  },
  {
    name: "Page B",
    data: 3000,
  },
  {
    name: "Page C",
    data: 2000,
  },
  {
    name: "Page D",
    data: 2780,
  },
];

function Slide(props) {
  const [number, setNumber] = useState(0);
  const [listSlide, setListSlide] = useState(props.slide);
  const [slide, setSlide] = useState();
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function getAPIListSlide() {
      const response = await getListSlide(props.token, props.id).then((res) => {
        setListSlide(res.data.slides);
        let result = [];
        res.data.slides[0].content.options.map((entry) => {
          let obj = {
            name: entry.name,
            data: entry.total_votes,
          };
          result.push(obj);
        });
        setSlide(result);
      });
      return response;
    }
    getAPIListSlide();
    // setSlide(array[0]);
  }, [render]);
  const handleClick = () => {
    const num = (number + 1) % listSlide.length;
    console.log(num);
    //next to slide
    setNumber((prev) => (prev + 1) % listSlide.length);
    let result = [];
    listSlide[number].content.options.map((entry) => {
      let obj = {
        name: entry.name,
        data: entry.total_votes,
      };
      result.push(obj);
    });
    setSlide(result);
  };
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
        <BarChart
          style={{ marginTop: "40px" }}
          data={slide}
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
      </ResponsiveContainer>
      <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          style={{ fontSize: "25px" }}
          className="btn btn-primary px-5"
          type="submit"
          onClick={handleClick}
        >
          {number + 1}/{listSlide?.length} Next
        </button>
      </Container>
    </div>
  );
}

export default Slide;
