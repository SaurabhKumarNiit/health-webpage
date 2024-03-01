"use client"
import React from 'react'
import {
  FacebookShareButton,
  PinterestShareButton,
  RedditShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  // PinterestIcon,
  RedditIcon,
  WhatsappIcon,
  LinkedinIcon
} from 'react-share';

const HwShareon = (prop) => {

  if(prop.value=='Doctor'){

    var shareUrl = `https://health-webpage.vercel.app/CaseReviewShareDoctor?search=${prop.id}`;

  }else{

    var shareUrl = `https://health-webpage.vercel.app/CaseReviewShareHospital?search=${prop.id}`;

  }


  const handleShareClick = (socialMedia) => {
    // Replace this with your specific logic for each social media platform
    switch (socialMedia) {
      case 'facebook':
        // Handle Facebook share logic
        console.log('Sharing on Facebook:', shareUrl);
        break;

      // case 'pinterest':
      //   // Handle Pinterest share logic
      //   console.log('Sharing on Pinterest:', shareUrl);
      //   break;
      
      case 'reddit':
        // Handle Reddit share logic
        console.log('Sharing on Reddit:', shareUrl);
        break;
      case 'whatsapp':
        // Handle Whatsapp share logic
        console.log('Sharing on Whatsapp:', shareUrl);
        break;
      case 'linkedin':
        // Handle Linkedin share logic
        console.log('Sharing on Linkedin:', shareUrl);
        break;
      default:
        break;
    }
  };

  return (
    <div className='hwShare flex gap-.5'>
      <FacebookShareButton
        onClick={() => handleShareClick('facebook')}
        url={shareUrl}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      {/* <PinterestShareButton
        onClick={() => handleShareClick('pinterest')}
        url={shareUrl}
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton> */}

      <RedditShareButton
        onClick={() => handleShareClick('reddit')}
        url={shareUrl}
      >
        <RedditIcon size={32} round />
      </RedditShareButton>

      <WhatsappShareButton
        onClick={() => handleShareClick('whatsapp')}
        url={shareUrl}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton
        onClick={() => handleShareClick('linkedin')}
        url={shareUrl}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}

export default HwShareon;
