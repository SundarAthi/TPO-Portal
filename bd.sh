ng build --prod
docker build -t registry.pro-us-east-1.openshift.com/esign-handler/tpo-portal:latest .
docker push registry.pro-us-east-1.openshift.com/esign-handler/tpo-portal:latest
