import axios from 'axios'

const SUPPLIER_API_BASE_URL = 'http://localhost:8080/api/suppliers'

class SupplierApiService {

    fetchSuppliers() {
        var res = axios.get(SUPPLIER_API_BASE_URL);
        return res;
    }

    async fetchSupplierById(SupplierId) {
        let res = null;
        
        try {
        res = await axios.get(SUPPLIER_API_BASE_URL + '/' + SupplierId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log("Fetched Supplier: ")
            console.log(res);
            return res;
        }
    }

    async deleteSupplier(SupplierId) {
        let res = null;

        try {
        res = await axios.delete(SUPPLIER_API_BASE_URL + '/' + SupplierId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log(res);
            return res;
        }
    }

    addSupplier(Supplier) {
        console.log(Supplier);
        return axios.post(SUPPLIER_API_BASE_URL, Supplier);
    }

    editSupplier(Supplier) {
        console.log(Supplier)
        return axios.put(SUPPLIER_API_BASE_URL + '/' + Supplier.id, Supplier);
    }

}

export default new SupplierApiService();
