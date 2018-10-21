/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
  Utility method that calls a callback whenever the network connectivity of the app changes.
  The callback should take a boolean parameter (with `true` meaning
  the network is offline, and `false` meaning online)
  Example:
      import { installOfflineWatcher } from 'pwa-helpers/network.js';
      installOfflineWatcher((offline) => {
        console.log('You are ' + offline ? ' offline' : 'online');
      });
*/

/**
 * 
 * snippet translated from .ts to .js from https://github.com/Polymer/pwa-helpers/blob/master/src/network.ts
 */

export const offlineWatcher = (offlineCallback => {
    window.addEventListener('online', () => { offlineCallback(false) })
    window.addEventListener('offline', () => { offlineCallback(true) })

    offlineCallback(navigator.onLine === false)
})
