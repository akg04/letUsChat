import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";

const ProfileModal = ({ user1, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = ChatState();
  console.log(user);
  console.log(user1);
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Text cursor="pointer" onClick={onOpen}>
          {user === user1 ? "My Profile" : <Button>Info</Button>}
        </Text>
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="work sans"
            d="flex"
            justifyContent="center"
          >
            {user === user1 ? user.name : user1.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user === user1 ? user.pic : user1.pic}
              alt={user === user1 ? user.name : user1.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans "
            >
              Email: {user === user1 ? user.email : user1.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
