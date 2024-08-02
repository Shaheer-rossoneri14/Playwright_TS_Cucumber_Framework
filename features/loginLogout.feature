Feature: The Login and Logout functionality of Internet Guinea Pig Website

    Scenario Outline: As a user, I can log into the secure area and logout of the secure area using valid credentials
        Given I am on the login page
        When I login with <username> and <password>
        Then I should see a flash message saying <loginmessage>
        Given I am on the secure page
        When I click on the Logout button
        Then I should be navigated to the login page and I should see a flash message saying <logoutmessage>

        Examples:
        | username | password             | loginmessage                   | logoutmessage                      |
        | tomsmith | SuperSecretPassword! | You logged into a secure area! | You logged out of the secure area! |

    Scenario Outline: As a user, I should not be able to log into the secure area using invalid credentials
        Given I am on the login page
        When I login with <username> and <password>
        Then I should see a flash message saying <failedloginmessage>

        Examples:
        | username  | password             | failedloginmessage        |
        | tomsmith  | password123          | Your password is invalid! |
        | adamsmith | SuperSecretPassword! | Your username is invalid! |
