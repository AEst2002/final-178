import React, {useEffect, useState} from 'react'
import {Chevron, RowContainer, RowText} from './styles'
import { ntc } from '../../util/ntc'
import CircleButton from '../CircleButton'
import HeartEmpty from '../../assets/HeartEmpty.png'
import HeartFilled from '../../assets/HeartFilled.png'
import UpWhite from '../../assets/UpWhite.png'
import DownWhite from '../../assets/DownWhite.png'
import UpBlack from '../../assets/UpBlack.png'
import DownBlack from '../../assets/DownBlack.png'
import Trash from '../../assets/Trash.png'
import textColor from '../../util/textColor'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Snackbar } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'

const ColorRow = ({favorites, setFavorites, hex, setCurrentColors, currentColors, index}) => {
    const [innerColor, setInnerColor] = useState('#000000')
    const [copied, setCopied] = useState(false)
    useEffect(() => {
        setInnerColor(textColor(hex))
    }, [hex])

    const handleDelete = () => {
        // need to copy state and change it because .splice() modifies array in-place.
        const curColCopy = [...currentColors]
        curColCopy.splice(index, 1)
        setCurrentColors(curColCopy)
    }

    const handleFavorite = () => {
        const favCopy = [...favorites]

        if (favorites.includes(hex)) {
            favCopy.splice(favCopy.indexOf(hex), 1)
        } else {
            favCopy.push(hex)
        }

        setFavorites(favCopy)
    }

    const handleMove = (direction) => {
        const curColCopy = [...currentColors]
        if (direction === 'up') {
            curColCopy[index] = currentColors[index - 1]
            curColCopy[index - 1] = currentColors[index]
        }

        if (direction === 'down') {
            curColCopy[index] = currentColors[index + 1]
            curColCopy[index + 1] = currentColors[index]
        }

        setCurrentColors(curColCopy)
    }

    return (
        <Draggable draggableId={hex.id} index={index}>
            {(provided, snapshot) => (
                <RowContainer 
                    color={hex}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <CircleButton onClick={handleDelete} style={{position: 'absolute', top: '10px', left: '10px'}} icon={Trash} />
                    <CircleButton onClick={handleFavorite} style={{position: 'absolute', top: '10px', right: '10px'}} icon={favorites.includes(hex) ? HeartFilled : HeartEmpty}/>
                    {index !== 0 && <Chevron onClick={() => handleMove('up')} style={{top: '45px', right: '10px'}} src={innerColor === '#000000' ? UpBlack : UpWhite}/>}
                    {index !== (currentColors.length - 1) && <Chevron onClick={() => handleMove('down')} style={{top: '90px', right: '10px'}} src={innerColor === '#000000' ? DownBlack : DownWhite}/>}
                    <RowText fontSize={'30px'} color={innerColor} id={hex}>{hex}            
                        <CopyToClipboard style={{cursor: 'pointer', marginLeft: "7px"}} text={hex} onCopy={() => setCopied(true)}>
                            <ContentCopyOutlinedIcon />
                        </CopyToClipboard>
                    </RowText>
                    <RowText fontSize={'15px'} color={innerColor}>{ntc.name(hex)[1]}</RowText>
                    <Snackbar
                        message="Copied to clipboard!"
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        autoHideDuration={1500}
                        onClose={() => setCopied(false)}
                        open={copied}
                    />
                </RowContainer>
            )}
        </Draggable>
    )
}

export default ColorRow