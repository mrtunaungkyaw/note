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
    EDIT_ITEM: "EDIT_ITEM",
    EDIT: "EDIT",
    DELETE_ITEM: "DELETE_ITEM",
    SAVE_ITEM: "SAVE_ITEM",
    CONFIRM_CANCLE: "CONFIRM_CANCLE",
    CONFIRM_DELETE: "CONFIRM_DELETE",
    CONFIRM_SAVE: "CONFIRM_SAVE",
    CLEAR_ALL: "CLEAR_ALL",
    CALENDAR_ITEM: "CALENDAR_ITEM",
    CALENDAR: "CALENDAR",
    ALL_LIST: "ALL_LIST",
    CHECKBOX_SELECT_ALL: "CHECKBOX_SELECT_ALL",
    CHECKBOX_SELECT_ITEM: "CHECKBOX_SELECT_ITEM",
};

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
};

const reducer = (state, action) => {
    console.log(action.payload);
    switch (action.type) {
        // Input Data
        case ACTION_TYPES.FORM_INPUT:
            return {
                ...state,
                formInput: { ...state.formInput, ...action.payload },
            };
        // Submit Data
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
        // Edit Item
        case ACTION_TYPES.EDIT_ITEM:
            return {
                ...state,
                edit: { show: true, id: action.payload.id },
                formInput: { ...state.formInput, name: action.payload.name, amount: action.payload.amount },
            };
        // Edit
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
        // Delete Item
        case ACTION_TYPES.DELETE_ITEM:
            return {
                ...state,
                confirmBox: {
                    ...state.confirmBox,
                    show: true,
                    type: "delete",
                    id: action.payload.id,
                    text: `Are You Sure Delete This Item ("${action.payload.name}") `,
                },
            };
        // Save Item
        case ACTION_TYPES.SAVE_ITEM:
            return {
                ...state,
                confirmBox: {
                    ...state.confirmBox,
                    show: true,
                    type: "save",
                    id: action.payload.id,
                    text: `Are You Sure Save This Item ("${action.payload.name}") `,
                },
            };
        // Confirm Cancle
        case ACTION_TYPES.CONFIRM_CANCLE:
            return {
                ...state,
                confirmBox: { show: false },
            };
        // Confirm Delete
        case ACTION_TYPES.CONFIRM_DELETE:
            return {
                ...state,
                confirmBox: { ...state.confirmBox, show: false },
                dataList: state.dataList.filter((list) => list.id !== state.confirmBox.id),
            };
        // Confirm Save
        case ACTION_TYPES.CONFIRM_SAVE:
            return {
                ...state,
                confirmBox: { ...state.confirmBox, show: false },
                memoryList: [...state.memoryList, ...state.dataList.filter((list) => list.id === state.confirmBox.id)],
                dataList: [
                    ...state.dataList.map((list) =>
                        list.id === state.confirmBox.id ? { ...list, type: "save" } : list
                    ),
                ],
            };
        // Clear All
        case ACTION_TYPES.CLEAR_ALL:
            return {
                ...state,
                dataList: [],
            };
        // All List
        case ACTION_TYPES.ALL_LIST:
            return {
                ...state,
                dateFilter: { ...state.dateFilter, show: false },
                calendar: { show: false },
            };
        // Calendar Item
        case ACTION_TYPES.CALENDAR_ITEM:
            return {
                ...state,
                calendar: { ...state.calendar, show: !state.calendar.show },
            };
        // Calendar
        case ACTION_TYPES.CALENDAR:
            return {
                ...state,
                calendar: { ...state.calendar, date: action.payload, show: !state.calendar.show },
                dateFilter: { ...state.dateFilter, show: true },
                allList: { ...state.allList, show: true },
                memoryListDateFilter: [
                    ...state.memoryList.filter((list) => {
                        return (
                            new Date(list.date).toLocaleDateString() === new Date(action.payload).toLocaleDateString()
                        );
                    }),
                ],
            };
        case ACTION_TYPES.CHECKBOX_SELECT_ALL:
            return {
                ...state,
                memoryList: state.memoryList.map((list) => {
                    return { ...list, isChecked: action.payload.checked };
                }),
            };
        case ACTION_TYPES.CHECKBOX_SELECT_ITEM:
            return {
                ...state,
                memoryList: state.memoryList.map((list) => {
                    return list.name === action.payload.name ? { ...list, isChecked: action.payload.checked } : list;
                }),
            };

        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initinalState);
    // console.log(state);
    // DatePick Data Show

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

    // Calendar Handle
    // const handleCalendar = (value) => {
    //     // const pickDate = value;
    //     // // setCalendar({ date: pickDate, show: !calendar.show });
    //     // const tempFilterData = state.memoryList.filter((list) => {
    //     //     return new Date(list.date).toLocaleDateString() === new Date(pickDate).toLocaleDateString();
    //     // });
    //     // setPickDateData(tempFilterData);
    //     // setMemoryListShow({ show: false });
    // };

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
                ACTION_TYPES,
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
            </div>
        </AppContext.Provider>
    );
}

export default App;
