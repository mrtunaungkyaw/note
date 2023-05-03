import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";

export const DatePick = () => {
    const { state, dispatch, ACTION_TYPES } = useContext(AppContext);
    return (
        <>
            <DatePicker
                maxDate={new Date()}
                onChange={(value) => dispatch({ type: ACTION_TYPES.CALENDAR, payload: value })}
                inline
            />
        </>
    );
};
