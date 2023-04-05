import React, { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { SetDate, SetTime } from "../component/Date";
import { DatePick } from "../component/DatePick";
import { MdCalendarMonth } from "react-icons/md";
import { PickDateDataComponent } from "../component/PickDateDataComponent";

export const List = () => {
    const { memoryList, pickDateData, calendar, handleCalendarButton, memoryListShow } = useContext(AppContext);
    return (
        <div>
            <div className="calendar-container">
                <button onClick={handleCalendarButton} className="calendar-btn">
                    <MdCalendarMonth className="calendar-icon" />
                    <span>{new Date(calendar.date).toLocaleDateString()}</span>
                </button>
                {calendar.show && <DatePick />}
            </div>
            {memoryListShow.show ? (
                <h1 className="memory-date-header">All List</h1>
            ) : (
                <h1 className="memory-date-header">{new Date(calendar.date).toLocaleDateString()}</h1>
            )}
            <div className="memory-table-container">
                {memoryListShow.show && (
                    <table className="table">
                        <thead>
                            <tr className="table-header">
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Time</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        {memoryList.map((list) => {
                            return (
                                <tbody key={list.id}>
                                    <tr className="table-body">
                                        <td>{list.name}</td>
                                        <td>{list.amount}</td>
                                        <td>
                                            <SetTime list={list} />
                                        </td>
                                        <td>
                                            <SetDate list={list} />
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                )}
                {pickDateData.length > 0 && <PickDateDataComponent />}
            </div>
        </div>
    );
};
