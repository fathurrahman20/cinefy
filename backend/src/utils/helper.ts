export const getAssetUrl = (path = "thumbnail") => {
  const appUrl = process.env.APP_URL!;

  return `${appUrl}/uploads/${path}`;
};
