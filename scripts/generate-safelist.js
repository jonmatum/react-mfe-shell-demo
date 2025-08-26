#!/usr/bin/env node

/**
 * Tailwind CSS Safelist Generator
 * Automatically generates a comprehensive safelist by scanning source code
 * and analyzing the React MFE Shell package
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Color variants and their shades
const colorVariants = ['primary', 'secondary', 'success', 'warning', 'danger', 'error', 'info'];
const colorShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const semanticColors = ['background', 'surface', 'text', 'border'];
const semanticShades = ['primary', 'secondary', 'tertiary', 'inverse', 'disabled', 'elevated', 'focus'];

// Size variants
const sizeVariants = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
const numericSizes = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'];

// Responsive breakpoints
const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'];

// State variants
const stateVariants = ['hover', 'focus', 'active', 'disabled', 'dark'];

function scanDirectory(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const classes = new Set();
  
  function scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Match className="..." and className={...}
      const classNameMatches = content.match(/className\s*=\s*["'`]([^"'`]+)["'`]/g) || [];
      const classNameTemplateMatches = content.match(/className\s*=\s*{[^}]*["'`]([^"'`]+)["'`][^}]*}/g) || [];
      
      [...classNameMatches, ...classNameTemplateMatches].forEach(match => {
        const classMatch = match.match(/["'`]([^"'`]+)["'`]/);
        if (classMatch) {
          const classList = classMatch[1].split(/\s+/).filter(cls => cls.trim());
          classList.forEach(cls => classes.add(cls));
        }
      });
      
      // Match template literals with classes
      const templateMatches = content.match(/`[^`]*\$\{[^}]*\}[^`]*`/g) || [];
      templateMatches.forEach(match => {
        const potentialClasses = match.match(/[\w-]+/g) || [];
        potentialClasses.forEach(cls => {
          if (cls.includes('-') && (cls.startsWith('bg-') || cls.startsWith('text-') || cls.startsWith('border-'))) {
            classes.add(cls);
          }
        });
      });
      
    } catch (error) {
      console.warn(`Warning: Could not read file ${filePath}:`, error.message);
    }
  }
  
  function walkDirectory(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          walkDirectory(fullPath);
        } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
          scanFile(fullPath);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${currentDir}:`, error.message);
    }
  }
  
  walkDirectory(dir);
  return Array.from(classes);
}

function generateColorClasses() {
  const classes = [];
  
  // Standard color classes
  colorVariants.forEach(variant => {
    colorShades.forEach(shade => {
      classes.push(`text-${variant}-${shade}`);
      classes.push(`bg-${variant}-${shade}`);
      classes.push(`border-${variant}-${shade}`);
      classes.push(`ring-${variant}-${shade}`);
      classes.push(`border-t-${variant}-${shade}`);
      classes.push(`border-l-${variant}-${shade}`);
      
      // Hover states
      classes.push(`hover:text-${variant}-${shade}`);
      classes.push(`hover:bg-${variant}-${shade}`);
      classes.push(`hover:border-${variant}-${shade}`);
      
      // Focus states
      classes.push(`focus:text-${variant}-${shade}`);
      classes.push(`focus:bg-${variant}-${shade}`);
      classes.push(`focus:border-${variant}-${shade}`);
      classes.push(`focus:ring-${variant}-${shade}`);
      
      // Dark mode variants
      classes.push(`dark:text-${variant}-${shade}`);
      classes.push(`dark:bg-${variant}-${shade}`);
      classes.push(`dark:border-${variant}-${shade}`);
      classes.push(`dark:hover:bg-${variant}-${shade}`);
    });
  });
  
  // Semantic color classes
  semanticColors.forEach(type => {
    semanticShades.forEach(shade => {
      classes.push(`text-${type}-${shade}`);
      classes.push(`bg-${type}-${shade}`);
      classes.push(`border-${type}-${shade}`);
      classes.push(`hover:text-${type}-${shade}`);
      classes.push(`hover:bg-${type}-${shade}`);
      classes.push(`dark:text-${type}-${shade}`);
      classes.push(`dark:bg-${type}-${shade}`);
    });
  });
  
  return classes;
}

function generateSizeClasses() {
  const classes = [];
  const properties = ['w', 'h', 'p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'gap', 'space-x', 'space-y'];
  
  properties.forEach(prop => {
    numericSizes.forEach(size => {
      classes.push(`${prop}-${size}`);
      
      // Responsive variants
      breakpoints.forEach(bp => {
        classes.push(`${bp}:${prop}-${size}`);
      });
    });
  });
  
  return classes;
}

function generateLayoutClasses() {
  const classes = [];
  
  // Grid classes
  for (let i = 1; i <= 12; i++) {
    classes.push(`grid-cols-${i}`);
    classes.push(`col-span-${i}`);
    
    breakpoints.forEach(bp => {
      classes.push(`${bp}:grid-cols-${i}`);
      classes.push(`${bp}:col-span-${i}`);
    });
  }
  
  // Flex classes
  const flexClasses = [
    'flex', 'inline-flex', 'flex-col', 'flex-row', 'flex-wrap', 'flex-nowrap',
    'items-start', 'items-center', 'items-end', 'items-stretch',
    'justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around',
    'flex-1', 'flex-auto', 'flex-initial', 'flex-none'
  ];
  
  flexClasses.forEach(cls => {
    classes.push(cls);
    breakpoints.forEach(bp => {
      classes.push(`${bp}:${cls}`);
    });
  });
  
  return classes;
}

function generateTypographyClasses() {
  const classes = [];
  
  // Font sizes
  sizeVariants.forEach(size => {
    classes.push(`text-${size}`);
    breakpoints.forEach(bp => {
      classes.push(`${bp}:text-${size}`);
    });
  });
  
  // Font weights
  const weights = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
  weights.forEach(weight => {
    classes.push(`font-${weight}`);
  });
  
  // Text alignment
  const alignments = ['left', 'center', 'right', 'justify', 'start', 'end'];
  alignments.forEach(align => {
    classes.push(`text-${align}`);
    breakpoints.forEach(bp => {
      classes.push(`${bp}:text-${align}`);
    });
  });
  
  return classes;
}

function generateInteractiveClasses() {
  const classes = [];
  
  // Transitions and animations
  const transitionClasses = [
    'transition', 'transition-all', 'transition-colors', 'transition-opacity', 'transition-transform',
    'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300', 'duration-500', 'duration-700', 'duration-1000',
    'ease-linear', 'ease-in', 'ease-out', 'ease-in-out',
    'animate-spin', 'animate-ping', 'animate-pulse', 'animate-bounce',
    'animate-fade-in', 'animate-slide-up', 'animate-bounce-subtle'
  ];
  
  transitionClasses.forEach(cls => classes.push(cls));
  
  // Shadows
  const shadows = ['shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-inner', 'shadow-none'];
  shadows.forEach(shadow => {
    classes.push(shadow);
    classes.push(`hover:${shadow}`);
  });
  
  // Transform classes
  const transforms = [
    'scale-95', 'scale-100', 'scale-105', 'scale-110',
    '-translate-y-0.5', 'translate-y-0', 'translate-y-0.5',
    'rotate-0', 'rotate-45', 'rotate-90', 'rotate-180'
  ];
  
  transforms.forEach(transform => {
    classes.push(transform);
    classes.push(`hover:${transform}`);
    classes.push(`active:${transform}`);
  });
  
  return classes;
}

function generateMFEShellClasses() {
  // Classes commonly used by MFE Shell components
  return [
    // Badge variants
    'badge-default', 'badge-primary', 'badge-secondary', 'badge-success', 'badge-warning', 'badge-danger',
    'badge-sm', 'badge-md', 'badge-lg',
    
    // Button variants
    'btn-primary', 'btn-secondary', 'btn-success', 'btn-warning', 'btn-danger',
    'btn-sm', 'btn-md', 'btn-lg',
    
    // Custom component classes
    'task-card', 'btn-enhanced', 'custom-scrollbar', 'modal-backdrop', 'gradient-primary', 'loading-shimmer',
    
    // Focus and accessibility
    'focus-ring', 'focus-ring-inset', 'sr-only',
    
    // State classes
    'disabled:opacity-50', 'disabled:cursor-not-allowed',
    'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2',
    'hover:opacity-75', 'active:scale-95',
    
    // Utility classes
    'capitalize', 'uppercase', 'lowercase',
    'truncate', 'line-clamp-1', 'line-clamp-2', 'line-clamp-3',
    'cursor-pointer', 'cursor-not-allowed', 'cursor-default',
    'select-none', 'select-text',
    'overflow-hidden', 'overflow-auto', 'overflow-visible',
    'whitespace-nowrap', 'whitespace-normal',
    'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full',
    'border', 'border-2', 'border-t', 'border-b', 'border-l', 'border-r',
    'border-dashed', 'border-dotted', 'border-solid',
    'opacity-0', 'opacity-50', 'opacity-75', 'opacity-100',
    'z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50',
    'relative', 'absolute', 'fixed', 'sticky',
    'inset-0', 'top-0', 'right-0', 'bottom-0', 'left-0',
    'block', 'inline-block', 'inline', 'hidden', 'grid',
    'min-h-screen', 'min-h-full', 'h-full', 'w-full',
    'max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-3xl', 'max-w-4xl', 'max-w-5xl', 'max-w-6xl', 'max-w-7xl'
  ];
}

function generateComprehensiveSafelist() {
  console.log('🔍 Scanning source code for classes...');
  const sourceClasses = scanDirectory(path.join(projectRoot, 'src'));
  
  console.log('🎨 Generating color classes...');
  const colorClasses = generateColorClasses();
  
  console.log('📏 Generating size classes...');
  const sizeClasses = generateSizeClasses();
  
  console.log('📐 Generating layout classes...');
  const layoutClasses = generateLayoutClasses();
  
  console.log('🔤 Generating typography classes...');
  const typographyClasses = generateTypographyClasses();
  
  console.log('✨ Generating interactive classes...');
  const interactiveClasses = generateInteractiveClasses();
  
  console.log('🧩 Generating MFE Shell classes...');
  const mfeShellClasses = generateMFEShellClasses();
  
  // Combine all classes and remove duplicates
  const allClasses = [
    ...sourceClasses,
    ...colorClasses,
    ...sizeClasses,
    ...layoutClasses,
    ...typographyClasses,
    ...interactiveClasses,
    ...mfeShellClasses
  ];
  
  const uniqueClasses = [...new Set(allClasses)].sort();
  
  console.log(`\n📊 Generated ${uniqueClasses.length} unique classes`);
  console.log(`📁 Found ${sourceClasses.length} classes in source code`);
  console.log(`🎨 Generated ${colorClasses.length} color classes`);
  console.log(`📏 Generated ${sizeClasses.length} size classes`);
  console.log(`📐 Generated ${layoutClasses.length} layout classes`);
  console.log(`🔤 Generated ${typographyClasses.length} typography classes`);
  console.log(`✨ Generated ${interactiveClasses.length} interactive classes`);
  console.log(`🧩 Generated ${mfeShellClasses.length} MFE Shell classes`);
  
  return uniqueClasses;
}

function generateSafelistConfig(classes) {
  const config = `// Auto-generated Tailwind CSS Safelist
// Generated on: ${new Date().toISOString()}
// Total classes: ${classes.length}

export const tailwindSafelist = [
${classes.map(cls => `  '${cls}',`).join('\n')}
];

// For use in tailwind.config.js:
// import { tailwindSafelist } from './scripts/safelist.js';
// 
// export default {
//   // ... other config
//   safelist: tailwindSafelist,
// };
`;

  return config;
}

// Main execution
async function main() {
  console.log('🚀 Starting Tailwind CSS Safelist Generation...\n');
  
  try {
    const safelist = generateComprehensiveSafelist();
    const config = generateSafelistConfig(safelist);
    
    // Write to file
    const outputPath = path.join(projectRoot, 'scripts', 'safelist.js');
    fs.writeFileSync(outputPath, config);
    
    console.log(`\n✅ Safelist generated successfully!`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`\n🔧 To use this safelist, update your tailwind.config.js:`);
    console.log(`import { tailwindSafelist } from './scripts/safelist.js';`);
    console.log(`\nexport default {`);
    console.log(`  // ... other config`);
    console.log(`  safelist: tailwindSafelist,`);
    console.log(`};`);
    
  } catch (error) {
    console.error('❌ Error generating safelist:', error);
    process.exit(1);
  }
}

main();
