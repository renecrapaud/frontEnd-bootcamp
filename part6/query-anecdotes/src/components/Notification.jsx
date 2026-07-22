import { useContext } from "react"
import NotifyContext from "./NotifyContext"

const Notification = () => {
  const {messageState} = useContext(NotifyContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {messageState}
    </div>
  )
}

export default Notification