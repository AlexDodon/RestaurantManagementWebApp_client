import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/api';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL + "/users");
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/users/' + userId);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/users/' + userId);
    }

    addUser(user) {
        return axios.post(USER_API_BASE_URL + "/users", user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/users/' + user.id, user);
    }

}

export default new ApiService();
