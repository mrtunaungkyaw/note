import React from "react";
import { NoteList } from "./NoteList";
import { MdDelete, MdSend } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";

export const NoteForm = () => {
    const { name, amount, dataList, handleName, handleAmount, handleSubmit, handleClearAll } = useContext(AppContext);

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <div className="input-group">
                        <label className="label">Name</label>
                        <input
                            onChange={handleName}
                            className="form-control"
                            type="text"
                            value={name}
                            placeholder="e.g. Tun Aung Kyaw"
                        />
                    </div>
                    <div className="input-group">
                        <label className="label">Amount</label>
                        <input
                            onChange={handleAmount}
                            className="form-control"
                            type="number"
                            value={amount}
                            placeholder="e.g. 1000"
                        />
                    </div>
                    <div className="btn-group">
                        <button className="btn">
                            <label className="label label-submit">Submit</label>
                            <MdSend className="btn-icon" />
                        </button>
                    </div>
                </div>
            </form>
            <div className="list-container">
                <NoteList />
            </div>
            {dataList.length > 0 && (
                <button onClick={handleClearAll} className="btn clear-btn">
                    Clear All
                    <MdDelete className="clear-icon" />
                </button>
            )}
        </div>
    );
};