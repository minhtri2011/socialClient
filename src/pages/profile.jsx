import { Box, Container, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Ads from "../components/widget/ads";
import ListFriends from "../components/widget/listFriends";
import ListPosts from "../components/widget/listPosts";
import NewPost from "../components/widget/newPost";
import UserInfo from "../components/widget/userInfo";
import { usePosts } from "../hooks/usePosts";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Profile = () => {
  const theme = useTheme();
  const { isLoading, posts, getByUserId } = usePosts();
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    if (user.token) getByUserId(id, user.token);
  }, [id]);
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Navbar />

      <Box
        width="100%"
        display="flex"
        gap="3rem"
        padding="2rem 6%"
        justifyContent="space-between"
        marginTop="4rem"
      >
        {/* view ads widget  */}
        <Box flexBasis={"25%"}>
          <UserInfo />
        </Box>

        {/* view list post  */}
        <Box flexBasis={"50%"}>
          <NewPost />
          <ListPosts isLoading={isLoading} posts={posts} />
        </Box>

        {/* view list friends  */}
        <Box flexBasis={"25%"}>
          <ListFriends />
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
