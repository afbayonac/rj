
# path
if [[ "$NODE_ENV" == "local" ]]; then
  path="$HOME/Hobbies/remates-judiciales"
fi
if [[ "$NODE_ENV" == "development" ]]; then
  path="$HOME/remates-judiciales"
fi

#write out current crontab
crontab -l > mycron
# module daily Report
module="'$path/controllers/dailyReport.js'"
#      mm hh dd MM W
echo ' 30  08  *  *  *  node -e "require( '$module' )();" ' >> mycron
#install new cron file
crontab mycron
rm mycron
