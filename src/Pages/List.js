import React, { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { SetDate, SetTime } from "../component/Date";
import { MdDelete, MdEdit, MdPrint } from "react-icons/md";
import { FaSortNumericDown, FaSortNumericUpAlt } from "react-icons/fa";
import { PickDateDataComponent } from "../component/PickDateDataComponent";
import { TableFilter } from "../component/TableFilter";

export const List = () => {
    const { state, pickDateData } = useContext(AppContext);
    return (
        <>
            <TableFilter />
            <div className="memory-table-container">
                <table className="table">
                    <thead>
                        <tr className="table-row-header">
                            <th className="table-header-select">
                                <div className="table-select">
                                    <span>
                                        <input className="checkbox" type="checkbox" />
                                    </span>
                                </div>
                            </th>
                            <th className="table-header-date">
                                <div className="table-date">
                                    <span>Date</span>
                                    <span className="sort-icon">
                                        {/* <FaSortNumericDown /> */}
                                        <FaSortNumericUpAlt />
                                    </span>
                                </div>
                            </th>
                            <th className="table-header-name">
                                <div className="table-name">
                                    <span>Customer Name</span>
                                </div>
                            </th>
                            <th className="tabl-header-amount">
                                <div className="table-amount">
                                    <span>Amount</span>
                                </div>
                            </th>

                            <th className="table-header-action">
                                <div className="table-aciton">
                                    <span>Action</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.memoryList.map((list) => {
                            return (
                                <tr className="table-row-body" key={list.id}>
                                    <td>
                                        <input className="checkbox" type="checkbox" />
                                    </td>
                                    <td className="table-body-date">{new Date(list.date).toLocaleDateString()}</td>
                                    <td>{list.name}</td>
                                    <td className="table-body-amount">
                                        {list.amount} <span className="kyat">Kyat</span>
                                    </td>

                                    <td className="table-body-action-container">
                                        <div className="table-body-action">
                                            <span>
                                                <MdEdit className="table-icon edit" />
                                            </span>
                                            <span>
                                                <MdDelete className="table-icon delete" />
                                            </span>
                                            <span>
                                                <MdPrint className="table-icon print" />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

// {memoryListShow.show && (
//     <table className="table">
//         <thead>
//             <tr className="table-header">
//                 <th>
//                     <input type="checkbox"></input>
//                 </th>
//                 <th>
//                     <span>Name</span>
//                     <span className="sort-icon">
//                         <MdUnfoldMore />
//                     </span>
//                 </th>
//                 <th>
//                     <span>Amount</span>
//                     <span className="sort-icon">
//                         <MdUnfoldMore />
//                     </span>
//                 </th>
//                 <th>
//                     <span>Time</span>
//                     <span className="sort-icon">
//                         <MdUnfoldMore />
//                     </span>
//                 </th>
//                 <th>
//                     <span>Date</span>
//                     <span className="sort-icon">
//                         <MdUnfoldMore />
//                     </span>
//                 </th>
//             </tr>
//         </thead>

//         {state.memoryList.map((list) => {
//             return (
//                 <tbody key={list.id}>
//                     <tr className="table-body">
//                         <td>
//                             <input type="checkbox"></input>
//                         </td>
//                         <td>
//                             <span>{list.name}</span>
//                         </td>
//                         <td>{list.amount}</td>
//                         <td>
//                             <SetTime list={list} />
//                         </td>
//                         <td>
//                             <SetDate list={list} />
//                         </td>
//                     </tr>
//                 </tbody>
//             );
//         })}
//     </table>
// )}
// {pickDateData.length > 0 && <PickDateDataComponent />}
