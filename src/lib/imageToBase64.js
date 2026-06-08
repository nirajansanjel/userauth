export const imageToBase64 = async (imageUrl) => {
  const response = await fetch(imageUrl);

  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(blob);
  });
};