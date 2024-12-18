
const baseUrl = "https://dummyapi.io/data/v1/";

//Enviroment
const headers = {
  "app-id": import.meta.env.VITE_APY_KEY,
  "Content-Type": "application/json"
}

const getApi = async (url) => {
  const response = await fetch(baseUrl + url,
    {
      headers
    }
  );
  return response.json();
}

const postApi = async (url, data) => {
  const response = await fetch(baseUrl + url,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    }
  );
  return response.json();
}
const putApi = async (url, data) => {
  const response = await fetch(baseUrl + url,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(data)
    }
  );
  return response.json();
}
const deleleteApi = async (url) => {
  const response = await fetch(baseUrl + url,
    {
      method: "DELETE",
      headers
    }
  );
  return response.json();
}

export { getApi, postApi, putApi, deleleteApi }