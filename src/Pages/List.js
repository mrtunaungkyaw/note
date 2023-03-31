import React, { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { SetDate, SetTime } from "../component/Date";

export const List = () => {
    const { memoryList } = useContext(AppContext);
    return (
        <div className="memory-list-container">
            <ul>
                {memoryList.map((list) => {
                    return (
                        <li className="memory-list" key={list.id}>
                            <div>
                                <SetDate list={list} />
                                <SetTime list={list} />
                            </div>
                            <div>
                                <span>{list.name}</span>
                            </div>
                            <div>
                                <span>{list.amount}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
