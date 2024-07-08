import axios from 'axios';

class Authentication {
    async login(email, password) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                email: email,
                password: password 
            });
            
            alert(response.data.token.encryptedData);
            if (response.data.success) {
                localStorage.setItem('token', JSON.stringify(response.data.token.encryptedData));
                return response.data.token; // Ensure the correct property is returned
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
        const token = JSON.parse(localStorage.getItem('token'));

        if (!token) {
            if(page == "login"){
                return null;
            }
            window.location.href = '/login';
            return null;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/get-user-by-token`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.success) {
                alert("SUCCESS")
                return `Bearer ${token}`;
            } else {
                alert("DENIED")
                console.log(response.data.message);
                this.logout();
                return null;
            }
        } catch (error) {
            console.log(error);
            this.logout();
            return null;
        }
    }
}

export default new Authentication();
