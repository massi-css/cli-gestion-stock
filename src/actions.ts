import axios from "axios";

interface ProductAction {
  execute(...args: any[]): Promise<any> | string;
}

class GetProductAction implements ProductAction {
  async execute(productId: string) {
    return axios.get(`${process.env.API_BASE_URL}/products/${productId}`);
  }
}

class GetProductsAction implements ProductAction {
  async execute() {
    return axios.get(`${process.env.API_BASE_URL}/products`);
  }
}

class AddProductAction implements ProductAction {
  async execute(product: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }) {
    return axios.post(`${process.env.API_BASE_URL}/products`, product);
  }
}

class UpdateProductAction implements ProductAction {
  async execute(
    productId: string,
    updatedProduct: {
      name: string;
      description: string;
      price: number;
      quantity: number;
    }
  ) {
    return axios.put(
      `${process.env.API_BASE_URL}/products/${productId}`,
      updatedProduct
    );
  }
}

class DeleteProductAction implements ProductAction {
  async execute(productId: string) {
    return axios.delete(`${process.env.API_BASE_URL}/products/${productId}`);
  }
}

class SearchProductAction implements ProductAction {
  async execute(searchTerm: string, limit: number) {
    return axios.get(
      `${process.env.API_BASE_URL}/products/search/products?search_term=${searchTerm}&limit=${limit}`
    );
  }
}


export {
  ProductAction,
  GetProductAction,
  GetProductsAction,
  AddProductAction,
  UpdateProductAction,
  DeleteProductAction,
  SearchProductAction,
};