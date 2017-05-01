import * as path from 'path'
import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as prettyError from 'pretty-error'
import * as debug from 'debug'
import {connect} from 'mongoose'
import {router} from './routes/router'

// config debug
const dbug = debug('rj:database')

// import config
import {cfg} from './cfg/cfg'

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application

  // Run configuration methods on the Express instance.
  constructor () {
    this.express = express()
    this.middleware()
    this.routes()
    let pe = new prettyError()
    pe.withoutColors()
    this.errorHandler(pe)
    this.connectDatabase()
  }

  // Configure Express middleware.
  private middleware (): void {
    this.express.use(logger(cfg.logger))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  // Configure API endpoints.
  private routes (): void {
    this.express.use('/', router)
  }

  private errorHandler (pe: prettyError): void {

    this.express.use(function (err, req, res, next) {
      console.log(pe.render(err))
      next()
    })
  }

  private connectDatabase () {
    let db = cfg.mongodb
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
     .connection
     .on('error', (err) => dbug(err))
     .on('open', () => dbug('database is opened'))
  }

}

export default new App().express
