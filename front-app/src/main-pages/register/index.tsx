import Grid from '@mui/material/Grid2';
import {TextField, Typography} from "@mui/material";
import {ButtonRounded} from "../../common/component/buttons";
import React from "react";
import {Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Dayjs} from "dayjs";
import './style.css';

export const RegisterPage = () => {
    const [civilityName, setCivilityName] = React.useState<string>('');
    const [value, setValue] = React.useState<Dayjs | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        setCivilityName(event.target.value as string);
    };

    return (
        <Grid>
            <Grid container justifyContent="space-between" padding={1}>
                <Link style={{textDecoration: 'none', color: 'black'}} to='/'>
                    <ArrowBackIcon/>
                </Link>
                <Link style={{textDecoration: 'none', color: 'black'}} to='/login'>
                    <ButtonRounded label="Login"/>
                </Link>
            </Grid>

            <Grid pb={5} container flexDirection="column" justifyContent="center" alignItems="center">
                <Grid>
                    <Typography pb={3} variant="h3" color="blacl">Welcome !</Typography>
                </Grid>
                <Grid>
                    <TextField InputProps={{style: {borderRadius: "25px", width: 300}}} sx={{paddingBottom: 2}} id="outlined-basic" label="Nom" variant="outlined"/>
                </Grid>
                <Grid>
                    <TextField InputProps={{style: {borderRadius: "25px", width: 300}}} sx={{paddingBottom: 2}} id="outlined-basic" label="Prènom" variant="outlined"/>
                </Grid>
                <Grid>
                    <FormControl sx={{m: 1, width: 300, paddingBottom: 2}}>
                        <InputLabel id="demo-simple-select-label">Civilité</InputLabel>
                        <Select
                            sx={{borderRadius: "25px"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={civilityName}
                            label="Civilité"
                            onChange={handleChange}
                            variant="outlined"
                        >
                            <MenuItem value={10}>Monsieur</MenuItem>
                            <MenuItem value={20}>Madame</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <DatePicker sx={{m: 1, width: 300, paddingBottom: 2, borderRadius: '25px%'}} value={value} onChange={(newValue) => setValue(newValue)}/>
                </Grid>
                <Grid>
                    <TextField InputProps={{style: {borderRadius: "25px", width: 300}}} sx={{paddingBottom: 2}} id="outlined-basic" type="email" label="Adresse email" variant="outlined"/>
                </Grid>
                <Grid>
                    <TextField InputProps={{style: {borderRadius: "25px", width: 300}}} sx={{paddingBottom: 2}} id="outlined-basic" type="password" label="Mot de passe" variant="outlined"/>
                </Grid>
                <Grid>
                    <TextField InputProps={{style: {borderRadius: "25px", width: 300}}} sx={{paddingBottom: 2}} id="outlined-basic" type="password" label="Confirmation mot de passe"
                               variant="outlined"/>
                </Grid>

                <Grid mt={2}>
                    <ButtonRounded label="Register"/>
                </Grid>
            </Grid>
        </Grid>

    )
}
