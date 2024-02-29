import React, { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiShareNetwork } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import SahreDataHospital from './ShareDataHospital.css';


const Casesharedata = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [hospitalData, setHospitalData] = useState(null);
    const doctorId = `4b24ac22-77ba-46f7-83cf-1ae3dcc0fea4`; 
    const hospitalId =`c306de1e-2112-4161-b11d-7018f2d82b15`; 

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
        fetch(`https://api.coc.houseworksinc.co/api/v1/hospitals/${param1}`)
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


    return (
        <>
            {hospitalData && (
                <div className='singleDetails p-0 sm:p-10 max-w-[1220px] mx-auto min-h-[90vh]'>
                <div className='p-5 flex justify-between'>
                  <div>
                    <h1 className='font-bold text-md sm:text-2xl md:text-3xl'>
                      {`${capitalizeString(hospitalData.facility_name)}`}
                    </h1>
                    <div className='flex gap-2 pt-4 pb-2'>
                      <div className=''>
                        <p>NPI Facility ID: <span className='font-bold'>{`${hospitalData.facility_id}`}</span></p>
                      </div>
                      <div class="px-6 flex items-center gap-2">
                        <div>Overall rating: </div>
                        <div className='flex hospitalReview'>
                          {hospitalData.hospital_overall_rating >= 1 ? (
                            <AiFillStar className='text-[#ffa940] text-2xl' />
                          ) : (
                            <AiOutlineStar className='text-[#ffa940] text-2xl' />
                          )}
                          {hospitalData.hospital_overall_rating >= 2 ? (
                            <AiFillStar className='text-[#ffa940] text-2xl' />
                          ) : (
                            <AiOutlineStar className='text-[#ffa940] text-2xl' />
                          )}
                          {hospitalData.hospital_overall_rating >= 3 ? (
                            <AiFillStar className='text-[#ffa940] text-2xl' />
                          ) : (
                            <AiOutlineStar className='text-[#ffa940] text-2xl' />
                          )}
                          {hospitalData.hospital_overall_rating >= 4 ? (
                            <AiFillStar className='text-[#ffa940] text-2xl' />
                          ) : (
                            <AiOutlineStar className='text-[#ffa940] text-2xl' />
                          )}
                          {hospitalData.hospital_overall_rating >= 5 ? (
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
                  {hospitalData.phone_number.length > 0 && (
                    <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center">
                      <span><BsTelephone /> </span> {`${hospitalData.phone_number}`}
                    </div>)}
                  <div className="w-full text-[#8F9BB3] py-1 flex justify-start gap-2 items-center"><span><SlLocationPin /> </span>
                    {`${capitalizeString(hospitalData.address)}`}<>, </>
                    {`${capitalizeString(hospitalData.city)}`}<>, </>
                    {`${capitalizeString(hospitalData.state)}`}<>, </>
                    {`${capitalizeString(hospitalData.zip_code)}`}</div>
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
                      <p className='font-bold'>{hospitalData.hospital_type}</p>
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
                          {hospitalData.emergency_services ? (
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
                        <p className='font-bold'>{hospitalData.hospital_ownership}</p>
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
