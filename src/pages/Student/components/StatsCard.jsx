import React from 'react';

export const StatsCard = ({ icon: Icon, label, value, gradientFrom, gradientTo, borderColor, textColor }) => {
  return (
    <div className={`bg-linear-to-br ${gradientFrom} ${gradientTo} border ${borderColor} rounded-2xl p-6 backdrop-blur-xl`}>
      <div className={`${textColor} mb-2`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className={`${textColor.replace('400', '300')} text-sm font-medium`}>{label}</p>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
  );
};
