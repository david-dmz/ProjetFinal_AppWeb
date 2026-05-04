import { useState, useEffect } from "react";
import { fetchDrivers, fetchMeetings, type Driver, type Meeting } from "../API/openF1";

export const useDriverFilters = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeetingKey, setSelectedMeetingKey] = useState<number | "">("");

  useEffect(() => {
    const loadMeetings = async () => {
      setLoading(true);
      const meetingsData = await fetchMeetings(selectedYear);
      setMeetings(meetingsData);
      if (meetingsData.length > 0) {
        setSelectedMeetingKey(meetingsData[0].meeting_key);
      } else {
        setDrivers([]);
        setSelectedMeetingKey("");
        setLoading(false);
      }
    };
    loadMeetings();
  }, [selectedYear]);

  useEffect(() => {
    if (!selectedMeetingKey) return;
    const loadDrivers = async () => {
      setLoading(true);
      const driversData = await fetchDrivers(Number(selectedMeetingKey));
      setDrivers(driversData);
      setLoading(false);
    };
    loadDrivers();
  }, [selectedMeetingKey]);

  return {
    drivers,
    loading,
    meetings,
    selectedYear,
    setSelectedYear,
    selectedMeetingKey,
    setSelectedMeetingKey,
  };
};