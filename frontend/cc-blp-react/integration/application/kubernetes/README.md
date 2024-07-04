<!--
(c) 2022 CARIAD SE, All rights reserved.

NOTICE:
All the information and materials contained herein, including the intellectual and technical concepts, are the property of CARIAD SE and may be covered by patents, patents in process, and are protected by trade secret and/or copyright law.
The copyright notice above does not evidence any actual or intended publication or disclosure of this source code, which includes information and materials that are confidential and/or proprietary and trade secrets of CARIAD SE.
Any reproduction, dissemination, modification, distribution, public performance, public display of or any other use of this source code and/or any other information and/or material contained herein without the prior written consent of CARIAD SE is strictly prohibited and in violation of applicable laws.
The receipt or possession of this source code and/or related information does not convey or imply any rights to reproduce, disclose or distribute its contents or to manufacture, use or sell anything that it may describe in whole or in part.
-->

# Introduction 
 This repository contains the helm Chart configurations of Kubernetes Cluster for DLCM Soulution

# Getting Started

1.	Installation process
      
    a. To deploy Control center in a local Kubernetes Cluster firts make sure you have a Cluster installed either docker-desktop or minikube
    b. Use Makefile for Deployment purposes
        1. make init (in a clean cluster it will install a ingress controller a load balancer ) 
        2. make deploy (will only deploy the microservices without the initial ingress controller)
        3. make clean-cluster ( will uninstall all microservices also the nginx ingress controller from the current cluster) 
        4. make deploy-incar (will only deploy in car app as well for each microservice exists a specific target to deploy only one microservice) 
        5. make undeploy-incar ( as well exist a target for each microservice to undeploy it)
Note: On the default configuration teh tag latest is used for the docker image build form DLCM, therefore helm upgrade will not pull yor new image on every build 
you will need to undeploy and deploy your microservice you just compiled. 

2. Minikube 
    For minikube only the First step is substituted with the following `minikube addons enable ingress` and everything else remains the same.

## Secrets
To run the cluster locally, you need to adjust the `values-local.yaml` files of each Microservice you want to deploy.
At the section `env` you find commented URLS to the Azure Vault. You need to replace these comments with the real secrets.

**IMPORTANT:** Do not commit these changes.
**TIPP:** Create a shelf entry in Intellij to save your local changes.
