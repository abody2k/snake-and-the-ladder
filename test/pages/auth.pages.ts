import { Locator, Page } from "@playwright/test";

export class Auth {


    loginButton: Locator
    signUpButton: Locator

    loggedInLabel: Locator
    switchingLocator: Locator

    constructor(private page: Page) {

        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.signUpButton = page.getByRole('button', { name: 'Sign up' })

        this.loggedInLabel = page.getByText('You Have already signed in!')
        this.switchingLocator = page.getByTitle("switch");


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

    getModal() {

        return this.page.getByTitle("modal id")
    }
    async clickOnLogin() {

        await this.loginButton.click();
    }


    async clickOnSignUp() {

        await this.page.getByTitle("signup").click({timeout:30000});
    }


    async clickOnLogOut() {

        await this.page.getByRole('button', { name: 'Click here to logout' }).click({force:true})
    }

}