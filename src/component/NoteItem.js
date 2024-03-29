import React from "react";
import { ACTION_TYPES } from "../Helper/postReducer";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { SetTime } from "./Date";

export const NoteItem = () => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <>
            {state.dataList.map((list, ind) => {
                return (
                    <li key={list.id} className="info-container">
                        <div className="info">
                            <div className="number">
                                <span>{ind + 1}</span>
                            </div>
                            <div className="time">
                                <SetTime list={list} />
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
                            <span
                                onClick={() => dispatch({ type: ACTION_TYPES.EDIT_ITEM, payload: list })}
                                className="edit-icon"
                            >
                                <MdEdit className="icon" />
                            </span>
                            <span
                                onClick={() => dispatch({ type: ACTION_TYPES.SAVE_ITEM, payload: list })}
                                className={`save-icon ${list.type ? list.type : ""}`}
                            >
                                <MdSave className="icon" />
                            </span>
                            <span
                                onClick={() => dispatch({ type: ACTION_TYPES.DELETE_ITEM, payload: list })}
                                className="dele-icon"
                            >
                                <MdDelete className="icon" />
                            </span>
                        </div>
                    </li>
                );
            })}
        </>
    );
};
