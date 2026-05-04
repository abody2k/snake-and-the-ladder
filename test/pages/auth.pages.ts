import { Locator, Page } from "@playwright/test";

export class Auth {


    loginButton: Locator
    signUpButton: Locator

    loggedInLabel: Locator

    constructor(private page: Page) {

        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.signUpButton = page.getByRole('button', { name: 'Sign up' })

        this.loggedInLabel = page.getByText('You Have already signed in!')



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


    async clickOnLogin() {

        await this.loginButton.click();
    }


    async clickOnSignUp() {

        await this.signUpButton.click();
    }


    async logOut() {

        await this.page.getByRole('button', { name: 'Click here to logout' }).click()
    }

}