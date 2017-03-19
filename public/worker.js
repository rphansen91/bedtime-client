/**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('/sw-toolbox.js');

var CACHED_FILES = []
var CACHE_HASH = 'cache';

self.toolbox.options.cache = {
  name: 'bedbyestory-'+CACHE_HASH
};

// pre-cache our key assets
self.toolbox.precache(CACHED_FILES);

self.toolbox.router.get('/books', function(request, values) {
    return fetch('//freekidsbooks.org')
    .then(function (res) {
        return res.text();
    })
    .then(function (text) {
        return new Response(text);
    })
});

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

// update the app
// self.toolbox.uncache('/');
// self.toolbox.uncache('/index.html');

self.addEventListener("install", function(event) {

})

self.addEventListener("activate", function(event) {

})