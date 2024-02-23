// import React, { useState } from "react";
// import { useTable } from "react-table";
// import Papa from "papaparse";
// // import Sample from '../../data/sample_data.csv';

// const TaskNextPage = () => {
//   const [data, setData] = React.useState([]);
//   const [columns, setColumns] = React.useState([]);
//   const [csvFile, setCsvFile] = useState("");

//   React.useEffect(() => {
//     Papa.parse(
//       csvFile,
//       {
//         header: true,
//         dynamicTyping: true,
//         complete: (result) => {
//           setColumns(
//             result.meta.fields.map((field) => ({
//               Header: field,
//               accessor: field,
//             }))
//           );
//           setData(result.data);
//         },
//       }
//     );
//   }, []);

//   console.log(data);
//   console.log(csvFile);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   return (
//     <div
//       style={{
//         marginLeft: "5rem",
//       }}
//     >
//       <input type="file" onChange={(e) => setCsvFile(e.target.files[0])} />
//       <table {...getTableProps()} className="react-table">
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskNextPage;

import React from "react";
import { useState } from "react";
import * as xlsx from "xlsx";
import { useTable } from "react-table";
import { SlOptionsVertical } from "react-icons/sl";
import "../../Styles/Task/TaskNextPage.css";
import SurveyorShowProfile from "./SurveyorShowProfile";

// console.log(data);

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
// import { makeStyles } from "'@material-ui/core"; 
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function CreateTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <table
      {...getTableProps()}
      style={{
        width: "100%",
        borderLeft: "1px solid rgba(219, 219, 219, 1)",
      }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderTop: "1px solid rgba(219, 219, 219, 1)",
                  borderRight: "1px solid rgba(219, 219, 219, 1)",
                  padding: "1rem",
                  backgroundColor: "rgba(27, 36, 54, 1)",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    // padding: "1rem",
                    fontFamily: "EuclidMedium",
                    backgroundColor:
                      index === 0
                        ? "rgba(27, 36, 54, 1)"
                        : cell.value === ""
                        ? "rgba(246, 75, 60, 0.08)"
                        : "inherit",
                    color: index === 0 ? "#fff" : "inherit",
                    borderRight: "1px solid rgba(219, 219, 219, 1)",
                    borderBottom: "1px solid rgba(219, 219, 219, 1)",
                    textAlign:
                      index === 6 || index === 0 ? "center" : "inherit",
                  }}
                >
                  {cell.column.id === "optionsColumn" ? (
                    <SlOptionsVertical color="rgba(132, 147, 178, 1)" />
                  ) : cell.value === "" ? (
                    "---"
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
  );
}


// const usestyles = makeStyles({
//   customwidth: {
//       '& div': {
//           width: '350px',
//       }
//   }
// });

