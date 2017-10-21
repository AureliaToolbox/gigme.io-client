Logs
```
$ sudo tail /var/log/nginx/error.log /home/rails-demo/app/shared/log/*
```

Restart app / nginx
```
$ sudo service unicorn_aureliatoolbox start
$ sudo service nginx restart
```

nginx config -
```
$ sudo vim /etc/nginx/sites-available/aureliatoolbox
```

## Pre-requisites

1. MongoDb installed
2. rbenv-vars

## Deploying
