const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow border rounded-lg p-4 text-center flex-1">
      <h3 className="text-gray-600 text-sm md:text-base">{title}</h3>
      <p className="text-lg md:text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
