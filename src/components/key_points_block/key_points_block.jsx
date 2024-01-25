import React, {useRef, useState} from 'react'
import './styles.css'

function KeyPointsBlock() {
    const headerRef = useRef()
    // headerRef.current.value = 'Keypoints'

    const contentRef = useRef()

    // state variables for the CTA block
    const [header, setHeader] = useState('Keypoints')
    const [content, setContent] = useState("")
    // const [keypoints, setKeypoints] = useState([])
    function getKeypoints(){
        const formatStringToHTML = (str) => {
            const formattedStr = str.replace(/#(\*\*\*)/g, '<span class="bold">');
            const finalStr = formattedStr.replace(/(\*\*\*)#/g, '</span>');

            // Wrap the entire string in <p> tags
            return `${finalStr}`;
        };

        const str = contentRef.current?.value
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
        setHeader(headerRef.current?.value)
        setContent(contentRef.current?.value)
        setButtonLabel(buttonLabelRef.current?.value)

        if(headerRef.current?.value === '') setHeader('Keypoints')
        if(buttonLabelRef.current?.value === '') setButtonLabel('Button Label Placeholder')
    }

    const FormattedListItem = (originalString, idx) => {

        if(!originalString) originalString = "<k>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio vitae eros ultricies aliquam. #***Donec euismod, nisl eget aliquam aliquet***#, nunc nisl aliquam nunc, quis aliquam nisl nunc eu nisl.</k>"

        function extractKeyPoints(inputString) {
            const regex = /<k>(.*?)<\/k>/g;
            const keypoints = [];
            let match;
            while ((match = regex.exec(inputString)) !== null) {
                keypoints.push(match[1].trim());
            }
        }

        extractKeyPoints(originalString)

        const formatStringToHTML = (str) => {
            const formattedStr = str.replace(/#(\*\*\*)/g, '<b>');
            const finalStr = formattedStr.replace(/(\*\*\*)#/g, '</b>');

            // Wrap the entire string in <p> tags
            return <li key={idx} className="keypoint" dangerouslySetInnerHTML={{ __html: finalStr }} />;
        };

        return formatStringToHTML(originalString);
        // return (<div>Empty</div>)
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
                <label htmlFor="cta_header">Header</label>
                <textarea 
                    style={{
                    height: '60px',
                    width: '100%',
                    resize: 'none',
                    }}
                    id="cta_header" type="text" placeholder="Type here" 
                    ref={headerRef} 
                    onChange={() => handleInputsChange()}
                />

                <label htmlFor="cta_content">Content</label>
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
                    <>You can add bold text by using the markers "#***" and "***#". </>
                    <br></br>
                    <br></br>
                    <>
                    <span style={{fontWeight:"600"}}>Example:</span> 
                    <br></br>
                    This is a short example with a #***bold***# text.
                    </>
                </div>
                <textarea 
                    style={{
                    height: '200px',
                    width: '100%',
                    resize: 'none',
                    }}
                    id="cta_content" type="textArea" placeholder="Type here" 
                    ref={contentRef}
                    onChange={() => handleInputsChange()}
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
            {/* A preview of the CTA block */}
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
                Copy CTA HTML
            </button>
            </div>

        </div>
    )
}

export default KeyPointsBlock