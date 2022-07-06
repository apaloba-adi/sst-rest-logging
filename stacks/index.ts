import { MainApi } from "./MainApi";
import { App } from "@serverless-stack/resources";
import { Storage } from "./Storage";
import {SiteStack} from "./Web"

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: 'python3.9',
    srcPath: "services"
  });
  app.stack(Storage).stack(MainApi).stack(SiteStack);
}
