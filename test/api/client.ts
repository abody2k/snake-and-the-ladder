import { request, APIRequestContext } from "playwright";
export class ApiClient {



    constructor(private context: APIRequestContext) {


    }

    isJson(text: string) {

        try {
            JSON.parse(text);
        } catch (error) {

            return false;

        }
        return true;
    }

    static async createClient() {
        return new ApiClient(await request.newContext({
            baseURL: process.env.BASE_URL,

            extraHTTPHeaders: {

                'Content-Type': "application/json"
            }
        }))

    }


    async post(url: string, data: {}, token?: string) {

        let response;
        if (token) {
            response = await this.context.post(url, {

                data: data,
                headers: {
                    "Authorization": `Bearer ${token}`
                }


            });
        } else {
            response = await this.context.post(url, {

                data: data,


            });
        }

        return {
            status: response.status(),
            data: this.isJson(await response.text()) ? await response.json() : (await response.text()),
            statusText: response.statusText()
        };

    }


    async get(url: string, token?: string) {

        let response;
        if (token) {

            response = await this.context.get(url, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }

            });

        } else {

            response = await this.context.get(url);
        }


        return {
            status: response.status(),
            data: this.isJson(await response.text()) ? await response.json() : (await response.text()),
            statusText: response.statusText()
        };
    }


}