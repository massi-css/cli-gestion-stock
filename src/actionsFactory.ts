import {
    ProductAction,
    GetProductAction,
    GetProductsAction,
    AddProductAction,
    UpdateProductAction,
    DeleteProductAction,
    SearchProductAction,
  } from "./actions";
  import { ChoiceType } from "./types";


class ActionsFactory {
  private choices: ChoiceType[] = [
    { title: "get_product", desc: "Get product by ID" },
    { title: "get_products", desc: "Get all products" },
    { title: "add_product", desc: "Add new product" },
    { title: "update_product", desc: "Update existing product" },
    { title: "delete_product", desc: "Delete existing product" },
    { title: "search_product", desc: "Search product by name/desc" },
  ];

  private chosen: string | null = null;

  getChoices() {
    return this.choices;
  }

  setChosen(choice: ChoiceType) {
    this.chosen = choice.title;
  }

  createAction(): ProductAction | null {
    switch (this.chosen) {
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