import React from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

import Logo from '../logo/ReadingRoomLogoNoBackground.svg'
import Dog from '../origami/png/019-dog.png'
import Tower from '../origami/png/031-tower.png'
import Star from '../origami/png/008-star.png'
import { Colors } from '../colors'
import { RRButton, RRTextField } from '../components'

const CreateAccountBtn = styled(RRButton)({
    backgroundColor: Colors.pink,
    '&:hover': {
        backgroundColor: Colors.pink
    }
})

const CreatePage = () => {
    return(
        <Grid container spacing={10} direction='column' alignItems='center' justify='center'>
            <Grid item xs={12}>
                <img src={Logo} className='logo'/>
            </Grid>
            <Grid item xs={12}>
                <RRTextField label='Username' variant='filled' ImageSrc={Dog}/>
            </Grid>
            <Grid item xs={12}>
                <RRTextField label='Passsword' variant='filled' ImageSrc={Tower}/>
            </Grid>
            <Grid item xs={12}>
                <Link to='/'>
                    <CreateAccountBtn variant='contained' className='btn'>
                        <img src={Star}/>
                        <span>CREATE ACCOUNT</span>
                    </CreateAccountBtn>
                </Link>
            </Grid>
        </Grid>
    )
}

export default CreatePage