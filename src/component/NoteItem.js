import React from "react";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { Date } from "./Date";

export const NoteItem = () => {
    const { dataList, handleEdit, handleDelete, handleSave } = useContext(AppContext);
    return (
        <>
            {dataList.map((list, ind) => {
                return (
                    <li key={list.id} className="info-container">
                        <div className="info">
                            <div className="number">
                                <span>{ind + 1}</span>
                            </div>
                            <div className="time">
                                <Date list={list} />
                            </div>
                            <div className="item-name">
                                <span>{list.name}</span>
                            </div>
                            <div className="item-amount">
                                <div>
                                    <span>{list.amount}</span> Kyat
                                </div>
                            </div>
                        </div>
                        <div className="icon-container">
                            <span onClick={() => handleEdit(list.id)} className="edit-icon">
                                <MdEdit className="icon" />
                            </span>
                            <span
                                onClick={() => handleSave(list.id)}
                                className={`save-icon ${list.type ? list.type : ""}`}
                            >
                                <MdSave className="icon" />
                            </span>
                            <span onClick={() => handleDelete(list.id, list.name)} className="dele-icon">
                                <MdDelete className="icon" />
                            </span>
                        </div>
                    </li>
                );
            })}
        </>
    );
};
