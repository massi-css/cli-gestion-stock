import * as p from "@clack/prompts";
import dotenv from "dotenv";
import ActionsFactory from "./actionsFactory";
import { ChoiceType } from "./types";
import color from "picocolors";

const main = async () => {
  console.clear();
  dotenv.config();

  const factory = new ActionsFactory();
  p.updateSettings({
    aliases: {
      w: "up",
      s: "down",
      a: "left",
      d: "right",
    },
  });
  p.intro(
    `${color.bgCyan(color.black(" Welcome to Product Management CLI "))}`
  );

  while (true) {
    const choice = await p.select({
      message: "Select an action to perform:",
      options: factory.getChoices().map((c) => ({
        label: c.desc,
        value: c,
      })),
    });

    if (!choice) {
      p.log.error("No action selected. Exiting.");
      p.outro("Goodbye!");
      return;
    }

    factory.setChosen(choice as ChoiceType);

    const action = factory.createAction();
    if (action) {
      switch ((choice as ChoiceType).title) {
        case "get_product": {
          const productId = (await p.text({
            message: "Enter the product ID:",
          })) as string;
          const s = p.spinner();
          s.start("Fetching product details...");
          try {
            const result = await action.execute(productId);
            s.stop("Product details fetched successfully.");
            p.log.success(`Product details :`);
            console.table(result.data);
          } catch (e: any) {
            if (e.status === 404) {
              s.stop("Product not found.");
            } else {
              s.stop(e.message);
            }
          }
          break;
        }
        case "get_products": {
          const s = p.spinner();
          s.start("Fetching products list...");
          try {
            const result = await action.execute();
            s.stop("Products list fetched");
            p.log.success(`Products list :`);
            console.table(result.data);
          } catch (e: any) {
            s.stop(e.message);
          }
          break;
        }
        case "add_product": {
          const name = (await p.text({
            message: "Enter product name:",
            initialValue: "New Product",
          })) as string;
          const description = (await p.text({
            message: "Enter product description:",
            initialValue: "New Product Description",
          })) as string;
          const price = parseFloat(
            (await p.text({
              message: "Enter product price:",
              initialValue: "1000",
            })) as string
          );
          const quantity = parseInt(
            (await p.text({
              message: "Enter product quantity:",
              initialValue: "10",
            })) as string
          );
          const product = { name, description, price, quantity };
          const s = p.spinner();
          s.start("Adding product...");
          try {
            const result = await action.execute(product);
            s.stop("Product added successfully.");
            p.log.success(`Product added:`);
            console.table(result.data);
          } catch (e: any) {
            s.stop(e.message);
          }
          break;
        }
        case "update_product": {
          const productId = (await p.text({
            message: "Enter the product ID to update:",
          })) as string;
          const name = (await p.text({
            message: "Enter new product name:",
            initialValue: "example name",
          })) as string;
          const description = (await p.text({
            message: "Enter new product description:",
            initialValue: "example description",
          })) as string;
          const price = parseFloat(
            (await p.text({
              message: "Enter new product price:",
              initialValue: "1000",
            })) as string
          );
          const quantity = parseInt(
            (await p.text({
              message: "Enter new product quantity:",
              initialValue: "100",
            })) as string
          );
          const updatedProduct = { name, description, price, quantity };
          const s = p.spinner();
          s.start("Updating product...");
          try {
            const result = await action.execute(productId, updatedProduct);
            s.stop("Product updated successfully.");
            p.log.success(`Product updated:`);
            console.table(result.data);
          } catch (e: any) {
            s.stop(e.message);
          }
          break;
        }
        case "delete_product": {
          const productId = (await p.text({
            message: "Enter the product ID to delete:",
          })) as string;
          const shouldContinue = await p.confirm({
            message: "Are you sure you want to delete this product?",
            initialValue: false,
          });
          if (!shouldContinue) {
            p.log.info("Operation cancelled.");
            break;
          }
          const s = p.spinner();
          s.start("Deleting product...");
          try {
            await action.execute(productId);
            s.stop("Product deleted successfully.");
          } catch (e: any) {
            s.stop(e.message);
          }
          break;
        }
        case "search_product": {
          const searchTerm = (await p.text({
            message: "Enter the search term:",
            initialValue: "example search",
          })) as string;
          const limit = parseInt(
            (await p.text({
              message: "Enter the number of results to fetch:",
              initialValue: "10",
            })) as string
          );
          const s = p.spinner();
          s.start("Searching products...");
          try {
            const result = await action.execute(searchTerm, limit);
            s.stop("Products searched successfully.");
            p.log.success(`Search results:`);
            console.table(result.data);
          } catch (e: any) {
            s.stop(e.message);
          }
          break;
        }
        default:
          p.log.error("Invalid action selected.");
      }
    } else {
      p.log.error("Invalid action selected.");
    }
    const shouldContinue = await p.confirm({
      message: "Do you want to perform another action?",
      initialValue: true,
    });
    if (!shouldContinue) {
      p.log.info("Exiting...");
      p.outro("Thank you for using Product Management CLI.");
      return;
    }
  }
};

p.confirm({
  message: "Do you want to run the program again?",
  initialValue: false,
});

await main().catch((e: any) => {
  p.log.error(`An error occurred: ${e.message}`);
});
