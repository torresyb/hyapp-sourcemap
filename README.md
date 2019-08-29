# hyapp-sourcemap
a tools of sourceMap

``` html
Usage: sm [options]
option:
* '-f, --source-file', 'The file path of source map'
* '-l, --line', 'The line number of pros error'
* '-c, --column', 'The column number of pros error'
* '-h, --help'
```

``` javascript
example:
sm -f ./demo/dist/app.min.js.map -l 1 -c 1023

output:
★sourceFilePath: webpack:///main.js
★line: 8
★column: 14
★name: aaa
--------start 错误代码--------
function test2 () {
  console.log('test2')
}
function testError () {
*  console.log(aaa)
}
function test3 () {
  console.log('test3')
}
function test4 () {

--------end 错误代码--------

```
