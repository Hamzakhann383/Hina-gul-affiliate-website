/* =========================================================
   HINA GUL SMART PICKS
   COMPLETE FIXED JAVASCRIPT
========================================================= */

"use strict";

/* =========================================================
   1. AMAZON AFFILIATE CONFIGURATION
========================================================= */

const AMAZON_AFFILIATE_TAG = "YOUR_AFFILIATE_TAG-20";

const AFFILIATE_LINKS = {
    "ultrabook-pro-15":
        "https://www.amazon.com/dp/EXAMPLE1?tag=" + AMAZON_AFFILIATE_TAG,

    "soundmax-anc":
        "https://www.amazon.com/dp/EXAMPLE2?tag=" + AMAZON_AFFILIATE_TAG,

    "smartwatch-pro":
        "https://www.amazon.com/dp/EXAMPLE3?tag=" + AMAZON_AFFILIATE_TAG,

    "wireless-keyboard":
        "https://www.amazon.com/dp/EXAMPLE4?tag=" + AMAZON_AFFILIATE_TAG,

    "gaming-mouse":
        "https://www.amazon.com/dp/EXAMPLE5?tag=" + AMAZON_AFFILIATE_TAG,

    "4k-monitor":
        "https://www.amazon.com/dp/EXAMPLE6?tag=" + AMAZON_AFFILIATE_TAG,

    "airbuds-pro":
        "https://www.amazon.com/dp/EXAMPLE7?tag=" + AMAZON_AFFILIATE_TAG,

    "fitness-watch":
        "https://www.amazon.com/dp/EXAMPLE8?tag=" + AMAZON_AFFILIATE_TAG
};


/* =========================================================
   2. DOM HELPERS
========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return Array.from(parent.querySelectorAll(selector));
};


/* =========================================================
   3. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initTheme();
    initMobileMenu();
    initSearch();
    initLiveSearch();
    initProductFilters();
    initCategoryCards();
    initWishlist();
    initFAQ();
    initBackToTop();
    initNewsletterForms();
    initContactForm();
    initModals();
    initAffiliateLinks();
    initProductButtons();
    initCookieNotice();
    initScrollSpy();
    initSmoothScroll();
    initEscapeKey();
    initYear();
    initImageFallbacks();
    preventDoubleSubmit();
    initAdminProducts();

});


/* =========================================================
   4. DARK / LIGHT MODE
========================================================= */

const THEME_KEY = "hinaGulTheme";

function initTheme() {

    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {

        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );

    } else {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

    }

    updateThemeIcons();

    const buttons = $$(
        "[data-theme-toggle], #themeToggle, .theme-toggle"
    );

    buttons.forEach(button => {

        button.addEventListener("click", toggleTheme);

    });

}


function toggleTheme() {

    const html = document.documentElement;

    const currentTheme =
        html.getAttribute("data-theme") || "light";

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);

    localStorage.setItem(
        THEME_KEY,
        newTheme
    );

    updateThemeIcons();

    showToast(
        "Theme Updated",
        `${newTheme === "dark" ? "Dark" : "Light"} mode enabled.`
    );

}


function updateThemeIcons() {

    const buttons = $$(
        "[data-theme-toggle], #themeToggle, .theme-toggle"
    );

    const theme =
        document.documentElement.getAttribute("data-theme");

    buttons.forEach(button => {

        const icon = $("i", button);

        if (!icon) return;

        if (theme === "dark") {

            icon.className =
                "fa-solid fa-sun";

            button.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            icon.className =
                "fa-solid fa-moon";

            button.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        }

    });

}


/* =========================================================
   5. MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuButton =
        $(".menu-btn") ||
        $("#menuBtn");

    const mobileNav =
        $(".mobile-nav") ||
        $("#mobileNav");

    const closeButton =
        $(".mobile-nav-close") ||
        $(".mobile-nav-header button");

    if (!menuButton || !mobileNav) return;

    menuButton.addEventListener("click", () => {

        mobileNav.classList.add("active");

        document.body.classList.add("no-scroll");

    });


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    $$("a", mobileNav).forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    document.addEventListener("click", event => {

        if (
            mobileNav.classList.contains("active") &&
            !mobileNav.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            closeMobileMenu();

        }

    });

}


function closeMobileMenu() {

    const mobileNav =
        $(".mobile-nav") ||
        $("#mobileNav");

    if (!mobileNav) return;

    mobileNav.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* =========================================================
   6. SEARCH OVERLAY
========================================================= */