export default function TaskNextPage({ selectedFile }) {
  const [files, setFiles] = useState("");
  const [data, setData] = useState([]);
  console.log(selectedFile);

  const columns = [
    {
      Header: "",
      accessor: "id",
    },
    {
      Header: "Farmer name",
      accessor: "farmerName",
    },
    {
      Header: "Mobile number",
      accessor: "mobileNumber",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Region",
      accessor: "region",
    },
    {
      Header: "Assigned to",
      accessor: "assignedTo",
      id: "assign",
      Cell: ({ cell: { value, row } }) => (
        <ProfileCell
          avatar={row.original.avatar}
          username={value}
          completedTasks={row.original.completedTasks}
          assignedTasks={row.original.assignedTasks}
          phno={row.original.phno}
          sid={row.original.sid}
        />
      ),
    },
    {
      Header: "",
      accessor: "options",
      id: "optionsColumn",
    },
  ];

  const ProfileCell = ({
    avatar,
    username,
    completedTasks,
    assignedTasks,
    sid,
    phno,
  }) => {
    const [showInfo, setShowInfo] = useState(false);
    const toggleInfo = () => {
      setShowInfo(!showInfo);
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={toggleInfo}
      >
        <img
          src={avatar}
          alt="Profile"
          style={{
            borderRadius: "50%",
            marginRight: "8px",
            width: "2.5rem",
            height: "2.5rem",
            objectFit: "cover",
          }}
        />
        <span>{username}</span>
        {showInfo && (
          <div className="show-profile-info">
            <div className="show-profile-active">Active</div>
            <div className="show-profile-img-box">
              <img src={avatar} />
            </div>
            <div className="show-profile-name">{username}</div>
            <div className="show-profile-ph">+91 {phno}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "1rem",
                color: "rgba(132, 147, 178, 1)",
              }}
            >
              <div>Surveyor</div>
              <div>ID:{sid}</div>
            </div>
            {/* task details */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "1rem",
              }}
            >
              <div className="show-profile-task">
                Completed tasks:{completedTasks}
              </div>
              <div className="show-profile-task">
                Assigned tasks:{assignedTasks}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "rgba(213, 232, 255, 1)",
              }}
            ></div>
            <div className="task-view-profile">View Profile</div>
          </div>
        )}
      </div>
    );
  };

  // console.log(data[0]);

  // const importCsv = (e) => {
  //   e.preventDefault();
  //   if (e.target.files) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const data = e.target.result;
  //       const workbook = xlsx.read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const json = xlsx.utils.sheet_to_json(worksheet);
  //       console.log("next page", json);
  //       setData(json);
  //     };
  //     reader.readAsArrayBuffer(e.target.files[0]);
  //   }
  // };

  // const ProfileCell = ({
  //   username,
  //   phno,
  //   avatar,
  //   completedTasks,
  //   assignedTasks,
  //   sid,
  // }) => {
  //   const [anchorEl, setAnchorEl] = useState(null);

  //   const open = Boolean(anchorEl);
  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  //   // const classes = usestyles();

  //   return (
  //     <React.Fragment>
  //       <Box
  //         sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
  //       >
  //         <Tooltip title="Account settings">
  //           {/* <IconButton
  //             onClick={handleClick}
  //             size="small"
  //             sx={{}}
  //             aria-controls={open ? "account-menu" : undefined}
  //             aria-haspopup="true"
  //             aria-expanded={open ? "true" : undefined}
  //           >
  //             <SlOptionsVertical color="rgba(132, 147, 178, 1)" />
  //           </IconButton> */}
  //           <img
  //             onClick={handleClick}
  //             src={avatar}
  //             alt="Profile"
  //             style={{
  //               borderRadius: "50%",
  //               marginRight: "8px",
  //               width: "2.5rem",
  //               height: "2.5rem",
  //               objectFit: "cover",
  //             }}
  //           />
  //           <span>{username}</span>
  //         </Tooltip>
  //       </Box>
  //       <Menu
  //         anchorEl={anchorEl}
  //         id="account-menu"
  //         open={open}
  //         onClose={handleClose}
  //         onClick={handleClose}
  //         // slotProps={{
  //         //   paper: {
  //         //     sx: {
  //         //       width: "25%"
  //         //     }
  //         //   }
  //         // }}

  //         // className={classes.customwidth}
  //         PaperProps={{
  //           // style:{
  //           //   width: '300px',
  //           //   height: '300px',
  //           //   backgroundColor: 'pink'
  //           // },
  //           elevation: 0,
  //           sx: {
  //             overflow: "visible",
  //             boxShadow: "0px 4px 32px 0px rgba(61, 70, 112, 0.14)",
  //             mt: 1.5,
  //             "& .MuiAvatar-root": {
  //               width: 32,
  //               height: 32,
  //               ml: -0.5,
  //               mr: 2,
  //             },
  //           },
  //         }}
  //         transformOrigin={{ horizontal: "left", vertical: "top" }}
  //         anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
  //       >
  //         <div className="show-profile-info">
  //           <div className="show-profile-active">Active</div>
  //           <div className="show-profile-img-box">
  //             <img src={avatar} />
  //           </div>
  //           <div className="show-profile-name">{username}</div>
  //           <div className="show-profile-ph">+91 {phno}</div>
  //           <div
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               columnGap: "1rem",
  //               color: "rgba(132, 147, 178, 1)",
  //             }}
  //           >
  //             <div>Surveyor</div>
  //             <div>ID:{sid}</div>
  //           </div>
  //           {/* task details */}
  //           <div
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               columnGap: "1rem",
  //             }}
  //           >
  //             <div className="show-profile-task">
  //               Completed tasks:{completedTasks}
  //             </div>
  //             <div className="show-profile-task">
  //               Assigned tasks:{assignedTasks}
  //             </div>
  //           </div>

  //           <div
  //             style={{
  //               width: "100%",
  //               height: "1px",
  //               backgroundColor: "rgba(213, 232, 255, 1)",
  //             }}
  //           ></div>
  //           <div className="task-view-profile">View Profile</div>
  //         </div>
  //       </Menu>
  //     </React.Fragment>
  //   );
  // };

  const csvData = [
    {
      id: 1,
      sid: 123456,
      farmerName: "Robb stark",
      mobileNumber: "9876543210",
      address: "winterfell",
      region: "north",
      assignedTo: "Jon snow",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png",
    },
    {
      id: 2,
      sid: 234567,
      farmerName: "Jon snow",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "north",
      assignedTo: "Robb Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/c/ce/Robb_Stark-Richard_Madden.jpg",
    },
    {
      id: 3,
      sid: 345678,
      farmerName: "Jon snow",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "north",
      assignedTo: "Nedd Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/5/52/Ned_Stark-Sean_Bean.jpg",
    },
    {
      id: 4,
      sid: 456789,
      farmerName: "Jon snow",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "North",
      assignedTo: "Arya Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/3/39/Arya_Stark-Maisie_Williams.jpg",
    },
    {
      id: 5,
      sid: 567890,
      farmerName: "Arya stark",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "North",
      assignedTo: "Sansa Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg",
    },
    {
      id: 6,
      sid: 667890,
      farmerName: "Arya stark",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "North",
      assignedTo: "Sansa Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg",
    },
    {
      id: 7,
      sid: 767890,
      farmerName: "Arya stark",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "North",
      assignedTo: "Sansa Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg",
    },
    {
      id: 8,
      sid: 867890,
      farmerName: "Arya stark",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "North",
      assignedTo: "Sansa Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg",
    },
    {
      id: 9,
      sid: 967890,
      farmerName: "Arya stark",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "North",
      assignedTo: "Sansa Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg",
    },
    {
      id: 10,
      sid: 106789,
      farmerName: "Arya stark",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "North",
      assignedTo: "Sansa Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg",
    },
    {
      id: 11,
      sid: 116789,
      farmerName: "Arya stark",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "North",
      assignedTo: "Sansa Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg",
    },
    {
      id: 12,
      sid: 126789,
      farmerName: "Arya stark",
      mobileNumber: "9876543210",
      address: "Winter fell",
      region: "North",
      assignedTo: "Sansa Stark",
      completedTasks: 100,
      assignedTasks: 150,
      phno: 9876543210,
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg",
    },
  ];

  const [showErrBanner, setShowErrBanner] = useState(false);

  return (
    <div className="excel-view">
      {/* table */}

      <div className="excel-view-inner-layer">
        {showErrBanner && (
          <div className="excel-view-err-banner">
            Please check whether everything is assigned before creating task
          </div>
        )}
        <div
          className="csv-table"
          style={{
            overflowY: "scroll",
          }}
        >
          <CreateTable columns={columns} data={csvData} />
        </div>
        <div className="task-next-page-bottom">
          <div className="advanced-options-right">
            <div className="advanced-cancel-btn">Back</div>
            <div
              className="advanced-next-btn"
              // onClick={() => navigate("/create-task/excel-view")}
            >
              Create Task
            </div>
          </div>
        </div>
      </div>
      {/* <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
}
