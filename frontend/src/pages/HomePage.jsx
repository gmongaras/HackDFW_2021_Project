import * as React from 'react'; 
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField'; 
import { useFormControl } from '@mui/material/FormControl';
import ReactDOM from 'react-dom';
import Logo from '../logo/ReadingRoomLogoNoBackground.svg';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const card = (
    <div className = "recordings">
        <p>Book</p>
    </div>
)

export default class Homepage extends React.Component { 
    render() {
        return(
            <>
                <div className = "containeryellow"> 
                    <h1 style={{ fontSize: "3rem" }} > RECORDINGS </h1>
                    <Grid container pacing ={4}> 
                    <Grid xs = {12}>
                        <Card variant="outlined">{card}</Card>
                    </Grid> 
                    <Grid xs = {12}>
                            <Card variant="outlined">{card}</Card>
                    </Grid>
                    <Grid xs = {12}>
                        <Card variant="outlined">{card}</Card>
                    </Grid> 
                </Grid>
                </div> 
            </>
        )
    }
}