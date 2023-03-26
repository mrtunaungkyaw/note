import "./App.css";
import { NoteForm } from "./component/NoteForm";
import { useEffect, useState } from "react";
import { AppContext } from "./Helper/Context";
import { v4 as uuid } from "uuid";
import { Alert } from "./component/Alert";
import { ConfirmBox } from "./component/ConfirmBox";

const localData = localStorage.getItem("dataList") ? JSON.parse(localStorage.getItem("dataList")) : [];

function App() {
    // Main Data
    const [dataList, setDataList] = useState(localData);
    // Name Data
    const [name, setName] = useState("");
    // Amount Data
    const [amount, setAmount] = useState("");
    // Alert Data
    const [alert, setAlert] = useState({ show: false });
    // Edit Data
    const [edit, setEdit] = useState({ show: false });
    // Confirm Box Data
    const [confirm, setConfirm] = useState({ show: false });

    // Name Handle
    const handleName = (e) => {
        setName(e.target.value);
    };

    // Amount Handle
    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    // Alert Handle
    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text });
        setTimeout(() => {
            setAlert({ show: false });
        }, 3000);
    };

    // Edit Handle
    const handleEdit = (id) => {
        const tempEditData = dataList.find((list) => {
            return list.id === id;
        });
        const { name, amount } = tempEditData;
        setName(name);
        setAmount(amount);
        setEdit({ show: true, id });
    };

    // Delete Handle
    const handleDelete = (id, name) => {
        setConfirm({ show: true, id, text: `Are You Sure Delete This Item ("${name}") ` });
    };

    const handleConfirmCancle = () => {
        setConfirm({ show: false });
        handleAlert({ show: true, type: "danger", text: "Cancle Delete" });
    };

    const handleConfirmOk = () => {
        const tempDeleteData = dataList.filter((list) => {
            return list.id !== confirm.id;
        });
        setDataList(tempDeleteData);
        setConfirm({ show: false });
        handleAlert({ type: "success", text: "Success Delete Item" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== "" && amount > 0) {
            if (edit.show) {
                const tempEditData = dataList.map((list) => {
                    return list.id === edit.id ? { ...list, name, amount } : list;
                });
                setDataList(tempEditData);
                setEdit({ show: false });
                handleAlert({ type: "success", text: "Item Edit" });
            } else {
                const tempDataList = { id: uuid(), name, amount };
                setDataList([...dataList, tempDataList]);
                handleAlert({ type: "success", text: "Item Added" });
            }
            setName("");
            setAmount("");
        } else {
            handleAlert({
                type: "danger",
                text: "Change Can Be Empty Value And Amount Value Has To Be Bigger Than Zero",
            });
        }
    };

    const handleClearAll = () => {
        setDataList([]);
        handleAlert({ type: "success", text: "Success Clear All Item" });
    };

    useEffect(() => {
        console.log("effect");
        localStorage.setItem("dataList", JSON.stringify(dataList));
    });

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
                        edit,
                        confirm,
                        setName,
                        setAmount,
                        setDataList,
                        handleName,
                        handleAmount,
                        handleEdit,
                        handleDelete,
                        handleConfirmCancle,
                        handleConfirmOk,
                        handleClearAll,
                        handleSubmit,
                    }}
                >
                    <main className="main-container">
                        <NoteForm />
                    </main>
                    {confirm.show && <ConfirmBox />}
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
