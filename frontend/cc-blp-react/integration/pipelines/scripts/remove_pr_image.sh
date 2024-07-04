#!/bin/sh
#
# (c) 2022 CARIAD SE, All rights reserved.
#
# NOTICE:
# All the information and materials contained herein, including the intellectual and technical concepts,
# are the property of CARIAD SE and may be covered by patents, patents in process, and are protected by trade secret and/or copyright law.
# The copyright notice above does not evidence any actual or intended publication or disclosure of this source code, which includes information and materials
# that are confidential and/or proprietary and trade secrets of CARIAD SE.
# Any reproduction, dissemination, modification, distribution, public performance, public display of or any other use of this source code and/or any other
# information and/or material contained herein without the prior written consent of CARIAD SE is strictly prohibited and in violation of applicable laws.
# The receipt or possession of this source code and/or related information does not convey or imply any rights to reproduce, disclose or distribute its
# contents or to manufacture, use or sell anything that it may describe in whole or in part.
#

#in tail command we exclude the first 3 lines of explanatory text and the newest two images
repositories_array=($(az acr repository list -n dlcmdevsharedacrregistry | jq -r '.[]'))
printf '%s\n' "${repositories_array[@]}"

for REPOSITORY in "${repositories_array[@]}"; do
  echo "------------------------------------------------"
  az acr run --cmd "acr purge --ago 0d --filter '$REPOSITORY:pr.*'" --registry dlcmdevsharedacrregistry /dev/null
done

echo "showing the storage size of dlcmdevsharedacrregistry container registry"
az acr show-usage -n dlcmdevsharedacrregistry | jq '.[][0]'
