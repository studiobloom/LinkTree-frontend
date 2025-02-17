import hero from "../assets/newlogo.png";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    // lg:flex row when the screen 1024px or above it will be row override col
    <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center  lg:items-start justify-between gap-10">
      {/* Left side with phone and icons */}
      <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
        <img
          src={hero}
          alt="EchoLink App"
          className="w-[300px] md:w-[600px] lg:w-[500px] "
        />
      </div>






      {/* Right side with text and buttons */}
      <div className="w-full lg:w-1/2 text-white">


      {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Your online universe, in one place.
          </h1> */}

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={0.50} // Force re-render
        >
          Your online universe, in one place.
        </motion.h1>

        <p className="text-lg mb-8">
          Join the many using{" "}
          <span className="text-purpleTheme-light font-bold">EchoLink</span> for
          their link in bio. One simple link to share everything you create,
          curate, and sell across Instagram, TikTok, Twitter, YouTube, and all
          your social media profiles. Simplify your online presence and amplify
          your reach with EchoLink.
        </p>

        {/* The sm:flex-row class will override flex-col when the screen width reaches the "small" breakpoint and above. */}
        <div className="flex flex-col sm:flex-row justify-center">
{/* 

        <button className="bg-purple-500 hover:bg-purpleTheme-dark2 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            onClick={() => loginWithRedirect()}
            >
              Login
            </button> */}


          <motion.button
            className="bg-purple-500 hover:bg-purpleTheme-dark2 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            onClick={() => loginWithRedirect()}
            whileHover={{
              scale: 2.05,
              x: 10,
              transition: {
                type: "spring",
                stiffness: 50,
                damping: 3,
              },
            }}
            whileTap={{ scale: 0.50 }}
          >
            Login | Sign Up
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
