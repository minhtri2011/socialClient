import { Box, Container, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Ads from "../components/widget/ads";
import ListFriends from "../components/widget/listFriends";
import ListPosts from "../components/widget/listPosts";
import NewPost from "../components/widget/newPost";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";

const Home = () => {
  const theme = useTheme();
  const { isLoading, posts, get } = usePosts();
  const { user } = useAuth();

  useEffect(() => {
    if (user.token) get(user.token);
  }, []);

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Box
        width="100%"
        display="flex"
        gap="3rem"
        padding="2rem 6%"
        justifyContent="space-between"
      >
        {/* view ads widget  */}
        <Box flexBasis={"25%"}>
          <Ads />
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

export default Home;
