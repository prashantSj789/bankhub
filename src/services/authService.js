
const API_URL='http://localhost:8080';
export const register=async (data)=>{
    try {
        const response = await fetch(`${API_URL}/account`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data), 
        });
    
        
        if (!response.ok) {
          throw new Error('Registration failed. Please try again!');
        }
    
        const responseData = await response.json();
        console.log(responseData);
    
        
        if (responseData.token) {
          localStorage.setItem('token', responseData.token);
        }
    
        return responseData;  
      } catch (error) {
        console.error('Registration error:', error);
        throw error.message || 'Registration failed. Please try again!'; 
      }
};
export const login = async (data) => {
  console.log(data)
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response)
    console.log('Payload:', JSON.stringify(data));

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed. Please try again!");
    }
    if(response.status===400){
      console.log(response)
    }

    const responseData = await response.json();
    console.log(responseData)
    console.log("Token:", responseData.token);

    if (responseData.token) {
      localStorage.setItem('token', responseData.token);
    }
    return responseData;
  } catch (error) {
    console.error('Login error:', error);
    throw error.message || 'Login failed. Please check your credentials.';
  }
};

export const logout=()=>{
    localStorage.removeItem('token');
};

export const getCurrentUser=()=>{
    return localStorage.getItem('token')
};





