import React from "react";
import { ACTION_TYPES } from "../Helper/postReducer";
import { MdClear, MdDone } from "react-icons/md";
import { AppContext } from "../Helper/Context";
import { useContext } from "react";

export const ConfirmBox = () => {
    const { state, dispatch } = useContext(AppContext);

    const print = () => {};

    const handlePrint = (print) => {
        dispatch({ type: ACTION_TYPES.CONFIRM_PRINT });
        print();
    };

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
                    {state.confirmBox.type === "delete" ? (
                        <button onClick={() => dispatch({ type: ACTION_TYPES.CONFIRM_DELETE })} className="btn">
                            <MdDone className="icon" />
                        </button>
                    ) : state.confirmBox.type === "print" ? (
                        <button onClick={() => handlePrint(print)} className="btn">
                            <MdDone className="icon" />
                        </button>
                    ) : (
                        <button onClick={() => dispatch({ type: ACTION_TYPES.CONFIRM_SAVE })} className="btn">
                            <MdDone className="icon" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
