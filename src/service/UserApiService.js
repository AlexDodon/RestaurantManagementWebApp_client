import axios from 'axios'

const USER_API_BASE_URL = 'http://localhost:8080/api/users'

class UserApiService {

    fetchUsers() {
        var res = axios.get(USER_API_BASE_URL);
        return res;
    }

    async fetchUserById(userId) {
        let res = null;
        
        try {
        res = await axios.get(USER_API_BASE_URL + '/' + userId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log("Fetched user: " + res);
            return res;
        }
    }

    async deleteUser(userId) {
        let res = null;

        try {
        res = await axios.delete(USER_API_BASE_URL + '/' + userId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log(res);
            return res;
        }
    }

    addUser(user) {
        console.log(user);
        return axios.post(USER_API_BASE_URL, user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }

}

export default new UserApiService();
