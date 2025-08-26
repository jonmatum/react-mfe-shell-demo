// Pattern-based Safelist (Recommended)
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
    pattern: /^(w|h|p|px|py|m|mx|my|gap|space-[xy])-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|32|40|48|56|64|72|80|96)$/,
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
