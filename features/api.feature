@api
Feature: API Testing with Playwright and Cucumber

  Scenario Outline: Sending a GET request
    Given a valid JSON file <requestFile>
    When I send a <httpMethod> request to <endPoint>
    Then the response status code should be <expectedStatusCode>

    Examples:
      | requestFile  | httpMethod | endPoint | expectedStatusCode |
      | request.json | GET        | /posts/1 |                200 |

  Scenario Outline: Sending a POST request
    Given a valid JSON file <requestFile>
    When I send a <httpMethod> request to <endPoint>
    Then the response status code should be <expectedStatusCode>
    And the response data should match the expected data in <expectedResponseFile>

    Examples:
      | requestFile  | httpMethod | endPoint | expectedStatusCode | expectedResponseFile  |
      | request.json | POST       | /posts   |                201 | expectedResponse.json |
