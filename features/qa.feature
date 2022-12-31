Feature: Table Q&A
  Background:
    Given user is on the Overview page

  @current
  Scenario: User gets to the playground of Table Q&A
    When user opens Table Q&A in the Overview page
    Then user is on the playground of Table Q&A


  Scenario: Generating the answer on the default question
    When user opens Table Q&A page
    And user generates an answer
    Then user gets the answer '5700'