import { IOauthProvider } from "../oauth";
export interface IMondoOptions {
    clientId?: String;
    redirectUri?: String;
    stateToken?: String;
}
export declare class Mondo implements IOauthProvider {
    mondoOptions: IMondoOptions;
    flowUrl: String;
    constructor(options?: IMondoOptions);
    login(): Promise<{}>;
}
