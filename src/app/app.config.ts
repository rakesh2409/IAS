import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export class IAppConfig {
    apiEndpoint: string;
    apiEndpointAuth: string;
}

export const AppConfig: IAppConfig = {
    apiEndpoint: "http://localhost:8080/iasbackend/api/",
    apiEndpointAuth: "http://localhost:8080/api/"
};
