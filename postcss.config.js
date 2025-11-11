// postcss.config.js

export default {
  plugins: {
    // FIX: Reference 'tailwindcss' by name, not by importing it as a direct function.
    // The previously installed package handles the connection.
    'tailwindcss': {},
    'autoprefixer': {},
  },
}