import React, { useState, useEffect } from 'react'
import { Toolbar, Typography, Button, Card, CardContent, TextField, Box } from '@mui/material'
import styled from '@emotion/styled'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'

const SCard = styled(Card)({
    minWidth: '275px',
    maxWidth: '500px',
    height: '320px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '16px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.90)'
})

const STypography1 = styled(Typography)({
    fontFamily: 'Poppins'
})

const SButton = styled(Button)({
    background: '#492244',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '8px',
    margin: '8px',
    marginTop: '16px',
    padding: '8px',
    '&:hover': {
        background: '#492244',
        color: '#FFFFFF'
    }
})

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin


    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const EmailCheck = (email) => {
        var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        if (regex.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    const Login = (e) => {
        e.preventDefault()
        if (username === "" || password === "") {
            Swal.fire({
                icon: 'error',
                text: 'Fill all fields',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            if (EmailCheck(username) === false) {
                Swal.fire({
                    icon: 'error',
                    text: 'Please enter valid email',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else {
                dispatch(login(username, password))
            }
        }
    }

    return (
        <div>
            <Toolbar sx={{ mb: 3 }} />
            <SCard sx={{}}>
                <CardContent>
                    <STypography1 variant='h4' sx={{ color: '#412525', m: 2 }}>
                        LOG IN
                    </STypography1>

                    <Box textAlign='left'>
                        <STypography1 variant='body1'>
                            Email
                        </STypography1>

                        <TextField fullWidth
                            id='outlined-size-small'
                            type='email'
                            size='small'
                            value={username}
                            sx={{ mb: 2 }}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <STypography1 variant='body1'>
                            Password
                        </STypography1>

                        <TextField fullWidth
                            id='outlined-size-small'
                            type='password'
                            size='small'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>

                    <SButton onClick={Login}>
                        <STypography1 variant='body1'>
                            LOG IN
                        </STypography1>
                    </SButton>
                </CardContent>
            </SCard>
        </div>
    )
}

export default Login
