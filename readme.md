# viewport-update

> Throttled window scroll and resize events. In the singleton + signal way

## Install

```bash
npm i viewport-update
```

Package [on npm](https://www.npmjs.com/package/viewport-update)

## API

* [constructor](#constructordelay)
* [immediate](#immediate)

#### constructor(delay)

Create the first instance, otherwise return the internal instance already created

| Argument | Action |
| :------ | :------- |
| **delay** | the throttling delay, default to 100 ms, min to 25 ms |

The instance created has the following properties

| Property | Value |
| :------ | :------- |
| **update** | the signal instance – [see signalus-simplex](https://github.com/jeromedecoster/signalus-simplex) |
| **width** | the window innerWidth |
| **height** | the window innerHeight |
| **left** | the window scrollX |
| **top** | the window scrollY |
| **right** | the window scrollX + window.innerWidth |
| **bottom** | the window scrollY + window.innerHeight |

Receive `data` from the dispatched argument

```js
const Viewport = require('viewport-update')

function onupdate(data) {
  // {with:.., height:.., left:.., top:.., right:.., bottom:..}
  console.log(data)
}

var viewport = new Viewport()
viewport.update.add(onupdate)
```

Get datas from the instance

```js
const Viewport = require('viewport-update')

var viewport = new Viewport()

function onupdate() {
  // the viewport width and height
  console.log(viewport.width, viewport.height)
}

viewport.update.add(onupdate)
```

#### immediate()

Force the `update` signal to dispatch immediately instead of waiting the next `scroll` or `resize` event

## Thanks

Mainly forked / inspired on
- [windowsill](https://github.com/ayamflow/windowsill)

## License

MIT
