import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CTA_Generator from './components/cta_generator/cta_generator'
import KeyPointsBlock from './components/key_points_block/key_points_block'
import ImageUploader from './components/image_uploader/image_uploader'

function App() {

  const [selectedTool, setSelectedTool] = useState('cta_generator')

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          margin: '0 auto',
          alignItems: "flex-start",
          marginBottom: "30px",
        }}
      >
        <div 
          className={`NavOption ${selectedTool === 'cta_generator' && 'selected'}`}
          onClick={() => setSelectedTool('cta_generator')}
        >Custom CTA</div>
        <div 
          className={`NavOption ${selectedTool === 'key_points_block' && 'selected'}`}
          onClick={() => setSelectedTool('key_points_block')}
        >Key Points Block</div>
        <div 
          className={`NavOption ${selectedTool === 'image_uploader' && 'selected'}`}
          onClick={() => setSelectedTool('image_uploader')}
        >Image Uploader</div>
      </div>
      {selectedTool === 'cta_generator' && <CTA_Generator />}
      {selectedTool === 'key_points_block' && <KeyPointsBlock />}
      {selectedTool === 'image_uploader' && <ImageUploader />}
    </>
  )
}

export default App
