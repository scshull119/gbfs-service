# gbfs-service

## Purpose
This is a backend service that reads and processes data from [General Bikeshare Feed Specification (GBFS)](https://github.com/NABSA/gbfs/blob/master/gbfs.md) data feeds.  Current functionality is limited to polling and caching of data and provision of an API for use by front-end applications.  Eventually this service may support the parsing of event data from changes in feed state, and the persistance of historical event data in a database for ongoing analysis.

## Tech Stack
* Node JS
* Express
