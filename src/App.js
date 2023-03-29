import "./App.css";
import { useEffect, useState } from "react";
import { AppContext } from "./Helper/Context";
import { v4 as uuid } from "uuid";
import { Main } from "./Pages/Main";
import { Navbar } from "./component/Navbar";
import { List } from "./Pages/List";

const localData = localStorage.getItem("dataList") ? JSON.parse(localStorage.getItem("dataList")) : [];
const memoryData = localStorage.getItem("memoryList") ? JSON.parse(localStorage.getItem("memoryList")) : [];

function App() {
    // Main State
    const [dataList, setDataList] = useState(localData);
    // Memory Data
    const [memoryList, setMemoryList] = useState(memoryData);
    // Name State
    const [name, setName] = useState("");
    // Amount State
    const [amount, setAmount] = useState("");
    // Alert State
    const [alert, setAlert] = useState({ show: false });
    // Edit State
    const [edit, setEdit] = useState({ show: false });
    // Confirm Box State
    const [confirm, setConfirm] = useState({ show: false });
    // Navbar State
    const [navbar, setNavbar] = useState({ home: true });

    // Date Handle
    const handleDate = () => {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const currentTime = `${hour}:${minute}:${second}`;
        return currentTime;
    };

    // Name Handle
    const handleName = (e) => {
        setName(e.target.value);
    };

    // Amount Handle
    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    // Navbar Home Handle
    const handleNavHome = () => {
        setNavbar({ home: true });
    };

    // Navbar List Handle
    const handleNavList = () => {
        setNavbar({ home: false });
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

    // Save Handle
    const handleSave = (id) => {
        const tempSaveData = dataList.filter((list) => {
            return list.id === id;
        });
        setMemoryList([...memoryList, ...tempSaveData]);
        const tempDataList = dataList.map((list) => {
            return list.id === id ? { ...list, type: "success" } : list;
        });
        setDataList(tempDataList);
        handleAlert({ type: "success", text: "Success Save Item" });
    };

    // Clear All Handle
    const handleClearAll = () => {
        setDataList([]);
        handleAlert({ type: "success", text: "Success Clear All Item" });
    };

    // Confirm Cancle Handle
    const handleConfirmCancle = () => {
        setConfirm({ show: false });
        handleAlert({ show: true, type: "danger", text: "Cancle Delete" });
    };

    // Confirm Ok Handle
    const handleConfirmOk = () => {
        const tempDeleteData = dataList.filter((list) => {
            return list.id !== confirm.id;
        });
        setDataList(tempDeleteData);
        setConfirm({ show: false });
        handleAlert({ type: "success", text: "Success Delete Item" });
    };

    // Submit Handle
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== "" && amount > 0) {
            if (edit.show) {
                const tempEditData = dataList.map((list) => {
                    return list.id === edit.id ? { ...list, name, amount, editTime: handleDate() } : list;
                });
                setDataList(tempEditData);
                setEdit({ show: false });
                handleAlert({ type: "success", text: "Success Edit Item" });
            } else {
                const tempDataList = { id: uuid(), name, amount, setTime: handleDate() };
                setDataList([...dataList, tempDataList]);
                handleAlert({ type: "success", text: "Success Add Item" });
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

    // Local Storage Set
    useEffect(() => {
        localStorage.setItem("dataList", JSON.stringify(dataList));
    }, [dataList]);

    useEffect(() => {
        localStorage.setItem("memoryList", JSON.stringify(memoryList));
    }, [memoryList]);

    return (
        <AppContext.Provider
            value={{
                name,
                amount,
                dataList,
                edit,
                confirm,
                alert,
                setName,
                setAmount,
                setDataList,
                handleNavHome,
                handleNavList,
                handleName,
                handleAmount,
                handleDate,
                handleEdit,
                handleDelete,
                handleSave,
                handleClearAll,
                handleConfirmCancle,
                handleConfirmOk,
                handleSubmit,
            }}
        >
            <div className="App">
                <Navbar />
                {navbar.home ? <Main /> : <List />}
            </div>
        </AppContext.Provider>
    );
}

export default App;
