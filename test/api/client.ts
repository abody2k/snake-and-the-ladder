import { request, APIRequestContext } from "playwright";
class ApiClient {



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


    async post(url: string, data: {}) {

        const response = await this.context.post(url, {

            data: data,


        });

        return {
            status: response.status,
            data: await response.json(),
            statusText: response.statusText
        };
    }



}