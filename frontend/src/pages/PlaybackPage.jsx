import React, { useState, useEffect } from 'react'
import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/system'

const Page = styled(Paper)({
    width: '50vw',
    height: '35vh',
    color: 'black',
    lineHeight: '35vh',
    textAlign: 'center',
})

const PageText = styled('span')({
    fontFamily: ['"Roboto"', 'sans-serif'].join(','),
    fontSize: '2rem',
    color: 'black',
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'normal'
})

const PlaybackPage = () => {
    const transcriptionSections = ['a', 'b', 'c', 'd', 'e', 'f']
    const [currentSection, setCurrentSection] = useState(0)
    const INTERVAL_MS = 300
    const audioRef = React.createRef(null)

    const getAudioTimeStamp = (audioRef) => {
        return(audioRef.current.currentTime)
    }

    useEffect(() => {
        if (audioRef) {
            const interval = setInterval(() => {
                try {
                    setCurrentSection(Math.floor(getAudioTimeStamp(audioRef) / 10))
                } catch(error) {
                }
            }, INTERVAL_MS)
        }
    })

    return(
        <Grid container spacing={5} direction='column' alignItems='center' justify='center'>
            <Grid item xs={12}>
                <Page elevation={1}>
                    <PageText>
                        { transcriptionSections.at(currentSection) }
                    </PageText>
                </Page>
            </Grid>
            <Grid item xs={12}>
                <audio controls ref={audioRef}> 
                    <source src="https://hackdfw2021storage.s3.us-east-2.amazonaws.com/test2.mp3" type="audio/mp3"/> 
                </audio> 
            </Grid>
        </Grid>
    )
}

export default PlaybackPage