import axios from "axios";

export class ApiUtils {
  static readonly baseUrl = "https://localhost:7086/api/";

  static Post = async (url: string, data) => {
    try {
      const response = await axios.post(ApiUtils.baseUrl + url, data);
      return response;
    } catch (error) {
      console.error(error);
      return { status: "error", data: undefined };
    }
  };

  static Get = async (url: string) => {
    try {
      const response = await axios.get(ApiUtils.baseUrl + url);
      return response;
    } catch (error) {
      console.error(error);
      return { status: "error", data: undefined };
    }
  };

  static Put = async (url: string, data) => {
    try {
      const finalUrl = ApiUtils.baseUrl + url;
      const response = await axios.put(finalUrl, data);
      return response;
    } catch (error) {
      console.error(error);
      return { status: "error", data: undefined };
    }
  };
}
