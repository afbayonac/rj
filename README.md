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
| /main | GET | mina reamates | true |

##  Enviroment config
  copiar el archivo rjcfg.json en la raíz del proyecto
  NOTE: (no se encuentra en el repo)

## Docker

  El proyecto se maneja mediante imagenes de docker

### subnet
  docker network create --subnet=172.1x.0.0/16 netrj

### image node:6.9.2

  la imagen adecuada a la nesesidad de el proyecto se
  encuentra en el sigiente enlace:
  docker pull afbayonac/remates-judiciales

### docker comand run

*  local :
    * docker run -t -i -P \
      -v $(pwd):/src/rj \
      --name rj \
      --net netrj \
      --ip 172.1x.0.3 \
      afbayonac/remates-judiciales:1.0.0 npm start
    *  docker start -i rj

### image mongo

  la imagen adecuada a la nesesidad de el proyecto se
  encuentra en el sigiente enlace:

### docker comand RUN

  docker run -d \
  -p 27017:27017 \
   --net netrj \
   --ip 172.1x.0.2 \
   --name mongo \
    mongo:3.4.0 mongod

NOTE: falta init data base
