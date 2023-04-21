import { React } from 'react'
import ColorPrompter from '../ColorPrompter';
import PalettePrompter from '../PalettePrompter'

// eventually see if we can factor out this code to just be here
// const configuration = new Configuration({
//     apiKey: process.env.REACT_APP_OPENAI_API_KEY
//   });
// const openai = new OpenAIApi(configuration);

const Prompter = () => {
    return (
        <div>
            <ColorPrompter/>
            <PalettePrompter/>
        </div>
    );

}

export default Prompter