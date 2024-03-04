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
import getEmotions from "../hooks/internalApiHooks/getEmotions.ts";
import createEmotion from "../hooks/internalApiHooks/createEmotion.ts";
import { Note, createNote, getCurrentDateTimeString } from "../hooks/internalApiHooks/createNote.ts";


const AddNote = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newEmotion, setNewEmotion] = useState<string>()
    const [allEmotionsArray, setAllEmotionsArray] = useState<string[] | String[]>([])
    const [openAddEmotionModel, setOpenAddEmotionModel] = useState<boolean>()
    const [addNewEmotionInputField, setAddNewEmotionInputField] = useState<string>("")
    const initialRef = React.useRef(null)
    const ADD_EMOTION_TEXT = 'Click to add emotion..'
    const [createNoteBody, setCreateNoteBody] = useState<Note>(
        {
            title: "",
            actualNote: "",
            emotion: {
                emotion: ""
            },
            dateOfNoteSubmission: getCurrentDateTimeString()
        }
    )

    useEffect(() => {
        getEmotions()
            .then(res => {
                const emotionArray: String[] = []
                res.data.forEach((emotion: { emotion: String; }) => emotionArray.push((emotion.emotion)))
                var orderedArray = moveElementToEndOfTheArray(emotionArray, ADD_EMOTION_TEXT)
                setAllEmotionsArray(orderedArray)
            })
            .catch(err => { if (err) throw err })
    }, [openAddEmotionModel, newEmotion])

    useEffect(() => {
        let doesTheClickedEmotionDropDownMatchTextToOpenPrompt = newEmotion === ADD_EMOTION_TEXT
        if (doesTheClickedEmotionDropDownMatchTextToOpenPrompt) {
            setOpenAddEmotionModel(true)
        }
    }, [newEmotion])

    const moveElementToEndOfTheArray = (array: String[], elementToMove: string): String[] => {
        const index = array.indexOf(elementToMove)
        array.splice(index, 1) // remove 'index' element from array
        array.push(elementToMove)
        return array
    }

    const onAddNewNote = (): void => {
        createNote(createNoteBody)
            .then(() => { console.log('Note successfully created') })
            .catch(err => { if (err) throw err })

        onClose()
    }

    const onChangeNoteInputFields = (input: any): void => {
        let inputText;
        let fieldToUpdate;

        switch (input.target.id) {
            case 'note-title-input':
                fieldToUpdate = 'title';
                break;
            case 'summary-title-input':
                fieldToUpdate = 'actualNote';
                break;
            default:
                return;
        }

        inputText = input.target.value;
        const newNote = { ...createNoteBody, [fieldToUpdate]: inputText };
        setCreateNoteBody(newNote);
    };

    const onEmotionChange = (target: ChangeEvent<HTMLSelectElement>): void => {
        const emotionToCapture = target.target.value
        setNewEmotion(emotionToCapture)
        const newNote = { ...createNoteBody, emotion: { emotion: emotionToCapture } };
        setCreateNoteBody(newNote)
    }

    const handleCloseAddEmotion = () => {
        setNewEmotion("")
        setOpenAddEmotionModel(false)
    }

    const handleAddingNewEmotion = () => {
        createEmotion(addNewEmotionInputField)
        setOpenAddEmotionModel(false)
        setNewEmotion("")
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
                            <Input
                                id="note-title-input"
                                value={createNoteBody.title}
                                onChange={target => onChangeNoteInputFields(target)}
                                ref={initialRef}
                                placeholder='Title' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Summary</FormLabel>
                            <Input
                                id="summary-title-input"
                                value={createNoteBody.actualNote}
                                onChange={target => onChangeNoteInputFields(target)}
                                placeholder='Description' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>How Do You Feel?</FormLabel>
                            <Select placeholder='Give me and emotion..'
                                onChange={(target) => onEmotionChange(target)}>
                                {allEmotionsArray.map((emo, index) => (
                                    <option key={index}>{emo}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onAddNewNote}>Save</Button>
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