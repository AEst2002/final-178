import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import { Container, Wrapper } from '../Main/styles'
import { useParams } from "react-router-dom";
import ColorRow from '../../components/FullScreenColorRow';


const View = ({favorites, setFavorites})=> {
    const [palette, setPalette] = useState({})
    const [currentColors, setCurrentColors] = useState([])
    const [paletteName, setPaletteName] = useState("")

    const {id} = useParams()

    useEffect(() => {
        if (localStorage.getItem("palettes")){

            // var tempPalette = (JSON.parse(localStorage.getItem("palettes"))[id])
            var palettes = JSON.parse(localStorage.getItem("palettes"))
            var tempPalette = palettes.filter((p) => p.id === parseInt(id))
            setPalette(tempPalette)
            setCurrentColors(tempPalette[0].colors)
            setPaletteName(tempPalette[0].name)           
        }
    }, [id, palette])
    return (
        <Wrapper>
            <Header />
            <Container style={{width: "100%"}}> 
                {
                    currentColors.length ? currentColors.map((color, index) => (
                        <ColorRow style={{width: "100%"}}
                            index={index}
                            currentColors={currentColors} 
                            setCurrentColors={setCurrentColors} 
                            hex={color} 
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    )) : <p style={{textAlign: "center"}}>No colors in this palette! </p>

                }
                
                
            </Container>
        </Wrapper>
    )
}

export default View