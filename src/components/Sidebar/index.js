import  React, { useState, useEffect } from 'react'
import CircleButton from '../CircleButton'
import ColorRow from '../ColorRow'
import { ButtonPanel, Container, NameContainer, NameEditor } from './styles'
import Edit from '../../assets/Edit.png'
import Check from '../../assets/Check.png'
import Button from '../Button'

  
const Sidebar = ({favorites, setFavorites, currentColors, setCurrentColors, editingId}) => {
    const [paletteName, setPaletteName] = useState("Unnamed Palette")
    const [nameEdit, setNameEdit] = useState(false)

    useEffect(() => {
        nameEdit && document.getElementById('editor').focus()
    }, [nameEdit])

    // populating name and sidebar with colors if editing pre-existing palette
    useEffect(() => {
        if (editingId) {
            const palettes = JSON.parse(localStorage.getItem("palettes"))
            const {colors, name} = palettes[palettes.findIndex((palette) => palette.id === editingId )]
            setCurrentColors(colors)
            setPaletteName(name)
        }
    }, [editingId, setCurrentColors])

    const handleSave = () => {
        const paletteJSON = JSON.parse(localStorage.getItem("palettes"))
        // just using length of the palette array as an ID for now, should stay unique enough for our purposes.
        const thisPalette = {
            id: editingId || (paletteJSON ? paletteJSON.length : 0),
            name: paletteName,
            colors: currentColors,
        }
        
        if (paletteJSON) { // if other palettes saved before
            const pIndex = paletteJSON.findIndex((palette) => palette.id === editingId)

            if (pIndex > -1) {
                paletteJSON[pIndex] = thisPalette
            } else {
                paletteJSON.push(thisPalette)
            }
            localStorage.setItem("palettes", JSON.stringify(paletteJSON))
    
        } else { // else if this is the first palette to be saved
            localStorage.setItem("palettes", JSON.stringify([thisPalette]))
        }
    }

    console.log(localStorage.getItem("palettes") ? JSON.parse(localStorage.getItem("palettes")) : 'waiting')

    return (
        <Container>
            <NameContainer>
                {nameEdit ? <NameEditor placeholder="Name can't be blank!" type="text" minLength="1" maxLength="20" onChange={(e) => setPaletteName(e.target.value)} id={"editor"} autofocus value={paletteName}/> : paletteName}
                {/* <NameEditor id={"editor"} autofocus value={paletteName}/> */}
                <CircleButton style={{marginLeft: '10px'}} icon={nameEdit ? Check : Edit} onClick={() => {paletteName.length > 0 && setNameEdit(!nameEdit)}} />
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
            {currentColors.length > 0 && 
                <ButtonPanel>
                    <Button color={'#00A2E8'} text={'SAVE'} onClick={handleSave} />
                    <Button color={'#c8232b'} onClick={() => setCurrentColors([])}text={'CLEAR'} />
                </ButtonPanel>
            }

        </Container>
    )
   
}

export default Sidebar