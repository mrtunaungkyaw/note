import React from "react";

export const Date = ({ list }) => {
    return (
        <>
            <span>{list.editTime ? list.editTime : list.setTime}</span>
        </>
    );
};
