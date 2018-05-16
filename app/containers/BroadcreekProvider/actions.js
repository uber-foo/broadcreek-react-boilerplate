/*
 *
 * BroadcreekProvider actions
 *
 */

 import {
   CONNECT,
   CONNECTED,
   CONNECTION_ERROR,
 } from './constants';

 export function connect() {
   log.info('connecting to broadcreek');
   return {
     type: CONNECT,
   };
 }

 export function connected() {
   log.info('connected to broadcreek');
   return {
     type: CONNECTED,
   };
 }

 export function connectionError(err) {
   log.info(err, 'connection to broadcreek failed');
   return {
     type: CONNECTION_ERROR,
   };
 }
