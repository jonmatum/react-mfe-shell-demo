# Tailwind CSS Safelist Generator

This directory contains automated tools for generating comprehensive Tailwind CSS safelists to ensure all your classes are included in the build.

## 🎯 Why Use Safelist?

Tailwind CSS only includes classes it can detect in your source code. However, some classes might be missing due to:

- **Dynamic class names**: Classes generated programmatically
- **External components**: Classes used by React MFE Shell components
- **Conditional styling**: Classes applied based on state or props
- **Template literals**: Classes in template strings that aren't detected

## 📁 Available Tools

### 1. Smart Safelist Generator (`smart-safelist.js`)

Generates different levels of safelist based on your needs:

```bash
# Generate minimal safelist (105 classes)
npm run safelist:minimal

# Generate standard safelist (342 classes) - RECOMMENDED
npm run safelist:standard

# Generate comprehensive safelist (1000+ classes)
npm run safelist:comprehensive
```

**Levels:**
- **Minimal**: Only classes found in source code + essential MFE Shell classes
- **Standard**: Common patterns + responsive variants + state variants (recommended)
- **Comprehensive**: Full color palette + all size variants + all responsive breakpoints

### 2. Full Safelist Generator (`generate-safelist.js`)

Generates an exhaustive safelist with all possible combinations:

```bash
# Generate full safelist (5800+ classes)
npm run safelist:full
```

⚠️ **Warning**: This generates a very large safelist and may increase bundle size significantly.

## 🚀 Usage

### Current Setup

The project is currently using the **standard** safelist:

```javascript
// tailwind.config.js
import { tailwindSafelist } from './scripts/safelist-standard.js';

export default {
  // ... other config
  safelist: tailwindSafelist,
};
```

### Switching Levels

To switch to a different level:

1. Generate the desired level:
   ```bash
   npm run safelist:minimal  # or standard, comprehensive
   ```

2. Update `tailwind.config.js`:
   ```javascript
   import { tailwindSafelist } from './scripts/safelist-minimal.js';
   ```

3. Rebuild:
   ```bash
   npm run build
   ```

### Pattern-Based Safelist (Advanced)

For better performance, use the pattern-based approach:

```javascript
// tailwind.config.js
import { tailwindSafelistPatterns } from './scripts/safelist-patterns.js';

export default {
  safelist: [
    // Individual classes
    'task-card',
    'btn-enhanced',
    // Pattern-based classes
    ...tailwindSafelistPatterns
  ],
};
```

## 📊 Bundle Size Comparison

| Level | Classes | CSS Size | Gzipped | Use Case |
|-------|---------|----------|---------|----------|
| Minimal | 105 | ~25 KB | ~5 KB | Small projects, specific classes only |
| Standard | 342 | ~48 KB | ~8 KB | **Recommended** - Good balance |
| Comprehensive | 1000+ | ~80 KB | ~12 KB | Large projects, many dynamic classes |
| Full | 5800+ | ~150 KB | ~20 KB | Complete coverage (overkill for most) |

## 🔄 Regenerating Safelist

When you add new components or classes:

1. **Automatic**: The scripts scan your source code automatically
2. **Manual**: Run the appropriate script to regenerate
3. **CI/CD**: Add to your build process:
   ```bash
   npm run safelist:standard && npm run build
   ```

## 🎨 What's Included

### Standard Safelist Includes:

**Color Classes:**
- All semantic colors: `text-primary-600`, `bg-success-100`, etc.
- Hover states: `hover:bg-primary-500`
- Focus states: `focus:ring-primary-500`
- Dark mode: `dark:bg-surface-primary`

**Layout Classes:**
- Grid: `grid-cols-1` to `grid-cols-4`
- Responsive: `sm:flex-row`, `md:grid-cols-2`
- Spacing: `space-x-2`, `gap-4`, `p-6`

**Typography:**
- Sizes: `text-xs` to `text-3xl`
- Weights: `font-medium`, `font-semibold`, `font-bold`

**Interactive:**
- Transitions: `transition-all`, `duration-200`
- Shadows: `shadow-md`, `hover:shadow-lg`
- Transforms: `active:scale-95`

**Custom Components:**
- `task-card`, `btn-enhanced`
- MFE Shell specific classes

## 🛠️ Customization

### Adding Custom Classes

Edit the generator scripts to include your custom classes:

```javascript
// In smart-safelist.js
const essentialClasses = [
  'task-card', 'btn-enhanced',
  'your-custom-class',  // Add here
  // ...
];
```

### Adding New Patterns

For pattern-based safelist:

```javascript
// In safelist-patterns.js
{
  pattern: /^your-pattern-(sm|md|lg)$/,
}
```

## 🔍 Debugging

### Check What's Missing

1. Build your project
2. Check browser dev tools for missing styles
3. Add missing classes to the appropriate safelist level
4. Regenerate and rebuild

### Verify Classes Are Included

```bash
# Check if a class is in the built CSS
grep "your-class-name" dist/assets/*.css
```

## 📝 Best Practices

1. **Start with Standard**: Use the standard level for most projects
2. **Monitor Bundle Size**: Check the impact on your CSS bundle
3. **Regular Updates**: Regenerate when adding new components
4. **Use Patterns**: Consider pattern-based approach for better performance
5. **Document Custom Classes**: Keep track of any manual additions

## 🤝 Contributing

When adding new components or features:

1. Add any new custom classes to the generator
2. Test with minimal safelist first
3. Update to standard if needed
4. Document any new patterns

---

**Generated by TaskMaster Pro - React MFE Shell Demo**