function initSearch() {

    const searchButtons = $$(
        "[data-search-open], #searchBtn, .search-btn"
    );

    const overlay =
        $(".search-overlay") ||
        $("#searchOverlay");

    const closeButton =
        $(".close-search") ||
        $("#closeSearch");

    if (!overlay) return;


    searchButtons.forEach(button => {

        button.addEventListener("click", () => {

            overlay.classList.add("active");

            document.body.classList.add("no-scroll");

            setTimeout(() => {

                const input =
                    $(".search-input", overlay) ||
                    $("input[type='search']", overlay) ||
                    $("input", overlay);

                if (input) {
                    input.focus();
                }

            }, 100);

        });

    });


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeSearch
        );

    }


    overlay.addEventListener("click", event => {

        if (event.target === overlay) {

            closeSearch();

        }

    });


    const form =
        $(".search-form", overlay) ||
        $("form", overlay);


    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();

            const input =
                $("input", form);

            if (!input) return;

            const query =
                input.value.trim().toLowerCase();

            if (!query) {

                showToast(
                    "Search",
                    "Please enter a product name.",
                    "warning"
                );

                return;

            }

            closeSearch();

            searchProducts(query);

        });

    }


    $$(".search-tag", overlay).forEach(tag => {

        tag.addEventListener("click", () => {

            const input =
                $(".search-input", overlay) ||
                $("input", overlay);

            if (!input) return;

            input.value =
                tag.textContent.trim();

            input.focus();

        });

    });

}


function closeSearch() {

    const overlay =
        $(".search-overlay") ||
        $("#searchOverlay");

    if (!overlay) return;

    overlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* =========================================================
   7. PRODUCT SEARCH - FIXED
========================================================= */

function searchProducts(query) {

    const products =
        $$(".product-card");

    let found = 0;

    const normalizedQuery =
        query.toLowerCase().trim();


    products.forEach(card => {

        const name =
            card.dataset.name?.toLowerCase() || "";

        const category =
            card.dataset.category?.toLowerCase() || "";

        const text =
            card.textContent.toLowerCase();

        const matches =
            name.includes(normalizedQuery) ||
            category.includes(normalizedQuery) ||
            text.includes(normalizedQuery);


        card.classList.toggle(
            "hidden",
            !matches
        );


        if (matches) {
            found++;
        }

    });


    const noResults =
        $("#noResults") ||
        $(".no-results");


    if (noResults) {

        noResults.classList.toggle(
            "show",
            found === 0
        );

    }


    const productsSection =
        $("#products") ||
        $(".products-section");


    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    if (found > 0) {

        showToast(
            "Products Found",
            `${found} product${found === 1 ? "" : "s"} found.`
        );

    } else {

        showToast(
            "No Products Found",
            `No products matched "${query}".`,
            "warning"
        );

    }

}


/* =========================================================
   8. LIVE SEARCH
========================================================= */

function initLiveSearch() {

    const inputs = $$(
        "[data-live-search], #liveSearch, .live-search-input"
    );

    inputs.forEach(input => {

        input.addEventListener("input", () => {

            const query =
                input.value.trim().toLowerCase();

            if (!query) {

                showAllProducts();

                return;

            }

            searchProductsWithoutScroll(query);

        });

    });

}


function searchProductsWithoutScroll(query) {

    const cards =
        $$(".product-card");

    let found = 0;

    cards.forEach(card => {

        const name =
            card.dataset.name?.toLowerCase() || "";

        const category =
            card.dataset.category?.toLowerCase() || "";

        const text =
            card.textContent.toLowerCase();

        const match =
            name.includes(query) ||
            category.includes(query) ||
            text.includes(query);

        card.classList.toggle(
            "hidden",
            !match
        );

        if (match) {
            found++;
        }

    });


    const noResults =
        $("#noResults") ||
        $(".no-results");

    if (noResults) {

        noResults.classList.toggle(
            "show",
            found === 0
        );

    }

}


/* =========================================================
   9. SHOW ALL PRODUCTS
========================================================= */

function showAllProducts() {

    const cards =
        $$(".product-card");

    cards.forEach(card => {

        card.classList.remove("hidden");

    });


    const noResults =
        $("#noResults") ||
        $(".no-results");

    if (noResults) {

        noResults.classList.remove("show");

    }

}


/* =========================================================
   10. PRODUCT FILTERS
========================================================= */

function initProductFilters() {

    const buttons =
        $$(".filter-btn");

    if (!buttons.length) return;


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            const filter =
                (
                    button.dataset.filter || "all"
                ).toLowerCase();


            const cards =
                $$(".product-card");

            let found = 0;


            cards.forEach(card => {

                const category =
                    (
                        card.dataset.category || ""
                    ).toLowerCase();


                const matches =
                    filter === "all" ||
                    category === filter;


                card.classList.toggle(
                    "hidden",
                    !matches
                );


                if (matches) {
                    found++;
                }

            });


            const noResults =
                $("#noResults") ||
                $(".no-results");


            if (noResults) {

                noResults.classList.toggle(
                    "show",
                    found === 0
                );

            }

        });

    });

}


