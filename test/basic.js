'use strict'
const t = require('tap')
const Tee = require('../')
const Minipass = require('minipass')

t.test('basic tee stream', t => {
  let out1 = ''
  let out2 = ''
  let out3 = ''
  const output1 = new Minipass({ encoding: 'utf8' })
  output1.on('data', s => out1 += s)
  const output2 = new Minipass({ encoding: 'utf8' })
  output2.on('data', s => out2 += s)
  const output3 = new Minipass({ encoding: 'utf8' })
  output3.on('data', s => out3 += s)
  const input = new Minipass()
  input.write('hello ')
  const tee = new Tee(output1, output2, output3)
  input.pipe(tee)
  input.end('world')
  t.equal(out1, 'hello world')
  t.equal(out2, 'hello world')
  t.equal(out3, 'hello world')
  t.equal(output1.endEmitted)
  t.equal(output2.endEmitted)
  t.equal(output3.endEmitted)
  t.end()
})

t.test('backpressure', t => {
  const input = new Minipass()
  const output1 = new Minipass({ encoding: 'utf8' })
  const output2 = new Minipass({ encoding: 'utf8' })

  const tee = new Tee(output1, output2)
  t.equal(input.write('hello '), false)

  input.pipe(tee)

  let drains = 0
  tee.on('drain', () => drains++)

  t.equal(output1.read(), 'hello ')
  t.equal(input.write('world'), false)
  t.equal(output1.read(), 'world')
  t.equal(output2.read(), 'hello world')
  t.equal(drains, 3)
  t.end()
})
