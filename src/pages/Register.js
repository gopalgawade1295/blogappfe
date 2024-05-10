import React, { useState, useEffect } from 'react'
import { Toolbar, Typography, Button, Card, CardContent, TextField, Box } from '@mui/material'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/userActions'
import Swal from 'sweetalert2'

const STypography1 = styled(Typography)({
  fontFamily: 'Poppins'
})

const SCard = styled(Card)({
  minWidth: '275px',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: '420px',
  marginBottom: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.90)'
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

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const { error, loading, userInfo } = userRegister
  const navigate = useNavigate()

  const EmailCheck = (email) => {
    var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (regex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  const Register = (e) => {
    e.preventDefault()
    if (name === "" || email === "" || password === "") {
      Swal.fire({
        icon: 'error',
        text: 'Fill all fields',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      if (password.length < 12) {
        Swal.fire({
          icon: 'error',
          text: 'Password length must be greater than 12',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if (EmailCheck(email) === false) {
        Swal.fire({
          icon: 'error',
          text: 'Please enter valid email',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        dispatch(register(name, email, password))
      }
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, dispatch, userInfo])

  return (
    <div>
      <Toolbar sx={{ mb: 3 }} />
      <SCard>
        <CardContent>
          <STypography1 variant='h4' sx={{ color: '#412525', m: 2 }}>
            SIGN UP
          </STypography1>

          <Box textAlign='left'>
            <STypography1 variant='body1'>
              Username
            </STypography1>

            <TextField fullWidth
              id='outlined-size-small'
              type='text'
              size='small'
              value={name}
              sx={{ mb: 2 }}
              onChange={(e) => setName(e.target.value)}
            />

            <STypography1 variant='body1'>
              Email
            </STypography1>

            <TextField fullWidth
              id='outlined-size-small'
              type='email'
              size='small'
              value={email}
              sx={{ mb: 2 }}
              onChange={(e) => setEmail(e.target.value)}
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

          <SButton onClick={Register}>
            <STypography1 variant='body1'>
              SIGN UP
            </STypography1>
          </SButton>
        </CardContent>
      </SCard>
    </div>
  )
}

export default Register
