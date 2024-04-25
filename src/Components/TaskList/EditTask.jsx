import React, { useContext, useEffect, useState } from "react";
import "../../Styles/Task/TaskCreate.css";
import { TreeSelect } from "antd";
import DropdownTreeSelect from "react-dropdown-tree-select";
import TaskCreate from "./TaskCreate";
import { Field, useFormik } from "formik";
import { CiCircleInfo } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";
import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Csvfile from "../../Assets/CSVfile.svg";
import BroadcastTask from "../../Assets/BroadcastTask.svg";
import { FaRegFileAlt } from "react-icons/fa";

import DatePicker from "react-mobile-datepicker";
import AttachFile from "../../Assets/AddFiles.svg";
import { IoLocationOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import * as xlsx from "xlsx";
import { Range } from "react-range";
import { PageContext } from "../../Context/PageContext";
import SurveyorSelectTemplate from "./SurveyorSelectTemplate";
import SurveyorTemplate from "./SurveyorTemplate";
import { surveyorData } from "../../data/SurveyorData";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import EditSurveyorTemplate from "./EditSurveyorTemplate";


const { SHOW_PARENT } = TreeSelect;
const treeData = [
    {
        title: "Chennai",
        value: "0-0",
        key: "0-0",
        children: [
            {
                title: "Baskar",
                value: "0-0-0",
                key: "0-0-0",
            },
        ],
    },
    {
        title: "Madurai",
        value: "0-1",
        key: "0-1",
        children: [
            {
                title: "Arun prakesh",
                value: "0-1-0",
                key: "0-1-0",
            },
            {
                title: "Dinesh kumar",
                value: "0-1-1",
                key: "0-1-1",
            },
            {
                title: "Abram Stanton",
                value: "0-1-2",
                key: "0-1-2",
            },
        ],
    },
];

const CustomDropdownOption = ({ innerProps, label, data }) => (
    <div {...innerProps} style={{ display: "flex", alignItems: "center" }}>
        <img
            src={data.imgSrc}
            alt={label}
            style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginRight: "10px",
            }}
        />
        {label}
    </div>
);

