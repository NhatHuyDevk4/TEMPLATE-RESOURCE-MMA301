import ApiClient from "./APIClient";

export class ProductAPI extends ApiClient {
  // Lấy toàn bộ danh sách sản phẩm
  async getAllProducts() {
    const res = await this.axiosInstance.get("/nameEndPoint");
    if (res.status === 200) return res.data;
    throw new Error("Failed to fetch product list");
  }

  // Lấy chi tiết một sản phẩm theo ID
  async getProductById(productId) {
    const res = await this.axiosInstance.get(`/nameEndPoint/${productId}`);
    if (res.status === 200) return res.data;
    throw new Error("Failed to fetch product details");
  }

  // Tạo mới một sản phẩm
  async createProduct(data) {
    const res = await this.axiosInstance.post("/nameEndPoint", data);
    if (res.status === 201) return res.data;
    throw new Error("Failed to create product");
  }

  // Cập nhật thông tin sản phẩm
  async updateProduct(productId, data) {
    const res = await this.axiosInstance.put(`/nameEndPoint/${productId}`, data);
    if (res.status === 200) return res.data;
    throw new Error("Failed to update product");
  }

  // Xóa sản phẩm
  async deleteProduct(productId) {
    const res = await this.axiosInstance.delete(`/nameEndPoint/${productId}`);
    if (res.status === 200) return res.data;
    throw new Error("Failed to delete product");
  }
}
