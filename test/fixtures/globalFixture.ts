import { Auth } from "../pages/auth.pages"
import { Home } from "../pages/home.pages"
import { test as base } from "@playwright/test"

type MyFixture = {


    home: Home,
    auth: Auth
}


export const test = base.extend<MyFixture>({


    home: async ({ page }, use) => {

        await use(new Home(page));


    },

    auth: async ({ page }, use) => {

        await use(new Auth(page));
    }

})

export const expect = test.expect;