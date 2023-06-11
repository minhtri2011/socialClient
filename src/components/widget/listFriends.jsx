import { Avatar, Box, Skeleton, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";

import API from "../../api/api";
import { useFriends } from "../../hooks/useFriends";
import Widget from "./widget";
import AddRemoveFriend from "../button/addRemoveFriend";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ListFriends = () => {
  const { isLoading, get, friends } = useFriends();
  const { user } = useAuth();
  const theme = useTheme();
  useEffect(() => {
    const id = user.user._id;
    const token = user.token;
    id && get(id, token);
  }, []);

  // loading skeleton when fetch friends list
  if (isLoading)
    return (
      <Widget
        sx={{
          position: "sticky",
          top: "6rem",
          maxHeight: "80vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdbdbd",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#757575",
          },
        }}
      >
        <Typography variant="h5" fontWeight={"600"} fontSize={"1.2rem"}>
          List friends
        </Typography>
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"space-between"}
          padding="10px 0"
          sx={{ cursor: "pointer" }}
        >
          <Box display="flex" alignItems={"center"} width={"100%"}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ marginRight: "10px" }}
            />
            <Skeleton variant="rectangular" sx={{ flexGrow: 1 }} height={60} />
          </Box>
        </Box>
      </Widget>
    );

  return (
    <Widget
      sx={{
        position: "sticky",
        top: "6rem",
        maxHeight: "80vh",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#bdbdbd",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#757575",
        },
      }}
    >
      <Typography variant="h5" fontWeight={"600"} fontSize={"1.2rem"}>
        List friends
      </Typography>

      {/* check if dont have friends   */}
      {friends && !Boolean(friends.length) && (
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"space-between"}
          padding="10px 0"
          sx={{ cursor: "pointer" }}
        >
          <Box display="flex" alignItems={"center"}>
            <Typography>Let's make more friends</Typography>
          </Box>
        </Box>
      )}

      {/* if user have many friends  */}
      {friends?.map((friend) => {
        return (
          <Box
            key={friend._id}
            display="flex"
            alignItems={"center"}
            justifyContent={"space-between"}
            padding="10px 0"
          >
            <Box component={Link} to={`/user/${friend._id}`} sx={{textDecoration:'none'}}>
              <Box display="flex" alignItems={"center"}>
                <Avatar
                  src={`${API}/assets/${friend.picturePath}`}
                  sx={{ marginRight: "10px" }}
                />
                <Typography color={theme.palette.neutral.main} >
                  {friend.firstName} {friend.lastName}
                </Typography>
              </Box>
            </Box>
            <AddRemoveFriend friendId={friend._id} />
          </Box>
        );
      })}
    </Widget>
  );
};

export default ListFriends;
