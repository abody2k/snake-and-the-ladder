import { Locator, Page } from "@playwright/test";

export class Auth {


    loginButton: Locator
    signUpButton: Locator
    constructor(private page: Page) {

        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.signUpButton = page.getByRole('button', { name: 'Sign up' })




    }


    async fillUsername(username: string) {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    }



    async fillPassword(password: string) {
        await this.page.getByRole('textbox', { name: 'password' }).fill(password);
    }


    async switchBetweenLoginAndSignUp() {

        await this.page.getByRole('button', { name: 'Click here if you want to' }).click()
    }


}