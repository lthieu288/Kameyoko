import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "Page A",
        data: 4000,
    },
    {
        name: "Page B",
        data: 3000,
    },
    {
        name: "Page C",
        data: 2000,
    },
    {
        name: "Page D",
        data: 2780,
    },
];

function Slide() {
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
            <ResponsiveContainer width="100%" height={400}>
                <BarChart style={{marginTop: "40px"}}
                          data={data}
                          margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                          }}
                >
                    <XAxis dataKey="name"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="data" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Slide;
