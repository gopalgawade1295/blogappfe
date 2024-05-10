import React, { useEffect } from 'react'
import { Typography, Button, Box, Toolbar } from '@mui/material'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { bloglist } from '../redux/actions/blogActions'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const STypography1 = styled(Typography)({
    fontFamily: 'Poppins'
})

const SButton2 = styled(Button)({
    background: '#58381f',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '8px',
    margin: '8px',
    padding: '8px',
    '&:hover': {
        background: '#58381f',
        color: '#FFFFFF'
    }
})

const SBox1 = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    paddingBottom: '8px',
    minHeight: '50px'
})

const SBox2 = styled(Box)({
    textAlign: 'left',
    padding: '16px',
    margin: '16px',
    marginTop: '4px',
    minHeight: '150px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.90)'
})

function Profile() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const blogList = useSelector(state => state.userBlogs)
    const { error, loading, blogs } = blogList
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(bloglist())
    }, [dispatch])

    const AccountDelete = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            }

            const res = await axios.delete(`http://127.0.0.1:8000/account/delete/`, config)
            Swal.fire({
                icon: 'success',
                text: res?.data?.detail ? res?.data?.detail : 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                sessionStorage.removeItem('userInfo')
                navigate('/')
                window.location.reload()
            })
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                text: error?.response?.data?.detail ? error.response.data.detail : 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            <Toolbar />

            <SBox1>
                <Box>
                    <STypography1 variant='h6'>
                        Hello! {userInfo.name}
                    </STypography1>
                </Box>
            </SBox1>

            <SBox2 boxShadow={6}>
                <Box>
                    <STypography1 variant='body1'>
                        Name: {userInfo.name}
                    </STypography1>

                    <STypography1 variant='body1'>
                        Email: {userInfo.email}
                    </STypography1>

                    <STypography1 variant='body1'>
                        Total blogs: {blogs?.filter(blogs => blogs.user === userInfo.id).map(v => v).length}
                    </STypography1>

                    <SButton2 onClick={() => AccountDelete()}>
                        <STypography1 variant='body1'>
                            Delete Account
                        </STypography1>
                    </SButton2>
                </Box>
            </SBox2>
        </div>
    )
}

export default Profile