/* =========================================================
   11. CATEGORY CARDS
========================================================= */

function initCategoryCards() {

    const categories =
        $$(".category-card");

    const filters =
        $$(".filter-btn");


    categories.forEach(category => {

        category.addEventListener("click", () => {

            const categoryName =
                (
                    category.dataset.category || ""
                ).toLowerCase();

            if (!categoryName) return;


            filters.forEach(filter => {

                const filterName =
                    (
                        filter.dataset.filter || ""
                    ).toLowerCase();

                filter.classList.toggle(
                    "active",
                    filterName === categoryName
                );

            });


            const products =
                $$(".product-card");


            products.forEach(product => {

                const productCategory =
                    (
                        product.dataset.category || ""
                    ).toLowerCase();

                product.classList.toggle(
                    "hidden",
                    productCategory !== categoryName
                );

            });


            const productsSection =
                $("#products");

            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

}


/* =========================================================
   12. WISHLIST
========================================================= */

const WISHLIST_KEY =
    "hinaGulWishlist";


function getWishlist() {

    try {

        return JSON.parse(
            localStorage.getItem(WISHLIST_KEY)
        ) || [];

    } catch {

        return [];

    }

}


function saveWishlist(list) {

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(list)
    );

}


function initWishlist() {

    $$(".wishlist-btn").forEach(button => {

        setupWishlistButton(button);

    });

    updateWishlistCount();

}


function setupWishlistButton(button) {

    const card =
        button.closest(".product-card");

    if (!card) return;


    const id =
        button.dataset.productId ||
        card.dataset.product ||
        card.dataset.id ||
        card.dataset.name;


    if (!id) return;


    const wishlist =
        getWishlist();


    if (wishlist.includes(id)) {

        setWishlistButton(
            button,
            true
        );

    }


    if (button.dataset.wishlistReady === "true") {
        return;
    }

    button.dataset.wishlistReady = "true";


    button.addEventListener("click", event => {

        event.preventDefault();

        event.stopPropagation();

        toggleWishlist(
            id,
            button
        );

    });

}


function toggleWishlist(id, button) {

    let wishlist =
        getWishlist();

    const exists =
        wishlist.includes(id);


    if (exists) {

        wishlist =
            wishlist.filter(
                item => item !== id
            );

        setWishlistButton(
            button,
            false
        );

        showToast(
            "Removed",
            "Product removed from your wishlist."
        );

    } else {

        wishlist.push(id);

        setWishlistButton(
            button,
            true
        );

        showToast(
            "Added to Wishlist",
            "Product saved successfully."
        );

    }


    saveWishlist(wishlist);

    updateWishlistCount();

}


function setWishlistButton(
    button,
    active
) {

    button.classList.toggle(
        "active",
        active
    );


    const icon =
        $("i", button);

    if (!icon) return;


    icon.className =
        active
            ? "fa-solid fa-heart"
            : "fa-regular fa-heart";

}


function updateWishlistCount() {

    const count =
        getWishlist().length;

    $$(".wishlist-count").forEach(badge => {

        badge.textContent =
            count > 99 ? "99+" : count;

        badge.style.display =
            count > 0 ? "grid" : "none";

    });

}


/* =========================================================
   13. FAQ
========================================================= */

function initFAQ() {

    const items =
        $$(".faq-item");


    items.forEach(item => {

        const question =
            $(".faq-question", item);

        const answer =
            $(".faq-answer", item);


        if (!question || !answer) return;


        question.addEventListener("click", () => {

            const active =
                item.classList.contains("active");


            items.forEach(other => {

                if (other !== item) {

                    other.classList.remove("active");

                    const otherAnswer =
                        $(".faq-answer", other);

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }

                }

            });


            item.classList.toggle(
                "active",
                !active
            );


            if (!active) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                answer.style.maxHeight = null;

            }

        });

    });

}


/* =========================================================
   14. BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        $(".back-to-top") ||
        $("#backToTop");

    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add("show");

            } else {

                button.classList.remove("show");

            }

        },
        { passive: true }
    );


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   15. NEWSLETTER
========================================================= */

function initNewsletterForms() {

    $$(".newsletter-form").forEach(form => {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const input =
                $("input[type='email']", form);

            if (!input) return;


            const email =
                input.value.trim();


            if (!isValidEmail(email)) {

                showToast(
                    "Invalid Email",
                    "Please enter a valid email address.",
                    "error"
                );

                input.focus();

                return;

            }


            let subscribers =
                JSON.parse(
                    localStorage.getItem(
                        "hinaGulSubscribers"
                    )
                ) || [];


            if (!subscribers.includes(email)) {

                subscribers.push(email);

                localStorage.setItem(
                    "hinaGulSubscribers",
                    JSON.stringify(subscribers)
                );

            }


            input.value = "";


            showToast(
                "You're Subscribed!",
                "Thanks for joining our deals newsletter."
            );

        });

    });

}


