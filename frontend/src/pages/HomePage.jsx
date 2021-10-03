import React, {useState} from 'react'; 
import { styled } from '@mui/system'
import { Button, useFormControl, TextField, Box, Stack, Grid, Card, CardActions, CardContent } from '@mui/material'; 

import Logo from '../logo/ReadingRoomLogoNoBackground.svg';
import { Colors } from '../colors'
import { RRButton } from '../components'
import Pinwheel from '../origami/005-pinwheel.svg'

const card = (
    <Box sx={{
        height: '12rem',
        width: '60rem',
        bgColor: 'white' 
    }}/>
)

const RetroLabel = styled('span')({
    fontSize: '2rem',
    fontFamily: ['"Press Start 2P"','cursive'].join(','),
    color: Colors.yellow,
})

const RecordBtn = styled(RRButton)({
    backgroundColor: Colors.pink,
    '&:hover': {
        backgroundColor: Colors.pink
    }
})
const recordings = ["1","2","3"]; 

const HomePage = () => {

    return(
        <>
        <Box ml={20} mt={3}>
        {/* <Box mr={3} justify = 'flex-end'>
            <RecordBtn variant='contained' className='btn'>
                <img src={Pinwheel}/>
                <span>RECORD</span>
            </RecordBtn>
        </Box> */}
        <Grid container spacing={4} direction='column' alignItems='flex-start' justify='center'>
            <Grid item container>
            <Grid container spacing={70}direction='row' alignItems='center' justify='space-between'>
                <Grid item> 
                    <RetroLabel> RECORDINGS </RetroLabel>
                </Grid>
                <Grid item>
                    <RecordBtn variant='contained' className='btn'>
                        <img src={Pinwheel}/>
                        <span>RECORD</span>
                    </RecordBtn>
                </Grid>
            </Grid>
            </Grid>
            {recordings.map(recording=> <Grid item xs={12}>
                <Card>{card}</Card>
            </Grid>)}
        </Grid>
        </Box>
        </>
    )
}

export default HomePage 