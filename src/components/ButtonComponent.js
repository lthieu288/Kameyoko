import React from "react";

const ButtonComponent = (props) => {
    function onClickNextButton(){
        props.parentNextClick(true);
    }

    function onClickPrevButton(){
        props.parentPrevClick(true);
    }
    return (
        <>
            {
                props.disable ?
                    <button
                        style={{ fontSize: "25px",textAlign: "right" , margin:"100px", marginTop:"20px", marginBottom:"20px"}}
                        className="btn btn-primary px-5"
                        type="submit"
                        disabled
                    >
                        {props.name}
                    </button>
                    :
                    <button
                        style={{ fontSize: "25px",textAlign: "right",margin:"100px", marginTop:"20px", marginBottom:"20px"}}
                        className="btn btn-primary px-5"
                        type="submit"
                        onClick={ props.name === "Next" ? onClickNextButton : onClickPrevButton}
                    >
                        {props?.name}
                    </button>

            }
        </>
    );
};

export default ButtonComponent;
