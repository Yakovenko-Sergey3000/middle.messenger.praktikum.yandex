const longText = (text: string, end?: number, start: number = 0) => {
  if (end && text.length > end) {
    return `${text.slice(start, end)}...`;
  }

  return text;
};

export default longText;
