import { Page } from "@playwright/test";

export class Auth {



    constructor(private page: Page) {



    }


    async fillUsername(username: string) {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    }


    
    async fillPassword(password: string) {
        await this.page.getByRole('textbox', { name: 'password' }).fill(password);
    }


}