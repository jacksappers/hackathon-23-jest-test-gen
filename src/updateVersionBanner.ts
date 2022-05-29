import latestVersion from 'latest-version';
import { readFileSync } from 'fs';
import { compare } from 'compare-versions';

export default async function checkVersionAndShowUpdateBanner() {
  try {
    const remoteVersion = await latestVersion('jest-test-gen');
    const version = JSON.parse(readFileSync(`${__dirname}/../package.json`, 'utf-8')).version;
    if ( compare(remoteVersion, version, '>') ){
      console.warn('🎉 A new version of the cli is available! TO UPDATE: npm install -g jest-test-gen 🎉')
    }
  } catch(err){
    console.warn(err,'check for updates failed :( Please check at https://www.npmjs.com/package/jest-test-gen')
  }
}
