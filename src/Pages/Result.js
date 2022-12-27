import React, { useState, useEffect } from "react";
import Slide2 from "../components/Slide2";
import { useNavigate, useParams } from "react-router-dom";
import { getListSlide } from "../services/UserService";

function Result() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const params = useParams();
  const [slide, setSlide] = useState();
  const [listSlide, setListSlide] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=result/" + params.id);
    }
    async function getAPIListSlide() {
      const response = await getListSlide(userInfo.token, params.id).then(
        (res) => {
          setListSlide(res.data.slides);
          console.log(listSlide);
        }
      );
      return response;
    }
    getAPIListSlide();
    // setSlide(array[0]);
  }, []);

  return (
    <div>
      <Slide2 token={userInfo.token} id={params.id} listSlide={listSlide}/>
    </div>
  );
}

export default Result;
