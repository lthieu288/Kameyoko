import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getListMember} from "../services/GroupService";
import ChoiceQuestion from "./ChoiceQuestion";
import ResultGroup from "./ResultGroup";
function PresentationGroup(props) {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const [roleUser, setRoleUser] = useState();
    const params = useParams();
    useEffect(() => {
        if(!userInfo)
            navigate("/login?redirect=presentation/group/" + params?.idGroup+"/" + params?.id);
        let role="";
        getListMember(userInfo?.token, params?.idGroup).then((res) => {
            res.groups_data.map((index)=>{
                if(index.user_id.id === userInfo.user.id){
                    setRoleUser(index.role)
                    role=index.role
                }
            })
            if(role === "")
                navigate("/login?redirect=presentation/group/" + params?.idGroup+"/" + params?.id);
        });

    }, [roleUser]);

    return (
      <>

          {
              roleUser === "member" ?
                  <>
                      <ChoiceQuestion role={roleUser}/>
                  </>
                  :
                  <>
                      <ResultGroup role={roleUser}/>
                  </>

          }
      </>
    );
}

export default PresentationGroup;
