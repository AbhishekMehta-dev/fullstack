const registerUser = async()=>{
   
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            fullname:fullname,
            role:role 
        }),
    });
    if (response.ok) {
        const data = await response.json();
        alert('User registered successfully');
    } else {
        const data = await response.json();
        alert(data.error);
    
    }
}

const loginUser = async()=>{
    
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: 123456789,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
    } else {
        const data = await response.json();
        alert(data.error);
    }
    return response;

}

const logoutUser = async()=>{
    
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    localStorage.removeItem('accessToken');
    return response;


}


export {registerUser,loginUser,logoutUser};
