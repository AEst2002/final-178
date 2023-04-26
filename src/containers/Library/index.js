import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import { Square } from './styles'

const Library = ({justFinishedId}) => {
    const [paletteList, setPaletteList] = useState([])
    useEffect(() => {
        if (localStorage.getItem("palettes")){
            setPaletteList(JSON.parse(localStorage.getItem("palettes")))
        }
    }, [])
    return (
        <>
        {paletteList.map((palette) => {
            return (
                <Square>
                    <a href={`/palette/${palette.id}`}>Edit palette with id {palette.id}</a>
                </Square>
            )
        })}
        <Square>
            <a href={`/palette/${paletteList.length}`}> New palette (will have id {paletteList.length})</a>
        </Square>
        </>
    )
}

export default Library