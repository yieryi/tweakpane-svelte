import {InputParams} from '../../../api/types';
import {
	CompositeConstraint,
	findConstraint,
} from '../../common/constraint/composite';
import {Constraint} from '../../common/constraint/constraint';
import {ListConstraint} from '../../common/constraint/list';
import {formatString, stringFromUnknown} from '../../common/converter/string';
import {ValueMap} from '../../common/model/value-map';
import {equalsPrimitive, writePrimitive} from '../../common/primitive';
import {InputBindingPlugin} from '../../input-binding';
import {createListConstraint, findListItems} from '../../util';
import {ListController} from '../common/controller/list';
import {TextController} from '../common/controller/text';

function createConstraint(params: InputParams): Constraint<string> {
	const constraints: Constraint<string>[] = [];

	const lc = createListConstraint(params, stringFromUnknown);
	if (lc) {
		constraints.push(lc);
	}

	return new CompositeConstraint(constraints);
}

/**
 * @hidden
 */
export const StringInputPlugin: InputBindingPlugin<string, string> = {
	id: 'input-string',
	accept: (value, _params) => (typeof value === 'string' ? value : null),
	binding: {
		reader: (_args) => stringFromUnknown,
		constraint: (args) => createConstraint(args.params),
		equals: equalsPrimitive,
		writer: (_args) => writePrimitive,
	},
	controller: (params) => {
		const doc = params.document;
		const value = params.value;
		const c = value.constraint;

		if (c && findConstraint(c, ListConstraint)) {
			return new ListController(doc, {
				listItems: findListItems(c) ?? [],
				stringifyValue: (v) => v,
				value: value,
				viewProps: params.viewProps,
			});
		}

		return new TextController(doc, {
			parser: (v) => v,
			props: new ValueMap({
				formatter: formatString,
			}),
			value: value,
			viewProps: params.viewProps,
		});
	},
};