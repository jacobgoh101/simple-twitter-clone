### Sample JIRA issues

- TWT-1 Base Project Setup
- TWT-2 As a new user, I want to register by creating a username and password.
- TWT-3 As a registered user, I want to log in with my username and password.
- TWT-4 As a registered user, I want to be able to change my password.
- TWT-5 As a registered user, I want to be able to request a new password so that I don't permanently lose access to my data if I forget it.
- TWT-6 As a logged-in user, I want to be able post a new tweet under my name.
- TWT-7 As a logged-in user, I want to be able to see tweets posted by other users.
- TWT-8 Setup staging server and deployment flow.

### How to setup local development environment

```sh
git clone git@github.com:jacobgoh101/simple-twitter-clone.git
cd simple-twitter-clone
cp .env.sample .env
yarn
yarn start
```

### How to deploy to staging

on your machine (or within a CI pipeline)

```sh
docker login --username jacobgoh101 --password-stdin
sh .script/create-staging-docker-image.sh
```

visit staging server
```
cd /root/simple-twitter-clone
docker-compose -f docker-compose.staging.yml pull
docker-compose -f docker-compose.staging.yml up -d
```
