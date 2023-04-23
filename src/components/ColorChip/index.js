import React, { useState, useEffect } from 'react'
import { Container, ChipText } from './styles'
import CircleButton from '../CircleButton'
import PlusBlack from '../../assets/PlusBlack.png'
import PlusWhite from '../../assets/PlusWhite.png'
import textColor from '../../util/textColor'
import { ntc } from '../../util/ntc'

const ColorChip = ({ hex, setCurrentColors, currentColors }) => {
    const [innerColor, setInnerColor] = useState('#000000')
    useEffect(() => {
        setInnerColor(textColor(hex))
    }, [hex])

    return (
        <Container color={hex}>
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
                onClick={() => setCurrentColors([...currentColors, hex])}
            />
            <ChipText color={innerColor}>
                 {hex + '   '}
                 {ntc.name(hex)[1]}
            </ChipText>
        </Container>
    )
}

export default ColorChip