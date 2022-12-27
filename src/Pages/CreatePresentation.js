import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/ResponsiveAppBar";
import AddIcon from "@mui/icons-material/Add";
import { KeyboardBackspace, PlayCircleOutline } from "@mui/icons-material";
import { Row } from "react-bootstrap";
import SlideName from "../components/SlideName";
import CreateQuestion from "../components/CreateQuestion";
import { getSlidesPresentation } from "../services/PresentationService";
import { useParams, useNavigate, Link } from "react-router-dom";
import EditQuestion from "../components/EditQuestion";
import Card from "react-bootstrap/Card";

const CreatePresentation = () => {
  const [disable, setDisable] = useState(false);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  let [slides, setSlides] = useState([{ type: 1 }]);
  const [idSlide, setIdSlide] = useState(0);
  const [listOption, setListOption] = useState();
  const [title, setTitle] = useState("");
  const [contentObject, setContentObject] = useState();
  const [idContent, setIdContent] = useState();
  const [typeSlide,setTypeSlide] = useState(0)
  const [checkOnChoice , setCheckOnChoice] = useState("")
  const host = "http://localhost:3000/presentation/public/";

  const createNewSlide = () => {
    setDisable(true);
    setSlides([...slides, { type: 1 }]);
  };

  const callbackFunction = () => {
    setDisable(false);
  };
  const callbackFunctionRender = () => {
    setRender(true);
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=presentation/" + id);
    }
  }, [userInfo]);
  useEffect(() => {
    async function getAPIListPresent() {
      setDisable(false);
      const response = await getSlidesPresentation(userInfo.token, id);
      if (response.data.slides !== null) setSlides(response.data.slides);
      else if (response.data.slides === null) {
        setSlides([]);
        setIdSlide(undefined);
      }
      if (response.data.slides?.length > 0) {
        setContentObject(response.data.slides[0]?.content);
        setTypeSlide(response.data.slides[0].type);
        setIdSlide(response.data.slides[0].id);
        setListOption(response.data.slides[0]?.content?.options);
        setTitle(response.data.slides[0]?.content?.title);
        setIdContent(response.data.slides[0]?.content?.id);
        setCheckOnChoice(response.data.slides[0].id)
      }
    }

    getAPIListPresent();
    setRender(false)

  }, [render]);

  const checkSlide = () => {
    setCheckOnChoice(false)
  };

  return (
    <>
      <Navbar username={userInfo ? userInfo.user.username : null} />
      <div className="App" style={{ backgroundColor: "whitesmoke" }}>
        <div className="container py-2">
          <div className="d-flex justify-content-between bg-white p-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/presentation")}
            >
              <KeyboardBackspace></KeyboardBackspace>
              Name presentation
            </button>
            <div className="form-outline d-flex">
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={() => {
                  window.open("/result/" + id, "_blank");
                }}
              >
                <PlayCircleOutline
                  style={{ marginRight: "5px" }}
                ></PlayCircleOutline>
                Present
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between bg-white p-2 mt-2">
            {disable === true ? (
              <button
                type="button"
                className="btn btn-primary px-5"
                onClick={createNewSlide}
                disabled
              >
                <AddIcon></AddIcon>
                New slide
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary px-5"
                onClick={createNewSlide}
              >
                <AddIcon></AddIcon>
                New slide
              </button>
            )}
            <div>
              Go to
              <span className="fw-bold" style={{ marginLeft: "10px" }}>
                <Link
                  to={"/presentation/public/" + id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {host + id}
                </Link>
              </span>
            </div>
            <div className="form-outline d-flex">
              <button type="button" className="btn btn-secondary px-5">
                Share
              </button>
            </div>
          </div>
          {slides.length === 0 ? (
            <></>
          ) : (
            <Row className="my-3">
              <div className="col-2">
                {slides?.map((sl) => (
                    <>
                      {checkSlide}
                      <div
                          className=""
                          onClick={() => (
                              setContentObject(sl?.content),
                                  setTypeSlide(sl.type),
                                  setIdSlide(sl.id),
                                  setListOption(sl?.content?.options),
                                  setTitle(sl?.content?.title),
                                  setIdContent(sl?.content?.id),
                                  setCheckOnChoice(sl.id)
                          )}
                      >
                        <SlideName type={sl.type} id={sl.id} active= {sl.id === checkOnChoice}/>
                      </div>
                    </>

                ))}
              </div>
              {idSlide === undefined ? (
                <CreateQuestion
                  parentCallback={callbackFunction}
                  idSlide={id}
                  parentRender={callbackFunctionRender}
                />
              ) : (
                <EditQuestion
                  typeSlide={typeSlide}
                  idContent={idContent}
                  id={idSlide}
                  render={render}
                  title={title}
                  options={listOption}
                  parentRender={callbackFunctionRender}
                  parentCallback={callbackFunction}
                  content={contentObject}
                />
              )}
            </Row>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePresentation;
