import { request, APIRequestContext } from "playwright";
export class ApiClient {



    constructor(private context: APIRequestContext) {


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
            data: await response.json(),
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
            data: await response.json(),
            statusText: response.statusText()
        };
    }


}