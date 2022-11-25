import { createAction } from "@reduxjs/toolkit";
import { withPayloadType } from "./utils";

export const santaMovedLeft = createAction('Santa - Moved Left');
export const santaMovedRight = createAction('Santa - Moved Right');
export const santaJumped = createAction('Santa - Jumped');
export const santaLanded = createAction('Santa - Landed');
export const santaCrawled = createAction('Santa - Crawled');
export const santaCollectedPackage = createAction('Santa - Collected package', withPayloadType<string>());
export const santaCrashedOnPole = createAction('Santa - Crashed on pole');
export const santaCrashedOnWall = createAction('Santa - Crashed on wall');

export const santaReachedFinishline = createAction('Santa - Reached finish line');

export const pressedPlaybutton = createAction('Pressed Play');
export const pressedEscape = createAction('Pressed Escape');
export const pressedRestartGame = createAction('Pressed Restart Game');
export const pressedCredits = createAction('Pressed Toggle Credits');