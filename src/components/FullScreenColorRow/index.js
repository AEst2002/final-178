import React, {useEffect, useState} from 'react'
import { RowContainer, RowText} from './styles'
import { ntc } from '../../util/ntc'

import textColor from '../../util/textColor'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Snackbar } from '@mui/material'

const FullScreenColorRow = ({favorites, setFavorites, hex, setCurrentColors, currentColors, index}) => {
    const [innerColor, setInnerColor] = useState('#000000')
    const [copied, setCopied] = useState(false)
    useEffect(() => {
        setInnerColor(textColor(hex))
    }, [hex])

    return (
        <RowContainer color={hex} style={{width: "100%"}}>
            <RowText fontSize={'45px'} color={innerColor} id={hex}>{hex}            
                <CopyToClipboard style={{cursor: 'pointer', marginLeft: "7px"}} text={hex} onCopy={() => setCopied(true)}>
                    <ContentCopyOutlinedIcon fontSize='large'/>
                </CopyToClipboard>
            </RowText>
            <RowText fontSize={'25px'} color={innerColor}>{ntc.name(hex)[1]}</RowText>
            <Snackbar
                message="Copied to clipboard!"
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={1500}
                onClose={() => setCopied(false)}
                open={copied}
            />
        </RowContainer>
    )


}

export default FullScreenColorRow