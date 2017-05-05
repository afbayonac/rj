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

#### Doker

###### contrucion de la imagen

    $ docker build . --build-arg env=<NODE_ENV> -t <img-name>

  _ejemplo_

    docker build . --build-arg env=test -t test-rj

######  inizilizar contenerdor

    $ docker run -di -p 3000:3000 -v $(pwd):/app --name <cont-name> <img-name> <comand>

    NOTE: la opcion -d para que corra en background

  _ejemplo_

    docker run -di -p 3000:3000 -v $(pwd):/app --name test-rj test-rj /bin/bash

#### exec comand

    $ docker exec -i -t <cont-name> <comand>

  _ejemplo_

    $ docker exec -i -t  test-rj /bin/bash
