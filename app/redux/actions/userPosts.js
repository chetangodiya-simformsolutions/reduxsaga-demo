import { StaticTypes } from '../types';
import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  requestUserPost: null,
  failedUserPost: ['payload'],
  getSingle: ['payload'],
  foundSingle: ['payload'],
  printLogs: null,
  channelExicution: null,
  successUserPost: ['payload'],
  failedSingle: () => ({ type: StaticTypes.CANCEL_FORK_REQ })
});

export const UserPostActions = Creators;
export const UserPostTypes = Types;
