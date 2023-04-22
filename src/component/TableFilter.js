import React, { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { MdList, MdCalendarMonth, MdDelete, MdPrint } from "react-icons/md";
import { DatePick } from "../component/DatePick";

export const TableFilter = () => {
    const { state, dispatch, ACTION_TYPES } = useContext(AppContext);

    return (
        <div className="table-list-filter-container">
            <div className="table-list-filter">
                <div className="all-list">
                    <button className="all-list-btn">
                        <MdList className="list-icon" />
                        <span>All List</span>
                    </button>
                </div>
                <div className="calendar-filter">
                    <button
                        className="calendar-filter-btn"
                        onClick={() => dispatch({ type: ACTION_TYPES.CALENDAR_ITEM })}
                    >
                        <MdCalendarMonth className="calendar-icon" />
                        <span>{state.calendar.date ? new Date(state.calendar.date).toLocaleDateString() : "Date"}</span>
                    </button>
                    {state.calendar.show && <DatePick />}
                </div>
                <div className="delete-filter">
                    <button className="delete-filter-btn">
                        <MdDelete className="delete-icon delete" />
                        <span>Delete</span>
                    </button>
                </div>
                <div className="print-filter">
                    <button className="print-filter-btn">
                        <MdPrint className="print-icon print" />
                        <span>print</span>
                    </button>
                </div>
            </div>
            <div className="search-filter">
                <input className="search-filter-input" type="text" placeholder="e.g. Tun Aung Kyaw" />
            </div>
        </div>
    );
};
