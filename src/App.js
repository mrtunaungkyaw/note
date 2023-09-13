import "./App.css";
import { useEffect, useReducer, useState } from "react";
import { reducer } from "./Helper/postReducer";
import { AppContext } from "./Helper/Context";
import { Main } from "./Pages/Main";
import { Navbar } from "./component/Navbar";
import { List } from "./Pages/List";
import { ConfirmBox } from "./component/ConfirmBox";
const localData = localStorage.getItem("dataList") ? JSON.parse(localStorage.getItem("dataList")) : [];
const memoryData = localStorage.getItem("memoryList") ? JSON.parse(localStorage.getItem("memoryList")) : [];

const initinalState = {
    dataList: localData,
    memoryList: memoryData,
    memoryListDateFilter: [],
    dateFilter: { show: false },
    formInput: {},
    edit: { show: false },
    alert: {
        show: false,
        type: "",
        text: "",
    },
    confirmBox: {
        id: 0,
        show: false,
        text: "",
    },
    date: () => {
        const date = new Date().toJSON();
        return date;
    },
    calendar: { show: false },
    checkbox: {},
    print: { show: false },
    printItem: [],
};

function App() {
    const [state, dispatch] = useReducer(reducer, initinalState);
    console.log(state);

    // Alert State
    const [alert, setAlert] = useState({ show: false });
    // Navbar State
    const [navbar, setNavbar] = useState({ home: true, collapse: false });
    // Memory List Show

    // Navbar Home Handle
    const handleNavHome = () => {
        setNavbar({ ...navbar, home: true, collapse: false });
    };

    // Navbar List Handle
    const handleNavList = () => {
        setNavbar({ ...navbar, home: false, collapse: false });
    };

    // Alert Handle
    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text });
        setTimeout(() => {
            setAlert({ show: false });
        }, 3000);
    };

    // Navbar Toggler
    const handleNavToggler = () => {
        setNavbar({ ...navbar, collapse: true });
    };

    // Nabar Collapse Close
    const handleNavCollapseClose = () => {
        setNavbar({ ...navbar, collapse: false });
    };

    // Local Storage Set
    useEffect(() => {
        localStorage.setItem("dataList", JSON.stringify(state.dataList));
    }, [state.dataList]);

    useEffect(() => {
        localStorage.setItem("memoryList", JSON.stringify(state.memoryList));
    }, [state.memoryList]);

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
                alert,
                navbar,
                handleAlert,
                handleNavHome,
                handleNavList,
                handleNavToggler,
                handleNavCollapseClose,
            }}
        >
            <div className="App">
                <Navbar />
                {navbar.home ? <Main /> : <List />}
                {state.confirmBox.show && <ConfirmBox />}
            </div>
        </AppContext.Provider>
    );
}

export default App;
