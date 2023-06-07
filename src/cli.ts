#!/usr/bin/env node
// import * as minimist from 'minimist';
import { run } from './main';
import checkPackageUpdates from './updateVersionBanner';

checkPackageUpdates();
run();
