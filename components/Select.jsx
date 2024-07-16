"use client"
import { useRouter } from "next/navigation";
const Select = () => {
  const router = useRouter()


  const handleSelect = (e) => {
    router.push(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 mt-28">
          <label htmlFor="dash-select" className="text-4xl font-bold">Please Select Your Dashboard View</label>
          <select id="dash-select" className="select select-bordered select-lg w-full max-w-xs" onChange={handleSelect}>
            <option disabled selected>
              Please Select
            </option>
            <option value="/dashboard/online">Online</option>
            <option value="/dashboard/speedrun">Speedrun</option>
            <option value="/dashboard/on-ground">On-Ground</option>
          </select>
      </div>
    </>
  );
};

export default Select;
