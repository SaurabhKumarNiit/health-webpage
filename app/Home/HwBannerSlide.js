import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";
//import "./HwBannerSlide.css";

const TrendingSlider = () => {
  const slidedItems = [
    {
      id: 1,
      title: "Search for<span class='hidden sm:inline'><br /></span>Providers and<br /> Hospitals",
      description:
        "Getting access to renowned doctors and hospitals is now easy. Search for the right provider now",
    },
    {
      id: 2,
      title: "Get your case <br /> reviewed for free",
      description: "Get your case reviewed by the best medical professionals for free",
      button: "Submit a case for review",
      button_url: "#",
    },
  ];

  

  return (
    <div className="box py-7">
      <Carousel 
      showIndicators={true}
      showThumbs = {false}
      transitionTime={1000}
      useKeyboardArrows={true} autoPlay={true} infiniteLoop={true} interval={3500}>
        {slidedItems.map((item) => (
          <div className="slide text-left" key={item.id}>
            <h3
              className="text-left text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold"
              dangerouslySetInnerHTML={{ __html: item.title }}
            ></h3>
            <p className="text-left text-sm sm:text-base md:text-lg lg:text-xl text-white py-3 sm:py-5">{item.description}</p>
            {item.button && (
              <div className="text-left mt-4">
                <a className="rounded-md bg-[#ffffff] text-[#6E2FEB] py-4 px-5 font-bold mb-5"
                  href={item.button_url}
                >
                  {item.button}
                </a>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TrendingSlider;
