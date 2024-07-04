"use client";
import LargeCard from "@/components/LargeCard";
import SmallCard from "@/components/SmallCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import PlayersDetailsTable from "@/components/PlayersDetailsTable";
import { useEffect, useState } from "react";
import { DateFilterProvider } from "@/context/DateFilterContext";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users");
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

  const topScorer = userData.reduce((prev, current) => {
    const prevScore = prev.score ?? -Infinity; // Use -Infinity as default if score is null/undefined
    const currentScore = current.score ?? -Infinity;
    return prevScore > currentScore ? prev : current;
  }, {});

  const fastestPlayer = userData.reduce((prev, current) => {
    const prevTime = prev.time ?? Infinity; // Use Infinity as default if time is null/undefined
    const currentTime = current.time ?? Infinity;
    return prevTime < currentTime ? prev : current;
  }, {});

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 pb-4">
        <SmallCard
          title="Top Scorer"
          content={`${topScorer.name} : ${topScorer.score}`}
          loading={loading}
        />
        <SmallCard
          title="Fastest Player"
          content={`${fastestPlayer.name} : ${fastestPlayer.time}`}
          loading={loading}
        />
      </div>
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