function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* =========================================================
   16. CONTACT FORM
========================================================= */

function initContactForm() {

    $$(".contact-form").forEach(form => {

        form.addEventListener("submit", event => {

            const action =
                form.getAttribute("action");


            if (action) {
                return;
            }


            event.preventDefault();


            const name =
                $("input[name='name']", form) ||
                $("input[name='fullName']", form);

            const email =
                $("input[name='email']", form);

            const message =
                $("textarea[name='message']", form);


            if (!name || !email || !message) {

                showToast(
                    "Form Error",
                    "Please complete the form.",
                    "error"
                );

                return;

            }


            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !message.value.trim()
            ) {

                showToast(
                    "Missing Information",
                    "Please fill in all required fields.",
                    "warning"
                );

                return;

            }


            if (
                !isValidEmail(
                    email.value.trim()
                )
            ) {

                showToast(
                    "Invalid Email",
                    "Please enter a valid email.",
                    "error"
                );

                return;

            }


            form.reset();


            showToast(
                "Message Ready",
                "Your message has been submitted successfully."
            );

        });

    });

}


/* =========================================================
   17. AMAZON AFFILIATE LINKS
========================================================= */

function initAffiliateLinks() {

    $$("[data-product]").forEach(button => {

        const productId =
            button.dataset.product;

        if (!productId) return;


        const link =
            AFFILIATE_LINKS[productId];


        if (!link) return;


        if (
            button.tagName.toLowerCase() === "a"
        ) {

            button.href = link;

            button.target = "_blank";

            button.rel =
                "nofollow sponsored noopener";

        }


        button.addEventListener(
            "click",
            () => {

                trackAffiliateClick(
                    productId
                );

            }
        );

    });

}


/* =========================================================
   18. AMAZON BUTTONS
========================================================= */

function initProductButtons() {

    $$(".amazon-btn").forEach(button => {

        if (
            button.tagName.toLowerCase() === "a"
        ) {

            return;

        }


        const productId =
            button.dataset.product;

        if (!productId) return;


        button.addEventListener("click", event => {

            event.preventDefault();

            openAmazonProduct(
                productId
            );

        });

    });

}


function openAmazonProduct(productId) {

    const link =
        AFFILIATE_LINKS[productId];


    if (!link) {

        showToast(
            "Amazon Link Missing",
            "Please add the real Amazon product link first.",
            "warning"
        );

        return;

    }


    trackAffiliateClick(
        productId
    );


    window.open(
        link,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   19. AFFILIATE TRACKING
========================================================= */

function trackAffiliateClick(productId) {

    const key =
        "hinaGulAffiliateClicks";


    let clicks =
        JSON.parse(
            localStorage.getItem(key)
        ) || {};


    if (!clicks[productId]) {
        clicks[productId] = 0;
    }


    clicks[productId]++;


    localStorage.setItem(
        key,
        JSON.stringify(clicks)
    );

}


/* =========================================================
   20. PRODUCT MODALS
========================================================= */

function initModals() {

    const modal =
        $(".product-modal-overlay") ||
        $("#productModal");


    if (!modal) return;


    $$(".modal-close").forEach(button => {

        button.addEventListener(
            "click",
            closeAllModals
        );

    });


    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeAllModals();

        }

    });


    $$(".product-card").forEach(card => {

        const clickableArea =
            $(".product-info h3", card) ||
            $(".product-image", card);


        if (!clickableArea) return;


        clickableArea.style.cursor =
            "pointer";


        clickableArea.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(".amazon-btn") ||
                    event.target.closest(".wishlist-btn")
                ) {

                    return;

                }


                openProductModal(card);

            }
        );

    });

}


