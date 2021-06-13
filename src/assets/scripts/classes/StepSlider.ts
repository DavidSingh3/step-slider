import StepSliderOptions, { defaultStepSliderOptions } from "../interfaces/stepSliderOptions";
import Logger from "./Logger";

export default class StepSlider {

    private logger: Logger
    private inputRangeElement: HTMLInputElement
    private options: StepSliderOptions;
    private containerElement: HTMLDivElement
    private labelsContainer: HTMLDivElement

    constructor(inputRangeElement: HTMLInputElement, options: StepSliderOptions = defaultStepSliderOptions) {
        this.logger = new Logger('StepSlider class')
        this.inputRangeElement = inputRangeElement
        this.options = Object.assign({}, defaultStepSliderOptions, options)
        this.inputRangeElement.min = this.options.min.toString()
        this.inputRangeElement.max = this.options.max.toString()
        this.inputRangeElement.value = this.options.value.toString()
        this.inputRangeElement.step = this.options.step.toString()
    }

    private setSelectedIndex() {
        const value = parseInt(this.inputRangeElement.value)
        const selectedIndex = this.valueToIndex(value)
        this.containerElement.style.setProperty('--selected-index', selectedIndex.toString())

        this.labelsContainer.querySelectorAll('.step-slider-label').forEach((labelElement: Element) => {
            labelElement.classList.remove('selected')
        })

        const selectedLabelElement = this.labelsContainer.querySelector(`.step-slider-label:nth-child(${selectedIndex + 1})`)
        selectedLabelElement.classList.add('selected')
    }

    private valueToIndex(value: number): number {
        return ((value - this.options.min) / this.options.step)
    }

    public init(): StepSlider {
        this.containerElement = document.createElement('div')
        this.containerElement.classList.add('step-slider-container', `labels-position-${this.options.labelPosition}`)
        this.containerElement.style.setProperty('--steps', (((this.options.max - this.options.min) / this.options.step) + 1).toString())
        this.containerElement.style.setProperty('--selected-index', "0")
        this.containerElement.style.setProperty('--cursor', this.options.cursor)
        this.containerElement.style.setProperty('--thumb-size', `${this.options.thumbSize}px`)
        this.containerElement.style.setProperty('--track-size', `${this.options.trackSize}px`)
        this.containerElement.style.setProperty('--label-offset', `${this.options.labelOffset}px`)
        this.containerElement.style.setProperty('--selected-thumb-border-size', `${this.options.selectedThumbBorderSize}px`)
        this.containerElement.style.setProperty('--selected-thumb-border-color', this.options.selectedThumbBordercolor)
        this.containerElement.style.setProperty('--active-track-color', this.options.activeTrackColor)
        this.containerElement.style.setProperty('--active-label-color', this.options.activeLabelColor)
        this.containerElement.style.setProperty('--active-thumb-color', this.options.activeThumbColor)
        this.containerElement.style.setProperty('--inactive-track-color', this.options.inactiveTrackColor)
        this.containerElement.style.setProperty('--inactive-label-color', this.options.inactiveLabelColor)
        this.containerElement.style.setProperty('--inactive-thumb-color', this.options.inactiveThumbColor)

        this.labelsContainer = document.createElement('div')
        this.containerElement.appendChild(this.labelsContainer)
        this.labelsContainer.classList.add('step-slider-labels-container')

        for (let i = this.options.min; i <= this.options.max; i += this.options.step) {
            const labelElement = document.createElement('div')
            labelElement.classList.add('step-slider-label')
            labelElement.innerText = i.toString()
            labelElement.style.setProperty('--index', this.valueToIndex(i).toString())
            this.labelsContainer.appendChild(labelElement)
        }

        this.inputRangeElement.parentNode.replaceChild(this.containerElement, this.inputRangeElement)
        this.containerElement.appendChild(this.inputRangeElement)
        this.containerElement.style.setProperty('--labels-container-height', `${this.labelsContainer.offsetHeight}px`)

        if (this.options.dispatchOnInput) {
            this.inputRangeElement.addEventListener('input', () => {
                this.dispatchStepSliderEvent('change')
            })
        }

        this.inputRangeElement.addEventListener('input', this.setSelectedIndex.bind(this))
        this.containerElement.style.setProperty('--width', `${this.containerElement.getBoundingClientRect().width}px`)
        this.setSelectedIndex()

        this.logger.log(this.containerElement, this.options)
        return this
    }

    private dispatchStepSliderEvent(eventName: string): void {
        var event = new Event(eventName, {
            bubbles: true,
            cancelable: true,
        });
        this.inputRangeElement.dispatchEvent(event);
    }

}