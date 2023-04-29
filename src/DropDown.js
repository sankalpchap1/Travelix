import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import { useState } from 'react'

const useStyles = makeStyles({
    select: {
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        },
        '&:not(.Mui-disabled):hover::before': {
            borderColor: 'white',
        },
    },
    icon: {
        fill: 'white',
    },
    root: {
        color: 'white',
    },
    inputLabel: {
        color: "white",
        "&.Mui-focused": {
            color: "white",
        },
    },
    whiteColor: {
        color: "white"
    }
})

const DropDown = ({ options, label, state, setState }) => {
    const classes = useStyles()
    const handleStateChange = (event) => {
        setState(event.target.value);
    };
    return (
        <FormControl variant="standard" sx={{ width: '30%', marginLeft: 'auto', marginTop: "1px" }}>
            <InputLabel sx={{ color: 'white' }}>{label}</InputLabel>
            <>
                <Select
                    labelId={label}
                    value={state}
                    onChange={handleStateChange}
                    sx={{
                        height: '2.5rem',
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white'
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'white'
                        },
                        '& .MuiSvgIcon-icon': {
                            color: 'white'
                        }
                    }}
                    display>
                    {options.map((option) => {
                        return <MenuItem value={option}>{option}</MenuItem>;
                    })}
                </Select>
            </>
        </FormControl>
    )
}
export default DropDown;



