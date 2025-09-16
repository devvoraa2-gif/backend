import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Spinning ring */}
      <motion.div
        className="w-10 h-10 rounded-full border-4 border-t-4 border-transparent border-t-[#D9F266]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      {/* Subtitle */}
      <motion.p
        className="mt-2 text-gray-600 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;
