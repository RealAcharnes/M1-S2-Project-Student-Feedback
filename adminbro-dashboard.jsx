import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
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
    window.location.href = 'http://localhost:5050/admin/resources/User'; 
    api.getDashboard().then((response) => {
      setData(response.data)
    })
  }, [])
  const log = () => {
      console.log(props)
  }

  return (
      <div style={mystyle}>
          <Route path='/' component={() => { 
            window.location.href = 'http://localhost:5050/admin/resources/User'; 
            return null;
            }}
          />
    </div>
  )
}
export default UserComponent