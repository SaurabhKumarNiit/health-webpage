"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HWLoader from "./HWLoader";
import Link from "next/link";
import { ClipLoader } from 'react-spinners';
import jsonData from './data.json';

const HWSearch = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("transplant");
  const [selectedMutiple, setselectedMutiple] = useState("Doctor");
  const [selectedZip, setSelectedZip] = useState();
  const [searchText, setSearchText] = useState('');



  const [searchedZipCodes, setSearchedZipCodes] = useState([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState([]);
  const [counters, setCounters] = useState({});
  const [zipCodes, setZipCodes] = useState([]);

  const [loadingZip, setLoadingZip] = useState(false);
  const [doctorDataFetched, setDoctorDataFetched] = useState(false);
  const [hospitalDataFetched, setHospitalDataFetched] = useState(false);
  const [apiDataLoaded, setApiDataLoaded] = useState(false);

  const [type, setType] = useState("transplant");
  const [searchFor, setSearchFor] = useState("Doctor");
  const [organ, setOrgan] = useState("");
  const [error, setError] = useState("");
  const [selectImage, setSelectImage] = useState("kidney");
  const [selectImage1, setSelectImage1] = useState("Lungs");

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
    // setSelectImage(selectedOrgan);
    setSelectImage(selectedOrgan);
    setSelectImage1(selectedOrgan)
    console.log("Selected Organ:", selectedOrgan);
    setOrgan(selectedOrgan);
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

  useEffect(() => {
    const fetchLocalData = () => {
      let dataToFetch = [];

      if (selectedMutiple === "Doctor") {
        dataToFetch = jsonData.Doctor;
        setDoctorDataFetched(true); // Mark data as fetched for Doctor
        setHospitalDataFetched(false); // Hide hospital data
      } else if (selectedMutiple === "Hospital") {
        dataToFetch = jsonData.Hospital;
        setHospitalDataFetched(true); // Mark data as fetched for Hospital
        setDoctorDataFetched(false); // Hide doctor data
      }

      setZipCodes(dataToFetch);
      setApiDataLoaded(true);
      setLoadingZip(false);
    };

    fetchLocalData();
  }, [selectedMutiple, doctorDataFetched, hospitalDataFetched]);


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

  const handleRemoveZipCode = (index, event) => {
    event.preventDefault();
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

  const handleSubmit = () => {
    const queryParams = {
      type: type,
      searchFor: searchFor,
      ...(searchFor === 'Doctor' && { organ: organ }),
      ...(selectedZipCodes.length > 0 && { zip_code: selectedZipCodes.join(',') }),
    };
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setType(option); // Set the type when an option is selected
  };

  const handleOptionClick1 = (search) => {
    setselectedMutiple(search);
    setSearchFor(search); // Set the type when an option is selected
  };


  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    const input = e.target.value.replace(/\D/g, '');
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
  return (
    <div className="sm:min-h-[466px]">
      <div className="flex gap-4 border-b px-4 sm:px-8">
        <div
          className={`
          sm:px-0 text-sm sm:text-base py-2 text-${selectedTab === 0
              ? "rgba(16, 20, 38, 0.8)"
              : "#6e2feb font-bold border-b-2 border-[#6e2feb]"
            } text-base cursor-pointer`}
          onClick={() => handleTabClick(1)}
        >
          <span
            style={{
              color: selectedTab === 0 ? "rgba(16, 20, 38, 0.8)" : "#6e2feb",
            }}
          >
            Search by Filters
          </span>
        </div>
        <div
          className={`
          sm:px-0 text-sm sm:text-base ml-4 py-2 text-${selectedTab === 1
              ? "rgba(16, 20, 38, 0.8)"
              : "#6e2feb font-bold border-b-2 border-[#6e2feb]"
            } text-base cursor-pointer`}
          onClick={() => handleTabClick(0)}
        >
          <span
            style={{
              color: selectedTab === 1 ? "rgba(16, 20, 38, 0.8)" : "#6e2feb",
            }}
          >
            Search by Doctor or Hospital
          </span>
        </div>
      </div>

      {showInput ? (
        <div className="pt-6 px-4 sm:px-8">
          <p className="font-normal text-lg font-normal">
            Type a doctor’s or a hospital’s name to find relevant results.
          </p>
          <input
            className="w-full rounded-md bg-[#F7F9FC] border border-[#c5cee0] p-3 my-5"
            type="text"
            placeholder="Start typing"
            onClick={() => setSelectedZip("text")}
            onInput={handleInputChange}
          />
          {isLoading && <p>Loading...</p>}
        </div>
      ) : (
        <div className="py-4 hwOType px-4 sm:px-8">
          <h3 className="font-bold text-[#101426] text-base">Type</h3>
          <div className="sm:flex grid grid-cols-2 place-content-stretch sm:gap-4 gap-2 my-2 max-w-[270px] items-center">
            <div
              className="px-5 py-3.5 cursor-pointer rounded-lg text-center text-sm"
              style={{
                border:
                  selectedOption === "transplant"
                    ? "1px solid #C8ADFF"
                    : "1px solid #C5CEE0",
                color:
                  selectedOption === "transplant"
                    ? "#6E2FEB"
                    : "rgb(16 20 28 / 80%)",
                backgroundColor:
                  selectedOption === "transplant" ? "#F5F0FF" : "#ffff",
              }}
              onClick={() => handleTypeSelection("transplant")}
            >
              Transplant
            </div>
            <div
              className="px-5 py-3.5 cursor-pointer rounded-lg text-center text-sm"
              style={{
                border:
                  selectedOption === "oncology"
                    ? "1px solid #C8ADFF"
                    : "1px solid #C5CEE0",
                color:
                  selectedOption === "transplant"
                    ? "rgb(16 20 28 / 80%)"
                    : "#6E2FEB",
                backgroundColor:
                  selectedOption === "oncology" ? "#F5F0FF" : "#ffff",
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
            <ul className="flex flex-wrap gap-2 sm:gap-4 items-center">
              <li
                className="flex-none min-w-[80px] px-5 py-3.5 text-sm cursor-pointer rounded-md min-w-[90px] text-center"
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
              <li className="min-w-[15px] flex-none">
                in <span className="hidden">Zipcodes</span>
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
                  <input
                    className="Hwinput relative bg-[#f7f9fc] sm:max-w-[210px] h-[48px] max-w-[215px] rounded-md p-3 shadow-none focus:shadow-none"
                    type="text"
                    id="outlined-basic"
                    placeholder="Select ZIP Codes"
                    variant="outlined"
                    value={selectedZip}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    style={{
                      border: selectedZip === 'input' ? '1px solid #C5CEE0' : '1px solid rgb(197, 206, 224)',
                      position: 'relative', // Ensure proper positioning
                    }}
                  />

                  {loadingZip && !apiDataLoaded && (
                    <div style={{ position: 'absolute', top: '38%', left: '60%', transform: 'translate(-50%, -50%)' }}>
                      {/* {selectedMutiple === "Doctor" && (
                    <p>Loading Doctor data...</p>
                  )} */}
                      {/* {selectedMutiple === "Hospital" && (
                    // <p>Loading Hospital data...</p>
                  )} */}
                      <ClipLoader
                        color={"#123abc"}
                        size={10}
                        loading={true}
                      />
                    </div>
                  )}
                  <RiSearchLine className="absolute left-[175px] top-3.5 text-xl w-4 text-[#8f9bb3]"/>
                  {searchedZipCodes.length > 0 && (
                    <ul className="w-[170px] h-[200px] bg-[#fff] shadow absolute z-40 rounded-md border-slate-500 bg-[#f9f9f9] overflow-scroll">
                      {searchedZipCodes.map((zipCode) => (
                        <li
                          className="text-[#101426] bg-[#f7f9f7] hover:bg-[#6E2FEB] hover:text-[#fff] rounded shadow w-full px-4 py-2 cursor-pointer"
                          key={zipCode.id}
                          onClick={() => handleZipCodeClick(zipCode)}
                        >
                          {zipCode}
                          {counters[zipCode] > 1 && (
                            <span className="counterr">
                              +{counters[zipCode]}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul className="absolute flex gap-1 items-center mt-1 z-10">
                    {selectedZipCodes.slice(0, 2).map((zipCode, index) => (
                      <li
                        className="bg-[#f7f9f7] rounded border px-2 py-1 text-[#101426]"
                        key={index}
                      >
                        {zipCode}{" "}
                        {counters[zipCode] > 1 && (
                          <span>+{counters[zipCode]}</span>
                        )}
                        <button onClick={(event) => handleRemoveZipCode(index, event)}>
                          <IoClose className="relative top-1 text-xl text-[#101426] fade-in-out duration-300 baseline-1 font-semibold" />
                        </button>
                      </li>
                    ))}
                    <li className="text-[#6E2FEB]">
                      <MessageComponent
                        counters={counters}
                        className="text-[#6E2FEB] font-bold"
                      />
                    </li>
                  </ul>
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
                        <div className="flex flex-wrap items-baseline sm:gap-4 gap-[10px]">
                          {getOrganOptions().map((option) => (
                            <button className="filterBox"
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
        </div>
      )}

      <div className="px-4 sm:px-8 mb-2">
        <Link
          href={{
            pathname: searchFor === 'Doctor' ? '/SearchResult' : '/Searchresults',
            query: {
              search: `type=${type}&searchFor=${searchFor}${searchFor === 'Doctor' ? `&organ=${organ}` : ''}${selectedZip ? `&zip_code=${selectedZip}` : ''
                }${selectedZipCodes.length > 0 ? `&zip_code=${selectedZipCodes.join(',')}` : ''}`,
            },
          }}
        >
          <button className="inline-block text-center px-3 py-3 rounded-md bg-[#6e2feb] shadow-2xl hover:bg-[#3c1faf] ease-in duration-300 font-bold text-[#fff] cursor-pointer w-[100%]">
            Search
          </button>
        </Link>
      </div>

      {/* <div className="px-4 sm:px-8 mb-2">
        <Link
          href={{
            pathname:'/SearchResult',
            query: {
              search: `searchResult=${searchText}&searchFor=${'Doctor'}`,
            },
          }}
        >
          <button className="inline-block text-center px-3 py-3 rounded-md bg-[#6e2feb] shadow-2xl hover:bg-[#3c1faf] ease-in duration-300 font-bold text-[#fff] cursor-pointer w-[100%]">
            Search For Filteration
          </button>
        </Link>
      </div> */}

      {/* <div className=""></div> */}
    </div>
  );
};

export default HWSearch;