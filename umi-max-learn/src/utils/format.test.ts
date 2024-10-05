import { expect, test } from '@umijs/max/test';
import { trim } from './format';

test('trim', () => {
  expect(trim('hello')).toEqual('hello');
});
