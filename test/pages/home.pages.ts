import { Page } from "playwright"
export class Home {


    constructor(private page: Page) {


    }

    async goHome() {

        await this.page.goto(process.env.BASE_URL);

    }

    async clickOnHomeIcon() {

        await this.page.getByRole('link', { name: 'Home' }).click();
    }




}