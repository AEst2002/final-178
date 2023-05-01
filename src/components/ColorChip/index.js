import React, { useState, useEffect } from 'react'
import { Container, ChipText } from './styles'
import CircleButton from '../CircleButton'
import PlusBlack from '../../assets/PlusBlack.png'
import PlusWhite from '../../assets/PlusWhite.png'
import CheckWhite from '../../assets/CheckWhite.png'
import CheckBlack from '../../assets/CheckBlack.png'
import textColor from '../../util/textColor'
import { ntc } from '../../util/ntc'

// CONCEPT: ColorChips represent a different variant of the #Color concept's instantiation, 
// prior to being added to a palette (See ColorRow/index.js).
const ColorChip = ({ hex, setCurrentColors, currentColors }) => {
    const [innerColor, setInnerColor] = useState('#000000')
    const [added, setAdded] = useState(currentColors.includes(hex))
    useEffect(() => {
        setInnerColor(textColor(hex))
    }, [hex])

    useEffect(() => {
        setAdded(currentColors.includes(hex))
    }, [currentColors, hex])

    return (
        <Container color={hex}>
            {/* CONCEPT: An example of the #Color's operaitonal principle: 
                a color can only be added if it is not already in the palette. */}
            { added 
                ? 
                <CircleButton 
                    style={{ 
                        disabled: true,
                        alignSelf: 'center', 
                        opacity: '0.65',
                        marginBottom: '25px',
                        marginTop: '30px',
                        backgroundColor: '#BEBEBE',
                        width: '35px',
                        height: '35px',
                        cursor: 'auto'

                    }}
                iconStyle={{opacity: '1'}}
                icon={innerColor === '#FFFFFF' ? CheckWhite : CheckBlack}
                />
            
                : 
                <CircleButton 
                    style={{ 
                        alignSelf: 'center', 
                        opacity: '0.65',
                        marginBottom: '25px',
                        marginTop: '30px',
                        backgroundColor: '#BEBEBE',
                        width: '35px',
                        height: '35px',

                    }}
                    iconStyle={{opacity: '1'}}
                    icon={innerColor === '#FFFFFF' ? PlusWhite : PlusBlack}
                    // CONCEPT: This anonymous function implements the addColor() action of the #Color concept.
                    onClick={() => {setAdded(true); setCurrentColors([...currentColors, hex])}}
                />
            }
            
            <ChipText color={innerColor}>
                 {hex + '   '}
                 {ntc.name(hex)[1]}
            </ChipText>
        </Container>
    )
}

export default ColorChip