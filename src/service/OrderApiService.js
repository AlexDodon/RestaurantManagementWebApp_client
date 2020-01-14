import axios from 'axios'

const ORDER_API_BASE_URL = 'http://localhost:8080/api/orders'

class OrderApiService {

    fetchOrders() {
        var res = axios.get(ORDER_API_BASE_URL);
        return res;
    }

    async fetchOrderById(OrderId) {
        let res = null;
        
        try {
        res = await axios.get(ORDER_API_BASE_URL + '/' + OrderId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log("Fetched Order: ")
            console.log(res);
            return res;
        }
    }

    async deleteOrder(OrderId) {
        let res = null;

        try {
        res = await axios.delete(ORDER_API_BASE_URL + '/' + OrderId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log(res);
            return res;
        }
    }

    addOrder(Order) {
        console.log(Order);
        return axios.post(ORDER_API_BASE_URL, Order);
    }

    editOrder(Order) {
        console.log(Order)
        return axios.put(ORDER_API_BASE_URL + '/' + Order.id, Order);
    }

}

export default new OrderApiService();
