import { Home } from "../pages/home.pages"
import { test as base } from "@playwright/test"

type MyFixture = {


    home: Home
}


export const test = base.extend<MyFixture>({


    home: async ({ page }, use) => {

        await use(new Home(page));


    }

})