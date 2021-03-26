import {assert} from 'chai';
import {describe as context, describe, it} from 'mocha';

import {TpFoldEvent} from '../api/tp-event';
import Tweakpane from '../index';
import {TestUtil} from '../misc/test-util';
import {Class} from '../misc/type-util';
import {InputBindingController} from '../plugin/blade/common/controller/input-binding';
import {MonitorBindingController} from '../plugin/blade/common/controller/monitor-binding';
import {FolderController} from '../plugin/blade/folder/controller';
import {LabeledController} from '../plugin/blade/labeled/controller';
import {SeparatorController} from '../plugin/blade/separator/controller';

function createApi(title?: string): Tweakpane {
	return new Tweakpane({
		document: TestUtil.createWindow().document,
		title: title,
	});
}

describe(Tweakpane.name, () => {
	it('should add folder', () => {
		const pane = createApi();
		const f = pane.addFolder({
			title: 'folder',
		});
		assert.strictEqual(f.controller.folder.title, 'folder');
		assert.strictEqual(f.controller.folder.expanded, true);
	});

	it('should add collapsed folder', () => {
		const pane = createApi();
		const f = pane.addFolder({
			expanded: false,
			title: 'folder',
		});
		assert.strictEqual(f.controller.folder.expanded, false);
	});

	it('should toggle expanded when clicking title element', () => {
		const c = new Tweakpane({
			document: TestUtil.createWindow().document,
			title: 'Tweakpane',
		});

		if (c.controller.view.titleElement) {
			c.controller.view.titleElement.click();
		}

		assert.strictEqual(
			c.controller.folder && c.controller.folder.expanded,
			false,
		);
	});

	it('should add separator', () => {
		const pane = createApi();
		pane.addSeparator();

		const cs = pane.controller.bladeRack.items;
		assert.instanceOf(cs[cs.length - 1], SeparatorController);
	});

	it('should dispose separator', () => {
		const pane = createApi();
		const cs = pane.controller.bladeRack.items;

		const s = pane.addSeparator();
		assert.strictEqual(cs.length, 1);
		s.dispose();
		assert.strictEqual(cs.length, 0);
	});

	it('should handle root folder events', (done) => {
		const pane = createApi('pane');

		pane.on('fold', (ev) => {
			assert.instanceOf(ev, TpFoldEvent);
			assert.strictEqual(ev.expanded, false);
			done();
		});

		const f = pane.controller.folder;
		if (!f) {
			throw new Error('Root folder not found');
		}
		f.expanded = false;
	});

	it('should handle folder events', (done) => {
		const pane = createApi();
		const f = pane.addFolder({
			title: 'folder',
		});

		pane.on('fold', (ev) => {
			assert.instanceOf(ev, TpFoldEvent);
			assert.strictEqual(ev.expanded, false);
			done();
		});
		f.expanded = false;
	});

	([
		{
			insert: (api, index) => {
				api.addInput({foo: 1}, 'foo', {index: index});
			},
			expected: InputBindingController,
		},
		{
			insert: (api, index) => {
				api.addMonitor({foo: 1}, 'foo', {
					index: index,
					interval: 0,
				});
			},
			expected: MonitorBindingController,
		},
		{
			insert: (api, index) => {
				api.addButton({index: index, title: 'button'});
			},
			expected: LabeledController,
		},
		{
			insert: (api, index) => {
				api.addFolder({index: index, title: 'folder'});
			},
			expected: FolderController,
		},
		{
			insert: (api, index) => {
				api.addSeparator({
					index: index,
				});
			},
			expected: SeparatorController,
		},
	] as {
		insert: (api: Tweakpane, index: number) => void;
		expected: Class<any>;
	}[]).forEach((testCase) => {
		context(`when ${testCase.expected.name}`, () => {
			it('should insert input/monitor into specified position', () => {
				const params = {
					bar: 2,
					foo: 1,
				};
				const pane = createApi();
				pane.addInput(params, 'foo');
				pane.addInput(params, 'bar');
				testCase.insert(pane, 1);

				const cs = pane.controller.bladeRack.items;
				assert.instanceOf(cs[1], testCase.expected);
			});
		});
	});

	it('should bind `this` within handler to pane', (done) => {
		const PARAMS = {foo: 1};
		const pane = createApi();
		pane.on('change', function(this: any) {
			assert.strictEqual(this, pane);
			done();
		});

		const bapi = pane.addInput(PARAMS, 'foo');
		bapi.controller.binding.value.rawValue = 2;
	});

	it('should dispose items', () => {
		const PARAMS = {foo: 1};
		const pane = createApi();
		const i = pane.addInput(PARAMS, 'foo');
		const m = pane.addMonitor(PARAMS, 'foo');

		pane.dispose();
		assert.isTrue(pane.controller.blade.disposed);
		assert.isTrue(i.controller.blade.disposed);
		assert.isTrue(m.controller.blade.disposed);
	});

	it('should dispose items (nested)', () => {
		const PARAMS = {foo: 1};
		const pane = createApi();
		const f = pane.addFolder({title: ''});
		const i = f.addInput(PARAMS, 'foo');
		const m = f.addMonitor(PARAMS, 'foo');

		assert.isFalse(pane.controller.blade.disposed);
		assert.isFalse(i.controller.blade.disposed);
		assert.isFalse(m.controller.blade.disposed);
		pane.dispose();
		assert.isTrue(pane.controller.blade.disposed);
		assert.isTrue(i.controller.blade.disposed);
		assert.isTrue(m.controller.blade.disposed);
	});
});