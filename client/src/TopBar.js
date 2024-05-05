import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom"

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiSilverwareForkKnife, mdiLogout } from "@mdi/js";

function TopBar() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Navbar className="topbar" style={componentStyle()}>
        <Navbar.Brand>
          <button class="btn btn-danger" style={brandStyle()} onClick={() => navigate("/")}>
            <Icon path={mdiSilverwareForkKnife} size={1} color={"white"} />
            Owen's Own
          </button>
        </Navbar.Brand>
        <Navbar.Brand>
          <button class="btn btn-warning" style={brandStyle()} onClick={() => navigate("/itemdetail")}>
            Menu's items
          </button>
        </Navbar.Brand>
        <Navbar.Brand>
        </Navbar.Brand>
        <div className="user">
        <Nav>
          <NavDropdown
            title={loggedInUser ? loggedInUser.name : "Sign in"}
            drop={"start"}
            >
            {getUserMenuList({ userList, loggedInUser, handlerMap })}
          </NavDropdown>
        </Nav>
        </div>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#cf5353" };
}

function brandStyle() {
  return {
    display: "flex",
    gap: "8px",
    color: "white",
  };
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
  const userMenuItemList = userList.map((user) => (
    <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
      {user.name}
    </NavDropdown.Item>
  ));

  if (loggedInUser) {
    userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
    userMenuItemList.push(
      <NavDropdown.Item
        key={"logout"}
        onClick={() => handlerMap.logout()}
        style={{ color: "red" }}
      >
        <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Sign out"}
      </NavDropdown.Item>
    );
  }

  return userMenuItemList;
}

export default TopBar;
