import {
  ProductAction,
  GetProductAction,
  GetProductsAction,
  AddProductAction,
  UpdateProductAction,
  DeleteProductAction,
  SearchProductAction,
} from "./actions";
import { ChoiceType, choiceEnum } from "./types";

class ActionsFactory {
  private choices: ChoiceType[] = [
    { title: "get_product", desc: "Get product by ID" },
    { title: "get_products", desc: "Get all products" },
    { title: "add_product", desc: "Add new product" },
    { title: "update_product", desc: "Update existing product" },
    { title: "delete_product", desc: "Delete existing product" },
    { title: "search_product", desc: "Search product by name/desc" },
  ];

  getChoices() {
    return this.choices;
  }

  createAction(choice: choiceEnum): ProductAction | null {
    switch (choice as string) {
      case "get_product":
        return new GetProductAction();
      case "get_products":
        return new GetProductsAction();
      case "add_product":
        return new AddProductAction();
      case "update_product":
        return new UpdateProductAction();
      case "delete_product":
        return new DeleteProductAction();
      case "search_product":
        return new SearchProductAction();
      default:
        return null;
    }
  }
}

export default ActionsFactory;
