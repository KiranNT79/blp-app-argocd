<!--
(c) 2022 CARIAD SE, All rights reserved.

NOTICE:
All the information and materials contained herein, including the intellectual and technical concepts, are the property of CARIAD SE and may be covered by patents, patents in process, and are protected by trade secret and/or copyright law.
The copyright notice above does not evidence any actual or intended publication or disclosure of this source code, which includes information and materials that are confidential and/or proprietary and trade secrets of CARIAD SE.
Any reproduction, dissemination, modification, distribution, public performance, public display of or any other use of this source code and/or any other information and/or material contained herein without the prior written consent of CARIAD SE is strictly prohibited and in violation of applicable laws.
The receipt or possession of this source code and/or related information does not convey or imply any rights to reproduce, disclose or distribute its contents or to manufacture, use or sell anything that it may describe in whole or in part.
-->

#Complete Process to integrate a new microservice into control center

1. In software_units create a new unit please be conform to the Naming convention in [readme](../software_units/README.md) <br />
2. In the [Build-Control-Center-New](./pipelines/build_control_center_new.yaml) add parameters as follows: <br />
   a. In modules add a new parameter for your microservice:

      ```
    - name: modules
        type: object
        default:
          in_car_app: in-car-app
          campaign_management_oru2: campaign-management-oru2
          deployment_tracking_mod34: deployment-tracking-mod34
          data_load_management: data.load-management
          <your_microservice_folder>: <your-microservice-name>
   ```

   b. In deployable_modules add a new parameter for your microservice: <br />

      ```
    - name: deployable_modules
        type: object
        default:
          frontend_gateway: frontend-gateway
          in_car_app: in-car-app
          campaign_management_oru2: campaign-management-oru2
          deployment_tracking_mod34: deployment-tracking-mod34
          data_load_management: data-load-management
          <your_microservice_folder>: <your-microservice-name>
   ```
3. In the [Deploy-Control-Center](./pipelines/deploy_control_center.yaml) add parameters as follows: <br />
   ```
     - name: modules
       type: object
       default:
          in_car_app: in-car-app
          frontend_gateway: frontend-gateway
          campaign_management_oru2: campaign-management-oru2
          deployment_tracking_mod34: deployment-tracking-mod34
          data_load_management: data-load-management
          <your_microservice_folder>: <your-microservice-name>
   ```
4. Create e new helm chart in `aspice/integration/application/kubernetes`
   The chart should have the name of the microservice as in the following steps.
   Chart can be copied from other existing charts please **don't** from frontend-gateway it has an ingress and is the only microservice that has an ingress.
   Chart should be implemented in a new branch and create a pull request for it after it runs locally please.

5. Don't forget to update frontend-gateway, so it routes your calls.
6. Build the solution as described in [local-build](../software_units/README.md).
7. Run and test it there then create a pull request.
