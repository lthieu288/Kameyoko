import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getListSlide } from "../services/UserService";
import Slide from "./Slide";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import ButtonComponent from "./ButtonComponent"
function Slide2(props) {
  const [number, setNumber] = useState(0);
  const [typeSlide, setTypeSlide] = useState();
  const [contentSlide, setContentSlide] = useState();
  const [checkNextDisable, setCheckNextDisable] = useState(false)
  const [checkPrevDisable, setCheckPrevDisable] = useState(false)

  useEffect(() => {
    setCheckPrevDisable(true)
    setTypeSlide(props?.listSlide[0]?.type)
    setContentSlide(props?.listSlide[0]?.content)
    if(1 === props?.listSlide?.length){
      setCheckNextDisable(true)
    }
  }, [props]);

  const nextButton = () => {
    setCheckPrevDisable(false)
    const num = (number + 1);
    setNumber(number +1);
    setTypeSlide(props?.listSlide[num]?.type)
    setContentSlide(props?.listSlide[num].content)
    if(num +1 === props?.listSlide?.length){
      setCheckNextDisable(true)
      setCheckPrevDisable(false)
    }
  };
  const prevButton = () => {
    setCheckNextDisable(false)
    const num = (number - 1);
    setNumber(number - 1);
    setTypeSlide(props?.listSlide[num]?.type)
    setContentSlide(props?.listSlide[num].content)
    if(num -1  === -1){
      setCheckPrevDisable(true)
      setCheckNextDisable(false)
    }
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

      <Container style={{ marginTop: "20px",textAlign: "center" }}>
        <ButtonComponent name={"Prev"} parentPrevClick={prevButton} disable={checkPrevDisable}/>
        <ButtonComponent name={"Next"} parentNextClick={nextButton} disable={checkNextDisable}/>
      </Container>

    </div>
  );
}

export default Slide2;
