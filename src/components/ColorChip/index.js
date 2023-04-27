import React, { useState, useEffect } from 'react'
import { Container, ChipText } from './styles'
import CircleButton from '../CircleButton'
import PlusBlack from '../../assets/PlusBlack.png'
import PlusWhite from '../../assets/PlusWhite.png'
import CheckWhite from '../../assets/CheckWhite.png'
import CheckBlack from '../../assets/CheckBlack.png'
import textColor from '../../util/textColor'
import { ntc } from '../../util/ntc'

const ColorChip = ({ hex, setCurrentColors, currentColors }) => {
    const [innerColor, setInnerColor] = useState('#000000')
    const [added, setAdded] = useState(false)
    useEffect(() => {
        setInnerColor(textColor(hex))
    }, [hex])

    return (
        <Container color={hex}>
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