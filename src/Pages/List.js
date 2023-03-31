import React, { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { SetDate, SetTime } from "../component/Date";
import { DatePick } from "../component/DatePick";

export const List = () => {
    const { memoryList, handleDel } = useContext(AppContext);
    return (
        <div>
            <DatePick />
            <div className="memory-list-container">
                {/* <button onClick={handleDel}>Del</button> */}
                {memoryList.map((list) => {
                    return (
                        <div className="memory-list" key={list.id}>
                            <div className="memory-date-time-container">
                                <SetTime list={list} />
                                <SetDate list={list} />
                            </div>
                            <div className="memory-name-container">
                                <span>{list.name}</span>
                            </div>
                            <div className="memory-amount-container">
                                <span>{list.amount}</span> Kyat
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
