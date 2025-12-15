const API_URL = "http://localhost:4999/api/products";

export const getAllProducts = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};
