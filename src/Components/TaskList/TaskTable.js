// import React, { useMemo } from 'react';
// import { useTable, usePagination } from 'react-table';

// const TaskTable = ({ columns, data }) => {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0 },
//     },
//     usePagination
//   );

//   const memoizedColumns = useMemo(() => columns, [columns]);

//   return (
//     <div>
//       <table {...getTableProps()} style={{ width: '100%', backgroundColor: 'red',  }}>
//         <thead style={{ backgroundColor: 'pink', textAlign: 'left' }}>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => (
//                   <td style={{ backgroundColor: 'green' }} {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div>
//         <span>
//           Page{' '}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>{' '}
//         </span>
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {'<<'}
//         </button>{' '}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {'<'}
//         </button>{' '}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           {'>'}
//         </button>{' '}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {'>>'}
//         </button>{' '}
//         <span>
//           | Go to page:{' '}
//           <input
//             type="number"
//             value={pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               gotoPage(page);
//             }}
//             style={{ width: '50px' }}
//           />
//         </span>{' '}
//       </div>
//     </div>
//   );
// };

// export default TaskTable;

import React, { useState, useContext, useEffect, useMemo } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { PageContext } from "../../Context/PageContext";
import SpecificTaskMore from "./SpecificTaskMore";
import TablerowMoreOptions from "./TablerowMoreOptions";
import { MdStar } from "react-icons/md";

const TaskTable = ({ columns, data, setData }) => {
  const navigate = useNavigate();
  const { setPageName } = useContext(PageContext);
  const [bookmark, setBookmark] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10, selectedRowIds: {} },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <input type="checkbox" {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const memoizedColumns = useMemo(() => columns, [columns]);

  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, data.length);

  // delete row

  const handleDeleteRow = (row) => {
    const updatedData = data.filter((rowData) => rowData !== row.original);
    setData(updatedData);
  };

  // bookmark item

  const handleBookmark = (row) => {
    setBookmark(row.cells[1].value);
    console.log(row.cells[1].value);
  };

  // const handleRowClick = (row) => {
  //   console.log('Row clicked:', row.original);
  //   const taskId = row.original.id;
  //   history.push(`/specific-task/${taskId}`);
  // };

  return (
    <div>
      <table
        {...getTableProps()}
        style={{ width: "100%", borderCollapse: "none !important" }}
      >
        <thead style={{ textAlign: "left" }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th style={{ color: "#1B2436" }} {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {column.id === "optionsColumn" && (
                    <span>
                      <SlOptionsVertical />
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const isSelected = selectedRowIds[row.id];

            return (
              <tr
                {...row.getRowProps({
                  style: {
                    background: isSelected ? "rgba(232, 239, 255, 1)" : "",
                  },
                  // onClick: () => {
                  //   navigate(`specific-task/${row.original.id}`);
                  // },
                })}
                className="table-row"
              >
                {row.cells.map((cell) => (
                  <td
                    style={{ color: "#8493B2" }}
                    {...cell.getCellProps()}
                    onClick={
                      cell.column.id != "optionsColumn"
                        ? () => navigate(`specific-task/${row.original.id}`)
                        : () => console.log("test")
                    }
                  >
                    {cell.column.id === "optionsColumn" && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <SlOptionsVertical /> */}
                        {bookmark === row.original.id && <MdStar />}
                        <TablerowMoreOptions
                          handleDeleteRow={() => handleDeleteRow(row)}
                          handleBookmark={() => handleBookmark(row)}
                        />
                      </span>
                    )}
                    {cell.value === "Completed" ? (
                      <span
                        style={{
                          backgroundColor: "#3AFF8926",
                          color: "#00B348",
                          padding: "0.3rem 1rem",
                          borderRadius: "0.5rem",
                          fontSize: "0.9rem",
                          fontFamily: "EuclidSemibold",
                        }}
                      >
                        {cell.render("Cell")}
                      </span>
                    ) : cell.value === "Pending" ? (
                      <span
                        style={{
                          backgroundColor: "#FF9F9F4D",
                          color: "#DD361F",
                          padding: "0.3rem 1.8rem",
                          borderRadius: "0.5rem",
                          fontSize: "0.9rem",
                          fontFamily: "EuclidSemibold",
                        }}
                      >
                        {cell.render("Cell")}
                      </span>
                    ) : cell.value === "Initiated" ? (
                      <span
                        style={{
                          backgroundColor: "#FFEBA8",
                          color: "#CF681E",
                          padding: "0.3rem 1.7rem",
                          borderRadius: "0.5rem",
                          fontSize: "0.9rem",
                          fontFamily: "EuclidSemibold",
                        }}
                      >
                        {cell.render("Cell")}
                      </span>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          width: "100%",
          height: "0.5px",
          background: "#E1E2E9",
          marginTop: "0.5rem",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1rem",
          fontFamily: "EuclidMedium",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "1rem" }}
        >
          <div>
            <label style={{ color: "#A6A8B1" }}>
              Items per Page:{" "}
              <select
                className="select-page"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <span style={{ color: "#666666" }}>
            Showing {startItem}-{endItem} of {data.length} items
          </span>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", columnGap: "0.5rem" }}
        >
          <span>
            Page{" "}
            <strong style={{ color: "#000000b3" }}>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>|</span>
          <div
            className="prev-next"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </div>{" "}
          <div
            className="prev-next"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </div>{" "}
          {/* <span>
            | Go to page:{' '}
            <input
              type="number"
              value={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '50px' }}
            />
          </span>{' '} */}
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
