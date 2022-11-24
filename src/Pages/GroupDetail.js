import React, { useState } from "react";
import GroupDetailLeft from "../components/GroupDetailLeft";
import GroupDetailRight from "../components/GroupDetailRight";
import GroupMemberDetail from "../components/GroupMemberDetail";

function GroupDetail() {
  const [right, setRight] = useState(true);
  return (
    <row className="row">
      <div className="col-3">
        <GroupDetailLeft />
        <button
          onClick={() => {
            setRight(!right);
            console.log(right);
          }}
        >
          RIGHT
        </button>
      </div>
      <div className="col-9">
        {right === true ? <GroupDetailRight /> : <GroupMemberDetail />}
      </div>
    </row>
  );
}

export default GroupDetail;
