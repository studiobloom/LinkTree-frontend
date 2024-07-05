import React from 'react';
import hero from '../assets/heroImage.png-removebg-preview.png';
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
     const {  loginWithRedirect } = useAuth0();
     const { logout } = useAuth0();

  return (
    
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
        

        {/* Left side with phone and icons */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img src={hero} alt="EchoLink App" className="w-[300px] md:w-[450px] lg:w-[600px]"/>

        
        </div>
        
        {/* Right side with text and buttons */}
        <div className="w-full lg:w-1/2 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Your online universe, in one place.
          </h1>
          <p className="text-lg mb-8">
            Join the many using <span className='text-purpleTheme-light font-bold'>EchoLink</span> for their link in bio. One simple link to share everything you create, curate, and sell across Instagram, TikTok, Twitter, YouTube, and all your social media profiles. Simplify your online presence and amplify your reach with EchoLink.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-purple-500 hover:bg-purpleTheme-dark2 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            onClick={() => loginWithRedirect()}
            >
              Login
            </button>
            <button className="bg-purple-900 hover:bg-purpleTheme-dark text-white font-bold py-2 px-6 rounded-full transition duration-300"
             onClick={() => logout()}
            >
              Sign Up
            </button>
          </div>
        </div>
        
      </div>
   
  );
};

export default LandingPage;