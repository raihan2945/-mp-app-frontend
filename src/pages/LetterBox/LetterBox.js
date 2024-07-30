import React from "react";
import "./letterBox.css";
import LetterHeader from "../../views/LetterBox/Header";
import DataTable from "../../views/LetterBox/DataTable";

const LetterBox = () => {
  return (
    <>
      <LetterHeader />

      {/* data table */}
      <div className="data-table__container">
        <DataTable />
      </div>
    </>
  );
};

export default LetterBox;
