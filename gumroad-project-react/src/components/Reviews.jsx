import React, { useContext } from 'react'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/firestore'
import { Container, Rating, Box, Typography } from '@mui/material'
import Spinner from '../components/Spinner'
import Error from '../components/Error'

// This hook establishes a connection to Firestore
// and sets up a listener that updates the UI with changes in real-time
import { useCollectionData } from 'react-firebase-hooks/firestore'

export default function Reviews({ product, setAvgRating }) {
    // Getting our Firebase instance from Context
    const firebase = useContext(FirebaseContext)

    // Establishing a reference to the Collection we want from Firestore
    const reviewsRef = firebase.firestore().collection('products').doc(product).collection('ratings')

    // Getting data from Firestore with our hook
    const [ values, loading, error ] = useCollectionData(reviewsRef, {idField: "id"})

    // Once we get our ratings back from the DB, we'll update the parent component's Average Rating state
    React.useEffect(() => {

        if (values && values.length) {
            let numericRatings = []

            values.forEach(value => {
                numericRatings.push(Number(value.rating) || 0)
            })

            setAvgRating((numericRatings.reduce((a, b) => a + b) / numericRatings.length).toFixed(1))
        }
    }, [values, setAvgRating])

    if (loading) return (
        <Container style={{marginTop: 50}}>
            <Spinner />
        </Container>
    )
    if (error || !values) return (
        <Container style={{marginTop: 50}}>
            <Error />
        </Container>
    )
    return (
        <>
            {values.map(value => 
                <Box key={value.id} display="flex" marginTop={3} alignItems="center">
                    <Rating size="large" readOnly value={Number(value.rating)} precision={0.5} style={{marginRight: "15px"}} />
                    <Typography color="primary"><b>{value.rating || 0}</b>, {value.text}</Typography>
                </Box>
            )}
        </>
    )
}