import React from "react";
import { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { AppContext } from "../Helper/Context";

export const NoteItem = () => {
    const { dataList, setDataList } = useContext(AppContext);

    const handleDelete = (id) => {
        const tempDataList = dataList.filter((list) => {
            return list.id !== id;
        });
        setDataList(tempDataList);
    };
    return (
        <>
            {dataList.map((list, ind) => {
                return (
                    <li key={list.id} className="info-container">
                        <div className="info">
                            <span>{ind + 1}</span>
                            <div className="item-name">
                                <span>{list.name}</span>
                            </div>
                            <div className="item-amount">
                                <div>
                                    <span>{list.amount}</span> Kyat
                                </div>
                            </div>
                        </div>
                        <div className="icon-container">
                            <span className="edit-icon">
                                <MdEdit className="icon" />
                            </span>
                            <span onClick={() => handleDelete(list.id)} className="dele-icon">
                                <MdDelete className="icon" />
                            </span>
                        </div>
                    </li>
                );
            })}
        </>
    );
};
