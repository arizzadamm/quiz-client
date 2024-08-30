import { Email, Widgets } from '@mui/icons-material'
import { Button, TextField,Box, Card, CardContent, Typography} from '@mui/material'
import Center from './Center'
import React, { useState } from 'react'
import useForm from '../Hooks/useForm'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import useStateContext, { stateContext } from '../Hooks/useStateContext'
import { useNavigate } from 'react-router-dom'

const getFreshModel = () => ({
    name:'',
    email:'',
})


export default function Login() {

    const { context, setContext }= useStateContext();
    const navigate =useNavigate();
        const{
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange
        } = useForm(getFreshModel);

        const login = e => {
            e.preventDefault();
            if (validate())
                createAPIEndpoint(ENDPOINTS.participant)
                    .post(values)
                    .then(res => {
                        setContext({ participantId: res.data.participantId })
                        console.log(context);
                        navigate('/quiz')
                    })
                    .catch(err => console.log(err))
        }
        

        const validate = () => {
            let temp = {}
            temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
            temp.name = values.name != "" ? "" : "This field is required."
            setErrors(temp)
            return Object.values(temp).every(x => x == "")
        }

  return (
    <Center>
        <Card sx={{width:400}}>
            <CardContent sx={{textAlign:'center'}}>
                <Typography variant='h3' sx={{my:3}}> Quiz App by ARZ </Typography>
                <Box sx={{
                '& .MuiTextField-root':{
                    margin : 1,
                    width:  '90%'
                }
                }}
                >
                    <form noValidate autoComplete='off' onSubmit={login}>
                    <TextField label="Email" name="email" value={values.email} variant="outlined" onChange={handleInputChange} {...(errors.email && { error: true, helperText: errors.email })}/>
                    <TextField label="Name" name="name" value={values.name} variant="outlined" onChange={handleInputChange}{...(errors.name && { error: true, helperText: errors.name })}/>
                    <Button type='submit' variant='contained' size='large' sx={{width:'90%'}}>Start</Button>
                    </form>
                </Box>
            </CardContent>
        </Card> 
    </Center>
    
   
  )
}
