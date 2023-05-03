import React, { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { SetDate } from "../component/Date";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { MdDelete, MdEdit, MdPrint } from "react-icons/md";
import { FilterDate } from "../component/FilterDate";

export const TableList = () => {
    const { state, ACTION_TYPES, dispatch } = useContext(AppContext);

    return (
        <>
            <table className="table">
                <thead>
                    <tr className="table-row-header">
                        <th className="table-header-select">
                            <div className="table-select">
                                <span>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name="selectAll"
                                        checked={state.memoryList.filter((list) => list.isChecked !== true).length < 1}
                                        onChange={(e) =>
                                            dispatch({
                                                type: ACTION_TYPES.CHECKBOX_SELECT_ALL,
                                                payload: e.target,
                                            })
                                        }
                                    />
                                </span>
                            </div>
                        </th>
                        <th className="table-header-date">
                            <div className="table-date">
                                <span>Date</span>
                                <span className="sort-icon">
                                    {/* <FaSortNumericDown /> */}
                                    <FaSortNumericUpAlt />
                                </span>
                            </div>
                        </th>
                        <th className="table-header-name">
                            <div className="table-name">
                                <span>Customer Name</span>
                            </div>
                        </th>
                        <th className="tabl-header-amount">
                            <div className="table-amount">
                                <span>Amount</span>
                            </div>
                        </th>

                        <th className="table-header-action">
                            <div className="table-aciton">
                                <span>Action</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {state.dateFilter.show ? (
                        <FilterDate />
                    ) : state.memoryList.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="no-list">
                                <h1>No Item is available.</h1>
                                <span style={{ color: "black" }}>Please find another date or search name</span>
                            </td>
                        </tr>
                    ) : (
                        state.memoryList.map((list) => {
                            return (
                                <tr className="table-row-body" key={list.id}>
                                    <td>
                                        <input
                                            className="checkbox"
                                            type="checkbox"
                                            name={list.name}
                                            checked={list?.isChecked || false}
                                            onChange={(e) =>
                                                dispatch({
                                                    type: ACTION_TYPES.CHECKBOX_SELECT_ITEM,
                                                    payload: e.target,
                                                })
                                            }
                                        />
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
                </tbody>
            </table>
        </>
    );
};
