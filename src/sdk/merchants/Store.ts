import axios from "@lib/axios";
import axiosInstance from "@lib/instance";

let _uid = "";

export function getMyOrder(mid: string): Promise<object> {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/order/?mid=${mid}`)
      .then((resp) => {
        resp.data.map((data: any) => {
          _uid = data.customer;
          axiosInstance
            .get(`/order_items/?ciid=${data.id}`)
            .then((res) => resolve(res.data))
            .catch(reject);
        });
      })
      .catch(reject);
  });
}
export function getMenu(iid: string): Promise<object> {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/menu_items/?item=${iid}`)
      .then((resp) => resolve(resp.data))
      .catch(reject);
  });
}

// export function getCustomer(): Promise<object> {
//   return new Promise((resolve, reject) => {
//     axiosInstance
//       .get(`/customer_account/?uid=${_uid}`)
//       .then((resp) => console.log(resp))
//       .catch(reject);
//   });
// }

export default { getMyOrder, getMenu };
