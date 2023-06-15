import axiosInstance from "@lib/instance";
import Authentication from "@sdk/Authentication";

export function getCart(user_id: string): Promise<object> {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/order/?oid=${user_id}`)
      .then((resp) => resolve(resp.data))
      .catch(reject);
  });
}

export function createOrder(product: any[], uid: string): Promise<object> {
  return new Promise((resolve, reject) => {
    product.map((data) => {
      axiosInstance
        .post(`/order/`, {
          customer: uid,
          restaurant: data.restaurant,
          total_cost: data.current_price * data.quantity,
          delivery_charge: data.quantity * 2,
          status: data.payment_status ? "SUCCESS" : "PENDING",
          payment_status: data.payment_status,
        })
        .then((resp) => resolve(resp.data))
        .catch(reject);
    });
  });
}

export function getFavorite(): Promise<object> {
  const user: any = Authentication.getUser();
  return new Promise((resolve, reject) => {
    if (user !== null) {
      const user_id = String(user.user_id).toLowerCase();
      axiosInstance
        .get(`/favorite/?user=${user_id}`)
        .then((resp) => resolve(resp.data))
        .catch(reject);
    }
    null;
  });
}

export function getProducts(): Promise<object> {
  const user = Authentication.getUser();
  return new Promise((resolve, reject) => {
    if (user !== null) {
      axiosInstance
        .get(`/menu_items/`)
        .then((resp) => resolve(resp.data))
        .catch(reject);
    }
  });
}

export function retrieveProducts(itemId: string): Promise<object> {
  const user = Authentication.getUser();
  return new Promise((resolve, reject) => {
    if (user !== null) {
      axiosInstance
        .get(`/menu_items/?item=${itemId}`)
        .then((resp) => resolve(resp.data))
        .catch(reject);
    }
  });
}

export default {
  getCart,
  createOrder,
  getFavorite,
  getProducts,
  retrieveProducts,
};

// http://127.0.0.1:8888/api/menuItems/?item=1698f857-0c85-4230-91ed-fe1ca523e2cd
