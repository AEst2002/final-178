import { HeaderContainer, Name } from "./styles"
import Link from '@mui/material/Link'

const Header = ({showLibrary}) => {
    return (
        <HeaderContainer>
            <Name>chromAI</Name>
            { showLibrary ? 
                <Link href='/' underline="none" sx={{marginRight: "10px"}}>Back to Library</Link>
            : []
            }
        </HeaderContainer> 
    )
}

export default Header