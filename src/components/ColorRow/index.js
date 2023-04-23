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

const ColorRow = ({favorites, setFavorites, hex, setCurrentColors, currentColors, index}) => {
    const [innerColor, setInnerColor] = useState('#000000')
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
        <RowContainer color={hex}>
            <CircleButton onClick={handleDelete} style={{position: 'absolute', top: '10px', left: '10px'}} icon={Trash} />
            <CircleButton onClick={handleFavorite} style={{position: 'absolute', top: '10px', right: '10px'}} icon={favorites.includes(hex) ? HeartFilled : HeartEmpty}/>
            {index !== 0 && <Chevron onClick={() => handleMove('up')} style={{top: '45px', right: '10px'}} src={innerColor === '#000000' ? UpBlack : UpWhite}/>}
            {index !== (currentColors.length - 1) && <Chevron onClick={() => handleMove('down')} style={{top: '90px', right: '10px'}} src={innerColor === '#000000' ? DownBlack : DownWhite}/>}
            <RowText fontSize={'30px'} color={innerColor}>{hex}</RowText>
            <RowText fontSize={'15px'} color={innerColor}>{ntc.name(hex)[1]}</RowText>
        </RowContainer>
    )


}

export default ColorRow