function openProductModal(card) {

    const modal =
        $(".product-modal-overlay") ||
        $("#productModal");


    if (!modal) return;


    const title =
        $("h3", card)?.textContent.trim() ||
        "Featured Product";


    const category =
        $(".product-category", card)?.textContent.trim() ||
        "Product";


    const price =
        $(".price-row strong", card)?.textContent.trim() ||
        "";


    const rating =
        $(".rating", card)?.textContent.trim() ||
        "";


    const image =
        $("img", card)?.src ||
        "";


    const productId =
        card.dataset.product ||
        card.dataset.productId ||
        "";


    const modalTitle =
        $("#modalProductTitle") ||
        $(".modal-product-info h2", modal);


    const modalCategory =
        $("#modalProductCategory") ||
        $(".modal-product-info .product-category", modal);


    const modalPrice =
        $("#modalProductPrice") ||
        $(".modal-product-info .modal-price", modal);


    const modalRating =
        $("#modalProductRating") ||
        $(".modal-product-info .rating", modal);


    const modalImage =
        $("#modalProductImage") ||
        $(".modal-product-image", modal);


    if (modalTitle) {
        modalTitle.textContent = title;
    }


    if (modalCategory) {
        modalCategory.textContent = category;
    }


    if (modalPrice) {
        modalPrice.textContent = price;
    }


    if (modalRating) {
        modalRating.textContent = rating;
    }


    if (modalImage) {

        if (image) {

            modalImage.innerHTML = `
                <img
                    src="${escapeHtmlAttribute(image)}"
                    alt="${escapeHtmlAttribute(title)}"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:contain;
                        border-radius:15px;
                    "
                >
            `;

        } else {

            modalImage.innerHTML =
                `<i class="fa-solid fa-box-open"></i>`;

        }

    }


    const modalAmazon =
        $(".modal-product-info .amazon-btn", modal);


    if (modalAmazon && productId) {

        modalAmazon.onclick = () => {

            openAmazonProduct(
                productId
            );

        };

    }


    modal.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* =========================================================
   21. CLOSE MODALS
========================================================= */

function closeAllModals() {

    $$(".modal-overlay, .product-modal-overlay")
        .forEach(modal => {

            modal.classList.remove("active");

        });


    document.body.classList.remove("no-scroll");

}


/* =========================================================
   22. COOKIE NOTICE
========================================================= */

const COOKIE_KEY =
    "hinaGulCookieChoice";


function initCookieNotice() {

    const notice =
        $(".cookie-notice");

    if (!notice) return;


    const saved =
        localStorage.getItem(
            COOKIE_KEY
        );


    if (!saved) {

        setTimeout(() => {

            notice.classList.add("show");

        }, 1200);

    }


    const accept =
        $(".cookie-accept", notice) ||
        $("#acceptCookies");


    const decline =
        $(".cookie-decline", notice) ||
        $("#declineCookies");


    if (accept) {

        accept.addEventListener("click", () => {

            localStorage.setItem(
                COOKIE_KEY,
                "accepted"
            );

            notice.classList.remove("show");

        });

    }


    if (decline) {

        decline.addEventListener("click", () => {

            localStorage.setItem(
                COOKIE_KEY,
                "declined"
            );

            notice.classList.remove("show");

        });

    }

}


/* =========================================================
   23. TOAST
========================================================= */

let toastTimer = null;


function showToast(
    title,
    message,
    type = "success"
) {

    let toast =
        $(".toast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "toast";


        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fa-solid fa-check"></i>
            </div>

            <div class="toast-content">
                <strong></strong>
                <span></span>
            </div>

            <button
                type="button"
                aria-label="Close notification">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;


        document.body.appendChild(toast);


        $("button", toast)
            .addEventListener(
                "click",
                () => {

                    toast.classList.remove(
                        "show"
                    );

                }
            );

    }


    const icon =
        $(".toast-icon i", toast);

    const titleElement =
        $(".toast-content strong", toast);

    const messageElement =
        $(".toast-content span", toast);


    if (titleElement) {
        titleElement.textContent = title;
    }


    if (messageElement) {
        messageElement.textContent = message;
    }


    if (icon) {

        if (type === "error") {

            icon.className =
                "fa-solid fa-circle-exclamation";

        } else if (type === "warning") {

            icon.className =
                "fa-solid fa-triangle-exclamation";

        } else {

            icon.className =
                "fa-solid fa-check";

        }

    }


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 4000);

}


