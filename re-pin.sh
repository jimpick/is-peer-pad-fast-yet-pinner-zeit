#! /bin/bash

SLEEP=10
while true; do
  for f in `ls head-cid.*.txt`; do
    CID=$(cat $f)
    echo "$f" $CID
    ipfs pin add -r $CID
  done
  echo Sleeping for $SLEEP seconds
  sleep $SLEEP
done
