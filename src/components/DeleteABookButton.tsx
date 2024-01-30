import { useRef } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure,
} from '@chakra-ui/react';

const DeleteABookButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement | null>(null); // Corrected the type

    const onDeleteIcon = () => {
        console.log("send/or get the id of the given element");
        onOpen();
    };

    const onConfirmDelete = () => {
        console.log('delete book by id')
        onClose()
    }

    return (
        <>
            <DeleteIcon onClick={() => onDeleteIcon()} />
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => onConfirmDelete()} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteABookButton;
