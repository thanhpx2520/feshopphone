import { BASE_URL } from "../config";

const getImageProduct = (imageName) => {
  return `${BASE_URL}/static/images/${imageName}`;
};

const getImageSlider = (imageName) => {
  return `${BASE_URL}/static/images/${imageName}`;
};

const getImageBanner = (imageName) => {
  return `${BASE_URL}/static/images/${imageName}`;
};

const getPrice = (number) => {
  if (typeof number !== "number") return Number(number).toLocaleString("vi-VN");
  return number.toLocaleString("vi-VN");
};

export { getImageProduct, getPrice, getImageSlider, getImageBanner };
