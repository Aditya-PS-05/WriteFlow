# WriteFlow

A modern, lightweight text editor built as an alternative to WordPad. WriteFlow provides essential text formatting features with a clean, distraction-free interface and PDF export capabilities.

## Features

- 📝 Rich Text Editing
  - Basic formatting (bold, italic, underline)
  - Text alignment
  - Clean, minimal interface
  
- 💾 File Management
  - Auto-save to localStorage
  - Save/Load HTML files
  - Export to PDF with pagination
  
- 🎨 User Experience
  - Dark/Light mode
  - Word count & reading time
  - Distraction-free writing environment
  
- 🚀 Performance
  - Fast and responsive
  - Lightweight
  - No external dependencies for core functionality

## Tech Stack

- Next.js 14
- TypeScript
- TipTap Editor
- Tailwind CSS
- Lucide Icons
- jsPDF (for PDF export)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Aditya_SP-05/writeflow.git
cd writeflow
```

2. Install dependencies and run the project

```bash
npm install
```

3. tart development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

# Desktop Application

To run WriteFlow as a desktop application:

1. Install additional dependencies:

```bash
npm install --save-dev @tauri-apps/cli
npm install @tauri-apps/api
```

2. Run the desktop app in development:

```bash
npm run tauri dev
```

3. Build the desktop application:

```bash
npm run tauri build
```

## Project Structure
```
writeflow/
├── app/
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── Editor.tsx
│ └── pdfExport.ts
├── utils/
│ └── pdfExport.ts
├── public/
├── tailwind.config.ts
└── package.json
```


## Key Components

### Editor.tsx
The main editor component that handles:
- Text formatting
- File operations
- Dark mode
- Word count
- Auto-save functionality

### pdfExport.ts
Handles PDF generation with:
- Proper pagination
- Margin handling
- Content formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TipTap](https://tiptap.dev/) for the rich text editor
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation

## Roadmap

- [ ] Cloud sync support
- [ ] Collaborative editing
- [ ] More export formats
- [ ] Custom themes
- [ ] Keyboard shortcuts
- [ ] Spell checker
- [ ] Find and replace
- [ ] Table support

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
