@ui
Feature: Input functionality of The Internet Guinea Pig Website Input 
    
    Scenario Outline: As a user, I can enter the numbers into the input box

        Given I am on the input page
        Then I enter <data> into input box
        Examples:
        | data          |
        | 1425          |
        | 1234567898765 |