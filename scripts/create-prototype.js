#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function choice(prompt, options) {
  return new Promise(async (resolve) => {
    console.log(`\n${prompt}`);
    options.forEach((opt, idx) => {
      console.log(`  ${idx + 1}. ${opt.label}${opt.description ? ` - ${opt.description}` : ''}`);
    });

    let answer;
    do {
      answer = await question(`Choose (1-${options.length}): `);
      answer = parseInt(answer);
    } while (isNaN(answer) || answer < 1 || answer > options.length);

    resolve(options[answer - 1].value);
  });
}

async function multiChoice(prompt, options) {
  console.log(`\n${prompt} (comma-separated numbers, e.g., 1,3,4)`);
  options.forEach((opt, idx) => {
    console.log(`  ${idx + 1}. ${opt.label}${opt.description ? ` - ${opt.description}` : ''}`);
  });

  const answer = await question(`Choose (1-${options.length}): `);
  const selected = answer.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 1 && n <= options.length);

  return selected.map(idx => options[idx - 1].value);
}

function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(filePath, content) {
  createDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function generatePackageJson(name, features, deployment) {
  const dependencies = {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  };

  const devDependencies = {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.4.2",
    "vite": "^4.3.9",
    "@vitejs/plugin-react": "^3.1.0",
    "tailwindcss": "^3.4.8",
    "postcss": "^8.4.23",
    "autoprefixer": "^10.4.14"
  };

  const scripts = {
    "dev": "vite",
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview"
  };

  // Add component library dependencies
  if (features.componentLib === 'shadcn') {
    dependencies["class-variance-authority"] = "^0.7.0";
    dependencies["clsx"] = "^2.0.0";
    dependencies["tailwind-merge"] = "^2.0.0";
    dependencies["lucide-react"] = "^0.268.0";
  } else if (features.componentLib === 'mui') {
    dependencies["@mui/material"] = "^5.14.0";
    dependencies["@emotion/react"] = "^11.11.0";
    dependencies["@emotion/styled"] = "^11.11.0";
  } else if (features.componentLib === 'headless') {
    dependencies["@headlessui/react"] = "^1.7.0";
    dependencies["lucide-react"] = "^0.268.0";
  }

  // Add routing
  if (features.routing) {
    dependencies["react-router-dom"] = "^6.14.0";
  }

  // Add mock data utilities
  if (features.mockData) {
    devDependencies["@faker-js/faker"] = "^8.0.0";
  }

  // Add deployment scripts
  if (deployment.includes('vercel')) {
    devDependencies["vercel"] = "latest";
    scripts["deploy:vercel"] = "vercel --prod";
  }
  if (deployment.includes('netlify')) {
    devDependencies["netlify-cli"] = "latest";
    scripts["deploy:netlify"] = "netlify deploy --prod";
  }

  return {
    name,
    version: "0.1.0",
    private: true,
    scripts,
    dependencies,
    devDependencies
  };
}

function generateViteConfig(features) {
  return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../../shared'),
    },
  },
})
`;
}

function generateTsConfig() {
  return `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../../shared/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`;
}

function generateTsConfigNode() {
  return `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`;
}

function generateTailwindConfig(features) {
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
}

function generatePostCssConfig() {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
}

function generateIndexHtml(name) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

function generateMainTsx(features) {
  let imports = `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.tsx'\nimport './index.css'\n`;

  if (features.routing) {
    imports += `import { BrowserRouter } from 'react-router-dom'\n`;
  }

  let render = `ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>`;

  if (features.routing) {
    render += `\n    <BrowserRouter>\n      <App />\n    </BrowserRouter>`;
  } else {
    render += `\n    <App />`;
  }

  render += `\n  </React.StrictMode>,
)\n`;

  return imports + '\n' + render;
}

function generateAppTsx(features) {
  let imports = `import { useState } from 'react'\n`;

  if (features.routing) {
    imports += `import { Routes, Route, Link } from 'react-router-dom'\n`;
  }

  if (features.mockData) {
    imports += `import { generateMockData } from './utils/mockData'\n`;
  }

  let component = `\nfunction App() {
  const [count, setCount] = useState(0)
`;

  if (features.mockData) {
    component += `  const mockData = generateMockData()\n`;
  }

  component += `\n  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            ${features.routing ? 'Prototype with Routing' : 'Prototype'}
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4">
`;

  if (features.routing) {
    component += `        <nav className="mb-6 space-x-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <Link to="/about" className="text-blue-600 hover:text-blue-800">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage count={count} setCount={setCount} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
`;
  } else {
    component += `        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
          <p className="text-gray-600 mb-4">Your prototype is ready.</p>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Count: {count}
          </button>${features.mockData ? '\n          <div className="mt-4">\n            <h3 className="font-semibold">Mock Data:</h3>\n            <pre className="text-sm bg-gray-50 p-2 mt-2 rounded">{JSON.stringify(mockData, null, 2)}</pre>\n          </div>' : ''}
        </div>
`;
  }

  component += `      </main>
    </div>
  )
}

`;

  if (features.routing) {
    component += `function HomePage({ count, setCount }: { count: number; setCount: (n: number) => void }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Home Page</h2>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Count: {count}
      </button>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">About Page</h2>
      <p className="text-gray-600">This is a prototype built with the Prototype Builder.</p>
    </div>
  )
}

`;
  }

  component += `export default App\n`;

  return imports + component;
}

function generateIndexCss() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}
`;
}

function generateMockDataUtil() {
  return `import { faker } from '@faker-js/faker'

