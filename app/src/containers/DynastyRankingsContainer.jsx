import React, { useState } from "react";
import DynastyRankingsUI from "../ui/DynastyRankingsUI";

export default function DynastyRankingsContainer({ processedRosters }) {
  const [sort, setSort] = useState("TEAM");
  const [asc, setAsc] = useState(true);

  const handleSort = (value) => {
    if(value === "TEAM" || value === "RANK" || value === "TOTAL") {
      setAsc("TEAM" !== sort ? true : !asc);
      setSort("TEAM");
    } else {
      setAsc(true);
      setSort(value);
    };
  };
  return (
    <DynastyRankingsUI
        asc={asc}
        handleSort={handleSort}
        processedRosters={processedRosters}
        setAsc={setAsc}
        sort={sort}
    />
  )
}