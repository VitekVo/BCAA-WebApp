import "./style.css"
import { Content } from "./Content"

function App() {

  return (
    <div className="main">
      <div className="header">
        <div className="name">Owen's Own</div>
        <div className="user">Table 2</div>
        <div className="clearfix"></div>
      </div>
      <div className="grid-container">
        <Content></Content>
      </div>
      <footer>
        VitekVo TM
      </footer>
  </div>
  )
}

export default App
