import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { handleError } from '@/helpers/error-handling';
import ls from "@/services/ls";
export const useClient = defineStore("client", () => {

  async function http(config={method:'get',path:'',data: {},fullPath :false})  {
    
    const token = ls.get("auth.token");
    let url = window.baseUrl + config?.path;

    if (config?.fullPath) {
      url = config?.path;
    }

    const headers = {
        Authorization: token ? `Bearer ${token}` : "",
    };

    if (config?.data instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
    }

    try {
      const response = await axios({
        method: config?.method,
        url: url,
        data:config?.data,
        headers:headers,
      });
      return response.data;
    } catch (error) {
      handleError(error);
      return false
    }
  }

  return {  http };
});