/* =========================================================
   24. SCROLL SPY
========================================================= */

function initScrollSpy() {

    const sections =
        $$("section[id]");

    const navLinks =
        $$(".nav-link");


    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            let current = "";


            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 140;


                if (
                    window.scrollY >= sectionTop
                ) {

                    current =
                        section.getAttribute("id");

                }

            });


            navLinks.forEach(link => {

                const href =
                    link.getAttribute("href");


                link.classList.toggle(
                    "active",
                    href === `#${current}`
                );

            });

        },
        { passive: true }
    );

}


/* =========================================================
   25. SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    $$("a[href^='#']").forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#" ||
                    href.length < 2
                ) {

                    return;

                }


                const target =
                    document.querySelector(href);


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   26. ESCAPE KEY
========================================================= */

function initEscapeKey() {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            closeSearch();

            closeMobileMenu();

            closeAllModals();

        }
    );

}


/* =========================================================
   27. CURRENT YEAR
========================================================= */

function initYear() {

    $$(
        "[data-current-year], #currentYear"
    ).forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });

}


/* =========================================================
   28. IMAGE FALLBACK
========================================================= */

function initImageFallbacks() {

    $$("img").forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";


                const parent =
                    image.parentElement;


                if (!parent) return;


                if (
                    !$(".image-placeholder", parent)
                ) {

                    const placeholder =
                        document.createElement("div");


                    placeholder.className =
                        "image-placeholder";


                    placeholder.innerHTML =
                        `<i class="fa-solid fa-image"></i>`;


                    parent.appendChild(
                        placeholder
                    );

                }

            }
        );

    });

}


/* =========================================================
   29. ESCAPE HTML
========================================================= */

