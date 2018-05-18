/*
 *
 * BroadcreekProvider actions
 *
 */

 import {
   CONNECT,
   CONNECTED,
   CONNECTION_ERROR,
   CONNECTION_FAILED,
   DISCONNECT,
   DISCONNECTED,
 } from './constants';

 export function connect({ broadcreek } = {}) {
   if (broadcreek == null) {
     throw new Error('broadcreek is a required parameter for connect()');
   }
   return {
     type: CONNECT,
     broadcreek,
   };
 }

 export function connected() {
   return {
     type: CONNECTED,
   };
 }

 export function connectionError({ broadcreek, attempt } = {}) {
   if (broadcreek == null) {
     throw new Error('broadcreek is a required parameter for connectionError()');
   }
   return {
     type: CONNECTION_ERROR,
     broadcreek,
     attempt,
   };
 }

 export function connectionFailed() {
   return {
     type: CONNECTION_FAILED,
   };
 }

 export function disconnect() {
   return {
     type: DISCONNECT,
   };
 }

 export function disconnected({ broadcreek, attempt } = {}) {
   if (broadcreek == null) {
     throw new Error('broadcreek is a required parameter for disconnected()');
   }
   return {
     type: DISCONNECTED,
     broadcreek,
     attempt,
   };
 }
