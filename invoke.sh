#!/usr/bin/env bash

source ./.env

aws lambda invoke \
    --function-name ${FUNCTION_ARN} \
    --region ${REGION} \
    --invocation-type RequestResponse \
    --profile personal \
    ./output.txt