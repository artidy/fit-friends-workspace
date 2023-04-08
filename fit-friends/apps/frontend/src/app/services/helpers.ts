function getFormatTitle(title: string): string {
  return `${title[0].toUpperCase()}${title.slice(1)}`;
}

export {
  getFormatTitle
}
