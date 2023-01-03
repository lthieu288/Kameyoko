import React from "react";
import Card from "react-bootstrap/Card";
import '../styles/CreateGroup.module.css';

function SlideName(props) {
    return (
        <>
            <div
                className={`p-3 ${props.active ? 'active-slide' : 'non-active-slide'}`}
                style={{borderRadius: "10px", marginBottom: "10px"}}
            >
                <div className="d-grid gap-2">
                    {
                        props.type === 1 ?
                            <Card.Img
                                variant="top"
                                src="https://cdn-icons-png.flaticon.com/512/2567/2567943.png"
                                style={{
                                    width: "100%",
                                    height: "8rem",
                                    padding: "11px",
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                    border: "1px solid rgb(183, 186, 194)"
                                }}
                            />
                            :
                            <Card.Img
                                variant="top"
                                src="https://cdn-icons-png.flaticon.com/512/3527/3527892.png"
                                style={{
                                    width: "100%",
                                    height: "8rem",
                                    padding: "11px",
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                    border: "1px solid rgb(183, 186, 194)"
                                }}
                            />
                    }
                </div>
            </div>

        </>

    );
}

export default SlideName;
