// Escape user-supplied text before interpolating it into email HTML.
// Scripts don't run in mail clients, but unescaped markup still lets someone
// inject convincing content into a mail that genuinely came from our domain.
const ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (char) => ENTITIES[char]);

module.exports = escapeHtml;
