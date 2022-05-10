import {hourInMillis, minuteInMillis} from '../utils';

export const environment = {
  production: true,
  appVersion: require('../../../../package.json').version,
  appUpdateCheckDelay: 20 * minuteInMillis,
  updateWarningSleep: 2 * hourInMillis
};
