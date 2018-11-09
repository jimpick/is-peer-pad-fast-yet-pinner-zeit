#! /bin/bash

SLEEP=60
while true; do
  for f in `ls head-cid.*.txt`; do
    CID=$(cat $f)
    echo "$f" $CID
    ipfs pin add -r $CID
  done
  cp head-cid.*.txt backup
  (cd backup; git add .; git commit -m backup; git push)
  echo Sleeping for $SLEEP seconds
  sleep $SLEEP
done