export function generateMockData() {
  return {
    user: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    },
    items: Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    })),
  }
}

export function generateMockUsers(count: number = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(['admin', 'user', 'guest']),
  }))
}
`;
}

function generateDockerfile() {
  return `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
`;
}

function generateReadme(name, features, deployment) {
  let content = `# ${name}

A UI/UX prototype created with Prototype Builder.

## Features

- React 18 + TypeScript
- Vite for fast development
- Tailwind CSS for styling
`;

  if (features.componentLib === 'shadcn') {
    content += '- shadcn/ui component library\n';
  } else if (features.componentLib === 'mui') {
    content += '- Material-UI component library\n';
  } else if (features.componentLib === 'headless') {
    content += '- Headless UI components\n';
  }

  if (features.routing) {
    content += '- React Router for navigation\n';
  }

  if (features.mockData) {
    content += '- Faker.js for mock data generation\n';
  }

  content += `\n## Development

\`\`\`bash
npm install
npm start
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

\`\`\`bash
npm run build
npm run preview
\`\`\`

`;

  if (deployment.includes('vercel')) {
    content += `## Deploy to Vercel

\`\`\`bash
npm run deploy:vercel
\`\`\`

`;
  }

  if (deployment.includes('netlify')) {
    content += `## Deploy to Netlify

\`\`\`bash
npm run deploy:netlify
\`\`\`

`;
  }

  if (deployment.includes('docker')) {
    content += `## Docker

\`\`\`bash
docker build -t ${name} .
docker run -p 4173:4173 ${name}
\`\`\`

`;
  }

  content += `## Shared Resources

This prototype can use shared components and utilities from \`../../shared/\`:

\`\`\`typescript
import { Button } from '@shared/components/Button'
import { api } from '@shared/libs/api'
\`\`\`
`;

  return content;
}

async function main() {
  console.log('🎨 Prototype Builder - Interactive Mode\n');

  // Get prototype name
  const name = await question('Prototype name: ');
  if (!name || !name.trim()) {
    console.error('❌ Error: Prototype name cannot be empty');
    process.exit(1);
  }

  const prototypePath = path.join(__dirname, '..', 'prototypes', name.trim());
  if (fs.existsSync(prototypePath)) {
    console.error(`❌ Error: Prototype "${name}" already exists`);
    process.exit(1);
  }

  // Feature selection
  const componentLib = await choice('Choose a component library:', [
    { label: 'None', value: 'none', description: 'Minimal setup' },
    { label: 'shadcn/ui', value: 'shadcn', description: 'Modern, accessible components' },
    { label: 'Material-UI', value: 'mui', description: 'Google Material Design' },
    { label: 'Headless UI', value: 'headless', description: 'Unstyled, accessible components' },
  ]);

  const routing = await choice('Add routing?', [
    { label: 'No', value: false },
    { label: 'Yes (React Router)', value: true },
  ]);

  const mockData = await choice('Add mock data utilities?', [
    { label: 'No', value: false },
    { label: 'Yes (Faker.js)', value: true },
  ]);

  // Deployment options
  const deploymentOptions = await multiChoice('Choose deployment options:', [
    { label: 'Local only', value: 'local' },
    { label: 'Vercel', value: 'vercel' },
    { label: 'Netlify', value: 'netlify' },
    { label: 'Docker', value: 'docker' },
  ]);

  const features = {
    componentLib,
    routing,
    mockData,
  };

  console.log('\n📦 Creating prototype...\n');

  try {
    // Create directories
    createDirectory(path.join(prototypePath, 'src'));
    if (mockData) {
      createDirectory(path.join(prototypePath, 'src', 'utils'));
    }

    // Generate files
    writeFile(
      path.join(prototypePath, 'package.json'),
      JSON.stringify(generatePackageJson(name, features, deploymentOptions), null, 2) + '\n'
    );

    writeFile(path.join(prototypePath, 'vite.config.ts'), generateViteConfig(features));
    writeFile(path.join(prototypePath, 'tsconfig.json'), generateTsConfig());
    writeFile(path.join(prototypePath, 'tsconfig.node.json'), generateTsConfigNode());
    writeFile(path.join(prototypePath, 'tailwind.config.js'), generateTailwindConfig(features));
    writeFile(path.join(prototypePath, 'postcss.config.js'), generatePostCssConfig());
    writeFile(path.join(prototypePath, 'index.html'), generateIndexHtml(name));
    writeFile(path.join(prototypePath, 'src', 'main.tsx'), generateMainTsx(features));
    writeFile(path.join(prototypePath, 'src', 'App.tsx'), generateAppTsx(features));
    writeFile(path.join(prototypePath, 'src', 'index.css'), generateIndexCss());
    writeFile(path.join(prototypePath, 'README.md'), generateReadme(name, features, deploymentOptions));

    if (mockData) {
      writeFile(
        path.join(prototypePath, 'src', 'utils', 'mockData.ts'),
        generateMockDataUtil()
      );
    }

    if (deploymentOptions.includes('docker')) {
      writeFile(path.join(prototypePath, 'Dockerfile'), generateDockerfile());
    }

    // Create .gitignore
    writeFile(
      path.join(prototypePath, '.gitignore'),
      `node_modules
dist
.DS_Store
*.local
`
    );

    console.log('✅ Prototype created successfully!\n');
    console.log('Next steps:');
    console.log(`  1. cd prototypes/${name}`);
    console.log('  2. npm install');
    console.log('  3. npm start\n');

    console.log('📚 Documentation: docs/commands.md\n');
  } catch (error) {
    console.error('❌ Error creating prototype:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
