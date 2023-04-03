import React from "react";
import { AppContext } from "../Helper/Context";
import { useContext } from "react";
import { SetDate, SetTime } from "./Date";

export const PickDateDataComponent = () => {
    const { pickDateData } = useContext(AppContext);
    return (
        <table className="table">
            <thead>
                <tr className="table-header">
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
            </thead>

            {pickDateData.map((list) => {
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
    );
};
