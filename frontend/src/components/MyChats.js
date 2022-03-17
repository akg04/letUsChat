import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellanous/GroupChatModal";
import { background } from "@chakra-ui/react";
const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      // console.log(data);
      setChats(data);
      // var groupChat = data.filter((c) => c.isGroupChat === true);
      // var normalChat = data.filter((c) => c.isGroupChat === false);
      // // console.log(data);
      // // console.log(11);
      // setGroupChat(groupChat);
      // setNormalChat(normalChat);
      // console.log(groupChat);
    } catch (error) {
      toast({
        title: "Some Error has occured!",
        description: "Could not load chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  function Capitalize(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        console.log("First capital letter: " + word[0]);
        console.log("remain letters: " + word.substr(1));
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  }
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // console.log(chats);
  }, [fetchAgain]);
  //fetchAgain k change hote hi doobara chat fetch kro like agar group leave kr diya to
  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="#FFCCCC"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>Chats</Text>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <>
                {!chat.isGroupChat && (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "#38B2AC" : "#FFEE99"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                  >
                    <Text>
                      {!chat.isGroupChat
                        ? Capitalize(getSender(loggedUser, chat.users))
                        : Capitalize(chat.chatName)}
                    </Text>
                  </Box>
                )}
              </>
            ))}
            <Text>Groups</Text>
            {chats.map((chat) => (
              <>
                {chat.isGroupChat && (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "black" : "#EFDECD"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                  >
                    <Text>
                      {!chat.isGroupChat
                        ? Capitalize(getSender(loggedUser, chat.users))
                        : Capitalize(chat.chatName)}
                    </Text>
                  </Box>
                )}
              </>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
