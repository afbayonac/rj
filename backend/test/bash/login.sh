# autenticate with a JWT
# for a user alfil and password mate

#test to a localhost
URL='http://localhost:3000/login'
STR='HTTP/1.1 2'
Token="authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\
eyJ1c2VyIjoiYWxmaWwiLCJpYXQiOjE0Nzk4NDg4NDh9.\
37b8wdoLX5ncHhUWFuvXcnH6BzkG8FRWQyxSXeQNsac"

# autenticate --> retun a Token
A="$(curl -X POST -s --data "user=root&password=root" $URL -i \
    | grep -c -s 'HTTP/1.1 200 OK' )"

if [ $A -eq "1" ]; then
   echo "authenticate ok"
else
   echo "autenticate fail"
fi

# autenticate bad --> retun a bad request
A="$(curl -X POST -s --data "user=root" $URL -i \
  | grep -c -s 'HTTP/1.1 400 Bad Request' )"

if [ $A -eq "1" ]; then
  echo "bad request ok"
else
  echo "bad request fail"
fi

# autenticate fail --> retun a autentiaficacion fallida
A="$(curl -X POST -s --data "user=root&password=root1" $URL -i \
  | grep -c -s 'HTTP/1.1 401 Unauthorized' )"

if [ $A -eq "1" ]; then
  echo "Unauthorized request ok"
else
  echo "Unauthorized request fail"
fi

# check Token --> chequea el funcionamiento del Token
A="$(curl -s -X GET -H "$Token" $URL -i | grep -c -s 'HTTP/1.1 404 Not Found' )"

if [ $A -eq "1" ]; then
  echo "bad request ok"
else
  echo "bad request fail"
fi
