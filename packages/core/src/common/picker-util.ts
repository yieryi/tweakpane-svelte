import {PickerLayout} from './params';

export function parsePickerLayout(value: unknown): PickerLayout | undefined {
	if (value === 'inline' || value === 'popup') {
		return value;
	}
	return undefined;
}
