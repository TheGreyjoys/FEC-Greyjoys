https://learn-2.galvanize.com/cohorts/3231/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/interactions.md

1) POST '/interactions'
  - adds an interaction to the database.
  - unsure how this is going to be used, it expects 3 parameters
  - time - when the interaction occurred
  - widget - name of the module/widget inside of which the cliock occurred
  - element - selector for the element that was clicked
  - based on that, maybe this is used for metrics or testing or something??
  - returns a status 201 or 422 (unprocessable entry)