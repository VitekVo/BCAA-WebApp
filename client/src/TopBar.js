import { useContext } from "react";
import { UserContext } from "./UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiSilverwareForkKnife, mdiLogout } from "@mdi/js";

function NavBar() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);


  return (
    <Navbar className="topbar" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <div className="name" style={brandStyle()}>
            <Icon path={mdiSilverwareForkKnife} size={1} color={"white"} />
            Owen's Own
          </div>
        </Navbar.Brand>
        <Nav>
          <NavDropdown
            title={loggedInUser ? loggedInUser.name : "Sign in"}
            drop={"start"}
          >
            {getUserMenuList({ userList, loggedInUser, handlerMap })}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#cf5353" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "left",
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

export default NavBar;
