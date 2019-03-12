const memoized = [0, 1];

const fibonacci = n => {
  if (n < memoized.length) {
    return memoized[n];
  }
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  memoized.push(result);
  return result;
};

const assert = require('assert');
console.log(fibonacci(20));
console.log(fibonacci(40));

assert.equal(fibonacci(70), 190392490709135, 'test 1');
assert.equal(fibonacci(60), 1548008755920, 'test 2');
assert.equal(fibonacci(50), 12586269025, 'test 3');
