export function generateCSS(sections) {
  if (!sections || !sections.length) return "/* Add a section to generate CSS */";
  return sections.map(s => {
    const { fontSize, color, width, padding, borderRadius } = s.styles || {};
    return `.section-${s.id} {\n  font-size: ${fontSize}px;\n  color: ${color};\n  width: ${width}%;\n  padding: ${padding}px;\n  border-radius: ${borderRadius}px;\n}`;
  }).join("\n\n");
}
