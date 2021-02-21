import {disposeElement} from '../../../common/disposing-util';
import {Value} from '../../../common/model/value';
import {constrainRange, mapRange} from '../../../common/number-util';
import {PaneError} from '../../../common/pane-error';
import {ClassName} from '../../../common/view/class-name';
import {ValueView} from '../../../common/view/value';
import {View, ViewConfig} from '../../../common/view/view';

interface Config extends ViewConfig {
	maxValue: number;
	minValue: number;
	value: Value<number>;
}

const className = ClassName('sld');

/**
 * @hidden
 */
export class SliderView extends View implements ValueView<number> {
	public readonly value: Value<number>;
	private innerElem_: HTMLDivElement | null;
	private maxValue_: number;
	private minValue_: number;
	private outerElem_: HTMLDivElement | null;

	constructor(document: Document, config: Config) {
		super(document, config);

		this.onValueChange_ = this.onValueChange_.bind(this);

		this.minValue_ = config.minValue;
		this.maxValue_ = config.maxValue;

		this.element.classList.add(className());

		const outerElem = document.createElement('div');
		outerElem.classList.add(className('o'));
		outerElem.tabIndex = 0;
		this.element.appendChild(outerElem);
		this.outerElem_ = outerElem;

		const innerElem = document.createElement('div');
		innerElem.classList.add(className('i'));
		this.outerElem_.appendChild(innerElem);
		this.innerElem_ = innerElem;

		config.value.emitter.on('change', this.onValueChange_);
		this.value = config.value;

		this.update();

		config.model.emitter.on('dispose', () => {
			this.innerElem_ = disposeElement(this.innerElem_);
			this.outerElem_ = disposeElement(this.outerElem_);
		});
	}

	get outerElement(): HTMLDivElement {
		if (!this.outerElem_) {
			throw PaneError.alreadyDisposed();
		}
		return this.outerElem_;
	}

	get innerElement(): HTMLDivElement {
		if (!this.innerElem_) {
			throw PaneError.alreadyDisposed();
		}
		return this.innerElem_;
	}

	public update(): void {
		if (!this.innerElem_) {
			throw PaneError.alreadyDisposed();
		}

		const p = constrainRange(
			mapRange(this.value.rawValue, this.minValue_, this.maxValue_, 0, 100),
			0,
			100,
		);
		this.innerElem_.style.width = `${p}%`;
	}

	private onValueChange_(): void {
		this.update();
	}
}