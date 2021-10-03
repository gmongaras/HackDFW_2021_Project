import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

import { Colors } from '../colors'
import { RRButton } from '../components'
import PineTree from '../origami/024-pine tree.svg'
import PizzaPlay from '../origami/PizzaPlay.svg'
import CheeseStop from '../origami/CheeseStop.svg'

const BackBtn = styled(RRButton)({
    backgroundColor: Colors.green,
    width: '14rem',
    '&:hover': {
        backgroundColor: Colors.green
    }
})

const RecordBtn = styled('img')({
    height: '30rem'
})

const RotatedImg = styled('img')({
    transform: 'rotate(270deg)'
})

const StartLabel = styled('span')({
    fontSize: '2rem',
    color: Colors.green,
})

const StopLabel = styled(StartLabel)({
    color: Colors.pink
})

const RecordPage = () => {
    const [isRecording, setIsRecording] = useState(false)
    return(
        <Grid container spacing={10} direction='column' alignItems='center' justify='center'>
            <Grid item container xs={12} alignItems='flex-start'>
                <Link to='/home'>
                    <BackBtn variant='contained' className='btn'>
                        <RotatedImg src={PineTree}/>
                        <span>GO BACK</span>
                    </BackBtn>
                </Link>
            </Grid>
            <Grid item xs={12}>
                {isRecording
                    ? <RecordBtn src={CheeseStop}/>
                    : <RecordBtn src={PizzaPlay}/>
                }
            </Grid>
            <Grid item xs={12}>
                {isRecording
                    ? <StopLabel>STOP RECORDING</StopLabel>
                    : <StartLabel>START RECORDING</StartLabel>
                }
            </Grid>
        </Grid>
    )
}

export default RecordPage