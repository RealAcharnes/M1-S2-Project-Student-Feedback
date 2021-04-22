import React, {useEffect, useState} from 'react'
import { Navigation, Box, Label } from '@admin-bro/design-system'
import { ApiClient } from 'admin-bro'




const api = new ApiClient()

const UserComponents = (props) => {
    const label = ''

    const [databaseOpen, setdatabaseOpen] = React.useState(true)
    
    const handleClick = (event) => {
      event.preventDefault()
      console.log(event)
    //   window.location.href = `http://localhost:5050/admin${href}`; 
    }
    
    const navigationElements = [{
      label: 'Database Dashboard',
      icon: 'Dashboard',
      isSelected: true,
      href: '/',
      onClick: handleClick,
      id: 'dashboard',
    }, {
      label: 'Database Menu',
      icon: 'Datastore',
      onClick: (event) => {
        event.preventDefault()
        setdatabaseOpen(!databaseOpen)
      },
      isOpen: databaseOpen,
      elements: [{
        label: 'Users',
        href: 'User',
        onClick: (event) => {
            window.location.href = `https://neuroeducation-feedback.herokuapp.com/admin/resources/User`
        },
        id: 'user',
      }, {
        label: 'Quizzes',
        href: 'Quiz',
        onClick: (event) => {
            window.location.href = `https://neuroeducation-feedback.herokuapp.com/admin/resources/Quiz`
        },
        id: 'quiz',
      }, {
        label: 'History',
        href: 'history',
        onClick: (event) => {
            window.location.href = `https://neuroeducation-feedback.herokuapp.com/admin/resources/history`
        },
        id: 'history',
      }],
    }]
  
    return (
    //   <Box variant="grey" height="500px">
    //     <Label>Navigation example</Label>
    //     <Box width="sidebarWidth" border="bg" bg="white">
    //       <Navigation elements={navigationElements} label={label} />
    //     </Box>
    //   </Box>
    <div>
        <Navigation elements={navigationElements} label={label} />
    </div>
    )
  }
export default UserComponents