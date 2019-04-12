import React from "react";
import { Grid, Menu } from "semantic-ui-react";
import "./Nav.css";
const styles={
  margin:0,
  padding:0,
  overflow:"hidden",
}
function Nav() {
  return (
    <nav style={styles} className="ui inverted menu">

      <Grid padded className="tablet computer only">
        <Menu borderless inverted fluid fixed="top">
          <Menu.Item header as="a" href="/home"> 
          Data Analytics
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item as="a" href="/popular">Latest</Menu.Item>
            <Menu.Item as="a" href="/search">Search!</Menu.Item>
            <Menu.Item as="a" href="/statistics">Statistics</Menu.Item>
            <Menu.Item as="a" href="/about">About</Menu.Item>
            {/* <Menu.Item as="a" href="/profile">Profile</Menu.Item>
            <Menu.Item as="a" href="/help">Help</Menu.Item> */}
          </Menu.Menu>
        </Menu>
      </Grid>
    </nav>
  );
}

export default Nav;
