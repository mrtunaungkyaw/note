import React from "react";

export const SetDate = ({ list }) => {
    return (
        <>
            <span>
                {list.editDate
                    ? new Date(list.editDate).toLocaleDateString()
                    : new Date(list.date).toLocaleDateString()}
            </span>
        </>
    );
};

export const SetTime = ({ list }) => {
    return (
        <>
            <span>
                {list.editDate
                    ? new Date(list.editDate).toLocaleTimeString()
                    : new Date(list.date).toLocaleTimeString()}
            </span>
        </>
    );
};
