import "./style.css"
import { MainsList } from "./MainsList"
import { MainsItem } from "./MainsItem"

function App() {
  return (
    <body>
      <div className="menu-list">
        <div class="" className="menu-header">
          <h1 style={{border:"1px solid #4CAF50"}} htmlFor="item">Menu</h1>
        </div>
        <MainsList>
        </MainsList>
        <MainsItem></MainsItem>
      </div>
    </body>
  )
}

export default App
