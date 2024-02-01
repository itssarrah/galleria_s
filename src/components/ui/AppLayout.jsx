import { Outlet } from "react-router-dom";
import { Nav } from "../navbar";
import Footer from "../Footer";

function AppLayout() {
  return (
    <div>
      <Nav />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
