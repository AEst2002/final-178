import { React, useState } from 'react'
import ColorRow from '../ColorRow'

  
const Sidebar = ({currentColors}) => {
    return (
        <div style={{float: "right", width: "40%"}}>
            {currentColors.map((color) => {
                return <ColorRow hex={color} />
            })}
            {/* <ColorRow hex={'#9EA587'}/>
            <ColorRow hex={'#632A50'}/>
            <ColorRow hex={'#C2E812'}/> */}
        </div>
    )
   
}

export default Sidebar