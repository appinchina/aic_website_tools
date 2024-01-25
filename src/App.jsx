import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  // ref for the input elements
  const headerRef = useRef()
  const contentRef = useRef()
  const buttonLabelRef = useRef()

  // state variables for the CTA block
  const [header, setHeader] = useState('Header Placeholder')
  const [content, setContent] = useState('')
  const [buttonLabel, setButtonLabel] = useState('Button Label Placeholder')

  function handleInputsChange(){
    setHeader(headerRef.current?.value)
    setContent(contentRef.current?.value)
    setButtonLabel(buttonLabelRef.current?.value)

    if(headerRef.current?.value === '') setHeader('Header Placeholder')
    if(buttonLabelRef.current?.value === '') setButtonLabel('Button Label Placeholder')
  }

  

  const FormattedTextComponent = (originalString) => {

      if(!originalString) originalString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio vitae eros ultricies aliquam. #***Donec euismod, nisl eget aliquam aliquet***#, nunc nisl aliquam nunc, quis aliquam nisl nunc eu nisl."

      const formatStringToHTML = (str) => {
          const formattedStr = str.replace(/#(\*\*\*)/g, '<b>');
          const finalStr = formattedStr.replace(/(\*\*\*)#/g, '</b>');

          // Wrap the entire string in <p> tags
          return <p dangerouslySetInnerHTML={{ __html: finalStr }} />;
      };

      return (
          <div>
              {formatStringToHTML(originalString)}
          </div>
      );
  };

  // A function to capitalize the first letter of each word in a string
  String.prototype.capitalize = function() {  
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  }

  // A function to print the HTML code of the CTA block
  // This is an example:
  // <div class="ctaBox">
  // <div class="ctaText">
  //   <h2>
  //     Unlock Your Game's Potential in China - 
  //     <span class="gradientText">
  //       Secure a FREE Consultation with Our Sales Team!
  //     </span>
  //   </h2>
  //     Schedule a call with our legal counsel to receive a <b>free customized report</b> confirming the licenses and operational steps that will be needed to publish your mobile app in China.
  //   <br></br>
  //   <div class="ctaButtoncontainer">
  //     <a class="greenCtaButton">
  //       Book Your Free Call
  //     </a>
  //   </div>
  // </div>

  async function printCTAHTML(){
    const formatStringToHTML = (str) => {
      const formattedStr = str.replace(/#(\*\*\*)/g, '<b>');
      const finalStr = formattedStr.replace(/(\*\*\*)#/g, '</b>');

      // Wrap the entire string in <p> tags
      return `<p  ${finalStr}/>`;
    };

    let htmlString = `
    <!-- THIS IS A CUSTOM CTA -->
    <div class="ctaBox">
      <div class="ctaText">
        <h2>
          ${header}
        </h2>
          ${formatStringToHTML(content)}
        <br></br>
        <div class="ctaButtoncontainer">
          <a href="/get-started/?ref=inline-cta-button" class="greenCtaButton">
            ${buttonLabel}
          </a>
        </div>
      </div>
    </div>
    `

    // Copy the HTML code to the clipboard
    try {
      await navigator.clipboard.writeText(htmlString)
      console.log("Copied to clipboard");

    } catch (error) {
      console.error(error.message);
    }
    // alert('The HTML code has been copied to the clipboard!')
    console.log(htmlString)
  }

  async function writeClipboardText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1> */}

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

          <label htmlFor="cta_button_label">Button Label</label>
          <input id="cta_button_label" type="text" 
            ref={buttonLabelRef}
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
            className='ctaBox'
          >
            <div className='ctaText'>
              <h2>
                {
                  header
                }
              </h2>
              {
                FormattedTextComponent(content)
              }
              <div className='ctaButtoncontainer'>
                <a className='greenCtaButton'>
                  {
                    buttonLabel
                  }
                </a>
              </div>
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
          
          onClick={() => printCTAHTML()}>
            Copy CTA HTML
          </button>
        </div>

      </div>

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
