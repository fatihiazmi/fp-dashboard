import { FaFileExcel } from "react-icons/fa";
import { utils, writeFileXLSX } from "xlsx";
import DialogCard from "./DialogCard";

const ExportButton = ({ userData, formatDate }) => {
  const handleExport = () => {
    try {
      document.getElementById("eligible_modal").showModal();
      const data = userData.map((player) => {
        const { timestamp, name, score, time, phoneNumber, email } = player;
        return [formatDate(timestamp), name, score, time, phoneNumber, email];
      })

      const headers = ["Date", "Name", "Score", "Time", "Phone", "Email"]
      data.unshift(headers)

      const worksheet = utils.aoa_to_sheet(data);
      const workbook = utils.book_new();

      utils.book_append_sheet(workbook, worksheet, "Players Data");
      writeFileXLSX(workbook, "players_data.xlsx");
    } catch (error) {
      console.error(error);
    } finally {
      document.getElementById("eligible_modal").close();
    }
  };
  return (
    <>
      <div className="flex justify-end items-center">
        <span className="mr-4">Export To: </span>
        <button className="btn btn-ghost" onClick={handleExport}>
          <FaFileExcel />
        </button>
      </div>
      <DialogCard />
    </>
  );
};

export default ExportButton;
