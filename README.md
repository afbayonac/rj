# Remates Judiciales Colombia

aplicacion web para recolectar información acerca de remates judiciales

## Estructura de Ficheros

En el siguiente diagrama se describe la estructura de ficheros que se manejara.


    ┬
    ├─ backend/                   # service backend
    │  └ controllers/
    │  └ bin/
    │    └ www                        # Punto de inicio de la aplicación
    │  └ test/                      # Scripts test
    │    └ bash/
    │  └ routes/                    # Ruteo de la aplicacion API-REST
    │  └ cron/                      # Tareas de ejecución programada
    │  └ models/                    # Modelos de la base de datos mongo
    │  └ ■ node_modules/
    │  └ package.json
    │  └ ■ rjcfg.json               # configuración secret
    │  └ ■ logs/                    # logs
    │  └ app.js                     # Configuración de la aplicación
    ├─ docs/                      # Documentación de la aplicación
    ├─ frontend/                  # service frontend
    ├─ .gitignore                 # archivos ignorados git
    ├─ docker-compose.yml
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
