---
name: User Story
about: This template defines a user story
title: ''
labels: ''
assignees: ''

---

As a user
I need to share and find posted gifts, as well as comment on them
So that I can communicate with others and spread joy

Details and Assumptions:
-Users must have an account to post a gift, comment, or modify credentials.
-Guests can browse available gifts but cannot comment or post.
-Users can log in, log out, and update their account details.

Acceptance Criteria:

-Scenario: Posting a new gift
Given I am logged in
When I click the "Post a Gift" button and fill in the details
Then the gift should be available for others to see

-Scenario: Finding a posted gift
Given there are gifts posted in the system
When I browse or search for gifts
Then I should see a list of available gifts

-Scenario: Commenting on a gift
Given I am logged in and viewing a posted gift
When I submit a comment
Then my comment should appear under the gift

-Scenario: Modifying user credentials
Given I am logged in
When I navigate to my profile settings and update my information
Then my credentials should be updated

-Scenario: Logging in
Given I have an existing account
When I enter my credentials and click "Login"
Then I should be granted access to my account

-Scenario: Logging out
Given I am logged in
When I click the "Logout" button
Then I should be logged out and redirected to the homepage
