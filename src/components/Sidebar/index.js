import { React, useState } from 'react'
import ColorRow from '../ColorRow'

  
const Sidebar = ({currentColors}) => {
    return (
        <div style={{float: "right", width: "40%"}}>
            {currentColors.length ? currentColors.map((color) => {
                return <ColorRow hex={color} />
            }) : <p style={{float: 'right'}}>No colors (yet!)</p>}
        </div>
    )
   
}

export default Sidebar