import React from 'react'
import { InputGroup, Label } from '@admin-bro/design-system'

const MyReactComponent = props => {
  const { record, property } = props
  const value = record.params[property.name]
  return (
    <InputGroup>
      <Label>{property.name}</Label>
      {value} [meters]
    </InputGroup>
  )
}
export default MyReactComponent