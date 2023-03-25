import "./App.css";
import { NoteForm } from "./component/NoteForm";
import { useState } from "react";
import { AppContext } from "./Helper/Context";
import { v4 as uuid } from "uuid";
import { Alert } from "./component/Alert";

const initialExpenses = [
    { id: uuid(), name: "rent", amount: 1600 },
    { id: uuid(), name: "car payment", amount: 400 },
    { id: uuid(), name: "credit card bill", amount: 1200 },
];

function App() {
    const [dataList, setDataList] = useState(initialExpenses);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [alert, setAlert] = useState({ show: false });

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== "" && amount > 0) {
            const tempDataList = { id: uuid(), name, amount };
            setDataList([...dataList, tempDataList]);
            handleAlert({ type: "success", text: "Item Added" });
            setName("");
            setAmount("");
        } else {
            handleAlert({
                type: "danger",
                text: "Change Can Be Empty Value And Amount Value Has To Be Bigger Than Zero",
            });
            setTimeout(() => {
                setAlert({ show: false });
            }, 3000);
        }
    };

    const handleClearAll = () => {
        setDataList([]);
    };

    return (
        <div className="App">
            <div className="container">
                <div className="alert-container">{alert.show && <Alert type={alert.type} text={alert.text} />}</div>
                <div className="header">
                    <h1>Note</h1>
                </div>
                <AppContext.Provider
                    value={{
                        name,
                        amount,
                        dataList,
                        setName,
                        setAmount,
                        setDataList,
                        handleName,
                        handleAmount,
                        handleClearAll,
                        handleSubmit,
                    }}
                >
                    <main className="main-container">
                        <NoteForm />
                    </main>
                </AppContext.Provider>
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
        </div>
    );
}

export default App;
