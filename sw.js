/**
 * Service Worker Cache Polyfill
 */
(function() {
    if (!Cache.prototype.add) {
        Cache.prototype.add = function add(request) {
            return this.addAll([request]);
        };
    }

    if (!Cache.prototype.addAll) {
        Cache.prototype.addAll = function addAll(requests) {
            var cache = this;

            // Since DOMExceptions are not constructable:
            function NetworkError(message) {
                this.name = 'NetworkError';
                this.code = 19;
                this.message = message;
            }
            NetworkError.prototype = Object.create(Error.prototype);

            return Promise.resolve().then(function() {
                if (arguments.length < 1) throw new TypeError();

                // Simulate sequence<(Request or USVString)> binding:
                var sequence = [];

                requests = requests.map(function(request) {
                    if (request instanceof Request) {
                        return request;
                    }
                    else {
                        return String(request); // may throw TypeError
                    }
                });

                return Promise.all(
                    requests.map(function(request) {
                        if (typeof request === 'string') {
                            request = new Request(request);
                        }

                        var scheme = new URL(request.url).protocol;

                        if (scheme !== 'http:' && scheme !== 'https:') {
                            throw new NetworkError("Invalid scheme");
                        }

                        return fetch(request.clone());
                    })
                );
            }).then(function(responses) {
                // TODO: check that requests don't overwrite one another
                // (don't think this is possible to polyfill due to opaque responses)
                return Promise.all(
                    responses.map(function(response, i) {
                        return cache.put(requests[i], response);
                    })
                );
            }).then(function() {
                return undefined;
            });
        };
    }

    if (!CacheStorage.prototype.match) {
        // This is probably vulnerable to race conditions (removing caches etc)
        CacheStorage.prototype.match = function match(request, opts) {
            var caches = this;

            return this.keys().then(function(cacheNames) {
                var match;

                return cacheNames.reduce(function(chain, cacheName) {
                    return chain.then(function() {
                        return match || caches.open(cacheName).then(function(cache) {
                                return cache.match(request, opts);
                            }).then(function(response) {
                                match = response;
                                return match;
                            });
                    });
                }, Promise.resolve());
            });
        };
    }
});

/**
 Service Worker
 */

(function () {
    "use strict";
    
    // Cache name definitions
    var cacheNameStatic = "reddit-viewer-static";
    var cacheNameReddit = "reddit-viewer-reddit";

    var currentCacheNames = [
        cacheNameStatic,
        cacheNameReddit
    ];


    // A new ServiceWorker has been registered
    self.addEventListener("install", function (event) {
        event.waitUntil(
            caches.open(cacheNameStatic)
                .then(function (cache) {
                    return cache.addAll([
                        "/r-post-viewer/",
                        "/r-post-viewer/dist/local/build.js"
                    ]);
                })
        );
    });


    // A new ServiceWorker is now active
    self.addEventListener("activate", function (event) {
        event.waitUntil(
            caches.keys()
                .then(function (cacheNames) {
                    return Promise.all(
                        cacheNames.map(function (cacheName) {
                            if (currentCacheNames.indexOf(cacheName) === -1) {
                                return caches.delete(cacheName);
                            }
                        })
                    );
                })
        );
    });


    // The page has made a request
    self.addEventListener("fetch", function (event) {
        var requestURL = new URL(event.request.url);

        event.respondWith(
            caches.match(event.request)
                .then(function (response) {

                    if (response) {
                        return response;
                    }

                    var fetchRequest = event.request.clone();

                    return fetch(fetchRequest).then(
                        function (response) {

                            var shouldCache = false;

                            if (response.type === "basic" && response.status === 200) {
                                shouldCache = cacheNameStatic;
                            } else if (response.type === "opaque") { // if response isn"t from our origin / doesn"t support CORS
                                if (requestURL.hostname.indexOf("reddit") > -1) {
                                    shouldCache = cacheNameReddit;
                                } else {
                                    // just let response pass through, don"t cache
                                }
                            }

                            if (shouldCache) {
                                var responseToCache = response.clone();
                                caches.open(shouldCache)
                                    .then(function (cache) {
                                        var cacheRequest = event.request.clone();
                                        cache.put(cacheRequest, responseToCache);
                                    });
                            }
                            return response;
                        }
                    );
                })
        );
    });

})();
