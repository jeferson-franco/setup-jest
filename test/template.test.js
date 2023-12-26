import { it } from '@jest/globals';

function sum(a, b) {
  return a + b;
}

it('deve somar dois valores', () => {
  expect(sum(2, 3)).toBe(5);
});
