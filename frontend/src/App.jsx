import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import Deliveries from "./pages/Deliveries";
import AIAssistant from "./pages/AIAssistant";

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/deliveries" element={<Deliveries />} />
                <Route path="/ai" element={<AIAssistant />} />
            </Routes>
        </MainLayout>
    );
}

export default App;