import { React, useState } from 'react'
import CircleButton from '../CircleButton'
import ColorRow from '../ColorRow'
import { ButtonPanel, Container, NameContainer } from './styles'
import Edit from '../../assets/Edit.png'
import Button from '../Button'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

  
const Sidebar = ({favorites, setFavorites, currentColors, setCurrentColors}) => {
    
    const initialTasks = [
        {
            id: 1,
            title: "test 1",
        },
        {
            id: 2,
            title: "test 2"
        },
        {
            id: 3,
            title: "test 3"
        }
    ]
    const [tasks, setTasks] = useState(initialTasks)


    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTasks(items)
    }

    return (
        <Container>
            <NameContainer>
                Palette #1
                <CircleButton style={{marginLeft: '10px'}} icon={Edit} />
            </NameContainer>

            <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                    {
                        tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                            {(provided) => (
                                <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                >
                                <div>{task.title}</div>
                                </div>
                            )}
                            </Draggable>
                        ))
                    }
                    {provided.placeholder} 
                    </div>
                )}
            </Droppable>
                {/* <Droppable droppableId="tasks">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <div>{task.title}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                ));
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable> */}

            </DragDropContext>

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