import React, {useEffect, useState} from 'react'
import { InputGroup, Label, Box } from '@admin-bro/design-system'
import { ApiClient } from 'admin-bro'


const api = new ApiClient()

const UserComponent = (props) => {
const [data, setData] = useState({})
const mystyle ={
    background: "linear-gradient(to bottom, rgba(3,75, 82, 1) 0%, rgba(3,75, 82, 0) 100%)",
    height: "100%",
    margin: 0,
    "background-repeat": "no-repeat",
    "background-attachment": "fixed",
}

  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data)
    })
  }, [])
  const log = () => {
      console.log(props)
  }

  return (
      <div style={mystyle}>
          <button onClick={()=>log()}>LOG</button>
          <a href="/">
        <span role="img" aria-label="about us">&#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;</span>
        About us
      </a>
      <a href="/">
        <span role="img" aria-label="price">&#x1f4b8;</span>
        Pricing
        </a>
      <a href="/">
        <span role="img" aria-label="contact">&#x1f4e9;</span>
        Contact
        </a>
    </div>
  )
}
export default UserComponent