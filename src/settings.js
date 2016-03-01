/**
 * Default settings.
 *
 * @type {Object}
 */
const defaults = {
  activateCallback:     null,
  activateOnHover:      false,
  allowDuplicates:      true,
  allowMultiple:        false,
  anchorParentSelector: 'sup',
  anchorPattern:        /(fn|footnote|note)[:\-_\d]/gi,
  breakpoints:          {},
  dismissOnUnhover:     false,
  footnoteParentClass:  'footnote',
  footnoteSelector:     'li',
  hoverDelay:           250,
  numberResetSelector:  null,
  originalFootnotes:    'hide',
  popoverCreateDelay:   100,
  popoverDismissDelay:  300,
  positionContent:      true,
  preventPageScroll:    true,
  scope:                null,
  contentTemplate:      '<aside class="littlefoot-footnote is-positioned-bottom" data-footnote-number="<%= number %>" data-footnote-id="<%= id %>" alt="Footnote <%= number %>"><div class="littlefoot-footnote__wrapper"><div class="littlefoot-footnote__content"><%= content %></div></div><div class="littlefoot-footnote__tooltip"></div></aside>',
  buttonTemplate:       '<div class="littlefoot-footnote__container"><button class="littlefoot-footnote__button" id="<%= reference %>" data-footnote-number="<%= number %>" data-footnote-id="<%= id %>" alt="See Footnote <%= number %>" rel="footnote" data-littlefoot-footnote="<%= content %>"><svg class="littlefoot-footnote__button__ellipsis" viewbox="0 0 31 6" preserveAspectRatio="xMidYMid"><circle r="3" cx="3" cy="3" fill="white"></circle><circle r="3" cx="15" cy="3" fill="white"></circle><circle r="3" cx="27" cy="3" fill="white"></circle></svg></button></div>',
}

/**
 * Settings factory.
 * @param  {Object} options Littlefoot options.
 * @return {Object}         Settings.
 */
function createSettings(options) {

  const store = Object.assign({}, defaults, options)

  /**
   * Settings prototype.
   *
   * @type {Object}
   */
  const Settings = {
    /**
     * Returns the value of the passed setting.
     *
     * @param  {String} key The setting to retrieve.
     * @return {*}          The value of the passed setting.
     */
    get(key) {
      return store[key]
    },

    /**
     * Updates the specified setting(s) with the value(s) you pass.
     *
     * @param  {String} key   The setting name as a string or an object containing
     *                        setting-new value pairs.
     * @param  {*}      value The new value, if the first argument was a string.
     */
    set(key, value) {
      store[key] = value
    },
  }

  return Object.assign(Object.create(Settings), store)
}

export default createSettings
