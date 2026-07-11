const COLOR_VIBE_TO_THEME = {
  warm: 'warm-cafe',
  dark: 'dark-luxury',
  fresh: 'fresh-green',
  minimal: 'minimal-white',
  bold: 'tech-modern',
  tech: 'tech-modern'
};

function resolveThemeName(colorVibe) {
  const themeName = COLOR_VIBE_TO_THEME[colorVibe];

  if (!themeName) {
    throw new Error(`Unsupported colorVibe: ${colorVibe}`);
  }

  return themeName;
}

export { COLOR_VIBE_TO_THEME, resolveThemeName };