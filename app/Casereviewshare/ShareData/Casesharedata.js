import React, { useState, useEffect } from 'react';

const Casesharedata = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [hospitalData, setHospitalData] = useState(null);
    const doctorId = `4b24ac22-77ba-46f7-83cf-1ae3dcc0fea4`; 
    const hospitalId =`c306de1e-2112-4161-b11d-7018f2d82b15`; 

    useEffect(() => {
        // Fetch doctor data
        fetch(`https://api.coc.houseworksinc.co/api/v1/doctors/${doctorId}`)
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

    return (
        <>
            <h1>Hello</h1>
            {/* Display doctor and hospital data */}
            {doctorData && (
                <div>
                    <h2>Doctor Information</h2>
                    <p>first_name: {doctorData.first_name}</p>
                    <p>last_name: {doctorData.last_name}</p>
                </div>
            )}
            {hospitalData && (
                <div>
                    <h2>Hospital Information</h2>
                    <p>Name: {hospitalData.facility_name}</p>
                    <p>city: {hospitalData.city}</p>
                </div>
            )}
        </>
    );
}

export default Casesharedata;
