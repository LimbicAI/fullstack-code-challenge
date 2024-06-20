import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/RootStoreContext";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Person, ViewList } from "@mui/icons-material/";
import { ListItemIcon } from "@mui/material";

const UserList: React.FC = observer(() => {
  const { userStore } = useContext(RootStoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    userStore.fetchUsers();
  }, [userStore]);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {userStore.users.map((user) => (
        <ListItem key={user.id}>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary="" />
          <ListItemIcon
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/users/${user.id}/answers`)}
          >
            <ViewList />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
});

export default UserList;
