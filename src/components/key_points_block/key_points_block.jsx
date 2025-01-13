import React, {useRef, useState} from 'react'
import './styles.css'
import { use } from 'react'

const defaultInputString = "<k>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio vitae eros ultricies aliquam. #***Donec euismod, nisl eget aliqu am aliquet***#, nunc nisl aliquam nunc, quis aliquam nisl nunc eu nisl.</k> \n <k>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio vitae eros ultricies aliquam. #***Donec euismod, nisl eget aliqu am aliquet***#, nunc nisl aliquam nunc, quis aliquam nisl nunc eu nisl.</k>"

function KeyPointsBlock() {
    const headerRef = useRef()
    // headerRef.current.value = 'Keypoints'

    const contentRef = useRef()

    const [header, setHeader] = useState('Placeholder Header')
    const [content, setContent] = useState(defaultInputString)
    // const [keypoints, setKeypoints] = useState([])
    function getKeypoints(){
        const formatStringToHTML = (str) => {
            const formattedStr = str.replace(/#(\*\*\*)/g, '<span class="bold">');
            const finalStr = formattedStr.replace(/(\*\*\*)#/g, '</span>');

            // Wrap the entire string in <p> tags
            return `${finalStr}`;
        };

        const str = content
        const regex = /<k>(.*?)<\/k>/g;
        const keypoints = [];
        let match;
        while ((match = regex.exec(str)) !== null) {
            // keypoints.push(formatStringToHTML(match[1].trim()));
            keypoints.push(match[1].trim());
        }
        
        return keypoints
    }

    const [buttonLabel, setButtonLabel] = useState('Button Label Placeholder')

    function handleInputsChange(){
        const trimmedHeader = headerRef.current?.value.trim()
        const trimmedContent = contentRef.current?.value.trim()

        if(headerRef.current?.value === '') {
            setHeader('Placeholder Header')
        } else {
            setHeader(trimmedHeader)
        }
        
        if(contentRef.current?.value === "") {
            setContent(defaultInputString)
        } else {
            setContent(trimmedContent)
        }
    }

    const FormattedListItem = (originalString, idx) => {
        let trimmedString = originalString.trim();

        function extractKeyPoints(inputString) {
            const regex = /<k>(.*?)<\/k>/g;
            const keypoints = [];
            let match;
            while ((match = regex.exec(inputString)) !== null) {
                keypoints.push(match[1].trim());
            }
        }

        extractKeyPoints(trimmedString)

        const formatStringToHTML = (str) => {
            const formattedStr = str.replace(/#(\*\*\*)/g, '<b>');
            const finalStr = formattedStr.replace(/(\*\*\*)#/g, '</b>');

            // Wrap the entire string in <p> tags
            return <li key={idx} className="keypoint" dangerouslySetInnerHTML={{ __html: finalStr }} />;
        };

        return formatStringToHTML(trimmedString);
    };

    // A function to capitalize the first letter of each word in a string
    String.prototype.capitalize = function() {  
        return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    async function printKeyPointsHTML(){
        const formatStringToHTML = (str) => {
            const formattedStr = str.replace(/#(\*\*\*)/g, '<span class="bold">');
            const finalStr = formattedStr.replace(/(\*\*\*)#/g, '</span>');

            // Wrap the entire string in <p> tags
            return `${finalStr}`;
        };

        const getListItemsString = () => {
            let string = ""
            getKeypoints().forEach(keypoint => {
                string += `<li class="keypoint">${formatStringToHTML(keypoint)}</li> \n`
            })

            return string
        }

        let htmlString = `
        <!-- THIS IS A CUSTOM COMPONENT -->
        <!-- KEYPOINTS LIST -->
        <div class="keyPointsBlock">
            <div class="keyPointsText">
                <h2>
                ${header}
                </h2>
                <ul class="keypoints_list">
                    ${getListItemsString()}
                </ul>
            </div>
        </div>
        `

        // Copy the HTML code to the clipboard
        try {
            await navigator.clipboard.writeText(htmlString)
            console.log("Copied to clipboard");
            alert("Copied to clipboard")
        } catch (error) {
            console.error(error.message);
        }

        console.log(htmlString)
    }

    // An effect to run when the component mounts
    // useEffect(() => {
    //     // Set the header input value to 'Keypoints'
    //     handleInputsChange()
    // }, [])

    return (
        <div
            style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            width: '1000px',
            margin: '0 auto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '400px',
                    margin: '0 auto',
                    paddingRight: '5rem',
                    textAlign: 'left',
                }}
            >
                {/* Inputs */}
                <label htmlFor="keypoints_header">Header</label>
                <textarea 
                    style={{
                    height: '60px',
                    width: '100%',
                    resize: 'none',
                    }}
                    id="keypoints_header" type="text" placeholder="Type here" 
                    ref={headerRef} 
                    onChange={() => handleInputsChange()}
                />

                <label htmlFor="keypoints_content">Content</label>
                <div
                    style={{
                    fontSize: '0.8rem',
                    color: '#666',
                    marginBottom: '0.5rem',
                    textAlign: 'left',
                    backgroundColor: '#eee',
                    padding: '0.5rem',
                    }}
                >
                    <p>Use the following format to add key points:</p>

                    <p>
                    &lt;k&gt;Key point goes here&lt;/k&gt;
                    </p>
                    <p>
                    &lt;k&gt;Another key point goes here&lt;/k&gt;
                    </p>

                    <p>
                    <b>Example:</b>
                    </p>
                    <p>
                    &lt;k&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio vitae eros ultricies aliquam. #***Donec euismod, nisl eget aliqu am aliquet***#, nunc nisl aliquam nunc, quis aliquam nisl nunc eu nisl.&lt;/k&gt;
                    </p>

                    <p>
                    &lt;k&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio vitae eros ultricies aliquam. #***Donec euismod, nisl eget aliqu am aliquet***#, nunc nisl aliquam nunc, quis aliquam nisl nunc eu nisl.&lt;/k&gt;
                    </p>
                </div>
                <textarea 
                    style={{
                    height: '200px',
                    width: '100%',
                    resize: 'none',
                    }}
                    id="keypoints_content" type="textArea"
                    ref={contentRef}
                    onChange={() => handleInputsChange()}
                    placeholder={"Type your list of key points here. \n"}
                />
            </div>

            <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '600px',
                margin: '0 auto',
            }}
            >

            <div
                className='keyPointsBlock'
            >
                <div className='keyPointsText'>
                <h2>{header}</h2>
                <ul
                    className='keypoints_list'
                >
                    {getKeypoints().map((keypoint, index) => (
                        FormattedListItem(keypoint, index)
                        // <li key={index} className="keypoint">
                        //     {keypoint}
                        // </li>
                    ))}
                </ul>
                </div>
            </div>
            <button 
                className="copy_cta_html"
                style={{
                    marginTop: "30px",
                    backgroundColor: '#00bfa6',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    height: 'fit-content',
                    width: 'fit-content',
                    color: "white !important",
                }}
            
            onClick={() => printKeyPointsHTML()}>
                Copy Block HTML
            </button>
            </div>

        </div>
    )
}

export default KeyPointsBlock