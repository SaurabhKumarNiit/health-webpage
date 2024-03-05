import React from 'react'

const AboutEMR = () => {
    const EMRBlock = [
        {
            id:1,
            title:'It allows patients to keep track of their treatment progress and enables care teams to manage patient data, clinician activities, keep track of care teams, and more through the structured platform.',
            imageUrl: 'https://househealthinc.com/wp-content/uploads/2021/12/Frame-6885-1.svg',
        },
        {
            id:2,
            title:"This platform also empowers the care teams to keep track of the patient’s treatment progress, the phase of care, and the next steps to take.",
            imageUrl: 'https://househealthinc.com/wp-content/uploads/2021/12/Frame-6885.svg',
        },
        {
            id:3,
            title:"The House Works EMR portal is a highly user-friendly and intuitive solution.",
            imageUrl: 'https://househealthinc.com/wp-content/uploads/2021/12/Frame-6885-2.svg',
        }
    ]

  return (
    <section className='px-5 py-8 md:py-15 lg:py-20 2xl:py-25'>
         <div className='max-w-[1140px] mx-auto py-10 md:py-15 lg:py-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-4 shadow-md rounded-md border bg-[#fff]'>
                <div className='p-5 md:p-8 pb-0'>
                    <p className='mb-4'>House Works was conceptualized to focus on solving workflow efficiency issues in managing cancer and transplant patient care, both known for their complex processes involved.</p>
                    <p>The company uses technology that allows care teams to provide the highest quality of personalized patient care, reduce the time-to-treatment phases and increase the accessibility to quaternary care needed for complex procedures like transplants and cancer care.</p>
                    <a className='hidden font-semibold duration-500 hover:scale-105 shadow shadow-indigo-500/50 rounded-md px-5 py-3 mt-5 inline-block bg-[#f7f9fc] cursor-pointer center'>Learn more</a>



                </div>
                <div className='md:pl-8 p-5'>
                    <img 
                    className='md:mt-[-15px]'
                    src='../images/about/aboutBox.svg'
                    alt=''
                    />
                </div>
            </div>
        </div>

        <div className='max-w-[1140px] mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
                <div>
                    <img 
                    src="https://househealthinc.com/wp-content/uploads/2021/12/Group-2101.svg"
                    alt=" About EMR" />
                </div>
                <div className=''>
                    <h2 className='font-bold text-xl md:text-2xl xl:text-3xl my-4 text-[#101426]'>Searching for the best resources during a transplant or cancer journey can be tedious and nerve-racking.</h2>
                    <p>House Works solves these process flow problems by seamless connectivity and collaboration among physicians, hospitals, insurance companies, pharmaceuticals, and diagnostic services. With House Works’ intuitive solution, patients and their families can track and stay updated with all the information related to their medical care under one umbrella platform.</p>
                </div>
            </div>
        </div>

        <div className='max-w-[1140px] mx-auto mt-20'>
            <div className="sec_head max-w-[750px] mx-auto text-center">
                <h2 className="sec_title center">House Works’ EMR</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {EMRBlock.map((block) => (
                    <div className="md:mt-6 mt-5 border bg-[#fff] hover:scale-105 duration-500 p-5 rounded-md" key={block.id}>
                        <p className='mb-4 text-[#101426] min-h-[120px]'>{block.title}</p>
                        <img className='w-full' src={block.imageUrl} alt={block.title} />
                    </div>
                ))}
                </div>
                <div className='block w-full text-center'>
                    <a className='hidden font-semibold duration-500 hover:scale-105 shadow shadow-indigo-500/50 rounded-md px-5 py-3 mt-5 inline-block bg-[#f7f9fc] cursor-pointer center'>Learn more</a>
                </div>
                
            </div>
    </section>
  )
}

export default AboutEMR