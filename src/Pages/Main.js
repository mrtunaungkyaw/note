import React from "react";
import { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { NoteForm } from "../component/NoteForm";
import { Alert } from "../component/Alert";
import { ConfirmBox } from "../component/ConfirmBox";

export const Main = () => {
    const { dataList, confirm, alert } = useContext(AppContext);

    return (
        <>
            <div className="container">
                <div className="alert-container">{alert.show && <Alert type={alert.type} text={alert.text} />}</div>
                <div className="header">
                    <h1>Note</h1>
                </div>
                <main className="main-container">
                    <NoteForm />
                </main>
                {confirm.show && <ConfirmBox />}
                <div className="total">
                    <h1>
                        Total :
                        <span>
                            {dataList.reduce((acc, curr) => {
                                return (acc += parseInt(curr.amount));
                            }, 0)}
                        </span>
                    </h1>
                </div>
            </div>
        </>
    );
};
