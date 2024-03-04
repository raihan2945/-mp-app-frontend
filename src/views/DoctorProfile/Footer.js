import React from 'react'
import { Button } from 'antd'

const Footer = ({click}) => {
  return (
    <div style={{width:"100%", textAlign:"center"}}>
      <Button onClick={click} type='primary' style={{textAlign:"center", width:"100%"}}>Save</Button>
    </div>
  )
}

export default Footer
