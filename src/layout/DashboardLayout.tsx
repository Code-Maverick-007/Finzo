import { Outlet } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
