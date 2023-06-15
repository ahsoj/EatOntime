import axios from "@lib/axios";
import axiosInstance from "@lib/instance";
import Authentication from "@sdk/Authentication";
import { getProducts } from "@sdk/Store";

export const addCart = async (userId: string, cartId: string) => {
  //   const user = await Authentication.getUser();
  //   console.log(user.access);
  const product = await getProducts()
    .then((data: object[]) => data.filter((item: any) => item.id === cartId))
    .catch((err) => console.log(err));
  if (product !== null) {
    await axiosInstance.post("/cart/", { user: userId, items: product });
  }
};

export const createCustomer = async (userId: string) => {
  if (userId) {
    await axios.post("/customer/", { userId });
  }
};
