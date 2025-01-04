export const fetchWithRefresh = async (url, options = {}) => {
    const Logincred = JSON.parse(localStorage.getItem("accessToken"));
    console.log(Logincred.token)

    if (!Logincred || !Logincred.token || !Logincred.refreshToken) {
      throw new Error("Authentication credentials are missing. Please log in again.");
    }

    try {
      if (!options.headers) options.headers = {};
      options.headers["Authorization"] = `Bearer ${Logincred.token}`;

      const response = await fetch(url, options);

      if (response.status === 401) {
        const refreshResponse = await fetch("http://localhost:8080/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: Logincred.refreshToken }),
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          const newToken = refreshData.token;

          localStorage.setItem(
            "Logincred",
            JSON.stringify({ ...Logincred, token: newToken })
          );

          options.headers["Authorization"] = `Bearer ${newToken}`;
          return fetch(url, options);
        } else {
          throw new Error("Session expired. Please log in again.");
        }
      }

      return response;
    } catch (error) {
      console.error("Error during fetchWithRefresh:", error);
      throw error;
    }
  };

export const login = async (accountNumber, pinCode) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber, pinCode }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.token);
        sessionStorage.setItem("userCredentials", JSON.stringify({ accountNumber, pinCode }));
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

export const reLogin = async () => { 
    const userCredentials = sessionStorage.getItem("userCredentials");
    if (!userCredentials) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }
  
    const { accountNumber, pinCode } = JSON.parse(userCredentials);
  
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber, pinCode }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.token); // Update the token
      } else {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Re-login failed:", error);
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }
  };

export const fetchWithReLogin = async (url, options = {}) => {
    const token = localStorage.getItem("accessToken");
    if (!options.headers) options.headers = {};
    options.headers["Authorization"] = `Bearer ${token}`;
  
    try {
      const response = await fetch(url, options);
  
      if (response.status === 401) {
        // Token expired, attempt to re-login
        await reLogin();
  
        // Retry the original request
        const newToken = localStorage.getItem("accessToken");
        options.headers["Authorization"] = `Bearer ${newToken}`;
        return fetch(url, options);
      }
  
      return response;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  };