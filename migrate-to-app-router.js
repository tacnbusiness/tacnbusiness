const fs = require('fs');
const path = require('path');

// Define the root directory of your project
const projectRoot = process.cwd();
const pagesDir = path.join(projectRoot, 'pages');
const appDir = path.join(projectRoot, 'app');

// Function to create the app directory if it doesn't exist
function createAppDirectory() {
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir);
    console.log('Created app directory.');
  }
}

// Function to create a basic layout.tsx file
function createLayoutFile() {
  const layoutPath = path.join(appDir, 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    const layoutContent = `import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
    fs.writeFileSync(layoutPath, layoutContent, 'utf8');
    console.log('Created layout.tsx file.');
  }
}

// Function to recursively move files from pages to app directory
function movePagesToApp(dir, relativePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const entryPath = path.join(dir, entry.name);
    const entryRelativePath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      movePagesToApp(entryPath, entryRelativePath);
    } else if (entry.isFile()) {
      // Determine new path in app directory
      let newDir = path.join(appDir, relativePath);
      let newFileName = 'page.tsx';

      // Handle special files
      if (entry.name === '_app.tsx' || entry.name === '_app.js') {
        // Skip _app files as layout.tsx will replace them
        return;
      } else if (entry.name === '_document.tsx' || entry.name === '_document.js') {
        // Skip _document files as layout.tsx will replace them
        return;
      } else if (entry.name === 'index.tsx' || entry.name === 'index.js') {
        // index files become page.tsx in the current directory
        newDir = path.join(appDir, relativePath);
      } else {
        // Other files become page.tsx inside a new directory named after the file (without extension)
        const baseName = path.parse(entry.name).name;
        newDir = path.join(appDir, relativePath, baseName);
      }

      // Create new directory if it doesn't exist
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }

      // Read the original file content
      const content = fs.readFileSync(entryPath, 'utf8');

      // Write the content to the new file
      const newFilePath = path.join(newDir, newFileName);
      fs.writeFileSync(newFilePath, content, 'utf8');
      console.log(`Moved ${entryRelativePath} to ${path.relative(projectRoot, newFilePath)}`);
    }
  });
}

// Execute the migration
function migrate() {
  if (!fs.existsSync(pagesDir)) {
    console.error('No pages directory found. Make sure you are in the root of a Next.js project.');
    return;
  }

  createAppDirectory();
  createLayoutFile();
  movePagesToApp(pagesDir);
  console.log('Migration completed.');
}

migrate();
