import React from "react";
import { MdClear, MdDone } from "react-icons/md";
import { AppContext } from "../Helper/Context";
import { useContext } from "react";

export const ConfirmBox = () => {
    const { confirm, handleConfirmCancle, handleConfirmOk } = useContext(AppContext);
    return (
        <div className="confirm-container">
            <div className="confirm">
                <div className="confirm-header">
                    <span>{confirm.text}</span>
                </div>
                <div className="confirm-btn">
                    <button onClick={handleConfirmCancle} className="btn">
                        <MdClear className="icon" />
                    </button>
                    <button onClick={handleConfirmOk} className="btn">
                        <MdDone className="icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};
