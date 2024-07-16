import { FaFileExcel } from "react-icons/fa";
import { utils, writeFileXLSX } from "xlsx";
import DialogCard from "./DialogCard";

const ExportButton = ({ tableRef }) => {
  const handleExport = () => {
    try {
      document.getElementById("eligible_modal").showModal();
      const table = tableRef.current;
      const rows = Array.from(table.querySelectorAll("tr"));

      const data = rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td, th"));
        const dateCol = cells[1]?.textContent;
        const nameCol = cells[2]?.textContent;
        const scoreCol = cells[3]?.textContent;
        const timeCol = cells[4]?.textContent;
        const phoneCol = cells[5]?.textContent;
        const emailCol = cells[6]?.textContent;
        return [dateCol, nameCol, scoreCol, timeCol, phoneCol, emailCol];
      });

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
