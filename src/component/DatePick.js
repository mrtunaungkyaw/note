import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";

export const DatePick = () => {
    const { calendar, handleCalendar } = useContext(AppContext);
    return (
        <>
            <DatePicker
                className="calendar"
                maxDate={new Date()}
                selected={calendar.date}
                onChange={handleCalendar}
                inline
            />
        </>
    );
};
