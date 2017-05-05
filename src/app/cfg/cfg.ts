declare function require (moduleName: string): any

import {Icfg} from './Icfg'
process.env.NODE_ENV = process.env.NODE_ENV || 'develop'
export const cfg: Icfg  = require(`./env/${process.env.NODE_ENV}`)
