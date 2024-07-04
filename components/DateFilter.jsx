import Datepicker from "react-tailwindcss-datepicker";
import { useDateFilter } from "@/context/DateFilterContext";

const DateFilter = () => {
  const { dateFilter, setDateFilter } = useDateFilter();

  const handleValueChange = (newValue) => {
    setDateFilter({
      startDate: newValue.startDate,
      endDate: newValue.endDate,
    });
  };

  return (
    <Datepicker
      value={dateFilter}
      onChange={handleValueChange}
      showShortcuts={true}
      placeholder="Filter date..."
      displayFormat={"DD/MM/YYYY"}
    />
  );
};

export default DateFilter;
