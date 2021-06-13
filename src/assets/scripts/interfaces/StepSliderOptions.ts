import LabelPositions from "../enums/LabelPositions"
import Cursors from "../enums/Cursors"

export default interface StepSliderOptions {
    min: number,
    max: number,
    step: number,
    value: number,
    labelPosition?: LabelPositions,
    cursor?: Cursors,
    thumbSize?: number,
    trackSize?: number,
    labelOffset?: number,
    selectedThumbBorderSize?: number,
    selectedThumbBordercolor?: string,
    activeTrackColor?: string,
    activeLabelColor?: string,
    activeThumbColor?: string,
    inactiveTrackColor?: string,
    inactiveLabelColor?: string,
    inactiveThumbColor?: string,
    dispatchOnInput?: boolean,
}

export const defaultStepSliderOptions = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    labelPosition: LabelPositions.TOP,
    cursor: Cursors.POINTER,
    thumbSize: 9,
    trackSize: 4,
    labelOffset: 8,
    selectedThumbBorderSize: 0,
    selectedThumbBordercolor: 'green',
    activeTrackColor: 'green',
    activeLabelColor: 'green',
    activeThumbColor: 'green',
    inactiveTrackColor: 'grey',
    inactiveLabelColor: 'grey',
    inactiveThumbColor: 'grey',
    dispatchOnInput: true,
}