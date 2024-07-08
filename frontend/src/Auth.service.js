import axios from 'axios';
function myFunction() {
    // Check if the counter property exists, if not initialize it to 0
    if (typeof myFunction.counter === 'undefined') {
      myFunction.counter = 0;
    }
  
    // Increment the counter
    myFunction.counter++;
  
    alert(`This function has been called ${myFunction.counter} times.`);
  }
class Authentication {
    async login(email, password) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                email,
                password 
            });
            
            if (response.data.success) {
                // Store only the token in localStorage
                //alert('auth login');
                //alert(JSON.stringify(response.data.token, null, 2))
                localStorage.setItem('token', JSON.stringify(response.data.token));
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return error.response.data;
        }
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    async getCurrentUser(page) {
        
          
        const tokenString = localStorage.getItem('token');
        alert('isnide gfetCurrewntUser');
        alert(tokenString);
        if (!tokenString) {
            alert('no token');
            if(page === "login"){
                return null;
            }
            window.location.href = '/login';
            return null;
        }
        myFunction();
        // Increment the counter
        
        try {
            alert('INSIDE TRY INSIDFE  gfetCurrewntUser');
            // Parse the token string to an object
            const token = JSON.parse(tokenString);
            alert('retrieved token: ' + token);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/get-user-by-token`, {
                headers: {
                    Authorization: `Bearer ${tokenString}`, // Correct capitalization
                }
            });
            alert('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            alert(response);
            alert(JSON.stringify(response, null, 2));

            if (response.data.success) {
                return response.data.user; // Return user data
            } else {
                console.log(response.data.message);
                this.logout();
                return null;
            }
        } catch (error) {
            alert(error);
            console.log(error);
            this.logout();
            return null;
        }
    }
}

export default new Authentication();
