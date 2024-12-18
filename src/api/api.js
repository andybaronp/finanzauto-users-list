
const baseUrl = "https://dummyapi.io/data/v1/";

//Enviroment
const headers = {
  "app-id": import.meta.env.VITE_APY_KEY
}

const get = async (url) => {
  const response = await fetch(baseUrl + url,
    {
      headers
    }
  );
  return response.json();
}

const post = async (url, data) => {
  const response = await fetch(baseUrl + url,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    }
  );
  return response.json();
}
const put = async (url, data) => {
  const response = await fetch(baseUrl + url,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(data)
    }
  );
  return response.json();
}
const del = async (url) => {
  const response = await fetch(baseUrl + url,
    {
      method: "DELETE",
      headers
    }
  );
  return response.json();
}

export { get, post, put, del }