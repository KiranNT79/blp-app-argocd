<!--
(c) 2022 CARIAD SE, All rights reserved.

NOTICE:
All the information and materials contained herein, including the intellectual and technical concepts, are the property of CARIAD SE and may be covered by patents, patents in process, and are protected by trade secret and/or copyright law.
The copyright notice above does not evidence any actual or intended publication or disclosure of this source code, which includes information and materials that are confidential and/or proprietary and trade secrets of CARIAD SE.
Any reproduction, dissemination, modification, distribution, public performance, public display of or any other use of this source code and/or any other information and/or material contained herein without the prior written consent of CARIAD SE is strictly prohibited and in violation of applicable laws.
The receipt or possession of this source code and/or related information does not convey or imply any rights to reproduce, disclose or distribute its contents or to manufacture, use or sell anything that it may describe in whole or in part.
-->

##install nginx on kuberenetes cluster 


### In AKS cluser we need it as internalload balnacer 
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install -f values.yaml nginx-ingress ingress-nginx/ingress-nginx --namespace ingress-basic  --set controller.replicacount=2 --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux


### Docker Desktop we can have it as external load balancer 
helm repo add nginx-stable https://helm.nginx.com/stable
helm repo update

helm install local-nginx nginx-stable/nginx-ingress

need to se how to install here. (like khutub did for aks )
