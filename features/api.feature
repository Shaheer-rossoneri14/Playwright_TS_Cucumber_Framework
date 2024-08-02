@api
Feature: API Testing with Playwright and Cucumber

  Scenario Outline: Sending a GET request
    Given a valid JSON file <requestFile>
    When I send a <httpMethod> request to <endPoint>
    Then the response status code should be <expectedStatusCode>

    Examples:
      | requestFile     | httpMethod | endPoint | expectedStatusCode |
      | getRequest.json | GET        | /posts/1 |                200 |

  Scenario Outline: Sending a POST request
    Given a valid JSON file <requestFile>
    When I send a <httpMethod> request to <endPoint>
    Then the response status code should be <expectedStatusCode>
    And the response data should match the expected data in <expectedResponseFile>

    Examples:
      | requestFile      | httpMethod | endPoint | expectedStatusCode | expectedResponseFile |
      | postRequest.json | POST       | /posts   |                201 | postResponse.json    |

  Scenario Outline: Sending a PUT request
    Given a valid JSON file <requestFile>
    When I send a <httpMethod> request to <endPoint>
    Then the response status code should be <expectedStatusCode>
    And the response data should match the expected data in <expectedResponseFile>

    Examples:
      | requestFile        | httpMethod | endPoint | expectedStatusCode | expectedResponseFile |
      | updateRequest.json | PUT        | /posts/1 |                200 | updateResponse.json  |

  Scenario Outline: Sending a PATCH request
    Given a valid JSON file <requestFile>
    When I send a <httpMethod> request to <endPoint>
    Then the response status code should be <expectedStatusCode>
    And the response data should match the expected data in <expectedResponseFile>

    Examples:
      | requestFile       | httpMethod | endPoint | expectedStatusCode | expectedResponseFile |
      | patchRequest.json | PATCH      | /posts/1 |                200 | patchResponse.json   |

  Scenario Outline: Sending a DELETE request
    Given a valid JSON file <requestFile>
    When I send a <httpMethod> request to <endPoint>
    Then the response status code should be <expectedStatusCode>

    Examples:
      | requestFile        | httpMethod | endPoint | expectedStatusCode |
      | deleteRequest.json | DELETE     | /posts/1 |                200 |
