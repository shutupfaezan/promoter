import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PromoterLogin from './components/PromoterLogin';
import PromoterDashboard from './components/PromoterDashboard';
import PromoterHost from './components/PromoterHost';
import PromoterEvents from './components/PromoterEvents';
import PromoterSingularEvents from './components/PromoterSIngularEvents';
import PromoterAllOrders from './components/PromoterAllOrders';
import PromoterQRScanner from './components/PromoterQRScanner';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/promoter-login" />} />
          <Route exact path="/promoter-login" element={<PromoterLogin />} />
          <Route exact path="/promoter-dashboard" element={<PromoterDashboard/>} />
          <Route exact path="/host-an-event" element={<PromoterHost/>} />
          <Route exact path="/promoter-events" element={<PromoterEvents/>} />
          <Route exact path="/promoter-events/:event_name" element={<PromoterSingularEvents/>} />
          <Route exact path="/promoter-events/:event_name/all-orders" element={<PromoterAllOrders/>} />
          <Route exact path="/qr-scanner" element={<PromoterQRScanner/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;