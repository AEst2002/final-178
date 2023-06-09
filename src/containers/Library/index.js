import React, {useState, useEffect} from 'react'
import CircleButton from '../../components/CircleButton'
import Header from '../../components/Header'
import { Square, PaletteGrid, ButtonPanel } from './styles'
import Edit from '../../assets/Edit.png'
import Eye from '../../assets/Eye.png'
import Trash from '../../assets/Trash.png'
import PlusBlack from '../../assets/PlusBlack.png'
import { useNavigate } from 'react-router'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button'


const Library = ({justFinishedId}) => {
    const navigate = useNavigate()
    const [paletteList, setPaletteList] = useState([])
    const [openAlert, setOpenAlert] = React.useState(false);
    const [delTarget, setDelTarget] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("palettes")){
            setPaletteList(JSON.parse(localStorage.getItem("palettes")))
        }
    }, [])

    // CONCEPT: #Palette
    // Delete a palette from the user's #Library
    const handleDelete = (id) => {
        const tempList = [...paletteList]
        const delIndex = tempList.findIndex(p => p.id === id )
        tempList[delIndex].deleted = true
        localStorage.setItem('palettes', JSON.stringify(tempList))
        setPaletteList(tempList)
    }

    const handleClose = () => {
        setOpenAlert(false);
    }

    const handleOpen = () => {
        setOpenAlert(true);
    }
    
    return (
        <>
        <Header />
        <h1 style={{marginLeft: 15}}>Your Palettes:</h1>
        <PaletteGrid>
            <Square>
                {/* CONCEPT: #Palette. Create a new Palette to add to a user's #Library. */}
                <p style={{fontWeight: 'bold', marginBottom: 0}}>Create New</p>
                <CircleButton 
                    style={{ 
                        opacity: '0.65',
                        backgroundColor: '#BEBEBE',
                        width: '60px',
                        height: '60px',
                        marginTop: '35px',
                    }}
                    iconStyle={{opacity: '1'}}
                    icon={PlusBlack}
                    onClick={() => navigate(`palette/${paletteList.length}`)}
                        
                />
            </Square>
            {paletteList.map((palette) => {
                return ( !palette.deleted &&
                    <Square bcol={palette.colors[0] || 'black'}>
                        <h3 style={{marginTop: 55, marginBottom: 15}}>{palette.name}</h3>
                        <p style={{margin: 0}}>({palette.colors.length} colors)</p>
                        <ButtonPanel>
                            {/* CONCEPT: #Palette. View a Palette as full screen. See the View container. */}
                            <CircleButton onClick={() => navigate(`/view/${palette.id}`)} style={{marginTop: 30}} icon={Eye} />
                            {/* CONCEPT: #Palette. Edit a Palette by adding, removing, or reordering #Colors. See the Prompter and Sidebar components.  */}
                            <CircleButton onClick={() => navigate(`/palette/${palette.id}`)} style={{marginTop: 30, marginLeft: 15, marginRight: 15}} icon={Edit} />
                            {/* CONCEPT: #Palette. Delete a Palette and remove it from a user's #Library.  */}
                            <CircleButton style={{marginTop: 30}} icon={Trash} onClick={() => {setDelTarget(palette.id); handleOpen()}}/>
                            <Dialog
                                open={openAlert}
                                onClose={handleClose}
                            >
                                <DialogContent>
                                    {"Are you sure you want to delete this palette?"}
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={() => {handleClose(); handleDelete(delTarget)}}>Yes</Button>
                                <Button onClick={handleClose} autoFocus>
                                    No
                                </Button>
                                </DialogActions>

                            </Dialog>
                        </ButtonPanel>
                    </Square>
                )
            })}            
        </PaletteGrid>
        </>

    )
}

export default Library