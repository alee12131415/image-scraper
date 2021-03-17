# image-scraper

* CRUD services for jobs
  * ~~Each job needs url to scrape and results of job-~~
  * ~~application should handle multiple urls~~

* ~~Trigger a new scrape~~

* ~~Identify if scrape is complete or in progress~~

* ~~Retreive the largest image for any given URL~~

* ~~Utilize a database (PSQL)~~

* ~~Able to scrape http and https~~

TODO: Frontend
* ~~List of URL scrapes (in progress and complete)~~

* ~~Clicking on a scrapes shows details~~
  * url
  * start date time
  * status
  * largest image (even if in progress)

* ~~text field to add another scrape~~

API

GET /api/scrape/:id
GET /api/scrape?ids=comma,seperated,ids

POST /api/scrape json {"url": String|String[]}

DELETE /api/scrape/:id

NO PUT/UPDATE as app doesn't need it?
