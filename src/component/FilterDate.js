import React from "react";
import { AppContext } from "../Helper/Context";
import { useContext } from "react";
import { SetDate } from "./Date";
import { MdDelete, MdEdit, MdPrint } from "react-icons/md";

export const FilterDate = () => {
    const { state } = useContext(AppContext);
    return (
        <>
            {state.memoryListDateFilter.length === 0 ? (
                <tr>
                    <td colSpan="7" className="no-list">
                        <h1>No Item is available.</h1>
                        <span style={{ color: "black" }}>Please find another date or search name</span>
                    </td>
                </tr>
            ) : (
                state.memoryListDateFilter.map((list) => {
                    return (
                        <tr className="table-row-body" key={list.id}>
                            <td>
                                <input className="checkbox" type="checkbox" />
                            </td>
                            <td className="table-body-date">
                                <SetDate list={list} />
                            </td>
                            <td>{list.name}</td>
                            <td className="table-body-amount">
                                {list.amount} <span className="kyat">Kyat</span>
                            </td>

                            <td className="table-body-action-container">
                                <div className="table-body-action">
                                    <span>
                                        <MdEdit className="table-icon edit" />
                                    </span>
                                    <span>
                                        <MdDelete className="table-icon delete" />
                                    </span>
                                    <span>
                                        <MdPrint className="table-icon print" />
                                    </span>
                                </div>
                            </td>
                        </tr>
                    );
                })
            )}
        </>
    );
};
