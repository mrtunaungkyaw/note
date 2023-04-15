import React from "react";
import { MdClear, MdDone } from "react-icons/md";
import { AppContext } from "../Helper/Context";
import { useContext } from "react";

export const ConfirmBox = () => {
    const { state, dispatch, ACTION_TYPES } = useContext(AppContext);
    return (
        <div className="confirm-container">
            <div className="confirm">
                <div className="confirm-header">
                    <span>{state.confirmBox.text}</span>
                </div>
                <div className="confirm-btn">
                    <button onClick={() => dispatch({ type: ACTION_TYPES.CONFIRM_CANCLE })} className="btn">
                        <MdClear className="icon" />
                    </button>
                    <button onClick={() => dispatch({ type: ACTION_TYPES.CONFIRM_OK })} className="btn">
                        <MdDone className="icon" />
                    </button>
                    {/* handleConfirmOk */}
                </div>
            </div>
        </div>
    );
};
