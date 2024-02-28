"use client"
import React from 'react';

import Casesharedata  from './ShareData/Casesharedata';


const Caseshareresult = () => {
  return (
    <>
      <section
        id="searchresults"
        className="mb-1"
      >
        <Casesharedata />
      </section>
    </>
  );
}

export default Caseshareresult;