import { memo } from "react";

function PhotoFilters({ activeFilter, onFilterChange }) {
  const filters = [
    { id: "all", label: "Alle Foto's" },
    { id: "themba", label: "Themba" },
    { id: "motsi", label: "Motsi" },
    { id: "samen", label: "Samen" },
    { id: "pups", label: "Pups" },
  ];

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`px-5 py-2 rounded-full transition-colors cursor-pointer ${
            activeFilter === filter.id
              ? "bg-amber-800 text-white"
              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
          }`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(PhotoFilters);
