(function () {
  "use strict";

  var STORAGE = {
    cart: "velocare_cart_v1",
    wishlist: "velocare_wishlist_v1"
  };

  var SERVICE_DATA = {
    "exterior-hand-wash-wax": {
      subtitle: "Exterior Hand Wash and Wax",
      title: "Protective shine for daily drivers",
      description:
        "Our exterior hand wash and wax package removes grime safely, restores paint clarity, and seals your finish with durable wax protection.",
      heroImage: "images/misc/s1.webp",
      includes: [
        "Two-bucket hand wash and wheel cleaning",
        "Paint-safe drying and trim wipe-down",
        "Premium wax sealant application",
        "Tire dressing and glass touch-up",
        "Final quality inspection"
      ],
      benefits: [
        "Restores gloss and depth",
        "Protects against dust and UV",
        "Helps reduce water spotting",
        "Extends paint life between details",
        "Improves resale presentation"
      ],
      idealFor: [
        "Daily commuters",
        "Weekend family vehicles",
        "Fleet refresh cycles",
        "Cars parked outdoors",
        "Owners preparing for sale"
      ]
    },
    "interior-deep-cleaning": {
      subtitle: "Interior Deep Cleaning",
      title: "Cabin reset for comfort and hygiene",
      description:
        "We deep-clean seats, carpets, dash, vents, and touch points to remove dust, stains, and odors while restoring a fresh interior finish.",
      heroImage: "images/misc/s2.webp",
      includes: [
        "Vacuuming and compressed-air dust removal",
        "Fabric and carpet stain treatment",
        "Dashboard, console, and vent detailing",
        "Door panel and trim conditioning",
        "Interior glass polishing"
      ],
      benefits: [
        "Healthier cabin environment",
        "Removes stubborn odors",
        "Improves seat and trim lifespan",
        "Enhances daily driving comfort",
        "Restores like-new interior feel"
      ],
      idealFor: [
        "Family vehicles",
        "Rideshare vehicles",
        "Pet owners",
        "Smoker vehicle recovery",
        "Seasonal interior reset"
      ]
    },
    "paint-correction": {
      subtitle: "Paint Correction",
      title: "Remove swirls and restore clarity",
      description:
        "Our multi-stage machine polishing process targets swirl marks, haze, and light scratches to recover gloss and visual depth.",
      heroImage: "images/misc/s3.webp",
      includes: [
        "Paint inspection and thickness checks",
        "Cut and polish stage matching",
        "Panel-by-panel correction workflow",
        "Refinement for optical clarity",
        "Protection-ready final finish"
      ],
      benefits: [
        "Improves paint clarity",
        "Reduces swirl visibility",
        "Boosts shine and depth",
        "Prepares surface for ceramic coating",
        "Raises resale appeal"
      ],
      idealFor: [
        "Dark paint colors",
        "Cars with wash-induced swirls",
        "Show preparation",
        "Pre-sale detailing",
        "Owners chasing mirror finish"
      ]
    },
    "ceramic-coating-protection": {
      subtitle: "Ceramic Coating Protection",
      title: "Long-term gloss and hydrophobic defense",
      description:
        "Ceramic coating bonds to painted surfaces to resist contamination, improve water behavior, and deliver durable high-gloss protection.",
      heroImage: "images/misc/s1.webp",
      includes: [
        "Exterior wash and decontamination",
        "Paint prep and light correction",
        "Professional ceramic application",
        "Curing and finish inspection",
        "Aftercare guidance"
      ],
      benefits: [
        "Hydrophobic water behavior",
        "UV and oxidation resistance",
        "Lower maintenance effort",
        "Longer-lasting gloss finish",
        "Better contamination resistance"
      ],
      idealFor: [
        "New vehicle protection",
        "Performance and luxury vehicles",
        "High-mileage commuters",
        "Outdoor parked vehicles",
        "Owners minimizing maintenance time"
      ]
    },
    "engine-bay-detailing": {
      subtitle: "Engine Bay Detailing",
      title: "Clean, protected, and inspection-ready engine bay",
      description:
        "We safely clean and dress engine-bay surfaces to remove grease buildup, improve inspection visibility, and elevate overall presentation.",
      heroImage: "images/misc/s4.webp",
      includes: [
        "Sensitive-area masking",
        "Degreasing and agitation",
        "Low-moisture rinse method",
        "Plastic and rubber dressing",
        "Final safety check"
      ],
      benefits: [
        "Cleaner maintenance environment",
        "Improved leak visibility",
        "Professional under-hood finish",
        "Reduced grime accumulation",
        "Stronger resale impression"
      ],
      idealFor: [
        "Pre-sale preparation",
        "Collector cars",
        "Fleet inspections",
        "Monthly maintenance plans",
        "Engine bay restoration"
      ]
    },
    "headlight-restoration": {
      subtitle: "Headlight Restoration",
      title: "Recover lens clarity and nighttime confidence",
      description:
        "Our restoration process removes oxidation and haze from headlight lenses, restoring brightness and improving road visibility.",
      heroImage: "images/misc/s5.webp",
      includes: [
        "Lens inspection and masking",
        "Oxidation removal process",
        "Progressive polishing stages",
        "UV-resistant sealant",
        "Output and clarity check"
      ],
      benefits: [
        "Brighter light output",
        "Improved driving safety",
        "Better front-end appearance",
        "Prevents rapid re-fading",
        "Cost-effective refresh"
      ],
      idealFor: [
        "Aged polycarbonate lenses",
        "Vehicles in sunny climates",
        "Safety inspection prep",
        "Pre-sale detailing",
        "Night commuters"
      ]
    }
  };

  var CAR_DATA = {
    "bmw-x5": {
      title: "BMW X5",
      price: "$42,000",
      metrics: ["18000 Mi", "3.0L", "Gasoline", "Automatic", "5 Seats", "2024"],
      heroImage: "images/cars/1.webp",
      description:
        "The BMW X5 balances responsive performance, refined comfort, and premium build quality for everyday luxury and confident long-distance driving.",
      specsLeft: [
        "3.0L Turbo Inline-6 engine",
        "8-speed automatic transmission",
        "All-wheel drive",
        "Adaptive LED headlights",
        "Premium alloy wheels"
      ],
      specsRight: [
        "Digital driver display",
        "Leather interior",
        "Panoramic sunroof",
        "Driver assistance package",
        "Dual-zone climate control"
      ]
    },
    "audi-a4": {
      title: "Audi A4",
      price: "$38,500",
      metrics: ["12000 Mi", "2.0L Turbo", "Gasoline", "Automatic", "5 Seats", "2023"],
      heroImage: "images/cars/2.webp",
      description:
        "The Audi A4 delivers balanced dynamics, clean cabin design, and excellent technology integration for drivers who want practical luxury.",
      specsLeft: [
        "2.0L turbocharged engine",
        "7-speed dual-clutch gearbox",
        "Quattro all-wheel drive",
        "LED matrix lighting",
        "Sport suspension"
      ],
      specsRight: [
        "Virtual cockpit display",
        "Comfort leather seats",
        "Wireless smartphone integration",
        "Parking assist sensors",
        "Multi-zone climate control"
      ]
    },
    "mercedes-c300": {
      title: "Mercedes C300",
      price: "$55,000",
      metrics: ["9000 Mi", "2.0L", "Gasoline", "Automatic", "5 Seats", "2024"],
      heroImage: "images/cars/3.webp",
      description:
        "The Mercedes C300 combines executive-class refinement with sharp handling and modern infotainment in a compact luxury package.",
      specsLeft: [
        "2.0L turbo engine",
        "9-speed automatic transmission",
        "Rear or all-wheel drive",
        "Adaptive braking assist",
        "Advanced LED package"
      ],
      specsRight: [
        "Premium ambient lighting",
        "High-resolution cockpit display",
        "Heated seating",
        "360 camera support",
        "Smart voice assistant"
      ]
    },
    "tesla-model-3": {
      title: "Tesla Model 3",
      price: "$60,000",
      metrics: ["5000 Mi", "Dual Motor", "Electric", "Automatic", "5 Seats", "2024"],
      heroImage: "images/cars/4.webp",
      description:
        "The Tesla Model 3 offers quick acceleration, minimalist interior design, and electric efficiency for drivers focused on modern mobility.",
      specsLeft: [
        "Dual-motor electric drivetrain",
        "Long-range battery pack",
        "Fast-charging compatibility",
        "Regenerative braking",
        "Low center-of-gravity handling"
      ],
      specsRight: [
        "Large central display",
        "Advanced autopilot support",
        "OTA software updates",
        "Panoramic glass roof",
        "Premium sound package"
      ]
    },
    "toyota-fortuner": {
      title: "Toyota Fortuner",
      price: "$47,000",
      metrics: ["22000 Mi", "2.8L", "Diesel", "Automatic", "7 Seats", "2023"],
      heroImage: "images/cars/5.webp",
      description:
        "Toyota Fortuner is a practical body-on-frame SUV with dependable diesel performance, strong road presence, and family-ready flexibility.",
      specsLeft: [
        "2.8L diesel powertrain",
        "Automatic transmission",
        "High ground clearance",
        "Off-road drive modes",
        "Tow-capable chassis"
      ],
      specsRight: [
        "Three-row seating",
        "Rear camera support",
        "Durable interior trim",
        "Navigation and connectivity",
        "Multi-terrain readiness"
      ]
    },
    "honda-civic": {
      title: "Honda Civic",
      price: "$35,000",
      metrics: ["15000 Mi", "1.8L", "Gasoline", "Manual", "5 Seats", "2023"],
      heroImage: "images/cars/6.webp",
      description:
        "Honda Civic remains a benchmark for reliability, fuel efficiency, and engaging daily performance in the compact segment.",
      specsLeft: [
        "1.8L efficient engine",
        "Manual or automatic options",
        "Balanced chassis setup",
        "Economical running costs",
        "Everyday comfort tuning"
      ],
      specsRight: [
        "Modern infotainment stack",
        "Safety assist suite",
        "Comfort cloth seating",
        "Spacious cabin layout",
        "Low-maintenance ownership"
      ]
    },
    "ford-mustang": {
      title: "Ford Mustang",
      price: "$72,000",
      metrics: ["8000 Mi", "5.0L V8", "Gasoline", "Automatic", "4 Seats", "2024"],
      heroImage: "images/cars/7.webp",
      description:
        "Ford Mustang delivers iconic performance character with strong V8 output, aggressive styling, and modern driving assistance.",
      specsLeft: [
        "5.0L V8 performance engine",
        "Performance-tuned suspension",
        "Rear-wheel drive dynamics",
        "Track-ready braking package",
        "Selectable drive modes"
      ],
      specsRight: [
        "Digital performance cluster",
        "Sport seating profile",
        "Launch-oriented calibration",
        "Performance telemetry",
        "Premium cockpit finish"
      ]
    },
    "jeep-wrangler": {
      title: "Jeep Wrangler",
      price: "$58,000",
      metrics: ["13000 Mi", "3.6L", "Gasoline", "Automatic", "5 Seats", "2023"],
      heroImage: "images/cars/8.webp",
      description:
        "Jeep Wrangler combines rugged capability with open-air flexibility, making it ideal for drivers who split time between city roads and weekend trails.",
      specsLeft: [
        "3.6L V6 powertrain",
        "4x4 capability",
        "Off-road traction systems",
        "Removable roof panels",
        "High approach angles"
      ],
      specsRight: [
        "Washable interior options",
        "Trail-ready instrument panel",
        "Navigation and mapping",
        "Durable cargo layout",
        "Adventure accessory support"
      ]
    },
    "rolls-royce-phantom": {
      title: "Rolls-Royce Phantom",
      price: "$390,000",
      metrics: ["4000 Mi", "6.75L V12", "Gasoline", "Automatic", "5 Seats", "2024"],
      heroImage: "images/cars/9.webp",
      description:
        "Rolls-Royce Phantom represents ultra-luxury motoring with exceptional craftsmanship, silent ride quality, and bespoke interior finishing.",
      specsLeft: [
        "6.75L V12 engine",
        "Ultra-refined ride control",
        "Bespoke body finish",
        "Premium luxury chassis",
        "Rear executive comfort"
      ],
      specsRight: [
        "Hand-finished interior",
        "Signature starlight roof",
        "Rear privacy package",
        "Flagship infotainment",
        "Concierge-level options"
      ]
    }
  };

  var BLOG_DATA = {
    "ceramic-coating-benefits-what-every-car-owner-should-know": {
      title: "Ceramic Coating Benefits: What Every Car Owner Should Know",
      intro:
        "Ceramic coating creates a durable protective layer that improves gloss, reduces contamination buildup, and lowers long-term maintenance effort.",
      image: "images/misc/l1.webp"
    },
    "5-detailing-mistakes-that-could-damage-your-cars-appearance": {
      title: "5 Detailing Mistakes That Could Damage Your Car Appearance",
      intro:
        "Small detailing mistakes can dull paint and interior surfaces. This guide highlights common errors and how to avoid them.",
      image: "images/misc/l2.webp"
    },
    "how-to-protect-car-paint-against-sun-dirt-rain-and-dust": {
      title: "How to Protect Car Paint Against Sun, Dirt, Rain and Dust",
      intro:
        "Paint protection starts with consistent washing, safe drying, and the right surface protection products for your climate.",
      image: "images/misc/l3.webp"
    },
    "engine-bay-detailing-improve-performance-and-impress-buyers": {
      title: "Engine Bay Detailing: Improve Presentation and Buyer Confidence",
      intro:
        "A clean engine bay improves inspection visibility and gives potential buyers confidence that the car has been maintained properly.",
      image: "images/misc/l4.webp"
    },
    "car-detailing-through-the-years-how-techniques-have-evolved": {
      title: "Car Detailing Through the Years: How Techniques Have Evolved",
      intro:
        "Modern detailing combines advanced chemistry, better tools, and process discipline to deliver repeatable premium results.",
      image: "images/misc/l5.webp"
    },
    "interior-detailing-tips-to-refresh-seats-dash-and-more-fast": {
      title: "Interior Detailing Tips to Refresh Seats, Dash, and More Fast",
      intro:
        "Fast interior wins come from dust-first workflows, safe cleaners, and trim protection that keeps surfaces looking fresh.",
      image: "images/misc/l6.webp"
    }
  };

  var PRODUCT_DATA = {
    "premium-microfiber-cleaning-towel": {
      slug: "premium-microfiber-cleaning-towel",
      name: "Premium Microfiber Cleaning Towel",
      price: 10.49,
      regularPrice: 7.49,
      description:
        "Ultra-soft, high-absorbency microfiber towel designed for streak-free and scratch-safe detailing across paint, glass, and trim.",
      images: [
        "images/shop/products/towel-1a.webp",
        "images/shop/products/towel-1b.webp",
        "images/shop/products/towel-1c.webp",
        "images/shop/products/towel-1d.webp",
        "images/shop/products/towel-1e.webp"
      ],
      image: "images/shop/products/towel-1a.webp"
    }
  };

  var productCatalog = Object.assign({}, PRODUCT_DATA);

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function parseMoney(value) {
    var normalized = String(value || "").replace(/[^0-9.]/g, "");
    var parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function formatMoney(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function getQuery(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function readStore(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getCart() {
    return readStore(STORAGE.cart, []);
  }

  function setCart(cart) {
    writeStore(STORAGE.cart, cart);
  }

  function getWishlist() {
    return readStore(STORAGE.wishlist, []);
  }

  function setWishlist(wishlist) {
    writeStore(STORAGE.wishlist, wishlist);
  }

  function showToast(message) {
    var notif = document.getElementById("de_notif");
    if (!notif) {
      return;
    }
    notif.textContent = message;
    notif.classList.remove("active");
    requestAnimationFrame(function () {
      notif.classList.add("active");
    });
    window.setTimeout(function () {
      notif.classList.remove("active");
    }, 1600);
  }

  function updateCounters() {
    var cart = getCart();
    var wishlist = getWishlist();
    var cartCount = cart.reduce(function (sum, item) {
      return sum + (item.qty || 0);
    }, 0);

    var cartCounter = document.querySelector("#btn-cart .d-counter");
    if (cartCounter) {
      cartCounter.textContent = String(cartCount);
    }

    var wishCounter = document.querySelector('a.de-icon-counter img[src*="heart.svg"]');
    if (wishCounter) {
      var wrap = wishCounter.closest(".de-icon-counter");
      var countTag = wrap ? wrap.querySelector(".d-counter") : null;
      if (countTag) {
        countTag.textContent = String(wishlist.length);
      }
    }
  }

  function normalizeProduct(item) {
    return {
      slug: item.slug,
      name: item.name,
      price: Number(item.price || 0),
      image: item.image || "images/shop/products/soap-1a.webp",
      qty: Number(item.qty || 1)
    };
  }

  function upsertCart(product, delta) {
    var cart = getCart();
    var existing = cart.find(function (entry) {
      return entry.slug === product.slug;
    });

    if (!existing) {
      cart.push(
        normalizeProduct({
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: Math.max(1, delta)
        })
      );
    } else {
      existing.qty = Math.max(0, existing.qty + delta);
      if (existing.qty === 0) {
        cart = cart.filter(function (entry) {
          return entry.slug !== product.slug;
        });
      }
    }

    setCart(cart);
    updateCounters();
    renderCartDrawer();
  }

  function toggleWishlist(product) {
    var wishlist = getWishlist();
    var exists = wishlist.indexOf(product.slug) !== -1;
    if (exists) {
      wishlist = wishlist.filter(function (slug) {
        return slug !== product.slug;
      });
    } else {
      wishlist.push(product.slug);
    }
    setWishlist(wishlist);
    updateCounters();
    updateWishlistButtons();
    return !exists;
  }

  function updateWishlistButtons() {
    var wishlist = getWishlist();
    document.querySelectorAll(".de__pcard").forEach(function (card) {
      var slug = card.dataset.productSlug;
      var wishButton = card.querySelector(".atr__wish-list");
      if (!wishButton || !slug) {
        return;
      }
      wishButton.classList.toggle("active", wishlist.indexOf(slug) !== -1);
    });
  }

  function renderCartDrawer() {
    var cartWrap = document.querySelector("#extra-wrap .cart-items");
    if (!cartWrap) {
      return;
    }

    var cart = getCart();
    if (!cart.length) {
      cartWrap.innerHTML = '<p class="mb-0 op-7">Your cart is empty. Add products from the shop to get started.</p>';
      return;
    }

    var markup = cart
      .map(function (item, index) {
        return (
          '<div class="de__cart">' +
          '<div class="de__cart-item justify-content-between">' +
          '<div class="d-wrap">' +
          '<img src="' + item.image + '" alt="' + item.name + '">' +
          '<div class="d-info"><div><h4>' + item.name + '</h4><span class="d-price">' + formatMoney(item.price) + "</span></div></div>" +
          '</div>' +
          '<div class="de-number">' +
          '<span class="d-minus" data-cart-action="minus" data-cart-index="' + index + '">-</span>' +
          '<input type="text" class="no-border no-bg" value="' + item.qty + '" readonly>' +
          '<span class="d-plus" data-cart-action="plus" data-cart-index="' + index + '">+</span>' +
          '</div>' +
          '</div>' +
          '</div>'
        );
      })
      .join("");

    cartWrap.innerHTML = markup;

    var subtotal = cart.reduce(function (sum, item) {
      return sum + item.price * item.qty;
    }, 0);

    var summary = document.querySelector("#extra-wrap .cart-summary");
    if (!summary) {
      summary = document.createElement("div");
      summary.className = "cart-summary mt-4";
      cartWrap.insertAdjacentElement("afterend", summary);
    }
    summary.innerHTML =
      '<div class="d-flex justify-content-between mb-3"><strong>Subtotal</strong><strong>' +
      formatMoney(subtotal) +
      '</strong></div><a class="btn-main fx-slide w-100" href="shop.html"><span>Continue Shopping</span></a>';

    cartWrap.querySelectorAll("[data-cart-action]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        var cartIndex = Number(button.getAttribute("data-cart-index"));
        var action = button.getAttribute("data-cart-action");
        var currentCart = getCart();
        var target = currentCart[cartIndex];
        if (!target) {
          return;
        }
        upsertCart(target, action === "plus" ? 1 : -1);
      });
    });
  }

  function inferCategory(productName) {
    var name = productName.toLowerCase();
    if (name.indexOf("wheel") !== -1 || name.indexOf("tire") !== -1) {
      return "wheel_cleaners";
    }
    if (name.indexOf("interior") !== -1) {
      return "interior_cleaners";
    }
    if (name.indexOf("wax") !== -1 || name.indexOf("polish") !== -1) {
      return "wax_polish";
    }
    if (name.indexOf("towel") !== -1 || name.indexOf("microfiber") !== -1) {
      return "accessories";
    }
    if (name.indexOf("ceramic") !== -1 || name.indexOf("coating") !== -1) {
      return "ceramic_protection";
    }
    if (name.indexOf("engine") !== -1 || name.indexOf("degreaser") !== -1) {
      return "engine_cleaners";
    }
    return "car_wash";
  }

  function collectProductCards() {
    var cards = Array.from(document.querySelectorAll(".de__pcard"));

    cards.forEach(function (card) {
      var titleNode = card.querySelector("h3");
      var priceNode = card.querySelector(".atr__main-price");
      var imageNode = card.querySelector(".atr__image-main");
      if (!titleNode || !priceNode) {
        return;
      }

      var name = titleNode.textContent.trim();
      var slug = slugify(name);
      var price = parseMoney(priceNode.textContent);
      var image = imageNode ? imageNode.getAttribute("src") : "images/shop/products/soap-1a.webp";

      card.dataset.productSlug = slug;
      card.dataset.productName = name.toLowerCase();
      card.dataset.productPrice = String(price);
      card.dataset.productCategory = inferCategory(name);

      if (!productCatalog[slug]) {
        productCatalog[slug] = {
          slug: slug,
          name: name,
          price: price,
          regularPrice: price,
          description: name + " for professional auto detailing workflows.",
          image: image,
          images: [image]
        };
      }

      card.querySelectorAll('a[href^="shop-product-single.html"]').forEach(function (link) {
        link.setAttribute("href", "shop-product-single.html?product=" + slug);
      });

      var addButton = card.querySelector(".atr__add-cart");
      if (addButton) {
        addButton.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          upsertCart(productCatalog[slug], 1);
          showToast("Product added to cart");
        });
      }

      var wishButton = card.querySelector(".atr__wish-list");
      if (wishButton) {
        wishButton.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          var added = toggleWishlist(productCatalog[slug]);
          showToast(added ? "Product added to wishlist" : "Product removed from wishlist");
        });
      }
    });
  }

  function bindShopFilters() {
    var shopSearch = document.querySelector(".de-quick-search");
    var productColumns = Array.from(document.querySelectorAll(".col-xl-3.col-lg-4.col-md-6"))
      .filter(function (col) {
        return !!col.querySelector(".de__pcard");
      });

    if (!shopSearch || !productColumns.length) {
      return;
    }

    var categoryChecks = Array.from(document.querySelectorAll('input[id^="cat_"]'));
    var minInput = document.querySelector(".input-min");
    var maxInput = document.querySelector(".input-max");
    var pageLinks = Array.from(document.querySelectorAll(".pagination .page-link"));
    var noResultNode = document.createElement("div");
    noResultNode.className = "col-12";
    noResultNode.style.display = "none";
    noResultNode.innerHTML = '<div class="p-4 rounded-1 bg-dark-2 text-center">No products matched your current filters. Try resetting your search or price range.</div>';
    var row = document.querySelector(".col-lg-9 .row.g-4");
    if (row) {
      row.appendChild(noResultNode);
    }

    var currentPage = 1;
    var pageSize = 4;
    var totalPages = 1;
    var wishlistOnlyView = getQuery("view") === "wishlist";

    if (wishlistOnlyView) {
      var heroHeading = document.querySelector("section.jarallax h1");
      if (heroHeading) {
        heroHeading.textContent = "Wishlist";
      }

      var crumbActive = document.querySelector(".crumb li.active");
      if (crumbActive) {
        crumbActive.textContent = "Wishlist";
      }
    }

    function getActiveCategories() {
      return categoryChecks
        .filter(function (input) {
          return input.checked;
        })
        .map(function (input) {
          return input.value;
        });
    }

    function applyFilterState() {
      var query = shopSearch.value.trim().toLowerCase();
      var activeCategories = getActiveCategories();
      var wishlistSlugs = getWishlist();
      var minValue = minInput ? Number(minInput.value || 0) : 0;
      var maxValue = maxInput ? Number(maxInput.value || 999999) : 999999;

      if (wishlistOnlyView) {
        noResultNode.innerHTML =
          '<div class="p-4 rounded-1 bg-dark-2 text-center">Your wishlist is empty. Add products with the heart icon to build your shortlist.</div>';
      }

      var filtered = productColumns.filter(function (col) {
        var slug = col.dataset.productSlug || "";
        var name = col.dataset.productName || "";
        var price = Number(col.dataset.productPrice || 0);
        var category = col.dataset.productCategory || "car_wash";

        var matchName = !query || name.indexOf(query) !== -1;
        var matchCategory = !activeCategories.length || activeCategories.indexOf(category) !== -1;
        var matchPrice = price >= minValue && price <= maxValue;
        var matchWishlist = !wishlistOnlyView || wishlistSlugs.indexOf(slug) !== -1;

        return matchName && matchCategory && matchPrice && matchWishlist;
      });

      totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
      if (currentPage > totalPages) {
        currentPage = 1;
      }

      productColumns.forEach(function (col) {
        col.style.display = "none";
      });

      var start = (currentPage - 1) * pageSize;
      filtered.slice(start, start + pageSize).forEach(function (col) {
        col.style.display = "";
      });

      noResultNode.style.display = filtered.length ? "none" : "";
      syncPagination();
    }

    function syncPagination() {
      var previous = pageLinks.find(function (link) {
        return link.getAttribute("aria-label") === "Previous";
      });
      var next = pageLinks.find(function (link) {
        return link.getAttribute("aria-label") === "Next";
      });
      var numbers = pageLinks.filter(function (link) {
        return /^\d+$/.test(link.textContent.trim());
      });

      numbers.forEach(function (link, index) {
        var pageNumber = index + 1;
        var item = link.closest(".page-item");
        if (!item) {
          return;
        }
        if (pageNumber > totalPages) {
          item.style.display = "none";
          return;
        }
        item.style.display = "";
        link.textContent = String(pageNumber);
        link.setAttribute("data-page", String(pageNumber));
        item.classList.toggle("active", pageNumber === currentPage);
      });

      if (previous) {
        previous.onclick = function (event) {
          event.preventDefault();
          if (currentPage > 1) {
            currentPage -= 1;
            applyFilterState();
          }
        };
      }

      if (next) {
        next.onclick = function (event) {
          event.preventDefault();
          if (currentPage < totalPages) {
            currentPage += 1;
            applyFilterState();
          }
        };
      }

      numbers.forEach(function (link) {
        link.onclick = function (event) {
          event.preventDefault();
          var selected = Number(link.getAttribute("data-page") || 1);
          currentPage = selected;
          applyFilterState();
        };
      });
    }

    shopSearch.addEventListener("input", function () {
      currentPage = 1;
      applyFilterState();
    });

    categoryChecks.forEach(function (input) {
      input.addEventListener("change", function () {
        currentPage = 1;
        applyFilterState();
      });
    });

    if (minInput) {
      minInput.addEventListener("input", function () {
        currentPage = 1;
        applyFilterState();
      });
    }

    if (maxInput) {
      maxInput.addEventListener("input", function () {
        currentPage = 1;
        applyFilterState();
      });
    }

    applyFilterState();
  }

  function rewriteServiceLinks() {
    var map = {
      "Exterior Hand Wash & Wax": "exterior-hand-wash-wax",
      "Interior Deep Cleaning": "interior-deep-cleaning",
      "Paint Correction": "paint-correction",
      "Ceramic Coating Protection": "ceramic-coating-protection",
      "Engine Bay Detailing": "engine-bay-detailing",
      "Headlight Restoration": "headlight-restoration"
    };

    document.querySelectorAll('a[href="service-single.html"]').forEach(function (link) {
      var direct = map[link.textContent.trim()];
      if (direct) {
        link.setAttribute("href", "/service-single?service=" + direct);
        return;
      }

      if (!/view details/i.test(link.textContent)) {
        return;
      }

      var card = link.closest(".bg-dark-2, .rounded-1, .de-item, .col-lg-4, .col-md-4");
      var title = card ? card.querySelector("h3") : null;
      var slug = title ? map[title.textContent.trim()] : null;
      if (slug) {
        link.setAttribute("href", "/service-single?service=" + slug);
      }
    });
  }

  function enhanceServiceSingle() {
    if (!/\/service-single(?:\.html)?$/i.test(window.location.pathname)) {
      return;
    }

    var slug = getQuery("service") || "ceramic-coating-protection";
    var data = SERVICE_DATA[slug] || SERVICE_DATA["ceramic-coating-protection"];

    var subtitle = document.querySelector("section.no-top.no-bottom .subtitle.id-color");
    var title = document.querySelector("section.no-top.no-bottom h1");
    var intro = document.querySelector("section.no-top.no-bottom p");
    var image = document.querySelector("section.no-top.no-bottom .image");

    if (subtitle) subtitle.textContent = data.subtitle;
    if (title) title.textContent = data.title;
    if (intro) intro.textContent = data.description;
    if (image) image.setAttribute("data-bgimage", "url(" + data.heroImage + ") center");

    var crumbActive = document.querySelector(".crumb li.active");
    if (crumbActive) crumbActive.textContent = data.title;

    var lists = document.querySelectorAll(".col-md-4 .ul-check");
    if (lists.length >= 3) {
      lists[0].innerHTML = data.includes.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("");
      lists[1].innerHTML = data.benefits.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("");
      lists[2].innerHTML = data.idealFor.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("");
    }
  }

  function rewriteCarLinks() {
    document.querySelectorAll('a[href="car-single.html"]').forEach(function (link) {
      var heading = link.querySelector("h3") || link.closest(".item, .col-lg-4, .col-md-6")?.querySelector("h3");
      if (!heading) {
        return;
      }
      var slug = slugify(heading.textContent.trim());
      if (slug) {
        link.setAttribute("href", "/car-single?car=" + slug);
      }
    });
  }

  function enhanceCarSingle() {
    if (!/\/car-single(?:\.html)?$/i.test(window.location.pathname)) {
      return;
    }

    var slug = getQuery("car") || "bmw-x5";
    var data = CAR_DATA[slug] || CAR_DATA["bmw-x5"];

    var heroTitle = document.querySelector("section.jarallax h1");
    if (heroTitle) heroTitle.textContent = data.title;

    var heroImage = document.querySelector("section.jarallax .jarallax-img");
    if (heroImage) heroImage.setAttribute("src", data.heroImage);

    var crumbLink = document.querySelector('.crumb li a[href="car-list.html"]');
    if (crumbLink) {
      crumbLink.setAttribute("href", "car-listing.html");
      crumbLink.textContent = "Our Cars";
    }

    var crumbActive = document.querySelector(".crumb li.active");
    if (crumbActive) crumbActive.textContent = data.title;

    var metricCols = document.querySelectorAll(
      ".row.g-4.text-white.text-center.fs-16.justify-content-between.align-items-center > div"
    );

    data.metrics.forEach(function (metric, index) {
      var col = metricCols[index];
      if (!col) return;
      var icon = col.querySelector("img");
      if (icon) {
        col.innerHTML = "";
        col.appendChild(icon);
        col.appendChild(document.createTextNode(" " + metric));
      }
    });

    var priceNode = document.querySelector(".row.g-4.text-white h2.fs-40");
    if (priceNode) priceNode.textContent = data.price;

    var description = document.querySelector("section .container .row p");
    if (description) description.textContent = data.description;

    var specLists = document.querySelectorAll("h3.mt-4.mb-3 + .row .ul-check");
    if (specLists.length >= 2) {
      specLists[0].innerHTML = data.specsLeft.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("");
      specLists[1].innerHTML = data.specsRight.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("");
    }

    var dealerTitle = document.querySelector("section.jarallax h4");
    if (dealerTitle) dealerTitle.textContent = "Velocare Sales Desk";

    var contactForm = document.querySelector('form#contact_form[data-local-form="contact"]');
    if (contactForm) {
      var message = contactForm.querySelector("textarea#message");
      if (message && !message.value.trim()) {
        message.value = "I am interested in " + data.title + ". Please share availability and next steps.";
      }
    }
  }

  function rewriteBlogLinks() {
    document.querySelectorAll('a[href="blog-single.html"]').forEach(function (link) {
      var heading = link.querySelector("h4") || link.closest(".d-content, .de-flex, .rounded-1, .widget")?.querySelector("h4");
      if (!heading) {
        return;
      }
      var slug = slugify(heading.textContent.trim());
      if (slug) {
        link.setAttribute("href", "blog-single.html?post=" + slug);
      }
    });
  }

  function enhanceBlogSingle() {
    if (!window.location.pathname.endsWith("/blog-single.html")) {
      return;
    }

    var slug = getQuery("post") || "ceramic-coating-benefits-what-every-car-owner-should-know";
    var data = BLOG_DATA[slug] || BLOG_DATA["ceramic-coating-benefits-what-every-car-owner-should-know"];

    var heroHeading = document.querySelector("section.jarallax h2");
    if (heroHeading) heroHeading.textContent = data.title;

    var crumb = document.querySelector(".crumb li.active");
    if (crumb) crumb.textContent = data.title;

    var intro = document.querySelector(".blog-read > p");
    if (intro) intro.textContent = data.intro;

    var image = document.querySelector(".blog-read img.w-100");
    if (image && data.image) {
      image.setAttribute("src", data.image);
      image.setAttribute("alt", data.title);
    }

    var form = document.querySelector("#comment-form-wrapper form");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");
      var errorEmail = form.querySelector("#error_email");
      var errorMessage = form.querySelector("#error_message");
      var success = form.querySelector("#mail_success");
      var failed = form.querySelector("#mail_failed");

      var emailValid = /.+@.+\..+/.test((email && email.value.trim()) || "");
      var messageValid = !!(message && message.value.trim());
      var nameValid = !!(name && name.value.trim());

      if (errorEmail) errorEmail.style.display = emailValid ? "none" : "block";
      if (errorMessage) errorMessage.style.display = messageValid ? "none" : "block";
      if (failed) failed.style.display = "none";

      if (!nameValid || !emailValid || !messageValid) {
        return;
      }

      if (success) success.style.display = "block";
      form.reset();
      window.setTimeout(function () {
        if (success) success.style.display = "none";
      }, 2500);
    });
  }

  function rewriteProductSingleLinks() {
    document.querySelectorAll('a[href="shop-product-single.html"]').forEach(function (link) {
      var card = link.closest(".de__pcard");
      var title = card ? card.querySelector("h3") : null;
      if (!title) {
        return;
      }
      var slug = slugify(title.textContent.trim());
      if (slug) {
        link.setAttribute("href", "shop-product-single.html?product=" + slug);
      }
    });
  }

  function enhanceShopProductSingle() {
    if (!window.location.pathname.endsWith("/shop-product-single.html")) {
      return;
    }

    var slug = getQuery("product") || "premium-microfiber-cleaning-towel";
    var product = productCatalog[slug];

    if (!product) {
      product = {
        slug: slug,
        name: slug.replace(/-/g, " "),
        price: parseMoney(document.querySelector("h3.fs-32")?.textContent || 0),
        regularPrice: parseMoney(document.querySelector("h3.fs-24")?.textContent || 0),
        description: "High-performance product configured for professional detailing workflows.",
        image: document.querySelector("#sync1 .item img")?.getAttribute("src") || "images/shop/products/soap-1a.webp",
        images: [document.querySelector("#sync1 .item img")?.getAttribute("src") || "images/shop/products/soap-1a.webp"]
      };
      productCatalog[slug] = product;
    }

    var title = document.querySelector("h2.fs-40");
    var description = document.querySelector("h2.fs-40 + p");
    var price = document.querySelector("h3.fs-32");
    var regular = document.querySelector("h3.fs-24");

    if (title) title.textContent = product.name;
    if (description) description.textContent = product.description;
    if (price) price.textContent = formatMoney(product.price);
    if (regular) regular.textContent = formatMoney(product.regularPrice || product.price);

    var galleryMain = document.querySelector("#sync1");
    var galleryThumb = document.querySelector("#sync2");
    if (galleryMain && galleryThumb && product.images && product.images.length) {
      var imageMarkup = product.images
        .map(function (img) {
          return '<div class="item"><img src="' + img + '" class="w-100" alt="' + product.name + '"></div>';
        })
        .join("");
      galleryMain.innerHTML = imageMarkup;
      galleryThumb.innerHTML = imageMarkup;
    }

    var quantityInput = document.querySelector(".group .de-number input");
    var addButton = document.querySelector("a.btn-main.fx-slide.mt-4.w-100");
    if (addButton) {
      addButton.setAttribute("href", "#");
      addButton.addEventListener("click", function (event) {
        event.preventDefault();
        var quantity = Number(quantityInput ? quantityInput.value : 1);
        quantity = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
        upsertCart(product, quantity);
        showToast("Product added to cart");
      });
    }
  }

  function bindLocalForms() {
    var contactForms = Array.from(document.querySelectorAll('form[data-local-form="contact"]'));
    var bookingForms = Array.from(document.querySelectorAll('form[data-local-form="booking"]'));

    contactForms.forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = form.querySelector("#name");
        var email = form.querySelector("#email");
        var phone = form.querySelector("#phone");
        var message = form.querySelector("#message");

        var valid = true;
        [name, email, phone, message].forEach(function (field) {
          if (!field) return;
          var ok = !!field.value.trim();
          if (field.id === "email") {
            ok = /.+@.+\..+/.test(field.value.trim());
          }
          field.classList.toggle("error_input", !ok);
          if (!ok) valid = false;
        });

        var success = form.querySelector("#success_message");
        var error = form.querySelector("#error_message");

        if (!valid) {
          if (error) error.style.display = "block";
          if (success) success.style.display = "none";
          return;
        }

        if (error) error.style.display = "none";
        if (success) success.style.display = "block";
        form.reset();
      });
    });

    bookingForms.forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var required = Array.from(form.querySelectorAll("#service, #date input, #time, #name, #email, #phone"));
        var valid = true;

        required.forEach(function (field) {
          var value = (field.value || "").trim();
          var ok = !!value && value !== "Select Date" && value !== "Select Service" && value !== "Select Time";
          if (field.id === "email") {
            ok = /.+@.+\..+/.test(value);
          }
          field.classList.toggle("error_input", !ok);
          if (!ok) valid = false;
        });

        var success = document.getElementById("success_message_col");
        var error = document.getElementById("error_message");

        if (!valid) {
          if (error) error.style.display = "block";
          if (success) success.style.display = "none";
          return;
        }

        if (error) error.style.display = "none";
        if (success) success.style.display = "block";
        form.style.display = "none";
      });
    });
  }

  function seedContactFromQuery() {
    if (!window.location.pathname.endsWith("/contact.html")) {
      return;
    }

    var topic = getQuery("topic");
    if (!topic) {
      return;
    }

    var role = getQuery("role");
    var message = document.querySelector('form[data-local-form="contact"] #message');
    if (message && !message.value.trim()) {
      if (topic === "careers") {
        message.value = "I want to apply for a role at Velocare Auto Studio" + (role ? ": " + role : ".");
      }
    }
  }

  function humanizeSlug(value) {
    return String(value || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
      });
  }

  function enhanceCarListing() {
    if (!window.location.pathname.endsWith("/car-listing.html")) {
      return;
    }

    var type = getQuery("type");
    if (!type) {
      return;
    }

    var cards = Array.from(document.querySelectorAll(".col-lg-4.col-md-6")).filter(function (card) {
      return !!card.querySelector('a[href*="car-single"]');
    });

    if (!cards.length) {
      return;
    }

    var normalizedType = slugify(type);
    var visibleCount = 0;

    cards.forEach(function (card) {
      var typeNode = card.querySelector("small");
      var cardType = slugify(typeNode ? typeNode.textContent : "");
      var visible = cardType.indexOf(normalizedType) !== -1 || normalizedType.indexOf(cardType) !== -1;
      card.style.display = visible ? "" : "none";
      if (visible) {
        visibleCount += 1;
      }
    });

    var heading = document.querySelector("section h1");
    if (heading) {
      heading.textContent = "Our Cars - " + humanizeSlug(normalizedType);
    }

    var listRow = document.querySelector("section .container .row.g-4");
    if (!listRow) {
      return;
    }

    var emptyState = document.getElementById("car-listing-empty-state");
    if (!emptyState) {
      emptyState = document.createElement("div");
      emptyState.id = "car-listing-empty-state";
      emptyState.className = "col-12";
      emptyState.innerHTML =
        '<div class="p-4 rounded-1 bg-dark-2 text-center">No vehicles currently match this type filter. Please try another category.</div>';
      listRow.appendChild(emptyState);
    }
    emptyState.style.display = visibleCount ? "none" : "";
  }

  function setSocialLink(link, url) {
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  }

  function resolvePlaceholderLinks() {
    var placeholders = Array.from(document.querySelectorAll('a[href="#"]'));

    placeholders.forEach(function (link) {
      if (link.id === "back-to-top") {
        return;
      }

      if (link.hasAttribute("data-filter") || link.closest(".de-gallery-filter")) {
        return;
      }

      if (link.classList.contains("btn-next") || link.classList.contains("btn-prev") || link.closest(".owl-custom-nav")) {
        return;
      }

      if (link.getAttribute("data-bs-toggle") || link.getAttribute("data-bs-target") || link.closest(".pagination")) {
        return;
      }

      if (link.classList.contains("menu-item") && link.nextElementSibling && link.nextElementSibling.tagName === "UL") {
        return;
      }

      var text = (link.textContent || "").trim().toLowerCase();
      var icon = link.querySelector("i");
      var iconClass = icon ? icon.className : "";

      if (iconClass.indexOf("fa-facebook-f") !== -1) {
        setSocialLink(link, "https://www.facebook.com/velocareauto");
        return;
      }

      if (iconClass.indexOf("fa-x-twitter") !== -1) {
        setSocialLink(link, "https://x.com/velocareauto");
        return;
      }

      if (iconClass.indexOf("fa-instagram") !== -1) {
        setSocialLink(link, "https://www.instagram.com/velocareauto");
        return;
      }

      if (link.classList.contains("de-icon-counter") && link.querySelector('img[src*="heart.svg"]')) {
        link.setAttribute("href", "shop.html?view=wishlist");
        return;
      }

      if (text === "reply") {
        link.setAttribute("href", "#comment-form-wrapper");
        return;
      }

      if (/appointment|book now|book service|schedule/i.test(text)) {
        link.setAttribute("href", "appointment.html");
        return;
      }

      if (/contact/i.test(text)) {
        link.setAttribute("href", "contact.html");
        return;
      }

      if (link.className.indexOf("d-block text-center p-5 px-0 rounded-1 hover bg-dark-2") !== -1) {
        var typeNode = link.querySelector("h5");
        var typeSlug = slugify(typeNode ? typeNode.textContent : "all");
        link.setAttribute("href", "car-listing.html?type=" + encodeURIComponent(typeSlug));
        return;
      }

      if (link.className.indexOf("d-block hover relative overflow-hidden text-light") !== -1) {
        link.setAttribute("href", "gallery.html");
      }
    });
  }

  function canonicalizeCarListingLinks() {
    document.querySelectorAll('a[href="car-list.html"]').forEach(function (link) {
      link.setAttribute("href", "car-listing.html");
    });
  }

  function removeTemplateDemoControls() {
    ["buy-now", "selector"].forEach(function (id) {
      var node = document.getElementById(id);
      if (node) {
        node.remove();
      }
    });
  }

  function applyAppMetadataBranding() {
    if (!document.title || document.title.indexOf("Velocare Auto Studio") !== -1) {
      return;
    }
    document.title = document.title.replace(/AutoDetail/gi, "Velocare Auto Studio");
  }

  function boot() {
    if (window.jQuery) {
      window.jQuery(".de__pcard .atr__wish-list").off("click");
      window.jQuery(".de__pcard .atr__add-cart").off("click");
    }

    applyAppMetadataBranding();
    removeTemplateDemoControls();
    canonicalizeCarListingLinks();
    rewriteServiceLinks();
    rewriteCarLinks();
    rewriteBlogLinks();
    resolvePlaceholderLinks();

    collectProductCards();
    rewriteProductSingleLinks();

    enhanceServiceSingle();
    enhanceCarListing();
    enhanceCarSingle();
    enhanceBlogSingle();
    enhanceShopProductSingle();

    bindLocalForms();
    seedContactFromQuery();

    bindShopFilters();
    updateCounters();
    renderCartDrawer();
    updateWishlistButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
