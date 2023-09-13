import React from "react";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { NoteForm } from "../component/NoteForm";
import { Alert } from "../component/Alert";

export const Main = () => {
    const { state } = useContext(AppContext);

    return (
        <>
            <div className="container">
                <div className="alert-container">
                    {state.alert.show && <Alert type={state.alert.type} text={state.alert.text} />}
                </div>
                <div className="header">
                    <h1>Note</h1>
                </div>
                <main className="main-container">
                    <NoteForm />
                </main>
                <div className="total">
                    <h1>
                        Total :
                        <span>
                            {state.dataList.reduce((acc, curr) => {
                                return (acc += parseInt(curr.amount));
                            }, 0)}
                        </span>
                    </h1>
                </div>
            </div>
        </>
    );
};
