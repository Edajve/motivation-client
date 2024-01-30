import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Select
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";

const allEmotions: string[] = ['Happy', 'Anxious', 'Sad', 'Add Emotion']

const AddNote = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newEmotion, setNewEmotion] = useState<string>('') // this is going to be added to a bigger object of stage
    const [openAddEmotionModel, setOpenAddEmotionModel] = useState<boolean>(false)
    const [allEmotionsArray, setAllEmotionsArray] =
        useState<string[]>(allEmotions)

    const initialRef = React.useRef(null)

    useEffect(() => {
        // this is going to send a get all request for the emotions
        // its going to fetch for all emotions
        // and it updates everytime we add a new emotion

        //but for now its feeding off 'allEmotions' array
    }, [allEmotionsArray])

    useEffect(() => {
        if (newEmotion === 'Add Emotion') {
            setOpenAddEmotionModel(!openAddEmotionModel)
        }
    }, [newEmotion])

    const onSaveEdit = (): void => {
        console.log("save note - send post request to spring backend")
        onClose()
    }

    const onAddEmotion = (target: ChangeEvent<HTMLSelectElement>): void => {
        const emotion = target.target.value
        setNewEmotion(emotion)

    }

    const handleCloseAddEmotion = () => {
        setNewEmotion('')
        setOpenAddEmotionModel(!openAddEmotionModel)
    }

    const handleAddingNewEmotion = () => {
        console.log('send off post requet to add emotion')
        allEmotions.unshift(newEmotion)
        setAllEmotionsArray(allEmotions)
        setOpenAddEmotionModel(!openAddEmotionModel)
    }

    const onInputChange = (newEmotion: ChangeEvent<HTMLInputElement>): void => {
        setNewEmotion(newEmotion.target.value)
    }

    return (
        <>
            <Button
                top='30%'
                variant='outline'
                color='hsl(341, 100%, 93%)'
                onClick={onOpen}>
                Add Note
            </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Your Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Note Title</FormLabel>
                            <Input ref={initialRef} placeholder='Title' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Summary</FormLabel>
                            <Input placeholder='Description' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>How Do You Feel?</FormLabel>
                            <Select placeholder='Give me and emotion..'
                                onChange={(target) => onAddEmotion(target)}>
                                {allEmotions
                                    .map(emotion =>
                                        <option key={emotion} value={emotion}>{emotion}</option>
                                    )}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onSaveEdit}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {openAddEmotionModel &&
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormLabel>Add emotion</FormLabel>
                            <Input
                                placeholder="Create Emotion"
                                size="md"
                                type="input"
                                onChange={(target) => { onInputChange(target) }} />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => handleCloseAddEmotion()}>
                                Close
                            </Button>
                            <Button variant='ghost' onClick={() => handleAddingNewEmotion()}>Add Emotion</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            }
        </>
    )
}

export default AddNote