import * as assert from 'assert';
import {describe, it} from 'mocha';

import {ReadWriteBinding} from '../../../common/binding/read-write';
import {BindingTarget} from '../../../common/binding/target';
import {InputBindingValue} from '../../../common/binding/value/input-binding';
import {
	createNumberFormatter,
	numberFromUnknown,
	parseNumber,
} from '../../../common/converter/number';
import {LabelPropsObject} from '../../../common/label/view/label';
import {ValueMap} from '../../../common/model/value-map';
import {createValue} from '../../../common/model/values';
import {ViewProps} from '../../../common/model/view-props';
import {NumberTextController} from '../../../common/number/controller/number-text';
import {writePrimitive} from '../../../common/primitive';
import {createTestWindow} from '../../../misc/dom-test-util';
import {assertInitialState, assertUpdates} from '../../common/api/test-util';
import {TpChangeEvent} from '../../common/api/tp-event';
import {createBlade} from '../../common/model/blade';
import {InputBindingController} from '../controller/input-binding';
import {BindingApi} from './binding';
import {InputBindingApi} from './input-binding';

function createApi(target: BindingTarget): InputBindingApi<number, unknown> {
	const doc = createTestWindow().document;
	const binding = new ReadWriteBinding({
		reader: numberFromUnknown,
		target: target,
		writer: writePrimitive,
	});
	const v = new InputBindingValue(createValue(0), binding);
	const ic = new NumberTextController(doc, {
		parser: parseNumber,
		props: ValueMap.fromObject({
			formatter: createNumberFormatter(0),
			keyScale: 1,
			pointerScale: 1,
		}),
		value: v,
		viewProps: ViewProps.create(),
	});
	const bc = new InputBindingController<number>(doc, {
		blade: createBlade(),
		props: ValueMap.fromObject<LabelPropsObject>({
			label: 'label',
		}),
		value: v,
		valueController: ic,
	});
	return new BindingApi(bc);
}

describe('InputBindingApi', () => {
	it('should listen change event', (done) => {
		const PARAMS = {
			foo: 0,
		};
		const api = createApi(new BindingTarget(PARAMS, 'foo'));
		api.on('change', (ev) => {
			assert.strictEqual(ev instanceof TpChangeEvent, true);
			assert.strictEqual(ev.target, api);
			assert.strictEqual(ev.target.key, 'foo');
			assert.strictEqual(ev.value, 123);
			done();
		});
		api.controller.value.rawValue = 123;
	});

	it('should refresh bound value', () => {
		const PARAMS = {
			foo: 0,
		};
		const api = createApi(new BindingTarget(PARAMS, 'foo'));

		PARAMS.foo = 123;
		api.refresh();

		assert.strictEqual(api.controller.value.rawValue, 123);
	});

	it('should have initial state', () => {
		const PARAMS = {
			foo: 0,
		};
		const api = createApi(new BindingTarget(PARAMS, 'foo'));
		assertInitialState(api);
		assert.strictEqual(api.label, 'label');
		assert.strictEqual(api.tag, undefined);
	});

	it('should update properties', () => {
		const PARAMS = {
			foo: 0,
		};
		const api = createApi(new BindingTarget(PARAMS, 'foo'));
		assertUpdates(api);

		api.label = 'changed';
		assert.strictEqual(api.label, 'changed');

		api.tag = 'tag';
		assert.strictEqual(api.tag, 'tag');
	});
});
