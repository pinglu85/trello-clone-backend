interface BoardBackground {
  backgroundColor: string | null;
  backgroundImage: string | null;
}

function getBoardBackground(background: string): BoardBackground {
  let backgroundColor: string | null = null;
  let backgroundImage: string | null = null;

  if (isRemoteImage(background)) {
    backgroundImage = background;
  } else {
    backgroundColor = background;
  }

  return { backgroundColor, backgroundImage };
}

function isRemoteImage(str: string): boolean {
  return str.startsWith('https://images.unsplash.com/photo-');
}

export default getBoardBackground;
