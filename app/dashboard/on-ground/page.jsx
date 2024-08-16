"use client";
import LargeCard from "@/components/LargeCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import PlayersDetailsTable from "@/components/PlayersDetailsTable";
import { useEffect, useState } from "react";
import { DateFilterProvider } from "@/context/DateFilterContext";

const getWeekStartEnd = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users/onground");
        if (!response.ok) {
          throw new Error("Network response not OK " + response.statusText);
        }
        const result = await response.json();
        setUserData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const today = new Date();
  const { start: weekStart, end: weekEnd } = getWeekStartEnd(today);

  const filteredUserData = userData.filter(user => {
    const userDate = new Date(user.timestamp); // Assuming user.timestamp is the date field
    return userDate >= weekStart && userDate <= weekEnd;
  });

  const topScorer = filteredUserData.reduce((prev, current) => {
    const prevScore = prev.score ?? -Infinity; // Use -Infinity as default if score is null/undefined
    const currentScore = current.score ?? -Infinity;

    if (currentScore > prevScore) {
      return current;
    } else if (currentScore === prevScore) {
      const prevTime = prev.time ?? Infinity;
      const currentTime = current.time ?? Infinity;
      return currentTime < prevTime ? current : prev;
    } else {
      return prev;
    }
  }, {});

  const fastestPlayer = filteredUserData.reduce((prev, current) => {
    const prevTime = prev.time ?? Infinity; // Use Infinity as default if time is null/undefined
    const currentTime = current.time ?? Infinity;
    return prevTime < currentTime ? prev : current;
  }, {});

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1">
        <LargeCard title="Players">
          <DateFilterProvider>
            <PlayersDetailsTable userData={userData} loading={loading} />
          </DateFilterProvider>
        </LargeCard>
      </div>
    </ProtectedRoute>
  );
}
