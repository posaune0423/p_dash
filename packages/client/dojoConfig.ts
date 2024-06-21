import { createDojoConfig } from "@dojoengine/core";
import manifest from "../contracts/manifests/dev/manifest.json";

export const dojoConfig = createDojoConfig({
  manifest,
});
