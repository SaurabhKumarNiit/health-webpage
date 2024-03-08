'use client'
import React, { useState, useEffect } from 'react';
import HwSearchZip from '../../Component/HwSearchZip'
import HWLoader from '../../Component/HWLoader';
import HwShareon from '../../Component/HwShareon';
import MedicareNote from '../../Component/MedicareNote';
// import HwIcons from '@/Components/HwIcons';

import { PiGenderMaleLight, PiShareNetwork } from "react-icons/pi";
import { BsTelephone, BsArrowLeft } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiFilterAlt, BiCheck } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiSearchLine } from 'react-icons/ri';
import { GrClose } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import Box from "@mui/material/Box";
import Modal from 'react-modal';
import { type } from 'os';

async function fetchPaginatedDoctors(page, perPage) {
    const response = await fetch(`https://api.coc.houseworksinc.co/api/v1/doctors?page=${page}&per_page=${perPage}`)
    const data = await response.json();
    return data;
}

async function fetchPaginatedHospitals(page, perPage) {
    const response = await fetch(`https://api.coc.houseworksinc.co/api/v1/hospitals?page=${page}&per_page=${perPage}`)
    const data = await response.json();
    return data;

    // return 'data';
}

async function fetchDoctors(type, organ, zipCode, zip_codes) {
    try {
        let apiUrl = `https://api.coc.houseworksinc.co/api/v1/doctors/?type=${type}&organ=${organ}`;
        if (zipCode) {
            apiUrl += `&zip_codes=${zipCode}`;
        }
        if (zip_codes) {
            apiUrl += `&zip_codes=${zip_codes}`;
        }
        const response = await fetch(apiUrl);
        const result = await response.json();
        console.log(result.results);
        return result;
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return { results: [] }; // Return empty array or handle error accordingly
    }
}

