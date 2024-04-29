// import React, { useState } from 'react';
// import TreeSelect from 'react-tree-select';
// // import 'react-tree-select/dist/styles.css';

// const data = [
//   {
//     label: 'Node 1',
//     value: '1',
//     checked: false,
//     children: [
//       {
//         label: 'Node 1.1',
//         value: '1.1',
//         checked: false,
//         children: [
//           { label: 'Node 1.1.1', value: '1.1.1', checked: false },
//           { label: 'Node 1.1.2', value: '1.1.2', checked: false },
//         ],
//       },
//       {
//         label: 'Node 1.2',
//         value: '1.2',
//         checked: false,
//         children: [
//           { label: 'Node 1.2.1', value: '1.2.1', checked: false },
//           { label: 'Node 1.2.2', value: '1.2.2', checked: false },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'Node 2',
//     value: '2',
//     checked: false,
//     children: [
//       {
//         label: 'Node 2.1',
//         value: '2.1',
//         checked: false,
//         children: [
//           { label: 'Node 2.1.1', value: '2.1.1', checked: false },
//           { label: 'Node 2.1.2', value: '2.1.2', checked: false },
//         ],
//       },
//       {
//         label: 'Node 2.2',
//         value: '2.2',
//         checked: false,
//         children: [
//           { label: 'Node 2.2.1', value: '2.2.1', checked: false },
//           { label: 'Node 2.2.2', value: '2.2.2', checked: false },
//         ],
//       },
//     ],
//   },
// ];

// const Dropdown2 = () => {
//   const [selectedValues, setSelectedValues] = useState([]);

//   const onChange = (values) => {
//     setSelectedValues(values);
//   };

//   return (
//     <div>
//       <h2>React Tree Select</h2>
//       <TreeSelect
//         data={data}
//         value={selectedValues}
//         onChange={onChange}
//         multiple
//         showCheckbox
//       />
//       <div>
//         <h3>Selected Values:</h3>
//         <ul>
//           {selectedValues.map((value) => (
//             <li key={value}>{value}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dropdown2;

// import React from "react";
// import DropdownTreeSelect from "react-dropdown-tree-select";
// import "react-dropdown-tree-select/dist/styles.css";
// import Profile from "../../Assets/Profile.svg";

// const data = [
//   {
//     label: "Rajapalayam",
//     children: [
//       { label: "Ponbaskar", value: "ponbaskar" },
//       { label: "Baskar", value: "baskar" },
//     ],
//   },
//   {
//     label: "Chennai",
//     children: [
//       { label: "Raju", value: "raju" },
//       { label: "Rithvik", value: "rithvik" },
//     ],
//   },
// ];

// export default function Dropdown2() {
//   return (
//     <>
//       <DropdownTreeSelect data={data} />
//     </>
//   );
// }

import React, { useState } from "react";
import Select from "react-select";

const data = [
  {
    rname: "Chennai",
    rid: "CH001",
    surveyors: [
      {
        sid: "CHS000",
        label: 'Ponbaskar',
        sname: "ponbaskar",
      },
      {
        sid: "CHS001",
        label: 'Raju bhai',
        sname: "raju bhai",
      },
    ],
  },
  {
    rname: "Madurai",
    rid: "MD002",
    surveyors: [
      {
        sid: "MDS000",
        label: 'Baskar',
        sname: "baskar",
      },
      {
        sid: "MDS001",
        label: 'Rithivik',
        sname: "Rithvik",
      },
    ],
  },
];

export default function Dropdown2() {
  const [region, setRegion] = useState(null);
  const [surveyors, setSurveyors] = useState(null);
  const [surveyorList, setSurveyorList] = useState([]);

  const handleRegionChange = (obj) => {
    setRegion(obj);
    setSurveyorList(obj.surveyors);
  };

    const handleSurveyorChange = (obj) => {
      setSurveyors(obj);
    }

  return (
    <div>
      <Select
        placeholder="Select Region"
        value={region}
        options={data}
        onChange={handleRegionChange}
        getOptionLabel={(x) => x.rname}
        getOptionValue={(x) => x.rid}
      />
      <br></br>
      <Select
        placeholder="Select Surveyors"
        isMulti
        value={surveyors}
        options={surveyorList}
        onChange={handleSurveyorChange}
        getOptionLabel={(x) => x.label}
        getOptionValue={(x) => x.sname}
      />
    </div>
  );
}
