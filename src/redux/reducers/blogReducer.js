import { BLOGS_REQUEST, BLOGS_SUCCESS, BLOGS_FAIL, ADD_BLOG, EDIT_BLOG, DELETE_BLOG } from "../constants/blogConstants"

export const bloglistReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
        case BLOGS_REQUEST:
            return { loading: true, blogs: [] }

        case BLOGS_SUCCESS:
            return {
                loading: false,
                blogs: action.payload
            }

        case BLOGS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const addblogReducer = (state = { blog: {} }, action) => {
    switch (action.type) {
        case ADD_BLOG:
            return {
                blog: action.payload
            }

        default:
            return state
    }
}

export const editBlogReducer = (state = { blog: {} }, action) => {
    switch (action.type) {
        case EDIT_BLOG:
            return {
                blog: action.payload
            }
        default:
            return state
    }
}

export const deleteblogReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case DELETE_BLOG:
            return {
                message: action.payload
            }
        default:
            return state
    }
}
