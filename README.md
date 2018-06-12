# mintee

[![npm](https://img.shields.io/npm/v/mintee.svg)](https://www.npmjs.com/package/mintee)
[![install size](https://packagephobia.now.sh/badge?p=mintee)](https://packagephobia.now.sh/result?p=mintee)

This is a tiny module for piping an input to multiple output streams
safely.  It emits `'finish'` when all of the writable streams it's
writing into all emit `'finish'`.

## USAGE

```js
const Tee = require('mintee')
const tee = new Tee(output1, output2, output3)
tee.on('finish', () => {
  console.log('wrote to all three via tee')
})
input.pipe(tee)
```
