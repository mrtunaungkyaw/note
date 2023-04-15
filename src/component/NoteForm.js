import React from "react";
import { NoteList } from "./NoteList";
import { MdDelete, MdSend } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";

export const NoteForm = () => {
    const { state, dispatch, ACTION_TYPES, handleAlert } = useContext(AppContext);

    const handleInput = (e) => {
        const name = e.target.name;
        const amount = e.target.value;
        dispatch({ type: ACTION_TYPES.FORM_INPUT, payload: { [name]: amount } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.formInput.name !== "" && state.formInput.amount > 0) {
            if (state.edit.show) {
                dispatch({ type: ACTION_TYPES.EDIT });
                // handleAlert({ type: "success", text: "Success Edit Item" });
            } else {
                dispatch({ type: ACTION_TYPES.SUBMIT });
                // handleAlert({ type: "success", text: "Success Add Item" });
            }
        } else {
            handleAlert({
                type: "danger",
                text: "Change Can Be Empty Value And Amount Value Has To Be Bigger Than Zero",
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <div className="input-group">
                        <label className="label">Name</label>
                        <input
                            onChange={handleInput}
                            className="form-control"
                            type="text"
                            name="name"
                            value={state.formInput.name || ""}
                            placeholder="e.g. Tun Aung Kyaw"
                        />
                    </div>
                    <div className="input-group">
                        <label className="label">Amount</label>
                        <input
                            onChange={handleInput}
                            className="form-control"
                            type="number"
                            name="amount"
                            value={state.formInput.amount || ""}
                            placeholder="e.g. 1000"
                        />
                    </div>
                    <div className="btn-group">
                        <button className="btn">
                            <label className="label label-submit">{state.edit.show ? "Edit" : "Submit"}</label>
                            <MdSend className="btn-icon" />
                        </button>
                    </div>
                </div>
            </form>
            <div className="list-container">
                <NoteList />
            </div>
            {state.dataList.length > 0 && (
                <div className="clear-save-container">
                    <button
                        onClick={() => {
                            dispatch({ type: ACTION_TYPES.CLEAR_ALL });
                        }}
                        className="btn clear-all-btn"
                    >
                        Clear All
                        <MdDelete className="clear-all-icon" />
                        {/* handleClearAll */}
                    </button>
                    <button className="btn save-all-btn">
                        Save All
                        <MdSend className="save-all-icon" />
                    </button>
                </div>
            )}
        </div>
    );
};
