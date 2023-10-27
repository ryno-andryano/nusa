import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Sidebar from "./layouts/Sidebar.jsx";
import Main from "./layouts/Main.jsx";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Main>
        <Routes>
          <Route path="/" element={<Navigate to="/order" />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<HistoryDetail />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
