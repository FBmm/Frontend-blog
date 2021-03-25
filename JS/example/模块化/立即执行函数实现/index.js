const module1 = (function() {
  const name = 'module';
  const print = function() {
    console.log(name)
  }
  return {
    name,
    print,
  }
})()

const module2 = (function() {
  const name = 'module';
  const print = function() {
    console.log(name)
  }
  return {
    name,
    print,
  }
})()