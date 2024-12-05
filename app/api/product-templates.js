// @/pages/api/product-templates.js

import { getProductTemplates } from "@/actions/productLibrary/productTemplateActions";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const templates = await getProductTemplates();
      res.status(200).json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
