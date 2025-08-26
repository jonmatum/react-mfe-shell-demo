#!/usr/bin/env node

/**
 * Smart Tailwind CSS Safelist Generator
 * Generates different levels of safelist based on your needs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Configuration for different safelist levels
const SAFELIST_LEVELS = {
  minimal: 'Only classes found in source code + essential MFE Shell classes',
  standard: 'Common patterns + responsive variants + state variants',
  comprehensive: 'Full color palette + all size variants + all responsive breakpoints'
};

function scanSourceCode() {
  const classes = new Set();
  
  function scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Match className patterns
      const patterns = [
        /className\s*=\s*["'`]([^"'`]+)["'`]/g,
        /className\s*=\s*{[^}]*["'`]([^"'`]+)["'`][^}]*}/g,
        /class\s*=\s*["'`]([^"'`]+)["'`]/g
      ];
      
      patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const classList = match[1].split(/\s+/).filter(cls => cls.trim());
          classList.forEach(cls => classes.add(cls));
        }
      });
      
    } catch (error) {
      console.warn(`Warning: Could not read file ${filePath}`);
    }
  }
  
  function walkDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          walkDirectory(fullPath);
        } else if (stat.isFile() && /\.(tsx?|jsx?)$/.test(item)) {
          scanFile(fullPath);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dir}`);
    }
  }
  
  walkDirectory(path.join(projectRoot, 'src'));
  return Array.from(classes);
}

function generateMinimalSafelist() {
  const sourceClasses = scanSourceCode();
  
  // Essential MFE Shell classes that might not be detected
  const essentialClasses = [
    // Custom component classes
    'task-card', 'btn-enhanced',
    
    // Color classes used in the app
    'text-primary-600', 'text-success-600', 'text-warning-600', 'text-danger-600',
    'bg-primary-100', 'bg-success-100', 'bg-warning-100', 'bg-danger-100',
    'bg-background-primary', 'bg-surface-primary', 'bg-surface-secondary',
    'text-text-primary', 'text-text-secondary', 'text-text-tertiary',
    'border-border-primary',
    
    // Interactive states
    'hover:shadow-lg', 'hover:bg-surface-secondary', 'active:scale-95',
    'focus:outline-none', 'focus:ring-2', 'focus:ring-primary-500',
    'disabled:opacity-50', 'disabled:cursor-not-allowed',
    
    // Common utilities
    'transition-all', 'duration-200', 'ease-in-out',
    'capitalize', 'truncate', 'cursor-pointer'
  ];
  
  return [...new Set([...sourceClasses, ...essentialClasses])].sort();
}

function generateStandardSafelist() {
  const minimalClasses = generateMinimalSafelist();
  
  // Common patterns with variants
  const standardPatterns = [
    // Color variants (most common shades)
    ...['primary', 'success', 'warning', 'danger'].flatMap(color =>
      ['50', '100', '500', '600'].flatMap(shade => [
        `text-${color}-${shade}`,
        `bg-${color}-${shade}`,
        `border-${color}-${shade}`,
        `hover:bg-${color}-${shade}`,
        `focus:ring-${color}-${shade}`,
        `dark:text-${color}-${shade}`,
        `dark:bg-${color}-${shade}`
      ])
    ),
    
    // Semantic colors
    ...['background', 'surface', 'text', 'border'].flatMap(type =>
      ['primary', 'secondary', 'tertiary'].flatMap(shade => [
        `text-${type}-${shade}`,
        `bg-${type}-${shade}`,
        `border-${type}-${shade}`,
        `hover:bg-${type}-${shade}`,
        `dark:bg-${type}-${shade}`
      ])
    ),
    
    // Common sizes
    ...['w', 'h', 'p', 'px', 'py', 'm', 'mx', 'my', 'gap'].flatMap(prop =>
      ['1', '2', '3', '4', '6', '8', '12', '16'].map(size => `${prop}-${size}`)
    ),
    
    // Grid and flex (responsive)
    ...['sm', 'md', 'lg'].flatMap(bp => [
      `${bp}:flex-row`, `${bp}:flex-col`,
      `${bp}:grid-cols-1`, `${bp}:grid-cols-2`, `${bp}:grid-cols-3`, `${bp}:grid-cols-4`,
      `${bp}:px-6`, `${bp}:px-8`
    ]),
    
    // Typography
    ...['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map(size => `text-${size}`),
    ...['normal', 'medium', 'semibold', 'bold'].map(weight => `font-${weight}`),
    
    // Spacing
    ...['space-x', 'space-y'].flatMap(prop =>
      ['2', '3', '4', '6'].map(size => `${prop}-${size}`)
    ),
    
    // Common utilities
    'rounded', 'rounded-md', 'rounded-lg', 'rounded-full',
    'shadow', 'shadow-md', 'shadow-lg',
    'border', 'border-t', 'border-b',
    'flex-1', 'flex-wrap', 'items-center', 'justify-between', 'justify-center',
    'min-h-screen', 'max-w-7xl', 'mx-auto',
    'overflow-hidden', 'whitespace-nowrap'
  ];
  
  return [...new Set([...minimalClasses, ...standardPatterns])].sort();
}

function generateComprehensiveSafelist() {
  const standardClasses = generateStandardSafelist();
  
  // Full patterns (this will be large)
  const comprehensivePatterns = [
    // All color variants
    ...['primary', 'secondary', 'success', 'warning', 'danger', 'error', 'info'].flatMap(color =>
      ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].flatMap(shade => [
        `text-${color}-${shade}`,
        `bg-${color}-${shade}`,
        `border-${color}-${shade}`,
        `ring-${color}-${shade}`,
        `hover:text-${color}-${shade}`,
        `hover:bg-${color}-${shade}`,
        `focus:ring-${color}-${shade}`,
        `dark:text-${color}-${shade}`,
        `dark:bg-${color}-${shade}`,
        `dark:hover:bg-${color}-${shade}`
      ])
    ),
    
    // All responsive grid variants
    ...['sm', 'md', 'lg', 'xl', '2xl'].flatMap(bp =>
      Array.from({length: 12}, (_, i) => i + 1).map(cols => `${bp}:grid-cols-${cols}`)
    ),
    
    // All size variants
    ...['w', 'h', 'p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr'].flatMap(prop =>
      ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '32', '40', '48', '56', '64', '72', '80', '96'].map(size => `${prop}-${size}`)
    )
  ];
  
  return [...new Set([...standardClasses, ...comprehensivePatterns])].sort();
}

function generateSafelistFile(classes, level) {
  const config = `// Tailwind CSS Safelist - ${level.toUpperCase()} Level
// Generated on: ${new Date().toISOString()}
// Total classes: ${classes.length}
// Level: ${SAFELIST_LEVELS[level]}

export const tailwindSafelist = [
${classes.map(cls => `  '${cls}',`).join('\n')}
];

// Usage in tailwind.config.js:
// import { tailwindSafelist } from './scripts/safelist-${level}.js';
// 
// export default {
//   // ... other config
//   safelist: tailwindSafelist,
// };
`;

  return config;
}

function generatePatternBasedSafelist() {
  // Alternative approach using Tailwind's pattern matching
  return `// Pattern-based Safelist (Recommended)
// This uses Tailwind's built-in pattern matching for better performance

export const tailwindSafelistPatterns = [
  // Dynamic color classes
  {
    pattern: /^(bg|text|border)-(primary|success|warning|danger)-(50|100|200|300|400|500|600|700|800|900)$/,
  },
  {
    pattern: /^(bg|text|border)-(background|surface|text|border)-(primary|secondary|tertiary|inverse|disabled|elevated|focus)$/,
  },
  
  // Size variants
  {
    pattern: /^(w|h|p|px|py|m|mx|my|gap|space-[xy])-(0|0\\.5|1|1\\.5|2|2\\.5|3|3\\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|32|40|48|56|64|72|80|96)$/,
  },
  
  // Grid columns
  {
    pattern: /^(sm:|md:|lg:|xl:|2xl:)?grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)$/,
  },
  
  // Hover and focus states
  {
    pattern: /^(hover|focus|active|disabled):(bg|text|border|ring)-(primary|success|warning|danger)-(100|500|600)$/,
  },
  
  // Dark mode variants
  {
    pattern: /^dark:(bg|text|border)-(primary|success|warning|danger|background|surface|text)-(primary|secondary|50|100|500|600)$/,
  }
];

// Usage in tailwind.config.js:
// import { tailwindSafelistPatterns } from './scripts/safelist-patterns.js';
// 
// export default {
//   // ... other config
//   safelist: [
//     // Individual classes
//     'task-card',
//     'btn-enhanced',
//     // Pattern-based classes
//     ...tailwindSafelistPatterns
//   ],
// };
`;
}

async function main() {
  const level = process.argv[2] || 'standard';
  
  if (!SAFELIST_LEVELS[level]) {
    console.error(`❌ Invalid level: ${level}`);
    console.log(`Available levels: ${Object.keys(SAFELIST_LEVELS).join(', ')}`);
    process.exit(1);
  }
  
  console.log(`🚀 Generating ${level.toUpperCase()} safelist...\n`);
  console.log(`📝 ${SAFELIST_LEVELS[level]}\n`);
  
  let classes;
  switch (level) {
    case 'minimal':
      classes = generateMinimalSafelist();
      break;
    case 'standard':
      classes = generateStandardSafelist();
      break;
    case 'comprehensive':
      classes = generateComprehensiveSafelist();
      break;
  }
  
  const config = generateSafelistFile(classes, level);
  const outputPath = path.join(projectRoot, 'scripts', `safelist-${level}.js`);
  
  fs.writeFileSync(outputPath, config);
  
  // Also generate pattern-based safelist
  const patternConfig = generatePatternBasedSafelist();
  const patternPath = path.join(projectRoot, 'scripts', 'safelist-patterns.js');
  fs.writeFileSync(patternPath, patternConfig);
  
  console.log(`✅ Generated ${classes.length} classes for ${level} level`);
  console.log(`📄 Output: ${outputPath}`);
  console.log(`📄 Pattern-based: ${patternPath}`);
  
  console.log(`\n🔧 To use this safelist:`);
  console.log(`import { tailwindSafelist } from './scripts/safelist-${level}.js';`);
  console.log(`\n// In tailwind.config.js:`);
  console.log(`safelist: tailwindSafelist,`);
  
  console.log(`\n💡 For better performance, consider using the pattern-based approach!`);
}

main();
