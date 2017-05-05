rj
---
API-REST remates judiciales Colombianos

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

#### Gias de desarrollo.

* [Developing a RESTful API With Node and TypeScript](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WOGicoiGPDc)
* [Git Commit Message](https://github.com/slashsBin/styleguide-git-commit-message)
* [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
* [Gulp Organization & Structure](https://blog.simpleblend.net/gulp-organization-structure/)
* [JSDoc](http://usejsdoc.org/)

#### Doker compose

###### test
    $ docker-compose -f docker-compose.test.yml up -d --build
    $ docker attach <container_name>
###### develop
    $ docker-compose -f docker-compose.develop.yml up -d --build
###### production
    $ docker-compose -f docker-compose.yml up -d --build
