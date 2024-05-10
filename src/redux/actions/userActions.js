import axios from 'axios'
import Swal from 'sweetalert2'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants'

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('http://127.0.0.1:8000/user/login/', { 'username': username, 'password': password }, config)
        console.log(data)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        sessionStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            text: error?.response?.data?.detail ? error.response.data.detail : 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
        })
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.detail
        })
    }
}

export const logout = () => (dispatch) => {
    sessionStorage.removeItem('userInfo')

    dispatch({
        type: USER_LOGOUT
    })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('http://127.0.0.1:8000/user/register/', { 'first_name': name, 'name': name, 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        sessionStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        Swal.fire({
            icon: 'error',
            text: error?.response?.data?.detail ? error.response.data.detail : 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
        })
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.detail
        })
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.detail,
        })
    }
}
