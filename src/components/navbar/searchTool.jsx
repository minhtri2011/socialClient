import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const SearchTool = () => {
  const theme = useTheme();
  const [findUser, setFindUser] = useState("");
  const resultsRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setFindUser(e.target.value);
  };

  useEffect(() => {
    const handleClickOutsideResults = (e) => {
      if (
        findUser !== "" &&
        resultsRef.current &&
        !resultsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setFindUser("");
      }
    };

    document.addEventListener("mousedown", handleClickOutsideResults);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideResults);
    };
  }, [findUser]);

  return (
    <Box position="relative">
      <Box
        component="form"
        position="relative"
        onSubmit={(e) => e.preventDefault()}
        marginLeft={"1rem"}
      >
        <InputBase
          ref={inputRef}
          placeholder="Find User"
          sx={{
            backgroundColor: theme.palette.neutral.light,
            padding: ".1rem 2.5rem .1rem 1.5rem",
            borderRadius: "10px",
          }}
          value={findUser}
          onChange={handleInputChange}
        />
        <SearchIcon
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Box>

      {/* Search result */}
      <Box
        position={"absolute"}
        backgroundColor="red"
        width={"100%"}
        minHeight={"200px"}
        top="160%"
        left="0px"
        ref={resultsRef}
        sx={{
          opacity: findUser ? 1 : 0,
          transform: findUser ? "translateY(0%)" : "translateY(-10%)",
          visibility: findUser ? "visible" : "hidden",
          transition: "opacity 300ms, transform 300ms,visibility 300ms",
        }}
      >
        {/* Nội dung kết quả tìm kiếm */}
        <p>{findUser}</p>
      </Box>
    </Box>
  );
};

export default SearchTool;
