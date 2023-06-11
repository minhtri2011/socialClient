import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import API from "../../api/api";
import { useAuth } from "../../hooks/useAuth";
import { useComment } from "../../hooks/useComment";
import { usePosts } from "../../hooks/usePosts";
import AddRemoveFriend from "../button/addRemoveFriend";
import ListComments from "./ListComments";
import Widget from "./widget";
import { Link } from "react-router-dom";

const Post = ({ data }) => {
  const theme = useTheme();
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();
  const { remove, like } = usePosts();

  const isLiked = data.likes && data.likes.includes(user.user._id);

  const likePost = (id) => {
    like(id, user.user._id, user.token);
  };

  const deletePost = (id) => {
    remove(id, user.token);
  };
  return (
    <Widget sx={{ margin: "10px 0", overflowWrap: "break-word" }}>
      <Box display="flex" justifyContent="space-between" alignItems={"center"}>
        <List>
          <Box component={Link} to={`/user/${data.user._id}`} sx={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <Avatar
                alt={data.user.firstName}
                src={`${
                  data.user.picturePath
                    ? `${API}/assets/${data.user.picturePath}`
                    : ""
                }`}
                sx={{ marginRight: "10px" }}
              />
              <ListItemText
                primary={`${data.user.lastName} ${data.user.firstName}`}
                secondary={data.user.location}
                sx={{
                  ".MuiListItemText-primary": {
                    color: theme.palette.neutral.main,
                    fontWeight: "bold",
                  },
                  ".MuiListItemText-secondary": {
                    color: theme.palette.neutral.mediumMain,
                    fontSize: ".7rem",
                  },
                }}
              />
            </ListItem>
          </Box>
        </List>

        {/*//todo: add/remove friend button */}
        <Box display="flex" alignItems="center">
          {/* check if not your post, hide delete post button  */}
          {user.user._id === data.user._id && (
            <IconButton
              onClick={() => deletePost(data._id)}
              sx={{
                backgroundColor: theme.palette.neutral.light,
              }}
            >
              <DeleteIcon sx={{ color: "#ff1744" }} />
            </IconButton>
          )}

          {/* check your post, hide add delete friend button  */}
          {user.user._id !== data.user._id && (
            <AddRemoveFriend friendId={data.user._id} />
          )}
        </Box>
      </Box>

      {/* show content  */}
      <Typography>{data.description}</Typography>

      {/*show img */}
      {data.picturePath && (
        <Box
          sx={{ width: "100%", borderRadius: "1rem", marginTop: ".6rem" }}
          component="img"
          src={`${API}/assets/${data.picturePath}`}
        />
      )}

      {/* like comment button  */}
      <Box display="flex" alignItems={"center"}>
        {/* like button  */}
        <IconButton onClick={() => likePost(data._id)}>
          {isLiked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography sx={{ marginLeft: "-5px" }}>{data.likes.length}</Typography>

        {/* comment button  */}
        <IconButton
          sx={{ marginLeft: "10px" }}
          onClick={() => setShowComments((v) => !v)}
        >
          <CommentIcon />
        </IconButton>
        <Typography sx={{ marginLeft: "-5px" }}>{data.comments}</Typography>
      </Box>

      {/* //todo: show list comments  */}
      <Collapse in={showComments}>
        <ListComments
          postId={data._id}
          userPostId={data.user._id}
          show={showComments}
        />
      </Collapse>
    </Widget>
  );
};

export default Post;
