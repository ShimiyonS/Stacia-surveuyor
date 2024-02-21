// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";

// const columns = [
//   { field: "id", headerName: "ID", flex: 1 },
//   { field: "task", headerName: "Task", flex: 1 },
//   { field: "assignedby", headerName: "Assigned By", flex: 1 },
//   {
//     field: "location",
//     headerName: "Location",
//     // type: 'number',
//     flex: 1,
//   },
//   {
//     field: "duedate",
//     headerName: "Due Date",
//     // description: "This column has a value getter and is not sortable.",
//     // sortable: false,
//     flex: 1,
//     // valueGetter: (params) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
//   { field: "status", headerName: "Status", flex: 1 },

// ];

// const rows = [
//   { id: 1123456, task: "Surveyor task", assignedby: "Jon snow", location: "winter fell", duedate: '13/02/2024', status: 'Completed' },
//   { id: 1123457, task: "Surveyor task", assignedby: "Arya stark", location: "winter fell", duedate: '14/02/2024', status: 'Completed' },
//   { id: 1123458, task: "Surveyor task", assignedby: "Sansa stark", location: "winter fell", duedate: '11/02/2024', status: 'Completed' },
//   { id: 1123459, task: "Surveyor task", assignedby: "Tyrion lannister", location: "kings land", duedate: '17/02/2024', status: 'Completed' },
//   { id: 1123460, task: "Surveyor task", assignedby: "Kingslayer", location: "kings land", duedate: '24/02/2024', status: 'Completed' },
// ];

// export default function NewTable() {
//   return (
//     <div style={{  width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//     </div>
//   );
// }

// import React, { useState } from "react";

// const data = [
//   {
//     label: "chennai",
//     labelId: 1,
//     value: "c",
//     children: [
//       {
//         label: "Ponbaskar",
//         value: "ponbaskar",
//       },
//       {
//         label: "Ramasamy",
//         value: "ramasamy",
//       },
//     ],
//   },
//   {
//     label: "madurai",
//     labelId: 2,
//     value: "m",
//     children: [
//       {
//         label: "baskar",
//         value: "baskar",
//       },
//     ],
//   },
//   {
//     label: "chengalpet",
//     labelId: 3,
//     value: "c",
//     children: [
//       {
//         label: "Ratheesh",
//         value: "ratheesh",
//       },
//       {
//         label: "Rithvik",
//         value: "rithvik",
//       },
//       {
//         label: "Raja",
//         value: "raja",
//       },
//     ],
//   },
//   {
//     label: "virudhunagar",
//     labelId: 4,
//     value: "v",
//     children: [
//       {
//         label: "Raja",
//         value: "raja",
//       },
//       {
//         label: "Ratheesh",
//         value: "ratheesh",
//       },
//       {
//         label: "Rithvik",
//         value: "rithvik",
//       },
//       {
//         label: "Raja",
//         value: "raja",
//       },
//     ],
//   },
// ];

// export default function NewTable() {
//   const [selectSurveyors, setSelectSurveyors] = useState([]);
//   const [selectAllSurveyors, setSelectAllSurveyors] = useState([]);
//   const [isPopoverVisible, setPopoverVisible] = useState(false);

//   // remove duplicates array of an array state
//   const [removeDuplicateArr, setRemoveDuplicateArr] = useState([]);

//   // a-z arr
//   const azArr = [];

//   // sort arr based on a-z letters
//   const [sortArr, setSortArr] = useState([]);

//   const handleSelectSurveyors = (surveyor) => {
//     setSelectSurveyors([...selectSurveyors, surveyor]);
//   };

//   const handleSelectAllUsers = (surveyors) => {
//     setSelectAllSurveyors([...selectAllSurveyors, surveyors]);
//   };

//   const removeDuplicates = () => {
//     let strArr = selectAllSurveyors.map(JSON.stringify);
//     let uniqueStrArr = new Set(strArr);
//     let uniqueArr = Array.from(uniqueStrArr, JSON.parse);
//     setRemoveDuplicateArr(...removeDuplicateArr, uniqueArr);
//     console.log("unique", uniqueArr);
//     console.log(azArr);
//   };

//   for (let i = 97; i <= 122; i++) {
//     azArr.push(String.fromCharCode(i));
//   }

//   const handleSort = (letter) => {
//     const sortedData = data.filter(({ value }) => {
//       return value === letter;
//     });
//     setSortArr(sortedData);
//   };

//   const handlePopoverToggle = () => {
//     setPopoverVisible(!isPopoverVisible);
//   };

//   // console.log(
//   //   "find",
//   //   data.filter(({ value }) => {
//   //     return value != "c";
//   //   })
//   // );

//   console.log("users", selectSurveyors);
//   console.log("all users", selectAllSurveyors);

//   return (
//     <div>
//       {sortArr.map((data) => (
//         <div>
//           <div style={{ color: "red" }}>
//             {data.label}
//             <span onClick={() => handleSelectAllUsers(data.children)}>
//               Select
//             </span>
//           </div>
//           {data.children.map((child) => (
//             <div
//               style={{
//                 padding: "1rem",
//                 cursor: "pointer",
//               }}
//               onClick={() => handleSelectAllUsers(child)} // handleSelectSurveyors
//             >
//               {child.label}
//             </div>
//           ))}
//         </div>
//       ))}
//       <button onClick={removeDuplicates}>Click</button>
//       <br></br>
//       {azArr.map((letter) => (
//         <button
//           onClick={() => handleSort(letter)}
//           style={{
//             padding: "0.8rem",
//             width: "5rem",
//             margin: "0.5rem",
//           }}
//         >
//           {letter}
//         </button>
//       ))}

//       <div className="popover-container">
//         <button onClick={handlePopoverToggle}>Toggle Popover</button>
//         {isPopoverVisible && (
//           <div className="popover-content">
//             {/* Popover content goes here */}
//             This is the popover content.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// CsvTable.js
import React, { useState } from 'react';
import Papa from 'papaparse';

const NewTable = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
      header: true, 
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            {csvData.length > 0 &&
              Object.keys(csvData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewTable;
