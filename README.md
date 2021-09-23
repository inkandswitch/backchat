# Backchat

THIS IS UNSUPPORTED RESEARCH SOFTWARE. IT HAS NOT HAD ANY KIND OF SECURITY
OR CRYPTOGRAPHY REVIEW. DO NOT ATTEMPT TO USE THIS SOFTWARE TO STORE OR TRANSMIT SENSITIVE INFORMATION.

[![Netlify Status](https://api.netlify.com/api/v1/badges/b91ac61c-abc1-40d0-9563-e05c189190ae/deploy-status)](https://app.netlify.com/sites/backchat/deploys) [![CI](https://github.com/inkandswitch/backchat/actions/workflows/ci.yml/badge.svg)](https://github.com/inkandswitch/backchat/actions)


[Try it now!](https://backchat.netlify.app/)

Backchat is an end-to-end encrypted instant messenger application that has no accounts, no central identity, and no namespaces. Backchat is an example that uses [Backchannel](https://github.com/inkandswitch/backchannel). Read more about this approach to digital identity in [the paper](https://www.inkandswitch.com/backchannel).

## Getting started

```
npm install
```

The websocket relay must be run in the background in a separate terminal.

```
npm run relay
```

Then, you can build the javascript bundle which includes hotreloading.

```
npm start
```

## Testing

Open two browser windows that are not in private browsing mode. They can be
tabs in the same browser program. Opening a private window doesn't work with
IndexedDB.

Because we're using IndexedDB, to do local testing with the same browser on the
same machine, you should open one of the tabs or windows at
```localhost:3000``` and the other at ```127.0.0.1:3000```. This will ensure
that they both have their own isolated database.

## Deployment

To deploy the minified production build, run

```npm run build```

## Contributors

* Karissa Rae McKelvey, @okdistribute
* Ben Royer, Design
* Chris Sun, @daiyi, Frontend/UI

# License

MIT
