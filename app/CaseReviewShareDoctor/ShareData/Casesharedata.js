import React, { useState, useEffect } from 'react';
import { PiGenderMaleLight } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import ShareData from './ShareData.css';


const Casesharedata = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [hospitalData, setHospitalData] = useState(null);
    const doctorId = `4b24ac22-77ba-46f7-83cf-1ae3dcc0fea4`;
    const hospitalId = `c306de1e-2112-4161-b11d-7018f2d82b15`;

    useEffect(() => {
        console.log(window.location);
        let myKeys = window.location.search;
        console.log("k & V :", myKeys);

        let urlParams = new URLSearchParams(myKeys);
        console.log(urlParams);
        let param1 = urlParams.get("search");
        console.log(param1);

        // Fetch doctor data
        fetch(`https://api.coc.houseworksinc.co/api/v1/doctors/${param1}`)
            .then(response => response.json())
            .then(data => {
                setDoctorData(data);
            })
            .catch(error => {
                console.error('Error fetching doctor data:', error);
            });

        // Fetch hospital data
        fetch(`https://api.coc.houseworksinc.co/api/v1/hospitals/${hospitalId}`)
            .then(response => response.json())
            .then(data => {
                setHospitalData(data);
            })
            .catch(error => {
                console.error('Error fetching hospital data:', error);
            });
    }, []);

    function capitalizeString(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    const getFullGenderName = (gender) => {
        if (gender === 'M') {
            return 'Male';
        } else if (gender === 'F') {
            return 'Female';
        }
        return gender;
    };

    return (
        <>
            {/* Display doctor and hospital data */}
            {doctorData && (
                <div className='singleDetails p-0 sm:p-10 max-w-[1220px] mx-auto min-h-[90vh]'>
                    <div className='p-5 flex justify-between'>
                        <div>
                            <h1 className='font-bold text-md sm:text-2xl md:text-3xl'>
                                {`${capitalizeString(doctorData.first_name)}, ${capitalizeString(doctorData.last_name)}`}</h1>
                            <div className='flex gap-2 pt-4'>
                                <div className=''>
                                    <p>NPI: <span className='font-bold'>{`${doctorData.npi}`}</span></p>
                                </div>
                                <div class="px-6 flex items-center gap-2">
                                    <PiGenderMaleLight className="text-2xl text-[#8F9BB3]" />
                                    <p className='font-bold'>{getFullGenderName(doctorData.gender)}</p>
                                </div>
                            </div>
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
                            <p className='font-bold'>{`${capitalizeString(doctorData.primary_speciality)}`}
                                {doctorData.secondary_specialities.length > 0 && (
                                    <span>, {doctorData.secondary_specialities.map((speciality, index) => (
                                        <span key={index}>{`${capitalizeString(speciality)}`}{index !== doctorData.secondary_specialities.length - 1 ? ', ' : ''}</span>
                                    ))}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className='p-6 border-y'>
                        {doctorData.phone_number.length > 0 && (
                            <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center">
                                <span><BsTelephone /> </span> {`${doctorData.phone_number}`}
                            </div>)}
                        <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center"><span><SlLocationPin /> </span>
                            {capitalizeString(doctorData.address_line_1)}
                            {capitalizeString(doctorData.address_line_2)}
                            {capitalizeString(doctorData.state)}<>, </>
                            {capitalizeString(doctorData.city)}<>, </>
                            {capitalizeString(doctorData.zip_code)}
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
                                    <p className='font-bold'>{`${capitalizeString(doctorData.medical_school)}`}, {`${capitalizeString(doctorData.graduation_year)}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Casesharedata;


