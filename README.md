# VIADE ES2C
 [![Build Status](https://travis-ci.org/Arquisoft/viade_es2c.svg?branch=master)](https://travis-ci.org/Arquisoft/viade_es2c) [![codecov](https://codecov.io/gh/Arquisoft/viade_es2c/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_es2c) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/6ed5f250f3ea4a849db4cd369a01bb8c)](https://www.codacy.com/gh/Arquisoft/viade_es2c?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_es2c&amp;utm_campaign=Badge_Grade) [![Version Badge](https://img.shields.io/badge/Version-1.0-<COLOR>.svg)](https://arquisoft.github.io/viade_es2c) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Arquisoft/viade_es2c/graphs/commit-activity) [![Website cv.lbesson.qc.to](https://img.shields.io/website-up-down-green-red/http/cv.lbesson.qc.to.svg)](https://arquisoft.github.io/viade_es2c/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg)](https://github.com/Naereen/badges)
 <p align="center">
  <img src="https://user-images.githubusercontent.com/49797815/79112818-c228e500-7d7f-11ea-9b79-e1489e63d1de.png">
</p>

## DESCRIPTION
Viade is a decentralized routes management system based on the solid specifications and React framework. It is a project from the Software Architecture course taught in "Universidad de Oviedo" and its purpose is to teach the students how to work in a real project and how to create a good project architecture. We also are learning how good documentation is made and how to interact with the rest os the programmers of the world using forums or chats.

## About us
We are the students who form the "ES2C" group of creating the Viade app, here you can find some information about us:

- Ana María García Sánchez UO264030 [@AnaGciaSchz](https://github.com/AnaGciaSchz)
- Jaime López Montero UO257745 [@jaimeknd77](https://github.com/jaimeknd77)
- Elmer José Cortez Sanjinez [@UO257192](https://github.com/UO257192)
- Diego Santos Neila UO264872 [@UO264872](https://github.com/UO264872)

Feel free to contact us whenever you want!

## Content
This repository contains our progress developing Viade, that includes code and documentation.

## Interesting links
This project is an assignment for the [Software Architecture course](https://arquisoft.github.io/) following [these requirements](https://labra.solid.community/public/SoftwareArchitecture/AssignmentDescription/).

The app is deployed at [https://arquisoft.github.io/viade_es2c/](https://arquisoft.github.io/viade_es2c/) which also contains a [technical documentation](https://arquisoft.github.io/viade_es2c/docs).

More information about how this project has been setup is available [in the wiki](https://github.com/Arquisoft/viade_es2c/wiki).

## Use Viade
To use viade you have various options:

### Clone the repository
You can create a folder and clone this repository on it executing.

Then, you will need to execute 

```shell
npm install
``` 
Remember to download NodeJS before. You need to do that so the libraries and dependencies that Viade uses can be downloaded into your computer.

Last, you just need to execute 

```shell
npm run start
``` 
And viade will be deployed in http:localhost:3000.

### Use Docker
As you can see, we have a Dockerfile and a docker-compose.yml file in our repositoy. You can use them to create a docker image of viade an execute it into a docker container.

To do that, you just need to clone this repository and execute the following command into the folder that was created:

```shell
sudo docker-compose up -d
```

### Use the gh-pages version
The easiest way to try Viade is to go to this link [https://arquisoft.github.io/viade_es2c/](https://arquisoft.github.io/viade_es2c/). It shows the master branch version of Viade and you wont need to download anything
