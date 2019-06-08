export default function useDocumentTitle(title = '') {
  document.title = `${title ? `${title} - ` : ''}Search All You Want`;
}