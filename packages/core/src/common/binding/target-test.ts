import * as assert from 'assert';
import {describe, it} from 'mocha';

import {BindingTarget} from './target';

describe(BindingTarget.name, () => {
	it('should get properties', () => {
		const obj = {foo: 'bar'};
		const target = new BindingTarget(obj, 'foo');
		assert.strictEqual(target.key, 'foo');
		assert.strictEqual(target.presetKey, 'foo');
	});

	it('should specify preset key', () => {
		const obj = {foo: 'bar'};
		const target = new BindingTarget(obj, 'foo', 'baz');
		assert.strictEqual(target.presetKey, 'baz');
	});

	it('should read value', () => {
		const obj = {foo: 'bar'};
		const target = new BindingTarget(obj, 'foo');
		assert.strictEqual(target.read(), 'bar');
	});

	it('should write value', () => {
		const obj = {foo: 'bar'};
		const target = new BindingTarget(obj, 'foo');
		target.write('wrote');
		assert.strictEqual(obj.foo, 'wrote');
	});

	it('should bind static class field', () => {
		class Test {
			static foo = 1;
		}

		assert.doesNotThrow(() => {
			new BindingTarget(Test, 'foo');
		});
	});

	it('should determine class is bindable', () => {
		class Test {
			static foo = 1;
		}

		assert.strictEqual(BindingTarget.isBindable(Test), true);
	});
});
