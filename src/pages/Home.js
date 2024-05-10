import React, { useState, useEffect } from 'react'
import { Typography, TextField, Button, Box, Grid, Toolbar, Modal, useMediaQuery } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { bloglist, addBlog, editBlog, deleteBlog } from '../redux/actions/blogActions'
import Blog from '../assets/images/blog.png'

const SHeading = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '400%',
    color: '#492244',
    padding: '16px'
})

const STypography1 = styled(Typography)({
    fontFamily: 'Poppins'
})

const SButton1 = styled(Button)({
    color: '#FFFFFF',
    background: '#8A2244',
    textTransform: 'none',
    borderRadius: '0px',
    border: '3px solid #492244',
    margin: '8px',
    padding: '8px',
    '&:hover': {
        background: '#8A2244',
        color: '#FFFFFF'
    }
})

const SButton2 = styled(Button)({
    background: '#492244',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '8px',
    margin: '8px',
    padding: '8px',
    '&:hover': {
        background: '#492244',
        color: '#FFFFFF'
    }
})

const SBox1 = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    minHeight: '100px'
})

const SBox2 = styled(Box)({
    textAlign: 'left',
    padding: '16px',
    margin: '16px',
    height: '360px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.90)'
})

const SBox3 = styled(Box)({
    height: '300px',
    overflow: 'auto'
})

