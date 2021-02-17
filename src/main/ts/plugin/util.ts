import {InputParamsOption, InputParamsOptionDictionary} from '../api/types';
import {Constraint} from '../constraint/constraint';
import {ListConstraint, ListItem} from '../constraint/list';
import {StepConstraint} from '../constraint/step';
import {ConstraintUtil} from '../constraint/util';
import {NumberUtil} from '../misc/number-util';
import {TypeUtil} from '../misc/type-util';

/**
 * @hidden
 */
export function normalizeInputParamsOptions<T1, T2>(
	options: InputParamsOption<T1>[] | InputParamsOptionDictionary<T1>,
	convert: (value: T1) => T2,
): InputParamsOption<T2>[] {
	if (Array.isArray(options)) {
		return options.map((item) => {
			return {
				text: item.text,
				value: convert(item.value),
			};
		});
	}

	const textToValueMap = options;
	const texts = Object.keys(textToValueMap);
	return texts.reduce((result, text) => {
		return result.concat({
			text: text,
			value: convert(textToValueMap[text]),
		});
	}, [] as InputParamsOption<T2>[]);
}

/**
 * @hidden
 */
export function findListItems<T>(
	constraint: Constraint<T> | undefined,
): ListItem<T>[] | null {
	const c = constraint
		? ConstraintUtil.findConstraint<ListConstraint<T>>(
				constraint,
				ListConstraint,
		  )
		: null;
	if (!c) {
		return null;
	}

	return c.options;
}

function findStep(constraint: Constraint<number> | undefined): number | null {
	const c = constraint
		? ConstraintUtil.findConstraint(constraint, StepConstraint)
		: null;
	if (!c) {
		return null;
	}

	return c.step;
}

/**
 * @hidden
 */
export function getSuitableDecimalDigits(
	constraint: Constraint<number> | undefined,
	rawValue: number,
): number {
	const sc =
		constraint && ConstraintUtil.findConstraint(constraint, StepConstraint);
	if (sc) {
		return NumberUtil.getDecimalDigits(sc.step);
	}

	return Math.max(NumberUtil.getDecimalDigits(rawValue), 2);
}

/**
 * @hidden
 */
export function getBaseStep(
	constraint: Constraint<number> | undefined,
): number {
	const step = findStep(constraint);
	return TypeUtil.getOrDefault<number>(step, 1);
}