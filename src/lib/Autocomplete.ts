import axios from "axios";

export const Autocomplete = async (content: string) => {
  if (typeof window !== "undefined") {
    const config = {
      method: "GET",
      url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${content}&apiKey=dca04a41cfb04353a490964e5fc16971`,
      headers: {},
    };
    const response = await axios(config);
    if (response.status === 200) {
      return response.data;
    }
  }
};
