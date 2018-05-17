/*
 *
 * BroadcreekProvider actions
 *
 */

 import {
   CONNECT,
   CONNECTED,
   CONNECTION_ERROR,
   DISCONNECT,
   DISCONNECTED,
 } from './constants';

 export function connect({ broadcreek }) {
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

 export function connectionError() {
   return {
     type: CONNECTION_ERROR,
   };
 }

 export function disonnect() {
   return {
     type: DISCONNECT,
   };
 }

 export function disconnected() {
   return {
     type: DISCONNECTED,
   };
 }
