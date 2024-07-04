import React, { createContext, useState, useContext } from "react";

const DateFilterContext = createContext();

export const useDateFilter = () => {
  return useContext(DateFilterContext);
};

export const DateFilterProvider = ({ children }) => {
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <DateFilterContext.Provider value={{ dateFilter, setDateFilter }}>
      {children}
    </DateFilterContext.Provider>
  );
};
