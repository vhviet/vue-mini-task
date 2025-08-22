import type { QuasarPluginOptions } from "quasar";
import { Notify } from "quasar";
import quasarLang from "quasar/lang/vi";
import quasarIconSet from "quasar/icon-set/material-icons";

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
  },
  lang: quasarLang,
  iconSet: quasarIconSet,
};

export default quasarConfig;
