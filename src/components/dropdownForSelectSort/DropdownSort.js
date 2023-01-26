import React, { useState } from "react";

export default function DropdownSort({ setSortText, sortBy }) {
  const [selected, setSelected] = useState("");
  setSortText(selected)

  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)} class="form-select" aria-label="Default select example" placeholder="Saralash">
      <option selected value={""}>Saralash</option>
      {sortBy.length ? sortBy.map(item => (
         <option value={item.value}>{item.name}</option>
      )) : null}
    </select>
  );
}
