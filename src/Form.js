import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';

const styles = {
    headingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontWeight: 'bold',
        color: '#1A2E4F',
        fontSize: '8rem',
        textTransform: 'uppercase',
        marginBottom: '1rem',
        animation: 'fade-in 2s ease-out',
        animationFillMode: 'forwards'
    },
    tagline: {
        fontSize: '5rem',
        fontWeight: 'bold',
        color: '#1A2E4F',
        marginBottom: '2rem',
        animation: 'fade-in 2s ease-out',
        animationFillMode: 'forwards'
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    },
    submitButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
    },
};
function Form() {
    // Define state for selected states and categories
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate();

    // Define options for the state and category dropdowns
    const stateOptions = [
        { value: 'Pennsylvania', label: 'Pennsylvania' },
        { value: 'Florida', label: 'Florida' },
        { value: 'Tennessee', label: 'Tennessee' },
        { value: 'Indiana', label: 'Indiana' },
        { value: 'Missouri', label: 'Missouri' },
        { value: 'Louisiana', label: 'Louisiana' },
        { value: 'Arizona', label: 'Arizona' },
        { value: 'New Jersey', label: 'New Jersey' },
        { value: 'Nevada', label: 'Nevada' },
        { value: 'Alabama', label: 'Alabama' },

    ];

    const categoryOptions = [
        { value: 'Hotels', label: 'Hotels' },
        { value: 'Restaurants', label: 'Restaurants' },
        { value: 'NightLife', label: 'NightLife' }
    ];


    // Handle state and category selection changes
    const handleStateChange = (event) => {
        setSelectedStates(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategories(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        console.log('Selected States:', selectedStates);
        console.log('Selected Categories:', selectedCategories);
        const propsToPass = { selectedStates: selectedStates, selectedCategories: selectedCategories };
        navigate('/new-user', { state: propsToPass })
    };

    return (
        <div style={{
            backgroundImage: `url(/Plan_travel.jpg)`, width: "100vw",
            height: "100vh", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>

            <Box sx={{ backgroundColor: '#E3FBFC', border: '1px dotted black', opacity: '0.7', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="h1" sx={styles.heading}>
                    Travelix
                </Typography>
                <Typography variant="h5" sx={styles.tagline}>
                    Let us take you places!!
                </Typography>
                <Box sx={styles.formContainer}>

                    <form onSubmit={handleSubmit} sx={styles.form}>
                        <Grid container direction="column" spacing={2} columns={1}>
                            <Grid item container xs={12} spacing={10} sm={12}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" sx={{ width: 350, color: 'black' }}>Choose your next destination</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="standard" sx={{ width: '100%' }}>
                                        <InputLabel id="states-label" sx={{ color: 'black', fontSize: '1.2rem', width: '100%' }}>States</InputLabel>
                                        <Select
                                            labelId="states-label"
                                            id="states"
                                            multiple
                                            fullWidth
                                            sx={{ color: 'black' }}
                                            value={selectedStates}
                                            onChange={handleStateChange}
                                            renderValue={(selected) => selected.join(', ')}

                                        >
                                            {stateOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    <Checkbox checked={selectedStates.indexOf(option.label) > -1} />
                                                    <ListItemText primary={option.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={10} xs={12} sm={12}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" sx={{width: 350, color: 'black' }}>Select your categories</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="standard" sx={{ width: '100%' }}>
                                        <InputLabel id="categories-label" sx={{ color: 'black', display: 'block', width: '100%'  }}>Categories?</InputLabel>
                                        <Select
                                            labelId="categories-label"
                                            id="categories"
                                            multiple
                                            sx={{ color: 'black', display: 'block', width: '100%'  }}
                                            fullWidth
                                            value={selectedCategories}
                                            onChange={handleCategoryChange}
                                            renderValue={(selected) => selected.join(', ')}

                                        >
                                            {categoryOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    <Checkbox checked={selectedCategories.indexOf(option.label) > -1} />
                                                    <ListItemText primary={option.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                            >

                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" type="submit" sx={styles.submitButton} >
                                        Submit
                                    </Button>  </Grid>

                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </div>

    );
}

export default Form;
