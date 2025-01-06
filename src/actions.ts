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

class ManageStockAction implements ProductAction {
  async execute(data: {
    productId: string;
    quantity: number;
    action: "add" | "update" | "remove";
  }) {
    const { productId, quantity, action } = data;

    const endpointMap = {
      add: "POST",
      update: "PUT",
      remove: "DELETE",
    };

    const response = await axios({
      method: endpointMap[action],
      url: `${process.env.API_BASE_URL}/products/${productId}/stock`,
      data: { quantity },
    });

    return response;
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
  ManageStockAction,
};
