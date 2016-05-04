import { IOauthProvider } from "../oauth";
export interface IMondoOptions {
    clientId?: String;
    redirectUri?: String;
    stateToken?: String;
}
export declare class Mondo implements IOauthProvider {
    MondoOptions: IMondoOptions;
    flowUrl: String;
    constructor(options?: IMondoOptions);
    login(): Promise<{}>;
}
