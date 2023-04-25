import { React, useState } from 'react'
import CircleButton from '../CircleButton'
import ColorRow from '../ColorRow'
import { ButtonPanel, Container, NameContainer } from './styles'
import Edit from '../../assets/Edit.png'
import Button from '../Button'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

  
const Sidebar = ({favorites, setFavorites, currentColors, setCurrentColors}) => {

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const newColors = Array.from(currentColors);
        const [reorderedItem] = newColors.splice(result.source.index, 1);
        newColors.splice(result.destination.index, 0, reorderedItem);
        setCurrentColors(newColors)
    }

    return (
        <Container>
            <NameContainer>
                Palette #1
                <CircleButton style={{marginLeft: '10px'}} icon={Edit} />
            </NameContainer>

            {
                currentColors.length ? 
                    <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                { currentColors.map((color, index) => (
                                    {provided.placeholder}
                                    <ColorRow 
                                        index={index}
                                        currentColors={currentColors} 
                                        setCurrentColors={setCurrentColors} 
                                        hex={color} 
                                        favorites={favorites}
                                        setFavorites={setFavorites}
                                    /> 
                                ))}
                                
                            </div>       
                        )}
                    </Droppable>
                    </DragDropContext>
                : <p style={{float: 'right'}}>No colors (yet!)</p>
        }
                    
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