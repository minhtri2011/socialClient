import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import API from "../../api/api";
import { useAuth } from "../../hooks/useAuth";
import { useComment } from "../../hooks/useComment";

const ListComments = ({ postId, show, userPostId }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const { get, add, data, isLoadingRemoveComment, deleteComment } =
    useComment();
  const commentRef = useRef(null);

  //todo: fetch Comments
  useEffect(() => {
    if (!show) return;
    get(postId, user.token);
  }, [show]);

  //todo: add comment
  const submitComment = (e) => {
    e.preventDefault();
    add(commentRef.current.value, user.user._id, postId, user.token);
  };

  const renderDeleteButton = (author, commentId) => {
    // if user upload post or author comment same user login then show remove button
    if (userPostId === user.user._id || author === user.user._id) {
      return (
        <IconButton
          disabled={isLoadingRemoveComment}
          onClick={()=>deleteComment(commentId,user.token,postId)}
        >
          <DeleteIcon
            sx={{
              color: theme.palette.neutral.main,
              cursor: "pointer",
              transition: "all .2s linear",
              opacity: ".4",
              "&:hover": { opacity: 1 },
            }}
          />
        </IconButton>
      );
    }
    return;
  };
  return (
    <>
      <Box position="relative" margin={".6rem 0 1rem"}>
        <form onSubmit={submitComment}>
          <InputBase
            inputRef={commentRef}
            placeholder="What's on your mind"
            fullWidth
            sx={{
              backgroundColor: theme.palette.neutral.light,
              padding: ".5rem 1rem",
              borderRadius: "10px",
            }}
          />
          <ButtonBase
            type="submit"
            sx={{
              cursor: "pointer",
              position: "absolute",
              top: "0px",
              right: "10px",
              transform: "translateY(50%)",
              display: "block",
            }}
          >
            <SendIcon />
          </ButtonBase>
        </form>
      </Box>

      <Box>
        {data
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((comment) => {
            return (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                key={comment._id}
              >
                <List>
                  <ListItem disablePadding>
                    <Avatar
                      alt={comment.author.firstName}
                      src={`${
                        comment.author.picturePath
                          ? `${API}/assets/${comment.author.picturePath}`
                          : ""
                      }`}
                      sx={{ marginRight: "10px" }}
                    />
                    <ListItemText
                      primary={`${comment.author.lastName} ${comment.author.firstName}`}
                      secondary={comment.body}
                      sx={{
                        ".MuiListItemText-primary": {
                          color: theme.palette.neutral.main,
                          fontWeight: "bold",
                          fontSize: ".9rem",
                        },
                        ".MuiListItemText-secondary": {
                          color: theme.palette.neutral.mediumMain,
                          fontSize: ".9rem",
                        },
                      }}
                    />
                  </ListItem>
                </List>

                {renderDeleteButton(comment.author._id, comment._id)}
              </Box>
            );
          })}
      </Box>
    </>
  );
};

export default ListComments;
