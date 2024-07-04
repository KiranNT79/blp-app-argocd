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

CONTAINER_REGISTRY=$1
RETANTION_PERIOD=$2
#in tail command we exclude the first 3 lines of explanatory text and the newest two images
NUMBER_OF_IMAGES_TO_PERSERVE=$(($3 + 3))
IS_PRIVATE_ACR=$4

# make acr public for running purge tasks
if [ $IS_PRIVATE_ACR = "true" ]; then
  az acr update --name ${CONTAINER_REGISTRY} --public-network-enabled true --default-action Allow
fi

repositories_array=($(az acr repository list -n $CONTAINER_REGISTRY | jq -r '.[]'))
printf '%s\n' "${repositories_array[@]}"

for REPOSITORY in "${repositories_array[@]}"; do
  echo "------------------------------------------------"
  echo "cleaning images for " $REPOSITORY " repository"
  echo "retention period " $RETANTION_PERIOD
  echo "number images to perserve " $NUMBER_OF_IMAGES_TO_PERSERVE

  images_to_delete_array=($(az acr repository show-tags -n $CONTAINER_REGISTRY --repository $REPOSITORY --orderby time_desc --output table | tail -n +$NUMBER_OF_IMAGES_TO_PERSERVE))

  while [ "${#images_to_delete_array[@]}" -gt 0 ]; do
    if [ "${#images_to_delete_array[@]}" -gt 50 ]; then
       chunk_size=50
    else
      chunk_size=${#images_to_delete_array[@]}
    fi

    for TAGGED_IMAGE in "${images_to_delete_array[@]:0:$chunk_size}"; do
      TAGS_STRING="$TAGS_STRING --filter '$REPOSITORY:\b$TAGGED_IMAGE\b'"
    done
    az acr run --cmd "acr purge $TAGS_STRING --ago ${RETANTION_PERIOD}d --untagged" --registry $CONTAINER_REGISTRY /dev/null
    images_to_delete_array=(${images_to_delete_array[@]:$chunk_size})
    TAGS_STRING=''
  done

done

# reset acr to private after running tasks
if [ $IS_PRIVATE_ACR = "true" ]; then
  az acr update --name ${CONTAINER_REGISTRY} --public-network-enabled false --default-action Deny
fi

echo "showing the storage size of $CONTAINER_REGISTRY container registry"
az acr show-usage -n $CONTAINER_REGISTRY | jq '.[][0]'
