import { React, useState } from 'react'
import ColorRow from '../ColorRow'

  
const Sidebar = ({currentColors, setCurrentColors}) => {
    return (
        <div style={{float: "right", width: "40%"}}>
            {currentColors.length ? currentColors.map((color, index) => {
                return <ColorRow index={index} currentColors={currentColors} setCurrentColors={setCurrentColors} hex={color} />
            }) : <p style={{float: 'right'}}>No colors (yet!)</p>}
        </div>
    )
   
}

export default Sidebar