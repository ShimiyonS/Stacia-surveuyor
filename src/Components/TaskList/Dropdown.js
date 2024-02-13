// import React, { useState } from "react";

// const Dropdown = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const options = [
//     {
//       category: "Fruits",
//       subcategories: ["Apple", "Banana", "Orange"],
//     },
//     {
//       category: "Vegetables",
//       subcategories: ["Carrot", "Broccoli", "Spinach"],
//     },
//     {
//       category: "Dairy",
//       subcategories: ["Milk", "Cheese", "Yogurt"],
//     },
//   ];

//   const handleCheckboxChange = (category, subcategory) => {
//     const isSelected = selectedOptions.includes(`${category}-${subcategory}`);

//     if (isSelected) {
//       setSelectedOptions(
//         selectedOptions.filter(
//           (option) => option !== `${category}-${subcategory}`
//         )
//       );
//     } else {
//       setSelectedOptions([...selectedOptions, `${category}-${subcategory}`]);
//     }
//   };

//   return (
//     <div>
//       <h2>Select Options</h2>
//       {options.map((categoryObj) => (
//         <div key={categoryObj.category}>
//           <strong>{categoryObj.category}</strong>
//           {categoryObj.subcategories.map((subcategory) => (
//             <div key={subcategory}>
//               <input
//                 type="checkbox"
//                 id={`${categoryObj.category}-${subcategory}`}
//                 checked={selectedOptions.includes(
//                   `${categoryObj.category}-${subcategory}`
//                 )}
//                 onChange={() =>
//                   handleCheckboxChange(categoryObj.category, subcategory)
//                 }
//               />
//               <label htmlFor={`${categoryObj.category}-${subcategory}`}>
//                 {subcategory}
//               </label>
//             </div>
//           ))}
//         </div>
//       ))}
//       <div>
//         <h3>Selected Options:</h3>
//         <ul>
//           {selectedOptions.map((selectedOption) => (
//             <li key={selectedOption}>{selectedOption}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dropdown;


// import React, { useState } from 'react';
// import Select from 'react-select';

// const options = [
//   {
//     label: 'Category 1',
//     options: [
//       { label: 'Subcategory 1.1', value: 'subcat1.1' },
//       { label: 'Subcategory 1.2', value: 'subcat1.2' },
//       { label: 'Subcategory 1.3', value: 'subcat1.3' },
//       { label: 'Subcategory 1.4', value: 'subcat1.4' },
//     ],
//   },
//   {
//     label: 'Category 2',
//     options: [
//       { label: 'Subcategory 2.1', value: 'subcat2.1' },
//       { label: 'Subcategory 2.2', value: 'subcat2.2' },
//       { label: 'Subcategory 2.3', value: 'subcat2.3' },
//       { label: 'Subcategory 2.4', value: 'subcat2.4' },
//       { label: 'Subcategory 2.5', value: 'subcat2.5' },
//       { label: 'Subcategory 2.6', value: 'subcat2.6' },
//       { label: 'Subcategory 2.7', value: 'subcat2.7' },
//     ],
//   },
// ];

// const Dropdown = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleChange = (selected) => {
//     setSelectedOptions(selected);
//   };

//   return (
//     <Select
//       options={options}
//       isMulti
//       value={selectedOptions}
//       onChange={handleChange}
//       components={{
//         Option: CustomOpreaction,
//         Menu: CustomMenu,
//       }}
//     />
//   );
// };

// // Custom Option component to include a scrollbar
// const CustomOption = ({ innerProps, label }) => (
//   <div {...innerProps} style={{ maxHeight: '50px', overflowY: 'auto' }}>
//     {label}
//   </div>
// );

// // Custom Menu component to include checkboxes
// const CustomMenu = ({ innerProps, children }) => (
//   <div {...innerProps} style={{ maxHeight: '200px', overflowY: 'auto' }}>
//     {children}
//   </div>
// );

// export default Dropdown;


// import React, { useState } from 'react';
// import Select from 'react-select';

// const options = [
//   {
//     label: 'Category 1',
//     options: [
//       { label: 'Subcategory 1.1', value: 'subcategory1.1' },
//       { label: 'Subcategory 1.2', value: 'subcategory1.2' },
//     ],
//   },
//   {
//     label: 'Category 2',
//     options: [
//       { label: 'Subcategory 2.1', value: 'subcategory2.1' },
//       { label: 'Subcategory 2.2', value: 'subcategory2.2' },
//     ],
//   },
//   {
//     label: 'Category 3',
//     options: [
//       { label: 'Subcategory 3.1', value: 'subcategory3.1' },
//       { label: 'Subcategory 3.2', value: 'subcategory3.2' },
//     ],
//   },
// ];

// const Dropdown = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleChange = (selected) => {
//     setSelectedOptions(selected);
//   };

//   return (
//     <Select
//       options={options}
//       value={selectedOptions}
//       onChange={handleChange}
//       isMulti
//       isSearchable
//       placeholder="Select categories..."
//     />
//   );
// };

// export default Dropdown;

import React, { useState } from 'react';
import 'react-dropdown-tree-select/dist/styles.css';
import DropdownTreeSelect from 'react-dropdown-tree-select';

const data = [
  {
    label: 'Node 1',
    value: '1',
    checked: false,
    children: [
      {
        label: 'Node 1.1',
        value: '1.1',
        checked: false,
        children: [
          { label: 'Node 1.1.1', value: '1.1.1', checked: false },
          { label: 'Node 1.1.2', value: '1.1.2', checked: false },
        ],
      },
      {
        label: 'Node 1.2',
        value: '1.2',
        checked: false,
        children: [
          { label: 'Node 1.2.1', value: '1.2.1', checked: false },
          { label: 'Node 1.2.2', value: '1.2.2', checked: false },
        ],
      },
    ],
  },
  {
    label: 'Node 2',
    value: '2',
    checked: false,
    children: [
      {
        label: 'Node 2.1',
        value: '2.1',
        checked: false,
        children: [
          { label: 'Node 2.1.1', value: '2.1.1', checked: false },
          { label: 'Node 2.1.2', value: '2.1.2', checked: false },
        ],
      },
      {
        label: 'Node 2.2',
        value: '2.2',
        checked: false,
        children: [
          { label: 'Node 2.2.1', value: '2.2.1', checked: false },
          { label: 'Node 2.2.2', value: '2.2.2', checked: false },
        ],
      },
    ],
  },
];

const Dropdown = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const onChange = (currentNode, selectedNodes) => {
    // Update the 'checked' property in the data based on the selected nodes
    const updatedData = data.map((item) => {
      const node = selectedNodes.find((selectedNode) => selectedNode.value === item.value);
      return { ...item, checked: node ? node.checked : false };
    });

    setSelectedValues(selectedNodes.map((node) => node.value));
  };

  return (
    <div>
      <h2>React Dropdown Tree Select</h2>
      <DropdownTreeSelect
        data={data}
        onChange={onChange}
        texts={{ placeholder: 'Select nodes' }}
        showDropdown="always"
        keepTreeOnSearch
        inlineSearchInput
        mode="multiSelect"
        selectAt={0}
        showPartiallySelected
        simpleSelect
        className="dropdown-tree-select"
        checkboxes
      />
      <div>
        <h3>Selected Values:</h3>
        <ul>
          {selectedValues.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;









