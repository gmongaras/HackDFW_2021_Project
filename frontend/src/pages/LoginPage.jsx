import * as React from 'react'; 
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import Logo from '../logo/ReadingRoomLogoNoBackground.svg';
import { RRTextField, RRButton } from '../components';
import { styled } from '@mui/system';

import OrigamiFox from '../origami/021-fox.svg'; 
import OrigamiFrog from '../origami/017-frog.svg'; 
import OrigamiPlane from '../origami/plane.svg'; 
import OrigamiFold from '../origami/origami.svg'; 
import { Colors } from '../colors';

const LogInBtn = styled(RRButton)({
    backgroundColor: Colors.green,
    width: '14rem',
    '&:hover': {
        backgroundColor: Colors.green
    }
})

const SignUpBtn = styled(RRButton)({
    backgroundColor: Colors.pink,
    width: '20rem',
    '&:hover': {
        backgroundColor: Colors.pink
    }
})

const LoginPage = () => {
    return(
        <Grid container spacing={10} direction='column' alignItems='center' justify='center'>
            <Grid item xs={12}>
                <img src={Logo} className='logo'/>
            </Grid>
            <Grid item xs={12}>
                <RRTextField label='Username' variant='filled' ImageSrc={OrigamiFox}/>
            </Grid>
            <Grid item xs={12}>
                <RRTextField label='Password' variant='filled' ImageSrc={OrigamiFrog}/>
            </Grid>
            <Grid item xs={12}>
                <Link to='/home'>
                    <LogInBtn variant='contained' className='btn'>
                        <img src={OrigamiPlane}/>
                        <span>LOG IN</span>
                    </LogInBtn>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Link to='/create'>
                    <SignUpBtn variant='contained' className='btn'>
                        <img src={OrigamiFold}/>
                        <span>SIGN UP</span>
                    </SignUpBtn>
                </Link>
            </Grid>
        </Grid>
    )
}

export default LoginPage