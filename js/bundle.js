(function (require$$0) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

  /**
   * Extending jQuery
   */
  var extendJquery = () => {

    /**
     * Create :focusable selector for jQuery
     *
     * @examples
     * $(:focusable).on('focus', () => { ... });
     * $(.element > :focusable).on('focus', () => { ... });
     * $variable.find(':focusable').on('focus', () => { ... });
     *
     */
    $.extend($.expr[':'], {
      focusable(el) {
        return $(el).is('a, button, :input, [tabindex]');
      }
    });

    // $.fn.slideFadeToggle = function(speed, easing, callback) {
    //   return this.animate({
    //     opacity: 'toggle',
    //     height: 'toggle'
    //   }, speed, easing, callback);
    // };
    //
    // $.fn.slideFadeIn = function(speed, easing, callback) {
    //   return this.animate({
    //     opacity: 'show',
    //     height: 'show',
    //     marginTop: 'show',
    //     marginBottom: 'show',
    //     paddingTop: 'show',
    //     paddingBottom: 'show'
    //   }, speed, easing, callback);
    // };
    //
    // $.fn.slideFadeOut = function(speed, easing, callback) {
    //   return this.animate({
    //     opacity: 'hide',
    //     height: 'hide',
    //     marginTop: 'hide',
    //     marginBottom: 'hide',
    //     paddingTop: 'hide',
    //     paddingBottom: 'hide'
    //   }, speed, easing, callback);
    // };

  };

  class Animate {

    constructor(elements, rootMargin) {
      this.elements = $(elements);
      this.rootMargin = rootMargin || '0px 0px -100px 0px';
      this.observe();
    }

    observe() {
      const supportsIntersectionObserver = !!window.IntersectionObserver;
      if (supportsIntersectionObserver) {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const $element = $(entry.target),
                    data = $element.data(),
                    animation = data.animation,
                    delay = data.animationDelay || null,
                    duration = data.animationDuration || null
              ;
              $element
                .css({
                  animationDelay: delay ? `${delay}ms` : '',
                  animationDuration: duration ? `${duration}ms` : ''
                })
                .addClass(`-animated ${animation}`)
              ;
              observer.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: this.rootMargin
        });
        this.elements.each((index, element) => {
          observer.observe(element);
        });
      }
    }
  }

  /**
   * Provide a centralized class for triggering loading element. Can keep track of
   * multiple loading events, to ensure the element stays on the screen until all
   * AJAX events are truly finished in the rare event multiple ones occur at once.
   */
  var loading = () => {

    class Falcore_Loading {
      constructor() {
        this._loadingEvents = new Map();
        this._$loadingElement = $('<div class="loading-spinner"><div class="loading-spinner-text">Loading</div></div>');
      }

      /**
       * Register a loading event as ongoing. Either the given name will be
       * registered with a count of 1, or the count will be increased by 1 if
       * already registered.
       *
       * Pass true as the second parameter to deem the event unique. Unique events
       * will not have their count increased if already registired. This is useful
       * if the same starting event may be called multiple times before a single
       * ending event finally occurs.
       */
      addEvent(name, unique) {
        if (!this._loadingEvents.has(name)) {
          this._loadingEvents.set(name, 1);
        } else if (!unique) {
          const newCount = this._loadingEvents.get(name) + 1;
          this._loadingEvents.set(name, newCount);
        }

        this._checkStatus();
      }

      endEvent(name) {
        const currentCount = this._loadingEvents.get(name);

        if (typeof currentCount === 'undefined') {
          return;
        }

        if (currentCount > 1) {
          this._loadingEvents.set(name, currentCount - 1);
        } else {
          this._loadingEvents.delete(name);
        }

        this._checkStatus();
      }

      _checkStatus() {
        if (this._loadingEvents.size) {
          if (!this._$loadingElement.parent().length) {
            // If this is the first time we have a loading event, insert the element into the DOM
            this._$loadingElement.appendTo('body');
          }

          // Make element visible
          this._$loadingElement.addClass('-loading');
        } else if (this._$loadingElement.parent().length) {
          // No loading events. If spinner is in the DOM, make sure it's hidden
          this._$loadingElement.removeClass('-loading');
        }
      }
    }

    if (typeof window.falcoreLoading === 'undefined') {
      window.falcoreLoading = new Falcore_Loading();
    }

  };

  var f;(function(t){t.ShowOverflow="showOverflow",t.HideOverflow="hideOverflow",t.ItemsChanged="itemsChanged",t.ToggleClicked="toggleClicked";})(f||(f={}));function N(t,l={}){return new CustomEvent(t,{detail:l})}function H(){return N(f.ShowOverflow)}function O(){return N(f.HideOverflow)}function I({overflowCount:t}){return N(f.ItemsChanged,{overflowCount:t})}function $$1({original:t}){return N(f.ToggleClicked,{original:t})}function Q(){let{port1:t}=new MessageChannel;return {addEventListener:t.addEventListener.bind(t),dispatchEvent:t.dispatchEvent.bind(t),removeEventListener:t.removeEventListener.bind(t)}}var P=Q;function X(){let t={eventReady:!1},l=P(),i=new Map;function c(p,d,o=!0){function E(M){(!o||t.eventReady)&&d(M);}return i.set(d,{eventType:p,wrappedCallback:E}),l.addEventListener(p,E),this}function m(p,d){let{wrappedCallback:o}=i.get(d);return l.removeEventListener(p,o),this}function v(p){l.dispatchEvent(p);}function r(p=!0){t.eventReady=p;}return {off:m,on:c,setEventReady:r,trigger:v}}var x=X;function Y(){let t=new WeakMap;return function(i,c){return t.get(i)||t.set(i,new Map(Array.from(i).reduce((m,v,r)=>m.concat([[v,c[r]]]),[]))),t.get(i)}}var k=Y;function Z(t,l={}){return typeof t=="string"?t:t(l)}var h=Z;function ee(t){if(t&&t.length)throw new Error(`
- ${t.join(`
- `)}`)}function te(t){return [!(t instanceof Element)&&"Target must be an HTMLElement.",(!t.children||!t.children.length)&&"Target must be the direct parent of the individual nav items."].filter(Boolean)}function ne(t,l){return Object.keys(t).map(i=>typeof l[i]=="undefined"?`Unrecognised option: ${i}`:void 0).filter(Boolean)}function re(t,l,i){return [...te(t),...ne(l,i)]}function ae(t,l,i){ee(re(t,l,i));}var B=ae;var e;(function(t){t.Container="container",t.Main="main",t.PrimaryNavWrapper="primary-nav-wrapper",t.PrimaryNav="primary-nav",t.OverflowNav="overflow-nav",t.ToggleBtn="toggle-btn",t.NavItems="nav-item";})(e||(e={}));var g;(function(t){t.ButtonVisible="is-showing-toggle",t.OverflowVisible="is-showing-overflow",t.PrimaryHidden="is-hiding-primary";})(g||(g={}));var C={classNames:{[e.Container]:["p-plus-container"],[e.Main]:["p-plus"],[e.PrimaryNavWrapper]:["p-plus__primary-wrapper"],[e.PrimaryNav]:["p-plus__primary"],[e.OverflowNav]:["p-plus__overflow"],[e.ToggleBtn]:["p-plus__toggle-btn"],[e.NavItems]:["p-plus__primary-nav-item"]},collapseAtCount:-1,openOnToggle:!0,defaultOverflowVisible:!1,innerToggleTemplate:"More"};function ie(t,l={}){let i={...C,...l,classNames:{...C.classNames,...l.classNames}},{classNames:c}=i,m=x(),v={eventListeners:new Map,itemMap:new WeakMap},r={clone:{},primary:{}},p=k();function d(n){return c[n].join(" ")}function o(n){return `data-${n}`}function E(){return `
      <div ${o(e.Main)} class="${d(e.Main)}">
        <div class="${d(e.PrimaryNavWrapper)}" ${o(e.PrimaryNavWrapper)}></div>
        <button
          ${o(e.ToggleBtn)}
          class="${d(e.ToggleBtn)}"
          aria-expanded="false"
        >${h(i.innerToggleTemplate)}</button>
        <${t.tagName}
          ${o(e.OverflowNav)}
          class="${d(e.OverflowNav)}"
          aria-hidden="true"
        >
        </${t.tagName}>
      </div>
    `}function M(n){let a=n.cloneNode(!0);return A(a),Array.from(a.children).forEach(R),a}function A(n){n.classList.add(...c[e.PrimaryNav]),n.setAttribute(o(e.PrimaryNav),"");}function R(n){n.classList.add(...c[e.NavItems]),n.setAttribute(o(e.NavItems),"");}function W(){let{itemMap:n}=v,a=E(),s=document.createElement("div");s.classList.add(...c[e.Container]),s.setAttribute(o(e.Container),"true"),r[e.Container]=s;let u=document.createRange().createContextualFragment(a);r.primary[e.PrimaryNavWrapper]=u.querySelector(`[${o(e.PrimaryNavWrapper)}]`),r.primary[e.PrimaryNavWrapper].appendChild(M(t));let T=u.cloneNode(!0);r.primary[e.Main]=u.querySelector(`[${o(e.Main)}]`),r.primary[e.PrimaryNav]=u.querySelector(`[${o(e.PrimaryNav)}]`),r.primary[e.NavItems]=Array.from(u.querySelectorAll(`[${o(e.NavItems)}]`)),r.primary[e.OverflowNav]=u.querySelector(`[${o(e.OverflowNav)}]`),r.primary[e.ToggleBtn]=u.querySelector(`[${o(e.ToggleBtn)}]`),r.clone[e.Main]=T.querySelector(`[${o(e.Main)}]`),r.clone[e.NavItems]=Array.from(T.querySelectorAll(`[${o(e.NavItems)}]`)),r.clone[e.ToggleBtn]=T.querySelector(`[${o(e.ToggleBtn)}]`),r.clone[e.Main].setAttribute("aria-hidden","true"),r.clone[e.Main].setAttribute("data-clone","true"),r.clone[e.Main].classList.add(`${c[e.Main][0]}--clone`),r.clone[e.Main].classList.add(`${c[e.Main][0]}--${g.ButtonVisible}`),s.appendChild(u),s.appendChild(T),r.clone[e.NavItems].forEach(K=>n.set(K,e.PrimaryNav)),t.parentNode.replaceChild(s,t);}function j(n=!0){r.primary[e.Main].classList[n?"add":"remove"](`${c[e.Main][0]}--${g.ButtonVisible}`),typeof i.innerToggleTemplate!="string"&&[r.primary[e.ToggleBtn],r.clone[e.ToggleBtn]].forEach(a=>{a.innerHTML=h(i.innerToggleTemplate,{toggleCount:r.primary[e.OverflowNav].children.length,totalCount:r.clone[e.NavItems].length});});}function L(n){let{itemMap:a}=v;return r.clone[e.NavItems].filter(s=>a.get(s)===n)}function V(n){let{collapseAtCount:a}=i;if(n===e.PrimaryNav||a<0)return L(n);let s=L(e.PrimaryNav).length;return s>0&&s<=a?r.clone[e.NavItems]:L(n)}function _(n){let a=r.primary[n].cloneNode();return V(n).forEach(s=>{let u=p(r.clone[e.NavItems],r.primary[e.NavItems]).get(s);a.appendChild(u);}),a}function q(n){let a=_(n);r.primary[n].parentNode.replaceChild(a,r.primary[n]),r.primary[n]=a;}function D({target:n,intersectionRatio:a}){v.itemMap.set(n,a<.99?e.OverflowNav:e.PrimaryNav);}function S(n){n.forEach(D),[e.PrimaryNav,e.OverflowNav].forEach(q),m.trigger(I({overflowCount:r.primary[e.OverflowNav].children.length})),m.setEventReady(!0);}function y(n=!0){let a=`${c[e.Main][0]}--${g.OverflowVisible}`;return r.primary[e.Main].classList[n?"add":"remove"](a),r.primary[e.OverflowNav].setAttribute("aria-hidden",n?"false":"true"),r.primary[e.ToggleBtn].setAttribute("aria-expanded",n?"true":"false"),m.trigger(n?H():O()),this}function b(){let n=`${c[e.Main][0]}--${g.OverflowVisible}`;return y(!r.primary[e.Main].classList.contains(n)),this}function F(n=!0){let a=`${c[e.Main][0]}--${g.PrimaryHidden}`;r.primary[e.Main].classList[n?"add":"remove"](a),r.primary[e.PrimaryNav].setAttribute("aria-hidden",String(n));}function w(n){n.preventDefault(),m.trigger($$1({original:n}));}function U({detail:{overflowCount:n}={}}){j(n>0),n===0&&y(!1),F(n===r.clone[e.NavItems].length);}function z(){return {...r.primary}}function G(){v.observer=new IntersectionObserver(S,{root:r.clone[e.Main],rootMargin:"0px 0px 0px 0px",threshold:[.99]}),r.clone[e.NavItems].forEach(n=>v.observer.observe(n)),r.primary[e.ToggleBtn].addEventListener("click",w),m.on(f.ItemsChanged,U,!1),i.openOnToggle&&m.on(f.ToggleClicked,b,!1);}function J(){v.observer&&v.observer.disconnect(),r.primary[e.ToggleBtn].removeEventListener("click",w),Array.from(v.eventListeners.entries()).forEach(([a,{eventType:s}])=>{m.off(s,a);}),r[e.Container].parentNode.replaceChild(t,r[e.Container]);}return function(){B(t,l,C),W(),G(),i.defaultOverflowVisible&&y(!0);}(),{destroy:J,getNavElements:z,off:m.off,on:m.on,setOverflowNavOpen:y,toggleOverflowNav:b}}var Ne=ie;

  // if there is an active alert banner on the page,
  // we need to reset the min height of the mega menu dropdown to compensate for the height of the alert banner
  // so that the inner content is scrollable when open

  var alertBannerOffset = () => {

    const $siteHeader = $('.site-header'),
          $alertBanner = $('.alert-banner'),
          $menuDropdown = $('.site-header-dropdown'),
          $siteHeaderNav = $('.site-header-nav')
    ;

    let headerOffset = ($alertBanner.attr('data-active') === 'true') ? $alertBanner.outerHeight() + $siteHeader.outerHeight() : $siteHeader.outerHeight();

    // compensate for the weird area when the main nav at bottom of site header
    if ($(window).width() >= 1024 && $(window).width() < 1200) {
      headerOffset -= $siteHeaderNav.outerHeight();
    }

    const menuDropdownCss = `calc(100vh -  ${headerOffset}px)`;
    $menuDropdown.css({ 'min-height': menuDropdownCss });

  };

  var siteHeader = () => {

    const $html = $('html'),
          $menuToggle = $('.js-dropdown-toggle'),
          $searchToggle = $('.js-search-toggle'),
          $searchContainer = $('.site-header-search-container'),
          $userToggle = $('.js-user-btn'),
          $userDropdown = $('.utility-nav-user-dropdown'),
          $menuDropdown = $('.site-header-dropdown'),
          $memberButton = $('.js-become-member-btn'),
          $memberDropdown = $('.become-member-dropdown'),
          $memberDropdownClose = $('.js-become-member-dropdown-close'),
          $alertBanner = $('.alert-banner'),
          $coveoContainer = $('.site-header-search-container')
    ;

    // coveo
    // const $megaMenuInput = $('#AotaSectionGlobalSearchBox .magic-box-input > input');

    if ($searchToggle.length) {
      $searchToggle.on('click', (e) => {
        $searchToggle
          .attr('data-expanded', $(e.currentTarget).attr('data-expanded') === 'true' ? 'false' : 'true');
        $searchContainer
          .attr('area-expanded', $searchContainer.attr('area-expanded') === 'true' ? 'false' : 'true');
          // .slideToggle(250);
      });
    }


    // MEGAMENU Open/Close
    if ($menuDropdown.length) {

      // $menuToggle.add($searchToggle).on('click', (e) => {
      $menuToggle.on('click', (e) => {

        // scroll to top if scrolled down
        $('html, body').animate({ scrollTop: 0 }, 250);

        // if there is an active alert banner, update mega menu min height
        if ($alertBanner.length && $alertBanner.attr('data-active') === 'true') {
          alertBannerOffset();
        }

        // $html.attr('data-dropdown-menu', $html.attr('data-dropdown-menu') === 'open' ? 'closed' : 'open');

        $menuToggle
          .attr('aria-expanded', $(e.currentTarget).attr('aria-expanded') === 'true' ? 'false' : 'true')
        ;

        $menuDropdown
          .attr('data-expanded', $menuDropdown.attr('data-expanded') === 'true' ? 'false' : 'true')
          .attr('aria-hidden', $menuDropdown.attr('aria-hidden') === 'true' ? 'false' : 'true')
        ;

        // delayed adding of second data attr
        // can control display/none/grid of dropdown, and fade in inner so layout doesn't break on short pages
        if ($menuDropdown.attr('data-expanded') === 'true') {
          setTimeout(() => {
            $menuDropdown.attr('data-active', 'true');
          }, 50);
        } else {
          $menuDropdown.attr('data-active', 'false');
        }

        // focus on search input if dropdown opened from search toggle
        if ($(e.target).hasClass('js-search-toggle')) {
          setTimeout(() => {

            $('#AotaHeaderGlobalSearchBox .magic-box-input > input').trigger('focus');

            if ($('.site-header-search-input').length) {
              $('.site-header-search-input').focus();
            }

          }, 150);
        }

      });

      $(document).on('keydown', ({ key }) => {
        if (key === 'Esc' || key === 'Escape') {
          closeMegaDropdown();
        }
      });

      // coveo main header search button
      $coveoContainer.on('click', '.CoveoSearchButton', function() {
        closeMegaDropdown();
      });

      // fix for using enter to search from search hero, when megamenu open and on search results page
      const coveoID = $('#AotaMainSite'),
            heroSearch = $('.hero-search');

      if (coveoID.length && heroSearch.length) {

        coveoID.on('newResultsDisplayed', function() {
          closeMegaDropdown();
        });
      }
    }


    function closeMegaDropdown() {
      $menuToggle.attr('aria-expanded', 'false');
      $menuDropdown.attr('data-expanded', 'false').attr('aria-hidden', 'true');
      $html.attr('data-dropdown-menu', 'closed');
    }


    // User dropdown
    function closeUserDropdown() {
      $userToggle.attr('aria-expanded', 'false');
      $userDropdown
        .attr('data-expanded', 'false')
        .attr('aria-hidden', 'true')
      ;
    }

    if ($userDropdown.length) {

      $userToggle.on('click', (e) => {

        const $toggle = $(e.currentTarget),
              $state = $toggle.attr('aria-expanded');
        $toggle.attr('aria-expanded', ($state === 'true') ? 'false' : 'true');
        $userDropdown
          .attr('data-expanded', ($state === 'true') ? 'false' : 'true')
          .attr('aria-hidden', ($state === 'true') ? 'true' : 'false')
        ;

        closeMemberDropdown();

      });

      $html.on('click', () => {
        closeUserDropdown();
      });

      $userToggle.add($userDropdown).on('click', (e) => {
        e.stopPropagation();
      });

      $(document).on('keydown', ({ key }) => {
        if (key === 'Esc' || key === 'Escape') {
          closeUserDropdown();
        }
      });
    }


    // become member button
    function closeMemberDropdown() {
      $memberButton.attr('aria-expanded', 'false');
      $memberDropdown
        .attr('data-expanded', 'false')
        .attr('aria-hidden', 'true')
      ;
    }

    if ($memberDropdown.length) {

      $memberButton.on('click', (e) => {
        $(e.currentTarget).attr('aria-expanded', 'true');
        $memberDropdown
          .attr('data-expanded', 'true')
          .attr('aria-hidden', 'false')
        ;

        closeUserDropdown();
      });

      $memberDropdownClose.on('click', () => {
        closeMemberDropdown();
      });

      $html.on('click', () => {
        closeMemberDropdown();
      });

      $memberDropdown.add($memberButton).on('click', (e) => {
        e.stopPropagation();
      });

      $(document).on('keydown', ({ key }) => {
        if (key === 'Esc' || key === 'Escape') {
          closeMemberDropdown();
        }
      });
    }


    // subnav priority nav
    // https://github.com/jayfreestone/priority-plus
    const $subpageNavigation = $('.site-header-subnav');

    if ($subpageNavigation.length) {

      // eslint-disable-next-line no-unused-vars
      const $subnavPriorityNav = Ne(document.querySelector('.js-siteheader-subnav'));
      const $subnavPriorityNavToggle = $('.p-plus__toggle-btn');

      $html.on('click', () => {
        $subnavPriorityNav.setOverflowNavOpen(false);
      });

      $subnavPriorityNavToggle.on('click', (e) => {
        e.stopPropagation();
      });

    }

  };

  var mobileMenu = () => {

    const $html = $('html'),
          $mobileMenu = $('.mobile-menu'),
          $mobileMenuNav = $mobileMenu.find('.nav'),
          $memberButton = $('.js-mobile-become-member-btn'),
          $memberDropdown = $('.mobile-become-member-dropdown'),
          $memberDropdownClose = $('.js-mobile-become-member-dropdown-close')
    ;

    $('.js-mobile-menu-toggle').on('click', (e) => {
      $html.attr('data-mobile-menu', 'open');
      $mobileMenu.attr('aria-hidden', 'false');

      // focus on search input if dropdown opened from search toggle
      if ($(e.target).hasClass('mobile-search-toggle')) {
        setTimeout(() => {

          $('.mobile-menu .magic-box-input > input').trigger('focus');

          if ($('.mobile-menu-search-input').length) {
            $('.mobile-menu-search-input').focus();
          }

        }, 150);
      }
    });

    $('.js-mobile-menu-close, .js-blocker').on('click', () => {
      $html.attr('data-mobile-menu', 'closed');
      $mobileMenu.attr('aria-hidden', 'true');
      closeMemberDropdown();
    });

    $(document).on('keydown', ({ key }) => {
      if (key === 'Esc' || key === 'Escape') {
        $html.attr('data-menu', 'closed');
        $mobileMenu.attr('aria-hidden', 'true');
        closeMemberDropdown();
      }
    });

    // next button
    $('.js-mobile-menu-next').on('click', ({ target }) => {
      const $panel = $(target).next(),
            level = $panel.attr('data-nav-level'),
            height = $panel.height()
      ;
      $panel
        .attr('data-opened', 'true')
        .attr('aria-hidden', 'false')
      ;
      $mobileMenu.attr('data-level', level);
      setTimeout(() => {
        $mobileMenuNav.css('height', height);
      }, 300);
    });

    // goes back a level
    $('.js-mobile-menu-back').on('click', ({ target }) => {
      const $panel = $(target).closest('.nav-main-panel'),
            level = $panel.attr('data-nav-level') - 1,
            $prevPanel = $(target).closest(`.nav-main-panel[data-nav-level='${level}']`),
            height = $prevPanel.height()
      ;
      $panel
        .attr('data-opened', 'false')
        .attr('aria-hidden', 'true')
      ;
      $mobileMenu.attr('data-level', level);
      setTimeout(() => {
        $mobileMenuNav.css('height', (level === 1) ? '' : height);
      }, 150);


    });

    // become member button and popup
    function closeMemberDropdown() {
      $memberDropdown.slideUp(300, () => {
        $memberDropdown
          .attr('data-expanded', 'false')
          .attr('aria-hidden', 'true');
        $memberButton
          .attr('aria-expanded', 'false');
      });
    }

    if ($memberDropdown.length) {

      $memberButton.on('click', (e) => {
        $(e.currentTarget).attr('aria-expanded', 'true');
        $memberDropdown.slideDown(300, () => {
          $memberDropdown
            .attr('data-expanded', 'true')
            .attr('aria-hidden', 'false');
        });
      });

      $memberDropdownClose.on('click', () => {
        closeMemberDropdown();
      });

    }

  };

  var mobileExploreMenu = () => {

    const $html = $('html'),
          $mobileExploreToggle = $('.js-mobile-explore-menu-toggle'),
          $mobileExploreMenu = $('.js-mmobile-explore-menu-nav');

    if ($mobileExploreMenu.length) {

      $mobileExploreToggle.on('click', () => {

        $mobileExploreToggle
          .trigger('blur')
          .attr('aria-expanded', $mobileExploreToggle.attr('aria-expanded') === 'true' ? 'false' : 'true')
        ;

        $mobileExploreMenu.slideToggle(300)
          .attr('aria-hidden', $mobileExploreMenu.attr('aria-hidden') === 'true' ? 'false' : 'true')
        ;
      });

      $html.on('click', () => {
        $mobileExploreMenu.slideUp(150).attr('aria-hidden', 'true');
        $mobileExploreToggle.attr('aria-expanded', 'false');
      });

      $mobileExploreToggle.add($mobileExploreMenu).on('click', (e) => {
        e.stopPropagation();
      });

    }

  };

  /**
   * Social Share Buttons
   */
  var socialShare = () => {

    if ($('.social-share').length) {

      $('.social-share a:not([data-service="email"])').on('click', (e) => {
        e.preventDefault();

        const $service = $(e.currentTarget).data('service');

        if ($service === 'print') {
          window.print();
          return;
        }

        let url;
        const currPage = window.location.href;

        switch ($(e.currentTarget).data('service')) {
          case 'facebook':
            url = 'https://www.facebook.com/sharer/sharer.php?u=' + currPage;
            break;
          case 'twitter':
            url = 'https://twitter.com/intent/tweet/?url=' + currPage;
            break;
          case 'linkedin':
            url = 'https://www.linkedin.com/shareArticle?mini=true&url=' + currPage;
            break;
        }

        windowPopup(url);
      });
    }

  };

  function windowPopup(url) {
    const top = (screen.height / 3) - 150;
    const left = (screen.width / 2) - 250;

    // Calculate the position of the popup so it's centered on the screen.
    window.open(
      url,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height=300,top=' + top + ',left=' + left
    );
  }

  // hyperform.js.org
  var instances = new WeakMap();
  /**
   * wrap <form>s, window or document, that get treated with the global
   * hyperform()
   */

  function Wrapper(form, settings) {
    /* do not allow more than one instance per form. Otherwise we'd end
     * up with double event handlers, polyfills re-applied, ... */
    var existing = instances.get(form);

    if (existing) {
      existing.settings = settings;
      return existing;
    }

    this.form = form;
    this.settings = settings;
    this.observer = null;
    instances.set(form, this);
  }
  Wrapper.prototype = {
    destroy: function destroy() {
      instances["delete"](this.form);

      if (this._destruct) {
        this._destruct();
      }
    }
  };
  /**
   * try to get the appropriate wrapper for a specific element by looking up
   * its parent chain
   *
   * @return Wrapper | undefined
   */

  function get_wrapper(element) {
    var wrapped;

    if (element.form) {
      /* try a shortcut with the element's <form> */
      wrapped = instances.get(element.form);
    }
    /* walk up the parent nodes until document (including) */


    while (!wrapped && element) {
      wrapped = instances.get(element);
      element = element.parentNode;
    }

    if (!wrapped) {
      /* try the global instance, if exists. This may also be undefined. */
      wrapped = instances.get(window);
    }

    return wrapped;
  }

  /**
   * filter a form's elements for the ones needing validation prior to
   * a submit
   *
   * Returns an array of form elements.
   */

  function get_validated_elements(form) {
    var wrapped_form = get_wrapper(form);
    return Array.prototype.filter.call(form.elements, function (element) {
      /* it must have a name (or validating nameless inputs is allowed) */
      if (element.getAttribute('name') || wrapped_form && wrapped_form.settings.validateNameless) {
        return true;
      }

      return false;
    });
  }

  var registry = Object.create(null);
  /**
   * run all actions registered for a hook
   *
   * Every action gets called with a state object as `this` argument and with the
   * hook's call arguments as call arguments.
   *
   * @return mixed the returned value of the action calls or undefined
   */

  function call_hook(hook) {
    var result;
    var call_args = Array.prototype.slice.call(arguments, 1);

    if (hook in registry) {
      result = registry[hook].reduce(function (args) {
        return function (previousResult, currentAction) {
          var interimResult = currentAction.apply({
            state: previousResult,
            hook: hook
          }, args);
          return interimResult !== undefined ? interimResult : previousResult;
        };
      }(call_args), result);
    }

    return result;
  }
  /**
   * Filter a value through hooked functions
   *
   * Allows for additional parameters:
   * js> do_filter('foo', null, current_element)
   */

  function do_filter(hook, initial_value) {
    var result = initial_value;
    var call_args = Array.prototype.slice.call(arguments, 1);

    if (hook in registry) {
      result = registry[hook].reduce(function (previousResult, currentAction) {
        call_args[0] = previousResult;
        var interimResult = currentAction.apply({
          state: previousResult,
          hook: hook
        }, call_args);
        return interimResult !== undefined ? interimResult : previousResult;
      }, result);
    }

    return result;
  }
  /**
   * remove an action again
   */

  function remove_hook(hook, action) {
    if (hook in registry) {
      for (var i = 0; i < registry[hook].length; i++) {
        if (registry[hook][i] === action) {
          registry[hook].splice(i, 1);
          break;
        }
      }
    }
  }
  /**
   * add an action to a hook
   */

  function add_hook(hook, action, position) {
    if (!(hook in registry)) {
      registry[hook] = [];
    }

    if (position === undefined) {
      position = registry[hook].length;
    }

    registry[hook].splice(position, 0, action);
  }

  /**
   * return either the data of a hook call or the result of action, if the
   * former is undefined
   *
   * @return function a function wrapper around action
   */

  function return_hook_or (hook, action) {
    return function () {
      var data = call_hook(hook, Array.prototype.slice.call(arguments));

      if (data !== undefined) {
        return data;
      }

      return action.apply(this, arguments);
    };
  }

  /* the following code is borrowed from the WebComponents project, licensed
   * under the BSD license. Source:
   * <https://github.com/webcomponents/webcomponentsjs/blob/5283db1459fa2323e5bfc8b9b5cc1753ed85e3d0/src/WebComponents/dom.js#L53-L78>
   */
  // defaultPrevented is broken in IE.
  // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called

  var workingDefaultPrevented = function () {
    var e = document.createEvent('Event');
    e.initEvent('foo', true, true);
    e.preventDefault();
    return e.defaultPrevented;
  }();

  if (!workingDefaultPrevented) {
    var origPreventDefault = window.Event.prototype.preventDefault;

    window.Event.prototype.preventDefault = function () {
      if (!this.cancelable) {
        return;
      }

      origPreventDefault.call(this);
      Object.defineProperty(this, 'defaultPrevented', {
        get: function get() {
          return true;
        },
        configurable: true
      });
    };
  }
  /* end of borrowed code */


  function create_event(name) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$bubbles = _ref.bubbles,
        bubbles = _ref$bubbles === void 0 ? true : _ref$bubbles,
        _ref$cancelable = _ref.cancelable,
        cancelable = _ref$cancelable === void 0 ? false : _ref$cancelable;

    var event = document.createEvent('Event');
    event.initEvent(name, bubbles, cancelable);
    return event;
  }
  function trigger_event (element, event) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$bubbles = _ref2.bubbles,
        bubbles = _ref2$bubbles === void 0 ? true : _ref2$bubbles,
        _ref2$cancelable = _ref2.cancelable,
        cancelable = _ref2$cancelable === void 0 ? false : _ref2$cancelable;

    var payload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (!(event instanceof window.Event)) {
      event = create_event(event, {
        bubbles: bubbles,
        cancelable: cancelable
      });
    }

    for (var key in payload) {
      if (payload.hasOwnProperty(key)) {
        event[key] = payload[key];
      }
    }

    element.dispatchEvent(event);
    return event;
  }

  /* and datetime-local? Spec says “Nah!” */

  var dates = ['datetime', 'date', 'month', 'week', 'time'];
  var plain_numbers = ['number', 'range'];
  /* everything that returns something meaningful for valueAsNumber and
   * can have the step attribute */

  var numbers = dates.concat(plain_numbers, 'datetime-local');
  /* the spec says to only check those for syntax in validity.typeMismatch.
   * ¯\_(ツ)_/¯ */

  var type_checked = ['email', 'url'];
  /* check these for validity.badInput */

  var input_checked = ['email', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local', 'number', 'range', 'color'];
  var text = ['text', 'search', 'tel', 'password'].concat(type_checked);
  /* input element types, that are candidates for the validation API.
   * Missing from this set are: button, hidden, menu (from <button>), reset and
   * the types for non-<input> elements. */

  var validation_candidates = ['checkbox', 'color', 'file', 'image', 'radio', 'submit'].concat(numbers, text);
  /* all known types of <input> */

  var inputs = ['button', 'hidden', 'reset'].concat(validation_candidates);
  /* apparently <select> and <textarea> have types of their own */

  var non_inputs = ['select-one', 'select-multiple', 'textarea'];

  /**
   * get the element's type in a backwards-compatible way
   */

  function get_type (element) {
    if (element instanceof window.HTMLTextAreaElement) {
      return 'textarea';
    } else if (element instanceof window.HTMLSelectElement) {
      return element.hasAttribute('multiple') ? 'select-multiple' : 'select-one';
    } else if (element instanceof window.HTMLButtonElement) {
      return (element.getAttribute('type') || 'submit').toLowerCase();
    } else if (element instanceof window.HTMLInputElement) {
      var attr = (element.getAttribute('type') || '').toLowerCase();

      if (attr && inputs.indexOf(attr) > -1) {
        return attr;
      } else {
        /* perhaps the DOM has in-depth knowledge. Take that before returning
         * 'text'. */
        return element.type || 'text';
      }
    }

    return '';
  }

  /**
   * check if an element should be ignored due to any of its parents
   *
   * Checks <fieldset disabled> and <datalist>.
   */

  function is_in_disallowed_parent(element) {
    var p = element.parentNode;

    while (p && p.nodeType === 1) {
      if (p instanceof window.HTMLFieldSetElement && p.hasAttribute('disabled')) {
        /* quick return, if it's a child of a disabled fieldset */
        return true;
      } else if (p.nodeName.toUpperCase() === 'DATALIST') {
        /* quick return, if it's a child of a datalist
         * Do not use HTMLDataListElement to support older browsers,
         * too.
         * @see https://html.spec.whatwg.org/multipage/forms.html#the-datalist-element:barred-from-constraint-validation
         */
        return true;
      } else if (p === element.form) {
        /* the outer boundary. We can stop looking for relevant elements. */
        break;
      }

      p = p.parentNode;
    }

    return false;
  }
  /**
   * check if an element is a candidate for constraint validation
   *
   * @see https://html.spec.whatwg.org/multipage/forms.html#barred-from-constraint-validation
   */


  function is_validation_candidate (element) {
    /* allow a shortcut via filters, e.g. to validate type=hidden fields */
    var filtered = do_filter('is_validation_candidate', null, element);

    if (filtered !== null) {
      return !!filtered;
    }
    /* it must be any of those elements */


    if (element instanceof window.HTMLSelectElement || element instanceof window.HTMLTextAreaElement || element instanceof window.HTMLButtonElement || element instanceof window.HTMLInputElement) {
      var type = get_type(element);
      /* its type must be in the whitelist */

      if (non_inputs.indexOf(type) > -1 || validation_candidates.indexOf(type) > -1) {
        /* it mustn't be disabled or readonly */
        if (!element.hasAttribute('disabled') && !element.hasAttribute('readonly')) {
          var wrapped_form = get_wrapper(element);

          if (
          /* the parent form doesn't allow non-standard "novalidate" attributes... */
          wrapped_form && !wrapped_form.settings.novalidateOnElements ||
          /* ...or it doesn't have such an attribute/property */
          !element.hasAttribute('novalidate') && !element.noValidate) {
            /* it isn't part of a <fieldset disabled> */
            if (!is_in_disallowed_parent(element)) {
              /* then it's a candidate */
              return true;
            }
          }
        }
      }
    }
    /* this is no HTML5 validation candidate... */


    return false;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function mark (obj) {
    if (['object', 'function'].indexOf(_typeof(obj)) > -1) {
      delete obj.__hyperform;
      Object.defineProperty(obj, '__hyperform', {
        configurable: true,
        enumerable: false,
        value: true
      });
    }

    return obj;
  }

  function format_date (date) {
    var part = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    switch (part) {
      case 'date':
        return (date.toLocaleDateString || date.toDateString).call(date);

      case 'time':
        return (date.toLocaleTimeString || date.toTimeString).call(date);

      case 'month':
        return 'toLocaleDateString' in date ? date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: '2-digit'
        }) : date.toDateString();
      // case 'week':
      // TODO

      default:
        return (date.toLocaleString || date.toString).call(date);
    }
  }

  function sprintf (str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var args_length = args.length;
    var global_index = 0;
    return str.replace(/%([0-9]+\$)?([sl])/g, function (match, position, type) {
      var local_index = global_index;

      if (position) {
        local_index = Number(position.replace(/\$$/, '')) - 1;
      }

      global_index += 1;
      var arg = '';

      if (args_length > local_index) {
        arg = args[local_index];
      }

      if (arg instanceof Date || typeof arg === 'number' || arg instanceof Number) {
        /* try getting a localized representation of dates and numbers, if the
         * browser supports this */
        if (type === 'l') {
          arg = (arg.toLocaleString || arg.toString).call(arg);
        } else {
          arg = arg.toString();
        }
      }

      return arg;
    });
  }

  /* For a given date, get the ISO week number
   *
   * Source: http://stackoverflow.com/a/6117889/113195
   *
   * Based on information at:
   *
   *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
   *
   * Algorithm is to find nearest thursday, it's year
   * is the year of the week number. Then get weeks
   * between that date and the first day of that year.
   *
   * Note that dates in one year can be weeks of previous
   * or next year, overlap is up to 3 days.
   *
   * e.g. 2014/12/29 is Monday in week  1 of 2015
   *      2012/1/1   is Sunday in week 52 of 2011
   */

  function get_week_of_year (d) {
    /* Copy date so don't modify original */
    d = new Date(+d);
    d.setUTCHours(0, 0, 0);
    /* Set to nearest Thursday: current date + 4 - current day number
     * Make Sunday's day number 7 */

    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    /* Get first day of year */

    var yearStart = new Date(d.getUTCFullYear(), 0, 1);
    /* Calculate full weeks to nearest Thursday */

    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    /* Return array of year and week number */

    return [d.getUTCFullYear(), weekNo];
  }

  function pad(num) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var s = num + '';

    while (s.length < size) {
      s = '0' + s;
    }

    return s;
  }
  /**
   * calculate a string from a date according to HTML5
   */


  function date_to_string(date, element_type) {
    if (!(date instanceof Date)) {
      return null;
    }

    switch (element_type) {
      case 'datetime':
        return date_to_string(date, 'date') + 'T' + date_to_string(date, 'time');

      case 'datetime-local':
        return sprintf('%s-%s-%sT%s:%s:%s.%s', date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate()), pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds()), pad(date.getMilliseconds(), 3)).replace(/(:00)?\.000$/, '');

      case 'date':
        return sprintf('%s-%s-%s', date.getUTCFullYear(), pad(date.getUTCMonth() + 1), pad(date.getUTCDate()));

      case 'month':
        return sprintf('%s-%s', date.getUTCFullYear(), pad(date.getUTCMonth() + 1));

      case 'week':
        {
          var params = get_week_of_year(date);
          return sprintf.call(null, '%s-W%s', params[0], pad(params[1]));
        }

      case 'time':
        return sprintf('%s:%s:%s.%s', pad(date.getUTCHours()), pad(date.getUTCMinutes()), pad(date.getUTCSeconds()), pad(date.getUTCMilliseconds(), 3)).replace(/(:00)?\.000$/, '');
    }

    return null;
  }

  /**
   * return a new Date() representing the ISO date for a week number
   *
   * @see http://stackoverflow.com/a/16591175/113195
   */

  function get_date_from_week (week, year) {
    var date = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));

    if (date.getUTCDay() <= 4
    /* thursday */
    ) {
        date.setUTCDate(date.getUTCDate() - date.getUTCDay() + 1);
      } else {
      date.setUTCDate(date.getUTCDate() + 8 - date.getUTCDay());
    }

    return date;
  }

  /**
   * calculate a date from a string according to HTML5
   */

  function string_to_date (string, element_type) {
    var date;

    switch (element_type) {
      case 'datetime':
        if (!/^([0-9]{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(string)) {
          return null;
        }

        date = new Date(string + 'z');
        return isNaN(date.valueOf()) ? null : date;

      case 'date':
        if (!/^([0-9]{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(string)) {
          return null;
        }

        date = new Date(string);
        return isNaN(date.valueOf()) ? null : date;

      case 'month':
        if (!/^([0-9]{4})-(0[1-9]|1[012])$/.test(string)) {
          return null;
        }

        date = new Date(string);
        return isNaN(date.valueOf()) ? null : date;

      case 'week':
        if (!/^([0-9]{4})-W(0[1-9]|[1234][0-9]|5[0-3])$/.test(string)) {
          return null;
        }

        return get_date_from_week(Number(RegExp.$2), Number(RegExp.$1));

      case 'time':
        if (!/^([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(string)) {
          return null;
        }

        date = new Date('1970-01-01T' + string + 'z');
        return date;
    }

    return null;
  }

  /**
   * calculate a number from a string according to HTML5
   */

  function string_to_number (string, element_type) {
    var rval = string_to_date(string, element_type);

    if (rval !== null) {
      return +rval;
    }
    /* not parseFloat, because we want NaN for invalid values like "1.2xxy" */


    return Number(string);
  }

  /**
   * the following validation messages are from Firefox source,
   * http://mxr.mozilla.org/mozilla-central/source/dom/locales/en-US/chrome/dom/dom.properties
   * released under MPL license, http://mozilla.org/MPL/2.0/.
   */

  var catalog = {
    en: {
      TextTooLong: 'Please shorten this text to %l characters or less (you are currently using %l characters).',
      ValueMissing: 'Please fill out this field.',
      CheckboxMissing: 'Please check this box if you want to proceed.',
      RadioMissing: 'Please select one of these options.',
      FileMissing: 'Please select a file.',
      SelectMissing: 'Please select an item in the list.',
      InvalidEmail: 'Please enter an email address.',
      InvalidURL: 'Please enter a URL.',
      PatternMismatch: 'Please match the requested format.',
      PatternMismatchWithTitle: 'Please match the requested format: %l.',
      NumberRangeOverflow: 'Please select a value that is no more than %l.',
      DateRangeOverflow: 'Please select a value that is no later than %l.',
      TimeRangeOverflow: 'Please select a value that is no later than %l.',
      NumberRangeUnderflow: 'Please select a value that is no less than %l.',
      DateRangeUnderflow: 'Please select a value that is no earlier than %l.',
      TimeRangeUnderflow: 'Please select a value that is no earlier than %l.',
      StepMismatch: 'Please select a valid value. The two nearest valid values are %l and %l.',
      StepMismatchOneValue: 'Please select a valid value. The nearest valid value is %l.',
      BadInputNumber: 'Please enter a number.'
    }
  };
  /**
   * the global language Hyperform will use
   */

  var language = 'en';
  /**
   * the base language according to BCP47, i.e., only the piece before the first hyphen
   */

  var base_lang = 'en';
  /**
   * set the language for Hyperform’s messages
   */

  function set_language(newlang) {
    language = newlang;
    base_lang = newlang.replace(/[-_].*/, '');
  }
  /**
   * add a lookup catalog "string: translation" for a language
   */

  function add_translation(lang, new_catalog) {
    if (!(lang in catalog)) {
      catalog[lang] = {};
    }

    for (var key in new_catalog) {
      if (new_catalog.hasOwnProperty(key)) {
        catalog[lang][key] = new_catalog[key];
      }
    }
  }
  /**
   * return `s` translated into the current language
   *
   * Defaults to the base language and then English if the former has no
   * translation for `s`.
   */

  function _ (s) {
    if (language in catalog && s in catalog[language]) {
      return catalog[language][s];
    } else if (base_lang in catalog && s in catalog[base_lang]) {
      return catalog[base_lang][s];
    } else if (s in catalog.en) {
      return catalog.en[s];
    }

    return s;
  }

  var default_step = {
    'datetime-local': 60,
    datetime: 60,
    time: 60
  };
  var step_scale_factor = {
    'datetime-local': 1000,
    datetime: 1000,
    date: 86400000,
    week: 604800000,
    time: 1000
  };
  var default_step_base = {
    week: -259200000
  };
  var default_min = {
    range: 0
  };
  var default_max = {
    range: 100
  };

  /**
   * get previous and next valid values for a stepped input element
   */

  function get_next_valid (element) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var type = get_type(element);
    var aMin = element.getAttribute('min');
    var min = default_min[type] || NaN;

    if (aMin) {
      var pMin = string_to_number(aMin, type);

      if (!isNaN(pMin)) {
        min = pMin;
      }
    }

    var aMax = element.getAttribute('max');
    var max = default_max[type] || NaN;

    if (aMax) {
      var pMax = string_to_number(aMax, type);

      if (!isNaN(pMax)) {
        max = pMax;
      }
    }

    var aStep = element.getAttribute('step');
    var step = default_step[type] || 1;

    if (aStep && aStep.toLowerCase() === 'any') {
      /* quick return: we cannot calculate prev and next */
      return [_('any value'), _('any value')];
    } else if (aStep) {
      var pStep = string_to_number(aStep, type);

      if (!isNaN(pStep)) {
        step = pStep;
      }
    }

    var default_value = string_to_number(element.getAttribute('value'), type);
    var value = string_to_number(element.value || element.getAttribute('value'), type);

    if (isNaN(value)) {
      /* quick return: we cannot calculate without a solid base */
      return [_('any valid value'), _('any valid value')];
    }

    var step_base = !isNaN(min) ? min : !isNaN(default_value) ? default_value : default_step_base[type] || 0;
    var scale = step_scale_factor[type] || 1;
    var prev = step_base + Math.floor((value - step_base) / (step * scale)) * (step * scale) * n;
    var next = step_base + (Math.floor((value - step_base) / (step * scale)) + 1) * (step * scale) * n;

    if (prev < min) {
      prev = null;
    } else if (prev > max) {
      prev = max;
    }

    if (next > max) {
      next = null;
    } else if (next < min) {
      next = min;
    }
    /* convert to date objects, if appropriate */


    if (dates.indexOf(type) > -1) {
      prev = date_to_string(new Date(prev), type);
      next = date_to_string(new Date(next), type);
    }

    return [prev, next];
  }

  /**
   * patch String.length to account for non-BMP characters
   *
   * @see https://mathiasbynens.be/notes/javascript-unicode
   * We do not use the simple [...str].length, because it needs a ton of
   * polyfills in older browsers.
   */

  function unicode_string_length (str) {
    return str.match(/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g).length;
  }

  /**
   * internal storage for custom error messages
   */

  var store = new WeakMap();
  /**
   * register custom error messages per element
   */

  var custom_messages = {
    set: function set(element, validator, message) {
      var messages = store.get(element) || {};
      messages[validator] = message;
      store.set(element, messages);
      return custom_messages;
    },
    get: function get(element, validator) {
      var _default = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      var messages = store.get(element);

      if (messages === undefined || !(validator in messages)) {
        var data_id = 'data-' + validator.replace(/[A-Z]/g, '-$&').toLowerCase();

        if (element.hasAttribute(data_id)) {
          /* if the element has a data-validator attribute, use this as fallback.
           * E.g., if validator == 'valueMissing', the element can specify a
           * custom validation message like this:
           *     <input data-value-missing="Oh noes!">
           */
          return element.getAttribute(data_id);
        }

        return _default;
      }

      return messages[validator];
    },
    "delete": function _delete(element) {
      var validator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!validator) {
        return store["delete"](element);
      }

      var messages = store.get(element) || {};

      if (validator in messages) {
        delete messages[validator];
        store.set(element, messages);
        return true;
      }

      return false;
    }
  };

  /**
   * the internal storage for messages
   */

  var store$1 = new WeakMap();
  /* jshint -W053 */

  /* allow new String() */

  /**
   * handle validation messages
   *
   * Falls back to browser-native errors, if any are available. The messages
   * are String objects so that we can mark() them.
   */

  var message_store = {
    set: function set(element, message) {
      var is_custom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (element instanceof window.HTMLFieldSetElement) {
        var wrapped_form = get_wrapper(element);

        if (wrapped_form && !wrapped_form.settings.extendFieldset) {
          /* make this a no-op for <fieldset> in strict mode */
          return message_store;
        }
      }

      if (typeof message === 'string') {
        message = new String(message);
      }

      if (is_custom) {
        message.is_custom = true;
      }

      mark(message);
      store$1.set(element, message);
      /* allow the :invalid selector to match */

      if ('_original_setCustomValidity' in element) {
        element._original_setCustomValidity(message.toString());
      }

      return message_store;
    },
    get: function get(element) {
      var message = store$1.get(element);

      if (message === undefined && '_original_validationMessage' in element) {
        /* get the browser's validation message, if we have none. Maybe it
         * knows more than we. */
        message = new String(element._original_validationMessage);
      }

      return message ? message : new String('');
    },
    "delete": function _delete(element) {
      var is_custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if ('_original_setCustomValidity' in element) {
        element._original_setCustomValidity('');
      }

      var message = store$1.get(element);

      if (message && is_custom && !message.is_custom) {
        /* do not delete "native" messages, if asked */
        return false;
      }

      return store$1["delete"](element);
    }
  };

  var internal_registry = new WeakMap();
  /**
   * A registry for custom validators
   *
   * slim wrapper around a WeakMap to ensure the values are arrays
   * (hence allowing > 1 validators per element)
   */

  var custom_validator_registry = {
    set: function set(element, validator) {
      var current = internal_registry.get(element) || [];
      current.push(validator);
      internal_registry.set(element, current);
      return custom_validator_registry;
    },
    get: function get(element) {
      return internal_registry.get(element) || [];
    },
    "delete": function _delete(element) {
      return internal_registry["delete"](element);
    }
  };

  /**
   * test whether the element suffers from bad input
   */

  function test_bad_input (element) {
    var type = get_type(element);

    if (input_checked.indexOf(type) === -1) {
      /* we're not interested, thanks! */
      return true;
    }
    /* the browser hides some bad input from the DOM, e.g. malformed numbers,
     * email addresses with invalid punycode representation, ... We try to resort
     * to the original method here. The assumption is, that a browser hiding
     * bad input will hopefully also always support a proper
     * ValidityState.badInput */


    if (!element.value) {
      if ('_original_validity' in element && !element._original_validity.__hyperform) {
        return !element._original_validity.badInput;
      }
      /* no value and no original badInput: Assume all's right. */


      return true;
    }

    var result = true;

    switch (type) {
      case 'color':
        result = /^#[a-f0-9]{6}$/.test(element.value);
        break;

      case 'number':
      case 'range':
        result = !isNaN(Number(element.value));
        break;

      case 'datetime':
      case 'date':
      case 'month':
      case 'week':
      case 'time':
        result = string_to_date(element.value, type) !== null;
        break;

      case 'datetime-local':
        result = /^([0-9]{4,})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(element.value);
        break;
    }

    return result;
  }

  /**
   * test the max attribute
   *
   * we use Number() instead of parseFloat(), because an invalid attribute
   * value like "123abc" should result in an error.
   */

  function test_max (element) {
    var type = get_type(element);

    if (!element.value || !element.hasAttribute('max')) {
      /* we're not responsible here */
      return true;
    }

    var value, max;

    if (dates.indexOf(type) > -1) {
      value = string_to_date(element.value, type);
      value = value === null ? NaN : +value;
      max = string_to_date(element.getAttribute('max'), type);
      max = max === null ? NaN : +max;
    } else {
      value = Number(element.value);
      max = Number(element.getAttribute('max'));
    }
    /* we cannot validate invalid values and trust on badInput, if isNaN(value) */


    return isNaN(max) || isNaN(value) || value <= max;
  }

  /**
   * test the maxlength attribute
   */

  function test_maxlength (element) {
    if (!element.value || text.indexOf(get_type(element)) === -1 || !element.hasAttribute('maxlength') || !element.getAttribute('maxlength') // catch maxlength=""
    ) {
        return true;
      }

    var maxlength = parseInt(element.getAttribute('maxlength'), 10);
    /* check, if the maxlength value is usable at all.
     * We allow maxlength === 0 to basically disable input (Firefox does, too).
     */

    if (isNaN(maxlength) || maxlength < 0) {
      return true;
    }

    return unicode_string_length(element.value) <= maxlength;
  }

  /**
   * test the min attribute
   *
   * we use Number() instead of parseFloat(), because an invalid attribute
   * value like "123abc" should result in an error.
   */

  function test_min (element) {
    var type = get_type(element);

    if (!element.value || !element.hasAttribute('min')) {
      /* we're not responsible here */
      return true;
    }

    var value, min;

    if (dates.indexOf(type) > -1) {
      value = string_to_date(element.value, type);
      value = value === null ? NaN : +value;
      min = string_to_date(element.getAttribute('min'), type);
      min = min === null ? NaN : +min;
    } else {
      value = Number(element.value);
      min = Number(element.getAttribute('min'));
    }
    /* we cannot validate invalid values and trust on badInput, if isNaN(value) */


    return isNaN(min) || isNaN(value) || value >= min;
  }

  /**
   * test the minlength attribute
   */

  function test_minlength (element) {
    if (!element.value || text.indexOf(get_type(element)) === -1 || !element.hasAttribute('minlength') || !element.getAttribute('minlength') // catch minlength=""
    ) {
        return true;
      }

    var minlength = parseInt(element.getAttribute('minlength'), 10);
    /* check, if the minlength value is usable at all. */

    if (isNaN(minlength) || minlength < 0) {
      return true;
    }

    return unicode_string_length(element.value) >= minlength;
  }

  /**
   * test the pattern attribute
   */

  function test_pattern (element) {
    return !element.value || !element.hasAttribute('pattern') || new RegExp('^(?:' + element.getAttribute('pattern') + ')$').test(element.value);
  }

  /**
   * get all radio buttons (including `element`) that belong to element's
   * radio group
   */

  function get_radiogroup(element) {
    if (element.form) {
      return Array.prototype.filter.call(element.form.elements, function (radio) {
        return radio.type === 'radio' && radio.name === element.name;
      });
    }

    return [element];
  }

  function has_submittable_option(select) {
    /* Definition of the placeholder label option:
     * https://www.w3.org/TR/html5/sec-forms.html#element-attrdef-select-required
     * Being required (the first constraint in the spec) is trivially true, since
     * this function is only called for such selects.
     */
    var has_placeholder_option = !select.multiple && select.size <= 1 && select.options.length > 0 && select.options[0].parentNode == select && select.options[0].value === '';
    return (
      /* anything selected at all? That's redundant with the .some() call below,
       * but more performant in the most probable error case. */
      select.selectedIndex > -1 && Array.prototype.some.call(select.options, function (option) {
        return (
          /* it isn't the placeholder option */
          (!has_placeholder_option || option.index !== 0) &&
          /* it isn't disabled */
          !option.disabled &&
          /* and it is, in fact, selected */
          option.selected
        );
      })
    );
  }
  /**
   * test the required attribute
   */


  function test_required (element) {
    if (element.type === 'radio') {
      /* the happy (and quick) path for radios: */
      if (element.hasAttribute('required') && element.checked) {
        return true;
      }

      var radiogroup = get_radiogroup(element);
      /* if any radio in the group is required, we need any (not necessarily the
       * same) radio to be checked */

      if (radiogroup.some(function (radio) {
        return radio.hasAttribute('required');
      })) {
        return radiogroup.some(function (radio) {
          return radio.checked;
        });
      }
      /* not required, validation passes */


      return true;
    }

    if (!element.hasAttribute('required')) {
      /* nothing to do */
      return true;
    }

    if (element instanceof window.HTMLSelectElement) {
      return has_submittable_option(element);
    }

    return element.type === 'checkbox' ? element.checked : !!element.value;
  }

  /**
   * test the step attribute
   */

  function test_step (element) {
    var type = get_type(element);

    if (!element.value || numbers.indexOf(type) === -1 || (element.getAttribute('step') || '').toLowerCase() === 'any') {
      /* we're not responsible here. Note: If no step attribute is given, we
       * need to validate against the default step as per spec. */
      return true;
    }

    var step = element.getAttribute('step');

    if (step) {
      step = string_to_number(step, type);
    } else {
      step = default_step[type] || 1;
    }

    if (step <= 0 || isNaN(step)) {
      /* error in specified "step". We cannot validate against it, so the value
       * is true. */
      return true;
    }

    var scale = step_scale_factor[type] || 1;
    var value = string_to_number(element.value, type);
    var min = string_to_number(element.getAttribute('min') || element.getAttribute('value') || '', type);

    if (isNaN(value)) {
      /* we cannot compare an invalid value and trust that the badInput validator
       * takes over from here */
      return true;
    }

    if (isNaN(min)) {
      min = default_step_base[type] || 0;
    }

    if (type === 'month') {
      /* type=month has month-wide steps. See
       * https://html.spec.whatwg.org/multipage/forms.html#month-state-%28type=month%29
       */
      min = new Date(min).getUTCFullYear() * 12 + new Date(min).getUTCMonth();
      value = new Date(value).getUTCFullYear() * 12 + new Date(value).getUTCMonth();
    }

    var result = Math.abs(min - value) % (step * scale);
    return result < 0.00000001 ||
    /* crappy floating-point arithmetics! */
    result > step * scale - 0.00000001;
  }

  var ws_on_start_or_end = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  /**
   * trim a string of whitespace
   *
   * We don't use String.trim() to remove the need to polyfill it.
   */

  function trim (str) {
    return str.replace(ws_on_start_or_end, '');
  }

  /**
   * split a string on comma and trim the components
   *
   * As specified at
   * https://html.spec.whatwg.org/multipage/infrastructure.html#split-a-string-on-commas
   * plus removing empty entries.
   */

  function comma_split (str) {
    return str.split(',').map(function (item) {
      return trim(item);
    }).filter(function (b) {
      return b;
    });
  }

  /* we use a dummy <a> where we set the href to test URL validity
   * The definition is out of the "global" scope so that JSDOM can be instantiated
   * after loading Hyperform for tests.
   */

  var url_canary;
  /* see https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address */

  var email_pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  /**
   * test the type-inherent syntax
   */

  function test_type (element) {
    var type = get_type(element);

    if (type !== 'file' && !element.value || type !== 'file' && type_checked.indexOf(type) === -1) {
      /* we're not responsible for this element */
      return true;
    }

    var is_valid = true;

    switch (type) {
      case 'url':
        {
          if (!url_canary) {
            url_canary = document.createElement('a');
          }

          var value = trim(element.value);
          url_canary.href = value;
          is_valid = url_canary.href === value || url_canary.href === value + '/';
          break;
        }

      case 'email':
        if (element.hasAttribute('multiple')) {
          is_valid = comma_split(element.value).every(function (value) {
            return email_pattern.test(value);
          });
        } else {
          is_valid = email_pattern.test(trim(element.value));
        }

        break;

      case 'file':
        if ('files' in element && element.files.length && element.hasAttribute('accept')) {
          var patterns = comma_split(element.getAttribute('accept')).map(function (pattern) {
            if (/^(audio|video|image)\/\*$/.test(pattern)) {
              pattern = new RegExp('^' + RegExp.$1 + '/.+$');
            }

            return pattern;
          });

          if (!patterns.length) {
            break;
          }

          fileloop: for (var i = 0; i < element.files.length; i++) {
            /* we need to match a whitelist, so pre-set with false */
            var file_valid = false;

            patternloop: for (var j = 0; j < patterns.length; j++) {
              var file = element.files[i];
              var pattern = patterns[j];
              var fileprop = file.type;

              if (typeof pattern === 'string' && pattern.substr(0, 1) === '.') {
                if (file.name.search('.') === -1) {
                  /* no match with any file ending */
                  continue patternloop;
                }

                fileprop = file.name.substr(file.name.lastIndexOf('.'));
              }

              if (fileprop.search(pattern) === 0) {
                /* we found one match and can quit looking */
                file_valid = true;
                break patternloop;
              }
            }

            if (!file_valid) {
              is_valid = false;
              break fileloop;
            }
          }
        }

    }

    return is_valid;
  }

  /**
   * boilerplate function for all tests but customError
   */

  function check(test, react) {
    return function (element) {
      var invalid = !test(element);

      if (invalid) {
        react(element);
      }

      return invalid;
    };
  }
  /**
   * create a common function to set error messages
   */


  function set_msg(element, msgtype, _default) {
    message_store.set(element, custom_messages.get(element, msgtype, _default));
  }

  var badInput = check(test_bad_input, function (element) {
    return set_msg(element, 'badInput', _('Please match the requested type.'));
  });

  function customError(element) {
    /* prevent infinite loops when the custom validators call setCustomValidity(),
     * which in turn calls this code again. We check, if there is an already set
     * custom validity message there. */
    if (element.__hf_custom_validation_running) {
      var msg = message_store.get(element);
      return msg && msg.is_custom;
    }
    /* check, if there are custom validators in the registry, and call
     * them. */


    var custom_validators = custom_validator_registry.get(element);
    var cvl = custom_validators.length;
    var valid = true;

    if (cvl) {
      element.__hf_custom_validation_running = true;

      for (var i = 0; i < cvl; i++) {
        var result = custom_validators[i](element);

        if (result !== undefined && !result) {
          valid = false;
          /* break on first invalid response */

          break;
        }
      }

      delete element.__hf_custom_validation_running;
    }
    /* check, if there are other validity messages already */


    if (valid) {
      var _msg = message_store.get(element);

      valid = !(_msg.toString() && 'is_custom' in _msg);
    }

    return !valid;
  }

  var patternMismatch = check(test_pattern, function (element) {
    set_msg(element, 'patternMismatch', element.title ? sprintf(_('PatternMismatchWithTitle'), element.title) : _('PatternMismatch'));
  });
  /**
   * TODO: when rangeOverflow and rangeUnderflow are both called directly and
   * successful, the inRange and outOfRange classes won't get removed, unless
   * element.validityState.valid is queried, too.
   */

  var rangeOverflow = check(test_max, function (element) {
    var type = get_type(element);
    var wrapper = get_wrapper(element);
    var outOfRangeClass = wrapper && wrapper.settings.classes.outOfRange || 'hf-out-of-range';
    var inRangeClass = wrapper && wrapper.settings.classes.inRange || 'hf-in-range';
    var msg;

    switch (type) {
      case 'date':
      case 'datetime':
      case 'datetime-local':
        msg = sprintf(_('DateRangeOverflow'), format_date(string_to_date(element.getAttribute('max'), type), type));
        break;

      case 'time':
        msg = sprintf(_('TimeRangeOverflow'), format_date(string_to_date(element.getAttribute('max'), type), type));
        break;
      // case 'number':

      default:
        msg = sprintf(_('NumberRangeOverflow'), string_to_number(element.getAttribute('max'), type));
        break;
    }

    set_msg(element, 'rangeOverflow', msg);
    element.classList.add(outOfRangeClass);
    element.classList.remove(inRangeClass);
  });
  var rangeUnderflow = check(test_min, function (element) {
    var type = get_type(element);
    var wrapper = get_wrapper(element);
    var outOfRangeClass = wrapper && wrapper.settings.classes.outOfRange || 'hf-out-of-range';
    var inRangeClass = wrapper && wrapper.settings.classes.inRange || 'hf-in-range';
    var msg;

    switch (type) {
      case 'date':
      case 'datetime':
      case 'datetime-local':
        msg = sprintf(_('DateRangeUnderflow'), format_date(string_to_date(element.getAttribute('min'), type), type));
        break;

      case 'time':
        msg = sprintf(_('TimeRangeUnderflow'), format_date(string_to_date(element.getAttribute('min'), type), type));
        break;
      // case 'number':

      default:
        msg = sprintf(_('NumberRangeUnderflow'), string_to_number(element.getAttribute('min'), type));
        break;
    }

    set_msg(element, 'rangeUnderflow', msg);
    element.classList.add(outOfRangeClass);
    element.classList.remove(inRangeClass);
  });
  var stepMismatch = check(test_step, function (element) {
    var list = get_next_valid(element);
    var min = list[0];
    var max = list[1];
    var sole = false;
    var msg;

    if (min === null) {
      sole = max;
    } else if (max === null) {
      sole = min;
    }

    if (sole !== false) {
      msg = sprintf(_('StepMismatchOneValue'), sole);
    } else {
      msg = sprintf(_('StepMismatch'), min, max);
    }

    set_msg(element, 'stepMismatch', msg);
  });
  var tooLong = check(test_maxlength, function (element) {
    set_msg(element, 'tooLong', sprintf(_('TextTooLong'), element.getAttribute('maxlength'), unicode_string_length(element.value)));
  });
  var tooShort = check(test_minlength, function (element) {
    set_msg(element, 'tooShort', sprintf(_('Please lengthen this text to %l characters or more (you are currently using %l characters).'), element.getAttribute('minlength'), unicode_string_length(element.value)));
  });
  var typeMismatch = check(test_type, function (element) {
    var msg = _('Please use the appropriate format.');

    var type = get_type(element);

    if (type === 'email') {
      if (element.hasAttribute('multiple')) {
        msg = _('Please enter a comma separated list of email addresses.');
      } else {
        msg = _('InvalidEmail');
      }
    } else if (type === 'url') {
      msg = _('InvalidURL');
    } else if (type === 'file') {
      msg = _('Please select a file of the correct type.');
    }

    set_msg(element, 'typeMismatch', msg);
  });
  var valueMissing = check(test_required, function (element) {
    var msg = _('ValueMissing');

    var type = get_type(element);

    if (type === 'checkbox') {
      msg = _('CheckboxMissing');
    } else if (type === 'radio') {
      msg = _('RadioMissing');
    } else if (type === 'file') {
      if (element.hasAttribute('multiple')) {
        msg = _('Please select one or more files.');
      } else {
        msg = _('FileMissing');
      }
    } else if (element instanceof window.HTMLSelectElement) {
      msg = _('SelectMissing');
    }

    set_msg(element, 'valueMissing', msg);
  });
  /**
   * the "valid" property calls all other validity checkers and returns true,
   * if all those return false.
   *
   * This is the major access point for _all_ other API methods, namely
   * (check|report)Validity().
   */

  var valid = function valid(element) {
    var wrapper = get_wrapper(element);
    var validClass = wrapper && wrapper.settings.classes.valid || 'hf-valid';
    var invalidClass = wrapper && wrapper.settings.classes.invalid || 'hf-invalid';
    var userInvalidClass = wrapper && wrapper.settings.classes.userInvalid || 'hf-user-invalid';
    var userValidClass = wrapper && wrapper.settings.classes.userValid || 'hf-user-valid';
    var inRangeClass = wrapper && wrapper.settings.classes.inRange || 'hf-in-range';
    var outOfRangeClass = wrapper && wrapper.settings.classes.outOfRange || 'hf-out-of-range';
    var validatedClass = wrapper && wrapper.settings.classes.validated || 'hf-validated';
    element.classList.add(validatedClass);

    for (var _i = 0, _arr = [badInput, customError, patternMismatch, rangeOverflow, rangeUnderflow, stepMismatch, tooLong, tooShort, typeMismatch, valueMissing]; _i < _arr.length; _i++) {
      var checker = _arr[_i];

      if (checker(element)) {
        element.classList.add(invalidClass);
        element.classList.remove(validClass);
        element.classList.remove(userValidClass);

        if ((element.type === 'checkbox' || element.type === 'radio') && element.checked !== element.defaultChecked ||
        /* the following test is trivially false for checkboxes/radios */
        element.value !== element.defaultValue) {
          element.classList.add(userInvalidClass);
        } else {
          element.classList.remove(userInvalidClass);
        }

        element.setAttribute('aria-invalid', 'true');
        return false;
      }
    }

    message_store["delete"](element);
    element.classList.remove(invalidClass);
    element.classList.remove(userInvalidClass);
    element.classList.remove(outOfRangeClass);
    element.classList.add(validClass);
    element.classList.add(inRangeClass);

    if (element.value !== element.defaultValue) {
      element.classList.add(userValidClass);
    } else {
      element.classList.remove(userValidClass);
    }

    element.setAttribute('aria-invalid', 'false');
    return true;
  };

  var validity_state_checkers = {
    badInput: badInput,
    customError: customError,
    patternMismatch: patternMismatch,
    rangeOverflow: rangeOverflow,
    rangeUnderflow: rangeUnderflow,
    stepMismatch: stepMismatch,
    tooLong: tooLong,
    tooShort: tooShort,
    typeMismatch: typeMismatch,
    valueMissing: valueMissing,
    valid: valid
  };

  /**
   * the validity state constructor
   */

  var ValidityState = function ValidityState(element) {
    if (!(element instanceof window.HTMLElement)) {
      throw new Error('cannot create a ValidityState for a non-element');
    }

    var cached = ValidityState.cache.get(element);

    if (cached) {
      return cached;
    }

    if (!(this instanceof ValidityState)) {
      /* working around a forgotten `new` */
      return new ValidityState(element);
    }

    this.element = element;
    ValidityState.cache.set(element, this);
  };
  /**
   * the prototype for new validityState instances
   */


  var ValidityStatePrototype = {};
  ValidityState.prototype = ValidityStatePrototype;
  ValidityState.cache = new WeakMap();
  /* small wrapper around the actual validator to check if the validator
   * should actually be called. `this` refers to the ValidityState object. */

  var checker_getter = function checker_getter(prop, func) {
    return function () {
      if (!is_validation_candidate(this.element)) {
        /* not being validated == valid by default
         * return value == false for all props except "valid", because we test
         * problems like badInput here */
        return prop === 'valid';
      }

      return func(this.element);
    };
  };
  /**
   * copy functionality from the validity checkers to the ValidityState
   * prototype
   */


  for (var prop in validity_state_checkers) {
    Object.defineProperty(ValidityStatePrototype, prop, {
      configurable: true,
      enumerable: true,
      get: checker_getter(prop, validity_state_checkers[prop]),
      set: undefined
    });
  }
  /**
   * mark the validity prototype, because that is what the client-facing
   * code deals with mostly, not the property descriptor thing */


  mark(ValidityStatePrototype);

  /**
   * check an element's validity with respect to it's form
   */

  var checkValidity = return_hook_or('checkValidity', function (element) {
    /* if this is a <form>, check validity of all child inputs */
    if (element instanceof window.HTMLFormElement) {
      return get_validated_elements(element).map(checkValidity).every(function (b) {
        return b;
      });
    }
    /* default is true, also for elements that are no validation candidates */


    var valid = ValidityState(element).valid;

    if (valid) {
      var wrapped_form = get_wrapper(element);

      if (wrapped_form && wrapped_form.settings.validEvent) {
        trigger_event(element, 'valid');
      }
    } else {
      trigger_event(element, 'invalid', {
        cancelable: true
      });
    }

    return valid;
  });

  /**
   * counter that will be incremented with every call
   *
   * Will enforce uniqueness, as long as no more than 1 hyperform scripts
   * are loaded. (In that case we still have the "random" part below.)
   */

  var uid = 0;
  /**
   * generate a random ID
   *
   * @see https://gist.github.com/gordonbrander/2230317
   */

  function generate_id () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hf_';
    return prefix + uid++ + Math.random().toString(36).substr(2);
  }

  var warningsCache = new WeakMap();
  var DefaultRenderer = {
    /**
     * called when a warning should become visible
     */
    attachWarning: function attachWarning(warning, element) {
      /* should also work, if element is last,
       * http://stackoverflow.com/a/4793630/113195 */
      element.parentNode.insertBefore(warning, element.nextSibling);
    },

    /**
     * called when a warning should vanish
     */
    detachWarning: function detachWarning(warning, element) {
      /* be conservative here, since an overwritten attachWarning() might not
       * actually have attached the warning. */
      if (warning.parentNode) {
        warning.parentNode.removeChild(warning);
      }
    },

    /**
     * called when feedback to an element's state should be handled
     *
     * i.e., showing and hiding warnings
     */
    showWarning: function showWarning(element) {
      var whole_form_validated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      /* don't render error messages on subsequent radio buttons of the
       * same group. This assumes, that element.validity.valueMissing is the only
       * possible validation failure for radio buttons. */
      if (whole_form_validated && element.type === 'radio' && get_radiogroup(element)[0] !== element) {
        return;
      }

      var msg = message_store.get(element).toString();
      var warning = warningsCache.get(element);

      if (msg) {
        if (!warning) {
          var wrapper = get_wrapper(element);
          warning = document.createElement('div');
          warning.className = wrapper && wrapper.settings.classes.warning || 'hf-warning';
          warning.id = generate_id();
          warning.setAttribute('aria-live', 'polite');
          warningsCache.set(element, warning);
        }

        element.setAttribute('aria-errormessage', warning.id);

        if (!element.hasAttribute('aria-describedby')) {
          element.setAttribute('aria-describedby', warning.id);
        }

        Renderer.setMessage(warning, msg, element);
        Renderer.attachWarning(warning, element);
      } else if (warning && warning.parentNode) {
        if (element.getAttribute('aria-describedby') === warning.id) {
          element.removeAttribute('aria-describedby');
        }

        element.removeAttribute('aria-errormessage');
        Renderer.detachWarning(warning, element);
      }
    },

    /**
     * set the warning's content
     *
     * Overwrite this method, if you want, e.g., to allow HTML in warnings
     * or preprocess the content.
     */
    setMessage: function setMessage(warning, message, element) {
      warning.textContent = message;
    }
  };
  var Renderer = {
    attachWarning: DefaultRenderer.attachWarning,
    detachWarning: DefaultRenderer.detachWarning,
    showWarning: DefaultRenderer.showWarning,
    setMessage: DefaultRenderer.setMessage,
    set: function set(renderer, action) {
      if (!action) {
        action = DefaultRenderer[renderer];
      }

      Renderer[renderer] = action;
    },
    getWarning: function getWarning(element) {
      return warningsCache.get(element);
    }
  };

  /**
   * check element's validity and report an error back to the user
   */

  function reportValidity(element) {
    /* if this is a <form>, report validity of all child inputs */
    if (element instanceof window.HTMLFormElement) {
      element.__hf_form_validation = true;
      var form_valid = get_validated_elements(element).map(reportValidity).every(function (b) {
        return b;
      });
      delete element.__hf_form_validation;
      return form_valid;
    }
    /* we copy checkValidity() here, b/c we have to check if the "invalid"
     * event was canceled. */


    var valid = ValidityState(element).valid;
    var event;

    if (valid) {
      var wrapped_form = get_wrapper(element);

      if (wrapped_form && wrapped_form.settings.validEvent) {
        event = trigger_event(element, 'valid', {
          cancelable: true
        });
      }
    } else {
      event = trigger_event(element, 'invalid', {
        cancelable: true
      });
    }

    if (!event || !event.defaultPrevented) {
      Renderer.showWarning(element, element.form && element.form.__hf_form_validation);
    }

    return valid;
  }

  /**
   * set a custom validity message or delete it with an empty string
   */

  function setCustomValidity(element, msg) {
    if (!msg) {
      message_store["delete"](element, true);
    } else {
      message_store.set(element, msg, true);
    }
    /* live-update the warning */


    var warning = Renderer.getWarning(element);

    if (warning) {
      Renderer.setMessage(warning, msg, element);
    }
    /* update any classes if the validity state changes */


    validity_state_checkers.valid(element);
  }

  /**
   * implement the valueAsDate functionality
   *
   * @see https://html.spec.whatwg.org/multipage/forms.html#dom-input-valueasdate
   */

  function valueAsDate(element) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var type = get_type(element);

    if (dates.indexOf(type) > -1) {
      if (value !== undefined) {
        /* setter: value must be null or a Date() */
        if (value === null) {
          element.value = '';
        } else if (value instanceof Date) {
          if (isNaN(value.getTime())) {
            element.value = '';
          } else {
            element.value = date_to_string(value, type);
          }
        } else {
          throw new window.DOMException('valueAsDate setter encountered invalid value', 'TypeError');
        }

        return;
      }

      var value_date = string_to_date(element.value, type);
      return value_date instanceof Date ? value_date : null;
    } else if (value !== undefined) {
      /* trying to set a date on a not-date input fails */
      throw new window.DOMException('valueAsDate setter cannot set date on this element', 'InvalidStateError');
    }

    return null;
  }

  /**
   * implement the valueAsNumber functionality
   *
   * @see https://html.spec.whatwg.org/multipage/forms.html#dom-input-valueasnumber
   */

  function valueAsNumber(element) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var type = get_type(element);

    if (numbers.indexOf(type) > -1) {
      if (type === 'range' && element.hasAttribute('multiple')) {
        /* @see https://html.spec.whatwg.org/multipage/forms.html#do-not-apply */
        return NaN;
      }

      if (value !== undefined) {
        /* setter: value must be NaN or a finite number */
        if (isNaN(value)) {
          element.value = '';
        } else if (typeof value === 'number' && window.isFinite(value)) {
          try {
            /* try setting as a date, but... */
            valueAsDate(element, new Date(value));
          } catch (e) {
            /* ... when valueAsDate is not responsible, ... */
            if (!(e instanceof window.DOMException)) {
              throw e;
            }
            /* ... set it via Number.toString(). */


            element.value = value.toString();
          }
        } else {
          throw new window.DOMException('valueAsNumber setter encountered invalid value', 'TypeError');
        }

        return;
      }

      return string_to_number(element.value, type);
    } else if (value !== undefined) {
      /* trying to set a number on a not-number input fails */
      throw new window.DOMException('valueAsNumber setter cannot set number on this element', 'InvalidStateError');
    }

    return NaN;
  }

  /**
   *
   */

  function stepDown(element) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (numbers.indexOf(get_type(element)) === -1) {
      throw new window.DOMException('stepDown encountered invalid type', 'InvalidStateError');
    }

    if ((element.getAttribute('step') || '').toLowerCase() === 'any') {
      throw new window.DOMException('stepDown encountered step "any"', 'InvalidStateError');
    }

    var prev = get_next_valid(element, n)[0];

    if (prev !== null) {
      valueAsNumber(element, prev);
    }
  }

  /**
   *
   */

  function stepUp(element) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (numbers.indexOf(get_type(element)) === -1) {
      throw new window.DOMException('stepUp encountered invalid type', 'InvalidStateError');
    }

    if ((element.getAttribute('step') || '').toLowerCase() === 'any') {
      throw new window.DOMException('stepUp encountered step "any"', 'InvalidStateError');
    }

    var next = get_next_valid(element, n)[1];

    if (next !== null) {
      valueAsNumber(element, next);
    }
  }

  /**
   * get the validation message for an element, empty string, if the element
   * satisfies all constraints.
   */

  function validationMessage(element) {
    var msg = message_store.get(element);

    if (!msg) {
      return '';
    }
    /* make it a primitive again, since message_store returns String(). */


    return msg.toString();
  }

  /**
   * check, if an element will be subject to HTML5 validation at all
   */

  function willValidate(element) {
    return is_validation_candidate(element);
  }

  /* shim layer for the Element.matches method */

  var ep = window.Element.prototype;
  var native_matches = ep.matches || ep.matchesSelector || ep.msMatchesSelector || ep.webkitMatchesSelector;
  function matches (element, selector) {
    return native_matches.call(element, selector);
  }

  /**
   * submit a form, because `element` triggered it
   *
   * This method also dispatches a submit event on the form prior to the
   * submission. The event contains the trigger element as `submittedVia`.
   *
   * If the element is a button with a name, the name=value pair will be added
   * to the submitted data.
   */

  function submit_form_via(element) {
    /* apparently, the submit event is not triggered in most browsers on
     * the submit() method, so we do it manually here to model a natural
     * submit as closely as possible.
     * Now to the fun fact: If you trigger a submit event from a form, what
     * do you think should happen?
     * 1) the form will be automagically submitted by the browser, or
     * 2) nothing.
     * And as you already suspected, the correct answer is: both! Firefox
     * opts for 1), Chrome for 2). Yay! */
    var event_got_cancelled;
    var submit_event = create_event('submit', {
      cancelable: true
    });
    /* force Firefox to not submit the form, then fake preventDefault() */

    submit_event.preventDefault();
    Object.defineProperty(submit_event, 'defaultPrevented', {
      value: false,
      writable: true
    });
    Object.defineProperty(submit_event, 'preventDefault', {
      value: function value() {
        return submit_event.defaultPrevented = event_got_cancelled = true;
      },
      writable: true
    });
    trigger_event(element.form, submit_event, {}, {
      submittedVia: element
    });

    if (!event_got_cancelled) {
      add_submit_field(element);
      window.HTMLFormElement.prototype.submit.call(element.form);
      window.setTimeout(function () {
        return remove_submit_field(element);
      });
    }
  }
  /**
   * if a submit button was clicked, add its name=value by means of a type=hidden
   * input field
   */


  function add_submit_field(button) {
    if (['image', 'submit'].indexOf(button.type) > -1 && button.name) {
      var wrapper = get_wrapper(button.form) || {};
      var submit_helper = wrapper.submit_helper;

      if (submit_helper) {
        if (submit_helper.parentNode) {
          submit_helper.parentNode.removeChild(submit_helper);
        }
      } else {
        submit_helper = document.createElement('input');
        submit_helper.type = 'hidden';
        wrapper.submit_helper = submit_helper;
      }

      submit_helper.name = button.name;
      submit_helper.value = button.value;
      button.form.appendChild(submit_helper);
    }
  }
  /**
   * remove a possible helper input, that was added by `add_submit_field`
   */


  function remove_submit_field(button) {
    if (['image', 'submit'].indexOf(button.type) > -1 && button.name) {
      var wrapper = get_wrapper(button.form) || {};
      var submit_helper = wrapper.submit_helper;

      if (submit_helper && submit_helper.parentNode) {
        submit_helper.parentNode.removeChild(submit_helper);
      }
    }
  }
  /**
   * check a form's validity and submit it
   *
   * The method triggers a cancellable `validate` event on the form. If the
   * event is cancelled, form submission will be aborted, too.
   *
   * If the form is found to contain invalid fields, focus the first field.
   */


  function check$1(button) {
    /* trigger a "validate" event on the form to be submitted */
    var val_event = trigger_event(button.form, 'validate', {
      cancelable: true
    });

    if (val_event.defaultPrevented) {
      /* skip the whole submit thing, if the validation is canceled. A user
       * can still call form.submit() afterwards. */
      return;
    }

    var valid = true;
    var first_invalid;
    button.form.__hf_form_validation = true;
    get_validated_elements(button.form).map(function (element) {
      if (!reportValidity(element)) {
        valid = false;

        if (!first_invalid && 'focus' in element) {
          first_invalid = element;
        }
      }
    });
    delete button.form.__hf_form_validation;

    if (valid) {
      submit_form_via(button);
    } else if (first_invalid) {
      /* focus the first invalid element, if validation went south */
      first_invalid.focus();
      /* tell the tale, if anyone wants to react to it */

      trigger_event(button.form, 'forminvalid');
    }
  }
  /**
   * test if node is a submit button
   */


  function is_submit_button(node) {
    return (
      /* must be an input or button element... */
      (node.nodeName === 'INPUT' || node.nodeName === 'BUTTON') && (
      /* ...and have a submitting type */
      node.type === 'image' || node.type === 'submit')
    );
  }
  /**
   * test, if the click event would trigger a submit
   */


  function is_submitting_click(event, button) {
    return (
      /* prevented default: won't trigger a submit */
      !event.defaultPrevented && (
      /* left button or middle button (submits in Chrome) */
      !('button' in event) || event.button < 2) &&
      /* must be a submit button... */
      is_submit_button(button) &&
      /* the button needs a form, that's going to be submitted */
      button.form &&
      /* again, if the form should not be validated, we're out of the game */
      !button.form.hasAttribute('novalidate')
    );
  }
  /**
   * test, if the keypress event would trigger a submit
   */


  function is_submitting_keypress(event) {
    return (
      /* prevented default: won't trigger a submit */
      !event.defaultPrevented && (
      /* ...and <Enter> was pressed... */
      event.keyCode === 13 &&
      /* ...on an <input> that is... */
      event.target.nodeName === 'INPUT' &&
      /* ...a standard text input field (not checkbox, ...) */
      text.indexOf(event.target.type) > -1 ||
      /* or <Enter> or <Space> was pressed... */
      (event.keyCode === 13 || event.keyCode === 32) &&
      /* ...on a submit button */
      is_submit_button(event.target)) &&
      /* there's a form... */
      event.target.form &&
      /* ...and the form allows validation */
      !event.target.form.hasAttribute('novalidate')
    );
  }
  /**
   * catch clicks to children of <button>s
   */


  function get_clicked_button(element) {
    if (is_submit_button(element)) {
      return element;
    } else if (matches(element, 'button:not([type]) *, button[type="submit"] *')) {
      return get_clicked_button(element.parentNode);
    } else {
      return null;
    }
  }
  /**
   * return event handler to catch explicit submission by click on a button
   */


  function get_click_handler() {
    var ignore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return function (event) {
      var button = get_clicked_button(event.target);

      if (button && is_submitting_click(event, button)) {
        event.preventDefault();

        if (ignore || button.hasAttribute('formnovalidate')) {
          /* if validation should be ignored, we're not interested in any checks */
          submit_form_via(button);
        } else {
          check$1(button);
        }
      }
    };
  }

  var click_handler = get_click_handler();
  var ignored_click_handler = get_click_handler(true);
  /**
   * catch implicit submission by pressing <Enter> in some situations
   */

  function get_keypress_handler(ignore) {
    return function keypress_handler(event) {
      if (is_submitting_keypress(event)) {
        event.preventDefault();
        var wrapper = get_wrapper(event.target.form) || {
          settings: {}
        };

        if (wrapper.settings.preventImplicitSubmit) {
          /* user doesn't want an implicit submit. Cancel here. */
          return;
        }
        /* check, that there is no submit button in the form. Otherwise
        * that should be clicked. */


        var el = event.target.form.elements.length;
        var submit;

        for (var i = 0; i < el; i++) {
          if (['image', 'submit'].indexOf(event.target.form.elements[i].type) > -1) {
            submit = event.target.form.elements[i];
            break;
          }
        }
        /* trigger an "implicit_submit" event on the form to be submitted */


        var implicit_event = trigger_event(event.target.form, 'implicit_submit', {
          cancelable: true
        }, {
          trigger: event.target,
          submittedVia: submit || event.target
        });

        if (implicit_event.defaultPrevented) {
          /* skip the submit, if implicit submit is canceled */
          return;
        }

        if (submit) {
          submit.click();
        } else if (ignore) {
          submit_form_via(event.target);
        } else {
          check$1(event.target);
        }
      }
    };
  }

  var keypress_handler = get_keypress_handler();
  var ignored_keypress_handler = get_keypress_handler(true);
  /**
   * catch all relevant events _prior_ to a form being submitted
   *
   * @param bool ignore bypass validation, when an attempt to submit the
   *                    form is detected. True, when the wrapper's revalidate
   *                    setting is 'never'.
   */

  function catch_submit(listening_node) {
    var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (ignore) {
      listening_node.addEventListener('click', ignored_click_handler);
      listening_node.addEventListener('keypress', ignored_keypress_handler);
    } else {
      listening_node.addEventListener('click', click_handler);
      listening_node.addEventListener('keypress', keypress_handler);
    }
  }
  /**
   * decommission the event listeners from catch_submit() again
   */

  function uncatch_submit(listening_node) {
    listening_node.removeEventListener('click', ignored_click_handler);
    listening_node.removeEventListener('keypress', ignored_keypress_handler);
    listening_node.removeEventListener('click', click_handler);
    listening_node.removeEventListener('keypress', keypress_handler);
  }

  /**
   * add `property` to an element
   *
   * ATTENTION! This function will search for an equally named property on the
   * *prototype* of an element, if element is a concrete DOM node. Do not use
   * it as general-purpose property installer.
   *
   * js> installer(element, 'foo', { value: 'bar' });
   * js> assert(element.foo === 'bar');
   */

  function install_property (element, property, descriptor) {
    descriptor.configurable = true;
    descriptor.enumerable = true;

    if ('value' in descriptor) {
      descriptor.writable = true;
    }
    /* on concrete instances, i.e., <input> elements, the naive lookup
     * yields undefined. We have to look on its prototype then. On elements
     * like the actual HTMLInputElement object the first line works. */


    var original_descriptor = Object.getOwnPropertyDescriptor(element, property);

    if (original_descriptor === undefined) {
      original_descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), property);
    }

    if (original_descriptor) {
      if (original_descriptor.configurable === false) {
        /* Safari <= 9 and PhantomJS will end up here :-( Nothing to do except
         * warning */
        var wrapper = get_wrapper(element);

        if (wrapper && wrapper.settings.debug) {
          /* global console */
          console.log('[hyperform] cannot install custom property ' + property);
        }

        return false;
      }
      /* we already installed that property... */


      if (original_descriptor.get && original_descriptor.get.__hyperform || original_descriptor.value && original_descriptor.value.__hyperform) {
        return;
      }
      /* publish existing property under new name, if it's not from us */


      Object.defineProperty(element, '_original_' + property, original_descriptor);
    }

    delete element[property];
    Object.defineProperty(element, property, descriptor);
    return true;
  }

  function is_field (element) {
    return element instanceof window.HTMLButtonElement || element instanceof window.HTMLInputElement || element instanceof window.HTMLSelectElement || element instanceof window.HTMLTextAreaElement || element instanceof window.HTMLFieldSetElement || element === window.HTMLButtonElement.prototype || element === window.HTMLInputElement.prototype || element === window.HTMLSelectElement.prototype || element === window.HTMLTextAreaElement.prototype || element === window.HTMLFieldSetElement.prototype;
  }

  /**
   * remove `property` from element and restore _original_property, if present
   */

  function uninstall_property (element, property) {
    try {
      delete element[property];
    } catch (e) {
      /* Safari <= 9 and PhantomJS will end up here :-( Nothing to do except
       * warning */
      var wrapper = get_wrapper(element);

      if (wrapper && wrapper.settings.debug) {
        /* global console */
        console.log('[hyperform] cannot uninstall custom property ' + property);
      }

      return false;
    }

    var original_descriptor = Object.getOwnPropertyDescriptor(element, '_original_' + property);

    if (original_descriptor) {
      Object.defineProperty(element, property, original_descriptor);
    }
  }

  var gA = function gA(prop) {
    return function () {
      return do_filter('attr_get_' + prop, this.getAttribute(prop), this);
    };
  };

  var sA = function sA(prop) {
    return function (value) {
      this.setAttribute(prop, do_filter('attr_set_' + prop, value, this));
    };
  };

  var gAb = function gAb(prop) {
    return function () {
      return do_filter('attr_get_' + prop, this.hasAttribute(prop), this);
    };
  };

  var sAb = function sAb(prop) {
    return function (value) {
      if (do_filter('attr_set_' + prop, value, this)) {
        this.setAttribute(prop, prop);
      } else {
        this.removeAttribute(prop);
      }
    };
  };

  var gAn = function gAn(prop) {
    return function () {
      return do_filter('attr_get_' + prop, Math.max(0, Number(this.getAttribute(prop))), this);
    };
  };

  var sAn = function sAn(prop) {
    return function (value) {
      value = do_filter('attr_set_' + prop, value, this);

      if (/^[0-9]+$/.test(value)) {
        this.setAttribute(prop, value);
      }
    };
  };

  function install_properties(element) {
    for (var _i = 0, _arr = ['accept', 'max', 'min', 'pattern', 'placeholder', 'step']; _i < _arr.length; _i++) {
      var prop = _arr[_i];
      install_property(element, prop, {
        get: gA(prop),
        set: sA(prop)
      });
    }

    for (var _i2 = 0, _arr2 = ['multiple', 'required', 'readOnly']; _i2 < _arr2.length; _i2++) {
      var _prop = _arr2[_i2];
      install_property(element, _prop, {
        get: gAb(_prop.toLowerCase()),
        set: sAb(_prop.toLowerCase())
      });
    }

    for (var _i3 = 0, _arr3 = ['minLength', 'maxLength']; _i3 < _arr3.length; _i3++) {
      var _prop2 = _arr3[_i3];
      install_property(element, _prop2, {
        get: gAn(_prop2.toLowerCase()),
        set: sAn(_prop2.toLowerCase())
      });
    }
  }

  function uninstall_properties(element) {
    for (var _i4 = 0, _arr4 = ['accept', 'max', 'min', 'pattern', 'placeholder', 'step', 'multiple', 'required', 'readOnly', 'minLength', 'maxLength']; _i4 < _arr4.length; _i4++) {
      var prop = _arr4[_i4];
      uninstall_property(element, prop);
    }
  }

  var polyfills = {
    checkValidity: {
      value: mark(function () {
        return checkValidity(this);
      })
    },
    reportValidity: {
      value: mark(function () {
        return reportValidity(this);
      })
    },
    setCustomValidity: {
      value: mark(function (msg) {
        return setCustomValidity(this, msg);
      })
    },
    stepDown: {
      value: mark(function () {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        return stepDown(this, n);
      })
    },
    stepUp: {
      value: mark(function () {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        return stepUp(this, n);
      })
    },
    validationMessage: {
      get: mark(function () {
        return validationMessage(this);
      })
    },
    validity: {
      get: mark(function () {
        return ValidityState(this);
      })
    },
    valueAsDate: {
      get: mark(function () {
        return valueAsDate(this);
      }),
      set: mark(function (value) {
        valueAsDate(this, value);
      })
    },
    valueAsNumber: {
      get: mark(function () {
        return valueAsNumber(this);
      }),
      set: mark(function (value) {
        valueAsNumber(this, value);
      })
    },
    willValidate: {
      get: mark(function () {
        return willValidate(this);
      })
    }
  };
  function polyfill (element) {
    if (is_field(element)) {
      for (var prop in polyfills) {
        install_property(element, prop, polyfills[prop]);
      }

      install_properties(element);
    } else if (element instanceof window.HTMLFormElement || element === window.HTMLFormElement.prototype) {
      install_property(element, 'checkValidity', polyfills.checkValidity);
      install_property(element, 'reportValidity', polyfills.reportValidity);
    }
  }

  function polyunfill (element) {
    if (is_field(element)) {
      uninstall_property(element, 'checkValidity');
      uninstall_property(element, 'reportValidity');
      uninstall_property(element, 'setCustomValidity');
      uninstall_property(element, 'stepDown');
      uninstall_property(element, 'stepUp');
      uninstall_property(element, 'validationMessage');
      uninstall_property(element, 'validity');
      uninstall_property(element, 'valueAsDate');
      uninstall_property(element, 'valueAsNumber');
      uninstall_property(element, 'willValidate');
      uninstall_properties(element);
    } else if (element instanceof window.HTMLFormElement) {
      uninstall_property(element, 'checkValidity');
      uninstall_property(element, 'reportValidity');
    }
  }

  var element_prototypes = [window.HTMLButtonElement.prototype, window.HTMLInputElement.prototype, window.HTMLSelectElement.prototype, window.HTMLTextAreaElement.prototype, window.HTMLFieldSetElement.prototype];
  /**
   * get the appropriate function to revalidate form elements
   */

  function get_revalidator() {
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hybrid';
    return function (event) {
      if (event.target instanceof window.HTMLButtonElement || event.target instanceof window.HTMLTextAreaElement || event.target instanceof window.HTMLSelectElement || event.target instanceof window.HTMLInputElement) {
        if (event.target.form && event.target.form.hasAttribute('novalidate')) {
          /* do nothing, if the form forbids it. This still allows manual
           * validation via, e.g., input.reportValidity(), but mirrors browser
           * behavior, that are also completely silent in this case. */
          return;
        }

        if (method === 'hybrid') {
          /* "hybrid" somewhat simulates what browsers do. See for example
           * Firefox's :-moz-ui-invalid pseudo-class:
           * https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-ui-invalid */
          if (event.type === 'blur' && event.target.value !== event.target.defaultValue || ValidityState(event.target).valid) {
            /* on blur, update the report when the value has changed from the
             * default or when the element is valid (possibly removing a still
             * standing invalidity report). */
            reportValidity(event.target);
          } else if (event.type === 'keyup' && event.keyCode !== 9 || event.type === 'change') {
            if (ValidityState(event.target).valid) {
              // report instantly, when an element becomes valid,
              // postpone report to blur event, when an element is invalid
              reportValidity(event.target);
            }
          }
        } else if (event.type !== 'keyup' || event.keyCode !== 9) {
          /* do _not_ validate, when the user "tabbed" into the field initially,
           * i.e., a keyup event with keyCode 9 */
          reportValidity(event.target);
        }
      }
    };
  }
  /**
   * run a function on all found elements
   */


  function execute_on_elements(fn, elements) {
    if (elements instanceof window.Element) {
      elements = [elements];
    }

    var elements_length = elements.length;

    for (var i = 0; i < elements_length; i++) {
      fn(elements[i]);
    }
  }
  /**
   * get a function, that removes hyperform behavior again
   */


  function get_destructor(hform) {
    var form = hform.form;
    return function () {
      uncatch_submit(form);
      form.removeEventListener('keyup', hform.revalidator);
      form.removeEventListener('change', hform.revalidator);
      form.removeEventListener('blur', hform.revalidator, true);

      if (form === window || form.nodeType === 9) {
        hform.uninstall(element_prototypes);
        polyunfill(window.HTMLFormElement);
      } else if (form instanceof window.HTMLFormElement || form instanceof window.HTMLFieldSetElement) {
        hform.uninstall(form.elements);

        if (form instanceof window.HTMLFormElement) {
          polyunfill(form);
        }
      } else if (form instanceof window.HTMLElement) {
        hform.observer.disconnect();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Array.prototype.slice.call(form.getElementsByTagName('form'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var subform = _step.value;
            hform.uninstall(subform.elements);
            polyunfill(subform);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    };
  }
  /**
   * add hyperform behavior to a freshly initialized wrapper
   */


  function add_behavior(hform) {
    var form = hform.form;
    var settings = hform.settings;
    hform.revalidator = get_revalidator(settings.revalidate);
    hform.observer = {
      disconnect: function disconnect() {}
    };

    hform.install = function (elements) {
      return execute_on_elements(polyfill, elements);
    };

    hform.uninstall = function (elements) {
      return execute_on_elements(polyunfill, elements);
    };

    hform._destruct = get_destructor(hform);
    catch_submit(form, settings.revalidate === 'never');

    if (form === window || form.nodeType === 9) {
      /* install on the prototypes, when called for the whole document */
      hform.install(element_prototypes);
      polyfill(window.HTMLFormElement);
    } else if (form instanceof window.HTMLFormElement || form instanceof window.HTMLFieldSetElement) {
      hform.install(form.elements);

      if (form instanceof window.HTMLFormElement) {
        polyfill(form);
      }
    } else if (form instanceof window.HTMLElement) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Array.prototype.slice.call(hform.form.getElementsByTagName('form'))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var subform = _step2.value;
          hform.install(subform.elements);
          polyfill(subform);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      hform.observer = new window.MutationObserver(function (mutationsList) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = mutationsList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var mutation = _step3.value;

            if (mutation.type === 'childList') {
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = Array.prototype.slice.call(mutation.addedNodes)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var subform = _step4.value;

                  if (subform instanceof window.HTMLFormElement) {
                    hform.install(subform.elements);
                    polyfill(subform);
                  }
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                    _iterator4["return"]();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }

              var _iteratorNormalCompletion5 = true;
              var _didIteratorError5 = false;
              var _iteratorError5 = undefined;

              try {
                for (var _iterator5 = Array.prototype.slice.call(mutation.removedNodes)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  var _subform = _step5.value;

                  if (_subform instanceof window.HTMLFormElement) {
                    hform.uninstall(_subform.elements);
                    polyunfill(_subform);
                  }
                }
              } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                    _iterator5["return"]();
                  }
                } finally {
                  if (_didIteratorError5) {
                    throw _iteratorError5;
                  }
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      });
      hform.observer.observe(form, {
        subtree: true,
        childList: true
      });
    } else {
      throw new Error('Hyperform must be used with a node or window.');
    }

    if (settings.revalidate === 'oninput' || settings.revalidate === 'hybrid') {
      /* in a perfect world we'd just bind to "input", but support here is
       * abysmal: http://caniuse.com/#feat=input-event */
      form.addEventListener('keyup', hform.revalidator);
      form.addEventListener('change', hform.revalidator);
    }

    if (settings.revalidate === 'onblur' || settings.revalidate === 'hybrid') {
      /* useCapture=true, because `blur` doesn't bubble. See
       * https://developer.mozilla.org/en-US/docs/Web/Events/blur#Event_delegation
       * for a discussion */
      form.addEventListener('blur', hform.revalidator, true);
    }
  }

  var version = '0.12.0';

  /**
   * public hyperform interface:
   */

  function hyperform(form) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        classes = _ref.classes,
        _ref$debug = _ref.debug,
        debug = _ref$debug === void 0 ? false : _ref$debug,
        extendFieldset = _ref.extendFieldset,
        novalidateOnElements = _ref.novalidateOnElements,
        _ref$preventImplicitS = _ref.preventImplicitSubmit,
        preventImplicitSubmit = _ref$preventImplicitS === void 0 ? false : _ref$preventImplicitS,
        revalidate = _ref.revalidate,
        _ref$strict = _ref.strict,
        strict = _ref$strict === void 0 ? false : _ref$strict,
        validEvent = _ref.validEvent,
        _ref$validateNameless = _ref.validateNameless,
        validateNameless = _ref$validateNameless === void 0 ? false : _ref$validateNameless;

    if (!classes) {
      classes = {};
    }

    if (extendFieldset === undefined) {
      extendFieldset = !strict;
    }

    if (novalidateOnElements === undefined) {
      novalidateOnElements = !strict;
    }

    if (preventImplicitSubmit === undefined) {
      preventImplicitSubmit = false;
    }

    if (revalidate === undefined) {
      /* other recognized values: 'oninput', 'onblur', 'onsubmit' and 'never' */
      revalidate = strict ? 'onsubmit' : 'hybrid';
    }

    if (validEvent === undefined) {
      validEvent = !strict;
    }

    var settings = {
      debug: debug,
      strict: strict,
      preventImplicitSubmit: preventImplicitSubmit,
      revalidate: revalidate,
      validEvent: validEvent,
      extendFieldset: extendFieldset,
      classes: classes,
      novalidateOnElements: novalidateOnElements,
      validateNameless: validateNameless
    };

    if (form instanceof window.NodeList || form instanceof window.HTMLCollection || form instanceof Array) {
      return Array.prototype.map.call(form, function (element) {
        return hyperform(element, settings);
      });
    }

    var wrapper = new Wrapper(form, settings);
    add_behavior(wrapper);
    return wrapper;
  }

  hyperform.version = version;
  hyperform.checkValidity = checkValidity;
  hyperform.reportValidity = reportValidity;
  hyperform.setCustomValidity = setCustomValidity;
  hyperform.stepDown = stepDown;
  hyperform.stepUp = stepUp;
  hyperform.validationMessage = validationMessage;
  hyperform.ValidityState = ValidityState;
  hyperform.valueAsDate = valueAsDate;
  hyperform.valueAsNumber = valueAsNumber;
  hyperform.willValidate = willValidate;

  hyperform.setLanguage = function (lang) {
    set_language(lang);
    return hyperform;
  };

  hyperform.addTranslation = function (lang, catalog) {
    add_translation(lang, catalog);
    return hyperform;
  };

  hyperform.setRenderer = function (renderer, action) {
    Renderer.set(renderer, action);
    return hyperform;
  };

  hyperform.addValidator = function (element, validator) {
    custom_validator_registry.set(element, validator);
    return hyperform;
  };

  hyperform.setMessage = function (element, validator, message) {
    custom_messages.set(element, validator, message);
    return hyperform;
  };

  hyperform.addHook = function (hook, action, position) {
    add_hook(hook, action, position);
    return hyperform;
  };

  hyperform.removeHook = function (hook, action) {
    remove_hook(hook, action);
    return hyperform;
  };

  if (document.currentScript && document.currentScript.hasAttribute('data-hf-autoload')) {
    hyperform(window);
  }

  /**
   * Hyperform
   *
   * Hyperform is a pure JS implementation of the HTML 5 form validation API.
   *
   * @docs https://hyperform.js.org/docs
   *
   */

  var formValidation = () => {

    if ($('form').length) {

      // Override email validation message for invalid email address
      $('form input[type="email"]').each((index, el) => {
        hyperform.setMessage(el, 'typeMismatch', 'Please enter a valid email address.');
      });

      // Override validation message for empty required <select>
      $('form select').each((index, el) => {
        hyperform.setMessage(el, 'valueMissing', 'Please select an option.');
      });

      // Call hyperform
      hyperform(window, {
        classes: {
          warning: 'error-message',
          validated: '-validated',
          valid: '-valid',
          invalid: '-invalid'
        }
      });
    }
  };

  /**
   * Smooth scroll to a target point.
   *
   * @param  {jQuery|Element|Number} target - target element to scroll to, or raw
   *   offset number if precalculated
   * @param  {Boolean} [changeAnchor=true] - whether to change the browser URL
   *   hash after making the scroll. Defaults to true, but requires that an
   *   element with an ID be passed to actually happen.
   */
  var smoothScroll = (target, changeAnchor = true) => {
    function changeAnchorForTarget(target) {
      if (target instanceof jQuery && target.attr('id')) {
        history.pushState(null, null, '#' + target.attr('id'));
      }
    }

    // For accessibility, focuses on the targeted element
    function focusOnTarget(target) {
      if (target instanceof jQuery) {
        target.focus();
        // Check that the target actually received focus. If not, it is not
        // normally focusable and we need to mark it as focusable
        if (!target.is(':focus')) {
          target.attr('tabindex', '-1');
          target.focus();
        }
      }
    }

    if (target instanceof jQuery && !target.length) {
      // Fail silently if passed an empty jQuery object
      return;
    }

    // If passed a vanilla DOM object, instantiate jQuery
    if (target instanceof Element) {
      target = $(target);
    }

    let scrollTop;
    if (!(target instanceof jQuery)) {
      scrollTop = Number(target);
      if (Number.isNaN(scrollTop)) {
        throw 'invalid smooth scroll target ' + target;
      }
    } else {
      scrollTop = target.offset().top;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      // If user has reduced motion preference, don't animate, just jump
      $('html, body').scrollTop(scrollTop);
      if (changeAnchor) {
        changeAnchorForTarget(target);
      }
      focusOnTarget(target);
    } else {
      // Animate the user to the target point
      $('html, body').stop().animate({
        scrollTop
      }, 500, () => {
        if (changeAnchor) {
          changeAnchorForTarget(target);
          focusOnTarget(target);
        }
      });
    }
  };

  /**
   * Smooth scroll internal links
   */
  var anchorSmoothScroll = () => {
    $('html').on('click', 'a[href^="#"]:not([href="#"],[href="#maincontent"],.anchor-jump-link,.coveo-search-result-link)', (e) => {
      e.preventDefault();
      const target = e.currentTarget.hash,
            $target = $(target);
      if ($target.length) {
        smoothScroll($target);
      }
    });
  };

  /**
   * Add JS functionality for full card hover/focus, so that we don't have to put
   * gobs of text inside anchors which is not very screen reader friendly.
   */
  var jsLinkEvent = () => {

    $('html')
      .on('click', '.js-link-event', (e) => {

        if ($(e.target).prop('tagName') === 'A') {
          return;
        }

        const $resultLink = $(e.currentTarget).find('.js-link-event-link');

        if ($resultLink.length) {
          $resultLink.get(0).click();
        }
      })
      .on('focusin focusout', '.js-link-event .js-link-event-link', (e) => {
        $(e.currentTarget).closest('.js-link-event').toggleClass('-focused');
      })
    ;

  };

  var heroHome = () => {

    // because the decorations animate with transitions, this is to stop the drastic
    // transition of the shapes when resizing

    // Setup a timer
    const $body = $('body'),
          $heroHome = $('.hero-home');
    let timeout;

    if ($heroHome.length) {

      // Listen for resize events
      window.addEventListener('resize', () => {

        setTimeout(() => {
          $body.removeClass('stop-transition');
        }, 1000);

        // If there's a timer, cancel it
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(() => {
          $body.addClass('stop-transition');
        });

      }, false);

    }

  };

  var accordion = () => {

    const $accordion = $('.accordion');

    if ($accordion.length) {

      $('.accordion-trigger').on('click', (e) => {

        const $trigger = $(e.currentTarget),
              $item = $trigger.parents('.accordion-item'),
              $content = $item.find('.accordion-content');

        $trigger
          .trigger('blur')
          .attr('aria-expanded', $item.attr('data-expanded') === 'true' ? 'false' : 'true')
        ;

        $content
          .attr('aria-hidden', $content.attr('aria-hidden') === 'true' ? 'false' : 'true')
          .slideToggle(250)
        ;

        $item
          .attr('data-expanded', $item.attr('data-expanded') === 'true' ? 'false' : 'true');

      });

    }

  };

  var accordionTabs = () => {

    const $accordionTabs = $('.accordion-tabs');

    if ($accordionTabs.length) {
      tabControl();

      // Listen for resize events
      let timeout;
      window.addEventListener('resize', () => {

        // If there's a timer, cancel it
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(() => {
          tabControl();
        });

      }, false);

    }

    function tabControl() {

      const tabs = $('.accordion-tabs').find('.tabs');

      if (tabs.is(':visible')) {

        tabs.find('.tab-trigger').on('click', (e) => {

          const $this = $(e.currentTarget),
                $tabs = $this.parents('.tabs'),
                $buttons = $tabs.find('.tab-trigger'),
                $li = $tabs.find('li'),
                $item = $tabs.parents('.accordion-tabs').find('.accordion-tabs-item'),
                $target = $this.attr('data-id')
          ;

          $buttons
            .removeClass('-active')
            .attr('aria-expanded', 'false');

          $li.removeClass('-active');

          $item
            .removeClass('-active')
            .attr('aria-hidden', 'true');

          $this
            .addClass('-active')
            .parent().addClass('-active')
            .attr('aria-expanded', 'true');

          $($target)
            .addClass('-active')
            .attr('aria-hidden', 'false');

        });

      } else {

        $('.tab-trigger-mobile').on('click', (e) => {

          const $this = $(e.currentTarget),
                $container = $this.parents('.accordion-tabs'),
                currId = $this.parent().attr('id'),
                $items = $container.find('.accordion-tabs-item');

          $container.find('.tabs .tab-trigger').removeClass('-active');
          $container.find('.tabs li').removeClass('-active');

          $container.find('.tabs .tab-trigger[data-id$="#' + currId + '"]')
            .addClass('-active')
            .parent()
            .addClass('-active')
          ;

          $items
            .removeClass('-active')
            .attr('aria-hidden', 'true');

          $('.tab-trigger-mobile').attr('aria-expanded', 'false');

          $this.attr('aria-expanded', 'true')
            .parent()
            .addClass('-active')
            .attr('aria-hidden', 'false');

          $('html, body').stop(true, true).animate({
            scrollTop: $container.offset().top
          }, 400);

        });

      }
    }
  };

  var contentExpander = () => {

    const $contentExpander = $('.content-expander');

    if ($contentExpander.length) {

      $('.js-content-expander-open').on('click', (e) => {

        const $trigger = $(e.currentTarget),
              $content = $trigger.parent().next(),
              $collapser = $content.find('.js-content-expander-close')
        ;

        $trigger
          .trigger('blur')
          .attr('aria-expanded', 'true')
          .attr('aria-hidden', 'true')
        ;

        $content
          .attr('aria-hidden', 'false')
          .slideDown(250, function() {
            $collapser.focus();
          });

        $collapser.attr('aria-expanded', 'true');

      });

      $('.js-content-expander-close').on('click', (e) => {

        const $trigger = $(e.currentTarget),
              $opener = $(e.currentTarget).parents('.content-expander').find('.js-content-expander-open'),
              $content = $(e.currentTarget).parent()
        ;

        $trigger
          .trigger('blur')
          .attr('aria-expanded', 'false')
        ;

        $content
          .attr('aria-hidden', $content.attr('aria-hidden') === 'true' ? 'false' : 'true')
          .slideUp(250, function() {
            $opener
              .attr('aria-expanded', 'false')
              .attr('aria-expanded', 'false')
              .attr('aria-hidden', 'false')
              .focus()
            ;
          });

      });

    }

  };

  // nb. This is for IE10 and lower _only_.
  var supportCustomEvent = window.CustomEvent;
  if (!supportCustomEvent || typeof supportCustomEvent === 'object') {
    supportCustomEvent = function CustomEvent(event, x) {
      x = x || {};
      var ev = document.createEvent('CustomEvent');
      ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
      return ev;
    };
    supportCustomEvent.prototype = window.Event.prototype;
  }

  /**
   * Dispatches the passed event to both an "on<type>" handler as well as via the
   * normal dispatch operation. Does not bubble.
   *
   * @param {!EventTarget} target
   * @param {!Event} event
   * @return {boolean}
   */
  function safeDispatchEvent(target, event) {
    var check = 'on' + event.type.toLowerCase();
    if (typeof target[check] === 'function') {
      target[check](event);
    }
    return target.dispatchEvent(event);
  }

  /**
   * @param {Element} el to check for stacking context
   * @return {boolean} whether this el or its parents creates a stacking context
   */
  function createsStackingContext(el) {
    while (el && el !== document.body) {
      var s = window.getComputedStyle(el);
      var invalid = function(k, ok) {
        return !(s[k] === undefined || s[k] === ok);
      };

      if (s.opacity < 1 ||
          invalid('zIndex', 'auto') ||
          invalid('transform', 'none') ||
          invalid('mixBlendMode', 'normal') ||
          invalid('filter', 'none') ||
          invalid('perspective', 'none') ||
          s['isolation'] === 'isolate' ||
          s.position === 'fixed' ||
          s.webkitOverflowScrolling === 'touch') {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  /**
   * Finds the nearest <dialog> from the passed element.
   *
   * @param {Element} el to search from
   * @return {HTMLDialogElement} dialog found
   */
  function findNearestDialog(el) {
    while (el) {
      if (el.localName === 'dialog') {
        return /** @type {HTMLDialogElement} */ (el);
      }
      if (el.parentElement) {
        el = el.parentElement;
      } else if (el.parentNode) {
        el = el.parentNode.host;
      } else {
        el = null;
      }
    }
    return null;
  }

  /**
   * Blur the specified element, as long as it's not the HTML body element.
   * This works around an IE9/10 bug - blurring the body causes Windows to
   * blur the whole application.
   *
   * @param {Element} el to blur
   */
  function safeBlur(el) {
    // Find the actual focused element when the active element is inside a shadow root
    while (el && el.shadowRoot && el.shadowRoot.activeElement) {
      el = el.shadowRoot.activeElement;
    }

    if (el && el.blur && el !== document.body) {
      el.blur();
    }
  }

  /**
   * @param {!NodeList} nodeList to search
   * @param {Node} node to find
   * @return {boolean} whether node is inside nodeList
   */
  function inNodeList(nodeList, node) {
    for (var i = 0; i < nodeList.length; ++i) {
      if (nodeList[i] === node) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {HTMLFormElement} el to check
   * @return {boolean} whether this form has method="dialog"
   */
  function isFormMethodDialog(el) {
    if (!el || !el.hasAttribute('method')) {
      return false;
    }
    return el.getAttribute('method').toLowerCase() === 'dialog';
  }

  /**
   * @param {!DocumentFragment|!Element} hostElement
   * @return {?Element}
   */
  function findFocusableElementWithin(hostElement) {
    // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
    // alternative involves stepping through and trying to focus everything.
    var opts = ['button', 'input', 'keygen', 'select', 'textarea'];
    var query = opts.map(function(el) {
      return el + ':not([disabled])';
    });
    // TODO(samthor): tabindex values that are not numeric are not focusable.
    query.push('[tabindex]:not([disabled]):not([tabindex=""])');  // tabindex != "", not disabled
    var target = hostElement.querySelector(query.join(', '));

    if (!target && 'attachShadow' in Element.prototype) {
      // If we haven't found a focusable target, see if the host element contains an element
      // which has a shadowRoot.
      // Recursively search for the first focusable item in shadow roots.
      var elems = hostElement.querySelectorAll('*');
      for (var i = 0; i < elems.length; i++) {
        if (elems[i].tagName && elems[i].shadowRoot) {
          target = findFocusableElementWithin(elems[i].shadowRoot);
          if (target) {
            break;
          }
        }
      }
    }
    return target;
  }

  /**
   * Determines if an element is attached to the DOM.
   * @param {Element} element to check
   * @return {boolean} whether the element is in DOM
   */
  function isConnected(element) {
    return element.isConnected || document.body.contains(element);
  }

  /**
   * @param {!Event} event
   * @return {?Element}
   */
  function findFormSubmitter(event) {
    if (event.submitter) {
      return event.submitter;
    }

    var form = event.target;
    if (!(form instanceof HTMLFormElement)) {
      return null;
    }

    var submitter = dialogPolyfill.formSubmitter;
    if (!submitter) {
      var target = event.target;
      var root = ('getRootNode' in target && target.getRootNode() || document);
      submitter = root.activeElement;
    }

    if (!submitter || submitter.form !== form) {
      return null;
    }
    return submitter;
  }

  /**
   * @param {!Event} event
   */
  function maybeHandleSubmit(event) {
    if (event.defaultPrevented) {
      return;
    }
    var form = /** @type {!HTMLFormElement} */ (event.target);

    // We'd have a value if we clicked on an imagemap.
    var value = dialogPolyfill.imagemapUseValue;
    var submitter = findFormSubmitter(event);
    if (value === null && submitter) {
      value = submitter.value;
    }

    // There should always be a dialog as this handler is added specifically on them, but check just
    // in case.
    var dialog = findNearestDialog(form);
    if (!dialog) {
      return;
    }

    // Prefer formmethod on the button.
    var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');
    if (formmethod !== 'dialog') {
      return;
    }
    event.preventDefault();

    if (value != null) {
      // nb. we explicitly check against null/undefined
      dialog.close(value);
    } else {
      dialog.close();
    }
  }

  /**
   * @param {!HTMLDialogElement} dialog to upgrade
   * @constructor
   */
  function dialogPolyfillInfo(dialog) {
    this.dialog_ = dialog;
    this.replacedStyleTop_ = false;
    this.openAsModal_ = false;

    // Set a11y role. Browsers that support dialog implicitly know this already.
    if (!dialog.hasAttribute('role')) {
      dialog.setAttribute('role', 'dialog');
    }

    dialog.show = this.show.bind(this);
    dialog.showModal = this.showModal.bind(this);
    dialog.close = this.close.bind(this);

    dialog.addEventListener('submit', maybeHandleSubmit, false);

    if (!('returnValue' in dialog)) {
      dialog.returnValue = '';
    }

    if ('MutationObserver' in window) {
      var mo = new MutationObserver(this.maybeHideModal.bind(this));
      mo.observe(dialog, {attributes: true, attributeFilter: ['open']});
    } else {
      // IE10 and below support. Note that DOMNodeRemoved etc fire _before_ removal. They also
      // seem to fire even if the element was removed as part of a parent removal. Use the removed
      // events to force downgrade (useful if removed/immediately added).
      var removed = false;
      var cb = function() {
        removed ? this.downgradeModal() : this.maybeHideModal();
        removed = false;
      }.bind(this);
      var timeout;
      var delayModel = function(ev) {
        if (ev.target !== dialog) { return; }  // not for a child element
        var cand = 'DOMNodeRemoved';
        removed |= (ev.type.substr(0, cand.length) === cand);
        window.clearTimeout(timeout);
        timeout = window.setTimeout(cb, 0);
      };
      ['DOMAttrModified', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument'].forEach(function(name) {
        dialog.addEventListener(name, delayModel);
      });
    }
    // Note that the DOM is observed inside DialogManager while any dialog
    // is being displayed as a modal, to catch modal removal from the DOM.

    Object.defineProperty(dialog, 'open', {
      set: this.setOpen.bind(this),
      get: dialog.hasAttribute.bind(dialog, 'open')
    });

    this.backdrop_ = document.createElement('div');
    this.backdrop_.className = 'backdrop';
    this.backdrop_.addEventListener('mouseup'  , this.backdropMouseEvent_.bind(this));
    this.backdrop_.addEventListener('mousedown', this.backdropMouseEvent_.bind(this));
    this.backdrop_.addEventListener('click'    , this.backdropMouseEvent_.bind(this));
  }

  dialogPolyfillInfo.prototype = /** @type {HTMLDialogElement.prototype} */ ({

    get dialog() {
      return this.dialog_;
    },

    /**
     * Maybe remove this dialog from the modal top layer. This is called when
     * a modal dialog may no longer be tenable, e.g., when the dialog is no
     * longer open or is no longer part of the DOM.
     */
    maybeHideModal: function() {
      if (this.dialog_.hasAttribute('open') && isConnected(this.dialog_)) { return; }
      this.downgradeModal();
    },

    /**
     * Remove this dialog from the modal top layer, leaving it as a non-modal.
     */
    downgradeModal: function() {
      if (!this.openAsModal_) { return; }
      this.openAsModal_ = false;
      this.dialog_.style.zIndex = '';

      // This won't match the native <dialog> exactly because if the user set top on a centered
      // polyfill dialog, that top gets thrown away when the dialog is closed. Not sure it's
      // possible to polyfill this perfectly.
      if (this.replacedStyleTop_) {
        this.dialog_.style.top = '';
        this.replacedStyleTop_ = false;
      }

      // Clear the backdrop and remove from the manager.
      this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
      dialogPolyfill.dm.removeDialog(this);
    },

    /**
     * @param {boolean} value whether to open or close this dialog
     */
    setOpen: function(value) {
      if (value) {
        this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
      } else {
        this.dialog_.removeAttribute('open');
        this.maybeHideModal();  // nb. redundant with MutationObserver
      }
    },

    /**
     * Handles mouse events ('mouseup', 'mousedown', 'click') on the fake .backdrop element, redirecting them as if
     * they were on the dialog itself.
     *
     * @param {!Event} e to redirect
     */
    backdropMouseEvent_: function(e) {
      if (!this.dialog_.hasAttribute('tabindex')) {
        // Clicking on the backdrop should move the implicit cursor, even if dialog cannot be
        // focused. Create a fake thing to focus on. If the backdrop was _before_ the dialog, this
        // would not be needed - clicks would move the implicit cursor there.
        var fake = document.createElement('div');
        this.dialog_.insertBefore(fake, this.dialog_.firstChild);
        fake.tabIndex = -1;
        fake.focus();
        this.dialog_.removeChild(fake);
      } else {
        this.dialog_.focus();
      }

      var redirectedEvent = document.createEvent('MouseEvents');
      redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window,
          e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey,
          e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
      this.dialog_.dispatchEvent(redirectedEvent);
      e.stopPropagation();
    },

    /**
     * Focuses on the first focusable element within the dialog. This will always blur the current
     * focus, even if nothing within the dialog is found.
     */
    focus_: function() {
      // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
      var target = this.dialog_.querySelector('[autofocus]:not([disabled])');
      if (!target && this.dialog_.tabIndex >= 0) {
        target = this.dialog_;
      }
      if (!target) {
        target = findFocusableElementWithin(this.dialog_);
      }
      safeBlur(document.activeElement);
      target && target.focus();
    },

    /**
     * Sets the zIndex for the backdrop and dialog.
     *
     * @param {number} dialogZ
     * @param {number} backdropZ
     */
    updateZIndex: function(dialogZ, backdropZ) {
      if (dialogZ < backdropZ) {
        throw new Error('dialogZ should never be < backdropZ');
      }
      this.dialog_.style.zIndex = dialogZ;
      this.backdrop_.style.zIndex = backdropZ;
    },

    /**
     * Shows the dialog. If the dialog is already open, this does nothing.
     */
    show: function() {
      if (!this.dialog_.open) {
        this.setOpen(true);
        this.focus_();
      }
    },

    /**
     * Show this dialog modally.
     */
    showModal: function() {
      if (this.dialog_.hasAttribute('open')) {
        throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');
      }
      if (!isConnected(this.dialog_)) {
        throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');
      }
      if (!dialogPolyfill.dm.pushDialog(this)) {
        throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');
      }

      if (createsStackingContext(this.dialog_.parentElement)) {
        console.warn('A dialog is being shown inside a stacking context. ' +
            'This may cause it to be unusable. For more information, see this link: ' +
            'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context');
      }

      this.setOpen(true);
      this.openAsModal_ = true;

      // Optionally center vertically, relative to the current viewport.
      if (dialogPolyfill.needsCentering(this.dialog_)) {
        dialogPolyfill.reposition(this.dialog_);
        this.replacedStyleTop_ = true;
      } else {
        this.replacedStyleTop_ = false;
      }

      // Insert backdrop.
      this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling);

      // Focus on whatever inside the dialog.
      this.focus_();
    },

    /**
     * Closes this HTMLDialogElement. This is optional vs clearing the open
     * attribute, however this fires a 'close' event.
     *
     * @param {string=} opt_returnValue to use as the returnValue
     */
    close: function(opt_returnValue) {
      if (!this.dialog_.hasAttribute('open')) {
        throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');
      }
      this.setOpen(false);

      // Leave returnValue untouched in case it was set directly on the element
      if (opt_returnValue !== undefined) {
        this.dialog_.returnValue = opt_returnValue;
      }

      // Triggering "close" event for any attached listeners on the <dialog>.
      var closeEvent = new supportCustomEvent('close', {
        bubbles: false,
        cancelable: false
      });
      safeDispatchEvent(this.dialog_, closeEvent);
    }

  });

  var dialogPolyfill = {};

  dialogPolyfill.reposition = function(element) {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
    element.style.top = Math.max(scrollTop, topValue) + 'px';
  };

  dialogPolyfill.isInlinePositionSetByStylesheet = function(element) {
    for (var i = 0; i < document.styleSheets.length; ++i) {
      var styleSheet = document.styleSheets[i];
      var cssRules = null;
      // Some browsers throw on cssRules.
      try {
        cssRules = styleSheet.cssRules;
      } catch (e) {}
      if (!cssRules) { continue; }
      for (var j = 0; j < cssRules.length; ++j) {
        var rule = cssRules[j];
        var selectedNodes = null;
        // Ignore errors on invalid selector texts.
        try {
          selectedNodes = document.querySelectorAll(rule.selectorText);
        } catch(e) {}
        if (!selectedNodes || !inNodeList(selectedNodes, element)) {
          continue;
        }
        var cssTop = rule.style.getPropertyValue('top');
        var cssBottom = rule.style.getPropertyValue('bottom');
        if ((cssTop && cssTop !== 'auto') || (cssBottom && cssBottom !== 'auto')) {
          return true;
        }
      }
    }
    return false;
  };

  dialogPolyfill.needsCentering = function(dialog) {
    var computedStyle = window.getComputedStyle(dialog);
    if (computedStyle.position !== 'absolute') {
      return false;
    }

    // We must determine whether the top/bottom specified value is non-auto.  In
    // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
    // Firefox returns the used value. So we do this crazy thing instead: check
    // the inline style and then go through CSS rules.
    if ((dialog.style.top !== 'auto' && dialog.style.top !== '') ||
        (dialog.style.bottom !== 'auto' && dialog.style.bottom !== '')) {
      return false;
    }
    return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
  };

  /**
   * @param {!Element} element to force upgrade
   */
  dialogPolyfill.forceRegisterDialog = function(element) {
    if (window.HTMLDialogElement || element.showModal) {
      console.warn('This browser already supports <dialog>, the polyfill ' +
          'may not work correctly', element);
    }
    if (element.localName !== 'dialog') {
      throw new Error('Failed to register dialog: The element is not a dialog.');
    }
    new dialogPolyfillInfo(/** @type {!HTMLDialogElement} */ (element));
  };

  /**
   * @param {!Element} element to upgrade, if necessary
   */
  dialogPolyfill.registerDialog = function(element) {
    if (!element.showModal) {
      dialogPolyfill.forceRegisterDialog(element);
    }
  };

  /**
   * @constructor
   */
  dialogPolyfill.DialogManager = function() {
    /** @type {!Array<!dialogPolyfillInfo>} */
    this.pendingDialogStack = [];

    var checkDOM = this.checkDOM_.bind(this);

    // The overlay is used to simulate how a modal dialog blocks the document.
    // The blocking dialog is positioned on top of the overlay, and the rest of
    // the dialogs on the pending dialog stack are positioned below it. In the
    // actual implementation, the modal dialog stacking is controlled by the
    // top layer, where z-index has no effect.
    this.overlay = document.createElement('div');
    this.overlay.className = '_dialog_overlay';
    this.overlay.addEventListener('click', function(e) {
      this.forwardTab_ = undefined;
      e.stopPropagation();
      checkDOM([]);  // sanity-check DOM
    }.bind(this));

    this.handleKey_ = this.handleKey_.bind(this);
    this.handleFocus_ = this.handleFocus_.bind(this);

    this.zIndexLow_ = 100000;
    this.zIndexHigh_ = 100000 + 150;

    this.forwardTab_ = undefined;

    if ('MutationObserver' in window) {
      this.mo_ = new MutationObserver(function(records) {
        var removed = [];
        records.forEach(function(rec) {
          for (var i = 0, c; c = rec.removedNodes[i]; ++i) {
            if (!(c instanceof Element)) {
              continue;
            } else if (c.localName === 'dialog') {
              removed.push(c);
            }
            removed = removed.concat(c.querySelectorAll('dialog'));
          }
        });
        removed.length && checkDOM(removed);
      });
    }
  };

  /**
   * Called on the first modal dialog being shown. Adds the overlay and related
   * handlers.
   */
  dialogPolyfill.DialogManager.prototype.blockDocument = function() {
    document.documentElement.addEventListener('focus', this.handleFocus_, true);
    document.addEventListener('keydown', this.handleKey_);
    this.mo_ && this.mo_.observe(document, {childList: true, subtree: true});
  };

  /**
   * Called on the first modal dialog being removed, i.e., when no more modal
   * dialogs are visible.
   */
  dialogPolyfill.DialogManager.prototype.unblockDocument = function() {
    document.documentElement.removeEventListener('focus', this.handleFocus_, true);
    document.removeEventListener('keydown', this.handleKey_);
    this.mo_ && this.mo_.disconnect();
  };

  /**
   * Updates the stacking of all known dialogs.
   */
  dialogPolyfill.DialogManager.prototype.updateStacking = function() {
    var zIndex = this.zIndexHigh_;

    for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
      dpi.updateZIndex(--zIndex, --zIndex);
      if (i === 0) {
        this.overlay.style.zIndex = --zIndex;
      }
    }

    // Make the overlay a sibling of the dialog itself.
    var last = this.pendingDialogStack[0];
    if (last) {
      var p = last.dialog.parentNode || document.body;
      p.appendChild(this.overlay);
    } else if (this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  };

  /**
   * @param {Element} candidate to check if contained or is the top-most modal dialog
   * @return {boolean} whether candidate is contained in top dialog
   */
  dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function(candidate) {
    while (candidate = findNearestDialog(candidate)) {
      for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
        if (dpi.dialog === candidate) {
          return i === 0;  // only valid if top-most
        }
      }
      candidate = candidate.parentElement;
    }
    return false;
  };

  dialogPolyfill.DialogManager.prototype.handleFocus_ = function(event) {
    var target = event.composedPath ? event.composedPath()[0] : event.target;

    if (this.containedByTopDialog_(target)) { return; }

    if (document.activeElement === document.documentElement) { return; }

    event.preventDefault();
    event.stopPropagation();
    safeBlur(/** @type {Element} */ (target));

    if (this.forwardTab_ === undefined) { return; }  // move focus only from a tab key

    var dpi = this.pendingDialogStack[0];
    var dialog = dpi.dialog;
    var position = dialog.compareDocumentPosition(target);
    if (position & Node.DOCUMENT_POSITION_PRECEDING) {
      if (this.forwardTab_) {
        // forward
        dpi.focus_();
      } else if (target !== document.documentElement) {
        // backwards if we're not already focused on <html>
        document.documentElement.focus();
      }
    }

    return false;
  };

  dialogPolyfill.DialogManager.prototype.handleKey_ = function(event) {
    this.forwardTab_ = undefined;
    if (event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();
      var cancelEvent = new supportCustomEvent('cancel', {
        bubbles: false,
        cancelable: true
      });
      var dpi = this.pendingDialogStack[0];
      if (dpi && safeDispatchEvent(dpi.dialog, cancelEvent)) {
        dpi.dialog.close();
      }
    } else if (event.keyCode === 9) {
      this.forwardTab_ = !event.shiftKey;
    }
  };

  /**
   * Finds and downgrades any known modal dialogs that are no longer displayed. Dialogs that are
   * removed and immediately readded don't stay modal, they become normal.
   *
   * @param {!Array<!HTMLDialogElement>} removed that have definitely been removed
   */
  dialogPolyfill.DialogManager.prototype.checkDOM_ = function(removed) {
    // This operates on a clone because it may cause it to change. Each change also calls
    // updateStacking, which only actually needs to happen once. But who removes many modal dialogs
    // at a time?!
    var clone = this.pendingDialogStack.slice();
    clone.forEach(function(dpi) {
      if (removed.indexOf(dpi.dialog) !== -1) {
        dpi.downgradeModal();
      } else {
        dpi.maybeHideModal();
      }
    });
  };

  /**
   * @param {!dialogPolyfillInfo} dpi
   * @return {boolean} whether the dialog was allowed
   */
  dialogPolyfill.DialogManager.prototype.pushDialog = function(dpi) {
    var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
    if (this.pendingDialogStack.length >= allowed) {
      return false;
    }
    if (this.pendingDialogStack.unshift(dpi) === 1) {
      this.blockDocument();
    }
    this.updateStacking();
    return true;
  };

  /**
   * @param {!dialogPolyfillInfo} dpi
   */
  dialogPolyfill.DialogManager.prototype.removeDialog = function(dpi) {
    var index = this.pendingDialogStack.indexOf(dpi);
    if (index === -1) { return; }

    this.pendingDialogStack.splice(index, 1);
    if (this.pendingDialogStack.length === 0) {
      this.unblockDocument();
    }
    this.updateStacking();
  };

  dialogPolyfill.dm = new dialogPolyfill.DialogManager();
  dialogPolyfill.formSubmitter = null;
  dialogPolyfill.imagemapUseValue = null;

  /**
   * Installs global handlers, such as click listers and native method overrides. These are needed
   * even if a no dialog is registered, as they deal with <form method="dialog">.
   */
  if (window.HTMLDialogElement === undefined) {

    /**
     * If HTMLFormElement translates method="DIALOG" into 'get', then replace the descriptor with
     * one that returns the correct value.
     */
    var testForm = document.createElement('form');
    testForm.setAttribute('method', 'dialog');
    if (testForm.method !== 'dialog') {
      var methodDescriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'method');
      if (methodDescriptor) {
        // nb. Some older iOS and older PhantomJS fail to return the descriptor. Don't do anything
        // and don't bother to update the element.
        var realGet = methodDescriptor.get;
        methodDescriptor.get = function() {
          if (isFormMethodDialog(this)) {
            return 'dialog';
          }
          return realGet.call(this);
        };
        var realSet = methodDescriptor.set;
        /** @this {HTMLElement} */
        methodDescriptor.set = function(v) {
          if (typeof v === 'string' && v.toLowerCase() === 'dialog') {
            return this.setAttribute('method', v);
          }
          return realSet.call(this, v);
        };
        Object.defineProperty(HTMLFormElement.prototype, 'method', methodDescriptor);
      }
    }

    /**
     * Global 'click' handler, to capture the <input type="submit"> or <button> element which has
     * submitted a <form method="dialog">. Needed as Safari and others don't report this inside
     * document.activeElement.
     */
    document.addEventListener('click', function(ev) {
      dialogPolyfill.formSubmitter = null;
      dialogPolyfill.imagemapUseValue = null;
      if (ev.defaultPrevented) { return; }  // e.g. a submit which prevents default submission

      var target = /** @type {Element} */ (ev.target);
      if ('composedPath' in ev) {
        var path = ev.composedPath();
        target = path.shift() || target;
      }
      if (!target || !isFormMethodDialog(target.form)) { return; }

      var valid = (target.type === 'submit' && ['button', 'input'].indexOf(target.localName) > -1);
      if (!valid) {
        if (!(target.localName === 'input' && target.type === 'image')) { return; }
        // this is a <input type="image">, which can submit forms
        dialogPolyfill.imagemapUseValue = ev.offsetX + ',' + ev.offsetY;
      }

      var dialog = findNearestDialog(target);
      if (!dialog) { return; }

      dialogPolyfill.formSubmitter = target;

    }, false);

    /**
     * Global 'submit' handler. This handles submits of `method="dialog"` which are invalid, i.e.,
     * outside a dialog. They get prevented.
     */
    document.addEventListener('submit', function(ev) {
      var form = ev.target;
      var dialog = findNearestDialog(form);
      if (dialog) {
        return;  // ignore, handle there
      }

      var submitter = findFormSubmitter(ev);
      var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');
      if (formmethod === 'dialog') {
        ev.preventDefault();
      }
    });

    /**
     * Replace the native HTMLFormElement.submit() method, as it won't fire the
     * submit event and give us a chance to respond.
     */
    var nativeFormSubmit = HTMLFormElement.prototype.submit;
    var replacementFormSubmit = function () {
      if (!isFormMethodDialog(this)) {
        return nativeFormSubmit.call(this);
      }
      var dialog = findNearestDialog(this);
      dialog && dialog.close();
    };
    HTMLFormElement.prototype.submit = replacementFormSubmit;
  }

  var videoModal = () => {

    const dialog = document.getElementById('video-modal'),
          $html = $('html'),
          $modal = $(dialog),
          $modalOpen = $('.js-video-modal-open'),
          $modalClose = $('.js-video-modal-close'),
          $iFrame = $modal.find('iframe'),
          $iFrameParent = $iFrame.parent()
    ;

    dialogPolyfill.registerDialog(dialog);

    $modalOpen.on('click', ({ target }) => {

      const
        iFrameSrc = $(target).data('src'),
        videoService = $(target).data('video-service'),
        videoID = $(target).data('video-id'),
        allowAttr = videoService === 'youtube' ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' : 'autoplay; fullscreen; picture-in-picture'
      ;

      $iFrame
        .remove()
        .attr('allow', allowAttr)
        .attr('src', iFrameSrc);
      $iFrameParent.append($iFrame);
      $modal.attr('data-video-id', videoID);
      $html.attr('data-modal', 'open');
      dialog.showModal();

    });

    $modal.on('close', () => {
      const modalID = $modal.attr('data-video-id'),
            $trigger = $(`.js-video-modal-open[data-video-id="${modalID}"]`)
      ;
      $iFrame
        .remove()
        .attr('src', '');
      $iFrameParent.append($iFrame);
      $html.attr('data-modal', 'closed');
      $trigger.focus();
      $modal.attr('data-video-id', '');
    });

    $modalClose.on('click', () => {
      $html.attr('data-modal', 'closed');
      dialog.close();
    });
  };

  var jquery_matchHeight = {exports: {}};

  /**
  * jquery-match-height 0.7.2 by @liabru
  * http://brm.io/jquery-match-height/
  * License: MIT
  */

  (function (module) {
  (function(factory) { // eslint-disable-line no-extra-semi
      if (module.exports) {
          // CommonJS
          module.exports = factory(require$$0__default['default']);
      } else {
          // Global
          factory(jQuery);
      }
  })(function($) {
      /*
      *  internal
      */

      var _previousResizeWidth = -1,
          _updateTimeout = -1;

      /*
      *  _parse
      *  value parse utility function
      */

      var _parse = function(value) {
          // parse value and convert NaN to 0
          return parseFloat(value) || 0;
      };

      /*
      *  _rows
      *  utility function returns array of jQuery selections representing each row
      *  (as displayed after float wrapping applied by browser)
      */

      var _rows = function(elements) {
          var tolerance = 1,
              $elements = $(elements),
              lastTop = null,
              rows = [];

          // group elements by their top position
          $elements.each(function(){
              var $that = $(this),
                  top = $that.offset().top - _parse($that.css('margin-top')),
                  lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

              if (lastRow === null) {
                  // first item on the row, so just push it
                  rows.push($that);
              } else {
                  // if the row top is the same, add to the row group
                  if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                      rows[rows.length - 1] = lastRow.add($that);
                  } else {
                      // otherwise start a new row group
                      rows.push($that);
                  }
              }

              // keep track of the last row top
              lastTop = top;
          });

          return rows;
      };

      /*
      *  _parseOptions
      *  handle plugin options
      */

      var _parseOptions = function(options) {
          var opts = {
              byRow: true,
              property: 'height',
              target: null,
              remove: false
          };

          if (typeof options === 'object') {
              return $.extend(opts, options);
          }

          if (typeof options === 'boolean') {
              opts.byRow = options;
          } else if (options === 'remove') {
              opts.remove = true;
          }

          return opts;
      };

      /*
      *  matchHeight
      *  plugin definition
      */

      var matchHeight = $.fn.matchHeight = function(options) {
          var opts = _parseOptions(options);

          // handle remove
          if (opts.remove) {
              var that = this;

              // remove fixed height from all selected elements
              this.css(opts.property, '');

              // remove selected elements from all groups
              $.each(matchHeight._groups, function(key, group) {
                  group.elements = group.elements.not(that);
              });

              // TODO: cleanup empty groups

              return this;
          }

          if (this.length <= 1 && !opts.target) {
              return this;
          }

          // keep track of this group so we can re-apply later on load and resize events
          matchHeight._groups.push({
              elements: this,
              options: opts
          });

          // match each element's height to the tallest element in the selection
          matchHeight._apply(this, opts);

          return this;
      };

      /*
      *  plugin global options
      */

      matchHeight.version = '0.7.2';
      matchHeight._groups = [];
      matchHeight._throttle = 80;
      matchHeight._maintainScroll = false;
      matchHeight._beforeUpdate = null;
      matchHeight._afterUpdate = null;
      matchHeight._rows = _rows;
      matchHeight._parse = _parse;
      matchHeight._parseOptions = _parseOptions;

      /*
      *  matchHeight._apply
      *  apply matchHeight to given elements
      */

      matchHeight._apply = function(elements, options) {
          var opts = _parseOptions(options),
              $elements = $(elements),
              rows = [$elements];

          // take note of scroll position
          var scrollTop = $(window).scrollTop(),
              htmlHeight = $('html').outerHeight(true);

          // get hidden parents
          var $hiddenParents = $elements.parents().filter(':hidden');

          // cache the original inline style
          $hiddenParents.each(function() {
              var $that = $(this);
              $that.data('style-cache', $that.attr('style'));
          });

          // temporarily must force hidden parents visible
          $hiddenParents.css('display', 'block');

          // get rows if using byRow, otherwise assume one row
          if (opts.byRow && !opts.target) {

              // must first force an arbitrary equal height so floating elements break evenly
              $elements.each(function() {
                  var $that = $(this),
                      display = $that.css('display');

                  // temporarily force a usable display value
                  if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                      display = 'block';
                  }

                  // cache the original inline style
                  $that.data('style-cache', $that.attr('style'));

                  $that.css({
                      'display': display,
                      'padding-top': '0',
                      'padding-bottom': '0',
                      'margin-top': '0',
                      'margin-bottom': '0',
                      'border-top-width': '0',
                      'border-bottom-width': '0',
                      'height': '100px',
                      'overflow': 'hidden'
                  });
              });

              // get the array of rows (based on element top position)
              rows = _rows($elements);

              // revert original inline styles
              $elements.each(function() {
                  var $that = $(this);
                  $that.attr('style', $that.data('style-cache') || '');
              });
          }

          $.each(rows, function(key, row) {
              var $row = $(row),
                  targetHeight = 0;

              if (!opts.target) {
                  // skip apply to rows with only one item
                  if (opts.byRow && $row.length <= 1) {
                      $row.css(opts.property, '');
                      return;
                  }

                  // iterate the row and find the max height
                  $row.each(function(){
                      var $that = $(this),
                          style = $that.attr('style'),
                          display = $that.css('display');

                      // temporarily force a usable display value
                      if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                          display = 'block';
                      }

                      // ensure we get the correct actual height (and not a previously set height value)
                      var css = { 'display': display };
                      css[opts.property] = '';
                      $that.css(css);

                      // find the max height (including padding, but not margin)
                      if ($that.outerHeight(false) > targetHeight) {
                          targetHeight = $that.outerHeight(false);
                      }

                      // revert styles
                      if (style) {
                          $that.attr('style', style);
                      } else {
                          $that.css('display', '');
                      }
                  });
              } else {
                  // if target set, use the height of the target element
                  targetHeight = opts.target.outerHeight(false);
              }

              // iterate the row and apply the height to all elements
              $row.each(function(){
                  var $that = $(this),
                      verticalPadding = 0;

                  // don't apply to a target
                  if (opts.target && $that.is(opts.target)) {
                      return;
                  }

                  // handle padding and border correctly (required when not using border-box)
                  if ($that.css('box-sizing') !== 'border-box') {
                      verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                      verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                  }

                  // set the height (accounting for padding and border)
                  $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
              });
          });

          // revert hidden parents
          $hiddenParents.each(function() {
              var $that = $(this);
              $that.attr('style', $that.data('style-cache') || null);
          });

          // restore scroll position if enabled
          if (matchHeight._maintainScroll) {
              $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
          }

          return this;
      };

      /*
      *  matchHeight._applyDataApi
      *  applies matchHeight to all elements with a data-match-height attribute
      */

      matchHeight._applyDataApi = function() {
          var groups = {};

          // generate groups by their groupId set by elements using data-match-height
          $('[data-match-height], [data-mh]').each(function() {
              var $this = $(this),
                  groupId = $this.attr('data-mh') || $this.attr('data-match-height');

              if (groupId in groups) {
                  groups[groupId] = groups[groupId].add($this);
              } else {
                  groups[groupId] = $this;
              }
          });

          // apply matchHeight to each group
          $.each(groups, function() {
              this.matchHeight(true);
          });
      };

      /*
      *  matchHeight._update
      *  updates matchHeight on all current groups with their correct options
      */

      var _update = function(event) {
          if (matchHeight._beforeUpdate) {
              matchHeight._beforeUpdate(event, matchHeight._groups);
          }

          $.each(matchHeight._groups, function() {
              matchHeight._apply(this.elements, this.options);
          });

          if (matchHeight._afterUpdate) {
              matchHeight._afterUpdate(event, matchHeight._groups);
          }
      };

      matchHeight._update = function(throttle, event) {
          // prevent update if fired from a resize event
          // where the viewport width hasn't actually changed
          // fixes an event looping bug in IE8
          if (event && event.type === 'resize') {
              var windowWidth = $(window).width();
              if (windowWidth === _previousResizeWidth) {
                  return;
              }
              _previousResizeWidth = windowWidth;
          }

          // throttle updates
          if (!throttle) {
              _update(event);
          } else if (_updateTimeout === -1) {
              _updateTimeout = setTimeout(function() {
                  _update(event);
                  _updateTimeout = -1;
              }, matchHeight._throttle);
          }
      };

      /*
      *  bind events
      */

      // apply on DOM ready event
      $(matchHeight._applyDataApi);

      // use on or bind where supported
      var on = $.fn.on ? 'on' : 'bind';

      // update heights on load and resize events
      $(window)[on]('load', function(event) {
          matchHeight._update(false, event);
      });

      // throttled update heights on resize events
      $(window)[on]('resize orientationchange', function(event) {
          matchHeight._update(true, event);
      });

  });
  }(jquery_matchHeight));

  /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "matchHeight" }]*/

  var membershipBenefits = () => {

    const $benefitDescription = $('.js-benefit-description');

    if ($benefitDescription.length) {
      $benefitDescription.matchHeight();
    }

  };

  var slick = {exports: {}};

  /*
       _ _      _       _
   ___| (_) ___| | __  (_)___
  / __| | |/ __| |/ /  | / __|
  \__ \ | | (__|   < _ | \__ \
  |___/_|_|\___|_|\_(_)/ |___/
                     |__/

   Version: 1.8.1
    Author: Ken Wheeler
   Website: http://kenwheeler.github.io
      Docs: http://kenwheeler.github.io/slick
      Repo: http://github.com/kenwheeler/slick
    Issues: http://github.com/kenwheeler/slick/issues

   */

  (function (module, exports) {
  (function(factory) {
      {
          module.exports = factory(require$$0__default['default']);
      }

  }(function($) {
      var Slick = window.Slick || {};

      Slick = (function() {

          var instanceUid = 0;

          function Slick(element, settings) {

              var _ = this, dataSettings;

              _.defaults = {
                  accessibility: true,
                  adaptiveHeight: false,
                  appendArrows: $(element),
                  appendDots: $(element),
                  arrows: true,
                  asNavFor: null,
                  prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                  nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                  autoplay: false,
                  autoplaySpeed: 3000,
                  centerMode: false,
                  centerPadding: '50px',
                  cssEase: 'ease',
                  customPaging: function(slider, i) {
                      return $('<button type="button" />').text(i + 1);
                  },
                  dots: false,
                  dotsClass: 'slick-dots',
                  draggable: true,
                  easing: 'linear',
                  edgeFriction: 0.35,
                  fade: false,
                  focusOnSelect: false,
                  focusOnChange: false,
                  infinite: true,
                  initialSlide: 0,
                  lazyLoad: 'ondemand',
                  mobileFirst: false,
                  pauseOnHover: true,
                  pauseOnFocus: true,
                  pauseOnDotsHover: false,
                  respondTo: 'window',
                  responsive: null,
                  rows: 1,
                  rtl: false,
                  slide: '',
                  slidesPerRow: 1,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  speed: 500,
                  swipe: true,
                  swipeToSlide: false,
                  touchMove: true,
                  touchThreshold: 5,
                  useCSS: true,
                  useTransform: true,
                  variableWidth: false,
                  vertical: false,
                  verticalSwiping: false,
                  waitForAnimate: true,
                  zIndex: 1000
              };

              _.initials = {
                  animating: false,
                  dragging: false,
                  autoPlayTimer: null,
                  currentDirection: 0,
                  currentLeft: null,
                  currentSlide: 0,
                  direction: 1,
                  $dots: null,
                  listWidth: null,
                  listHeight: null,
                  loadIndex: 0,
                  $nextArrow: null,
                  $prevArrow: null,
                  scrolling: false,
                  slideCount: null,
                  slideWidth: null,
                  $slideTrack: null,
                  $slides: null,
                  sliding: false,
                  slideOffset: 0,
                  swipeLeft: null,
                  swiping: false,
                  $list: null,
                  touchObject: {},
                  transformsEnabled: false,
                  unslicked: false
              };

              $.extend(_, _.initials);

              _.activeBreakpoint = null;
              _.animType = null;
              _.animProp = null;
              _.breakpoints = [];
              _.breakpointSettings = [];
              _.cssTransitions = false;
              _.focussed = false;
              _.interrupted = false;
              _.hidden = 'hidden';
              _.paused = true;
              _.positionProp = null;
              _.respondTo = null;
              _.rowCount = 1;
              _.shouldClick = true;
              _.$slider = $(element);
              _.$slidesCache = null;
              _.transformType = null;
              _.transitionType = null;
              _.visibilityChange = 'visibilitychange';
              _.windowWidth = 0;
              _.windowTimer = null;

              dataSettings = $(element).data('slick') || {};

              _.options = $.extend({}, _.defaults, settings, dataSettings);

              _.currentSlide = _.options.initialSlide;

              _.originalSettings = _.options;

              if (typeof document.mozHidden !== 'undefined') {
                  _.hidden = 'mozHidden';
                  _.visibilityChange = 'mozvisibilitychange';
              } else if (typeof document.webkitHidden !== 'undefined') {
                  _.hidden = 'webkitHidden';
                  _.visibilityChange = 'webkitvisibilitychange';
              }

              _.autoPlay = $.proxy(_.autoPlay, _);
              _.autoPlayClear = $.proxy(_.autoPlayClear, _);
              _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
              _.changeSlide = $.proxy(_.changeSlide, _);
              _.clickHandler = $.proxy(_.clickHandler, _);
              _.selectHandler = $.proxy(_.selectHandler, _);
              _.setPosition = $.proxy(_.setPosition, _);
              _.swipeHandler = $.proxy(_.swipeHandler, _);
              _.dragHandler = $.proxy(_.dragHandler, _);
              _.keyHandler = $.proxy(_.keyHandler, _);

              _.instanceUid = instanceUid++;

              // A simple way to check for HTML strings
              // Strict HTML recognition (must start with <)
              // Extracted from jQuery v1.11 source
              _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


              _.registerBreakpoints();
              _.init(true);

          }

          return Slick;

      }());

      Slick.prototype.activateADA = function() {
          var _ = this;

          _.$slideTrack.find('.slick-active').attr({
              'aria-hidden': 'false'
          }).find('a, input, button, select').attr({
              'tabindex': '0'
          });

      };

      Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

          var _ = this;

          if (typeof(index) === 'boolean') {
              addBefore = index;
              index = null;
          } else if (index < 0 || (index >= _.slideCount)) {
              return false;
          }

          _.unload();

          if (typeof(index) === 'number') {
              if (index === 0 && _.$slides.length === 0) {
                  $(markup).appendTo(_.$slideTrack);
              } else if (addBefore) {
                  $(markup).insertBefore(_.$slides.eq(index));
              } else {
                  $(markup).insertAfter(_.$slides.eq(index));
              }
          } else {
              if (addBefore === true) {
                  $(markup).prependTo(_.$slideTrack);
              } else {
                  $(markup).appendTo(_.$slideTrack);
              }
          }

          _.$slides = _.$slideTrack.children(this.options.slide);

          _.$slideTrack.children(this.options.slide).detach();

          _.$slideTrack.append(_.$slides);

          _.$slides.each(function(index, element) {
              $(element).attr('data-slick-index', index);
          });

          _.$slidesCache = _.$slides;

          _.reinit();

      };

      Slick.prototype.animateHeight = function() {
          var _ = this;
          if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
              var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
              _.$list.animate({
                  height: targetHeight
              }, _.options.speed);
          }
      };

      Slick.prototype.animateSlide = function(targetLeft, callback) {

          var animProps = {},
              _ = this;

          _.animateHeight();

          if (_.options.rtl === true && _.options.vertical === false) {
              targetLeft = -targetLeft;
          }
          if (_.transformsEnabled === false) {
              if (_.options.vertical === false) {
                  _.$slideTrack.animate({
                      left: targetLeft
                  }, _.options.speed, _.options.easing, callback);
              } else {
                  _.$slideTrack.animate({
                      top: targetLeft
                  }, _.options.speed, _.options.easing, callback);
              }

          } else {

              if (_.cssTransitions === false) {
                  if (_.options.rtl === true) {
                      _.currentLeft = -(_.currentLeft);
                  }
                  $({
                      animStart: _.currentLeft
                  }).animate({
                      animStart: targetLeft
                  }, {
                      duration: _.options.speed,
                      easing: _.options.easing,
                      step: function(now) {
                          now = Math.ceil(now);
                          if (_.options.vertical === false) {
                              animProps[_.animType] = 'translate(' +
                                  now + 'px, 0px)';
                              _.$slideTrack.css(animProps);
                          } else {
                              animProps[_.animType] = 'translate(0px,' +
                                  now + 'px)';
                              _.$slideTrack.css(animProps);
                          }
                      },
                      complete: function() {
                          if (callback) {
                              callback.call();
                          }
                      }
                  });

              } else {

                  _.applyTransition();
                  targetLeft = Math.ceil(targetLeft);

                  if (_.options.vertical === false) {
                      animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                  } else {
                      animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                  }
                  _.$slideTrack.css(animProps);

                  if (callback) {
                      setTimeout(function() {

                          _.disableTransition();

                          callback.call();
                      }, _.options.speed);
                  }

              }

          }

      };

      Slick.prototype.getNavTarget = function() {

          var _ = this,
              asNavFor = _.options.asNavFor;

          if ( asNavFor && asNavFor !== null ) {
              asNavFor = $(asNavFor).not(_.$slider);
          }

          return asNavFor;

      };

      Slick.prototype.asNavFor = function(index) {

          var _ = this,
              asNavFor = _.getNavTarget();

          if ( asNavFor !== null && typeof asNavFor === 'object' ) {
              asNavFor.each(function() {
                  var target = $(this).slick('getSlick');
                  if(!target.unslicked) {
                      target.slideHandler(index, true);
                  }
              });
          }

      };

      Slick.prototype.applyTransition = function(slide) {

          var _ = this,
              transition = {};

          if (_.options.fade === false) {
              transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
          } else {
              transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
          }

          if (_.options.fade === false) {
              _.$slideTrack.css(transition);
          } else {
              _.$slides.eq(slide).css(transition);
          }

      };

      Slick.prototype.autoPlay = function() {

          var _ = this;

          _.autoPlayClear();

          if ( _.slideCount > _.options.slidesToShow ) {
              _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
          }

      };

      Slick.prototype.autoPlayClear = function() {

          var _ = this;

          if (_.autoPlayTimer) {
              clearInterval(_.autoPlayTimer);
          }

      };

      Slick.prototype.autoPlayIterator = function() {

          var _ = this,
              slideTo = _.currentSlide + _.options.slidesToScroll;

          if ( !_.paused && !_.interrupted && !_.focussed ) {

              if ( _.options.infinite === false ) {

                  if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                      _.direction = 0;
                  }

                  else if ( _.direction === 0 ) {

                      slideTo = _.currentSlide - _.options.slidesToScroll;

                      if ( _.currentSlide - 1 === 0 ) {
                          _.direction = 1;
                      }

                  }

              }

              _.slideHandler( slideTo );

          }

      };

      Slick.prototype.buildArrows = function() {

          var _ = this;

          if (_.options.arrows === true ) {

              _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
              _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

              if( _.slideCount > _.options.slidesToShow ) {

                  _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                  _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                  if (_.htmlExpr.test(_.options.prevArrow)) {
                      _.$prevArrow.prependTo(_.options.appendArrows);
                  }

                  if (_.htmlExpr.test(_.options.nextArrow)) {
                      _.$nextArrow.appendTo(_.options.appendArrows);
                  }

                  if (_.options.infinite !== true) {
                      _.$prevArrow
                          .addClass('slick-disabled')
                          .attr('aria-disabled', 'true');
                  }

              } else {

                  _.$prevArrow.add( _.$nextArrow )

                      .addClass('slick-hidden')
                      .attr({
                          'aria-disabled': 'true',
                          'tabindex': '-1'
                      });

              }

          }

      };

      Slick.prototype.buildDots = function() {

          var _ = this,
              i, dot;

          if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

              _.$slider.addClass('slick-dotted');

              dot = $('<ul />').addClass(_.options.dotsClass);

              for (i = 0; i <= _.getDotCount(); i += 1) {
                  dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
              }

              _.$dots = dot.appendTo(_.options.appendDots);

              _.$dots.find('li').first().addClass('slick-active');

          }

      };

      Slick.prototype.buildOut = function() {

          var _ = this;

          _.$slides =
              _.$slider
                  .children( _.options.slide + ':not(.slick-cloned)')
                  .addClass('slick-slide');

          _.slideCount = _.$slides.length;

          _.$slides.each(function(index, element) {
              $(element)
                  .attr('data-slick-index', index)
                  .data('originalStyling', $(element).attr('style') || '');
          });

          _.$slider.addClass('slick-slider');

          _.$slideTrack = (_.slideCount === 0) ?
              $('<div class="slick-track"/>').appendTo(_.$slider) :
              _.$slides.wrapAll('<div class="slick-track"/>').parent();

          _.$list = _.$slideTrack.wrap(
              '<div class="slick-list"/>').parent();
          _.$slideTrack.css('opacity', 0);

          if (_.options.centerMode === true || _.options.swipeToSlide === true) {
              _.options.slidesToScroll = 1;
          }

          $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

          _.setupInfinite();

          _.buildArrows();

          _.buildDots();

          _.updateDots();


          _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

          if (_.options.draggable === true) {
              _.$list.addClass('draggable');
          }

      };

      Slick.prototype.buildRows = function() {

          var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

          newSlides = document.createDocumentFragment();
          originalSlides = _.$slider.children();

          if(_.options.rows > 0) {

              slidesPerSection = _.options.slidesPerRow * _.options.rows;
              numOfSlides = Math.ceil(
                  originalSlides.length / slidesPerSection
              );

              for(a = 0; a < numOfSlides; a++){
                  var slide = document.createElement('div');
                  for(b = 0; b < _.options.rows; b++) {
                      var row = document.createElement('div');
                      for(c = 0; c < _.options.slidesPerRow; c++) {
                          var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                          if (originalSlides.get(target)) {
                              row.appendChild(originalSlides.get(target));
                          }
                      }
                      slide.appendChild(row);
                  }
                  newSlides.appendChild(slide);
              }

              _.$slider.empty().append(newSlides);
              _.$slider.children().children().children()
                  .css({
                      'width':(100 / _.options.slidesPerRow) + '%',
                      'display': 'inline-block'
                  });

          }

      };

      Slick.prototype.checkResponsive = function(initial, forceUpdate) {

          var _ = this,
              breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
          var sliderWidth = _.$slider.width();
          var windowWidth = window.innerWidth || $(window).width();

          if (_.respondTo === 'window') {
              respondToWidth = windowWidth;
          } else if (_.respondTo === 'slider') {
              respondToWidth = sliderWidth;
          } else if (_.respondTo === 'min') {
              respondToWidth = Math.min(windowWidth, sliderWidth);
          }

          if ( _.options.responsive &&
              _.options.responsive.length &&
              _.options.responsive !== null) {

              targetBreakpoint = null;

              for (breakpoint in _.breakpoints) {
                  if (_.breakpoints.hasOwnProperty(breakpoint)) {
                      if (_.originalSettings.mobileFirst === false) {
                          if (respondToWidth < _.breakpoints[breakpoint]) {
                              targetBreakpoint = _.breakpoints[breakpoint];
                          }
                      } else {
                          if (respondToWidth > _.breakpoints[breakpoint]) {
                              targetBreakpoint = _.breakpoints[breakpoint];
                          }
                      }
                  }
              }

              if (targetBreakpoint !== null) {
                  if (_.activeBreakpoint !== null) {
                      if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                          _.activeBreakpoint =
                              targetBreakpoint;
                          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                              _.unslick(targetBreakpoint);
                          } else {
                              _.options = $.extend({}, _.originalSettings,
                                  _.breakpointSettings[
                                      targetBreakpoint]);
                              if (initial === true) {
                                  _.currentSlide = _.options.initialSlide;
                              }
                              _.refresh(initial);
                          }
                          triggerBreakpoint = targetBreakpoint;
                      }
                  } else {
                      _.activeBreakpoint = targetBreakpoint;
                      if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                          _.unslick(targetBreakpoint);
                      } else {
                          _.options = $.extend({}, _.originalSettings,
                              _.breakpointSettings[
                                  targetBreakpoint]);
                          if (initial === true) {
                              _.currentSlide = _.options.initialSlide;
                          }
                          _.refresh(initial);
                      }
                      triggerBreakpoint = targetBreakpoint;
                  }
              } else {
                  if (_.activeBreakpoint !== null) {
                      _.activeBreakpoint = null;
                      _.options = _.originalSettings;
                      if (initial === true) {
                          _.currentSlide = _.options.initialSlide;
                      }
                      _.refresh(initial);
                      triggerBreakpoint = targetBreakpoint;
                  }
              }

              // only trigger breakpoints during an actual break. not on initialize.
              if( !initial && triggerBreakpoint !== false ) {
                  _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
              }
          }

      };

      Slick.prototype.changeSlide = function(event, dontAnimate) {

          var _ = this,
              $target = $(event.currentTarget),
              indexOffset, slideOffset, unevenOffset;

          // If target is a link, prevent default action.
          if($target.is('a')) {
              event.preventDefault();
          }

          // If target is not the <li> element (ie: a child), find the <li>.
          if(!$target.is('li')) {
              $target = $target.closest('li');
          }

          unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
          indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

          switch (event.data.message) {

              case 'previous':
                  slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                  if (_.slideCount > _.options.slidesToShow) {
                      _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                  }
                  break;

              case 'next':
                  slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                  if (_.slideCount > _.options.slidesToShow) {
                      _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                  }
                  break;

              case 'index':
                  var index = event.data.index === 0 ? 0 :
                      event.data.index || $target.index() * _.options.slidesToScroll;

                  _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                  $target.children().trigger('focus');
                  break;

              default:
                  return;
          }

      };

      Slick.prototype.checkNavigable = function(index) {

          var _ = this,
              navigables, prevNavigable;

          navigables = _.getNavigableIndexes();
          prevNavigable = 0;
          if (index > navigables[navigables.length - 1]) {
              index = navigables[navigables.length - 1];
          } else {
              for (var n in navigables) {
                  if (index < navigables[n]) {
                      index = prevNavigable;
                      break;
                  }
                  prevNavigable = navigables[n];
              }
          }

          return index;
      };

      Slick.prototype.cleanUpEvents = function() {

          var _ = this;

          if (_.options.dots && _.$dots !== null) {

              $('li', _.$dots)
                  .off('click.slick', _.changeSlide)
                  .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                  .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

              if (_.options.accessibility === true) {
                  _.$dots.off('keydown.slick', _.keyHandler);
              }
          }

          _.$slider.off('focus.slick blur.slick');

          if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
              _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
              _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

              if (_.options.accessibility === true) {
                  _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                  _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
              }
          }

          _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
          _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
          _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
          _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

          _.$list.off('click.slick', _.clickHandler);

          $(document).off(_.visibilityChange, _.visibility);

          _.cleanUpSlideEvents();

          if (_.options.accessibility === true) {
              _.$list.off('keydown.slick', _.keyHandler);
          }

          if (_.options.focusOnSelect === true) {
              $(_.$slideTrack).children().off('click.slick', _.selectHandler);
          }

          $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

          $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

          $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

          $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

      };

      Slick.prototype.cleanUpSlideEvents = function() {

          var _ = this;

          _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
          _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

      };

      Slick.prototype.cleanUpRows = function() {

          var _ = this, originalSlides;

          if(_.options.rows > 0) {
              originalSlides = _.$slides.children().children();
              originalSlides.removeAttr('style');
              _.$slider.empty().append(originalSlides);
          }

      };

      Slick.prototype.clickHandler = function(event) {

          var _ = this;

          if (_.shouldClick === false) {
              event.stopImmediatePropagation();
              event.stopPropagation();
              event.preventDefault();
          }

      };

      Slick.prototype.destroy = function(refresh) {

          var _ = this;

          _.autoPlayClear();

          _.touchObject = {};

          _.cleanUpEvents();

          $('.slick-cloned', _.$slider).detach();

          if (_.$dots) {
              _.$dots.remove();
          }

          if ( _.$prevArrow && _.$prevArrow.length ) {

              _.$prevArrow
                  .removeClass('slick-disabled slick-arrow slick-hidden')
                  .removeAttr('aria-hidden aria-disabled tabindex')
                  .css('display','');

              if ( _.htmlExpr.test( _.options.prevArrow )) {
                  _.$prevArrow.remove();
              }
          }

          if ( _.$nextArrow && _.$nextArrow.length ) {

              _.$nextArrow
                  .removeClass('slick-disabled slick-arrow slick-hidden')
                  .removeAttr('aria-hidden aria-disabled tabindex')
                  .css('display','');

              if ( _.htmlExpr.test( _.options.nextArrow )) {
                  _.$nextArrow.remove();
              }
          }


          if (_.$slides) {

              _.$slides
                  .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                  .removeAttr('aria-hidden')
                  .removeAttr('data-slick-index')
                  .each(function(){
                      $(this).attr('style', $(this).data('originalStyling'));
                  });

              _.$slideTrack.children(this.options.slide).detach();

              _.$slideTrack.detach();

              _.$list.detach();

              _.$slider.append(_.$slides);
          }

          _.cleanUpRows();

          _.$slider.removeClass('slick-slider');
          _.$slider.removeClass('slick-initialized');
          _.$slider.removeClass('slick-dotted');

          _.unslicked = true;

          if(!refresh) {
              _.$slider.trigger('destroy', [_]);
          }

      };

      Slick.prototype.disableTransition = function(slide) {

          var _ = this,
              transition = {};

          transition[_.transitionType] = '';

          if (_.options.fade === false) {
              _.$slideTrack.css(transition);
          } else {
              _.$slides.eq(slide).css(transition);
          }

      };

      Slick.prototype.fadeSlide = function(slideIndex, callback) {

          var _ = this;

          if (_.cssTransitions === false) {

              _.$slides.eq(slideIndex).css({
                  zIndex: _.options.zIndex
              });

              _.$slides.eq(slideIndex).animate({
                  opacity: 1
              }, _.options.speed, _.options.easing, callback);

          } else {

              _.applyTransition(slideIndex);

              _.$slides.eq(slideIndex).css({
                  opacity: 1,
                  zIndex: _.options.zIndex
              });

              if (callback) {
                  setTimeout(function() {

                      _.disableTransition(slideIndex);

                      callback.call();
                  }, _.options.speed);
              }

          }

      };

      Slick.prototype.fadeSlideOut = function(slideIndex) {

          var _ = this;

          if (_.cssTransitions === false) {

              _.$slides.eq(slideIndex).animate({
                  opacity: 0,
                  zIndex: _.options.zIndex - 2
              }, _.options.speed, _.options.easing);

          } else {

              _.applyTransition(slideIndex);

              _.$slides.eq(slideIndex).css({
                  opacity: 0,
                  zIndex: _.options.zIndex - 2
              });

          }

      };

      Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

          var _ = this;

          if (filter !== null) {

              _.$slidesCache = _.$slides;

              _.unload();

              _.$slideTrack.children(this.options.slide).detach();

              _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

              _.reinit();

          }

      };

      Slick.prototype.focusHandler = function() {

          var _ = this;

          _.$slider
              .off('focus.slick blur.slick')
              .on('focus.slick blur.slick', '*', function(event) {

              event.stopImmediatePropagation();
              var $sf = $(this);

              setTimeout(function() {

                  if( _.options.pauseOnFocus ) {
                      _.focussed = $sf.is(':focus');
                      _.autoPlay();
                  }

              }, 0);

          });
      };

      Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

          var _ = this;
          return _.currentSlide;

      };

      Slick.prototype.getDotCount = function() {

          var _ = this;

          var breakPoint = 0;
          var counter = 0;
          var pagerQty = 0;

          if (_.options.infinite === true) {
              if (_.slideCount <= _.options.slidesToShow) {
                   ++pagerQty;
              } else {
                  while (breakPoint < _.slideCount) {
                      ++pagerQty;
                      breakPoint = counter + _.options.slidesToScroll;
                      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                  }
              }
          } else if (_.options.centerMode === true) {
              pagerQty = _.slideCount;
          } else if(!_.options.asNavFor) {
              pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
          }else {
              while (breakPoint < _.slideCount) {
                  ++pagerQty;
                  breakPoint = counter + _.options.slidesToScroll;
                  counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
              }
          }

          return pagerQty - 1;

      };

      Slick.prototype.getLeft = function(slideIndex) {

          var _ = this,
              targetLeft,
              verticalHeight,
              verticalOffset = 0,
              targetSlide,
              coef;

          _.slideOffset = 0;
          verticalHeight = _.$slides.first().outerHeight(true);

          if (_.options.infinite === true) {
              if (_.slideCount > _.options.slidesToShow) {
                  _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                  coef = -1;

                  if (_.options.vertical === true && _.options.centerMode === true) {
                      if (_.options.slidesToShow === 2) {
                          coef = -1.5;
                      } else if (_.options.slidesToShow === 1) {
                          coef = -2;
                      }
                  }
                  verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
              }
              if (_.slideCount % _.options.slidesToScroll !== 0) {
                  if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                      if (slideIndex > _.slideCount) {
                          _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                          verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                      } else {
                          _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                          verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                      }
                  }
              }
          } else {
              if (slideIndex + _.options.slidesToShow > _.slideCount) {
                  _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                  verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
              }
          }

          if (_.slideCount <= _.options.slidesToShow) {
              _.slideOffset = 0;
              verticalOffset = 0;
          }

          if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
              _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
          } else if (_.options.centerMode === true && _.options.infinite === true) {
              _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
          } else if (_.options.centerMode === true) {
              _.slideOffset = 0;
              _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
          }

          if (_.options.vertical === false) {
              targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
          } else {
              targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
          }

          if (_.options.variableWidth === true) {

              if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                  targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
              } else {
                  targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
              }

              if (_.options.rtl === true) {
                  if (targetSlide[0]) {
                      targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                  } else {
                      targetLeft =  0;
                  }
              } else {
                  targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
              }

              if (_.options.centerMode === true) {
                  if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                      targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                  } else {
                      targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                  }

                  if (_.options.rtl === true) {
                      if (targetSlide[0]) {
                          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                      } else {
                          targetLeft =  0;
                      }
                  } else {
                      targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                  }

                  targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
              }
          }

          return targetLeft;

      };

      Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

          var _ = this;

          return _.options[option];

      };

      Slick.prototype.getNavigableIndexes = function() {

          var _ = this,
              breakPoint = 0,
              counter = 0,
              indexes = [],
              max;

          if (_.options.infinite === false) {
              max = _.slideCount;
          } else {
              breakPoint = _.options.slidesToScroll * -1;
              counter = _.options.slidesToScroll * -1;
              max = _.slideCount * 2;
          }

          while (breakPoint < max) {
              indexes.push(breakPoint);
              breakPoint = counter + _.options.slidesToScroll;
              counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
          }

          return indexes;

      };

      Slick.prototype.getSlick = function() {

          return this;

      };

      Slick.prototype.getSlideCount = function() {

          var _ = this,
              slidesTraversed, swipedSlide, centerOffset;

          centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

          if (_.options.swipeToSlide === true) {
              _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                  if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                      swipedSlide = slide;
                      return false;
                  }
              });

              slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

              return slidesTraversed;

          } else {
              return _.options.slidesToScroll;
          }

      };

      Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

          var _ = this;

          _.changeSlide({
              data: {
                  message: 'index',
                  index: parseInt(slide)
              }
          }, dontAnimate);

      };

      Slick.prototype.init = function(creation) {

          var _ = this;

          if (!$(_.$slider).hasClass('slick-initialized')) {

              $(_.$slider).addClass('slick-initialized');

              _.buildRows();
              _.buildOut();
              _.setProps();
              _.startLoad();
              _.loadSlider();
              _.initializeEvents();
              _.updateArrows();
              _.updateDots();
              _.checkResponsive(true);
              _.focusHandler();

          }

          if (creation) {
              _.$slider.trigger('init', [_]);
          }

          if (_.options.accessibility === true) {
              _.initADA();
          }

          if ( _.options.autoplay ) {

              _.paused = false;
              _.autoPlay();

          }

      };

      Slick.prototype.initADA = function() {
          var _ = this,
                  numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                  tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                      return (val >= 0) && (val < _.slideCount);
                  });

          _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
              'aria-hidden': 'true',
              'tabindex': '-1'
          }).find('a, input, button, select').attr({
              'tabindex': '-1'
          });

          if (_.$dots !== null) {
              _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                  var slideControlIndex = tabControlIndexes.indexOf(i);

                  $(this).attr({
                      'role': 'tabpanel',
                      'id': 'slick-slide' + _.instanceUid + i,
                      'tabindex': -1
                  });

                  if (slideControlIndex !== -1) {
                     var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;
                     if ($('#' + ariaButtonControl).length) {
                       $(this).attr({
                           'aria-describedby': ariaButtonControl
                       });
                     }
                  }
              });

              _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                  var mappedSlideIndex = tabControlIndexes[i];

                  $(this).attr({
                      'role': 'presentation'
                  });

                  $(this).find('button').first().attr({
                      'role': 'tab',
                      'id': 'slick-slide-control' + _.instanceUid + i,
                      'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                      'aria-label': (i + 1) + ' of ' + numDotGroups,
                      'aria-selected': null,
                      'tabindex': '-1'
                  });

              }).eq(_.currentSlide).find('button').attr({
                  'aria-selected': 'true',
                  'tabindex': '0'
              }).end();
          }

          for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
            if (_.options.focusOnChange) {
              _.$slides.eq(i).attr({'tabindex': '0'});
            } else {
              _.$slides.eq(i).removeAttr('tabindex');
            }
          }

          _.activateADA();

      };

      Slick.prototype.initArrowEvents = function() {

          var _ = this;

          if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
              _.$prevArrow
                 .off('click.slick')
                 .on('click.slick', {
                      message: 'previous'
                 }, _.changeSlide);
              _.$nextArrow
                 .off('click.slick')
                 .on('click.slick', {
                      message: 'next'
                 }, _.changeSlide);

              if (_.options.accessibility === true) {
                  _.$prevArrow.on('keydown.slick', _.keyHandler);
                  _.$nextArrow.on('keydown.slick', _.keyHandler);
              }
          }

      };

      Slick.prototype.initDotEvents = function() {

          var _ = this;

          if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
              $('li', _.$dots).on('click.slick', {
                  message: 'index'
              }, _.changeSlide);

              if (_.options.accessibility === true) {
                  _.$dots.on('keydown.slick', _.keyHandler);
              }
          }

          if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

              $('li', _.$dots)
                  .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                  .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

          }

      };

      Slick.prototype.initSlideEvents = function() {

          var _ = this;

          if ( _.options.pauseOnHover ) {

              _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
              _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

          }

      };

      Slick.prototype.initializeEvents = function() {

          var _ = this;

          _.initArrowEvents();

          _.initDotEvents();
          _.initSlideEvents();

          _.$list.on('touchstart.slick mousedown.slick', {
              action: 'start'
          }, _.swipeHandler);
          _.$list.on('touchmove.slick mousemove.slick', {
              action: 'move'
          }, _.swipeHandler);
          _.$list.on('touchend.slick mouseup.slick', {
              action: 'end'
          }, _.swipeHandler);
          _.$list.on('touchcancel.slick mouseleave.slick', {
              action: 'end'
          }, _.swipeHandler);

          _.$list.on('click.slick', _.clickHandler);

          $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

          if (_.options.accessibility === true) {
              _.$list.on('keydown.slick', _.keyHandler);
          }

          if (_.options.focusOnSelect === true) {
              $(_.$slideTrack).children().on('click.slick', _.selectHandler);
          }

          $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

          $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

          $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

          $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
          $(_.setPosition);

      };

      Slick.prototype.initUI = function() {

          var _ = this;

          if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

              _.$prevArrow.show();
              _.$nextArrow.show();

          }

          if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

              _.$dots.show();

          }

      };

      Slick.prototype.keyHandler = function(event) {

          var _ = this;
           //Dont slide if the cursor is inside the form fields and arrow keys are pressed
          if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
              if (event.keyCode === 37 && _.options.accessibility === true) {
                  _.changeSlide({
                      data: {
                          message: _.options.rtl === true ? 'next' :  'previous'
                      }
                  });
              } else if (event.keyCode === 39 && _.options.accessibility === true) {
                  _.changeSlide({
                      data: {
                          message: _.options.rtl === true ? 'previous' : 'next'
                      }
                  });
              }
          }

      };

      Slick.prototype.lazyLoad = function() {

          var _ = this,
              loadRange, cloneRange, rangeStart, rangeEnd;

          function loadImages(imagesScope) {

              $('img[data-lazy]', imagesScope).each(function() {

                  var image = $(this),
                      imageSource = $(this).attr('data-lazy'),
                      imageSrcSet = $(this).attr('data-srcset'),
                      imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                      imageToLoad = document.createElement('img');

                  imageToLoad.onload = function() {

                      image
                          .animate({ opacity: 0 }, 100, function() {

                              if (imageSrcSet) {
                                  image
                                      .attr('srcset', imageSrcSet );

                                  if (imageSizes) {
                                      image
                                          .attr('sizes', imageSizes );
                                  }
                              }

                              image
                                  .attr('src', imageSource)
                                  .animate({ opacity: 1 }, 200, function() {
                                      image
                                          .removeAttr('data-lazy data-srcset data-sizes')
                                          .removeClass('slick-loading');
                                  });
                              _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                          });

                  };

                  imageToLoad.onerror = function() {

                      image
                          .removeAttr( 'data-lazy' )
                          .removeClass( 'slick-loading' )
                          .addClass( 'slick-lazyload-error' );

                      _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                  };

                  imageToLoad.src = imageSource;

              });

          }

          if (_.options.centerMode === true) {
              if (_.options.infinite === true) {
                  rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                  rangeEnd = rangeStart + _.options.slidesToShow + 2;
              } else {
                  rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                  rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
              }
          } else {
              rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
              rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
              if (_.options.fade === true) {
                  if (rangeStart > 0) rangeStart--;
                  if (rangeEnd <= _.slideCount) rangeEnd++;
              }
          }

          loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

          if (_.options.lazyLoad === 'anticipated') {
              var prevSlide = rangeStart - 1,
                  nextSlide = rangeEnd,
                  $slides = _.$slider.find('.slick-slide');

              for (var i = 0; i < _.options.slidesToScroll; i++) {
                  if (prevSlide < 0) prevSlide = _.slideCount - 1;
                  loadRange = loadRange.add($slides.eq(prevSlide));
                  loadRange = loadRange.add($slides.eq(nextSlide));
                  prevSlide--;
                  nextSlide++;
              }
          }

          loadImages(loadRange);

          if (_.slideCount <= _.options.slidesToShow) {
              cloneRange = _.$slider.find('.slick-slide');
              loadImages(cloneRange);
          } else
          if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
              cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
              loadImages(cloneRange);
          } else if (_.currentSlide === 0) {
              cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
              loadImages(cloneRange);
          }

      };

      Slick.prototype.loadSlider = function() {

          var _ = this;

          _.setPosition();

          _.$slideTrack.css({
              opacity: 1
          });

          _.$slider.removeClass('slick-loading');

          _.initUI();

          if (_.options.lazyLoad === 'progressive') {
              _.progressiveLazyLoad();
          }

      };

      Slick.prototype.next = Slick.prototype.slickNext = function() {

          var _ = this;

          _.changeSlide({
              data: {
                  message: 'next'
              }
          });

      };

      Slick.prototype.orientationChange = function() {

          var _ = this;

          _.checkResponsive();
          _.setPosition();

      };

      Slick.prototype.pause = Slick.prototype.slickPause = function() {

          var _ = this;

          _.autoPlayClear();
          _.paused = true;

      };

      Slick.prototype.play = Slick.prototype.slickPlay = function() {

          var _ = this;

          _.autoPlay();
          _.options.autoplay = true;
          _.paused = false;
          _.focussed = false;
          _.interrupted = false;

      };

      Slick.prototype.postSlide = function(index) {

          var _ = this;

          if( !_.unslicked ) {

              _.$slider.trigger('afterChange', [_, index]);

              _.animating = false;

              if (_.slideCount > _.options.slidesToShow) {
                  _.setPosition();
              }

              _.swipeLeft = null;

              if ( _.options.autoplay ) {
                  _.autoPlay();
              }

              if (_.options.accessibility === true) {
                  _.initADA();

                  if (_.options.focusOnChange) {
                      var $currentSlide = $(_.$slides.get(_.currentSlide));
                      $currentSlide.attr('tabindex', 0).focus();
                  }
              }

          }

      };

      Slick.prototype.prev = Slick.prototype.slickPrev = function() {

          var _ = this;

          _.changeSlide({
              data: {
                  message: 'previous'
              }
          });

      };

      Slick.prototype.preventDefault = function(event) {

          event.preventDefault();

      };

      Slick.prototype.progressiveLazyLoad = function( tryCount ) {

          tryCount = tryCount || 1;

          var _ = this,
              $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
              image,
              imageSource,
              imageSrcSet,
              imageSizes,
              imageToLoad;

          if ( $imgsToLoad.length ) {

              image = $imgsToLoad.first();
              imageSource = image.attr('data-lazy');
              imageSrcSet = image.attr('data-srcset');
              imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
              imageToLoad = document.createElement('img');

              imageToLoad.onload = function() {

                  if (imageSrcSet) {
                      image
                          .attr('srcset', imageSrcSet );

                      if (imageSizes) {
                          image
                              .attr('sizes', imageSizes );
                      }
                  }

                  image
                      .attr( 'src', imageSource )
                      .removeAttr('data-lazy data-srcset data-sizes')
                      .removeClass('slick-loading');

                  if ( _.options.adaptiveHeight === true ) {
                      _.setPosition();
                  }

                  _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                  _.progressiveLazyLoad();

              };

              imageToLoad.onerror = function() {

                  if ( tryCount < 3 ) {

                      /**
                       * try to load the image 3 times,
                       * leave a slight delay so we don't get
                       * servers blocking the request.
                       */
                      setTimeout( function() {
                          _.progressiveLazyLoad( tryCount + 1 );
                      }, 500 );

                  } else {

                      image
                          .removeAttr( 'data-lazy' )
                          .removeClass( 'slick-loading' )
                          .addClass( 'slick-lazyload-error' );

                      _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                      _.progressiveLazyLoad();

                  }

              };

              imageToLoad.src = imageSource;

          } else {

              _.$slider.trigger('allImagesLoaded', [ _ ]);

          }

      };

      Slick.prototype.refresh = function( initializing ) {

          var _ = this, currentSlide, lastVisibleIndex;

          lastVisibleIndex = _.slideCount - _.options.slidesToShow;

          // in non-infinite sliders, we don't want to go past the
          // last visible index.
          if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
              _.currentSlide = lastVisibleIndex;
          }

          // if less slides than to show, go to start.
          if ( _.slideCount <= _.options.slidesToShow ) {
              _.currentSlide = 0;

          }

          currentSlide = _.currentSlide;

          _.destroy(true);

          $.extend(_, _.initials, { currentSlide: currentSlide });

          _.init();

          if( !initializing ) {

              _.changeSlide({
                  data: {
                      message: 'index',
                      index: currentSlide
                  }
              }, false);

          }

      };

      Slick.prototype.registerBreakpoints = function() {

          var _ = this, breakpoint, currentBreakpoint, l,
              responsiveSettings = _.options.responsive || null;

          if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

              _.respondTo = _.options.respondTo || 'window';

              for ( breakpoint in responsiveSettings ) {

                  l = _.breakpoints.length-1;

                  if (responsiveSettings.hasOwnProperty(breakpoint)) {
                      currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                      // loop through the breakpoints and cut out any existing
                      // ones with the same breakpoint number, we don't want dupes.
                      while( l >= 0 ) {
                          if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                              _.breakpoints.splice(l,1);
                          }
                          l--;
                      }

                      _.breakpoints.push(currentBreakpoint);
                      _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                  }

              }

              _.breakpoints.sort(function(a, b) {
                  return ( _.options.mobileFirst ) ? a-b : b-a;
              });

          }

      };

      Slick.prototype.reinit = function() {

          var _ = this;

          _.$slides =
              _.$slideTrack
                  .children(_.options.slide)
                  .addClass('slick-slide');

          _.slideCount = _.$slides.length;

          if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
              _.currentSlide = _.currentSlide - _.options.slidesToScroll;
          }

          if (_.slideCount <= _.options.slidesToShow) {
              _.currentSlide = 0;
          }

          _.registerBreakpoints();

          _.setProps();
          _.setupInfinite();
          _.buildArrows();
          _.updateArrows();
          _.initArrowEvents();
          _.buildDots();
          _.updateDots();
          _.initDotEvents();
          _.cleanUpSlideEvents();
          _.initSlideEvents();

          _.checkResponsive(false, true);

          if (_.options.focusOnSelect === true) {
              $(_.$slideTrack).children().on('click.slick', _.selectHandler);
          }

          _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

          _.setPosition();
          _.focusHandler();

          _.paused = !_.options.autoplay;
          _.autoPlay();

          _.$slider.trigger('reInit', [_]);

      };

      Slick.prototype.resize = function() {

          var _ = this;

          if ($(window).width() !== _.windowWidth) {
              clearTimeout(_.windowDelay);
              _.windowDelay = window.setTimeout(function() {
                  _.windowWidth = $(window).width();
                  _.checkResponsive();
                  if( !_.unslicked ) { _.setPosition(); }
              }, 50);
          }
      };

      Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

          var _ = this;

          if (typeof(index) === 'boolean') {
              removeBefore = index;
              index = removeBefore === true ? 0 : _.slideCount - 1;
          } else {
              index = removeBefore === true ? --index : index;
          }

          if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
              return false;
          }

          _.unload();

          if (removeAll === true) {
              _.$slideTrack.children().remove();
          } else {
              _.$slideTrack.children(this.options.slide).eq(index).remove();
          }

          _.$slides = _.$slideTrack.children(this.options.slide);

          _.$slideTrack.children(this.options.slide).detach();

          _.$slideTrack.append(_.$slides);

          _.$slidesCache = _.$slides;

          _.reinit();

      };

      Slick.prototype.setCSS = function(position) {

          var _ = this,
              positionProps = {},
              x, y;

          if (_.options.rtl === true) {
              position = -position;
          }
          x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
          y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

          positionProps[_.positionProp] = position;

          if (_.transformsEnabled === false) {
              _.$slideTrack.css(positionProps);
          } else {
              positionProps = {};
              if (_.cssTransitions === false) {
                  positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                  _.$slideTrack.css(positionProps);
              } else {
                  positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                  _.$slideTrack.css(positionProps);
              }
          }

      };

      Slick.prototype.setDimensions = function() {

          var _ = this;

          if (_.options.vertical === false) {
              if (_.options.centerMode === true) {
                  _.$list.css({
                      padding: ('0px ' + _.options.centerPadding)
                  });
              }
          } else {
              _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
              if (_.options.centerMode === true) {
                  _.$list.css({
                      padding: (_.options.centerPadding + ' 0px')
                  });
              }
          }

          _.listWidth = _.$list.width();
          _.listHeight = _.$list.height();


          if (_.options.vertical === false && _.options.variableWidth === false) {
              _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
              _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

          } else if (_.options.variableWidth === true) {
              _.$slideTrack.width(5000 * _.slideCount);
          } else {
              _.slideWidth = Math.ceil(_.listWidth);
              _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
          }

          var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
          if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

      };

      Slick.prototype.setFade = function() {

          var _ = this,
              targetLeft;

          _.$slides.each(function(index, element) {
              targetLeft = (_.slideWidth * index) * -1;
              if (_.options.rtl === true) {
                  $(element).css({
                      position: 'relative',
                      right: targetLeft,
                      top: 0,
                      zIndex: _.options.zIndex - 2,
                      opacity: 0
                  });
              } else {
                  $(element).css({
                      position: 'relative',
                      left: targetLeft,
                      top: 0,
                      zIndex: _.options.zIndex - 2,
                      opacity: 0
                  });
              }
          });

          _.$slides.eq(_.currentSlide).css({
              zIndex: _.options.zIndex - 1,
              opacity: 1
          });

      };

      Slick.prototype.setHeight = function() {

          var _ = this;

          if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
              var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
              _.$list.css('height', targetHeight);
          }

      };

      Slick.prototype.setOption =
      Slick.prototype.slickSetOption = function() {

          /**
           * accepts arguments in format of:
           *
           *  - for changing a single option's value:
           *     .slick("setOption", option, value, refresh )
           *
           *  - for changing a set of responsive options:
           *     .slick("setOption", 'responsive', [{}, ...], refresh )
           *
           *  - for updating multiple values at once (not responsive)
           *     .slick("setOption", { 'option': value, ... }, refresh )
           */

          var _ = this, l, item, option, value, refresh = false, type;

          if( $.type( arguments[0] ) === 'object' ) {

              option =  arguments[0];
              refresh = arguments[1];
              type = 'multiple';

          } else if ( $.type( arguments[0] ) === 'string' ) {

              option =  arguments[0];
              value = arguments[1];
              refresh = arguments[2];

              if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                  type = 'responsive';

              } else if ( typeof arguments[1] !== 'undefined' ) {

                  type = 'single';

              }

          }

          if ( type === 'single' ) {

              _.options[option] = value;


          } else if ( type === 'multiple' ) {

              $.each( option , function( opt, val ) {

                  _.options[opt] = val;

              });


          } else if ( type === 'responsive' ) {

              for ( item in value ) {

                  if( $.type( _.options.responsive ) !== 'array' ) {

                      _.options.responsive = [ value[item] ];

                  } else {

                      l = _.options.responsive.length-1;

                      // loop through the responsive object and splice out duplicates.
                      while( l >= 0 ) {

                          if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                              _.options.responsive.splice(l,1);

                          }

                          l--;

                      }

                      _.options.responsive.push( value[item] );

                  }

              }

          }

          if ( refresh ) {

              _.unload();
              _.reinit();

          }

      };

      Slick.prototype.setPosition = function() {

          var _ = this;

          _.setDimensions();

          _.setHeight();

          if (_.options.fade === false) {
              _.setCSS(_.getLeft(_.currentSlide));
          } else {
              _.setFade();
          }

          _.$slider.trigger('setPosition', [_]);

      };

      Slick.prototype.setProps = function() {

          var _ = this,
              bodyStyle = document.body.style;

          _.positionProp = _.options.vertical === true ? 'top' : 'left';

          if (_.positionProp === 'top') {
              _.$slider.addClass('slick-vertical');
          } else {
              _.$slider.removeClass('slick-vertical');
          }

          if (bodyStyle.WebkitTransition !== undefined ||
              bodyStyle.MozTransition !== undefined ||
              bodyStyle.msTransition !== undefined) {
              if (_.options.useCSS === true) {
                  _.cssTransitions = true;
              }
          }

          if ( _.options.fade ) {
              if ( typeof _.options.zIndex === 'number' ) {
                  if( _.options.zIndex < 3 ) {
                      _.options.zIndex = 3;
                  }
              } else {
                  _.options.zIndex = _.defaults.zIndex;
              }
          }

          if (bodyStyle.OTransform !== undefined) {
              _.animType = 'OTransform';
              _.transformType = '-o-transform';
              _.transitionType = 'OTransition';
              if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
          }
          if (bodyStyle.MozTransform !== undefined) {
              _.animType = 'MozTransform';
              _.transformType = '-moz-transform';
              _.transitionType = 'MozTransition';
              if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
          }
          if (bodyStyle.webkitTransform !== undefined) {
              _.animType = 'webkitTransform';
              _.transformType = '-webkit-transform';
              _.transitionType = 'webkitTransition';
              if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
          }
          if (bodyStyle.msTransform !== undefined) {
              _.animType = 'msTransform';
              _.transformType = '-ms-transform';
              _.transitionType = 'msTransition';
              if (bodyStyle.msTransform === undefined) _.animType = false;
          }
          if (bodyStyle.transform !== undefined && _.animType !== false) {
              _.animType = 'transform';
              _.transformType = 'transform';
              _.transitionType = 'transition';
          }
          _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
      };


      Slick.prototype.setSlideClasses = function(index) {

          var _ = this,
              centerOffset, allSlides, indexOffset, remainder;

          allSlides = _.$slider
              .find('.slick-slide')
              .removeClass('slick-active slick-center slick-current')
              .attr('aria-hidden', 'true');

          _.$slides
              .eq(index)
              .addClass('slick-current');

          if (_.options.centerMode === true) {

              var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

              centerOffset = Math.floor(_.options.slidesToShow / 2);

              if (_.options.infinite === true) {

                  if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                      _.$slides
                          .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                          .addClass('slick-active')
                          .attr('aria-hidden', 'false');

                  } else {

                      indexOffset = _.options.slidesToShow + index;
                      allSlides
                          .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                          .addClass('slick-active')
                          .attr('aria-hidden', 'false');

                  }

                  if (index === 0) {

                      allSlides
                          .eq(allSlides.length - 1 - _.options.slidesToShow)
                          .addClass('slick-center');

                  } else if (index === _.slideCount - 1) {

                      allSlides
                          .eq(_.options.slidesToShow)
                          .addClass('slick-center');

                  }

              }

              _.$slides
                  .eq(index)
                  .addClass('slick-center');

          } else {

              if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                  _.$slides
                      .slice(index, index + _.options.slidesToShow)
                      .addClass('slick-active')
                      .attr('aria-hidden', 'false');

              } else if (allSlides.length <= _.options.slidesToShow) {

                  allSlides
                      .addClass('slick-active')
                      .attr('aria-hidden', 'false');

              } else {

                  remainder = _.slideCount % _.options.slidesToShow;
                  indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                  if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                      allSlides
                          .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                          .addClass('slick-active')
                          .attr('aria-hidden', 'false');

                  } else {

                      allSlides
                          .slice(indexOffset, indexOffset + _.options.slidesToShow)
                          .addClass('slick-active')
                          .attr('aria-hidden', 'false');

                  }

              }

          }

          if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
              _.lazyLoad();
          }
      };

      Slick.prototype.setupInfinite = function() {

          var _ = this,
              i, slideIndex, infiniteCount;

          if (_.options.fade === true) {
              _.options.centerMode = false;
          }

          if (_.options.infinite === true && _.options.fade === false) {

              slideIndex = null;

              if (_.slideCount > _.options.slidesToShow) {

                  if (_.options.centerMode === true) {
                      infiniteCount = _.options.slidesToShow + 1;
                  } else {
                      infiniteCount = _.options.slidesToShow;
                  }

                  for (i = _.slideCount; i > (_.slideCount -
                          infiniteCount); i -= 1) {
                      slideIndex = i - 1;
                      $(_.$slides[slideIndex]).clone(true).attr('id', '')
                          .attr('data-slick-index', slideIndex - _.slideCount)
                          .prependTo(_.$slideTrack).addClass('slick-cloned');
                  }
                  for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                      slideIndex = i;
                      $(_.$slides[slideIndex]).clone(true).attr('id', '')
                          .attr('data-slick-index', slideIndex + _.slideCount)
                          .appendTo(_.$slideTrack).addClass('slick-cloned');
                  }
                  _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                      $(this).attr('id', '');
                  });

              }

          }

      };

      Slick.prototype.interrupt = function( toggle ) {

          var _ = this;

          if( !toggle ) {
              _.autoPlay();
          }
          _.interrupted = toggle;

      };

      Slick.prototype.selectHandler = function(event) {

          var _ = this;

          var targetElement =
              $(event.target).is('.slick-slide') ?
                  $(event.target) :
                  $(event.target).parents('.slick-slide');

          var index = parseInt(targetElement.attr('data-slick-index'));

          if (!index) index = 0;

          if (_.slideCount <= _.options.slidesToShow) {

              _.slideHandler(index, false, true);
              return;

          }

          _.slideHandler(index);

      };

      Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

          var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
              _ = this, navTarget;

          sync = sync || false;

          if (_.animating === true && _.options.waitForAnimate === true) {
              return;
          }

          if (_.options.fade === true && _.currentSlide === index) {
              return;
          }

          if (sync === false) {
              _.asNavFor(index);
          }

          targetSlide = index;
          targetLeft = _.getLeft(targetSlide);
          slideLeft = _.getLeft(_.currentSlide);

          _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

          if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
              if (_.options.fade === false) {
                  targetSlide = _.currentSlide;
                  if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                      _.animateSlide(slideLeft, function() {
                          _.postSlide(targetSlide);
                      });
                  } else {
                      _.postSlide(targetSlide);
                  }
              }
              return;
          } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
              if (_.options.fade === false) {
                  targetSlide = _.currentSlide;
                  if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                      _.animateSlide(slideLeft, function() {
                          _.postSlide(targetSlide);
                      });
                  } else {
                      _.postSlide(targetSlide);
                  }
              }
              return;
          }

          if ( _.options.autoplay ) {
              clearInterval(_.autoPlayTimer);
          }

          if (targetSlide < 0) {
              if (_.slideCount % _.options.slidesToScroll !== 0) {
                  animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
              } else {
                  animSlide = _.slideCount + targetSlide;
              }
          } else if (targetSlide >= _.slideCount) {
              if (_.slideCount % _.options.slidesToScroll !== 0) {
                  animSlide = 0;
              } else {
                  animSlide = targetSlide - _.slideCount;
              }
          } else {
              animSlide = targetSlide;
          }

          _.animating = true;

          _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

          oldSlide = _.currentSlide;
          _.currentSlide = animSlide;

          _.setSlideClasses(_.currentSlide);

          if ( _.options.asNavFor ) {

              navTarget = _.getNavTarget();
              navTarget = navTarget.slick('getSlick');

              if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                  navTarget.setSlideClasses(_.currentSlide);
              }

          }

          _.updateDots();
          _.updateArrows();

          if (_.options.fade === true) {
              if (dontAnimate !== true) {

                  _.fadeSlideOut(oldSlide);

                  _.fadeSlide(animSlide, function() {
                      _.postSlide(animSlide);
                  });

              } else {
                  _.postSlide(animSlide);
              }
              _.animateHeight();
              return;
          }

          if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
              _.animateSlide(targetLeft, function() {
                  _.postSlide(animSlide);
              });
          } else {
              _.postSlide(animSlide);
          }

      };

      Slick.prototype.startLoad = function() {

          var _ = this;

          if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

              _.$prevArrow.hide();
              _.$nextArrow.hide();

          }

          if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

              _.$dots.hide();

          }

          _.$slider.addClass('slick-loading');

      };

      Slick.prototype.swipeDirection = function() {

          var xDist, yDist, r, swipeAngle, _ = this;

          xDist = _.touchObject.startX - _.touchObject.curX;
          yDist = _.touchObject.startY - _.touchObject.curY;
          r = Math.atan2(yDist, xDist);

          swipeAngle = Math.round(r * 180 / Math.PI);
          if (swipeAngle < 0) {
              swipeAngle = 360 - Math.abs(swipeAngle);
          }

          if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
              return (_.options.rtl === false ? 'left' : 'right');
          }
          if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
              return (_.options.rtl === false ? 'left' : 'right');
          }
          if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
              return (_.options.rtl === false ? 'right' : 'left');
          }
          if (_.options.verticalSwiping === true) {
              if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                  return 'down';
              } else {
                  return 'up';
              }
          }

          return 'vertical';

      };

      Slick.prototype.swipeEnd = function(event) {

          var _ = this,
              slideCount,
              direction;

          _.dragging = false;
          _.swiping = false;

          if (_.scrolling) {
              _.scrolling = false;
              return false;
          }

          _.interrupted = false;
          _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

          if ( _.touchObject.curX === undefined ) {
              return false;
          }

          if ( _.touchObject.edgeHit === true ) {
              _.$slider.trigger('edge', [_, _.swipeDirection() ]);
          }

          if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

              direction = _.swipeDirection();

              switch ( direction ) {

                  case 'left':
                  case 'down':

                      slideCount =
                          _.options.swipeToSlide ?
                              _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                              _.currentSlide + _.getSlideCount();

                      _.currentDirection = 0;

                      break;

                  case 'right':
                  case 'up':

                      slideCount =
                          _.options.swipeToSlide ?
                              _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                              _.currentSlide - _.getSlideCount();

                      _.currentDirection = 1;

                      break;


              }

              if( direction != 'vertical' ) {

                  _.slideHandler( slideCount );
                  _.touchObject = {};
                  _.$slider.trigger('swipe', [_, direction ]);

              }

          } else {

              if ( _.touchObject.startX !== _.touchObject.curX ) {

                  _.slideHandler( _.currentSlide );
                  _.touchObject = {};

              }

          }

      };

      Slick.prototype.swipeHandler = function(event) {

          var _ = this;

          if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
              return;
          } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
              return;
          }

          _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
              event.originalEvent.touches.length : 1;

          _.touchObject.minSwipe = _.listWidth / _.options
              .touchThreshold;

          if (_.options.verticalSwiping === true) {
              _.touchObject.minSwipe = _.listHeight / _.options
                  .touchThreshold;
          }

          switch (event.data.action) {

              case 'start':
                  _.swipeStart(event);
                  break;

              case 'move':
                  _.swipeMove(event);
                  break;

              case 'end':
                  _.swipeEnd(event);
                  break;

          }

      };

      Slick.prototype.swipeMove = function(event) {

          var _ = this,
              curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

          touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

          if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
              return false;
          }

          curLeft = _.getLeft(_.currentSlide);

          _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
          _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

          _.touchObject.swipeLength = Math.round(Math.sqrt(
              Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

          verticalSwipeLength = Math.round(Math.sqrt(
              Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

          if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
              _.scrolling = true;
              return false;
          }

          if (_.options.verticalSwiping === true) {
              _.touchObject.swipeLength = verticalSwipeLength;
          }

          swipeDirection = _.swipeDirection();

          if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
              _.swiping = true;
              event.preventDefault();
          }

          positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
          if (_.options.verticalSwiping === true) {
              positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
          }


          swipeLength = _.touchObject.swipeLength;

          _.touchObject.edgeHit = false;

          if (_.options.infinite === false) {
              if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                  swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                  _.touchObject.edgeHit = true;
              }
          }

          if (_.options.vertical === false) {
              _.swipeLeft = curLeft + swipeLength * positionOffset;
          } else {
              _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
          }
          if (_.options.verticalSwiping === true) {
              _.swipeLeft = curLeft + swipeLength * positionOffset;
          }

          if (_.options.fade === true || _.options.touchMove === false) {
              return false;
          }

          if (_.animating === true) {
              _.swipeLeft = null;
              return false;
          }

          _.setCSS(_.swipeLeft);

      };

      Slick.prototype.swipeStart = function(event) {

          var _ = this,
              touches;

          _.interrupted = true;

          if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
              _.touchObject = {};
              return false;
          }

          if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
              touches = event.originalEvent.touches[0];
          }

          _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
          _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

          _.dragging = true;

      };

      Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

          var _ = this;

          if (_.$slidesCache !== null) {

              _.unload();

              _.$slideTrack.children(this.options.slide).detach();

              _.$slidesCache.appendTo(_.$slideTrack);

              _.reinit();

          }

      };

      Slick.prototype.unload = function() {

          var _ = this;

          $('.slick-cloned', _.$slider).remove();

          if (_.$dots) {
              _.$dots.remove();
          }

          if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
              _.$prevArrow.remove();
          }

          if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
              _.$nextArrow.remove();
          }

          _.$slides
              .removeClass('slick-slide slick-active slick-visible slick-current')
              .attr('aria-hidden', 'true')
              .css('width', '');

      };

      Slick.prototype.unslick = function(fromBreakpoint) {

          var _ = this;
          _.$slider.trigger('unslick', [_, fromBreakpoint]);
          _.destroy();

      };

      Slick.prototype.updateArrows = function() {

          var _ = this;

          Math.floor(_.options.slidesToShow / 2);

          if ( _.options.arrows === true &&
              _.slideCount > _.options.slidesToShow &&
              !_.options.infinite ) {

              _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
              _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

              if (_.currentSlide === 0) {

                  _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                  _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

              } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                  _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                  _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

              } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                  _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                  _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

              }

          }

      };

      Slick.prototype.updateDots = function() {

          var _ = this;

          if (_.$dots !== null) {

              _.$dots
                  .find('li')
                      .removeClass('slick-active')
                      .end();

              _.$dots
                  .find('li')
                  .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                  .addClass('slick-active');

          }

      };

      Slick.prototype.visibility = function() {

          var _ = this;

          if ( _.options.autoplay ) {

              if ( document[_.hidden] ) {

                  _.interrupted = true;

              } else {

                  _.interrupted = false;

              }

          }

      };

      $.fn.slick = function() {
          var _ = this,
              opt = arguments[0],
              args = Array.prototype.slice.call(arguments, 1),
              l = _.length,
              i,
              ret;
          for (i = 0; i < l; i++) {
              if (typeof opt == 'object' || typeof opt == 'undefined')
                  _[i].slick = new Slick(_[i], opt);
              else
                  ret = _[i].slick[opt].apply(_[i].slick, args);
              if (typeof ret != 'undefined') return ret;
          }
          return _;
      };

  }));
  }(slick));

  /* eslint-disable no-unused-vars */

  var testimonialSlider = () => {

    const $testimonialSlider = $('.js-testimonial-slider');
          $('.slick-arrow');
          const $circle = $('.testimonial .circle')
    ;

    if ($testimonialSlider.length) {

      $testimonialSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 750,
        fade: true,
        adaptiveHeight: true,
        dots: true
      });

      const rotateAmount = 360 / $('.slick-slide').length;

      $('body').on('click', '.slick-next', (e) => {
        const rotate = (typeof $circle.data('rotate') !== 'undefined') ? parseInt($circle.attr('data-rotate')) + rotateAmount : rotateAmount;
        $circle
          .css({'transform': 'rotate(' + rotate + 'deg)'})
          .attr('data-rotate', rotate);
      });

      $('body').on('click', '.slick-prev', (e) => {
        const rotate = (typeof $circle.data('rotate') !== 'undefined') ? parseInt($circle.attr('data-rotate')) - rotateAmount : -Math.abs(rotateAmount);
        $circle
          .css({'transform': 'rotate(' + rotate + 'deg)'})
          .attr('data-rotate', rotate);
      });

      $('body').on('click', '.slick-dots button', (e) => {
        const i = $(e.target).parent().index();
        const rotate = rotateAmount * i;
        $circle
          .css({'transform': 'rotate(' + rotate + 'deg)'})
          .attr('data-rotate', rotate);
      });

    }

  };

  /*! js-cookie v3.0.1 | MIT */
  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      )
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init (converter, defaultAttributes) {
    function set (key, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      key = encodeURIComponent(key)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie =
        key + '=' + converter.write(value, key) + stringifiedAttributes)
    }

    function get (key) {
      if (typeof document === 'undefined' || (arguments.length && !key)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var foundKey = decodeURIComponent(parts[0]);
          jar[foundKey] = converter.read(value, foundKey);

          if (key === foundKey) {
            break
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar
    }

    return Object.create(
      {
        set: set,
        get: get,
        remove: function (key, attributes) {
          set(
            key,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });

  var alertBanner = () => {

    const $alertBanner = $('.alert-banner'),
          $alertBannerClose = $('.js-alert-banner-close'),
          cookieExpiration = $alertBanner.data('cookie-expiration'),
          $alertBannerCta = $('.alert-banner a')
    ;

    function setAlertBannerCookie() {

      // set cookie
      if (cookieExpiration > 0) {
        api.set('aota_alert_banner', 'true', { expires: cookieExpiration });
      } else {
        api.set('aota_alert_banner', 'true');
      }

    }

    if ($alertBanner.length) {

      // if no cookie and banner is on the page, show it by setting active to true
      const alertBannerCookie = api.get('aota_alert_banner');
      if (alertBannerCookie === undefined || alertBannerCookie === null) {
        $alertBanner.attr('data-active', 'true');
      }

      // close banner
      $alertBannerClose.on('click', () => {
        $alertBanner.slideUp(400, function() {
          $(this)
            .attr('aria-hidden', 'true')
            .attr('data-active', 'false');

          // Update mega menu dropdown min height
          alertBannerOffset();
        });

        // remove banner
        setTimeout(() => {
          $alertBanner.remove();
        }, 500);

        setAlertBannerCookie();

      });

      $alertBannerCta.on('click', () => {
        setAlertBannerCookie();
      });


      // Update mega menu dropdown min height on resize
      let timeout;
      window.addEventListener('resize', () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(() => {
          alertBannerOffset();
        });
      }, false);

    }

  };

  var scrollingBanner = () => {

    const $banner = $('.scrolling-banner'),
          $siteHeader = $('.site-header'),
          $siteFooter = $('.site-footer'),
          $breadcrumb = $('.breadcrumb'),
          $alertBanner = $('.alert-banner')
    ;

    function checkFooterOffset() {

      if ($banner.offset().top + $banner.height() >= $siteFooter.offset().top) {
        $banner
          .removeClass('-fixed')
          .addClass('-unfixed');
        $('.scrolling-banner-spacer').addClass('-hidden');
      }

      if ($(document).scrollTop() + window.innerHeight < $siteFooter.offset().top) {
        $banner
          .removeClass('-unfixed')
          .addClass('-fixed');
        $('.scrolling-banner-spacer').removeClass('-hidden');
      }
    }

    if ($banner.length) {

      const siteHeaderHeight = $siteHeader.outerHeight() || 0,
            breadcrumbHeight = $breadcrumb.outerHeight() || 0,
            alertBannerHeight = $alertBanner.outerHeight() || 0
      ;

      const pos = siteHeaderHeight + breadcrumbHeight + alertBannerHeight;

      // spacer
      $banner
        .clone()
        .removeClass('scrolling-banner')
        .addClass('scrolling-banner-spacer')
        .attr('aria-hidden', 'true')
        .insertBefore($banner);


      $(window).scroll(function() {
        if ($(this).scrollTop() > pos) {
          checkFooterOffset();
        } else {
          $banner.removeClass('-fixed');
        }
      });

    }

  };

  /* eslint-disable no-unused-vars */

  var gatedContentPromo = () => {

    const $gatedContentSlider = $('.js-gated-content-slider'),
          $slickArrow = $('.js-gated-content-slick-arrow'),
          $toggle = $('.js-gated-content-slider-pause');

    if ($gatedContentSlider.length) {

      $gatedContentSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 750,
        dots: true,
        nextArrow: $('.js-gated-content-slider-next'),
        prevArrow: $('.js-gated-content-slider-prev')
      });

      $slickArrow.on('click', function() {
        $gatedContentSlider.slick('slickSetOption', 'autoplay', false).slick('slickPause');
        $toggle
          .attr('data-active', 'false')
          .find('.sr-text')
          .text('Play');
      });

      $toggle.on('click', (e) => {

        const playState = $(e.currentTarget).attr('data-active');

        if (playState === 'true') {
          $gatedContentSlider.slick('slickSetOption', 'autoplay', false).slick('slickPause');
        } else {
          $gatedContentSlider.slick('slickSetOption', 'autoplay', true).slick('slickPlay');
        }

        $(e.currentTarget)
          .attr('data-active', (playState === 'true') ? 'false' : 'true')
          .find('.sr-text')
          .text(playState === 'true' ? 'Play' : 'Pause')
        ;

      });

    }

  };

  var coveoSearch = () => {

    if ($('.coveo-wrapper').length) {

      // coveo filter control
      let open = false;
      const bp = 1024;

      const $controller = $('.coveo-filter-controller'),
            $filters = $('.coveo-facet-column');

      if (window.innerWidth < bp && open) {
        $('.coveo-dropdown-header-wrapper').css('display', 'none');
      }

      if (window.innerWidth < bp && !open) {
        $('.coveo-dropdown-header-wrapper').css('display', 'none');
      }

      $(window).resize(() => {
        if (window.innerWidth >= bp) {
          $filters.css('display', 'block');
          return;
        }

        if (window.innerWidth < bp && open) {
          $filters.css('display', 'block');
          $('.coveo-dropdown-header-wrapper').css('display', 'none');
          return;
        }

        if (window.innerWidth < bp && !open) {
          $filters.css('display', 'none');
          $('.coveo-dropdown-header-wrapper').css('display', 'none');
        }
      });

      $controller.click((e) => {
        e.preventDefault();

        if (open) {
          open = false;
          $controller.removeClass('-opened');
          $controller.addClass('-closed');
          $filters.slideToggle();
        } else {
          open = true;
          $controller.removeClass('-closed');
          $controller.addClass('-opened');
          $filters.slideToggle();
        }
      });
    }
  };

  var memberBenefitsGrid = () => {

    $('.member-benefits-grid-tabs-button').on('click', (e) => {

      const $trigger = $(e.currentTarget),
            $target   = $('.member-benefits-grid-description[data-blockid="' + $trigger.data('tabid') + '"]');

      $('.member-benefits-grid-tabs-button').attr('data-active', 'false');
      $trigger.attr('data-active', 'true');

      $('.member-benefits-grid-description').attr('data-hidden', 'true');
      $target.attr('data-hidden', 'false');
    });

  };

  var capabilityModel = () => {

    const capabilityModelMobileSelect = document.querySelector('.capability-model-nav-mobile-select'),
          capabilityModelMobileButton = document.querySelector('.capability-model-nav-mobile-button')
    ;

    if (capabilityModelMobileButton) {
      capabilityModelMobileButton.addEventListener('click', () => {
        window.location = capabilityModelMobileSelect.value;
      });
    }
  };

  // -----------------------------------------------------------------------------

  window.$ = jQuery;

  (($) => {

    // Document Ready
    $(() => {

      // -----------------
      // High-priority JS
      // -----------------
      extendJquery();
      new Animate('[data-animation]');
      loading();

      // if ($('.faceted-search').length) {
      //   new FacetedSearch().init();
      // }

      // -----------------
      // Low-priority JS
      // -----------------
      siteHeader();
      mobileMenu();
      mobileExploreMenu();
      socialShare();
      formValidation();
      anchorSmoothScroll();
      jsLinkEvent();
      heroHome();
      accordion();
      accordionTabs();
      contentExpander();
      videoModal();
      membershipBenefits();
      testimonialSlider();
      alertBanner();
      scrollingBanner();
      gatedContentPromo();
      memberBenefitsGrid();
      coveoSearch();
      capabilityModel();

    });

  })($);


  // -----------------------------------------------------------------------------
  // Service Worker registration
  // -----------------------------------------------------------------------------
  if ('serviceWorker' in navigator && false !== false) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js', {
          scope: '/'
        });
      // .then((registration) => { })
      // .catch((registrationError) => { });
    });
  }

}($));
//# sourceMappingURL=sourcemaps/bundle.js.map
