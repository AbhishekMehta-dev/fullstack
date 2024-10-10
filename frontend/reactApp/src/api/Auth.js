const registerUser = async (username, email, password, fullname, role) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        fullname,
        role 
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('User registered successfully');
      return data;
    } else {
      throw new Error(data.error);
    }
  };
  
  const loginUser = async (username, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('accessToken', data.accessToken);
      return data;
    } else {
      throw new Error(data.error);
    }
  };
  
  const logoutUser = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });
    
    localStorage.removeItem('accessToken');
    return response;
  };
  
  export { registerUser, loginUser, logoutUser };