import StepSlider from "./classes/StepSlider";
import LabelPositions from "./enums/LabelPositions"

[
    LabelPositions.TOP,
    LabelPositions.BOTTOM
].forEach((labelPosition: LabelPositions) => {
    const inputRangeElement = document.querySelector(`input[type="range"]#range-slider-${labelPosition}`)
    if (inputRangeElement instanceof HTMLInputElement) {
        const trackValue = () => {
            document.querySelector(`#value-container-${labelPosition}`).innerHTML = inputRangeElement.value
        }
        const stepSlider = new StepSlider(inputRangeElement, {
            value: 50,
            min: 0,
            max: 3050,
            step: 500,
            labelOffset: 15,
            thumbSize: 8,
            labelPosition,
        })
        stepSlider.init()
        trackValue()
        inputRangeElement.addEventListener('change', trackValue)
    }
})
