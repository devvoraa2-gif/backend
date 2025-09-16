import { motion } from "framer-motion";
import { Wifi } from "lucide-react";

const Loader = ({ inline = false }) => {
  return (
    <div
      className={
        inline
          ? "flex flex-col items-center justify-center py-8 mt-10"
          : "fixed inset-0 flex flex-col items-center justify-center bg-blue-800 z-50"
      }
    >
      {/* Animated Wifi Icon */}
      <motion.div
        initial={{ rotate: -45 }}
        animate={{
          color: ["#ffffff", "#D9F266", "#ffffff"], // white -> green -> white
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Wifi size={inline ? 40 : 80} />
      </motion.div>

      {/* Business tagline */}
      <motion.p
        className={`mt-4 font-semibold ${
          inline ? "text-gray-700 text-base" : "text-white text-lg"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Connecting your world...
      </motion.p>
    </div>
  );
};

export default Loader;
