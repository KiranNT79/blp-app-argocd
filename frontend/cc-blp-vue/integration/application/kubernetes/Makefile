

.PHONY: deploy deploy-cmgmoru2 deploy-dtmod34 deploy-usermgm deploy-incar deploy-fagrg ingress-controller clean-cluster
#This target will be run in a clean cluster without any particular releases or any Ingres controllers
init: ingress-controller

deploy: deploy-ush deploy-drm deploy-cmgmoru2 deploy-dtmod34 deploy-usermgm deploy-incar deploy-frgat deploy-vin-list-management deploy-e3-1-1-dlcm-gate deploy-test-vin-management
undeploy: undeploy-ush undeploy-vin-list-management undeploy-cmgmoru2 undeploy-dtmod34 undeploy-usermgm undeploy-incar undeploy-frgat undeploy-e3-1-1-dlcm-gate undeploy-test-vin-management
##Deployments
deploy-cmgmoru2:
	cd campaign-management-oru2; \
	helm upgrade --install -f values-local.yaml campaign-management-oru2 .
deploy-dtmod34:
	cd deployment-tracking-mod34; \
	helm upgrade --install -f values-local.yaml deployment-tracking-mod34 .
deploy-croru23:
	cd campaign-reporting-oru23; \
	helm upgrade --install -f values-local.yaml campaign-reporting-oru23 .
deploy-incar:
	cd in-car-app; \
	helm upgrade --install -f values-local.yaml in-car-app .
deploy-frgat:
	cd frontend-gateway;  \
    helm upgrade --install -f values-local.yaml frontend-gateway .
deploy-drm:
	cd drm;  \
	helm upgrade --install -f values-local.yaml drm .
deploy-e311oru:
	cd e3-1-1-oru-analytics; \
	helm upgrade --install -f values-local.yaml e3-1-1-oru-analytics .
deploy-datamgmt:
	cd data-load-management; \
	helm upgrade --install -f values-local.yaml data-load-management .
deploy-superset:
	cd superset-custom-auth; \
	helm upgrade --install -f values-local.yaml superset-custom-auth -n superset-custom-auth --create-namespace .
deploy-vin-list-management:
	cd vin-list-management; \
	helm upgrade --install -f values-local.yaml vin-list-management .
deploy-test-vin-management:
	cd test-vin-management; \
	helm upgrade --install -f values-local.yaml test-vin-management .
deploy-mocks:
	cd mocks; \
	helm upgrade --install -f values-local.yaml mocks -n mocks --create-namespace .

ingress-controller:
		helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx; \
        helm repo update; \
        cd ingress-controller; \
        helm install nginx-ingress ingress-nginx/ingress-nginx --namespace ingress-basic --set controller.replicacount=2 --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux --create-namespace
remove-ingress-controller:
	helm uninstall nginx-ingress --namespace ingress-basic

undeploy-cmgmoru2:
	helm uninstall campaign-management-oru2;
undeploy-dtmod34:
	helm uninstall deployment-tracking-mod34;
undeploy-croru23:
	helm uninstall campaign-reporting-oru23;
undeploy-incar:
	helm uninstall in-car-app;
undeploy-frgat:
	helm uninstall frontend-gateway;
undeploy-e311oru:
	helm uninstall e3-1-1-oru-analytics;
undeploy-superset:
	helm uninstall superset-custom-auth -n superset-custom-auth;
undeploy-vin-list-management:
	helm uninstall vin-list-management;
undeploy-datamgmt:
	helm uninstall data-load-management;
undeploy-e3-1-1-dlcm-gate:
	helm uninstall e3-1-1-dlcm-gate;
undeploy-test-vin-management:
	helm uninstall  test-vin-management;
undeploy-mocks:
	helm uninstall mocks -n mocks;

#clean-cluster form DLCM
clean-cluster: undeploy remove-ingress-controller
