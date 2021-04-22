# Backchannel

Backchannel is a cross platform progressive web application combining novel
out-of-band identity verification techniques with a modernised pet name address book system. 

This prototype will allow two people to share documents safely over time in
a cohesive, easily understood interface. It will satisfy certain
cases of heightened risk without dramatic configuration or expertise required
on behalf of network participants.

## Getting started

* [Database](docs/database.md)
* [Protocol](docs/protocol.md)
* [Contributing & Code of Conduct](docs/contributing.md)

```
npm install
```

Install the local server tool: `npm i -g http-server`

In separate terminals, run the following commands:

For building the javascript bundle...

```
npm run watch
```

For hosting the static dist folder...

```
npm start
```

For the websocket relay...

```
npm run relay
```

## Testing

Open two browser windows that are not in private browsing mode. They can be
tabs in the same browser program. Opening a private window doesn't work with
IndexedDB.

To run automated tests, 

```
npm run relay
```

and then

```
npm test
```

# Contributors

* Karissa McKelvey, @okdistribute, Lead 
* Ben Royer, Design
* Chris Sun, @daiyi, Frontend/UI

# Advisors

* [Cade Diehm](https://shiba.computer/)
* Peter van Hardenberg, @pvh
* سلمان الجماز, @saljam

# License

MIT
