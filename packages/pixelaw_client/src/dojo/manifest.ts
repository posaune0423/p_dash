import manifestDev from "../../../contracts/manifests/dev/manifest.json";
import manifestStg from "../../../contracts/manifests/slot/manifest.json";

export const manifest = import.meta.env.PROFILE === "dev" ? manifestDev : manifestStg;
