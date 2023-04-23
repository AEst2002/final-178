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

const ColorRow = ({favorites, setFavorites, hex, setCurrentColors, currentColors, index}) => {
    // Hex code to RGB conversion.
    const hexToRgb = (hexCode) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexCode);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

    const [textColor, setTextColor] = useState('#000000')
    // Decide what color the text on the row should be depending on the saturation of the color it displays.
    useEffect(() => {
        const {r, g, b} = hexToRgb(hex)
        if ((r * 0.299 + g * 0.587 + b * 0.114) < 150){
            setTextColor('#FFFFFF')
        }
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

    console.log(favorites)
    return (
        <RowContainer color={hex}>
            <CircleButton onClick={handleDelete} style={{position: 'absolute', top: '10px', left: '10px'}} icon={Trash} />
            <CircleButton onClick={handleFavorite} style={{position: 'absolute', top: '10px', right: '10px'}} icon={favorites.includes(hex) ? HeartFilled : HeartEmpty}/>
            <Chevron style={{top: '45px', right: '10px'}} src={textColor === '#000000' ? UpBlack : UpWhite}/>
            <Chevron style={{top: '90px', right: '10px'}} src={textColor === '#000000' ? DownBlack : DownWhite}/>
            <RowText fontSize={'30px'} color={textColor}>{hex}</RowText>
            <RowText fontSize={'15px'} color={textColor}>{ntc.name(hex)[1]}</RowText>
        </RowContainer>
    )


}

export default ColorRow