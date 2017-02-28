# send mail with nodemailer

# path
if [[ "$NODE_ENV" == "local" ]]; then
  path="$HOME/Hobbies/remates-judiciales"
fi
if [[ "$NODE_ENV" == "development" ]]; then
  path="$HOME/remates-judiciales"
fi

module="'$path/controllers/dailyReport.js'"
response=$( node -e "require( $module ) ();" )
if [[ "$response" == "Message sent" ]]; then
  echo "daily report ok"
else
  echo "daily report fail"
fi
