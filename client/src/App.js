import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from "./TopBar";
import { Content } from "./Content";
import Footer from "./Footer"
import UserProvider from "./UserProvider";


function App() {

  return (
    <div className="app-container">
    <UserProvider>
      <TopBar />
        <Content></Content>
      <Footer />
  </UserProvider>
  </div>
  )
}

export default App
