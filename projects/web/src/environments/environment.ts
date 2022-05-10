import {minuteInMillis, secondInMillis} from '../utils';

export const environment = {
  production: false,
  appVersion: "SNAPSHOT-" + new Date().toISOString(),
  appUpdateCheckDelay: 30 * secondInMillis,
  updateWarningSleep: 2 * minuteInMillis
};
