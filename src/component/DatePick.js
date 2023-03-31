import React from "react";

export const DatePick = () => {
    return (
        <div>
            <h1></h1>
            <input
                type="date"
                dateFormat="dd/mm/yyyy"
                onChange={(e) => {
                    console.log(e.target.value);
                }}
            />
        </div>
    );
};
