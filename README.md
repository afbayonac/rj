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
    ├─ ■ config.json              # Claves de configuración
    ├─ app.js                     # Configuración de la aplicación
    ├─ .gitignore                 # archivos ignorados git
    ├─ README.md
    ┴
    NOTE: ■ archivos ignorados



## Web API


| URL | METHOD | Descripcion |
|-----|:--------:|-------------|
| /login   | POST | autentificacion |

##  Enviroment config

    Configurar la variable de entorno NODE_ENV
    export NODE_ENV = "[Enviroment]"
    en el sell o en el Archivo .bashrc

    copiar el archivo rjcfg.json en la raíz del proyecto 
    NOTE: (no se encuentra en el repo)
