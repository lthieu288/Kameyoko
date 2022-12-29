import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import {Link} from "react-router-dom";

function Slide2(props) {
  const [typeSlide, setTypeSlide] = useState();
  const [contentSlide, setContentSlide] = useState();

  useEffect(() => {
    setTypeSlide(props?.listSlide?.type)
    setContentSlide(props?.listSlide?.content)

  }, [props]);

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
      <>
        {
          typeSlide === 1 ?
              <Slide data={contentSlide?.options} check={false}/>
              :
              typeSlide === 9 ?
                  <Paragraph  paragraph={contentSlide}/>
                  :
                  <h2>
                    <Heading heading={contentSlide}/>
                  </h2>
        }
      </>

    </div>
  );
}

export default Slide2;
