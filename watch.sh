#! /bin/bash

watch 'grep -H "" head-cid*.txt| sed "s,head-cid.\(.*\).txt:,\1   ,"'
