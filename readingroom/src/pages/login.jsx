import * as React from 'react'; 
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField'; 
import { useFormControl } from '@mui/material/FormControl';
import ReactDOM from 'react-dom';
import Logo from '../logo/ReadingRoomLogoNoBackground.svg';
import './login.css'; 
import OrigamiFox from '../origami/021-fox.svg'; 
import OrigamiFrog from '../origami/017-frog.svg'; 
import OrigamiPlane from '../origami/plane.svg'; 
import OrigamiFold from '../origami/origami.svg'; 
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom'

export class Login extends React.Component { 
    render() {
        return(
            <>
                <div className = "containerpurple"> 
                    <img
                        src={Logo}
                        style={{ height: 300, width: 400 }}
                        alt="website logo"
                    />
                    <div class = "login"> 
                    <Grid container spacing={4}>
                        <Grid item xs = {2}> 
                        <img
                            src={OrigamiFox}
                            style={{ height: 50, width: 50}}
                            alt="fox icon"
                        />
                        </Grid>
                        <Grid item xs = {9}>
                            <TextField id="outlined-basic" label="username" variant="outlined" 
                            inputProps={{style: { backgroundColor: 'white' }}} fullWidth/>
                        </Grid> 
                        <Grid item xs = {2}>
                        <img
                            src={OrigamiFrog}
                            style={{ height: 50, width: 50}}
                            alt="fox icon"
                        />
                        </Grid> 
                        <Grid item xs = {9}>
                            <TextField id="outlined-basic" label="password" variant="outlined" 
                            inputProps={{style: { backgroundColor: 'white' }}} fullWidth/>
                        </Grid> 
                        <Grid item xs = {12}> 
                        <Link to="/home">
                            <Button
                                variant="contained"
                                // color = "secondary"
                                startIcon={<Avatar src={OrigamiPlane}/>}>
                                    LOG IN 
                            </Button>
                        </Link>
                        </Grid> 
                        <Grid item xs = {12}>
                        <Button
                            variant="contained"
                            // color = "secondary"
                            startIcon={<Avatar src={OrigamiFold}/>}>
                                SIGN UP
                            
                        </Button>
                        </Grid> 
                    </Grid> 
                    </div> 
                </div> 
            </>
        )
    }
}