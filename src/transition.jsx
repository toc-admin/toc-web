import { motion } from "framer-motion";

const transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />

      {/* Transition layer animating from left to right (covering) */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-red-900 to-red-700 origin-left z-50 pointer-events-none"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Transition layer animating from right to left (revealing) */}
      <motion.div
        className="fixed top-0 right-0 w-full h-screen bg-gradient-to-l from-black to-gray-900 origin-right z-50 pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </>
  );
};

export default transition;