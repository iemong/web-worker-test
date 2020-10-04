importScripts('https://unpkg.com/comlink/dist/umd/comlink.js')

class MyClass {
  constructor(init = 0) {
    console.log(init)
    this._counter = init
  }

  get counter() {
    return this._counter
  }

  increment(delta = 1) {
    this._counter += delta
  }

  double() {
    this._counter *= 2
  }

  heavyFunc() {
    let result = 0
    for (let i = 0; i < 1e9; i++) {
      result = i
    }
    console.log('finish', result)
  }
}

Comlink.expose(MyClass)
