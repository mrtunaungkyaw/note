import React, { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { TableFilter } from "../component/TableFilter";
import { TableList } from "../component/TableList";

export const List = () => {
    // const { state } = useContext(AppContext);
    return (
        <>
            <div className="table-list-filter-container">
                <TableFilter />
            </div>
            <div className="memory-table-container">
                <TableList />
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
