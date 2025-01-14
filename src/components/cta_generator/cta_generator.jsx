import React, {useRef, useState} from 'react'
import './styles.css'

function CTA_Generator() {
    const headerRef = useRef()
    const contentRef = useRef()
    const buttonLabelRef = useRef()
    const ctaIdRef = useRef()

    // state variables for the CTA block
    const [header, setHeader] = useState('This is a #***header***# placeholder')
    const [content, setContent] = useState('')
    const [buttonLabel, setButtonLabel] = useState('Button Label Placeholder')

    function handleInputsChange(){
        setHeader(headerRef.current?.value)
        setContent(contentRef.current?.value)
        setButtonLabel(buttonLabelRef.current?.value)

        if(headerRef.current?.value === '') setHeader('This is a #***header***# placeholder')
        if(buttonLabelRef.current?.value === '') setButtonLabel('Button Label Placeholder')
    }

    // A function to capitalize the first letter of each word in a string
    String.prototype.capitalize = function() {  
        return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    const formatHeaderToHTML = (headerString) => {
        if (!headerString) return "This is a #***header***# placeholder";
    
        // Replace bold markers with HTML span tags
        const formattedHeader = headerString.replace(/#\*\*\*(.*?)\*\*\*#/g, (match, p1) => {
            return `<span class="gradientText">${p1}</span>`;
        });
    
        return formattedHeader;
    };

    const formatContentToHTML = (contentString) => {
        if (!contentString) return "Content Placeholder";
    
        // Replace bold markers with HTML span tags
        const formattedContent = contentString.replace(/#\*\*\*(.*?)\*\*\*#/g, (match, p1) => {
            return `<span class="bold">${p1}</span>`;
        });
    
        return formattedContent;
    }

    const targetUrlWithRefParameters = (url) => {
        // Add two query parameters to the URL: 'ref' and 'ctaId'
        // Check if the URL already has a query string
        const separator = url.includes('?') ? '&' : '?';
        const refParameter = 'ref=inlineCtaButton';
        const ctaIdParameter = `ctaId=${ctaIdRef.current?.value}`;

        return `${url}${separator}${refParameter}&${ctaIdParameter}`;
    }

    let baseHtmlString = `
    <!-- THIS IS A CUSTOM CTA -->
    <div class="ctaBox">
        <div class="ctaText">
            <h2>
            ${formatHeaderToHTML(header)}
            </h2>

            <p>
                ${formatContentToHTML(content)}
            </p>

            <div class="ctaButtoncontainer">
                <a href="${targetUrlWithRefParameters("/get-started/")}" class="greenCtaButton">
                    ${buttonLabel}
                </a>
            </div>
        </div>
    </div>
    `

    function getHtmlString(){
let htmlString = `
<!-- THIS IS A CUSTOM CTA -->
<div class="ctaBox">
    <div class="ctaText">
        <h2>
        ${formatHeaderToHTML(header)}
        </h2>

        <p>
        ${formatContentToHTML(content)}
        </p>

        <div class="ctaButtoncontainer">
            <a href="${targetUrlWithRefParameters("/get-started/")}" class="greenCtaButton">
                ${buttonLabel}
            </a>
        </div>
    </div>
</div>
`
        return htmlString
    }

    async function copyStringToClipboard(string){
        // Copy the HTML code to the clipboard
        try {
            await navigator.clipboard.writeText(string)
            alert("Copied to clipboard")

        } catch (error) {
            console.error(error.message);
            alert("Failed to copy to clipboard")
        }
    }

    async function copyCtaHtmlToClipboard(){
        const htmlString = getHtmlString()
        await copyStringToClipboard(htmlString)
    }

    const FormattedHeader = (originalString) => {
        if(!originalString) originalString = "This is a #***header***# placeholder"

        const formatStringToHTML = (str) => {
            // Replace bold markers with HTML span tags
            const formattedStr = str.replace(/#\*\*\*(.*?)\*\*\*#/g, (match, p1) => {
                return `<span class="gradientText">${p1}</span>`;
            });

            return formattedStr;
        };

        return (
            <h2 dangerouslySetInnerHTML={{ __html: formatStringToHTML(originalString) }} />
        );
    }

    const FormattedContent = (originalString) => {
        if(!originalString) originalString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio vitae eros ultricies aliquam. #***Donec euismod, nisl eget aliquam aliquet***#, nunc nisl aliquam nunc, quis aliquam nisl nunc eu nisl."

        const formatStringToHTML = (str) => {
            // Wrap the entire string in <p> tags
            return <p dangerouslySetInnerHTML={{ 
                __html: formatContentToHTML(
                    str
                )
            }} />;
        }

        return (
            <div>
                {formatStringToHTML(originalString)}
            </div>
        );
    }

    return (
        <div
            style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            width: "fit-content",
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

                <label htmlFor="cta_button_label">Button Label</label>
                <input id="cta_button_label" type="text" 
                    ref={buttonLabelRef}
                    onChange={() => handleInputsChange()}
                />

                {/* An input for the ctaId */}
                <label htmlFor="cta_id">CTA ID</label>

                {/* An example of ctaId */}
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
                    <>
                        This is the ID of the CTA. It is used to track the performance of the custom inline CTA. Make sure to use a unique ID for each CTA and use a meaningful name for the ID.
                    </>
                    <br></br>
                    <br></br>
                    <>
                    
                    <span style={{fontWeight:"600"}}>Example: completeGuideToSccCta</span> 
                    </>
                </div>

                <input id="cta_id" type="text" 
                    ref={ctaIdRef}
                    onChange={() => handleInputsChange()}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '690px',
                    margin: '0 auto',
                    paddingRight: '5rem',
                    textAlign: 'left',
                }}
            >
                <div
                    style={{
                        width: '690px !important',
                    }}
                >
                    {/* A preview of the CTA block */}
                    <div
                        className='ctaBox'
                    >
                        <div className='ctaText'>
                        
                        {FormattedHeader(header)}
                        
                        {FormattedContent(content)}
                    
                        <div className='ctaButtoncontainer'>
                            <a 
                                className='greenCtaButton'
                                href={targetUrlWithRefParameters("https://appinchina.co/get-started/")}
                            >
                            {
                                buttonLabel
                            }
                            </a>
                        </div>
                        </div>
                    </div>
                    
                </div>

                {/* A text area displaying the generated HTML */}
                <div
                    style={{
                        width: '690px',
                        marginTop: "32px",
                    }}
                >
                    <div 
                        htmlFor="cta_html"
                        style={{
                            marginBottom: "12px",
                        }}
                    >Generated HTML</div>
                    <textarea 
                        style={{
                        height: '200px',
                        width: "660px",
                        resize: 'none',
                        padding: '15px',
                        }}
                        id="cta_html" type="textArea" 
                        value={getHtmlString()}
                    />

                    <button 
                        className="copy_cta_html"
                        style={{
                        marginTop: "30px",
                        backgroundColor: "#2f322a",
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        height: 'fit-content',
                        width: 'fit-content',
                        color: "white !important",
                        }}
                    
                    onClick={() => copyCtaHtmlToClipboard()}>
                        Copy CTA HTML
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CTA_Generator