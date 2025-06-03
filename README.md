# CTA + Key Points Generator

A React-based web application that provides tools for creating and managing content components for web pages. This project includes three main tools:

1. **CTA Generator**: Create customizable call-to-action blocks with:
   - Gradient text headers
   - Formatted content with bold text
   - Customizable button labels
   - Automatic URL parameter handling

2. **Key Points Block Generator**: Generate formatted key points sections with:
   - Custom headers
   - Bullet points with bold text formatting
   - Easy-to-use text formatting syntax

3. **Image Uploader**: Process and optimize images with:
   - Custom target height and width settings
   - Quality control
   - Automatic folder organization
   - S3 URL generation

## Technical Stack

- React 18
- Vite
- Node.js (v18.20.4 or above)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Features

- Hot Module Replacement (HMR)
- ESLint configuration
- GitHub Pages deployment workflow
- Modern UI with responsive design

## Available Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Uses Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Uses SWC for Fast Refresh