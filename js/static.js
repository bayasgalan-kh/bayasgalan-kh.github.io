(function () {
  'use strict';

  var componentSwitcher = () => {
    if ($('.component-switcher').length) {
      $('.component-switcher').map((i, item) => {
        const cs = {
          selector: $(item).find('.component-switcher-selector'),
          selectorItem: $(item).find('.component-switcher-selector-item'),
          components: $(item).find('.component-switcher-components > *')
        };

        cs.selectorItem.eq(0).addClass('-active');
        cs.components.eq(0).attr('data-cs-visibility', 'show');

        cs.selectorItem.on('click', (e) => {
          e.preventDefault();
          const index = $(e.currentTarget).attr('data-cs-index');
          cs.components.attr('data-cs-visibility', 'hidden');
          cs.components.eq(index).attr('data-cs-visibility', 'show');
          cs.selectorItem.removeClass('-active');
          $(e.currentTarget).addClass('-active');
        });
      });
    }
  };

  // -----------------------------------------------------------------------------

  (($) => {

    // Document Ready
    $(() => {

      componentSwitcher();

    });

  })($);

}());
//# sourceMappingURL=sourcemaps/static.js.map
