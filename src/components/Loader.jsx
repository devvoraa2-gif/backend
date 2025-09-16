import { motion } from "framer-motion";
import { Wifi } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-800 z-50">

      <div className="flex items-center gap-3">
        <motion.div
          initial={{ rotate: -45 }}
          animate={{
            color: ["#ffffff", "#D9F266", "#ffffff"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Wifi size={60} />
        </motion.div>

        <h1 className="text-white text-2xl font-bold">Elite UK</h1>
      </div>

      <motion.p
        className="mt-6 text-white text-lg font-semibold"
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
