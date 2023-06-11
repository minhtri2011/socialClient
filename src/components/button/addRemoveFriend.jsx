import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton, useTheme } from "@mui/material";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFriends } from "../../hooks/useFriends";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const AddRemoveFriend = ({ friendId }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const { addRemove, isLoading } = useFriends();
  const listFriends = useSelector((state) => state.friends);

  const checkFriend = () => {
    const find = listFriends?.friends
     ?.map((friend) => friend._id)
      .includes(friendId);
    return find ;
  };
  if (checkFriend())
    return (
      <IconButton
        onClick={() => addRemove(user.user._id, friendId, user.token)}
        disabled={isLoading}
        sx={{ backgroundColor: theme.palette.neutral.light }}
      >
       <PersonRemoveIcon />
      </IconButton>
    );

  return (
    <IconButton
      disabled={isLoading}
      onClick={() => addRemove(user.user._id, friendId, user.token)}
      sx={{ backgroundColor: theme.palette.neutral.light }}
    >
       <PersonAddIcon />
    </IconButton>
  );
};

export default AddRemoveFriend;
