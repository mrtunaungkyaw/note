import React, { useContext } from "react";
import { ACTION_TYPES } from "../Helper/postReducer";
import { AppContext } from "../Helper/Context";
import { MdList, MdCalendarMonth, MdDelete, MdPrint } from "react-icons/md";
import { DatePick } from "../component/DatePick";

export const TableFilter = () => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <>
            <div className="table-list-filter">
                <div className="all-list">
                    <button
                        onClick={() => dispatch({ type: ACTION_TYPES.ALL_LIST })}
                        className={`all-list-btn ${state.dateFilter.show ? "" : "all-list-hide"}`}
                    >
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
                    <button
                        className={`delete-filter-btn ${
                            state.memoryList.some((list) => list.isChecked === true) ? "" : "delete-filter-hide"
                        }`}
                        onClick={() => dispatch({ type: ACTION_TYPES.FILTER_MEMORY_LIST_DELETE })}
                    >
                        <MdDelete className="delete-icon delete" />
                        <span>Delete</span>
                    </button>
                </div>
                <div className="print-filter">
                    <button
                        className={`print-filter-btn ${
                            state.memoryList.some((list) => list.isChecked === true) ? "" : "print-filter-hide"
                        }`}
                        onClick={() => dispatch({ type: ACTION_TYPES.PRINT_ITEM })}
                    >
                        <MdPrint className="print-icon print" />
                        <span>print</span>
                    </button>
                </div>
            </div>
            <div className="search-filter">
                <input className="search-filter-input" type="text" placeholder="e.g. Tun Aung Kyaw" />
            </div>
        </>
    );
};
