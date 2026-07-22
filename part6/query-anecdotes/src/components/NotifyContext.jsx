import { createContext, useReducer } from "react";

function notifReducer(state, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotifyContext = createContext()

export const NotifyContextProvider = (props) => {
  const [messageState, dispatch] = useReducer(notifReducer, '')

  return (
    <NotifyContext.Provider value={{ messageState, dispatch }}>
      {props.children}
    </NotifyContext.Provider>
  )
}

export default NotifyContext