interface DriverFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  meetings: { meeting_key: number; country_name: string; meeting_name: string }[];
  selectedMeetingKey: number | "";
  onMeetingChange: (key: number) => void;
  loading: boolean;
}

export const DriverFilters = ({
  searchQuery, onSearchChange,
  selectedYear, onYearChange,
  meetings, selectedMeetingKey, onMeetingChange,
  loading,
}: DriverFiltersProps) => (
  <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
    <input
      type="text"
      placeholder="Rechercher un pilote..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-bar !m-0 flex-1"
    />

    <select
      value={selectedYear}
      onChange={(e) => onYearChange(e.target.value)}
      className="bg-white border border-gray-300 text-gray-900 text-base font-bold rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full md:w-40 p-4 shadow-sm cursor-pointer"
    >
      {["2026", "2025", "2024", "2023"].map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>

    <select
      value={selectedMeetingKey}
      onChange={(e) => onMeetingChange(Number(e.target.value))}
      className="bg-white border border-gray-300 text-gray-900 text-base font-bold rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full md:w-64 p-4 shadow-sm cursor-pointer truncate"
      disabled={meetings.length === 0 || loading}
    >
      {meetings.map((m) => (
        <option key={m.meeting_key} value={m.meeting_key}>
          {m.country_name} - {m.meeting_name}
        </option>
      ))}
    </select>
  </div>
);