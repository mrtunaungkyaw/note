import "./App.css";
import { useEffect, useReducer, useState } from "react";
import { AppContext } from "./Helper/Context";
import { Main } from "./Pages/Main";
import { Navbar } from "./component/Navbar";
import { List } from "./Pages/List";
import { v4 as uuid } from "uuid";

const localData = localStorage.getItem("dataList") ? JSON.parse(localStorage.getItem("dataList")) : [];
const memoryData = localStorage.getItem("memoryList") ? JSON.parse(localStorage.getItem("memoryList")) : [];

const ACTION_TYPES = {
    FORM_INPUT: "FORM_INPUT",
    SUBMIT: "SUBMIT",
    EDIT_ICON: "EDIT_ICON",
    EDIT: "EDIT",
    DELETE_ITEM: "DELETE_ITEM",
    CONFIRM_CANCLE: "CONFIRM_CANCLE",
    CONFIRM_OK: "CONFIRM_OK",
    SAVE_MEMORY: "SAVE_MEMORY",
    SAVE_DATA: "SAVE_DATA",
    CLEAR_ALL: "CLEAR_ALL",
};

const initinalState = {
    dataList: localData,
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
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.FORM_INPUT:
            return {
                ...state,
                formInput: { ...state.formInput, ...action.payload },
            };
        case ACTION_TYPES.SUBMIT:
            return {
                ...state,
                dataList: [
                    ...state.dataList,
                    {
                        id: uuid(),
                        name: state.formInput.name,
                        amount: state.formInput.amount,
                        date: state.date(),
                    },
                ],
                formInput: {},
            };
        case ACTION_TYPES.EDIT_ICON:
            return {
                ...state,
                edit: { show: true, id: action.payload.id },
                formInput: { ...state.formInput, name: action.payload.name, amount: action.payload.amount },
            };
        case ACTION_TYPES.EDIT:
            return {
                ...state,
                dataList: state.dataList.map((list) =>
                    list.id === state.edit.id
                        ? {
                              ...list,
                              name: state.formInput.name,
                              amount: state.formInput.amount,
                              editDate: state.date(),
                          }
                        : list
                ),
                edit: { show: false },
                formInput: {},
            };
        case ACTION_TYPES.DELETE_ITEM:
            return {
                ...state,
                confirmBox: {
                    show: true,
                    id: action.payload.id,
                    text: `Are You Sure Delete This Item ("${action.payload.name}") `,
                },
            };
        case ACTION_TYPES.CONFIRM_CANCLE:
            return {
                ...state,
                confirmBox: { show: false },
            };
        case ACTION_TYPES.CONFIRM_OK:
            return {
                ...state,
                confirmBox: { ...state.confirmBox, show: false },
                dataList: state.dataList.filter((list) => list.id !== state.confirmBox.id),
            };
        case ACTION_TYPES.CLEAR_ALL:
            return {
                ...state,
                dataList: [],
            };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initinalState);
    // console.log(state);
    // Memory Data
    const [memoryList, setMemoryList] = useState(memoryData);
    // DatePick Data Show
    const [pickDateData, setPickDateData] = useState([]);

    // Alert State
    const [alert, setAlert] = useState({ show: false });
    // Navbar State
    const [navbar, setNavbar] = useState({ home: true, collapse: false });
    // Calender State
    const [calendar, setCalendar] = useState({ date: new Date(), show: false });
    // Memory List Show
    const [memoryListShow, setMemoryListShow] = useState({ show: true });

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

    // Save Handle
    const handleSave = (id) => {
        const tempSaveData = state.dataList.filter((list) => {
            return list.id === id;
        });
        setMemoryList([...memoryList, ...tempSaveData]);
        const tempDataList = state.dataList.map((list) => {
            return list.id === id ? { ...list, type: "success" } : list;
        });
        // dispatch Save
        dispatch({ type: ACTION_TYPES.SAVE_DATA, payload: tempDataList });
        handleAlert({ type: "success", text: "Success Save Item" });
    };

    // Calendar Button Handle
    const handleCalendarButton = (e) => {
        setCalendar({ ...calendar, show: !calendar.show });
    };

    // Calendar Handle
    const handleCalendar = (value) => {
        const pickDate = value;
        setCalendar({ date: pickDate, show: !calendar.show });
        const tempFilterData = memoryList.filter((list) => {
            return new Date(list.date).toLocaleDateString() === new Date(pickDate).toLocaleDateString();
        });
        setPickDateData(tempFilterData);
        setMemoryListShow({ show: false });
        console.log(pickDateData);
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
        localStorage.setItem("memoryList", JSON.stringify(memoryList));
    }, [memoryList]);

    return (
        <AppContext.Provider
            value={{
                state,
                ACTION_TYPES,
                dispatch,
                memoryList,
                alert,
                calendar,
                pickDateData,
                memoryListShow,
                navbar,
                handleAlert,
                handleNavHome,
                handleNavList,
                handleSave,
                handleCalendarButton,
                handleCalendar,
                handleNavToggler,
                handleNavCollapseClose,
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
