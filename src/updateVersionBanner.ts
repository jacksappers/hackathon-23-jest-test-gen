import latestVersion from 'latest-version';
import {version} from '../package.json';

export default async function checkVersionAndShowUpdateBanner() {
  try {
    const remoteVersion = await latestVersion('jest-test-gen');
    if ( remoteVersion > version){
      console.warn('🎉 A new version of the cli is available! TO UPDATE: npm install -g jest-test-gen 🎉')
    }
  } catch(err){
    console.warn('check for updates failed :( Please check at https://www.npmjs.com/package/jest-test-gen')
  }
}
