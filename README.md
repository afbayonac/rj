# Remates Judiciales Colombia

servidor para recolectar información a cerca de remates judiciales

## Estructura de Ficheros

En el siguiente diagrama se describe la estructura de ficheros que se manejara.


    ┬
    ├─ ■ node_modules/            # librerias nodejs
    ├─ docs/                      # Documentación de la aplicación
    ├─ bin/
    │  └ www                      # Punto de inicio de la aplicación
    ├─ test/                      # Scripts testear aplicacion
    │  └ bash/                    # Escritos para bash
    ├─ routes/                    # Ruteo de la aplicacion API-REST
    ├─ cron/                      # Tareas de ejecución programada
    ├─ models/                    # Modelos de la base de datos mongo
    ├─ package.json               # Archivo de configuración de npm
    ├─ ■ rjcfg.json               # Claves de configuración
    ├─ ■ logs/                    # logs
    ├─ app.js                     # Configuración de la aplicación
    ├─ .gitignore                 # archivos ignorados git
    ├─ README.md
    ┴
    NOTE: ■ archivos ignorados

## Web API


| URL | METHOD | Descripcion | Authentication |
|-----|:------:|-------------|:--------------:|
| /login | POST | Autentificacion | false |
| /mine | GET | mina reamates | true |

## Docker

  El proyecto se maneja mediante imagenes de docker

     docker-compose build
     docker-compose up
     NOTE: falta init data base
