import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { ReactElement, useRef } from "react";

type Props = {
  handleRowDelete: (request: string) => void;
  request: string;
};

export const DeleteRow = ({
  handleRowDelete,
  request,
}: Props): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  return (
    <>
      <IconButton
        aria-label="delete"
        icon={<DeleteRoundedIcon />}
        onClick={onOpen}
        variant="quaternary"
      />

      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Row
            </AlertDialogHeader>

            <AlertDialogBody>
              {"Are you sure? You can't undo this action afterwards."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={onClose}
                ref={cancelRef}
                size="md"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  onClose();
                  handleRowDelete(request);
                }}
                size="md"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
