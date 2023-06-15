import {
  Avatar,
  Box,
  Button,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api/api";
import { createConversation, getAllConversations } from "../api/conversation";
import { getMessageApi, sendMessageApi } from "../api/message";
import { useAuth } from "../hooks/useAuth";

const socket = io(API);

const ListConversation = ({ setRoom }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [conversations, setConversations] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!user.user._id) return;
    (async () => {
      try {
        const response = await getAllConversations(user.user._id, user.token);
        const sortConversations = response?.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setConversations(sortConversations);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (conversations === null || conversations.length === 0) return;

      if (!user.user._id && !id) return;

      const filteredConversations = conversations.filter((conversation) => {
        const memberIds = conversation.members.map((member) => member._id);
        return memberIds.includes(id) && memberIds.includes(user.user._id);
      });
      if (!!filteredConversations.length) return;

      try {
        const response = await createConversation(
          [id, user.user._id],
          user.token
        );
        console.log(response);
        setConversations((v) => [...v, response]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [conversations]);

  useEffect(() => {
    if (id) {
      if (!conversations || conversations.length === 0) return;
      const conversationsFilter = conversations.find((conversation) => {
        const memberId = conversation.members.map((member) => member._id);
        return memberId.includes(id) && memberId.includes(user.user._id);
      });
      setRoom(conversationsFilter._id);
      socket.emit("joinRoom", conversationsFilter._id);
    }
  }, [id, conversations]);

  return (
    <>
      {conversations?.map((conversation) => {
        const userMessage = conversation?.members.find(
          (member) => member._id !== user.user._id
        );
        return (
          <ListItem
            component={NavLink}
            to={`/message/${userMessage._id}`}
            key={conversation?._id}
            sx={{
              padding: "10px",
              margin: "5px 0",
              "&:hover": {
                backgroundColor: theme.palette.neutral.light,
              },
              "&.active": {
                backgroundColor: theme.palette.neutral.light,
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={API + "/assets/" + userMessage.picturePath}
                alt={userMessage.firstName}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography color={theme.palette.neutral.dark}>
                {userMessage.firstName} {userMessage.lastName}
              </Typography>
            </ListItemText>
          </ListItem>
        );
      })}
    </>
  );
};

const ListMessage = ({ room }) => {
  const messageRef = useRef(null);
  const theme = useTheme();
  const [messages, setMessages] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { user } = useAuth();
  const { id } = useParams();
  const messageContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      setTimeout(() => {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }, 10);
    }
  }, []);

  const isScrollingUp = useCallback(() => {
    if (messageContainerRef.current) {
      const isScrolling =
        messageContainerRef.current.scrollTop <
        messageContainerRef.current.scrollHeight -
          messageContainerRef.current.offsetHeight;

      return isScrolling;
    }
    return false;
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      console.log(message);
      scrollToBottom();
    });
    return () => socket.off();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await getMessageApi(user.user._id, id, user.token);
        setMessages(response);
        setLoading(false);
        scrollToBottom();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingUp()) {
        return;
      }
      scrollToBottom();
    };

    if (messageContainerRef.current) {
      messageContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageContainerRef.current) {
        messageContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isScrollingUp, scrollToBottom]);

  useEffect(() => {
    if (messages) scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageValue = messageRef.current.value;

    if (messageValue.trim() === "") return;

    try {
      const messageData = {
        body: messageValue,
        recipient: id,
        author: user.user._id,
        token: user.token,
      };

      const newMessage = await sendMessageApi(messageData);
      socket.emit("sendMessage", newMessage, room);
      scrollToBottom();

      messageRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  const renderMessage = () => {
    if (!id) return <></>;
    if (!messages || messages.length === 0) {
      return (
        <Typography>You don't have any messages for this person yet</Typography>
      );
    }

    return messages
      .sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
      .map((message) => {
        return (
          <Box
            key={message._id}
            display="flex"
            justifyContent={
              message.author === user.user._id ? "flex-end" : "flex-start"
            }
          >
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: "fit-content",
                maxWidth: "40%",
                margin: "5px",
                padding: "5px 15px",
                borderRadius:
                  message.author === user.user._id
                    ? "50px 50px 0px 50px"
                    : "50px 50px 50px 0px",
              }}
            >
              <Typography color="black">{message.body}</Typography>
            </Box>
          </Box>
        );
      });
  };
  // todo: show loading bar when fetch messages
  if (isLoading) return <LinearProgress color="warning" />;

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      height="100vh"
    >
      <Box
        height="100vh"
        overflow="auto"
        flexGrow={1}
        ref={messageContainerRef}
      >
        {renderMessage()}
      </Box>
      <Box
        component="form"
        onSubmit={sendMessage}
        padding="5px"
        backgroundColor={theme.palette.background.alt}
        position={"fixed"}
        bottom={0}
        right={0}
        left={0}
      >
        {id && (
          <Box position="relative" paddingBottom="10px">
            <Input inputRef={messageRef} placeholder="Sent Message" fullWidth />
            <Button type="submit" sx={{ position: "absolute", right: 0 }}>
              Sent
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Message = () => {
  const theme = useTheme();
  const [room, setRoom] = useState("");
  return (
    <Box
      display="grid"
      gridTemplateColumns={"20% 80%"}
      height={"100vh)"}
      overflow={"hidden"}
    >
      <Paper
        elevation={3}
        backgroundcolor={theme.palette.background.alt}
        sx={{
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
        <List disablePadding>
          <ListConversation setRoom={setRoom} />
        </List>
      </Paper>
      <Box>
        <ListMessage room={room} />
      </Box>
    </Box>
  );
};

export default Message;
