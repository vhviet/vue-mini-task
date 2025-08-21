import type { QuasarPluginOptions } from "quasar";
import { Dialog, Notify, Loading } from "quasar";

const quasarConfig: QuasarPluginOptions = {
  config: {
    brand: {
      primary: "#1976D2",
      secondary: "#26A69A",
      accent: "#9C27B0",
      dark: "#1D1D1D",
      positive: "#21BA45",
      negative: "#C10015",
      info: "#31CCEC",
      warning: "#F2C037",
    },
  },
  plugins: {
    Notify,
    Dialog,
    Loading,
  },
};

export default quasarConfig;
