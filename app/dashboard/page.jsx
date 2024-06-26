import ProtectedRoute from "@/components/ProtectedRoute";
import Select from "@/components/Select";


export default function Home() {
  return (
    <ProtectedRoute>
      <Select />
    </ProtectedRoute>
  );
}
