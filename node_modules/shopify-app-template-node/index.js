// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

// app.get("/api/product/list", async (_req, res) => {
//   const allProduct = await shopify.api.rest.Product.all({
//     session: res.locals.shopify.session,
//   });

//   res.status(200).send(allProduct);
// });

// app.get("/api/products/count", async (_req, res) => {
//   const countData = await shopify.api.rest.Product.count({
//     session: res.locals.shopify.session,
//   });

//   // const meta = await shopify.api.rest.Metafield.find({
//   //   session: res.locals.shopify.session,
//   //   product_id: 7856417046666,
//   //   id: 44053951381642,
//   // });

//   // const client = new shopify.api.clients.Graphql({
//   //   session: res.locals.shopify.session,
//   // });

//   res.status(200).send(countData);
// });

app.get("/api/store", async (req, res) => {
  try {
    const shopData = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });

    console.log("store data", shopData.data[0]);

    const name = shopData?.data[0].name;
    console.log("name", name);
    res.status(200).json(name);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/product/createMetafield", async (_req, res) => {
  console.log("called");

  const CREATE_METAFIELD = `mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
    metafieldDefinitionCreate(definition: $definition) {
      createdDefinition {
        id
        name
      }
      userErrors {
        field
        message
        code
      }
    }
  }`;
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });
    await client.query({
      data: {
        query: CREATE_METAFIELD,
        variables: {
          definition: {
            name: "Bigsurmoon_Embed",
            namespace: "bsmCode",
            key: "src",
            description: "Past the embed code here to view our configurator",
            type: "single_line_text_field",
            ownerType: "PRODUCT",
            pin: true,
          },
        },
      },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Failed in metacreate", error.message);
    res.status(500).send({ success: false, error });
  }
});

// app.get("/api/products/create", async (_req, res) => {
//   let status = 200;
//   let error = null;

//   try {
//     await productCreator(res.locals.shopify.session);
//   } catch (e) {
//     console.log(`Failed to process products/create: ${e.message}`);
//     status = 500;
//     error = e.message;
//   }
//   res.status(status).send({ success: status === 200, error });
// });

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