async function fetchHospitals(type, zipCode) {
    try {
        let apiUrl = `https://api.coc.houseworksinc.co/api/v1/hospitals/?type=${type}`;
        if (zipCode) {
            apiUrl += `&zip_codes=${zipCode}`;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return { data: [] }; // Return empty array or handle error accordingly
    }
}

const FilterPopup = ({ applyFilter, onCancel, defaultValues }) => {
    const [type, setType] = useState(defaultValues.type || ''); // Set default value if available
    const [searchFor, setSearchFor] = useState(defaultValues.searchFor || '');
    const [organ, setOrganFor] = useState(defaultValues.organ || '');
    const [zipCode, setZipCode] = useState(defaultValues.zipCode || ''); // Set default value if available
    const [zip_codes, setzip_codes] = useState(defaultValues.zip_codes || '');
    const [selectedOption, setSelectedOption] = useState(defaultValues.type || '');
    const [selectedMutiple, setselectedMutiple] = useState(defaultValues.searchFor || '');
    const [selectedTab, setSelectedTab] = useState(1);
    const [selectImage, setSelectImage] = useState(defaultValues.organ || '');
    const [selectImage1, setSelectImage1] = useState(defaultValues.organ || '');
    const [organs, setOrgan] = useState("");
    const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
    // const [showPopup, setShowPopup] = useState(false);


    const handleOrganSelection = (selectedOrgan, option) => {
        setSelectImage(selectedOrgan);
        setSelectImage1(selectedOrgan)
        console.log("Selected Organ:", selectedOrgan);
        setOrganFor(selectedOrgan);
        setOrgan(option)
    };
    const handleCancel = () => {
        onCancel();
    };
    const getOrganOptions = () => {
        console.log("inside get ", organ);
        if (type === "transplant") {
            return ["kidney", "lungs", "liver", "pancreas"];
        } else if (type === "oncology") {
            return [
                "lungs",
                "liver",
                "pancreas",
                "bile_duct",
                "adrenal",
                "rectum",
                "breast",
                "small intestine",
                "stomach",
                "colon",
            ];
        }
        return [];
    };
    const handleOptionClick1 = (search) => {
        setselectedMutiple(search);
        setSearchFor(search);
    };

    const closeFilterModal = () => {
        setFilterModalIsOpen(false);
    };

    const handleApplyFilter = () => {
        // Call applyFilter function with the selected filter options
        applyFilter({ type, organ, searchFor, zipCode, zip_codes });

        setTimeout(() => {
            onCancel();
        }, 2000)
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setType(option); // Set the type when an option is selected
    };
    const handleTypeSelection = (selected) => {
        setSelectedOption(selected);
        setType(selected); // Update the type state when an option is selected
    };

    return (
        <div className='fixed right-2 top-24 z-50'>
            <div className='max-h-[80vh] overflow-auto'>
                <div className='transition duration-150 ease-out md:ease-in max-w-[100%] sm:w-[485px] bg-[#fff] px-6 py-0 border rounded-md shadow-md mt-4'>
                    {/* fixed right-2 top-24 z-50 */}
                    <div className="hwOType">
                        {/* {zipCode && ( */}
                        <div>
                            <h2 className='font-semibold mt-4 mb-2'>ZipCode</h2>
                            <input
                                className='border rounded-md px-3 py-3 bg-[#f7f9fc] w-[186px]'
                                type="text" placeholder="Enter" value={zipCode} onChange={(e) => setZipCode(e.target.value)}
                            />
                        </div>
                        {/* // )} */}

                        {zip_codes && (
                            <div>
                                <h2 className='font-semibold mt-4 mb-2'>ZipCodes</h2>
                                <input
                                    className='border rounded-md px-3 py-3 bg-[#f7f9fc] w-[186px]'
                                    type="text" placeholder="Enter" value={zip_codes} onChange={(e) => setzip_codes(e.target.value)}
                                />
                            </div>
                        )}

                        <h3 className="font-bold text-[#101426] text-base">
                            Type
                        </h3>
                        <div className="sm:flex grid grid-cols-2 place-content-stretch gap-4 my-2 max-w-[270px] items-center">
                            <div
                                className="px-5 py-3.5 cursor-pointer rounded-lg text-center text-sm"
                                type="text" value={type} onChange={(e) => setType(e.target.value)}
                                style={{
                                    border: selectedOption === "transplant" ? "1px solid #C8ADFF" : "1px solid #C5CEE0",
                                    color: selectedOption === "transplant" ? "#6E2FEB" : "rgb(16 20 28 / 80%)",
                                    backgroundColor: selectedOption === "transplant" ? "#F5F0FF" : "#ffff",
                                }}
                                onClick={() => handleTypeSelection("transplant")}
                            >
                                Transplant
                            </div>
                            <div
                                className="px-5 py-3.5 cursor-pointer rounded-lg text-center text-sm"
                                type="text" value={type} onChange={(e) => setType(e.target.value)}
                                style={{
                                    border: selectedOption === "oncology" ? "1px solid #C8ADFF" : "1px solid #C5CEE0",
                                    color: selectedOption === "oncology" ? "#6E2FEB" : "rgb(16 20 28 / 80%)",
                                    backgroundColor: selectedOption === "oncology" ? "#F5F0FF" : "#ffff",
                                }}
                                onClick={() => handleTypeSelection("oncology")}
                            >
                                Oncology
                            </div>
                        </div>

                        <div className="my-2 flex-wrap">
                            <h3 className="mt-4 mb-2 font-bold text-[#101426] text-base">
                                Searching For
                            </h3>
                            <ul className="flex flex-wrap gap-4 items-center">
                                <li
                                    className="flex-none min-w-[80px] px-5 py-3.5 text-sm cursor-pointer rounded-md min-w-[90px] text-center"
                                    type="text" value={searchFor} onChange={(e) => setSearchFor(e.target.value)}
                                    style={{
                                        border:
                                            selectedMutiple === "Doctor"
                                                ? "1px solid #C8ADFF"
                                                : "1px solid #C5CEE0",
                                        color:
                                            selectedMutiple === "Doctor"
                                                ? "#6E2FEB"
                                                : "rgb(16 20 28 / 80%)",
                                        backgroundColor:
                                            selectedMutiple === "Doctor" ? "#F5F0FF" : "#ffff",
                                    }}
                                    onClick={() => handleOptionClick1("Doctor")}
                                >
                                    Doctor
                                </li>
                                <li
                                    className="flex-none min-w-[80px] px-5 py-3.5 text-sm cursor-pointer rounded-md min-w-[90px] text-center"
                                    type="text" value={searchFor} onChange={(e) => setSearchFor(e.target.value)}
                                    style={{
                                        border:
                                            selectedMutiple === "Hospital"
                                                ? "1px solid #C8ADFF"
                                                : "1px solid #C5CEE0",
                                        color:
                                            selectedMutiple === "Hospital"
                                                ? "#6E2FEB"
                                                : "rgb(16 20 28 / 80%)",
                                        backgroundColor:
                                            selectedMutiple === "Hospital" ? "#F5F0FF" : "#ffff",
                                    }}
                                    onClick={() => handleOptionClick1("Hospital")}
                                >
                                    Hospital
                                </li>
                                <li className="sm:flex-grow relative">
                                    <Box
                                        component="form"
                                        sx={{
                                            "& > :not(style)": { m: 1 },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                    </Box>
                                </li>
                            </ul>
                        </div>

                        {selectedTab === 1 ? (
                            <div className="flex">
                                {selectedOption === "Cancer" ||
                                    selectedMutiple === "Hospital" || (
                                        <>
                                            <div className="transplantBox mb-2">
                                                <h3 className="font-bold text-[#101426] text-base mt-2 ">
                                                    Organ
                                                </h3>
                                                <br />
                                            </div>
                                            <div>
                                                <div
                                                    className="mt-[50px] text-center"
                                                    style={{ marginLeft: "-50px" }}
                                                >
                                                    <div className="flex flex-wrap gap-4 items-baseline">
                                                        {getOrganOptions().map((option) => (
                                                            <button
                                                                style={{
                                                                    border:
                                                                        (type === "transplant" && selectImage === option) ||
                                                                            (type === "oncology" && selectImage1 === option)
                                                                            ? "1px solid #C8ADFF"
                                                                            : "1px solid #C5CEE0",
                                                                    color:
                                                                        (type === "transplant" && selectImage === option) ||
                                                                            (type === "oncology" && selectImage1 === option)
                                                                            ? "#6E2FEB"
                                                                            : "#101426",
                                                                    backgroundColor:
                                                                        (type === "transplant" && selectImage === option) ||
                                                                            (type === "oncology" && selectImage1 === option)
                                                                            ? "#F5F0FF"
                                                                            : "white",
                                                                    padding: "10px 5px",
                                                                    borderRadius: "10px",
                                                                    maxWidth: "100%",
                                                                    width: "80px",
                                                                    height: "101px",
                                                                    fontSize: "14px",
                                                                    textAlign: "-webkit-center",
                                                                }}
                                                                key={option}
                                                                onClick={() => handleOrganSelection(option)}
                                                            >
                                                                <img
                                                                    className=""
                                                                    src={
                                                                        (type === "transplant" && selectImage === option) ||
                                                                            (type === "oncology" && selectImage1 === option)
                                                                            ? `../images/search/${option}_active.svg`
                                                                            : `../images/search/${option}.svg`
                                                                    }
                                                                    alt="React Image"
                                                                />
                                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                                            </button>
                                                        ))}
                                                    </div>

                                                </div>
                                            </div>
                                        </>

                                    )}
                                {selectedOption === "Transplant" ||
                                    selectedMutiple === "Hospital" || (
                                        <div className="cancerBox mb-2">
                                        </div>
                                    )}
                            </div>
                        ) : (
                            <div className="flex flex-wrap">
                                <div className="w-[50%] p-4"></div>
                            </div>
                        )}
                        <div className="flex items-center gap-2 mt-6 justify-end mb-6">
                            <button className="min-w-[104px] rounded-md gap-x-2.5 p-2.5 font-semibold text-gray-900 bg-[#fff] hover:bg-[#f7f9f7]" onClick={handleCancel}>Cancel</button>
                            <button className="min-w-[104px] rounded-md gap-x-2.5 p-2.5 font-semibold text-[#fff] bg-[#6e2feb] hover:bg-[#6e2feb]" onClick={handleApplyFilter}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const DoctorDataSearch = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [doctorsData, setDoctors] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [currentType, setCurrentType] = useState('');
    const [currentZipCode, setCurrentZipCode] = useState('');
    const [currentZipCode1, setCurrentZipCode1] = useState('');
    const [currentOrgan, setCurrentOrgan] = useState('');
    const [currentSearchFor, setCurrentSearchFor] = useState('');
    const [dataState, setDataState] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showZipCode, setShowZipCode] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState({});
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
    const [compareModalIsOpen, setCompareModalIsOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [selectedItemID, setSelectedItemID] = useState(null);
    const [selectedItemIdDoctor, setSelectedItemIdDoctor] = useState(null);

    const [selectedPage, setSelectedPage] = useState(1);

    const [pageHospital, setPageHospital] = useState(1);
    const [perPageHospital] = useState(10);
    const [totalPagesHospital, setTotalPagesHospital] = useState(1);
    const [totalDataCountHospital, setTotalDataCountHospital] = useState(0);
    const [selectedItemIDHospital, setSelectedItemIDHospital] = useState(null);
    const [selectedPageHospital, setSelectedPageHospital] = useState(1);

    const [valueType, setType] = useState('');
    const [valuezipCode, setZipCode] = useState('');
    const [valueOrgan, setOrgan] = useState("");
    const [valueSearch, searchForValue] = useState("");
    const [valueUpdate, setUpdatedValue] = useState("");
    const [defaultSelectedItemID, setDefaultSelectedItemID] = useState(null);
    const [defaultSelectedItemIdDoctor, setDefaultSelectedItemIdDoctor] = useState(null);

    const [zip_codes, setzip_codes] = useState('');
    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [selectedHospitals, setSelectedHospitals] = useState([]);
    const [shouldShowFiltrationDoctors, setShouldShowFiltrationDoctors] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [shouldShowFiltrationHospitals, setShouldShowFiltrationHospitals] = useState(false);
    const [shouldShowDoctorsData, setShouldShowDoctorsData] = useState(false);
    const [shouldShowHospitalsData, setShouldShowHospitalssData] = useState(false);
    const [shouldRunEffect, setShouldRunEffect] = useState(false);




    useEffect(() => {
        if (doctorsData.length > 0) {
            setDefaultSelectedItemIdDoctor(doctorsData[0].id);
            setSelectedItemIdDoctor(doctorsData[0].id);
        }
    }, [doctorsData]);

    const [isShareOpen, setIsShareOpen] = useState(false);
    const toggleShare = () => {
        setIsShareOpen(!isShareOpen);
    };

    
    useEffect(() => {
        if (hospitals.length > 0) {
            setDefaultSelectedItemID(hospitals[0].id);
            setSelectedItemID(hospitals[0].id);
        }
    }, [hospitals]);



    useEffect(() => {
        setSelectedItemID(defaultSelectedItemID);
    }, [defaultSelectedItemID]);

    useEffect(() => {
        setSelectedItemIdDoctor(defaultSelectedItemIdDoctor);
    }, [defaultSelectedItemIdDoctor]);


    //Add Search Icon in Search Filter
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);

    };

    const filteredResultsdoctor = (doctorsData || []).filter((doctor) => {
        if (searchTerm === "") {
            return true;
        } else if (
            doctor &&
            doctor.first_name &&
            doctor.last_name &&
            (
                doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        ) {
            return true;
        }
        return false;
    });

    useEffect(() => {
        let myKeys = window.location.search;

        let urlParams = new URLSearchParams(myKeys);

        let param1 = urlParams.get("search");

        let filterParams = new URLSearchParams(param1);

        let searchResult = filterParams.get("searchResult");


        if (filteredResultsdoctor.length < 10) {
            setShouldShowFiltrationDoctors(false);
        }

        console.log(filteredResultsdoctor.length);

        if (searchResult == null) {
            // setSearchTerm('');
            console.log('set to null')
        } else {
            setSearchTerm(searchResult);
            console.log('set to result')
            setShouldShowFiltrationDoctors(false);
        }


    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // console.log(window.location);
            let myKeys = window.location.search;
            // console.log("k & V :", myKeys);

            let urlParams = new URLSearchParams(myKeys);

            let param1 = urlParams.get("search");

            let filterParams = new URLSearchParams(param1);

            let type = filterParams.get("type");
            let searchResult = filterParams.get("searchResult");
            let searchFor = filterParams.get("searchFor");
            let organ = filterParams.get("organ");
            let zipCode = filterParams.get("zip_code");
            let zip_codes = filterParams.get("zip_codes")
            console.log(zipCode, zip_codes);
            setCurrentType(type);
            setCurrentZipCode(zipCode);
            setCurrentZipCode1(zip_codes);
            setCurrentOrgan(organ);
            setCurrentSearchFor(searchFor);
            // setType(type);
            // searchForValue(searchFor);

            if (zipCode == null && zip_codes == null) {
                // setShouldRunEffect(true);
            }

            // console.log(type);
            if (searchFor == 'Doctor') {
                try {
                    const data = await fetchDoctors(type, organ, zipCode, zip_codes);
                    // setDoctors(data.results); 
                    setDoctors(data.results);

                    setShouldShowFiltrationDoctors(data.count > 10);

                    if (searchResult != null) {
                        console.log(searchResult);
                        if (filteredResultsdoctor.length < 10) {
                            setShouldShowFiltrationDoctors(false);
                        }
                    } else {
                        console.log("search result is null")
                    }

                    setShouldShowDoctorsData(data.results.length == 0)
                    console.log(data.count);
                    // setSelectedDoctor(data.results[0]);
                    setDataState(true);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                try {
                    const data = await fetchHospitals(type, zipCode, zip_codes);
                    // setDoctors(data.results); 
                    setHospitals(data.results);
                    console.log(data.results)
                    setShouldShowFiltrationHospitals(data.count > 10)
                    console.log('hhhhhhhhhhhhhssssssssssssss------- ' ,data.results[0].id);

                    // setSelectedItemID(data.results[0].id);
                    setShouldShowHospitalssData(data.results.length == 0)
                    setDataState(false);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

    setShowSearchBar(true);


        };
        fetchData();
    }, []);

    useEffect(() => {
//   setTimeout(()=>{
//     if (filteredResultsdoctor.length < 10) {
//         if (searchTerm.length > 0) {
//             setShouldShowFiltrationDoctors(false);
//             setShouldShowFiltrationHospitals(false);
    
//         } else {
//             setShouldShowFiltrationDoctors(true);
//             setShouldShowFiltrationHospitals(true);
//         }    }
//   },1000)

let myKeys = window.location.search;
// console.log("k & V :", myKeys);

let urlParams = new URLSearchParams(myKeys);

let param1 = urlParams.get("search");

let filterParams = new URLSearchParams(param1);

let searchResult = filterParams.get("searchResult");

if (searchTerm!='') {
    console.log(searchTerm);
    setShouldShowFiltrationDoctors(false);
    setShouldShowFiltrationHospitals(false);

    // if (filteredResultsdoctor.length < 10) {
    //     setShouldShowFiltrationDoctors(false);
    // }
} else {
    console.log("search result is null")
}
    }, [searchTerm]);

    const applyFilter = async (filterOptions) => {
        // Make the API call with the updated filter options
        console.log(filterOptions);
        setCurrentType(filterOptions.type);
        setCurrentZipCode(filterOptions.zipCode);
        setCurrentZipCode1(filterOptions.zip_codes)
        setCurrentOrgan(filterOptions.organ);
        setCurrentSearchFor(filterOptions.searchFor);

        // if (filterOptions.zipCode == "" && filterOptions.zip_codes == "") {
        //     setShouldRunEffect(true);
        // } else {
        //     setShouldRunEffect(false);
        // }

        if (filterOptions.searchFor == 'Doctor') {
            try {
                const data = await fetchDoctors(filterOptions.type, filterOptions.organ, filterOptions.zipCode, filterOptions.zip_codes);
                setDoctors(data.results);
                setShouldShowFiltrationDoctors(data.count > 10);
                setShouldShowDoctorsData(data.results.length == 0)
                console.log('ALL Results- ', data.results);
                setDataState(true);
                setIsLoading(false);
                cancelFilter(); // Close the popup after applying the filter
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            try {
                const data = await fetchHospitals(filterOptions.type, filterOptions.zipCode, filterOptions.zip_codes);
                // setDoctors(data.results); 
                setHospitals(data.results);
                setShouldShowFiltrationHospitals(data.count > 10)
                setShouldShowHospitalssData(data.results.length == 0)
                setDataState(false);
                // console.log(dataState);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let myKeys = window.location.search;
            let urlParams = new URLSearchParams(myKeys);
            let param1 = urlParams.get("search");
            let filterParams = new URLSearchParams(param1);
            // Use defaultValues here or set your state accordingly
        }
    }, []);

    const defaultValues = {
        type: currentType,
        organ: currentOrgan,
        searchFor: currentSearchFor,
        zipCode: currentZipCode,
        zip_codes: currentZipCode1,
    };

    console.log("current zipcode", currentZipCode1);
    // Capitalize the first letter of each word
    function capitalizeString(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    const handleItemClick = (id) => {
        setDefaultSelectedItemID(id);
        setSelectedItemID(id);
    };

    const handleItemClick1 = (id) => {
        setDefaultSelectedItemIdDoctor(id);
        setSelectedItemIdDoctor(id);
    };

    const toggleZipCode = (doctorId) => {
        // setCurrentZipCode1(zip_codes);
        setShowZipCode(doctorId);
        setAdditionalInfo(true)
        setSelectedDoctorId(doctorId);
    };

    const OpenCompareModal = () => {
        const selectedDoctorsData = doctorsData.filter(doctor => selectedItems.includes(doctor.id));
        setSelectedDoctors(selectedDoctorsData);
        setCompareModalIsOpen(true);
    };

    const OpenCompareModal1 = () => {
        const selectedHospitalsData = hospitals.filter(hospital => selectedItems.includes(hospital.id));
        setSelectedHospitals(selectedHospitalsData);
        setCompareModalIsOpen(true);
    };

    const closeCompareModal = () => {
        setCompareModalIsOpen(false);
        setSelectedItems([]);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openCompareModal = () => {
        setCompareModalIsOpen(true);
    };

    const openModal = (doctor) => {
        setSelectedDoctor(doctor);
        setModalIsOpen(true);
    };

    const toggleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const getFullGenderName = (gender) => {
        if (gender === 'M') {
            return 'Male';
        } else if (gender === 'F') {
            return 'Female';
        }
        return gender;
    };
    const openFilterModal = () => {
        setFilterModalIsOpen(true);
    };

    const closeFilterModal = () => {
        setFilterModalIsOpen(false);
    };

    const togglePopup = () => {
        setShowPopup(true);
        setFilterModalIsOpen(true);
    };

    const cancelFilter = () => {
        // Handle cancel logic
        setFilterModalIsOpen(false);
        setShowPopup(false);
    };

    const filteredResults = (results || []).filter((item) => {
        if (searchTerm === "") {
            return true;
        } else if (
            item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            item.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return true;
        }
        return false;
    });


    const closeSelectedItem = (doctorId) => {
        setSelectedDoctors(prevDoctors => prevDoctors.filter(doctor => doctor.id !== doctorId));
    };

    const closeSelectedItem1 = (hospitalId) => {
        setSelectedHospitals(prevHospitals => prevHospitals.filter(hospital => hospital.id !== hospitalId));
    };


    // ====================================Hospital-Data======================================================================
    const [selectedHospitalId, setSelectedHospitalId] = useState(null);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    // popup start
    const [selectedTab, setSelectedTab] = useState(1);
    const [showInput, setShowInput] = useState(false);
    const [selectedOption, setSelectedOption] = useState("transplant");
    const [selectedMutiple, setselectedMutiple] = useState("Doctor");
    const [selectedZip, setSelectedZip] = useState();

    const [searchedZipCodes, setSearchedZipCodes] = useState([]);
    const [selectedZipCodes, setSelectedZipCodes] = useState([]);
    const [counters, setCounters] = useState({});
    const [zipCodes, setZipCodes] = useState([]);

    const [loadingZip, setLoadingZip] = useState(false);
    const [doctorDataFetched, setDoctorDataFetched] = useState(false);
    const [hospitalDataFetched, setHospitalDataFetched] = useState(false);
    const [apiDataLoaded, setApiDataLoaded] = useState(false);
    const [searchFor, setSearchFor] = useState("Doctor");
    const [error, setError] = useState("");
    const [selectImage, setSelectImage] = useState("kidney");
    const [selectImage1, setSelectImage1] = useState("Lungs");

    const [isLoading1, setIsLoading1] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);



    const handleFilterValueChange = (filteredType) => {
        console.log(filteredType);
    };

    // useEffect(() => {
    //     if (hospitals.length > 0) {
    //         setDefaultSelectedItemID(hospitals[0].id);
    //         setSelectedItemID(hospitals[0].id);
    //     }
    // }, [hospitals]);

    useEffect(() => {
        if (doctorsData.length > 0) {
            setDefaultSelectedItemIdDoctor(doctorsData[0].id);
            setSelectedItemIdDoctor(doctorsData[0].id);
        }
    }, [doctorsData]);

    useEffect(() => {
        setSelectedItemID(defaultSelectedItemID);

    }, [defaultSelectedItemID]);

    useEffect(() => {
        setSelectedItemIdDoctor(defaultSelectedItemIdDoctor);

    }, [defaultSelectedItemIdDoctor]);

    // Capitalize the first letter of each word
    function capitalizeString(str) {
        if (typeof str !== 'undefined') {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        } else {
            return ''; // Or handle the case when str is undefined in the way that suits your application
        }
    }
    // api params
    useEffect(() => {
        const fetchData = async () => {
            console.log(window.location);
            let myKeys = window.location.search;
            // console.log("k & V :", myKeys);
            let urlParams = new URLSearchParams(myKeys);
            let param1 = urlParams.get("search");
            let filterParams = new URLSearchParams(param1);
            let type = filterParams.get("type");
            let searchFor = filterParams.get("searchFor");
            let organ = filterParams.get("organ");
            let zipCode = filterParams.get("zip_code");

            setType(type);
            setOrgan(organ)
            searchForValue(searchFor);
            setZipCode(zipCode);

            console.log(type);
            try {
                const data = await fetchHospitals(type, zipCode);
                // setDoctors(data.results); 
                // setHospitals(data.results);
                setIsLoading(false);

                setUpdatedValue(type);
                console.log(valueUpdate)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Filter Pagination 
    const loadMore = () => {
        setShouldRunEffect(true);

        if (page < totalPages) {
            setPage(page + 1);
            setSelectedPage(selectedPage + 1)
        }
    };

    const loadMoreHospital = () => {
        setShouldRunEffect(true);

        if (pageHospital < totalPagesHospital) {
            setPageHospital(pageHospital + 1);
            setSelectedPageHospital(selectedPageHospital + 1)
        }
    };

    const openModals = (hospital) => {
        setSelectedHospital(hospital);
        setModalIsOpen(true);
    };
    const loadPrevious = () => {
        setShouldRunEffect(true);

        if (page > 1) {
            setPage(page - 1);
            setSelectedPage(selectedPage - 1)
        }
    };

    const loadPreviousHospital = () => {
        setShouldRunEffect(true);

        if (pageHospital > 1) {
            setPageHospital(pageHospital - 1);
            setSelectedPageHospital(selectedPageHospital - 1)
        }
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const numPageLinksToShow = 5;
        let startPage = Math.max(1, page - Math.floor(numPageLinksToShow / 1));
        let endPage = Math.min(totalPages, startPage + numPageLinksToShow);

        if (endPage - startPage < numPageLinksToShow) {
            startPage = Math.max(1, endPage - numPageLinksToShow + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const generatePageNumbersHospital = () => {
        const pageNumbers = [];
        const numPageLinksToShow = 5;
        let startPage = Math.max(1, pageHospital - Math.floor(numPageLinksToShow / 1));
        let endPage = Math.min(totalPagesHospital, startPage + numPageLinksToShow);

        if (endPage - startPage < numPageLinksToShow) {
            startPage = Math.max(1, endPage - numPageLinksToShow + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const selectedItemsData = selectedItems.map((itemId) => {
        const selectedItem = results.find((hospital) => hospital.id === itemId);
        return selectedItem;
    });

    const filteredResultsHospital = (hospitals || []).filter((hospital) => {
        if (searchTerm === "") {
            return true;
        } else if (hospital && hospital.facility_name && hospital.facility_name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }
        return false;
    });



    // popup start

    const handleTypeSelection = (selectedType) => {
        handleOptionClick(selectedType);
        // You can perform any logic here based on the selected type

        console.log('Selected Type :', selectedType);
        setType(selectedType);
        console.log("Selected Type:", selectedType);
        setType(selectedType);

    };

    useEffect(() => {
        // Additional logic to handle the default selection if needed
        if (type === "transplant") {
            handleOrganSelection("kidney");
        } else if (type === "oncology") {
            handleOrganSelection("lungs");
        }
    }, [type]);

    const handleOrganSelection = (selectedOrgan) => {
        setSelectImage(selectedOrgan);
        setSelectImage1(selectedOrgan)
        console.log("Selected Organ:", selectedOrgan);
        setOrgan(selectedOrgan);
    };

    const getOrganOptions = () => {

        if (type === "transplant") {
            return ["kidney", "lungs", "liver", "pancreas"];
        } else if (type === "oncology") {
            return [
                "lungs",
                "liver",
                "pancreas",
                "bile_duct",
                "adrenal",
                "rectum",
                "breast",
                "small intestine",
                "stomach",
                "colon",
            ];
        }
        return [];
    };

    const handleZipCodeClick = (zipCode) => {
        if (!selectedZipCodes.includes(zipCode)) {
            setSelectedZipCodes((prevSelectedZipCodes) => {
                const newCounters = { ...counters };
                const currentCount = newCounters[zipCode] || 0;

                if (currentCount >= 0) {
                    newCounters[zipCode] = currentCount + 1;
                } else {
                    newCounters[zipCode] = 1;
                }

                setCounters(newCounters);

                return [...prevSelectedZipCodes, zipCode];
            });
        }
        setSelectedZip("");
        setSearchedZipCodes([]);
    };

    const handleRemoveZipCode = (index) => {
        const removedZipCode = selectedZipCodes[index];

        setSelectedZipCodes((prevSelectedZipCodes) =>
            prevSelectedZipCodes.filter((_, i) => i !== index)
        );

        const newCounters = { ...counters };
        delete newCounters[removedZipCode];
        setCounters(newCounters);
    };

    const MessageComponent = ({ counters }) => {
        let countPlusOne = 0;
        let countPlusTwo = 0;
        for (const key in counters) {
            if (key !== "zipCode") {
                const count = counters[key];
                if (count === 1) {
                    countPlusOne++;
                } else if (count === 2) {
                    countPlusTwo++;
                }
            }
        }
        const totalCount = countPlusOne + countPlusTwo;

        if (totalCount >= 3) {
            const hiddenZipCode = `+${countPlusOne - 2}`;
            return (
                <div className="{{}} text-[#6E2FEB] bg-[#fff] p-1 rounded font-bold">
                    {hiddenZipCode}
                </div>
            );
        } else {
            return null;
        }
    };

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setSelectedZip("");
        setSearchedZipCodes([]);
        setSelectedZipCodes([]);
        setCounters({});
        if (tab === 0) {
            setShowInput(true);
            setselectedMutiple("Hospital");
        } else {
            setShowInput(false);
            setselectedMutiple("Doctor");
        }
    };

    const handleInputFocus = () => {
        setLoadingZip(true);
    };

    const validateForm = () => {
        if (!type || !organ) {
            setError("All fields are required.");
            return false;
        }
        setError("");
        return true;
    };

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };
    const handleSubmit = () => {
        if (validateForm()) {
            // Proceed with the form submission or navigation logic
            console.log("Form submitted:", { type, organ });
            // You can add navigation logic or API calls here
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setType(option); // Set the type when an option is selected
    };

    const handleOptionClick1 = (search) => {
        setselectedMutiple(search);
        setSearchFor(search); // Set the type when an option is selected
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setSelectedZip(input);

        if (/^\d{1,5}$/.test(input)) {
            const filteredZipCodes = zipCodes.filter((zipCode) =>
                zipCode.startsWith(input)
            );
            setSearchedZipCodes(filteredZipCodes);
        } else {
            setSearchedZipCodes([]);
        }
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    useEffect(() => {
        //  generatePageNumbers();
        // Check if data has loaded
        if (!isLoading1 || doctorsData.length > 0) {
            setDataLoaded(true);
        }
    }, [isLoading1, doctorsData]);

    // ============================================PAGINATION


    const handlePageClick = (pageNumber) => {
        setShouldRunEffect(true);

        if (pageNumber === 'prev' && page > 1) {
            if (page > 1) {
                setPage(page - 1);
                setSelectedPage(page - 1);
            }
        } else if (pageNumber === 'next' && page < totalPages) {
            if (page < totalPages) {
                setPage(page + 1);
                setSelectedPage(page + 1);
            }
        } else if (typeof pageNumber === 'number' && pageNumber !== selectedPage) {
            setPage(pageNumber);
            setSelectedPage(pageNumber);
        }
    };

    const handleButtonClick = (type) => {
        // Set shouldRunEffect to true when the user clicks Prev or Next button
        setShouldRunEffect(true);

        // Update the page based on the button type (Prev or Next)
        if (type === 'prev' && page > 1) {
            setPage(page - 1);
        } else if (type === 'next' && page < totalPages) {
            setPage(page + 1);
        }
    };

    // Result Load Code
    // useEffect(() => {
    //     async function loadResults() {

    //         let myKeys = window.location.search;
    //         // console.log("k & V :", myKeys);
    //         let urlParams = new URLSearchParams(myKeys);
    //         let param1 = urlParams.get("search");
    //         let filterParams = new URLSearchParams(param1);
    //         // let type = filterParams.get("type");
    //         // let searchFor = filterParams.get("searchFor");
    //         // let organ = filterParams.get("organ");
    //         let zipCode = filterParams.get("zip_code");

    //         const data = await fetchPaginatedDoctors(page, perPage);
    //         if (!currentZipCode) {
    //             setDoctors(data.results);
    //         }
    //         setTotalDataCount(data.count);
    //         setTotalPages(Math.ceil(data.count / perPage));
    //         if (data.results && data.results.length > 0) {
    //             setSelectedItemID(data.results[0].id);
    //         }
    //         setIsLoading(false);
    //     }
    //     loadResults();
    // }, [page, perPage]);

    // let myKeys = window.location.search;
    // console.log("k & V :", myKeys);
    // let urlParams = new URLSearchParams(myKeys);
    // let param1 = urlParams.get("search");
    // let filterParams = new URLSearchParams(param1);
    // // let type = filterParams.get("type");
    // // let searchFor = filterParams.get("searchFor");
    // // let organ = filterParams.get("organ");
    // let zipCode = filterParams.get("zip_code");

    useEffect(() => {

     
            async function loadResults() {

                const data = await fetchPaginatedDoctors(page, perPage);
                
                if (shouldRunEffect) {
                setDoctors(data.results);
                }
                setTotalDataCount(data.count);
                setTotalPages(Math.ceil(data.count / perPage));
                if (data.results && data.results.length > 0) {
                    // setSelectedItemID(data.results[0].id);
                }
                setIsLoading(false);
            }
            loadResults();

            setShouldRunEffect(false);    

    }, [shouldRunEffect, page, perPage]);



    //   =======================================================Hospital Pagination

    const handlePageClickHospital = (pageNumber) => {
        setShouldRunEffect(true);

        if (pageNumber === 'prev' && pageHospital > 1) {
            if (page > 1) {
                setPageHospital(pageHospital - 1);
                setSelectedPageHospital(pageHospital - 1);
            }
        } else if (pageNumber === 'next' && pageHospital < totalPagesHospital) {
            if (pageHospital < totalPagesHospital) {
                setPageHospital(pageHospital + 1);
                setSelectedPageHospital(pageHospital + 1);
            }
        } else if (typeof pageNumber === 'number' && pageNumber !== selectedPageHospital) {
            setPageHospital(pageNumber);
            setSelectedPageHospital(pageNumber);
        }
    };

    // Result Load Code
    useEffect(() => {

        let myKeys = window.location.search;
        // console.log("k & V :", myKeys);
        let urlParams = new URLSearchParams(myKeys);
        let param1 = urlParams.get("search");
        let filterParams = new URLSearchParams(param1);
        let type = filterParams.get("type");
        // let searchFor = filterParams.get("searchFor");
        // let organ = filterParams.get("organ");
        let zipCode = filterParams.get("zip_code");

        async function loadResults() {
            const data = await fetchPaginatedHospitals(pageHospital, perPageHospital);
            if (shouldRunEffect) {
            setHospitals(data.results);
        }
            setTotalDataCountHospital(data.count);
            setTotalPagesHospital(Math.ceil(data.count / perPageHospital));
            // if (data.results && data.results.length > 0) {
            //     setSelectedItemID(data.results[0].id);
            // }
            setIsLoading(false);
        }
        loadResults();
    }, [shouldRunEffect,pageHospital, perPageHospital]);

    return (
        <div>


            {shouldShowDoctorsData ? (
                <div className='text-center'>
                    <div className='flex p-4 items-center justify-center border-gray-200 mb-6'>
                        {/* Display "Data not found" message */}
                        <img className="min-w-[50px]" src="../images/search/DataNotAvailable.jpg" />
                    </div>
                    <a href='https://health-webpage.vercel.app/' className='shadow-md text-md md:text-lg font-semibold bg-[#6e2feb] text-[#fff] rounded-md px-5 py-4 sm:px-6 sm:py-4 hover:scale-105 duration-500 capitalize'>search again</a>
                </div>
            ) : (
                <div >
                    {/* Doctors Data Loaded */}
                    {dataState && <div>
                        {isLoading ? (<HWLoader />) : (
                            <>
                                <div className='w-full bg-[#fff] z-40 '>
                                    <Modal
                                        className='min-h-[100vh] overflow-hidden bg-[#fff] border-none'
                                        isOpen={compareModalIsOpen}
                                        onRequestClose={closeCompareModal}
                                        contentLabel="Compare Doctors"
                                    >
                                        <div className='relative sm:p-10 mt-16 mx-auto max-w-[1400px]'>
                                            <div className='absolute top-4 left-12 font-bold'>
                                                {showCheckboxes && (
                                                    <button
                                                        className="min-w-[4px] mr-2 rounded-[100px] gap-x-2.5 p-2.5 font-semibold text-[#fff] bg-[#6e2feb] hover:bg-[#6e2feb]"
                                                        onClick={() => {
                                                            closeCompareModal();
                                                            setShowCheckboxes(false);
                                                        }}><BsArrowLeft /></button>)}Compare Doctors
                                            </div>
                                            <div className="flex bg-[#fff] mt-10 border-t border-[#e4e9f2]">
                                                <div className="compareLeft w-[361px]">
                                                    <div className="flex flex-1 items-center py-10 gap-4 border-b min-h-[181px] min-w-[361px]">
                                                        <div>
                                                            <img className="min-w-[50px]" src="../images/search/compareDoctor.svg" />
                                                        </div>
                                                        <div className="font-semibold text-[#101426]">Doctor</div>
                                                    </div>

                                                    <div className="flex justify-start items-center py-10 gap-4 sm:h-[110px]">
                                                        <div>
                                                            <img className="min-w-[50px]" src="https://househealthinc.com/wp-content/themes/blocksy-child/images/specialities.svg" />
                                                        </div>
                                                        <div className="font-semibold text-[#101426]">Specialities</div>
                                                    </div>

                                                    <div className="hidden flex items-center justify-start gap-4 px-10 py-5 sm:h-[110px]">
                                                        <div>
                                                            <img className="min-w-[50px]" src="../images/search/affiliations.svg" />
                                                        </div>
                                                        <div className="font-semibold text-[#101426]">Board Certifications</div>
                                                    </div>

                                                    <div className="flex items-center justify-start gap-4 px-0 py-5 sm:h-[110px]">
                                                        <div>
                                                            <img className="min-w-[50px]" src="../images/search/affiliations.svg" />
                                                        </div>
                                                        <div className="font-semibold text-[#101426]">Hospital Affiliations</div>
                                                    </div>

                                                    <div className="flex items-center py-10 gap-4 sm:h-[140px]">
                                                        <div>
                                                            <img className="min-w-[50px]" src="../images/search/education_training.svg" />
                                                        </div>
                                                        <div className="font-semibold text-[#101426]">Education & Training</div>
                                                    </div>
                                                </div>{/* CompareLeft End */}

                                                <div className="compareRight scroll-smooth overflow-x-scroll custom-scrollbar">
                                                    <div className="flex justify-between gap-4 border-b border-[#e4e9f2]">
                                                        {selectedDoctors.map((doctor, index) => (
                                                            <div key={index} className={`flex-1 px-4 relative py-6 sm:min-w-[340px] min-h-[180px] ${index % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                                                                {index > 0 && (
                                                                    <button className="absolute top-4 right-6 cursor-pointer z-10" onClick={() => closeSelectedItem(doctor.id)}>X</button>
                                                                )}
                                                                <div className="font-bold text-lg hidden">
                                                                    {`${doctor.first_name}, ${doctor.last_name}`}
                                                                </div>
                                                                <div className="flex mb-2">
                                                                    <div className="pr-6 text-[#8F9BB3] font-semibold">NPI <span className='font-normal'>{`${doctor.npi}`}</span></div>
                                                                    <div className="px-6 flex items-center gap-2 text-[#8F9BB3] border-l">
                                                                        <PiGenderMaleLight className="text-2xl text-[#8F9BB3]" />
                                                                        {getFullGenderName(doctor.gender)}
                                                                    </div>
                                                                </div>
                                                                {doctor.phone_number.length > 0 && (
                                                                    <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center">
                                                                        <span><BsTelephone /></span> {`${doctor.phone_number}`}
                                                                    </div>
                                                                )}
                                                                <div className="w-full text-[#8F9BB3] py-1 gap-2 items-center flex mt-2">
                                                                    <span><SlLocationPin /></span> {capitalizeString(doctor.address_line_1)} {doctor.address_line_2} {doctor.state && `, ${doctor.state}`} {capitalizeString(doctor.city)} {doctor.zip_code}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* Specialities Row */}
                                                    <div className="flex items-center gap-4">
                                                        {selectedDoctors.map((doctor, index) => (
                                                            <div key={index} className={`flex items-center sm:min-w-[340px] h-[110px] px-4 ${index % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                                                                <p>{`${capitalizeString(doctor.primary_speciality)}`} {doctor.secondary_specialities.length > 0 && (<span>, {`${doctor.secondary_specialities}`}</span>)}</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center justify-between gap-4">
                                                        {selectedDoctors.map((doctor, index) => (
                                                            <div key={index} className={`flex items-center sm:min-w-[340px] min-h-[110px] px-4 ${index % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                                                                <p>Ascension Genesys Hospital</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Board Certifications */}
                                                    <div className="flex justify-between text-left hidden">
                                                        {selectedDoctors.map((doctor, index) => (
                                                            <div key={index} className={`sm:min-w-[340px] min-h-[110px] px-4 py-5 min-w-[25%] items-center flex ${index % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                                                                <div>
                                                                    <p>Sample certification name</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Education & Training */}
                                                    <div className="flex justify-between text-left gap-4">
                                                        {selectedDoctors.map((doctor, index) => (
                                                            <div key={index} className={`flex items-center sm:min-w-[340px] min-h-[130px] px-4 ${index % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                                                                <p>{`${capitalizeString(doctor.medical_school)}`}, {`${capitalizeString(doctor.graduation_year)}`}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* ###CompareRight End */}
                                            </div>
                                        </div>
                                    </Modal>
                                </div>

                                {/* Filter Form Result Start here */}
                                <Modal className='transition duration-150 ease-out md:ease-in max-w-[100%] sm:w-[485px] bg-[#fff] px-6 py-0 border rounded-md shadow-md mt-4 fixed right-2 top-24 z-50'
                                    isOpen={filterModalIsOpen}
                                    onRequestClose={closeFilterModal}
                                    contentLabel="Filter Doctors">

                                    {showPopup && <FilterPopup
                                        // isOpen={filterModalIsOpen}
                                        onCancel={cancelFilter}
                                        applyFilter={applyFilter}
                                        defaultValues={defaultValues}
                                    />}
                                </Modal>{/* ## End Filter Form here */}

                                <div className='bg-[#fff] border-b border-[#e4e9f2]'>
                                    <div className='flex items-center justify-between p-4 max-w-[1355px] mx-auto'>
                                        {/* HW Filter Top Left */}
                                        <div className=''>
                                            <p className='text-[17px]'>
                                                {dataLoaded && (
                                                    <>
                                                        Showing{' '}
                                                        <span className='font-bold text-[#101426CC]'>{doctorsData.length}</span> doctors for
                                                        <span className='font-bold capitalize text-[#101426CC]'>
                                                            {''} {currentType}, {currentOrgan}
                                                        </span>
                                                        {currentZipCode && (
                                                            <>
                                                                {' '}
                                                                in <span className='font-bold text-[#101426CC]'>Zipcode:{currentZipCode}</span>
                                                            </>
                                                        )}
                                                        {currentZipCode1 && (
                                                            <>
                                                                {' '}
                                                                in <span className='font-bold text-[#101426CC]'>ZipCode:{currentZipCode1}</span>
                                                            </>
                                                        )}
                                                        {/* {!isLoading1 || doctorsData.length === 0 && (
                                                            <p className='text-red-500 font-bold'>Data not found</p>
                                                        )} */}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        {/* HW Filter Top Right */}
                                        <div className='flex items-center gap-5'>
                                            <div className=''>

                                                {doctorsData.length > 1 && (
                                                    <button onClick={() => setShowCheckboxes(true)} active={selectedItems.length !== 0}>
                                                        Compare
                                                    </button>
                                                )}
                                            </div>
                                            {showSearchBar && (
                                                   <div className='hwFilter text-[#6e2feb]'>
                                                   <button className='flex gap-2 items-center' onClick={togglePopup}>
                                                       <BiFilterAlt className='flex items-center text-[#6e2feb]' /> Filter
                                                   </button>
                                               </div>  
                                            )}
                                       
                                        </div>
                                    </div>
                                </div>
                                {/* Search Result Start here */}


                                <div className="max-w-[1355px] mx-auto searhResults ease-in duration-300">
                                    <div className='searchResultsDiv bg-[#fff]'>
                                        <div className='flex flex-col items-start sm:flex-row justify-between' >
                                            <div className='basis-1/3 relative px-4 sm:px-0 border-r border-[#e4e9f2]'>
                                            {showSearchBar && (
                                                 <div className='searchBox p-4 relative'>
                                                 <input
                                                     className="placeholder:text-slate-400 block bg-[#F7F9FC] w-full border border-[#EDF1F7]-300 rounded px-2.5 py-3 shadow-sm focus:outline-none focus:border-[#6E2FEB]-500 focus:ring-[#6E2FEB]-500 focus:ring-1 sm:text-sm"
                                                     placeholder="Search"
                                                     type="text"
                                                     value={searchTerm}
                                                     onChange={handleSearchInputChange}
                                                 />
                                                 {searchTerm.length === 0 && (
                                                     <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                         <RiSearchLine />
                                                     </div>
                                                 )}
                                                 {filteredResults.length === 0 && filteredResultsdoctor.length === 0 && searchTerm.length > 2 && (
                                                     <div className="mt-14 text-[#11182799] text-center font-medium text-[14px]">
                                                         <img src="../images/search/HwSearch.png" alt="No matching search results found" className="mx-auto mb-4" />
                                                         No matching search results found
                                                     </div>
                                                 )}

                                             </div>    
                                                    )}

                                                {filteredResultsdoctor.map((doctor, index) => (
                                                    <div
                                                        onClick={() => {
                                                            handleItemClick1(doctor.id);
                                                            handleItemClick1(doctor.id);
                                                        }
                                                        }
                                                        key={index}
                                                        className={`rounded mb-2 sm:rounded-[0px] searchresultLists ease-in min-h-[150px] duration-300 cursor-pointer bg-[#f7f9fc] pl-8 pr-5 pt-4 pb-4 border-l-[6px] 
                           ${
                                                            // console.log(doctor.id),
                                                            defaultSelectedItemIdDoctor === doctor.id ? 'border-[#6e2feb]' : 'border-transparent'
                                                            } ${selectedItemIdDoctor === doctor.id ? 'bg-[#fff]' : ''}`
                                                        }>
                                                        <div className="flex justify-between items-center w-full mb-3 relative">
                                                            <div className='absolute -left-6 top-0'>
                                                                {showCheckboxes && (
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedItems.includes(doctor.id)}
                                                                        onChange={() => toggleSelectItem(doctor.id)}
                                                                        className='w-4 h-4 rounded-none checked:bg-pink-500'
                                                                    />
                                                                )}
                                                            </div>
                                                            <h3 onClick={() => openModal(doctor)} className="cursor-pointer text-[#101426CC] font-extrabold">
                                                                {`${capitalizeString(doctor.first_name)}, ${capitalizeString(doctor.last_name)}`}</h3>
                                                            <div className="flex">
                                                                <PiShareNetwork className="text-2xl text-[#8F9BB3]" />
                                                            </div>
                                                        </div>
                                                        <div className="filterServices text-xs font-normal flex justify-start gap-2 items-center mb-2 cursor-pointer">
                                                            <span
                                                                onClick={() => toggleZipCode(doctor.id)}
                                                                className={`span_violet rounded-md bg-[#f0f5ff] text-[#1d39c4] border border-[#d6e4ff] ${doctor.primary_speciality ? 'py-1 px-2' : 'py-0 px-0'}`}>
                                                                {capitalizeString(doctor.primary_speciality)}
                                                            </span>

                                                            {doctor.secondary_specialities.length > 0 && (
                                                                <span
                                                                    onClick={() => toggleZipCode(doctor.id)}
                                                                    className="span_violet rounded-md bg-[#FFF7E6] text-[#D46B08] border py-1 px-2"
                                                                >
                                                                    {capitalizeString(doctor.secondary_specialities.toString())}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {doctor.phone_number.length > 0 && (
                                                            <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center cursor-pointer">
                                                                <span onClick={() => toggleZipCode(doctor.id)}><BsTelephone /> </span>
                                                                {doctor.phone_number}
                                                            </div>
                                                        )}
                                                        <div onClick={() => toggleZipCode(doctor.id)} className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center">
                                                            <span><SlLocationPin /> </span>
                                                            {capitalizeString(doctor.address_line_1)}
                                                            {capitalizeString(doctor.address_line_2)}
                                                            {capitalizeString(doctor.state)}<>, </>
                                                            {capitalizeString(doctor.city)}<>, </>
                                                            {capitalizeString(doctor.zip_code)}
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* ###Filter Pagination Start*/}
                                                <div className='hwFitlerPagination mt-4 text-center'>
                                                    {shouldShowFiltrationDoctors && (
                                                        <div className='flex p-4 items-center justify-center gap-1 border-gray-200'>
                                                            <button
                                                                className='inline-flex shadow-md items-center rounded-md text-sm px-3 py-2 text-gray-600 ring-1 hover:text-[#fff] ring-inset bg-[#f7f9fc] hover:bg-[#6E2FEB] ring-gray-100 focus:z-20 focus:outline-offset-0'
                                                                onClick={loadPrevious}
                                                                disabled={page === 1}
                                                            >
                                                                Prev
                                                            </button>

                                                            {generatePageNumbers().map((pageNumber) => (
                                                                <button
                                                                    style={{
                                                                        backgroundColor: selectedPage === pageNumber ? '#6E2FEB' : 'initial',
                                                                        color: selectedPage === pageNumber ? 'white' : 'initial'
                                                                    }}
                                                                    className='relative inline-flex shadow-md items-center px-4 py-2 text-sm font-semibold text-gray-900 hover:text-[#fff] bg-[#f7f9fc] rounded-md ring-1 ring-inset ring-gray-100 hover:bg-[#6E2FEB] focus:z-20 focus:outline-offset-0'
                                                                    key={pageNumber}
                                                                    onClick={() => handlePageClick(pageNumber)}
                                                                >
                                                                    {pageNumber}
                                                                </button>
                                                            ))}

                                                            <p className='hidden'>
                                                                <span className='relative shadow-md inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 rounded-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                                                                    ...
                                                                </span>{' '}
                                                                {totalDataCount}
                                                            </p>

                                                            <button
                                                                className='shadow-md inline-flex items-center bg-[#f7f9fc] rounded-md text-sm px-3 py-2 ring-1 ring-inset hover:text-[#fff] text-grey-600 hover:bg-[#6E2FEB] ring-gray-100 focus:z-20 focus:outline-offset-0'
                                                                onClick={loadMore}
                                                                disabled={page === totalPages}
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    )}

                                                </div>
                                                {/* ###Filter Pagination End*/}

                                                <div className='filterCompareBtns sticky bottom-0 left-4 right-10 z-1 bg-[#fff] p-4 max-w-[480px] -shadow-sm'>
                                                    <div className='flex items-center justify-end gap-[10px]'>
                                                        <div className=''>
                                                            {showCheckboxes && (
                                                                <button className='min-w-[104px] px-4 py-2.5 rounded-md font-semibold text-gray-900 hover:bg-gray-100' onClick={() => setShowCheckboxes(false)} active={selectedItems.length === 0}>Cancel</button>
                                                            )}
                                                        </div>
                                                        <div className=''>
                                                            {showCheckboxes && (
                                                                <button className="min-w-[104px] px-4 py-2.5 font-semibold text-[#fff] rounded-md bg-[#6e2feb] hover:bg-[#6e2feb]" onClick={OpenCompareModal}>Compare</button>
                                                            )}
                                                        </div>

                                                    </div>
                                                </div>
                                                {/* ###Filter Comparebtns End*/}
                                            </div>

                                            {/* ###Filter Details Start*/}
                                            <div className='p-10 basis-2/3 sm:sticky top-[30px] ease-in duration-300'>
                                                {selectedItemIdDoctor && (
                                                    <div>
                                                        {doctorsData.map((doctor, index) => (
                                                            // console.log(doctor.id,selectedItemID),
                                                            doctor.id === selectedItemIdDoctor && (
                                                                <div key={index} className='detailsInner w-full'>
                                                                    <div className="py-4 detailsTitle text-[#101426]">
                                                                        <h2 className="text-3xl font-bold m-b-3 text-[#101426]">
                                                                            {`${capitalizeString(doctor.first_name)}, ${capitalizeString(doctor.last_name)}`}
                                                                        </h2>
                                                                        <div class="flex space-x-4 py-4 text-sm font-medium">
                                                                            <div class="flex-auto flex justify-start items-center font-semibold">
                                                                                <div className="mr-6 flex items-center gap-2 cursor-pointer shareBTN" onClick={toggleShare}>
                                                                                    <PiShareNetwork className="text-2xl text-[#8F9BB3] cursor-pointer" /> Share
                                                                                    {isShareOpen && <HwShareon id={doctor.id} value={'Doctor'} onClose={toggleShare} />}
                                                                                </div>
                                                                                <div class="px-6 border-x">NPI: {doctor.npi}
                                                                                </div>
                                                                                <div class="px-6 flex items-center gap-2">
                                                                                    <PiGenderMaleLight className="text-2xl text-[#8F9BB3]" />
                                                                                    {getFullGenderName(doctor.gender)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='detailsSpeclty py-6 flex justify-space gap-3 items-center border-t border-[#E4E9F2]-500'>
                                                                            <div className=''><img src='https://househealthinc.com/wp-content/themes/blocksy-child/images/specialities.svg' /></div>
                                                                            <div className=''><p>Specialities</p>
                                                                                <ul className='list-none flex gap-2 font-semibold text-[#101426]'>
                                                                                    <li className='text-[#101426]'><span>{capitalizeString(doctor.primary_speciality)}</span>
                                                                                        {doctor.secondary_specialities.length > 0 && (
                                                                                            <span>
                                                                                                , {capitalizeString(doctor.secondary_specialities.toString())}
                                                                                            </span>
                                                                                        )}</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="py-6 border-y border-[#E4E9F2]-500 mb-5">
                                                                            {doctor.phone_number.length > 0 && (
                                                                                <div className="w-full text-[#101426] py-1 flex justify-start gap-2 items-center"><span><BsTelephone /> </span>
                                                                                    {doctor.phone_number}
                                                                                </div>)}
                                                                            <div className="w-full text-[#101426] py-1 flex justify-start gap-2 items-center"><span><SlLocationPin /> </span>
                                                                                {capitalizeString(doctor.address_line_1)}
                                                                                {capitalizeString(doctor.address_line_2)}
                                                                                {capitalizeString(doctor.state)}<>, </>
                                                                                {capitalizeString(doctor.city)}<>, </>
                                                                                {capitalizeString(doctor.zip_code)}
                                                                            </div>
                                                                        </div>
                                                                        <div className='py-4 flex sm:items-center gap-1'>
                                                                            <div className="mr-0 min-w-[70px]">
                                                                                <img src="../images/search/affiliations.svg" /></div>
                                                                            <div className='w-full'>
                                                                                <p>Hospital Affiliations</p>
                                                                                <p className='font-bold'>Ascension Genesys Hospital</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='py-4 flex sm:items-center gap-1'>
                                                                            <div className="min-w-[70px]">
                                                                                <img src="../images/search/certifications.svg" /></div>
                                                                            <div className='w-full'>
                                                                                <p>Board Certifications</p>
                                                                                <p className='font-bold'>Sample certification name</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='py-4 flex sm:items-center gap-1 pb-2'>
                                                                            <div className="min-w-[70px]">
                                                                                <img src="../images/search/education_training.svg" /></div>
                                                                            <div className='w-full'>
                                                                                <p>Education and Training</p>
                                                                                <p className='font-bold'>
                                                                                    {capitalizeString(doctor.medical_school)}<>, </>
                                                                                    {capitalizeString(doctor.graduation_year)}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <MedicareNote />
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Detail Popup Start Here */}
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Doctor Details"
                                    className='w-full bg-[#fff] min-h-[100vh] pt-14 border-t mt-4'
                                >
                                    {selectedDoctor && (
                                        <div className='singleDetails p-0 sm:p-10 max-w-[1355px] mx-auto'>

                                            <button
                                                className='bg-[#F5F0FF] p-3 sm:px-4 sm:py-3 mt-4 rounded-[100px] ml-5'
                                                onClick={closeModal}>
                                                <GrClose className='text-xl' />
                                            </button>

                                            <div className='p-5 flex justify-between'>
                                                <div>
                                                    <h1 className='font-bold text-md sm:text-2xl md:text-3xl'>
                                                        {`${capitalizeString(selectedDoctor.first_name)}, ${capitalizeString(selectedDoctor.last_name)}`}</h1>
                                                    <div className='flex gap-2 pt-4'>
                                                        <div className=''>
                                                            <p>NPI: <span className='font-bold'>{`${selectedDoctor.npi}`}</span></p>
                                                        </div>
                                                        <div class="px-6 flex items-center gap-2">
                                                            <PiGenderMaleLight className="text-2xl text-[#8F9BB3]" />
                                                            <p className='font-bold'>{getFullGenderName(selectedDoctor.gender)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden flex h-10 sm:h-11 gap-2 text-md sm:text-md font-bold text-[#6e2feb] py-2 rounded-md px-3 bg-[#F5F0FF]">
                                                    <PiShareNetwork className="text-md sm:text-xl md:text-md text-[#6e2feb] font-bold top-1 relative" /> Share
                                                </div>
                                            </div>

                                            <div className='flex items-center sm:items-start p-5 gap-3 border-t'>
                                                <div className=''>
                                                    <img src="./images/Specialities.svg"
                                                        alt="Emergency Service"
                                                    />
                                                </div>
                                                <div className='mt-1'>
                                                    <p>Specialities type</p>
                                                    <p className='font-bold'>{`${capitalizeString(selectedDoctor.primary_speciality)}`}
                                                        {selectedDoctor.secondary_specialities.length > 0 && (
                                                            <span>, {selectedDoctor.secondary_specialities.map((speciality, index) => (
                                                                <span key={index}>{`${capitalizeString(speciality)}`}{index !== selectedDoctor.secondary_specialities.length - 1 ? ', ' : ''}</span>
                                                            ))}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='p-6 border-y'>
                                                {selectedDoctor.phone_number.length > 0 && (
                                                    <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center">
                                                        <span><BsTelephone /> </span> {`${selectedDoctor.phone_number}`}
                                                    </div>)}
                                                <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center"><span><SlLocationPin /> </span>
                                                    {capitalizeString(selectedDoctor.address_line_1)}
                                                    {capitalizeString(selectedDoctor.address_line_2)}
                                                    {capitalizeString(selectedDoctor.state)}<>, </>
                                                    {capitalizeString(selectedDoctor.city)}<>, </>
                                                    {capitalizeString(selectedDoctor.zip_code)}
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-6 border-b gap-10 sm:items-start'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='min-w-[60px]'>
                                                        <img src="./images/HospitalType.png"
                                                            alt="Emergency Service"
                                                        />
                                                    </div>
                                                    <div className=''>
                                                        <p>Hospital Affiliations</p>
                                                        <p className='font-bold'>Ascension Genesys Hospital</p>
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <div className='flex items-center gap-3'>
                                                        <div className=' min-w-[60px]'>
                                                            <img src="./images/BoardCertificate.png"
                                                                alt="Emergency Service"
                                                            />
                                                        </div>
                                                        <div className=''>
                                                            <p>Board Certifications</p>
                                                            <p className='font-bold'>Sample Certifications Name</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='min-w-[60px] '>
                                                            <img src="./images/Education&Training.png"
                                                                alt="Emergency Service"
                                                            />
                                                        </div>
                                                        <div className=''>
                                                            <p>Education and Training</p>
                                                            <p className='font-bold'>{`${capitalizeString(selectedDoctor.medical_school)}`}, {`${capitalizeString(selectedDoctor.graduation_year)}`}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <MedicareNote />
                                </Modal>
                            </>
                        )}
                    </div>}


                </div>
            )}


            {shouldShowHospitalsData ? (
                <div className='text-center'>
                    <div className='flex p-4 items-center justify-center border-gray-200 mb-6'>
                        {/* Display "Data not found" message */}
                        <img className="min-w-[50px]" src="../images/search/DataNotAvailable.jpg" />
                    </div>
                    <a href='https://health-webpage.vercel.app/' className='shadow-md text-md md:text-lg font-semibold bg-[#6e2feb] text-[#fff] rounded-md px-5 py-4 sm:px-6 sm:py-4 hover:scale-105 duration-500 capitalize'>search again</a>
                </div>
            ) : (
                <div >
                    {/* Hospital Data Loaded */}
                    {!dataState && <div>
                        {isLoading ? (<HWLoader />) : (
                            <>
                                <div className='w-full bg-[#fff] z-40'>
                                    <Modal
                                        className='min-h-[100vh] overflow-hidden bg-[#fff] border-none'
                                        isOpen={compareModalIsOpen}
                                        onRequestClose={closeCompareModal}
                                        contentLabel="Compare Hospitals"
                                    >
                                        <div className='relative sm:p-10 mt-16 mx-auto '>
                                            <div className='absolute top-4 left-12 font-bold'>
                                                {showCheckboxes && (
                                                    <button
                                                        className="min-w-[4px] mr-2 rounded-[100px] gap-x-2.5 p-2.5 font-semibold text-[#fff] bg-[#6e2feb] hover:bg-[#6e2feb]"
                                                        onClick={() => {
                                                            closeCompareModal();
                                                            setShowCheckboxes(false);
                                                        }}><BsArrowLeft /></button>)}Compare Hospitals
                                            </div>

                                            <div className="flex bg-[#fff] mt-10 border-t border-[#e4e9f2]">
                                                <div className="compareLeft w-[361px]">
                                                    <div className="flex flex-1 items-center py-10 gap-4 border-b min-h-[181px] min-w-[361px]">
                                                        <div>
                                                            <img className="min-w-[50px]" src="../images/search/compareDoctor.svg" />
                                                        </div>
                                                        <div className="font-semibold text-[#101426]">Hospital</div>
                                                    </div>

                                                    <div className="flex items-center justify-start gap-4 py-5 sm:h-[140px]">
                                                        <div>
                                                            <img className="min-w-[50px]" src="../images/search/affiliations.svg" />
                                                        </div>
                                                        <div className="font-semibold text-[#101426]">Hospital Type</div>
                                                    </div>

                                                    <div className="flex items-center justify-start gap-4 px-0 py-5 sm:h-[140px]">
                                                        <div>
                                                            <img className="min-w-[50px]" src="../images/EmergencyService.png" />
                                                        </div>
                                                        <div className="font-semibold text-[#101426]">Emergency Services</div>
                                                    </div>

                                                    <div className="flex items-center py-10 gap-4 sm:h-[140px]">
                                                        <div>
                                                            <img className="min-w-[50px]" src="../images/search/education_training.svg" />
                                                        </div>
                                                        <div className="font-semibold text-[#101426]">Hospital Ownership</div>
                                                    </div>
                                                </div>{/* CompareLeft End */}

                                                <div className="compareRight scroll-smooth overflow-x-scroll custom-scrollbar">
                                                    <div className="flex justify-between gap-4 border-b border-[#e4e9f2]">
                                                        {selectedHospitals.map((hospital, index) => (
                                                            <div key={index} className={`flex-1 px-4 relative py-6 sm:min-w-[370px] min-h-[180px] ${index % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                                                                {index > 0 && (
                                                                    <button className="absolute top-4 right-6 cursor-pointer z-10" onClick={() => closeSelectedItem1(hospital.id)}>X</button>
                                                                )}
                                                                <div className="font-bold text-lg hidden">
                                                                    {`${hospital.facility_name}`}
                                                                </div>
                                                                <div className="mb-2 flex">
                                                                    <div className="flex items-center pr-6 text-[#8F9BB3] font-semibold">
                                                                        <div className='min-w-[120px]'>NPI Facility ID:</div>
                                                                        <div className='font-normal'>{`${hospital.facility_id}`}</div>
                                                                    </div>
                                                                    <div className="px-6 flex items-center text-[#8F9BB3] border-l">

                                                                        {hospital.hospital_overall_rating >= 1 ? (
                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                        ) : (
                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                        )}
                                                                        {hospital.hospital_overall_rating >= 2 ? (
                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                        ) : (
                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                        )}
                                                                        {hospital.hospital_overall_rating >= 3 ? (
                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                        ) : (
                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                        )}
                                                                        {hospital.hospital_overall_rating >= 4 ? (
                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                        ) : (
                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                        )}
                                                                        {hospital.hospital_overall_rating >= 5 ? (
                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                        ) : (
                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {hospital.phone_number.length > 0 && (
                                                                    <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center">
                                                                        <span><BsTelephone /></span> {`${hospital.phone_number}`}
                                                                    </div>
                                                                )}
                                                                <div className="w-full text-[#8F9BB3] py-1 gap-2 items-center flex gap-2 mt-2">
                                                                    <span><SlLocationPin /> </span>
                                                                    {`${capitalizeString(hospital.address)}, ${capitalizeString(hospital.state), (hospital.city), (hospital.zip_code)} `}

                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* Hospital Type Row */}
                                                    <div className="H_T flex items-center gap-4">
                                                        {selectedHospitals.map((hospital, index) => (
                                                            <div key={index} className={`flex items-center sm:min-w-[370px] h-[140px] px-4 py-5 ${index % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                                                                <p className='flex items-center'>{hospital.hospital_type}</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Emergency Service */}
                                                    <div className="E_S flex items-center gap-4">
                                                        {selectedHospitals.map((hospital, index) => (
                                                            <div key={index} className={`flex items-center sm:min-w-[370px] min-h-[140px] px-4 py-5 min-w-[25%] items-center flex-1 ${index % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                                                                <div>
                                                                    <p>
                                                                        {hospital.emergency_services ? (
                                                                            <span>Yes</span>
                                                                        ) : (
                                                                            <span>No</span>
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Hospital Honorship */}
                                                    <div className="H_N flex text-left gap-4 ">
                                                        {selectedHospitals.map((hospital, index) => (
                                                            <div key={index} className={`min-h-[140px] flex items-center sm:min-w-[370px] px-4 py-5 ${index % 2 === 0 ? 'bg-[#f7f9fc]' : 'bg-white'}`}>
                                                                <p className=''>{hospital.hospital_ownership}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* ###CompareRight End */}
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                                <div className='bg-[#fff] border-b border-[#e4e9f2]'>
                                    <div className='flex items-center justify-between p-4 max-w-[1355px] mx-auto'>
                                        {/* HW Filter Top Left */}
                                        <div className=''>
                                            <p className='text-[17px]'>
                                                Showing <span className='font-bold text-[#101426CC]'>{hospitals.length}</span> hospital for
                                                <span className='font-bold capitalize text-[#101426CC]'>
                                                    {''} {currentType}
                                                </span>
                                                {currentZipCode && (
                                                    <>
                                                        {' '}
                                                        in <span className='font-bold text-[#101426CC]'>Zipcode:{currentZipCode}</span>
                                                    </>
                                                )}
                                                {currentZipCode1 && (
                                                    <>
                                                        {' '}
                                                        in <span className='font-bold text-[#101426CC]'>Zipcodes:{currentZipCode1}</span>
                                                    </>
                                                )}
                                            </p>
                                            <p>
                                                {/* {doctorsData.length === 0 && (
                                            <>
                                                {' '}
                                                <span className='font-bold text-red-500 flex justify-center'>Data not found</span>
                                            </>
                                        )} */}
                                            </p>
                                        </div>
                                        {/* HW Filter Top Right */}
                                        <div className='flex items-center gap-5'>
                                            <div className=''>
                                                {hospitals.length > 1 && (
                                                    <button onClick={() => setShowCheckboxes(true)} active={selectedItems.length !== 0}>
                                                        Compare
                                                    </button>
                                                )}
                                            </div>
                                            <div className='hwFilter text-[#6e2feb]'>
                                                <button className='flex gap-2 items-center' onClick={openFilterModal}>
                                                    <BiFilterAlt className='flex items-center text-[#6e2feb]' /> Filter
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="max-w-[1355px] mx-auto searhResults ease-in duration-300">
                                    {/* Search Result Start here */}
                                    <div className='searchResultsDiv bg-[#fff]'>
                                        <div className='flex flex-col items-start sm:flex-row justify-between' >
                                            <div className='basis-1/3 relative px-4 sm:px-0 border-r border-[#e4e9f2]'>
                                                <div className='searchBox p-4 relative'>
                                                    <input
                                                        className="placeholder:text-slate-400 text-2xl block bg-[#F7F9FC] w-full border border-[#EDF1F7]-300 rounded px-2.5 py-3 shadow-sm focus:outline-none focus:border-[#6E2FEB]-500 focus:ring-[#6E2FEB]-500 focus:ring-1 sm:text-sm"
                                                        placeholder="Search"
                                                        type="text"
                                                        value={searchTerm}
                                                        onChange={handleSearchInputChange}
                                                    />
                                                    {searchTerm.length === 0 && (
                                                        <div className="ease-in-out duration-500 absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                            <RiSearchLine className='text-2xl' />
                                                        </div>
                                                    )}
                                                    {filteredResults.length === 0 && filteredResultsHospital.length === 0 && searchTerm.length > 2 && (
                                                        <div className="mt-14 text-[#11182799] text-center font-medium text-[14px]">
                                                            <img src="../images/search/HwSearch.png" alt="No matching search results found" className="mx-auto mb-4" />
                                                            No matching search results found
                                                        </div>
                                                    )}

                                                </div>

                                                {/* working start */}
                                                {filteredResultsHospital.map((hospital, index) => (
                                                    <div
                                                        onClick={() => {
                                                            handleItemClick(hospital.id);
                                                            handleItemClick(hospital.id);
                                                        }
                                                        }
                                                        key={index}
                                                        className={`rounded mb-2 sm:rounded-[0px] searchresultLists ease-in min-h-[150px] duration-300 cursor-pointer bg-[#f7f9fc] pl-8 pr-5 pt-4 pb-4 border-l-[6px] 
                                                  ${
                                                            // console.log(doctor.id[0]),
                                                            defaultSelectedItemID === hospital.id ? 'border-[#6e2feb]' : 'border-transparent'
                                                            } ${selectedItemID === hospital.id ? 'bg-[#fff]' : ''}`
                                                        }>      
                                                        <div className="flex justify-between items-center w-full mb-3 relative">
                                                            <div className='absolute -left-6 top-0'>
                                                                {showCheckboxes && (
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedItems.includes(hospital.id)}
                                                                        onChange={() => toggleSelectItem(hospital.id)}
                                                                        className='w-4 h-4 rounded-none checked:bg-pink-500'
                                                                    />
                                                                )}
                                                            </div>
                                                            <h3 onClick={() => openModals(hospital)}
                                                                className="cursor-pointer text-[#101426CC] font-extrabold">
                                                                {`${capitalizeString(hospital.facility_name)}`} {`${capitalizeString(hospital.last_name)}`}
                                                            </h3>
                                                            <div className="flex">
                                                                <PiShareNetwork className="text-2xl text-[#8F9BB3]" />
                                                            </div>
                                                        </div>
                                                        <div className="filterServices text-xs font-normal flex justify-start gap-2 items-center mb-2 cursor-pointer">
                                                            <span
                                                                onClick={() => toggleZipCode(hospital.id)}
                                                                className={`span_violet rounded-md bg-[#f0f5ff] text-[#1d39c4] border border-[#d6e4ff] ${hospital.hospital_type ? 'py-1 px-2' : 'py-0 px-0'}`}>
                                                                {hospital.hospital_type}
                                                            </span>
                                                            <span
                                                                onClick={() => toggleZipCode(hospital.id)}
                                                                className="flex relative border-[#95de64] rounded-md bg-[#f6ffed] text-[#95de64] border py-1 px-2"
                                                            >{hospital.emergency_services ? (
                                                                <BiCheck className='h-[16px] w-[16px] text-6xl leading-1' />
                                                            ) : (
                                                                <></>
                                                            )} Emergency Services
                                                            </span>
                                                        </div>
                                                        {hospital.phone_number.length > 0 && (
                                                            <div className="w-full text-[#101426] py-1 flex justify-start gap-2 items-center cursor-pointer">
                                                                <span onClick={() => toggleZipCode(hospital.id)}><BsTelephone /> </span>
                                                                {hospital.phone_number}
                                                            </div>
                                                        )}
                                                        <div onClick={() => toggleZipCode(hospital.id)} className="w-full text-[#101426] py-1 flex justify-start gap-2 items-center">
                                                            <span><SlLocationPin /> </span>
                                                            {`${capitalizeString(hospital.address)}`}<>, </>
                                                            {`${capitalizeString(hospital.city)}`}<>, </>
                                                            {`${capitalizeString(hospital.state)}`}<>, </>
                                                            {`${capitalizeString(hospital.zip_code)}`}
                                                        </div>

                                                        <div className='flex hospitalReview mt-4'>
                                                            {hospital.hospital_overall_rating >= 1 ? (
                                                                <AiFillStar className='text-[#ffa940] text-xl' />
                                                            ) : (
                                                                <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                            )}
                                                            {hospital.hospital_overall_rating >= 2 ? (
                                                                <AiFillStar className='text-[#ffa940] text-xl' />
                                                            ) : (
                                                                <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                            )}
                                                            {hospital.hospital_overall_rating >= 3 ? (
                                                                <AiFillStar className='text-[#ffa940] text-xl' />
                                                            ) : (
                                                                <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                            )}
                                                            {hospital.hospital_overall_rating >= 4 ? (
                                                                <AiFillStar className='text-[#ffa940] text-xl' />
                                                            ) : (
                                                                <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                            )}
                                                            {hospital.hospital_overall_rating >= 5 ? (
                                                                <AiFillStar className='text-[#ffa940] text-xl' />
                                                            ) : (
                                                                <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* working  */}


                                                {/* ###Filter Pagination Start*/}
                                                <div className='hwFitlerPagination mt-4 text-center'>
                                                    {shouldShowFiltrationHospitals && (
                                                        <div className='flex p-4 items-center justify-center gap-1 border-gray-200'>
                                                            <button
                                                                className='inline-flex shadow-md items-center rounded-md text-sm px-3 py-2 text-gray-600 ring-1 hover:text-[#fff] ring-inset bg-[#f7f9fc] hover:bg-[#6E2FEB] ring-gray-100 focus:z-20 focus:outline-offset-0'
                                                                onClick={loadPreviousHospital}
                                                                disabled={pageHospital === 1}
                                                            >
                                                                Prev
                                                            </button>

                                                            {generatePageNumbersHospital().map((pageNumber) => (
                                                                <button
                                                                    style={{
                                                                        backgroundColor: selectedPageHospital === pageNumber ? '#6E2FEB' : 'initial',
                                                                        color: selectedPageHospital === pageNumber ? 'white' : 'initial'
                                                                    }}
                                                                    className='relative inline-flex shadow-md items-center px-4 py-2 text-sm font-semibold text-gray-900 hover:text-[#fff] bg-[#f7f9fc] rounded-md ring-1 ring-inset ring-gray-100 hover:bg-[#6E2FEB] focus:z-20 focus:outline-offset-0'
                                                                    key={pageNumber}
                                                                    onClick={() => handlePageClickHospital(pageNumber)}
                                                                >
                                                                    {pageNumber}
                                                                </button>
                                                            ))}

                                                            <p className='hidden'>
                                                                <span className='relative shadow-md inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 rounded-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                                                                    ...
                                                                </span>{' '}
                                                                {totalDataCountHospital}
                                                            </p>

                                                            <button
                                                                className='shadow-md inline-flex items-center bg-[#f7f9fc] rounded-md text-sm px-3 py-2 ring-1 ring-inset hover:text-[#fff] text-grey-600 hover:bg-[#6E2FEB] ring-gray-100 focus:z-20 focus:outline-offset-0'
                                                                onClick={loadMoreHospital}
                                                                disabled={pageHospital === totalPagesHospital}
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    )}

                                                </div>{/* ###Filter Pagination End*/}

                                                <div className='ease-in-out duration-500 filterCompareBtns sticky bottom-0 left-4 right-10 z-1 bg-[#fff] p-4 max-w-[480px] -shadow-sm'>
                                                    <div className='flex items-center justify-end gap-[10px]'>
                                                        <div className=''>
                                                            {showCheckboxes && (
                                                                <button className='min-w-[104px] px-4 py-2.5 rounded-md font-semibold text-gray-900 hover:bg-gray-100' onClick={() => setShowCheckboxes(false)} active={selectedItems.length === 0}>Cancel</button>
                                                            )}
                                                        </div>
                                                        <div className='ease-in-out duration-500'>
                                                            {showCheckboxes && (
                                                                <button className="min-w-[104px] px-4 py-2.5 font-semibold text-[#fff] rounded-md bg-[#6e2feb] hover:bg-[#6e2feb]" onClick={OpenCompareModal1}>Compare</button>
                                                            )}
                                                        </div>

                                                    </div>
                                                </div>
                                                {/* ###Filter Comparebtns End*/}
                                            </div>

                                            {/* ###Filter Details Start*/}
                                            {/*  */}
                                            <div className='p-10 basis-2/3 sm:sticky top-[30px] ease-in duration-300'>
                                                {selectedItemID && (
                                                    <div className=''>
                                                        {hospitals.map((hospital, index) => (
                                                            hospital.id === selectedItemID && (
                                                                <div key={index} className='detailsInner w-full ease-in-out duration-1500'>
                                                                    <div className="py-4 detailsTitle text-[#101426]">
                                                                        <h2 className="text-3xl font-semibold m-b-3 text-[#101426]">
                                                                            {`${capitalizeString(hospital.facility_name)}`}
                                                                        </h2>
                                                                        <div class="flex space-x-4 py-4 text-sm font-medium">
                                                                            <div class="flex-auto flex justify-start items-center font-semibold">
                                                                                <div className="mr-6 flex items-center gap-2 cursor-pointer shareBTN text-base font-semibold text-[#101426]"
                                                                                    onClick={toggleShare}>
                                                                                    <PiShareNetwork className="text-2xl text-[#8F9BB3] cursor-pointer" /> Share
                                                                                    {isShareOpen && <HwShareon id={hospital.id} value={'Hospital'} onClose={toggleShare} />}
                                                                                </div>
                                                                                <div class="px-6 border-x text-[#101426] text-base font-normal ">NPI Facility ID: <span className='font-semibold'>{hospital.facility_id}</span>
                                                                                </div>
                                                                                <div class="px-6 flex items-center gap-2">
                                                                                    <div className='text-[#101426] text-base font-normal'>Overall rating: </div>
                                                                                    <div className='flex hospitalReview'>
                                                                                        {hospital.hospital_overall_rating >= 1 ? (
                                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                                        ) : (
                                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                                        )}
                                                                                        {hospital.hospital_overall_rating >= 2 ? (
                                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                                        ) : (
                                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                                        )}
                                                                                        {hospital.hospital_overall_rating >= 3 ? (
                                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                                        ) : (
                                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                                        )}
                                                                                        {hospital.hospital_overall_rating >= 4 ? (
                                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                                        ) : (
                                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                                        )}
                                                                                        {hospital.hospital_overall_rating >= 5 ? (
                                                                                            <AiFillStar className='text-[#ffa940] text-xl' />
                                                                                        ) : (
                                                                                            <AiOutlineStar className='text-[#ffa940] text-xl' />
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="py-6 border-y border-[#E4E9F2]-500 mb-5">
                                                                            {hospital.phone_number.length > 0 && (
                                                                                <div className="w-full text-[#101426] py-1 flex justify-start gap-2 items-center"><span><BsTelephone /> </span>
                                                                                    {hospital.phone_number}
                                                                                </div>)}
                                                                            <div className="w-full text-[#101426] py-1 flex justify-start gap-2 items-center"><span><SlLocationPin /> </span>
                                                                                {`${capitalizeString(hospital.address)}`}<>, </>
                                                                                {`${capitalizeString(hospital.city)}`}<>, </>
                                                                                {`${capitalizeString(hospital.state)}`}<>, </>
                                                                                {`${capitalizeString(hospital.zip_code)}`}
                                                                            </div>
                                                                        </div>
                                                                        <div className='py-4 flex sm:items-center gap-1'>
                                                                            <div className="mr-0 min-w-[70px]">
                                                                                <img src="../images/search/affiliations.svg" /></div>
                                                                            <div className='w-full'>
                                                                                <p>Hospital Type</p>
                                                                                <p className='font-bold'>{hospital.hospital_type}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='py-4 flex sm:items-center gap-1'>
                                                                            <div className="min-w-[70px]">
                                                                                <img src="../images/EmergencyService.png" /></div>
                                                                            <div className='w-full'>
                                                                                <p>Emergency Services</p>
                                                                                <p className='font-bold'>
                                                                                    {hospital.emergency_services ? (
                                                                                        <p className="">Yes</p>
                                                                                    ) : (
                                                                                        <p className="font-semibold">No</p>
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='py-4 flex sm:items-center gap-1'>
                                                                            <div className="min-w-[70px]">
                                                                                <img src="../images/HospitalHnrship.png" /></div>
                                                                            <div className='w-full'>
                                                                                <p>Hospital Ownership</p>
                                                                                <p className='font-bold'>
                                                                                    {hospital.hospital_ownership}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <MedicareNote />
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detail Popup Start Here */}
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Hospital Details"
                                    className='w-full bg-[#fff] min-h-[100vh] pt-14 border-t mt-4'
                                >
                                    {selectedHospital && (
                                        <div className='singleDetails p-0 sm:p-10 max-w-[1370px] mx-auto'>
                                            <button
                                                className='bg-[#F5F0FF] p-3 sm:px-4 sm:py-3 mt-4 rounded-[100px] ml-5'
                                                onClick={closeModal}>
                                                <GrClose className='text-xl' />
                                            </button>
                                            <div className='p-5 flex justify-between'>
                                                <div>
                                                    <h1 className='font-bold text-md sm:text-2xl md:text-3xl'>
                                                        {`${capitalizeString(selectedHospital.facility_name)}`}
                                                    </h1>
                                                    <div className='flex gap-2 pt-4 pb-2'>
                                                        <div className=''>
                                                            <p>NPI Facility ID: <span className='font-bold'>{`${selectedHospital.facility_id}`}</span></p>
                                                        </div>
                                                        <div class="px-6 flex items-center gap-2">
                                                            <div>Overall rating: </div>
                                                            <div className='flex hospitalReview'>
                                                                {selectedHospital.hospital_overall_rating >= 1 ? (
                                                                    <AiFillStar className='text-[#ffa940] text-2xl' />
                                                                ) : (
                                                                    <AiOutlineStar className='text-[#ffa940] text-2xl' />
                                                                )}
                                                                {selectedHospital.hospital_overall_rating >= 2 ? (
                                                                    <AiFillStar className='text-[#ffa940] text-2xl' />
                                                                ) : (
                                                                    <AiOutlineStar className='text-[#ffa940] text-2xl' />
                                                                )}
                                                                {selectedHospital.hospital_overall_rating >= 3 ? (
                                                                    <AiFillStar className='text-[#ffa940] text-2xl' />
                                                                ) : (
                                                                    <AiOutlineStar className='text-[#ffa940] text-2xl' />
                                                                )}
                                                                {selectedHospital.hospital_overall_rating >= 4 ? (
                                                                    <AiFillStar className='text-[#ffa940] text-2xl' />
                                                                ) : (
                                                                    <AiOutlineStar className='text-[#ffa940] text-2xl' />
                                                                )}
                                                                {selectedHospital.hospital_overall_rating >= 5 ? (
                                                                    <AiFillStar className='text-[#ffa940] text-2xl' />
                                                                ) : (
                                                                    <AiOutlineStar className='text-[#ffa940] text-2xl' />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden flex h-10 sm:h-11 gap-2 text-md sm:text-md font-bold text-[#6e2feb] py-2 rounded-md px-3 bg-[#F5F0FF]">
                                                    <PiShareNetwork className="text-md sm:text-xl md:text-md text-[#6e2feb] font-bold top-1 relative" /> Share
                                                </div>
                                            </div>

                                            <div className='p-6 border-y'>
                                                {selectedHospital.phone_number.length > 0 && (
                                                    <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center">
                                                        <span><BsTelephone /> </span> {`${selectedHospital.phone_number}`}
                                                    </div>)}
                                                <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center"><span><SlLocationPin /> </span>
                                                    {`${capitalizeString(selectedHospital.address)}`}<>, </>
                                                    {`${capitalizeString(selectedHospital.city)}`}<>, </>
                                                    {`${capitalizeString(selectedHospital.state)}`}<>, </>
                                                    {`${capitalizeString(selectedHospital.zip_code)}`}</div>
                                            </div>

                                            <div className='grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-6 border-b gap-10 sm:items-start'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='min-w-[60px]'>
                                                        <img src="./images/HospitalType.png"
                                                            alt="Emergency Service"
                                                        />
                                                    </div>
                                                    <div className=''>
                                                        <p>Hospital type</p>
                                                        <p className='font-bold'>{selectedHospital.hospital_type}</p>
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <div className='flex items-center gap-3'>
                                                        <div className=' min-w-[60px]'>
                                                            <img src="./images/BoardCertificate.png"
                                                                alt="Emergency Service"
                                                            />
                                                        </div>
                                                        <div className=''>
                                                            <p>Emergency Services</p>
                                                            <p className='font-bold'>
                                                                {selectedHospital.emergency_services ? (
                                                                    <p className="">Yes</p>
                                                                ) : (
                                                                    <p className="font-semibold">No</p>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='min-w-[60px] '>
                                                            <img src="./images/Education&Training.png"
                                                                alt="Emergency Service"
                                                            />
                                                        </div>
                                                        <div className=''>
                                                            <p>Hospital Ownership</p>
                                                            <p className='font-bold'>{selectedHospital.hospital_ownership}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='pl-6'>
                                                <MedicareNote />
                                            </div>
                                        </div>
                                    )}
                                </Modal>

                                <Modal className='transition duration-150 ease-out md:ease-in max-w-[100%] sm:w-[485px] bg-[#fff] px-6 py-0 border rounded-md shadow-md mt-4 fixed right-2 top-24 z-50'
                                    isOpen={filterModalIsOpen}
                                    onRequestClose={closeFilterModal}
                                    contentLabel="Filter Doctors">

                                    {showPopup || <FilterPopup
                                        // isOpen={filterModalIsOpen}
                                        onCancel={cancelFilter}
                                        applyFilter={applyFilter}
                                        defaultValues={defaultValues}
                                    />}
                                </Modal>
                            </>
                        )}
                    </div>}
                </div>
            )}


        </div>


    );
};
export default DoctorDataSearch;