function Home() {
    const [title, setTitle] = useState('')
    const [article, setArticle] = useState('')
    const [message, setMessage] = useState('')
    const [blogID, setBlogID] = useState('')
    const [blogEdit, setBlogEdit] = useState(false)
    const [showAddBlog, setShowAddBlog] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newArticle, setNewArticle] = useState('')
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const matchsm = useMediaQuery('(max-width:500px)')

    const style = !matchsm ? {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
        p: 4,
    } :
        {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 275,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }

    const handleClose = () => setOpen(false)
    const handleCloseEdit = () => setOpenEdit(false)

    const dispatch = useDispatch()
    const blogList = useSelector(state => state.userBlogs)
    const { error, loading, blogs } = blogList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const AddBlog = async () => {
        const user = userInfo.username
        if (!title && !article) {
            setMessage('ENTER TITLE AND ARTICLE!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else if (!title) {
            setMessage('ENTER TITLE!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else if (!article) {
            setMessage('ENTER ARTICLE!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else {
            await dispatch(addBlog(user, title, article))
            dispatch(bloglist())
            setShowAddBlog(false)
            setOpen(false)
            setTitle('')
            setArticle('')
        }
    }


    const GetBlogID = (id, title, article) => {
        setBlogEdit(true)
        setBlogID(id)
        setNewTitle(title)
        setNewArticle(article)
    }


    const EditBlog = async (e) => {
        if (!newTitle && !newArticle) {
            setMessage('ENTER NEW TITLE AND ARTICLE!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else if (!newTitle) {
            setMessage('ENTER NEW TITLE!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else if (!newArticle) {
            setMessage('ENTER NEW ARTICLE!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else {
            await dispatch(editBlog(blogID, newTitle, newArticle))
            dispatch(bloglist())
            setBlogEdit(false)
            setOpenEdit(false)
        }
    }


    useEffect(() => {
        dispatch(bloglist())
    }, [dispatch])


    const DeleteBlog = async (id) => {
        await dispatch(deleteBlog(id, userInfo.id))
        dispatch((bloglist()))
    }



    console.log(userInfo)
    console.log(blogs)

    return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            <Toolbar />

            {!userInfo &&
                <Box>
                    <SHeading>
                        Blog App
                    </SHeading>

                    <img
                        src={Blog}
                        alt=''
                        height={400}
                        style={{ marginTop: '-30px' }}
                    />
                    <br/>
                    <a href="https://storyset.com/work">Work illustrations by Storyset</a>
                </Box>
            }


            {userInfo ?
                <>
                    {(showAddBlog || blogEdit) ?
                        <SBox1 /> :
                        <SBox1>
                            <Box>
                                <SButton1 onClick={() => { setShowAddBlog(true); setOpen(true) }}>
                                    <STypography1 variant='body1'>
                                        ADD BLOG
                                    </STypography1>
                                </SButton1>
                            </Box>

                            <Box>
                                <STypography1 variant='h6'>
                                    Hello! {userInfo.name[0].toUpperCase() + userInfo.name.slice(1)}
                                </STypography1>
                            </Box>
                        </SBox1>
                    }

                    {error && <STypography1 variant='caption' sx={{ color: '#FF0000' }}>{error}</STypography1>}
                    {loading && <STypography1 variant='caption' sx={{ color: '#000000' }}>LOADING</STypography1>}

                    <Grid container>
                        {blogs.map(Blog => {
                            return (
                                <Grid item lg={4} md={6} sm={12} xs={12} key={Blog._id}>
                                    <SBox2 boxShadow={6}>
                                        <Box textAlign='right'>
                                            {Blog.user === userInfo.id ?
                                                <Box sx={{ height: '50px' }}>
                                                    <DeleteIcon
                                                        fontSize='small'
                                                        sx={{ color: '#8A2244', p: 1 }}
                                                        onClick={() => DeleteBlog(Blog.uid)}
                                                    />

                                                    <EditIcon
                                                        fontSize='small'
                                                        sx={{ color: '#8A2244', p: 1 }}
                                                        onClick={() => {
                                                            GetBlogID(Blog.uid, Blog.title, Blog.article);
                                                            setShowAddBlog(false)
                                                            setOpenEdit(true)
                                                        }}
                                                    />
                                                </Box> :
                                                <Box sx={{ height: '50px' }} />
                                            }
                                        </Box>
                                        <br />

                                        <SBox3 sx={{ mt: -5 }}>
                                            <STypography1 variant='h6'>
                                                <u>{Blog.title}</u>
                                            </STypography1>

                                            <STypography1 variant='body1'>
                                                {Blog.article}
                                            </STypography1>
                                        </SBox3>

                                        <Box textAlign='right'>
                                            <STypography1 variant='subtitle2' sx={{ p: 1 }}>
                                                - {Blog.author}
                                            </STypography1>
                                        </Box>
                                    </SBox2>
                                </Grid>
                            )
                        })}
                    </Grid>
                </> :
                null
            }

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box textAlign='right'>
                        <CloseIcon
                            fontSize='small'
                            sx={{ color: '#412525' }}
                            onClick={() => { setShowAddBlog(false); handleClose() }}
                        />
                    </Box>

                    <Box textAlign='center'>
                        {message && <STypography1 variant='caption' sx={{ color: '#FF0000' }}>{message}</STypography1>}
                    </Box>

                    <Box textAlign='left'>
                        <STypography1 variant='h6'>
                            TITLE
                        </STypography1>

                        <TextField fullWidth
                            id='outlined-size-small'
                            type='text'
                            size='small'
                            value={title}
                            sx={{ mt: 2, mb: 2 }}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <STypography1 variant='h6'>
                            ARTICLE
                        </STypography1>

                        <TextField fullWidth
                            id='outlined-multiline-static'
                            multiline
                            rows={3}
                            value={article}
                            onChange={(e) => setArticle(e.target.value)}
                        />
                    </Box>

                    <Box textAlign='center'>
                        <SButton2
                            onClick={AddBlog}
                        >
                            <STypography1 variant='body1'>
                                ADD BLOG
                            </STypography1>
                        </SButton2>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={openEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box textAlign='right'>
                        <CloseIcon
                            fontSize='small'
                            sx={{ color: '#412525' }}
                            onClick={() => { setBlogEdit(false); handleCloseEdit() }}
                        />
                    </Box>

                    <Box textAlign='center'>
                        {message && <STypography1 variant='caption' sx={{ color: '#FF0000' }}>{message}</STypography1>}
                    </Box>

                    <Box textAlign='left'>
                        <STypography1 variant='h6'>
                            NEW TITLE
                        </STypography1>

                        <TextField fullWidth
                            id='outlined-size-small'
                            type='text'
                            size='small'
                            value={newTitle}
                            sx={{ mt: 2, mb: 2 }}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />

                        <STypography1 variant='h6'>
                            NEW ARTICLE
                        </STypography1>

                        <TextField fullWidth
                            id='outlined-multiline-static'
                            multiline
                            rows={3}
                            value={newArticle}
                            onChange={(e) => setNewArticle(e.target.value)}
                        />
                    </Box>

                    <Box textAlign='center'>
                        <SButton2 onClick={EditBlog}>
                            <STypography1 variant='body1'>
                                SAVE
                            </STypography1>
                        </SButton2>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default Home
