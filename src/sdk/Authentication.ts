import axios from "@lib/axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export function getUser() {
  let accessToken = Cookies.get("token");
  if (accessToken) {
    accessToken = jwt_decode(accessToken);
    return accessToken;
  } else {
    return null;
  }
}

export function Login(
  email: string,
  password: string,
  remember: boolean
): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/login/user/", { email, password })
      .then((resp) => {
        resolve(resp.data);
        if (resp.data.access) {
          Cookies.set("token", JSON.stringify(resp.data), {
            expires: remember ? 60 : 1,
          });
          axios.defaults.headers.Authorization = `Bearer ${resp.data.access}`;
        }
      })
      .catch(reject);
  });
}

export function Register(
  email: string,
  phone: string,
  password: string,
  address: object,
  continueAs: string
): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .post(`/auth/register/${continueAs}/`, {
        email,
        phone,
        password,
        address: address,
      })
      .then((resp) => {
        if (resp.status === 201 || resp.data.access === 201) {
          resolve(resp.data);
        }
      })
      .catch(reject);
  });
}

export function Logout() {
  try {
    Cookies.remove("token");
    delete axios.defaults.headers.Authorization;
    if (typeof window !== undefined) {
      window.location.href = "/signin";
    }
  } catch (err) {
    console.log(err);
  }
}

export default { getUser, Login, Register, Logout };
