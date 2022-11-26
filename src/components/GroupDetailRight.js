import React from "react";
import img from "../images.png";

function GroupDetailRight() {
  return (
    <div className="container bg-white py-3">
      <div className="text-center">
        <img
          src={img}
          className="rounded"
          style={{ height: "100px" }}
          alt="Cinque Terre"
        />
      </div>
      <h4 className="text-center my-3">RECENT POSTS</h4>
      <hr />
      <h2>I Love Food</h2>
      <h5>
        <span className="glyphicon glyphicon-time"></span> Post by Jane Dane,
        Sep 27, 2015.
      </h5>
      <h5>
        <span className="label label-danger">Food</span>{" "}
        <span className="label label-primary">Ipsum</span>
      </h5>
      <p>
        Food is my passion. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <h4>
        <small>RECENT POSTS</small>
      </h4>
      <hr />
      <h2>Officially Blogging</h2>
      <h5>
        <span className="glyphicon glyphicon-time"></span> Post by John Doe, Sep
        24, 2015.
      </h5>
      <h5>
        <span className="label label-success">Lorem</span>
      </h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt
        in culpa qui officia deserunt mollit anim id est laborum consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <hr />

      <h4>Leave a Comment:</h4>
      <form>
        <div className="form-group">
          <textarea className="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
      <br />

      <p>
        <span className="badge">2</span> Comments:
      </p>
      <br />
      <form />
    </div>
  );
}

export default GroupDetailRight;