function escapeHtmlAttribute(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


/* =========================================================
   30. PRODUCT SORTING
========================================================= */

function sortProducts(type) {

    const grid =
        $(".products-grid");

    if (!grid) return;


    const cards =
        $$(".product-card", grid);


    cards.sort((a, b) => {

        if (type === "name") {

            const aName =
                $("h3", a)?.textContent
                    .trim()
                    .toLowerCase() || "";

            const bName =
                $("h3", b)?.textContent
                    .trim()
                    .toLowerCase() || "";


            return aName.localeCompare(
                bName
            );

        }


        if (type === "price-low") {

            return getPrice(a) -
                getPrice(b);

        }


        if (type === "price-high") {

            return getPrice(b) -
                getPrice(a);

        }


        if (type === "rating") {

            return getRating(b) -
                getRating(a);

        }


        return 0;

    });


    cards.forEach(card => {

        grid.appendChild(card);

    });

}


function getPrice(card) {

    const price =
        $(".price-row strong", card)
            ?.textContent || "";


    const number =
        price.replace(
            /[^0-9.]/g,
            ""
        );


    return parseFloat(number) || 0;

}


function getRating(card) {

    const rating =
        $(".rating", card)
            ?.textContent || "";


    const match =
        rating.match(
            /(\d+(?:\.\d+)?)/
        );


    return match
        ? parseFloat(match[1])
        : 0;

}


/* =========================================================
   31. ACTIVE CATEGORY
========================================================= */

function activateCategory(category) {

    const normalized =
        category.toLowerCase();


    $$(".filter-btn").forEach(button => {

        const value =
            (
                button.dataset.filter || ""
            ).toLowerCase();


        button.classList.toggle(
            "active",
            value === normalized
        );

    });


    $$(".product-card").forEach(card => {

        const value =
            (
                card.dataset.category || ""
            ).toLowerCase();


        card.classList.toggle(
            "hidden",
            value !== normalized
        );

    });

}


/* =========================================================
   32. PAGE LOADED
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* =========================================================
   33. PREVENT DOUBLE SUBMISSION
========================================================= */

function preventDoubleSubmit() {

    $$("form").forEach(form => {

        form.addEventListener(
            "submit",
            () => {

                const submit =
                    $("button[type='submit']", form);


                if (!submit) return;


                submit.disabled = true;


                setTimeout(() => {

                    submit.disabled = false;

                }, 3000);

            }
        );

    });

}


/* =========================================================
   34. ADMIN ADD PRODUCT SYSTEM
========================================================= */

const ADMIN_PASSWORD =
    "HinaAdmin2026";


function initAdminProducts() {

    const addButton =
        document.getElementById(
            "adminAddProductBtn"
        );


    const modal =
        document.getElementById(
            "addProductModal"
        );


    const closeButton =
        document.getElementById(
            "closeAddProduct"
        );


    const form =
        document.getElementById(
            "addProductForm"
        );


    const grid =
        document.getElementById(
            "productsGrid"
        );


    /*
       Agar HTML mein admin section nahi hai
       to function safely stop ho jayega.
    */

    if (
        !addButton ||
        !modal ||
        !form ||
        !grid
    ) {

        return;

    }


    /* -----------------------------------------
       LOAD SAVED PRODUCTS
    ----------------------------------------- */

    loadAdminProducts();


    /* -----------------------------------------
       OPEN ADMIN MODAL
    ----------------------------------------- */

    addButton.addEventListener(
        "click",
        () => {

            const password =
                prompt(
                    "Enter Admin Password:"
                );


            if (
                password !== ADMIN_PASSWORD
            ) {

                alert(
                    "❌ Access Denied. Admin only."
                );

                return;

            }


            modal.classList.add(
                "active"
            );


            document.body.classList.add(
                "no-scroll"
            );

        }
    );


    /* -----------------------------------------
       CLOSE MODAL
    ----------------------------------------- */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                modal.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            }
        );

    }


    /* -----------------------------------------
       CLOSE BY OUTSIDE CLICK
    ----------------------------------------- */

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            }

        }
    );


    /* -----------------------------------------
       ADD PRODUCT
    ----------------------------------------- */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "adminProductName"
                ).value.trim();


            const price =
                document.getElementById(
                    "adminProductPrice"
                ).value.trim();


            const oldPrice =
                document.getElementById(
                    "adminProductOldPrice"
                ).value.trim();


            const category =
                document.getElementById(
                    "adminProductCategory"
                ).value;


            const image =
                document.getElementById(
                    "adminProductImage"
                ).value.trim();


            const amazonLink =
                document.getElementById(
                    "adminProductAmazon"
                ).value.trim();


            if (
                !name ||
                !price ||
                !category ||
                !image ||
                !amazonLink
            ) {

                showToast(
                    "Missing Information",
                    "Please fill all required product fields.",
                    "warning"
                );

                return;

            }


            const productId =
                "admin-product-" +
                Date.now();


            const productHTML = `

                <article
                    class="product-card"
                    data-category="${escapeHtmlAttribute(category)}"
                    data-name="${escapeHtmlAttribute(name)}"
                    data-product="${productId}"
                >

                    <div class="product-image">

                        <span class="featured-badge">
                            NEW
                        </span>

                        <button
                            type="button"
                            class="wishlist-btn"
                            data-product-id="${productId}"
                        >

                            <i class="fa-regular fa-heart"></i>

                        </button>

                        <img
                            src="${escapeHtmlAttribute(image)}"
                            alt="${escapeHtmlAttribute(name)}"
                            loading="lazy"
                        >

                        <div class="product-placeholder">

                            <i class="fa-solid fa-box"></i>

                        </div>

                    </div>


                    <div class="product-info">

                        <span class="product-category">
                            ${escapeHtmlAttribute(category)}
                        </span>

                        <h3>
                            ${escapeHtmlAttribute(name)}
                        </h3>


                        <div class="rating">

                            <span class="stars">
                                ★★★★★
                            </span>

                            <span>
                                5.0
                            </span>

                        </div>


                        <div class="price-row">

                            <strong>
                                ${escapeHtmlAttribute(price)}
                            </strong>

                            ${
                                oldPrice
                                    ? `<del>${escapeHtmlAttribute(oldPrice)}</del>`
                                    : ""
                            }

                        </div>


                        <a
                            href="${escapeHtmlAttribute(amazonLink)}"
                            class="amazon-btn"
                            target="_blank"
                            rel="nofollow sponsored noopener"
                        >

                            <i class="fa-brands fa-amazon"></i>
                            View Deal

                        </a>

                    </div>

                </article>

            `;


            grid.insertAdjacentHTML(
                "beforeend",
                productHTML
            );


            saveAdminProduct({

                id: productId,

                name: name,

                price: price,

                oldPrice: oldPrice,

                category: category,

                image: image,

                amazonLink: amazonLink

            });


            /* Setup newly added product */

            const newCard =
                grid.lastElementChild;


            if (newCard) {

                const wishlistButton =
                    $(".wishlist-btn", newCard);


                if (wishlistButton) {

                    setupWishlistButton(
                        wishlistButton
                    );

                }


                const amazonButton =
                    $(".amazon-btn", newCard);


                if (amazonButton) {

                    amazonButton.target =
                        "_blank";

                    amazonButton.rel =
                        "nofollow sponsored noopener";

                }

            }


            form.reset();


            modal.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "no-scroll"
            );


            showToast(
                "Product Added",
                `${name} was added successfully.`
            );

        }
    );

}


