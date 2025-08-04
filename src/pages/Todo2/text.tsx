import React, { useState } from "react";

const options = [
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Cancel", label: "Cancel" },
];
export default function TextPage() {
  const [selected, setSelected] = useState<string>("Active"); // Giá trị mặc định

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value); // Gán lại khi chọn option khác
  };

  return (
    <div>
      <select value={selected} onChange={handleChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <p>Giá trị đã chọn: {selected}</p>

      <button onClick={() => setSelected("Cancel")}>Chọn Cancel bằng code</button>
    </div>
  );
}