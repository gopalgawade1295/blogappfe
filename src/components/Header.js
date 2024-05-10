import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, useMediaQuery } from '@mui/material'
import WebIcon from '@mui/icons-material/Web'
import LoginIcon from '@mui/icons-material/Login'
import EditIcon from '@mui/icons-material/Edit'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userActions'

const STypography1 = styled(Typography)({
    fontFamily: 'Poppins',
    fontWeight: 500,
})

const SLink = styled(Link)({
    textDecoration: 'none',
    color: '#000000'
})

const SIconButton = styled(IconButton)({
    background: '#1E0A0A',
    color: '#FFFFFF',
    '&:hover': {
        background: '#1E0A0A',
        color: '#FFFFFF'
    }
})

const SAvatar = styled(Avatar)({
    background: '#8A2244',
    border: '5px solid #FF851B'
})

function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const matchsm = useMediaQuery('(max-width:399px)')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(userInfo, 'aaa')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const Logout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div>
            <AppBar elevation={0} sx={{ background: '#1E0A0A' }}>
                <Toolbar>
                    <SLink to='/'>
                        <STypography1 variant='h6' sx={{ color: '#FFFFFF' }}>
                            BLOG APP

                            {!matchsm ?
                                <SIconButton>
                                    <WebIcon />
                                </SIconButton> :
                                null
                            }
                        </STypography1>
                    </SLink>

                    {userInfo ?
                        <Toolbar sx={{ ml: 'auto' }}>
                            <SLink to='/myblogs'>
                                <STypography1 variant='body1' sx={{ p: 2, color: '#FFFFFF' }}>
                                    MY BLOGS
                                </STypography1>
                            </SLink>

                            <IconButton
                                onClick={handleClick}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <SAvatar>
                                    <STypography1 variant='h6'>
                                        {userInfo.name[0].toUpperCase()}
                                    </STypography1>
                                </SAvatar>
                            </IconButton>
                        </Toolbar> :
                        <Toolbar sx={{ ml: 'auto' }}>
                            <SLink to='/login'>
                                <STypography1 variant='body1' sx={{ p: 2, color: '#FFFFFF' }}>
                                    LOG IN
                                    {!matchsm ?
                                        <IconButton sx={{ color: '#FFFFFF' }}>
                                            <LoginIcon />
                                        </IconButton> :
                                        null
                                    }
                                </STypography1>
                            </SLink>

                            <SLink to='/register'>
                                <STypography1 variant='body1' sx={{ color: '#FFFFFF' }}>
                                    SIGN UP

                                    {!matchsm ?
                                        <IconButton sx={{ color: '#FFFFFF' }}>
                                            <EditIcon />
                                        </IconButton> :
                                        null
                                    }
                                </STypography1>
                            </SLink>
                        </Toolbar>
                    }
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 2px #BDC3C7)',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={Logout}>
                    <STypography1 variant='body1' sx={{ color: '#000000' }}>
                        LOG OUT
                    </STypography1>
                </MenuItem>

                <MenuItem onClick={()=>navigate('/profile')}>
                    <STypography1 variant='body1' sx={{ color: '#000000' }}>
                        ACCOUNT
                    </STypography1>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Header
