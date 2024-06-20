# Jane is a clinical therapist and wants her clients to answer simple questionnaires in order to better understand them. She needs a way to add/delete/edit questions and also see the answers of each client.

This is a simple API to create/edit/delete Users, Questions, and Answers.

# Setup

To run the app locally you will first need to create the database. There is a docker-compose.yml file that creates 2 Databases (1 for tests and the other for local development).
If we wanted to deploy to a production DB we would need to connect to a AWS RDS or similar (I skipped that part for this demo).

# Create the Postgres DB container (Check docker-compose to see the details)

docker-compose up -d

# Seed the DB with some users (Keep in mind that it will drop the current DB)

npm run seed:users

# Run the tests

I've written some end to end tests, the tests hit a testing database that is recreated and pre-populated with mock data for each test.
We could also write some unit tests but for this project we did not have much business logic to test so I just went with the end to end ones.

npm run test

# Start the server

npm run start

# Observations

I've tried to structure the code in different folder separating concerns to make it easier to read. I used Sequelize for simplicity but I also like TypeOrm for bigger projects. (requires dependency injection setup)

There is a config file with the DB configurations, ideally we shouldn't commit users and passwords to the repo, we could use AWS Secrets instead, but for this example I just kept it simple.
