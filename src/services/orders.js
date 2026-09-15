import API from "./api";

export const createOrder = async (order) => {
  const response = await API.post("/orders", order);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await API.get("/orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await API.get(`/orders/${id}`);
  return response.data;
};

export const getOrdersByEmail = async (email) => {
  const response = await API.get(
    `/orders/customer/${encodeURIComponent(email)}`
  );
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await API.put(`/orders/${id}/status`, { status });
  return response.data;
};