/* =========================================================
   35. SAVE ADMIN PRODUCT
========================================================= */

function saveAdminProduct(product) {

    let products =
        JSON.parse(
            localStorage.getItem(
                "hinaGulProducts"
            )
        ) || [];


    products.push(product);


    localStorage.setItem(
        "hinaGulProducts",
        JSON.stringify(products)
    );

}


/* =========================================================
   36. LOAD ADMIN PRODUCTS
========================================================= */

function loadAdminProducts() {

    const grid =
        document.getElementById(
            "productsGrid"
        );


    if (!grid) return;


    const products =
        JSON.parse(
            localStorage.getItem(
                "hinaGulProducts"
            )
        ) || [];


    products.forEach(product => {

        const exists =
            grid.querySelector(
                `[data-product="${product.id}"]`
            );


        if (exists) return;


        const productHTML = `

            <article
                class="product-card"
                data-category="${escapeHtmlAttribute(product.category)}"
                data-name="${escapeHtmlAttribute(product.name)}"
                data-product="${escapeHtmlAttribute(product.id)}"
            >

                <div class="product-image">

                    <span class="featured-badge">
                        NEW
                    </span>

                    <button
                        type="button"
                        class="wishlist-btn"
                        data-product-id="${escapeHtmlAttribute(product.id)}"
                    >

                        <i class="fa-regular fa-heart"></i>

                    </button>

                    <img
                        src="${escapeHtmlAttribute(product.image)}"
                        alt="${escapeHtmlAttribute(product.name)}"
                        loading="lazy"
                    >

                    <div class="product-placeholder">

                        <i class="fa-solid fa-box"></i>

                    </div>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${escapeHtmlAttribute(product.category)}
                    </span>

                    <h3>
                        ${escapeHtmlAttribute(product.name)}
                    </h3>


                    <div class="rating">

                        <span class="stars">
                            ★★★★★
                        </span>

                        <span>
                            5.0
                        </span>

                    </div>


                    <div class="price-row">

                        <strong>
                            ${escapeHtmlAttribute(product.price)}
                        </strong>

                        ${
                            product.oldPrice
                                ? `<del>${escapeHtmlAttribute(product.oldPrice)}</del>`
                                : ""
                        }

                    </div>


                    <a
                        href="${escapeHtmlAttribute(product.amazonLink)}"
                        class="amazon-btn"
                        target="_blank"
                        rel="nofollow sponsored noopener"
                    >

                        <i class="fa-brands fa-amazon"></i>
                        View Deal

                    </a>

                </div>

            </article>

        `;


        grid.insertAdjacentHTML(
            "beforeend",
            productHTML
        );


        const newCard =
            grid.lastElementChild;


        if (newCard) {

            const wishlistButton =
                $(".wishlist-btn", newCard);


            if (wishlistButton) {

                setupWishlistButton(
                    wishlistButton
                );

            }

        }

    });

}


/* =========================================================
   37. CONSOLE
========================================================= */

console.log(
    "%c Hina Gul Smart Picks ",
    "background:#ff9900;color:#111;font-weight:bold;padding:6px 10px;border-radius:5px;"
);

console.log(
    "Website JavaScript loaded successfully."
);

console.log(
    "Search system loaded successfully."
);

console.log(
    "Remember to replace placeholder Amazon links with real affiliate links."
);


/* =========================================================
   END OF JAVASCRIPT
========================================================= */