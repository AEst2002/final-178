import { React, useState } from 'react'
import CircleButton from '../CircleButton'
import ColorRow from '../ColorRow'
import { ButtonPanel, Container, NameContainer } from './styles'
import Edit from '../../assets/Edit.png'
import Button from '../Button'

  
const Sidebar = ({favorites, setFavorites, currentColors, setCurrentColors}) => {
    return (
        <Container>
            <NameContainer>
                Palette #1
                <CircleButton style={{marginLeft: '10px'}} icon={Edit} />
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
                    <Button color={'#00A2E8'} text={'SAVE'} />
                    <Button color={'#c8232b'} onClick={() => setCurrentColors([])}text={'CLEAR'} />
                </ButtonPanel>
            }

        </Container>
    )
   
}

export default Sidebar