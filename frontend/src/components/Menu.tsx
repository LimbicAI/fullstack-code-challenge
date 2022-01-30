import React, { useEffect, useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

interface MenuProps {
  open?: boolean;
}

const Menu: React.FC<MenuProps> = ({ open = false }) => {
  const [currentPage, setCurrentPage] = useState<string>();

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  return (
    <>
      <List>
        <ListItem
          component="a"
          button
          href="/"
          selected={currentPage === "/"}
          title={!open ? "Home" : undefined}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          component="a"
          button
          href="/users"
          selected={currentPage?.startsWith("/users")}
          title={!open ? "Users" : undefined}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </List>
      <List>
        <ListItem
          component="a"
          button
          href="/questions"
          selected={currentPage?.startsWith("/questions")}
          title={!open ? "Questions" : undefined}
        >
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText primary="Questions" />
        </ListItem>
      </List>
    </>
  );
};

export default Menu;
