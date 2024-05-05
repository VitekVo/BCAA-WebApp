import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserProvider from "./UserProvider";
import TopBar from "./TopBar";
import Content from "./Content";
import ItemDetail from "./ItemDetail";
import Footer from "./Footer"

function App() {
  return (
    <div className="app-container">
      <UserProvider>
        <Router>
          <TopBar />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/itemdetail/" element={<ItemDetail />} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App
