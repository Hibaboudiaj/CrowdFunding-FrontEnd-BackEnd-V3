const StatCard = ({ title, value, icon }) => {
    return (
        <div className="bg-secondary rounded-lg p-4">
            {icon && <div className="mb-4">{icon}</div>}
            <h3 className="text-sm text-gray-500">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
};

export default StatCard;
