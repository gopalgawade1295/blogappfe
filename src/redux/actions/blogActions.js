import axios from 'axios'
import { BLOGS_REQUEST, BLOGS_SUCCESS, BLOGS_FAIL, ADD_BLOG, EDIT_BLOG, DELETE_BLOG } from "../constants/blogConstants";
import Swal from 'sweetalert2'

export const bloglist = () => async (dispatch) => {
    try {
        dispatch({
            type: BLOGS_REQUEST
        })

        const data = await axios.get('http://127.0.0.1:8000/blogs/')
        dispatch({
            type: BLOGS_SUCCESS,
            payload: data.data.blogs
        })

    } catch (error) {
        dispatch({
            type: BLOGS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addBlog = (user, title, article) => async (dispatch) => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    const config = {
        headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }
    }

    const data = await axios.post('http://127.0.0.1:8000/blog/add/', { 'user': user, 'title': title, 'article': article, 'author': userInfo.name }, config)

    dispatch({
        type: ADD_BLOG,
        payload: data.data.blog
    })

}

export const editBlog = (id, title, article) => async (dispatch) => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    const config = {
        headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }
    }

    const data = await axios.put(`http://127.0.0.1:8000/blog/edit/${id}`, { 'title': title, 'article': article, 'user': userInfo.id }, config)

    dispatch({
        type: EDIT_BLOG,
        payload: data.data.blog
    })
}

export const deleteBlog = (id) => async (dispatch) => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    const config = {
        headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }
    }

    try {
        const res = await axios.delete(`http://127.0.0.1:8000/blog/delete/${id}`, config)

        Swal.fire({
            icon: 'success',
            text: res?.data?.detail ? res.data.detail : 'Blog deleted successfully',
            showConfirmButton: false,
            timer: 1500
        })

        dispatch({
            type: DELETE_BLOG,
            payload: 'text'
        })
    }
    catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            text: error?.response?.data?.detail ? error.response.data.detail : 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
        })
    }
}
