Feature: API Testing with Playwright and Cucumber

  Scenario: Sending a GET request
    Given a valid JSON file "request.json"
    When I send a "GET" request to "/api/v1/users"
    Then the response status code should be 200

  Scenario: Sending a POST request
    Given a valid JSON file "request.json"
    When I send a "POST" request to "/api/v1/users"
    Then the response status code should be 201
    And the response data should match the expected data in "expectedResponse.json"
