const CaseReview = () => {
	const CRhead = {
		title: "Submit a Case for Review",
		decription: "With our case review, we enable the patients and their next of kin to get an expert opinion without any geographical boundaries."
	}

	// Sample data for each block
	const casereviewBlocks = [
	  {
	    id: 1,
	    imageUrl: './images/hwsignup.png',
	    description: 'You signup and submit \n your case',
	    
	  },
	  {
	    id: 2,
	    imageUrl: './images/home/timely.svg',
	    description: 'You get timely updates and status reports for your case',
	  },
	  {
	    id: 3,
	    imageUrl: './images/home/review.svg',
	    description: 'Our team of providers will review the case & recommend suitable treatment',
	  },
	  {
	    id: 4,
	    imageUrl: './images/home/suggestnext.svg',
	    description: 'We suggest the next course of action',
	  },
	];

	return(
		<>
			<section className="hwSection text-center py-10 md:py-20" id="hwCaseReview">
				<div className="max-w-[1140px] mx-auto">
					<div className="sec_head max-w-[545px] mx-auto px-8">
			          <h2 className="sec_title center">{CRhead.title}</h2>
			          <p className="sec_desc font-normal">{CRhead.decription}</p>
			        </div>
					<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 text-center 
					gap-4 sm:gap-6 md:gap-10 py-10 px-4">
				      {casereviewBlocks.map((block) => (
				        <div className="bg-grey-100 hover:scale-105 duration-500 md:px-10 px-2 md:px-6" key={block.id}>
				          <img className="inline-block mb-4" src={block.imageUrl} alt={block.title} />
				          <p>{block.description}</p>
				        </div>
				      ))}
					</div>
                    <div className="w-full">
                        <a href="https://health-webpage.vercel.app/Casereview" className="shadow-md text-md md:text-lg font-semibold bg-[#6e2feb] text-[#fff] rounded-md px-5 py-4 sm:px-6 sm:py-4 hover:scale-105 duration-500">Know More</a>
                    </div>
				</div>
			</section>
		</>
	)
}

export default CaseReview;