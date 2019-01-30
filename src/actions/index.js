import API_Stream from '../api/API_Stream'
import history from '../history'
import * as TYPES from './types'

export const signIn = userId => {
  return {
    type: TYPES.SIGN_IN,
    payload: userId
  }
}

export const signOut = () => {
  return {
    type: TYPES.SIGN_OUT
  }
}

// can do (formValues, history) to access history object
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth
  const response = await API_Stream.post('/streams', { ...formValues, userId })

  dispatch({ type: TYPES.CREATE_STREAM, payload: response.data })
  history.push('/')
}

export const fetchStreams = () => async dispatch => {
  const response = await API_Stream.get('/streams')

  dispatch({ type: TYPES.FETCH_STREAMS, payload: response.data })
}

export const fetchStream = id => async dispatch => {
  const response = await API_Stream.get(`./streams/${id}`)

  dispatch({ type: TYPES.FETCH_STREAM, payload: response.data })
}

export const editStream = (id, formValues) => async dispatch => {
  //const response = await API_Stream.put(`./streams/${id}`, formValues)
  const response = await API_Stream.patch(`./streams/${id}`, formValues)

  dispatch({ type: TYPES.EDIT_STREAM, payload: response.data })
  history.push('/')
}

export const deleteStream = id => async dispatch => {
  await API_Stream.delete(`./streams/${id}`)

  dispatch({ type: TYPES.DELETE_STREAM, payload: id })
  history.push('/')
}