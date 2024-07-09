import { utils, writeFileXLSX } from "xlsx";

const ExportButton = ({ tableRef }) => {
  const handleExport = () => {
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
      const checkbox = cells[8].querySelector("input[type='checkbox']");
      const eligibleCol = checkbox ? (checkbox?.checked ? "Eligible" : "Not Eligible") : "Eligibility";
      return [
        dateCol,
        nameCol,
        scoreCol,
        timeCol,
        phoneCol,
        emailCol,
        eligibleCol,
      ];
    });

    const worksheet = utils.aoa_to_sheet(data);
    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "Players Data");
    writeFileXLSX(workbook, "players_data.xlsx");
  };
  return (
    <div className="flex justify-end">
      <button className="btn btn-ghost" onClick={handleExport}>
        Export to Excel
      </button>
    </div>
  );
};

export default ExportButton;
