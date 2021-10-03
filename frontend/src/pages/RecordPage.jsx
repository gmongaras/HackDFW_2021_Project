import React from 'react'
import { RRButton } from '../components'
import PineTree from '024-pine tree.svg'

const BackBtn = styled(RRButton)({
    backgroundColor: Colors.green,
    width: '14rem',
    '& .hover': {
        backgroundColor: Colors.green
    }
})

const RecordPage = () => {
    <Grid container spacing={20} direction='column' alignItems='center' justify='center'>
        <Grid item xs={12}>
            <BackBtn variant='contained' className='btn'>
                <img src={PineTree}/>
                <span>GO BACK</span>
            </BackBtn>
        </Grid>
    </Grid>
}