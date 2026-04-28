import { request, APIRequestContext } from "playwright";
class ApiClient {



    constructor(private context: APIRequestContext) {


    }

    static async createClient() {
        return new ApiClient(await request.newContext({

            extraHTTPHeaders: {

                'Content-Type': "application/json"
            }
        }))

    }




}