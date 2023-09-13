import React, { useContext } from "react";
import { AppContext } from "../Helper/Context";
import { TableFilter } from "../component/TableFilter";
import { TableList } from "../component/TableList";

export const List = () => {
    const { state } = useContext(AppContext);
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