export default function EditTask({ onFileChange }) {
    const [value, setValue] = useState(["0-0-0"]);
    const [selectAllSurveyors, setSelectAllSurveyors] = useState([]);
    const [removeDuplicateArr, setRemoveDuplicateArr] = useState([]);
    const [sortArr, setSortArr] = useState([]);

    const {
        taskDuedate,
        setTaskDuedate,
        setTaskname,
        taskName,
        setTaskName,
        desc,
        setDesc,
        region,
        setRegion,
        taskDue,
        setTaskDue,
        dueStart,
        setDueStart,
        dueEnd,
        setDueEnd,
        surveyLimit,
        setSurveyLimit,
        surveyRadius,
        setSurveyRadius,
        bulkRes,
        setBulkRes,
        selectedSurveyors,
        selectSurveyorInCreateTask,
        setSelectedSurveyorInCreateTask,
    } = useContext(PageContext);

    // send excel file to excel view page
    const [sendFiles, setSendFiles] = useState([]);
    const [excelFile, setExcelFile] = useState(null);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);

    const userProfiles = [
        {
            label: "Chennai",
            value: "chennai",
            children: [
                {
                    label: "User 1",
                    value: "user1",
                    imgSrc:
                        "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
                },
                {
                    label: "User 2",
                    value: "user2",
                    imgSrc:
                        "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
                },
            ],
        },
        {
            label: "Madurai",
            value: "madurai",
            children: [
                {
                    label: "User 3",
                    value: "user3",
                    imgSrc:
                        "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
                },
                {
                    label: "User 4",
                    value: "user4",
                    imgSrc:
                        "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
                },
            ],
        },
    ];
    const params = useParams();

    ////////////////////////////////////////

    const handleToggle = (id) => {
        surveyorData.map(({ labelId, children }) => {
            if (labelId === id) {
                children.map(({ sid }) => testArr.push(sid));
            }
        });
        setTestArr2([...testArr2, testArr]);
        console.log("////////////////", testArr2, "///////////////");
        // if (selectedAllUsers.includes(id)) {
        //   setSelectedAllUsers(selectedAllUsers.filter((i) => i !== id));
        // } else {
        //   setSelectedAllUsers([...selectedAllUsers, id]);
        // }
    };

    ////////////////////////////////////////

    // const handleSelectAllUsers = (surveyors) => {
    //   setSelectAllSurveyors([...selectAllSurveyors, surveyors]);
    // };

    // console.log(selectAllSurveyors);

    const removeDuplicates = () => {
        let strArr = selectAllSurveyors.map(JSON.stringify);
        let uniqueStrArr = new Set(strArr);
        let uniqueArr = Array.from(uniqueStrArr, JSON.parse);
        setRemoveDuplicateArr(...removeDuplicateArr, uniqueArr);
        console.log("unique", uniqueArr);
        // console.log(azArr);
    };

    const handleSort = (letter) => {
        setSelectedLetter(letter);
        const sortedData = surveyorData.filter(({ value }) => {
            return value === letter;
        });
        setSortArr(sortedData);
    };

    const regions = [
        { value: "chennai", label: "Chennai" },
        { value: "ariyalur", label: "Ariyalur" },
        { value: "chengalpattu", label: "Chengalpattu" },
        { value: "kanchipuram", label: "Kanchipuram" },
        { value: "madurai", label: "Madurai" },
        { value: "rajapalayam", label: "Rajapalayam" },
        { value: "thirunelveli", label: "Thirunelveli" },
        { value: "paramakudi", label: "Paramakudi" },
        { value: "virudhunagar", label: "Virudhunagar" },
    ];

    const surveyors = [
        { value: "10", label: "10 Surveys" },
        { value: "20", label: "20 Surveys" },
        { value: "30", label: "30 Surveys" },
        { value: "40", label: "40 Surveys" },
    ];

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectRegions, setSelectRegions] = useState(null);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [regionMenuOpen, setRegionMenuOpen] = useState(false);
    const [isPopoverVisible, setPopoverVisible] = useState(false);
    const [isPopoverVisible1, setPopoverVisible1] = useState(false);

    const [testArr2, setTestArr2] = useState([]);

    const testArr = [];

    // a-z arr
    const azArr = [];
    const [selectedLetter, setSelectedLetter] = useState("");

    const [selectedDate, setSelectedDate] = useState(null);

    const [time, setTime] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    // start task date state
    const [startDate, setStartDate] = useState(new Date());
    const [isOpenStartDate, setIsOpenStartDate] = useState(false);

    // finish task date state
    const [endDate, setEndDate] = useState(new Date());
    const [isOpenFinishDate, setIsOpenFinishDate] = useState(false);

    const [showAdvanceOptions, setShowAdvanceOptions] = useState(true);

    const [showShareOptions, setShowShareOptions] = useState(false);

    // radius

    const [radius, setRadius] = useState("10");

    // limit

    const [limit, setLimit] = useState("10");

    // csv upload modal state
    const [openCsvModal, setOpenCsvModal] = useState(false);
    const [csvFiles, setCsvFiles] = useState([]);
    const [csvFiles1, setCsvFiles1] = useState([]);
    // region menu open close

    const [createTaskModal, setCreateTaskModal] = useState(false);

    // edit 

    const [editTaskname, setEditTaskname] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [editSurveyor, setEditSurveyor] = useState('');
    const [editRegion, setEditRegion] = useState('');
    const [editDuedate, setEditDuedate] = useState('');

    const handleChange = (selectedOption) => {
        const flattenedSelectedOptions = selectedOption.flatMap((option) =>
            option.options
                ? option.options.map((childOption) => childOption.value)
                : option.value
        );

        const selectedUserProfiles = userProfiles
            .filter((region) => flattenedSelectedOptions.includes(region.value))
            .flatMap((region) =>
                region.children
                    ? region.children.map((user) => ({
                        label: user.label,
                        value: user.value,
                        imgSrc: user.imgSrc,
                    }))
                    : [
                        {
                            label: region.label,
                            value: region.value,
                            imgSrc: region.imgSrc,
                        },
                    ]
            );

        setSelectedUsers(selectedUserProfiles);
        setMenuIsOpen(true);
    };

    const onChange = (newValue) => {
        setValue(newValue);
    };

    const handleMenuOpen = () => {
        setMenuIsOpen(true);
    };

    const handleMenuClose = () => {
        setMenuIsOpen(false);
    };

    const handleMenuOpen1 = () => {
        setRegionMenuOpen(true);
    };

    const handleMenuClose1 = () => {
        setRegionMenuOpen(false);
    };

    const handleClick = () => {
        setIsOpen(true);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleSelect = (time) => {
        const due = moment(time).format('YYYY-MM-DD');
        setTaskDuedate(time);
        setTaskDue(time);
        setTime(time);
        setEditDuedate(due);
        setIsOpen(false);
    };

    console.log("edit due", editDuedate);


    const testMonth = "4";

    // region menu open and close

    const handleRegionMenuClose = () => {
        setRegionMenuOpen(true);
    };

    // start date

    const handleTaskStartDate = (startDate) => {
        setStartDate(startDate);
        setIsOpenStartDate(false);
        console.log("start date", startDate);
    };

    // finish date

    const handleTaskFinishDate = (finishDate) => {
        setEndDate(finishDate);
        setIsOpenFinishDate(false);
        console.log("start date", finishDate);
    };

    // const formatOptions = (options) => {
    //   return options.map((option) => {
    //     if (option.children) {
    //       return {
    //         label: option.label,
    //         options: formatOptions(option.children),
    //       };
    //     } else {
    //       return {
    //         label: option.label,
    //         value: option.value,
    //         imgSrc: option.imgSrc,
    //       };
    //     }
    //   });
    // };

    // handlFileSelect

    const handleFileSelect = (e) => {
        e.preventDefault();
        setExcelFile(e.target.files[0]);
        setCsvFiles1([...csvFiles1, e.target.files[0]]);
        console.log("target file......", e.target.files[0]);
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                console.log(json);
                onFileChange(json);
                setSendFiles(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    const customStyles1 = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            width: "30%",
            height: "25%",
            borderRadius: "16px",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2rem",
        },
        overlay: {
            background: "rgba(0, 0, 0, 0.25)",
            zIndex: "999",
        },
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: "10px",
            backgroundColor: state.isSelected ? "rgba(27, 81, 187, 0.1)" : "white",
            color: "#8493B2",
        }),
        menu: (provided) => ({
            ...provided,
            boxShadow: "0px 4px 32px 0px rgba(61, 70, 112, 0.14)",
            borderRadius: "0.5rem",
            padding: "1rem",
            backgroundColor: "#fff",
        }),
    };

    const regionSelectCustomStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: "0.8rem",
            borderRadius: "0.2rem",
            backgroundColor: state.isSelected ? "rgba(27, 81, 187, 0.1)" : "white",
            color: "#8493B2",
            cursor: "pointer",
            ":hover": {
                backgroundColor: "rgba(27, 81, 187, 0.1)",
            },
        }),
        menu: (provided) => ({
            ...provided,
            boxShadow: "0px 4px 32px 0px rgba(61, 70, 112, 0.14)",
            borderRadius: "0.5rem",
            padding: "1rem",
            backgroundColor: "#fff",
            width: "70%",
            marginLeft: "30%",
        }),
    };

    const customCsvModalStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            width: "35%",
            height: "70%",
            borderRadius: "16px",
            transform: "translate(-50%, -50%)",
        },
        overlay: {
            background: "rgba(0, 0, 0, 0.25)",
            // marginBottom: '4rem',
            zIndex: "999",
        },
    };
    const CustomInput = ({ value, onClick }) => (
        <input type="text" value={value} onClick={onClick} readOnly />
    );

    const tProps = {
        treeData,
        value,
        onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: "Please select",
        style: {
            width: "100%",
        },
    };

    const userprofilesByRegion = [
        {
            value: "east",
            label: "East",
            children: [
                {
                    value: 1,
                    label: "Bob",
                    pictureUrl:
                        "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABbFI2wcwiGkHDdGWaw58hWgLETOBsbqqv6GbKnZFn3s_Y4fjw0Ys9DNYD5txnfV3oj9tgsBeaSnPcBOwQqQnpHVqHeQr9FtvVzaL.jpg?r=776",
                },
                {
                    value: 2,
                    label: "Eve",
                    pictureUrl:
                        "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABbFI2wcwiGkHDdGWaw58hWgLETOBsbqqv6GbKnZFn3s_Y4fjw0Ys9DNYD5txnfV3oj9tgsBeaSnPcBOwQqQnpHVqHeQr9FtvVzaL.jpg?r=776",
                },
            ],
        },
    ];

    const CustomOption = ({ label, pictureUrl }) => (
        <span>
            {pictureUrl && (
                <img
                    src={pictureUrl}
                    alt={label}
                    style={{ width: 24, height: 24, marginRight: 5 }}
                />
            )}
            {label}
        </span>
    );

    const formik = useFormik({
        initialValues: {
            taskname: taskName,
            description: desc,
            attachforms: "",
            attachcsv: [],
            date: null,
            duration: "",
        },
        // onSubmit: (values) => {
        //     alert(JSON.stringify(values, null, 2));
        // },
    });

    console.log(formik.values.attachcsv);

    const monthMap = {
        1: "01",
        2: "02",
        3: "03",
        4: "04",
        5: "05",
        6: "06",
        7: "07",
        8: "08",
        9: "09",
        10: "10",
        11: "11",
        12: "12",
    };

    const dateConfig = {
        date: {
            format: "DD",
            caption: "DD",
            step: 1,
        },
        month: {
            format: (value) => monthMap[value.getMonth() + 1],
            caption: "MM",
            step: 1,
        },
        year: {
            format: "YYYY",
            caption: "YYYY",
            step: 1,
        },
    };

    // open and close handle for upload csv files

    const handleCsvModalOpen = () => {
        setOpenCsvModal(true);
    };

    const handleCsvModalClose = () => {
        setOpenCsvModal(false);
        // navigate("/create-task/excel-view");
    };

    // handle popover
    const handlePopoverToggle = () => {
        setPopoverVisible(!isPopoverVisible);
    };

    const handlePopoverToggle1 = () => {
        setPopoverVisible1(!isPopoverVisible1);
    };

    const onDrop = (acceptedFiles) => {
        setCsvFiles([...csvFiles, acceptedFiles]);
        console.log(acceptedFiles);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));
        return Math.round(100 * (bytes / Math.pow(k, i))) / 100 + " " + sizes[i];
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ".csv",
        multiple: true,
    });

    // generate a-z letters

    for (let i = 97; i <= 122; i++) {
        azArr.push(String.fromCharCode(i));
    }

    useEffect(() => {
        getUsers("a");
        handleSort("a");
    }, []);

    setTaskName(formik.values.taskname);
    setDesc(formik.values.description);
    setRegion(selectRegions);
    // handle form values

    // const handleSubmit = () => {
    //   const { taskname, description, attachforms } = formik.values;
    //   setTaskname(taskname);
    //   console.log("csv files", csvFiles);
    //   // navigate("calendar");
    //   console.log(
    //     taskname,
    //     description,
    //     attachforms,
    //     time,
    //     selectedUsers,
    //     csvFiles
    //   );
    // };

    console.log(selectRegions);

    // bulk assign task

    const handleCreateTask = async ({ resetForm }) => {
        const { taskname, description, attachforms } = formik.values;
        // console.log(csvFiles);
        const formData = new FormData();
        formData.append("excel", excelFile);
        formData.append("taskName", taskname);
        formData.append("description", description);
        formData.append("radius", radius);
        formData.append("formId", "660a7fb67d6f596735d72594");
        formData.append("dueDate", time);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("limit", limit);

        console.log("submitted values", formData);
        // alert("bulk create");

        try {
            const res = await axios.post(
                "http://192.168.0.115:8001/task//bulk-assign/660aa4d54a8e525d204aaa77",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setBulkRes(res.data.tasks);
            navigate("/create-task/excel-view");
            console.log(res.data);
        } catch (err) {
            console.log("can't assign task", err);
        }
    };

    // manual task creation

    const handleCreateManual = async () => {
        const { taskname, description, attachforms } = formik.values;
        // alert("manual create");
        if (taskName != "" && description != "" && time != "") {
            try {
                const res = await axios.post(
                    "http://192.168.0.115:8001/task/create/660aa4d54a8e525d204aaa77",
                    {
                        surveyorIds: selectedUsers,
                        formId: "660a7fb67d6f596735d72594",
                        description: description,
                        dueDate: moment(time).format("YYYY-MM-DD"),
                        taskName: taskname,
                        location: selectRegions[0].label,
                    }
                );
                navigate("/surveyor-tasks");
                // const data = {
                //   surveyorIds: selectedUsers,
                //   formId: "660a7fb67d6f596735d72594",
                //   description: description,
                //   dueDate: moment(time).format('YYYY-MM-DD'),
                //   taskName: taskname,
                //   location: selectRegions
                // };
                // console.log(res.data.data);
            } catch (err) {
                console.log(err.message);
            }
        } else {
            alert("all fields must be filled");
        }
    };

    // handle surveyor select

    const handleWithoutAllselect = (id) => {
        console.log("id...", id);
        if (selectedUsers.includes(id)) {
            // setActiveSelectedSurveyors(false);
            setSelectedUsers(selectedUsers.filter((i) => i !== id));
            setSelectedSurveyorInCreateTask(selectedUsers.filter((i) => i !== id));

        } else {
            // setActiveSelectedSurveyors(true);
            setSelectedUsers([...selectedUsers, id]);
            setSelectedSurveyorInCreateTask([...selectedUsers, id]);
        }
    };

    const getUsers = async (selectedLetter) => {
        try {
            const users = await axios.get(
                `http://192.168.0.115:8000/user/surveyors?query=${selectedLetter}`
            );
            setUsers(users.data.data);
            setLoading(false);
            setSelectedLetter(selectedLetter);
            console.log(users.data.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    // get specific task

    const getTaskDetail = async () => {
        try {
            const res = await axios.get(
                `http://192.168.0.115:8001/task/show/${params.id}`
            );
            console.log("edit task details", res.data.data);
            setEditTaskname(res.data.data.taskName);
            setEditDesc(res.data.data.description);
            setEditSurveyor(res.data.data.surveyorId);
            setEditRegion({
                value: res.data.data.location, label: res.data.data.location
            });
            setEditDuedate(res.data.data.dueDate);
        } catch (err) {
            console.log(err.message);
        }
    };

    // edit single surveyor

    const editSingleSurveyor = (id) => {
        setEditSurveyor(id);
    }

    // edit region

    const handleEditRegion = (value) => {
        console.log("edited region", value);
        setEditRegion(value);
    }

    // edit due date

    const handleEditDue = () => {

    }

    useEffect(() => {
        getTaskDetail();
    }, []);

    // update task details

    const handleUpdateTask = async () => {
        try {
            const res = await axios.patch(`http://192.168.0.115:8001/task/update/660aa4d54a8e525d204aaa77/${params.id}`, {
                surveyorIds: editSurveyor,
                formId: "660a7fb67d6f596735d72594",
                description: editDesc,
                dueDate: editDuedate,
                taskName: editTaskname,
                location: editRegion.label,
            });
            setCreateTaskModal(false);
            console.log(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <div className="task-create">
                <div className="task-create-inner-layer">
                    {/* <TreeSelect
          {...tProps}
          className="tree-select"
          treeIcon={false}
          placement="topLeft"
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        /> */}
                    <div
                        className="form-box"
                        style={{
                            height: "100%",
                            overflowY: "scroll",
                            padding: "2rem",
                        }}
                    >
                        <form>
                            <div className="task-inputs">
                                <label htmlFor="taskname" className="task-label">
                                    Task name
                                </label>
                                <input
                                    id="taskname"
                                    name="taskname"
                                    type="text"
                                    placeholder="Enter task name"
                                    onChange={(e) => setEditTaskname(e.target.value)}
                                    // onBlur={formik.handleBlur}
                                    value={editTaskname}
                                    className="task-input"
                                    style={{
                                        padding: "1rem 1.1rem",
                                    }}
                                />
                            </div>
                            <div className="task-inputs">
                                <label htmlFor="description" className="task-label">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Enter description"
                                    onChange={(e) => setEditDesc(e.target.value)}
                                    // onBlur={formik.handleBlur}
                                    value={editDesc}
                                    className="task-input"
                                    style={{
                                        padding: "2.2rem 1.1rem",
                                    }}
                                />
                            </div>

                            {/* attach forms and upload file input */}

                            <div
                                style={{
                                    display: "flex",
                                    columnGap: "5rem",
                                    width: "100%",
                                }}
                            >
                                <div
                                    className="task-inputs"
                                    style={{
                                        width: "100%",
                                        // backgroundColor: "pink",
                                    }}
                                >
                                    <label htmlFor="attachforms" className="task-label">
                                        Attach forms
                                    </label>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            border: "1px solid #f7f9fb",
                                            padding: "0.3rem",
                                            marginTop: "0.9rem",
                                            columnGap: "0.5rem",
                                        }}
                                    >
                                        <div className="attach-file-logo">
                                            <img src={AttachFile} />
                                        </div>
                                        <input
                                            id="attachforms"
                                            name="attachforms"
                                            type="file"
                                            onChange={(e) => {
                                                formik.setFieldValue(
                                                    "attachforms",
                                                    e.currentTarget.files[0]
                                                );
                                            }}
                                            onBlur={formik.handleBlur}
                                            className="attachforms"
                                        />
                                    </div>
                                </div>
                                <div
                                    className="task-inputs"
                                    style={{
                                        width: "100%",
                                        cursor: 'not-allowed'
                                    }}
                                >
                                    <label htmlFor="attachforms1" className="task-label">
                                        Upload File
                                    </label>
                                    <div className="attachforms1">
                                        <img
                                            src={Csvfile}
                                            alt="csv file"
                                            style={{ marginLeft: "1rem" }}
                                        />
                                        {/* <div className="attachforms1"
                    style={{
                      backgroundColor: 'rgba(247, 249, 251, 1)'
                    }}
                  >

                  </div> */}
                                        {/* <input
                    id="attachforms1"
                    name="attachforms1"
                    type="file"
                    placeholder="Upload .csv file"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "attachcsv",
                        e.currentTarget.files[0]
                      );
                    }}
                    onBlur={formik.handleBlur}
                    accept=".csv"
                    className="attachforms1"
                    style={{
                      backgroundColor: "rgba(247, 249, 251, 1)",
                    }}
                  /> */}
                                    </div>
                                    <Modal isOpen={openCsvModal} style={customCsvModalStyles}>
                                        <div className="csv-file-upload-modal">
                                            <div className="csv-file-upload-txt">File Upload</div>
                                            <div
                                                style={{
                                                    height: "1px",
                                                    width: "100%",
                                                    backgroundColor: "#e3e3e3",
                                                }}
                                            ></div>
                                            <div className="csv-click-drag-box" {...getRootProps()}>
                                                <input
                                                    className="actual-drop-box"
                                                    type="file"
                                                    onChange={handleFileSelect}
                                                    {...getInputProps}
                                                />
                                            </div>
                                            <div className="format-accept-csv">
                                                Formats accepted are .csv{" "}
                                            </div>
                                            <div
                                                style={{
                                                    height: "1px",
                                                    width: "100%",
                                                    backgroundColor: "#e3e3e3",
                                                }}
                                            ></div>
                                            <div>
                                                {csvFiles.length > 0 ? (
                                                    <>
                                                        {csvFiles.map((data, index) => (
                                                            <div className="csv-file-display-box">
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        columnGap: "1rem",
                                                                    }}
                                                                >
                                                                    <IoDocumentTextOutline size={25} />
                                                                    <div>
                                                                        <div className="csv-filename">
                                                                            {csvFiles[index][0].path}
                                                                        </div>
                                                                        <div
                                                                            className="csv-filename"
                                                                            style={{
                                                                                color: "rgba(132, 147, 178, 1)",
                                                                            }}
                                                                        >
                                                                            {formatFileSize(csvFiles[index][0].size)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <AiOutlineDelete size={25} />
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : csvFiles1.length > 0 ? (
                                                    <>
                                                        {csvFiles1.map((data, index) => (
                                                            <div className="csv-file-display-box">
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        columnGap: "1rem",
                                                                    }}
                                                                >
                                                                    <IoDocumentTextOutline size={25} />
                                                                    <div>
                                                                        <div className="csv-filename">
                                                                            {csvFiles1[index].name}
                                                                        </div>
                                                                        <div
                                                                            className="csv-filename"
                                                                            style={{
                                                                                color: "rgba(132, 147, 178, 1)",
                                                                            }}
                                                                        >
                                                                            {formatFileSize(csvFiles1[index].size)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <AiOutlineDelete size={25} />
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <div className="csv-sample-format">
                                                        <div className="csv-sample-format-txt">
                                                            If you do not have a file, you can use the sample
                                                            below:
                                                        </div>
                                                        <div className="sample-format-box">
                                                            <FaRegFileAlt color="rgba(8, 184, 57, 1)" />
                                                            <div>Download Sample Template</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    height: "1px",
                                                    width: "100%",
                                                    backgroundColor: "#e3e3e3",
                                                }}
                                            ></div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "flex-end",
                                                    columnGap: "1.5rem",
                                                }}
                                            >
                                                <button
                                                    className="cancel-csv-upload-btn"
                                                    onClick={handleCsvModalClose}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="continue-csv-upload-btn"
                                                    onClick={handleCsvModalClose}
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                    {/* <input
                id="attachforms1"
                name="attachforms1"
                type="file"
                placeholder="Upload .csv file"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="attachforms1"
                style={{
                  backgroundColor: "rgba(247, 249, 251, 1)",
                }}
              /> */}
                                    {/* <div className="download-format-sample">
                  <CiCircleInfo />
                  Download format sample
                  <IoDownloadOutline />
                </div> */}
                                </div>
                            </div>

                            {/* select surveyors and region inputs */}

                            <div
                                style={{
                                    display: "flex",
                                    columnGap: "5rem",
                                    width: "100%",
                                }}
                            >
                                <div
                                    className="task-inputs"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <label htmlFor="attachforms" className="task-label">
                                        Surveyors
                                    </label>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            columnGap: "3rem",
                                        }}
                                    >
                                        {/* <Select
                    placeholder="Select Surveyors"
                    className="select-surveyors"
                    options={formatOptions(userProfiles)}
                    isMulti
                    onChange={handleChange}
                    components={{ Option: CustomDropdownOption }} //Control: CustomControl
                    styles={customStyles}
                    hideSelectedOptions={false}
                    onMenuOpen={handleMenuOpen}
                    onMenuClose={handleMenuClose}
                    menuIsOpen={menuIsOpen}
                    menuPlacement="top"
                    // isDisabled={formik.initialValues.taskname === ""}
                  /> */}

                                        <div className="select-users">
                                            {console.log("excel file: ", excelFile)}
                                            <div onClick={handlePopoverToggle}>Select Surveyors</div>
                                            {isPopoverVisible && (
                                                <div className="popover-content">
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <div className="pop-over-surveyor-txt">
                                                            Surveyor
                                                        </div>
                                                        <input
                                                            placeholder="Search"
                                                            className="pop-over-surveyor-search"
                                                        />
                                                    </div>
                                                    <div className="surveyor-data-container">
                                                        {loading ? (
                                                            <div>loading...</div>
                                                        ) : (
                                                            users.map((data) => (
                                                                <div
                                                                    style={{
                                                                        marginTop: "1rem",
                                                                    }}
                                                                >
                                                                    <div className="surveyor-region-txt">
                                                                        <span
                                                                            style={{
                                                                                marginRight: "0.6rem",
                                                                            }}
                                                                            onClick={() => {
                                                                                // handleToggle(data.labelId);
                                                                            }}
                                                                        >
                                                                            <input type="checkbox" />
                                                                        </span>
                                                                        {data.district}
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "1px",
                                                                            backgroundColor: "rgba(211, 220, 229, 1)",
                                                                            marginBottom: "1rem",
                                                                        }}
                                                                    ></div>
                                                                    {data.users.map((child) => (
                                                                        <EditSurveyorTemplate
                                                                            name={child.fullName}
                                                                            img={child.dpFullUrl}
                                                                            id={child.id}
                                                                            // assignedTasks={child.taskCount}
                                                                            // handleWithoutAllselect={
                                                                            //     handleWithoutAllselect
                                                                            // }
                                                                            editSingleSurveyor={editSingleSurveyor}
                                                                            editSurveyor={editSurveyor}
                                                                            // selectedUsers={selectedUsers}
                                                                            // selectedSurveyors={selectedSurveyors}
                                                                        />
                                                                        // <SurveyorSelectTemplate
                                                                        //   surveyor_img={child.label}
                                                                        //   surveyor_name={child.label}
                                                                        //   surveyor_id={child.id}
                                                                        //   selectedUsers={selectedUsers}
                                                                        //   handleWithoutAllselect={handleWithoutAllselect}
                                                                        // />
                                                                    ))}
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            height: "1px",
                                                            backgroundColor: "rgba(211, 220, 229, 1)",
                                                        }}
                                                    ></div>
                                                    <div className="surveyor-sort-container">
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                height: "40%",
                                                                columnGap: "0.3rem",
                                                                // backgroundColor: "red",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            {azArr.map((letter) => (
                                                                <div
                                                                    className="sorted-letters"
                                                                    onClick={() => getUsers(letter)}
                                                                    style={{
                                                                        backgroundColor:
                                                                            letter === selectedLetter
                                                                                ? "rgba(27, 81, 187, 1)"
                                                                                : "#fff",
                                                                        color:
                                                                            letter === selectedLetter
                                                                                ? "#fff"
                                                                                : "rgba(132, 147, 178, 1)",
                                                                        // padding: "2px",
                                                                        borderRadius: "0.2rem",
                                                                        fontFamily: "EuclidRegular",
                                                                    }}
                                                                >
                                                                    {letter}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="img-sort">
                                                            {surveyorData.map(
                                                                ({ label, regionImg, value }) => (
                                                                    <div
                                                                        className="popover-img-box"
                                                                        onClick={() => handleSort(value)}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                width: "7rem",
                                                                                height: "3rem",
                                                                            }}
                                                                        >
                                                                            <img
                                                                                src={regionImg}
                                                                                style={{
                                                                                    width: "100%",
                                                                                    height: "100%",
                                                                                    objectFit: "cover",
                                                                                    borderRadius: "0.3rem",
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                color: "rgba(132, 147, 178, 1)",
                                                                                fontSize: "0.8rem",
                                                                                fontFamily: "EuclidRegular",
                                                                            }}
                                                                        >
                                                                            {label}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div
                                            style={{
                                                width: "35%",
                                            }}
                                        >
                                            <div className="broadcast-task"
                                                style={{
                                                    cursor: 'not-allowed'
                                                }}
                                            >
                                                <img
                                                    src={BroadcastTask}
                                                    alt="BroadcastTask"
                                                    style={{
                                                        marginRight: "0.5rem",
                                                    }}
                                                />
                                                Broadcast Task
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="task-inputs"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <label htmlFor="attachforms" className="task-label">
                                        Region
                                    </label>
                                    <Select
                                        placeholder="Select Region"
                                        className="select-surveyors"
                                        options={regions}
                                        value={editRegion}
                                        onChange={handleEditRegion}
                                        styles={regionSelectCustomStyles}
                                        hideSelectedOptions={false}
                                        // menuIsOpen={regionMenuOpen}
                                        // onMenuClose={handleRegionMenuClose}
                                        // onMenuOpen={handleMenuOpen1}
                                        // onMenuClose={handleMenuClose1}
                                        // menuIsOpen={regionMenuOpen}
                                        menuPlacement="top"
                                    />
                                </div>
                            </div>

                            {/* task due date */}
                            <div className="task-inputs">
                                {/* show advance task options  */}

                                {showAdvanceOptions ? (
                                    <>
                                        <label htmlFor="taskname" className="task-label">
                                            Task due date
                                        </label>
                                        <div className="scrollable-date-picker">
                                            <input
                                                type="text"
                                                placeholder="DD/MM/YYYY"
                                                className="date-picker-box"
                                                onClick={handleClick}
                                                value={editDuedate}
                                            />

                                            {isOpen && (
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        width: "25rem",
                                                    }}
                                                >
                                                    <DatePicker
                                                        value={time}
                                                        onSelect={handleSelect}
                                                        onCancel={handleCancel}
                                                        isPopup={false}
                                                        theme={"ios"}
                                                        showHeader={false}
                                                        showCaption={true}
                                                        dateConfig={dateConfig}
                                                        confirmText="OK"
                                                        cancelText="Cancel"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="show-advance-options">
                                        <div className="range-boxes">
                                            <div className="range-box">
                                                <label htmlFor="taskname" className="task-label">
                                                    Start task on
                                                </label>
                                                {isOpenStartDate && (
                                                    <div
                                                        style={{
                                                            position: "relative",
                                                            width: "25rem",
                                                        }}
                                                    >
                                                        <DatePicker
                                                            value={startDate}
                                                            onSelect={handleTaskStartDate}
                                                            onCancel={handleCancel}
                                                            isPopup={false}
                                                            theme={"ios"}
                                                            showHeader={false}
                                                            showCaption={true}
                                                            dateConfig={dateConfig}
                                                            confirmText="OK"
                                                            cancelText="Cancel"
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <input
                                                    type="text"
                                                    placeholder="DD/MM/YYYY"
                                                    className="start-date"
                                                    onClick={() => setIsOpenStartDate(!isOpenStartDate)}
                                                    value={startDate.toLocaleDateString("en-GB")}
                                                />
                                            </div>
                                            {/* <div className="range-box">
                      <label htmlFor="duration" className="task-label">
                        Duration
                      </label>
                      <input
                        id="duration"
                        name="duration"
                        type="number"
                        placeholder=""
                        className="start-date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.duration}
                      />
                    </div> */}
                                            <div className="range-box">
                                                <label htmlFor="taskname" className="task-label">
                                                    Finish
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="DD/MM/YYYY"
                                                    className="start-date"
                                                    onClick={() => setIsOpenFinishDate(!isOpenFinishDate)}
                                                    value={endDate.toLocaleDateString("en-GB")}
                                                />
                                                {isOpenFinishDate && (
                                                    <div
                                                        style={{
                                                            position: "relative",
                                                            width: "25rem",
                                                        }}
                                                    >
                                                        <DatePicker
                                                            value={endDate}
                                                            onSelect={handleTaskFinishDate}
                                                            onCancel={handleCancel}
                                                            isPopup={false}
                                                            theme={"ios"}
                                                            showHeader={false}
                                                            showCaption={true}
                                                            dateConfig={dateConfig}
                                                            confirmText="OK"
                                                            cancelText="Cancel"
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* send updates */}

                                <div className="send-updates">
                                    <div>Send with updates </div>
                                    <input
                                        type="checkbox"
                                        onClick={() => setShowShareOptions(!showShareOptions)}
                                    />
                                    <div>Send Notification</div>
                                </div>
                                {showShareOptions && (
                                    <div className="share-options">
                                        <div className="share-option">
                                            <input type="checkbox" />
                                            <div className="share-option-txt">Email</div>
                                        </div>
                                        <div className="share-option">
                                            <input type="checkbox" />
                                            <div className="share-option-txt">Send with profile</div>
                                        </div>
                                    </div>
                                )}
                                {/* region range and survey limit */}

                                {showAdvanceOptions ? (
                                    ""
                                ) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            columnGap: "5rem",
                                            width: "100%",
                                            marginTop: "2rem",
                                        }}
                                    >
                                        <div
                                            className="task-inputs"
                                            style={{
                                                width: "100%",
                                            }}
                                        >
                                            <label htmlFor="attachforms" className="task-label">
                                                Region range
                                            </label>
                                            <div className="select-users">
                                                <div onClick={handlePopoverToggle1}>Select radius</div>
                                                {isPopoverVisible1 && (
                                                    <div className="radius-popover">
                                                        <div className="select-radius-txt">
                                                            Select radius
                                                        </div>
                                                        <div
                                                            className="radius-range"
                                                            onClick={() => {
                                                                setRadius("10");
                                                            }}
                                                        >
                                                            10 km
                                                        </div>
                                                        <div
                                                            className="radius-range"
                                                            onClick={() => {
                                                                setRadius("20");
                                                            }}
                                                        >
                                                            20 km
                                                        </div>
                                                        <div
                                                            className="radius-range"
                                                            onClick={() => {
                                                                setRadius("30");
                                                            }}
                                                        >
                                                            30 km
                                                        </div>
                                                        <div
                                                            className="radius-range"
                                                            onClick={() => {
                                                                setRadius("40");
                                                            }}
                                                        >
                                                            40 km
                                                        </div>
                                                        <div className="radius-range">Custom radius</div>
                                                        <input type="range" min="0" max="10" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="task-inputs"
                                            style={{
                                                width: "100%",
                                            }}
                                        >
                                            <label htmlFor="attachforms" className="task-label">
                                                Survey limit
                                            </label>
                                            <Select
                                                placeholder="Select maximum no. of surveys to be assigned to one surveyor"
                                                className="select-surveyors"
                                                options={surveyors}
                                                onChange={setLimit}
                                                styles={customStyles}
                                                hideSelectedOptions={false}
                                                // onMenuOpen={handleMenuOpen1}
                                                // onMenuClose={handleMenuClose1}
                                                // menuIsOpen={regionMenuOpen}
                                                menuPlacement="top"
                                            />
                                            <div className="survey-limit-txt">
                                                Default survey limit 10
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* advanced */}

                    <div className="advanced-options">
                        <div className="advanced-options-left">
                            <div
                                style={{
                                    color: "#1B2436",
                                    fontFamily: "EuclidSemibold",
                                    fontSize: "1.2rem",
                                }}
                                onClick={() => setShowAdvanceOptions(!showAdvanceOptions)}
                            >
                                Advanced
                            </div>
                            <div
                                style={{
                                    color: "#8493B2",
                                    fontFamily: "EuclidSemibold",
                                    fontSize: "1.2rem",
                                }}
                            >
                                ( Region range, Survey count )
                            </div>
                        </div>
                        <div className="advanced-options-right">
                            <div className="advanced-cancel-btn"
                            onClick={() => navigate(-1)}
                            >Cancel</div>
                            <button
                                className="advanced-next-btn"
                                // onClick={() => navigate("/create-task/excel-view")}
                                // onClick={handleSubmit}
                                // onClick={handleCreateTask}
                                style={
                                    {
                                        // cursor: 'not-allowed'
                                    }
                                }
                                onClick={
                                    excelFile == null
                                        ? () => setCreateTaskModal(true)
                                        : handleCreateTask
                                }
                            >
                                {excelFile == null ? "Update task" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={createTaskModal}
                onAfterOpen={() => setCreateTaskModal(true)}
                onAfterClose={() => setCreateTaskModal(false)}
                style={customStyles1}
            >
                <h3
                    style={{
                        color: "rgba(27, 36, 54, 1)",
                        fontSize: "1.6rem",
                        fontFamily: "EuclidBold",
                    }}
                >
                    Are you sure ?
                </h3>
                <p
                    style={{
                        color: "rgba(132, 147, 178, 1)",
                        fontSize: "1.1rem",
                        fontFamily: "EuclidRegular",
                        marginTop: "0.5rem",
                    }}
                >
                    Are you sure you want to proceed
                </p>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "1.3rem",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "1rem",
                        }}
                    >
                        <button
                            className="create-task-modal"
                            style={{
                                border: "1px solid rgba(27, 81, 187, 1)",
                                color: "rgba(27, 81, 187, 1)",
                                cursor: "pointer",
                            }}
                            onClick={() => setCreateTaskModal(false)}
                        >
                            Continue editing
                        </button>
                        <button
                            className="create-task-modal"
                            style={{
                                color: "#fff",
                                backgroundColor: "rgba(27, 81, 187, 1)",
                                cursor: "pointer",
                            }}
                            onClick={handleUpdateTask}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
