import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/ResponsiveAppBar";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Row } from "react-bootstrap";
import SlideName from "../components/SlideName";
import CreateQuestion from "../components/CreateQuestion";
import { getSlidesPresentation } from "../services/PresentationService";
import { useParams, useNavigate } from "react-router-dom";
import EditQuestion from "../components/EditQuestion";

const CreatePresentation = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  let [slides, setSlides] = useState([{ type: 1 }]);
  let [color, setColor] = useState("");
  const [idSlide, setIdSlide] = useState(0);
  const [listOption, setListOption] = useState();
  const [title, setTitle] = useState("");
  const [idContent, setIdContent] = useState();

  const createNewSlide = () => {
    setDisable(true);
    setSlides([...slides, { type: 1 }]);
  };

  const callbackFunction = () => {
    setDisable(false);
  };
  const callbackFunctionRender = () => {
    setDisable(false);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=presentation/" + id);
    }
  }, [userInfo]);
  useEffect(() => {
    async function getAPIListPresent() {
      const response = await getSlidesPresentation(userInfo.token, id);
      if (response.data.slides !== null) setSlides(response.data.slides);
      else if (response.data.slides === null) {
        setSlides([]);
        setIdSlide(undefined);
      }
      if (response.data.slides.length > 0) {
        setIdSlide(response.data.slides[0].id);
        setListOption(response.data.slides[0]?.content?.options);
        setTitle(response.data.slides[0]?.content?.title);
        setIdContent(response.data.slides[0]?.content?.id);
      }
    }

    getAPIListPresent();
  }, []);

  return (
    <>
      <Navbar username={userInfo ? userInfo.user.username : null} />
      <div className="App" style={{ backgroundColor: "whitesmoke" }}>
        <div className="container py-5">
          <div className="d-flex justify-content-between bg-white p-3">
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={() => navigate("/presentation")}
            >
              <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
              Name presentation
            </button>
            <div className="form-outline d-flex">
              {disable === true ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createNewSlide}
                  disabled
                >
                  <AddIcon></AddIcon>
                  New slide
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createNewSlide}
                >
                  <AddIcon></AddIcon>
                  New slide
                </button>
              )}
            </div>
          </div>
          {slides.length === 0 ? (
            <></>
          ) : (
            <Row className="my-3">
              <div className="col-2">
                {slides?.map((sl) => (
                  <div
                    className=""
                    onClick={() => (
                      setIdSlide(sl.id),
                      setListOption(sl?.content?.options),
                      setTitle(sl?.content?.title),
                      setIdContent(sl?.content?.id),
                      setColor("red")
                    )}
                  >
                    <SlideName />
                  </div>
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
                  idContent={idContent}
                  id={idSlide}
                  title={title}
                  options={listOption}
                  parentCallback={callbackFunction}
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
