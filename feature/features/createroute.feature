Feature: Create route with map
 
Scenario: Trying create route with map
  Given I go to create route with page
  When  I fill the title and description and I upload a video and a image
  And   I put the markers on the map and I save the route
  Then sends us to the timeline page
 