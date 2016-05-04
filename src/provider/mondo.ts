import { IOauthProvider } from "../oauth";
import { OauthUtility } from "../utility";

declare var window: any;
const PROVIDER_NAME = "Mondo";

/*
 * Configuration options for using Mondo oauth
 */
export interface IMondoOptions {
    clientId?: String;
    redirectUri?: String;
    stateToken?: String;
}

export class Mondo implements IOauthProvider {

    MondoOptions: IMondoOptions;
    flowUrl: String;

    constructor(options: IMondoOptions={}) {
        if(!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        this.MondoOptions = options;
        this.MondoOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.flowUrl = "https://auth.getmondo.co.uk/?client_id=" + this.MondoOptions.clientId + "&redirect_uri=" + this.MondoOptions.redirectUri + "&response_type=code&state=" + this.MondoOptions.stateToken;
    }

    login() {
        return new Promise((resolve, reject) => {
            var browserRef = window.cordova.InAppBrowser.open(this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf(this.MondoOptions.redirectUri) === 0) {
                    browserRef.removeEventListener("exit", (event) => {});
                    browserRef.close();
                    var parsedResponse = (new OauthUtility()).parseImplicitResponse(((event.url).split("#")[1]).split("&"));
                    if (parsedResponse) {
                        resolve(parsedResponse);
                    } else {
                        reject("Problem authenticating with " + PROVIDER_NAME);
                    }
                }
            });
            browserRef.addEventListener("exit", function(event) {
                reject("The " + PROVIDER_NAME + " sign in flow was canceled");
            });
        });
    }

}
