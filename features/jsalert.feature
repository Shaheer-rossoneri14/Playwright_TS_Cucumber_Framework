@ui @test
Feature: JavaScript Alerts Handling

    Scenario Outline: Handle JavaScript Alerts
        Given I am on the JavaScript Alerts page
        When I click on <buttonName> and I <alertAction> the alert with text <alertText>
        Then I should see the result message as <expectedMessage>

        Examples:
        | buttonName | alertAction | alertText | expectedMessage                   |
        | jsalert    | accept      |           | You successfully clicked an alert |
        | jsconfirm  | dismiss     |           | You clicked: Cancel               |
        | jsconfirm  | accept      |           | You clicked: Ok                   |
        | jsprompt   | accept      | Hello     | You entered: Hello                |
        | jsprompt   | dismiss     |           | You entered: null                 |
        | jsprompt12 | accept      |           |                                   |
        | jsalert    | deny        |           |                                   |
