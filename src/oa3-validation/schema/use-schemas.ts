import { Schema } from "@hapi/joi";
import oas2joi from "oas2joi";
import { useEffect, useState } from "react";

let schemas: { [key: string]: Schema } | undefined;

export async function getSchemas() {
  if (!schemas) {
    schemas = (await oas2joi("assets/schema/minimal.json")) as { [key: string]: Schema };
  }
  return schemas;
}

export function useSchemas() {
  const [schemas, setSchemas] = useState<{ [key: string]: Schema }>();
  useEffect(() => {
    getSchemas()
      .then((schemas) => setSchemas(schemas))
      .catch((e) => console.error("Error while getting schemas!", e));
  }, []);

  return schemas;
}
