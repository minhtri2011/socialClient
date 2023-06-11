import { Skeleton } from "@mui/material";
import React from "react";
import Post from "./post";
import Widget from "./widget";
const ListPosts = (props) => {
  const { isLoading, posts, get } = props;

  // skeleton loading when fetch post list
  if (isLoading)
    return (
      <Widget sx={{ margin: "10px 0", overflowWrap: "break-word" }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={60}
          sx={{ marginTop: "10px" }}
        />
      </Widget>
    );

  return (
    <>
      {Array.isArray(posts) &&
        posts.length > 0 &&
        [...posts]
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => {
            return <Post data={post} key={post._id} />;
          })}
    </>
  );
};

export default ListPosts;
