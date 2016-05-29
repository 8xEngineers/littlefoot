import classList from 'dom-classlist';
import test from 'tape';
import littlefoot from '../src/';
import simulant from 'simulant';
import { setup, sleep, teardown } from './helper';

test('littlefoot setup with default options', (t) => {
  setup('default.html');

  const body             = document.body;
  const footnotes        = body.querySelectorAll('.footnote').length;
  const reverseFootnotes = body.querySelectorAll('.reversefootnote').length;

  littlefoot();

  t.equal(body.querySelectorAll('.littlefoot-footnote__container').length, footnotes,
    'inserts footnote containers');

  t.equal(body.querySelectorAll('button').length, footnotes,
    'inserts footnote buttons');

  t.equal(body.querySelectorAll('.footnote-processed').length, reverseFootnotes,
    'processes footnotes');

  t.equal(body.querySelectorAll('.footnotes').length, 1,
    'adds a footnote container');

  t.equal(body.querySelectorAll('.footnotes.footnote-print-only').length, 1,
    'hides the footnote container');

  t.equal(body.querySelectorAll('hr.footnote-print-only').length, 1,
    'hides the footnote separator');

  t.equal(body.querySelectorAll('li.footnote-print-only').length, reverseFootnotes,
    'hides all footnotes');

  t.equal(body.querySelectorAll('button.is-active').length, 0,
    'has no active footnotes');

  teardown();
  t.end();
});


test('footnote activation and dismissal', (t) => {
  setup('default.html');

  const lf            = littlefoot();
  const activateDelay = lf.getSetting('activateDelay');
  const dismissDelay  = lf.getSetting('dismissDelay');
  const button        = document.body.querySelector('button[data-footnote-id="1"]');

  // these should do nothing
  lf.activate();
  lf.activate('');
  lf.activate('#invalid');

  sleep(activateDelay)
    .then(() => {

      t.equal(document.body.querySelectorAll('button.is-active').length, 0,
        'displays no popovers on invalid activate()');

      t.equal(button.getAttribute('aria-expanded'), 'false', 'changes ARIA expanded attribute to false');
      t.equal(button.getAttribute('aria-label'), 'Footnote 1', 'sets ARIA label');

      // activate button
      lf.activate('button[data-footnote-id="1"]');

      return sleep(activateDelay);
    })
    .then(() => {
      const popover = document.body.querySelector('.littlefoot-footnote');
      const wrapper = document.body.querySelector('.littlefoot-footnote__wrapper');
      const content = document.body.querySelector('.littlefoot-footnote__content');

      t.equal(button.getAttribute('aria-controls'), popover.getAttribute('id'), 'sets ARIA controls');
      t.equal(button.getAttribute('aria-expanded'), 'true', 'changes ARIA expanded attribute to true');

      t.equal(content.innerHTML.trim(), button.getAttribute('data-footnote-content').trim(),
        'injects content into popover');

      t.equal(document.body.querySelectorAll('button.is-active').length, 1, 'displays one popover on activate()');

      t.ok(popover.getAttribute('data-footnote-max-height'),
        'sets a data-footnote-max-height');

      t.equal(parseFloat(popover.style.maxWidth), document.body.clientWidth,
        'sets maximum popover width to document width');

      t.equal(parseFloat(content.offsetWidth), parseFloat(wrapper.style.maxWidth),
        'fits wrapper to content width');

      lf.dismiss();
      return sleep(dismissDelay);
    })
    .then(() => {
      t.notOk(classList(button).contains('is-active'),
        'dismisses popovers on dismiss()');

      simulant.fire(button, 'click');

      t.ok(classList(button).contains('changing'),
        'transitions popover activation on click');

      return sleep(activateDelay);
    })
    .then(() => {
      t.ok(classList(button).contains('is-active'),
        'activates one popover on button click event');

      simulant.fire(document.body, 'click');
      return sleep(dismissDelay);
    })
    .then(() => {
      t.notOk(classList(button).contains('is-active'),
        'dismisses popovers on body click event');

      simulant.fire(button, 'click');
      return sleep(activateDelay);
    })
    .then(() => {
      simulant.fire(button, 'click');
      return sleep(dismissDelay);
    })
    .then(() => {
      t.notOk(classList(button).contains('is-active'),
        'dismisses popovers on clicking the button again');

      teardown();
      t.end();
    });
});
