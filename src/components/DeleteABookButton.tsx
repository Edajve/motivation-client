import { DeleteIcon } from "@chakra-ui/icons";

const DeleteABookButton = () => {

    const onDelete = () => {
        console.log("send the id of the given element")
    }

    return (
        <>
            <DeleteIcon onClick={() => onDelete()}/>
        </>
    )
}

export default DeleteABookButton