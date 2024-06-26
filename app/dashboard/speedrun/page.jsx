import LargeCard from "@/components/LargeCard";
import SmallCard from "@/components/SmallCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import PlayersTable from "@/components/PlayersTable";

export default function Home() {
  const topScore = {
    name: "Nik",
    score: 100,
  };
  const fastestPlayer = {
    name: "Nik",
    time: "50s",
  };
  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 pb-4">
        <SmallCard
          title="Top Scorer"
          content={`${topScore.name} : ${topScore.score}`}
          trend="up"
        />
        <SmallCard
          title="Fastest Player"
          content={`${fastestPlayer.name} : ${fastestPlayer.time}`}
          trend="up"
        />
      </div>
      <div className="grid grid-cols-1">
        <LargeCard title="Players">
          <PlayersTable />
        </LargeCard>
      </div>
    </ProtectedRoute>
  );
}
