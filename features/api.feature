@api
Feature: API Testing with Playwright and Cucumber

  Scenario Outline: Sending a GET request
    Given a valid JSON file <requestFile>
    When I send a <httpMethod> request to <endPoint>
    Then the response status code should be <expectedStatusCode>

    Examples:
      | requestFile | httpMethod | endPoint | expectedStatusCode |
      | request.json| GET        | /posts/1 | 200                |

  # Scenario: Sending a POST request
  #   Given a valid JSON file "request.json"
  #   When I send a POST request to "/posts"
  #   Then the response status code should be 201
  #   And the response data should match the expected data in "expectedResponse.json"
