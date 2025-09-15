
const DashboardCard = ({ title, value, icon: Icon, color = "blue" }) => {
  const colors = {
    blue: "from-blue-50 to-white text-blue-600 bg-blue-100",
    green: "from-green-50 to-white text-green-600 bg-green-100",
    yellow: "from-yellow-50 to-white text-yellow-600 bg-yellow-100",
    red: "from-red-50 to-white text-red-600 bg-red-100",
  };

  const selectedColor = colors[color] || colors.blue;

  return (
    <div
      className={`bg-gradient-to-br ${selectedColor.split(" ")[0]} ${
        selectedColor.split(" ")[1]
      } shadow-md hover:shadow-lg border border-gray-200 rounded-xl p-5 text-center flex-1 transition-all duration-300`}
    >
      {/* Icon */}
      {Icon && (
        <div className="flex justify-center mb-3">
          <div
            className={`p-3 rounded-full ${
              selectedColor.split(" ").slice(2).join(" ")
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="text-gray-500 text-sm md:text-base font-medium tracking-wide">
        {title}
      </h3>

      {/* Value */}
      <p className="text-xl md:text-3xl font-bold mt-2 text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;
