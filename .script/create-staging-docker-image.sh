#!/bin/bash
cd "$(dirname "$0")"
cd ..

export DOCKER_REGISTRY=jacobgoh101
export GIT_COMMIT_ID=$(git log -1 --format=%h)

export APP_IMAGE_TAG=$DOCKER_REGISTRY/simple-twitter-clone:staging-$GIT_COMMIT_ID-$(date +'%s')
export APP_IMAGE_TAG_LATEST=$DOCKER_REGISTRY/simple-twitter-clone:staging-latest

# # & wait is for parallel execution
docker build -t $APP_IMAGE_TAG -f ./staging.Dockerfile . &
wait

docker tag $APP_IMAGE_TAG $APP_IMAGE_TAG_LATEST

# # & wait is forparallel execution
docker push $APP_IMAGE_TAG &
wait
docker push $APP_IMAGE_TAG_LATEST &
wait

echo "docker image pushed"
echo "$APP_IMAGE_TAG"

# echo "deployment completed"
