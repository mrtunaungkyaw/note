import { v4 as uuid } from "uuid";

export const ACTION_TYPES = {
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
    FILTER_MEMORY_LIST_DELETE: "FILTER_MEMORY_LIST_DELETE",
    FILTER_MEMORY_LIST_PRINT: "FILTER_MEMORY_LIST_PRINT",
    PRINT_ITEM: "PRINT_ITEM",
    CONFIRM_PRINT: "CONFIRM_PRINT",
    CHECKBOX_SELECT_ALL: "CHECKBOX_SELECT_ALL",
    CHECKBOX_SELECT_ITEM: "CHECKBOX_SELECT_ITEM",
};

export const reducer = (state, action) => {
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
        case ACTION_TYPES.FILTER_MEMORY_LIST_DELETE:
            return {
                ...state,
                memoryList: state.memoryList.filter((list) => list.isChecked !== true),
            };
        case ACTION_TYPES.PRINT_ITEM:
            return {
                ...state,
                confirmBox: {
                    ...state.confirmBox,
                    show: true,
                    type: "print",
                    text: `Are You Sure Print This Item ("") `,
                },
                print: { show: true },
                printItem: state.memoryList.filter((list) => list.isChecked === true),
            };
        case ACTION_TYPES.CONFIRM_PRINT:
            return {
                ...state,
                confirmBox: {
                    show: false,
                },
                print: { show: false },
            };

        default:
            return state;
    }
};
