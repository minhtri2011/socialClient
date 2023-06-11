import MailIcon from "@mui/icons-material/Mail";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../../api/api";
import { getUserById } from "../../api/user";
import { useAuth } from "../../hooks/useAuth";
import Widget from "./widget";

const UserInfo = () => {
  const theme = useTheme();
  const { user: userLogin } = useAuth();
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const getUser = async () => {
      try {
        const response = await getUserById(id, userLogin.token);
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id]);

  if (!user)
    return (
      <Widget sx={{ position: "sticky", top: "6rem" }}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ margin: "auto" }}
        />
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={100}
          sx={{ marginTop: "10px" }}
        />
      </Widget>
    );

  return (
    <Widget sx={{ position: "sticky", top: "6rem" }}>
      <Avatar
        alt={user.firstName}
        src={`${user.picturePath ? `${API}/assets/${user.picturePath}` : ""}`}
        sx={{ margin: "auto" }}
      />
      <Typography
        color={theme.palette.neutral.main}
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {user.firstName} {user.lastName}
      </Typography>
      <Typography sx={{ marginTop: "10px" }}>
        Email:{" "}
        <Typography component="span" color={theme.palette.neutral.main}>
          {user.email}
        </Typography>
      </Typography>
      <Typography>
        Location:{" "}
        <Typography component="span" color={theme.palette.neutral.main}>
          {user.location}
        </Typography>
      </Typography>
      <Typography>
        Occupation:{" "}
        <Typography component="span" color={theme.palette.neutral.main}>
          {user.occupation}
        </Typography>
      </Typography>

      <List component={Link} to={`/message/${user._id}`} sx={{textDecoration:'none'}}>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Sent message" sx={{color:theme.palette.neutral.main}}/>
          </ListItemButton>
        </ListItem>
      </List>
    </Widget>
  );
};

export default UserInfo;
