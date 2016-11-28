# send mail with nodemailer

response=$(node -e "require( '/home/felipe/Hobbies/remates-judiciales/controllers/dailyReport.js' )();")
if [[ "$response" == "Message sent" ]]; then
  echo "daily report ok"
else
  echo "daily report fail"
fi
