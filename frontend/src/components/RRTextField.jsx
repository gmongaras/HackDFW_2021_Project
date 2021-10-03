import { styled, Box, borderColor } from "@mui/system";
import { TextField } from "@mui/material";
import { Colors } from "../colors";

const StyledTextField = styled(TextField)({
    marginLeft: '1rem',
    width: '20rem',
    '& .MuiFilledInput-root': {
        backgroundColor: '#FFFFFF80',
    },
    '& .MuiFormLabel-root': {
        color: '#2e2e2e',
    }
})


const RRTextField = (props) => {
    const Icon = styled('img')({
        marginTop: '.3rem',
        height: props.ImageHeight || '3rem'
    })
    return(
        <>
            <Icon src={props.ImageSrc}/>
            <StyledTextField {...props} color='success'/>
        </>
    )
}

export default RRTextField