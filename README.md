# minitee

This is a tiny module for piping an input to multiple output streams
safely.  It emits `'finish'` when all of the writable streams it's
writing into all emit `'finish'`.

## USAGE

```js
const Tee = require('minitee')
const tee = new Tee(output1, output2, output3)
tee.on('finish', () => {
  console.log('wrote to all three via tee')
})
input.pipe(tee)
```
