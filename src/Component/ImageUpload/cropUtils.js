export const getCroppedImg = (imageSrc, croppedAreaPixels) => {
  const canvas = document.createElement('canvas');
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const { x, y, width, height } = croppedAreaPixels;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height
      );
      canvas.toBlob((blob) => {
        const file = new File([blob], 'cropped-image.png', { type: 'image/png' });
        resolve(URL.createObjectURL(file));
      }, 'image/png');
    };

    image.onerror = () => reject(new Error('Image loading error'));
  });
};
