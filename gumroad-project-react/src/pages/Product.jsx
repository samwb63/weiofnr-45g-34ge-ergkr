import React, { useContext } from 'react'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { Typography, Container, Rating, Box, Divider, Button, Modal } from '@mui/material'
import Spinner from '../components/Spinner'
import Error from '../components/Error'
import Reviews from '../components/Reviews'

// This hook establishes a connection to Firestore
// and sets up a listener that updates the UI with changes in real-time
import { useDocumentData } from 'react-firebase-hooks/firestore'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    p: 4,
}

export default function Product() {
    // Getting the Product ID from URL params (or default to our main product id)
    const { id = "6jXj7OLdtl55aoig5kOw" } = useParams()

    // Getting our Firebase instance from Context
    const firebase = useContext(FirebaseContext)

    // State variables and refs
    const [avgRating, setAvgRating] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const [rating, setRating] = React.useState(0)
    const reviewRef = React.useRef()
    
    // Event handlers
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // Handle new ratings
    const handleSubmit = async () => {
        try {
            // Write to Firestore
            await firebase.firestore()
                .collection('products')
                .doc(id)
                .collection('ratings')
                .add({rating: rating, text: reviewRef.current.value})
        }
        catch (error) {
            alert(error.message)
        }
        finally {
            // Clean up our view
            setRating(0)
            reviewRef.current.value = ""
            handleClose()
        }
    }

    // Establishing a reference to the Document we want from Firestore
    const projectRef = firebase.firestore().collection('products').doc(id)

    // Getting data from Firestore with our hook
    const [ value, loading, error ] = useDocumentData(projectRef)

    if (loading) return (
        <Container style={{marginTop: 50}}>
            <Spinner />
        </Container>
    )
    if (error || !value) return (
        <Container style={{marginTop: 50}}>
            <Error />
        </Container>
    )
    return (
        <Container style={{marginTop: 50, maxWidth: "525px"}}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h2" color="primary">What's your rating?</Typography>
                    <Typography color="primary" mt={3} mb={3}>Rating</Typography>
                    <Rating value={rating} onChange={e => setRating(Number(e.target.value))} size="large" precision={0.5} />
                    <Typography color="primary" mt={2} mb={2}>Review</Typography>
                    <input ref={reviewRef} type="text" placeholder="Start typing...." style={{width: "90%", borderColor: "transparent", marginBottom: "20px", padding: "10px 0px 10px 0px", fontSize: "14px"}}/>
                    <Button variant="outlined" color="secondary" onClick={handleSubmit}>Submit review</Button>
                </Box>
            </Modal>
            <Typography align="center" color="primary" variant="h1">{value.name}</Typography>
            <Box marginTop={4} marginBottom={5} display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                    <Typography marginRight={2} variant="h3">{avgRating || "-"}</Typography>
                    <Rating value={Number(avgRating)} precision={0.5} readOnly size="large"/>
                </Box>
                <Box>
                    <Button variant="outlined" color="secondary" onClick={handleOpen}>Add review</Button>
                </Box>
            </Box>
            <Divider style={{marginBottom: "30px"}} />
            <Typography variant="h2" color="primary">Reviews</Typography>
            <Reviews product={id} setAvgRating={setAvgRating} />
        </Container>
    )
}