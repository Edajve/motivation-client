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
import getEmotions from "../hooks/internalApiHooks/getEmotions";
import createEmotion from "../hooks/internalApiHooks/createEmotion";

const AddNote = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newEmotion, setNewEmotion] = useState<string>('')
    const [allEmotionsArray, setAllEmotionsArray] = useState<string[] | String[]>([])
    const [openAddEmotionModel, setOpenAddEmotionModel] = useState<boolean>(false)
    const [addNewEmotionInputField, setAddNewEmotionInputField] = useState<string>("")
    const initialRef = React.useRef(null)
    const ADD_EMOTION_TEXT = 'Click to add emotion..'

    useEffect(() => {
        getEmotions()
            .then(res => {
                const emotionArray: String[] = []
                res.data.forEach((emotion: { emotion: String; }) => emotionArray.push((emotion.emotion)))
                var orderedArray = moveElementToEndOfTheArray(emotionArray, ADD_EMOTION_TEXT)
                setAllEmotionsArray(orderedArray)
            })
            .catch(err => { if (err) throw err })
    }, [openAddEmotionModel])

    useEffect(() => {
        let doesTheClickedEmotionDropDownMatchTextToOpenPrompt = newEmotion === ADD_EMOTION_TEXT
        if (doesTheClickedEmotionDropDownMatchTextToOpenPrompt) {
            setOpenAddEmotionModel(!openAddEmotionModel)
        }
    }, [newEmotion])

    const moveElementToEndOfTheArray = (array: String[], elementToMove: string): String[] => {
        const index = array.indexOf(elementToMove)
        array.splice(index, 1) // remove 'index' from array
        array.push(elementToMove)
        return array
    }

    const onSaveEdit = (): void => {
        // YOU STOPPED HERE, THIS IS ON THE ADD EMOTION MODEL.
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
        createEmotion(addNewEmotionInputField)
        setOpenAddEmotionModel(!openAddEmotionModel)
    }

    const onAddNewEmotionInputField = (newEmotion: ChangeEvent<HTMLInputElement>): void => {
        setAddNewEmotionInputField(newEmotion.target.value)
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
                                {allEmotionsArray.map((emo, index) => (
                                    <option key={index}>{emo}</option>
                                ))}
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
                                onChange={(target) => { onAddNewEmotionInputField(target) }} />
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