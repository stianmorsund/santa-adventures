export function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function addCloseOverlayListener(overlay: HTMLElement, callback: Function) {
  if (!overlay) {
    return;
  }
  overlay.addEventListener('click', function (ev) {
    if (ev.composedPath()[0] === this) {
      callback();
    }
  });
}
