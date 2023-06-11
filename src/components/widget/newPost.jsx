import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  ButtonBase,
  Divider,
  IconButton,
  InputBase,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";
import Widget from "./widget";
import { useEffect } from "react";

const NewPost = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const inputRef = useRef(null);
  const { add } = usePosts();
  const { getInputProps, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });

      setFile(acceptedFiles[0]);
    },
  });

  // render thumbs img when choose complete
  const thumbs = () => {
    return (
      <Box
        sx={{
          display: "inline-flex",
          borderRadius: 2,
          border: "1px solid #eaeaea",
          width: "100%",
          boxSizing: "border-box",
          marginTop: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            minWidth: 0,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            position="absolute"
            top="0"
            right="0"
            padding="2px"
            borderRadius={"5px"}
            onClick={() => {
              setFile([]);
            }}
            sx={{
              backgroundColor: "#00000044",
              cursor: "pointer",
              transition: "all .1s ease-in-out",
              "&:hover": { transform: "scale(.9)" },
            }}
          >
            {file && <CloseIcon sx={{ display: "block" }} />}
          </Box>
          <Box
            component="img"
            src={file.preview}
            sx={{
              display: "block",
              width: "100%",
            }}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </Box>
      </Box>
    );
  };

  //submit new post from user
  const addPost = async () => {
    if (inputRef.current.value.length === 0 && !file) return;
    try {
      const formData = new FormData();
      formData.append("userId", user.user._id);
      formData.append("description", inputRef.current.value);
      formData.append("file", file);
      formData.append("picturePath", file?.name ? file.name : "");

      await add(formData, user.token);
      if (inputRef.current.value.length > 0) inputRef.current.value = "";
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Widget>
      {/* input content  */}
      <InputBase
        multiline
        placeholder="What's on your mind"
        fullWidth
        inputRef={inputRef}
        sx={{
          backgroundColor: theme.palette.neutral.light,
          padding: ".8rem 2.5rem",
          borderRadius: "10px",
        }}
      />

      {/* review image component  */}
      {file && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {thumbs()}
        </Box>
      )}

      {/* list button  */}
      <Box paddingTop="1rem">
        <Box display="flex" justifyContent={"space-between"}>
          {/* check if file image exists, hide choose img component */}
          {!file && (
            <>
              <Box width="100%" display="flex" justifyContent={"center"}>
                <input {...getInputProps()} />
                <IconButton
                  onClick={open}
                  sx={{ width: "100%", borderRadius: "0", padding: ".5rem" }}
                >
                  <ImageIcon />
                </IconButton>
              </Box>
              <Divider orientation="vertical" flexItem />{" "}
            </>
          )}
          <ButtonBase
            sx={{
              width: "100%",
              transition: "all .2s ease-in-out",
              padding: ".5rem",
              "&:hover": {
                backgroundColor: theme.palette.neutral.light,
              },
            }}
            variant="contained"
            onClick={addPost}
          >
            <SendIcon />
          </ButtonBase>
        </Box>
      </Box>
    </Widget>
  );
};

export default NewPost;
