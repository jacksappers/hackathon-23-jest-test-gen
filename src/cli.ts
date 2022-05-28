#!/usr/bin/env node
import { run } from './main';
import checkPackageUpdates from './updateVersionBanner';
checkPackageUpdates();
run(process.argv.slice(2));
