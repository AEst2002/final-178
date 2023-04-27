import  React, { useState, useEffect } from 'react'
import CircleButton from '../CircleButton'
import ColorRow from '../ColorRow'
import { ButtonPanel, Container, NameContainer, NameEditor } from './styles'
import Edit from '../../assets/Edit.png'
import CheckBlack from '../../assets/CheckBlack.png'
import Button from '../Button'
import { useParams, useNavigate } from "react-router-dom";


  
const Sidebar = ({favorites, setFavorites, currentColors, setCurrentColors}) => {
    const navigate = useNavigate()
    const [paletteName, setPaletteName] = useState("Unnamed Palette")
    const [nameEdit, setNameEdit] = useState(false)
    const id = parseInt(useParams().id)

    useEffect(() => {
        nameEdit && document.getElementById('editor').focus()
    }, [nameEdit])

    // populating name and sidebar with colors if editing pre-existing palette
    useEffect(() => {
        const paletteJSON = localStorage.getItem('palettes')
        const existingPalette = paletteJSON ? JSON.parse(paletteJSON).filter((p) => p.id === id) : []
        console.log(existingPalette)
        if (existingPalette.length > 0){
            setCurrentColors(existingPalette[0].colors)
            setPaletteName(existingPalette[0].name)
        }
    }, [setCurrentColors, id])

    const handleSave = () => {
        const paletteJSON = JSON.parse(localStorage.getItem("palettes"))
        const existingPalette = paletteJSON ? paletteJSON.filter((p) => p.id === id) : []

        // just using length of the palette array as an ID for now, should stay unique enough for our purposes.
        const thisPalette = {
            id: existingPalette.length > 0 ? existingPalette[0].id : id,
            name: paletteName,
            colors: currentColors,
        }
        
        if (paletteJSON) { // if other palettes saved before
            const pIndex = paletteJSON.findIndex((palette) => palette.id === id)

            if (pIndex > -1) {
                paletteJSON[pIndex] = thisPalette
            } else {
                paletteJSON.push(thisPalette)
            }
            localStorage.setItem("palettes", JSON.stringify(paletteJSON))
    
        } else { // else if this is the first palette to be saved
            localStorage.setItem("palettes", JSON.stringify([thisPalette]))
        }

        // take user to library once they've finished/saved.
        navigate('/')
    }

    console.log(localStorage.getItem("palettes") ? JSON.parse(localStorage.getItem("palettes")) : 'waiting')

    return (
        <Container>
            <NameContainer>
                {nameEdit ? <NameEditor placeholder="Name can't be blank!" type="text" minLength="1" maxLength="20" onChange={(e) => setPaletteName(e.target.value)} id={"editor"} autofocus value={paletteName}/> : paletteName}
                {/* <NameEditor id={"editor"} autofocus value={paletteName}/> */}
                <CircleButton style={{marginLeft: '10px'}} icon={nameEdit ? CheckBlack : Edit} onClick={() => {paletteName.length > 0 && setNameEdit(!nameEdit)}} />
            </NameContainer>
            {currentColors.length ? currentColors.map((color, index) => {
                return( 
                    <ColorRow 
                        index={index} 
                        currentColors={currentColors} 
                        setCurrentColors={setCurrentColors} 
                        hex={color} 
                        favorites={favorites}
                        setFavorites={setFavorites}
                    />
                )
            }) : <p style={{float: 'right'}}>No colors (yet!)</p>}
            <ButtonPanel>
                <Button color={'#00A2E8'} style={{marginTop: '10px', marginBottom: '10px'}} text={'SAVE'} onClick={handleSave} />
                <Button color={'#c8232b'} style={{marginTop: '10px', marginBottom: '10px'}} onClick={() => setCurrentColors([])} text={'CLEAR'} />
                <Button color={'#7B002D'} onClick={() => navigate("/")} width={'215px'}text={'EXIT WITHOUT SAVING'} />
            </ButtonPanel>

        </Container>
    )
   
}

export default Sidebar