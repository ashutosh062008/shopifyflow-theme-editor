export function isValidHex(value) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
}

export const defaultStyles = () => ({
  fontSize: 18,
  color: "#7c5cff",
  width: 100,
  padding: 16,
  borderRadius: 0,
  shadow: 0,
  opacity: 100,
  letterSpacing: 0,
  lineHeight: 1.5,
  textAlign: "left",
  images: []
});
