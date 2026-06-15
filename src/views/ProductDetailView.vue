<template>
  <div class="product-detail-page" v-if="product">
    <Header />

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item><a @click="$router.push('/')">Home</a></a-breadcrumb-item>
        <a-breadcrumb-item><a @click="$router.push('/products-solutions')">Products & Solutions</a></a-breadcrumb-item>
        <a-breadcrumb-item><a @click="$router.push(`/products-solutions?category=${product.category}`)">{{ product.categoryName }}</a></a-breadcrumb-item>
        <a-breadcrumb-item>{{ product.code }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- Product Hero -->
    <section class="product-hero">
      <div class="product-hero-container">
        <!-- 左侧图片区域 - sticky -->
        <div class="product-image-section" v-motion-slide-visible-left :delay="100">
          <div class="product-gallery">
            <a-carousel
              v-if="productGallery.length > 1"
              ref="galleryCarousel"
              arrows
              autoplay
              class="product-carousel"
              :initial-slide="0"
              @change="onCarouselChange"
            >
              <template #customPaging>
                <a class="carousel-dot" />
              </template>
              <div v-for="(img, idx) in productGallery" :key="idx" class="gallery-slide">
                <img :src="img" :alt="`${product.name} - image ${idx + 1}`" class="gallery-image" @error="onGalleryImgError" />
              </div>
            </a-carousel>
            <img v-else :src="product.image" :alt="product.name" class="main-product-image" @error="onGalleryImgError" />
            <!-- Thumbnail navigation strip (works for all products, any number of gallery images) -->
            <div v-if="productGallery.length > 1" class="gallery-thumbs">
              <button
                v-for="(img, idx) in productGallery"
                :key="idx"
                type="button"
                class="gallery-thumb"
                :class="{ 'is-active': activeSlideIdx === idx }"
                :aria-label="`Show image ${idx + 1}`"
                @click="goToSlide(idx)"
              >
                <img :src="img" :alt="`${product.name} thumbnail ${idx + 1}`" @error="onGalleryImgError" />
              </button>
            </div>
          </div>
          <div class="product-badges" v-if="!product.isVesper">
            <span v-if="product.inStock" class="stock-badge stock-badge--in-stock">In Stock</span>
            <span v-if="product.isBestSeller" class="stock-badge stock-badge--best">Best Seller</span>
            <span v-if="product.isNew" class="stock-badge stock-badge--new">New Release</span>
          </div>
          <!-- Share buttons -->
          <div class="share-section">
            <span class="share-label">Share:</span>
            <a-button type="text" shape="circle" @click="shareProduct('twitter')">
              <TwitterOutlined />
            </a-button>
            <a-button type="text" shape="circle" @click="shareProduct('facebook')">
              <FacebookOutlined />
            </a-button>
            <a-button type="text" shape="circle" @click="shareProduct('linkedin')">
              <LinkedinOutlined />
            </a-button>
          </div>
        </div>

        <!-- 右侧信息区域 -->
        <div class="product-info-section" v-motion-slide-visible-right :delay="200">
          <div class="product-category-link">
            <a @click="$router.push(`/products-solutions?category=${product.category}`)">{{ product.categoryName }}</a>
          </div>
          <h1 class="product-title">{{ product.code }} {{ product.name }}</h1>
          <p class="product-tagline">{{ product.tagline || product.description }}</p>

          <!-- Feature badges -->
          <div class="feature-badges">
            <span v-for="badge in getBadges(product)" :key="badge" class="feature-badge">{{ badge }}</span>
          </div>

          <!-- Product accordion -->
          <a-collapse v-model:activeKey="productAccordionKeys" class="product-accordion" expand-icon-position="end">
            <a-collapse-panel key="why" header="Why You'll Choose It">
              <ul class="product-why-list">
                <li v-for="(reason, idx) in productWhyReasons" :key="idx">
                  <CheckCircleOutlined class="why-icon" /> {{ reason }}
                </li>
              </ul>
            </a-collapse-panel>
            <a-collapse-panel key="features" header="Features">
              <ul class="product-features-list">
                <li v-for="(feature, idx) in product.features" :key="idx">
                  <CheckCircleOutlined class="feature-icon" /> {{ feature }}
                </li>
              </ul>
            </a-collapse-panel>
          </a-collapse>

          <!-- CTA Buttons -->
          <div class="product-cta-buttons">
            <a-button type="primary" size="large" class="btn-pill-primary" @click="openWhatsAppDemo">
              <CalendarOutlined /> Request a Demo
            </a-button>
            <a-button size="large" class="btn-pill" @click="openWhatsApp">
              <MessageOutlined /> Get a Quote
            </a-button>
          </div>

          <!-- Support links -->
          <div class="support-links">
            <a-button type="link" @click="scrollToSpecs">
              <TableOutlined /> View Specifications
            </a-button>
            <a-button type="link" @click="$router.push('/contact_us')">
              <PhoneOutlined /> Contact Us
            </a-button>
            <a-button type="link" @click="$router.push('/support')">
              <CustomerServiceOutlined /> Product Support
            </a-button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Vesper-Exclusive Sections (v-if="product.isVesper") ===== -->
    <template v-if="product.isVesper">

      <!-- 1. Slope Hero Strip -->
      <section class="mow-slope-strip">
        <div class="section-container">
          <div class="slope-strip-grid">
            <div class="slope-stat-card">
              <div class="slope-stat-label">Max Slope</div>
              <div class="slope-stat-value">{{ getMowSpec('Max Slope') || '—' }}</div>
              <div class="slope-stat-sub">All-Wheel Beast Drive</div>
            </div>
            <div class="slope-stat-card">
              <div class="slope-stat-label">Cutting Width</div>
              <div class="slope-stat-value">{{ getMowSpec('Cutting Width') || '—' }}</div>
              <div class="slope-stat-sub">53 cm deck, dense-grass ready</div>
            </div>
            <div class="slope-stat-card">
              <div class="slope-stat-label">Peak Cutting Power</div>
              <div class="slope-stat-value">{{ getMowSpec('Peak Cutting Power') || '—' }}</div>
              <div class="slope-stat-sub">8.13 N·m torque</div>
            </div>
            <div class="slope-stat-card">
              <div class="slope-stat-label">Coverage / Charge</div>
              <div class="slope-stat-value">4500 ㎡</div>
              <div class="slope-stat-sub">18Ah LiFePO₄</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 1.5 Then vs. Now -->
      <section class="mow-then-now">
        <div class="section-container">
          <div class="performance-eyebrow">Then vs. Now</div>
          <h2 class="section-title">Weekend Yard Work, Reimagined</h2>
          <div class="then-now-grid">
            <div class="then-now-card">
              <img src="/images/vesper/box/compare-before.webp" alt="Before: Back pain and hassle" class="then-now-img" />
              <p class="then-now-label">Before: Back Pain & Hassle</p>
            </div>
            <div class="then-now-card">
              <img src="/images/vesper/box/compare-after.webp" alt="After: Effortless and efficient" class="then-now-img" />
              <p class="then-now-label">Now: Effortless & Efficient</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. No RTK / No App / No Fuel -->
      <section class="mow-no-friction">
        <div class="section-container">
          <h2 class="section-title">Ready in Seconds</h2>
          <p class="mow-section-lead">No base station, no app pairing, no fuel storage — pick up the remote and mow.</p>
          <div class="no-friction-grid">
            <div class="no-friction-card">
              <img src="/images/vesper/no-rtk.webp" alt="No RTK required" />
              <h3>No RTK</h3>
              <p>Skip the base station and survey. Mow straight out of the box.</p>
            </div>
            <div class="no-friction-card">
              <img src="/images/vesper/no-app.webp" alt="No app required" />
              <h3>No App</h3>
              <p>Skip the Bluetooth pairing and firmware updates. The remote is the controller.</p>
            </div>
            <div class="no-friction-card">
              <img src="/images/vesper/no-fuel.webp" alt="No fuel required" />
              <h3>No Fuel</h3>
              <p>No petrol, no exhaust, no oil. Charge the battery and mow — quietly, cleanly.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 2.5 Your Lawn. Your RC Track -->
      <section class="mow-rc-track">
        <div class="section-container">
          <div class="performance-grid performance-flip">
            <div class="performance-content">
              <div class="performance-eyebrow">Your Lawn. Your RC Track</div>
              <h2 class="performance-headline">Stay in the Shade. Grab a Cold Drink. Flick the Sticks.</h2>
              <p class="performance-lead">Power on. Grab the remote. Start mowing in seconds. No pushing, no walking behind a hot machine, no gas fumes. The DJI-grade remote gives you a 5ms response and 400 m range — steer around trees, cut tight corners, and navigate slopes from the comfort of your porch. Yard work finally feels like a game.</p>
              <ul class="performance-bullets">
                <li><CheckCircleOutlined /> DJI-grade remote: 5ms response, interference-resistant signal, 400 m range</li>
                <li><CheckCircleOutlined /> One-touch straight-line and one-touch turning for efficient mowing patterns</li>
                <li><CheckCircleOutlined /> Sit anywhere — porch, shade tree, or office window — and mow the entire property</li>
              </ul>
            </div>
            <div class="performance-image">
              <img src="/images/vesper/box/rc-track.webp" alt="RC remote control mowing from the shade" />
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Scenarios Grid (6 use cases) -->
      <section class="mow-scenarios">
        <div class="section-container">
          <h2 class="section-title">Where Others Stop, You Begin</h2>
          <p class="mow-section-lead">Six terrain types that defeat walk-behind and smart mowers — conquered by the {{ product.code }}.</p>
          <div class="scenarios-grid">
            <div class="scenario-card">
              <div class="scenario-image"><img src="/images/vesper/waterfront.webp" alt="Waterfront Grass" /></div>
              <h3>Waterfront Grass</h3>
            </div>
            <div class="scenario-card">
              <div class="scenario-image"><img src="/images/vesper/narrow.webp" alt="Narrow Side Yards" /></div>
              <h3>Narrow Side Yards</h3>
            </div>
            <div class="scenario-card">
              <div class="scenario-image"><img src="/images/vesper/woods.webp" alt="Dense Woods" /></div>
              <h3>Dense Woods</h3>
            </div>
            <div class="scenario-card">
              <div class="scenario-image"><img src="/images/vesper/muddy.webp" alt="Muddy Wet Patches" /></div>
              <h3>Muddy Wet Patches</h3>
            </div>
            <div class="scenario-card">
              <div class="scenario-image"><img src="/images/vesper/roots.webp" alt="Exposed Tree Roots" /></div>
              <h3>Exposed Tree Roots</h3>
            </div>
            <div class="scenario-card">
              <div class="scenario-image"><img src="/images/vesper/roadside.webp" alt="Roadside Lawn Strips" /></div>
              <h3>Roadside Lawn Strips</h3>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Engineering Features (3-col) -->
      <section class="mow-engineering">
        <div class="section-container">
          <h2 class="section-title">Engineered to Perform</h2>
          <p class="mow-section-lead">Three core systems working together: drive, traction, and torque control.</p>
          <div class="engineering-grid">
            <div class="engineering-card">
              <div class="engineering-num">01</div>
              <h3>4-Motor AWD</h3>
              <p>Four independent brushless motors deliver 1000W of traction output. Each wheel is controlled separately for maximum grip on slopes, mud, and uneven ground.</p>
            </div>
            <div class="engineering-card">
              <div class="engineering-num">02</div>
              <h3>TPU Tread Wheels</h3>
              <p>12mm non-directional tread teeth, semi-solid TPU. Puncture-free construction that holds traction on wet grass, loose soil, and loose gravel.</p>
            </div>
            <div class="engineering-card">
              <div class="engineering-num">03</div>
              <h3>FOC Torque Control</h3>
              <p>Field-Oriented Control with electronic braking and 5ms response. Maintains cutting torque through thick patches without stalling the blade.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4.5 Spring to Fall. One Machine -->
      <section class="mow-spring-fall">
        <div class="section-container">
          <div class="performance-eyebrow">Spring to Fall. One Machine</div>
          <h2 class="section-title">From the First Spring Mow to the Last Fall Cleanup</h2>
          <p class="mow-section-lead">Discharge heavy spring growth. Mulch summer clippings back into the soil. Bag autumn leaves. Shred windfall into fine mulch. One machine replaces your mower, rake, blower, and chipper — all year round.</p>
          <div class="spring-fall-grid">
            <div class="spring-fall-card">
              <div class="sf-icon">🌱</div>
              <h3>Spring</h3>
              <p>High-lift blade stands grass up for a clean first cut. 1985W peak power handles fast spring growth without clogging.</p>
            </div>
            <div class="spring-fall-card">
              <div class="sf-icon">☀️</div>
              <h3>Summer</h3>
              <p>Mulching mode returns fine clippings as natural fertilizer. Keep your lawn green through the heat — no bagging, no waste.</p>
            </div>
            <div class="spring-fall-card">
              <div class="sf-icon">🍂</div>
              <h3>Autumn</h3>
              <p>931 CFM leaf-shredding vacuum with 70 L bag. Rake-free leaf cleanup — lift, shred, and collect in one pass.</p>
            </div>
            <div class="spring-fall-card">
              <div class="sf-icon">❄️</div>
              <h3>Winter Prep</h3>
              <p>Final cut before dormancy. 5 adjustable heights (1.5–4.3") for the ideal overwintering length. Store with 70% charge — ready for spring.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Tall Grass Performance -->
      <section class="mow-performance">
        <div class="section-container">
          <div class="performance-grid">
            <div class="performance-content">
              <div class="performance-eyebrow">Peak Power</div>
              <h2 class="performance-headline">1985W Peak Cutting Power</h2>
              <p class="performance-lead">8.13 N·m of cutting torque chews through 1.3 m tall, matted, wet grass without bogging down. The high-lift blade creates strong airflow that stands grass up for a clean, even cut on the first pass.</p>
              <ul class="performance-bullets">
                <li><CheckCircleOutlined /> 1.3 m max tall-grass height</li>
                <li><CheckCircleOutlined /> 8.13 N·m cutting torque</li>
                <li><CheckCircleOutlined /> High-lift blade for strong airflow</li>
                <li><CheckCircleOutlined /> No stalling on wet or matted patches</li>
              </ul>
            </div>
            <div class="performance-image">
              <img src="/images/vesper/tall-grass.webp" alt="Tall grass performance" />
            </div>
          </div>
        </div>
      </section>

      <!-- 5.5 Just Rained? Doesn't Matter -->
      <section class="mow-wet-grass mow-vacuum-flip">
        <div class="section-container">
          <div class="performance-grid performance-flip">
            <div class="performance-content">
              <div class="performance-eyebrow">Just Rained? Doesn't Matter</div>
              <h2 class="performance-headline">Wet Grass Is Finally Not a Problem</h2>
              <p class="performance-lead">Front-to-rear airflow combined with a high-lift blade creates powerful under-deck suction that lifts rain-soaked grass, cuts it clean, and directs clippings into the bag. No clumps. No mess. No mold.</p>
              <ul class="performance-bullets">
                <li><CheckCircleOutlined /> High-volume under-deck airflow lifts matted, wet grass for a clean cut</li>
                <li><CheckCircleOutlined /> Powerful suction directs clippings into the bag — no wet clumps left behind</li>
                <li><CheckCircleOutlined /> 1985W peak power cuts through rain-soaked growth without bogging</li>
              </ul>
            </div>
            <div class="performance-image">
              <video autoplay muted loop playsinline preload="metadata" poster="https://mowrator.com/cdn/shop/files/preview_images/7cc4ef504c2243feae8b8e8162b7bb7f.thumbnail.0000000000_small.jpg?v=1778675370" class="section-video">
                <source src="https://mowrator.com/cdn/shop/videos/c/vp/7cc4ef504c2243feae8b8e8162b7bb7f/7cc4ef504c2243feae8b8e8162b7bb7f.HD-1080p-4.8Mbps-84021522.mp4?v=0" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
      </section>

      <!-- 5.6 Tough Grass? No Problem -->
      <section class="mow-tough-grass">
        <div class="section-container">
          <div class="performance-grid">
            <div class="performance-image">
              <video autoplay muted loop playsinline preload="metadata" poster="https://mowrator.com/cdn/shop/files/preview_images/794f8e4485d84bb98cd01c64c13da980.thumbnail.0000000000_small.jpg?v=1740550695" class="section-video">
                <source src="https://mowrator.com/cdn/shop/videos/c/vp/794f8e4485d84bb98cd01c64c13da980/794f8e4485d84bb98cd01c64c13da980.HD-720p-1.6Mbps-43240723.mp4?v=0" type="video/mp4">
              </video>
            </div>
            <div class="performance-content">
              <div class="performance-eyebrow">Tough Grass? No Problem</div>
              <h2 class="performance-headline">Thick, Stubborn, Overgrown — All in One Pass</h2>
              <p class="performance-lead">High-volume airflow and a mulching blade keep clippings suspended longer under the deck for finer, more even shredding. The result: tiny particles that break down into natural lawn fertilizer — no visible clumps, no bagging required.</p>
              <ul class="performance-bullets">
                <li><CheckCircleOutlined /> Mulching mode returns nutrients to your soil — free, natural fertilizer</li>
                <li><CheckCircleOutlined /> 6.0 ft-lbs cutting torque powers through thick, stubborn grass types</li>
                <li><CheckCircleOutlined /> Rear discharge for fast cleanup of overgrown areas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Leaf Vacuum & Fall Cleanup -->
      <section class="mow-vacuum mow-vacuum-flip">
        <div class="section-container">
          <div class="performance-grid performance-flip">
            <div class="performance-image">
              <img src="/images/vesper/vacuum.webp" alt="Leaf vacuum and mulching" />
            </div>
            <div class="performance-content">
              <div class="performance-eyebrow">Multi-Season</div>
              <h2 class="performance-headline">Drop the Rake. Fall Is Handled.</h2>
              <p class="performance-lead">4-in-1 mowing: Discharge, Mulch, Bag, and the 931 CFM Leaf-Shredding Vacuum. The 70 L collection bag turns autumn leaves into fine mulch in one pass — replace the rake, blower, and chipper with a single machine.</p>
              <ul class="performance-bullets">
                <li><CheckCircleOutlined /> 931 CFM suction</li>
                <li><CheckCircleOutlined /> 70 L collection bag</li>
                <li><CheckCircleOutlined /> Mulch leaves and grass in one pass</li>
                <li><CheckCircleOutlined /> Switch modes in seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. Speed & Efficiency Comparison -->
      <section class="mow-speed">
        <div class="section-container">
          <h2 class="section-title">Get Yard Care Done in 1/3 the Time</h2>
          <p class="mow-section-lead">2000 ㎡/h coverage vs 600 ㎡/h for typical walk-behind mowers. The {{ product.code }} finishes a typical residential lawn in a single battery cycle.</p>
          <div class="speed-bars">
            <div class="speed-row">
              <div class="speed-label">{{ product.code }}</div>
              <div class="speed-bar speed-bar-mow"><span class="speed-fill" style="width: 100%;"></span><span class="speed-value">2000 ㎡/h</span></div>
            </div>
            <div class="speed-row">
              <div class="speed-label">Walk-Behind</div>
              <div class="speed-bar speed-bar-walk"><span class="speed-fill" style="width: 30%;"></span><span class="speed-value">600 ㎡/h</span></div>
            </div>
            <div class="speed-row">
              <div class="speed-label">Smart Robotic</div>
              <div class="speed-bar speed-bar-smart"><span class="speed-fill" style="width: 25%;"></span><span class="speed-value">~500 ㎡/h</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. Battery & Power -->
      <section class="mow-battery">
        <div class="section-container">
          <div class="performance-grid">
            <div class="performance-content">
              <div class="performance-eyebrow">Power</div>
              <h2 class="performance-headline">Uninterrupted Power, Single Charge</h2>
              <p class="performance-lead">56V automotive-grade LiFePO₄ battery with 1500+ cycles — 3× the industry average. Charge once and finish the whole yard, with margin for tall grass and steep slopes.</p>
              <ul class="performance-bullets">
                <li><CheckCircleOutlined /> 1500+ cycle LiFePO₄ chemistry</li>
                <li><CheckCircleOutlined /> 12Ah (3000 ㎡) or 18Ah (4500 ㎡)</li>
                <li><CheckCircleOutlined /> Smart BMS protection</li>
                <li><CheckCircleOutlined /> ~70–90 min full charge (600W)</li>
              </ul>
            </div>
            <div class="performance-image">
              <img src="/images/vesper/battery-detail.webp" alt="LiFePO4 battery" />
            </div>
          </div>
        </div>
      </section>

      <!-- 9. Safety -->
      <section class="mow-safety mow-safety-flip">
        <div class="section-container">
          <div class="performance-grid performance-flip">
            <div class="performance-image">
              <img src="/images/vesper/safety.webp" alt="360 safety system" />
            </div>
            <div class="performance-content">
              <div class="performance-eyebrow">Safety</div>
              <h2 class="performance-headline">Total Peace of Mind</h2>
              <p class="performance-lead">360° safety protection with 4 ultrasonic sensors, a front bumper, and tilt / roll-over auto-stop. The blade stops the instant the unit tips beyond a safe angle, or when an obstacle approaches.</p>
              <ul class="performance-bullets">
                <li><CheckCircleOutlined /> 4 ultrasonic sensors detect obstacles, people, pets</li>
                <li><CheckCircleOutlined /> Front bumper impact buffer</li>
                <li><CheckCircleOutlined /> Tilt & roll-over auto-stop</li>
                <li><CheckCircleOutlined /> DJI-grade 5ms response remote</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. Build Quality -->
      <section class="mow-build">
        <div class="section-container">
          <h2 class="section-title">Built Like a Tank</h2>
          <p class="mow-section-lead">Aircraft-grade aluminum chassis. DC06 deep-draw stamped steel deck. Engineered by former DJI experts for years of commercial-duty mowing.</p>
          <div class="build-grid">
            <div class="build-card">
              <div class="build-image"><img src="/images/vesper/aluminum.webp" alt="Aircraft-grade aluminum chassis" /></div>
              <h3>Aluminum Chassis</h3>
              <p>Aircraft-grade aluminum body — high clearance, corrosion-resistant, years of heavy use.</p>
            </div>
            <div class="build-card">
              <div class="build-image"><img src="/images/vesper/steel-deck.webp" alt="DC06 deep-draw steel deck" /></div>
              <h3>Steel Deck</h3>
              <p>DC06 deep-draw stamped steel — automotive-grade thickness that resists impact and abrasion.</p>
            </div>
            <div class="build-card">
              <div class="build-image"><img src="/images/vesper/remote.webp" alt="DJI-grade remote control" /></div>
              <h3>DJI-Grade Remote</h3>
              <p>5ms response, interference-resistant signal, 400m range. Engineered by former DJI experts.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 11. Support -->
      <section class="mow-support">
        <div class="section-container">
          <div class="support-grid">
            <div class="support-content">
              <div class="performance-eyebrow">Support</div>
              <h2 class="performance-headline">Worry-Free Support, Guaranteed for Years</h2>
              <p class="performance-lead">Local AU repair hubs in NSW and Victoria. 2-year warranty on main unit, remote, and battery. 30-day return policy. Modular, service-friendly design — replace blades and batteries in minutes.</p>
              <ul class="performance-bullets">
                <li><CheckCircleOutlined /> 2-year warranty (main unit, remote, battery)</li>
                <li><CheckCircleOutlined /> 30-day return policy</li>
                <li><CheckCircleOutlined /> Local AU repair hubs (NSW & Victoria)</li>
                <li><CheckCircleOutlined /> Modular parts — quick swap, no special tools</li>
              </ul>
            </div>
            <div class="support-image">
              <img src="/images/vesper/modular.webp" alt="Modular design" />
            </div>
          </div>
        </div>
      </section>

    <!-- 12. Video Demos -->
    <section class="mow-video">
      <div class="section-container">
        <div class="performance-eyebrow">See It in Action</div>
        <h2 class="section-title">Watch the S1 Work. Then Buy with Confidence</h2>
        <p class="mow-section-lead">From wet grass to fall leaves — see how the S1 handles real yard conditions with zero effort.</p>
        <div class="video-grid">
          <div class="video-card">
            <video autoplay muted loop playsinline preload="metadata" poster="https://mowrator.com/cdn/shop/files/preview_images/7cc4ef504c2243feae8b8e8162b7bb7f.thumbnail.0000000000_small.jpg?v=1778675370" class="video-player">
              <source src="https://mowrator.com/cdn/shop/videos/c/vp/7cc4ef504c2243feae8b8e8162b7bb7f/7cc4ef504c2243feae8b8e8162b7bb7f.HD-1080p-4.8Mbps-84021522.mp4?v=0" type="video/mp4">
            </video>
            <p class="video-label">Just Rained? Doesn't Matter</p>
          </div>
          <div class="video-card">
            <video autoplay muted loop playsinline preload="metadata" poster="https://mowrator.com/cdn/shop/files/preview_images/794f8e4485d84bb98cd01c64c13da980.thumbnail.0000000000_small.jpg?v=1740550695" class="video-player">
              <source src="https://mowrator.com/cdn/shop/videos/c/vp/794f8e4485d84bb98cd01c64c13da980/794f8e4485d84bb98cd01c64c13da980.HD-720p-1.6Mbps-43240723.mp4?v=0" type="video/mp4">
            </video>
            <p class="video-label">Tough Grass? No Problem — Mulching Demo</p>
          </div>
          <div class="video-card">
            <video autoplay muted loop playsinline preload="metadata" poster="https://mowrator.com/cdn/shop/files/preview_images/8d2b0f57dee04a15bceea3f1c4495137.thumbnail.0000000000_small.jpg?v=1779890413" class="video-player">
              <source src="https://mowrator.com/cdn/shop/videos/c/vp/8d2b0f57dee04a15bceea3f1c4495137/8d2b0f57dee04a15bceea3f1c4495137.HD-1080p-3.3Mbps-85058480.mp4?v=0" type="video/mp4">
            </video>
            <p class="video-label">Yard Work Is Now a Game</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 13. What's in the Box -->
    <section class="mow-in-the-box">
      <div class="section-container">
        <div class="performance-eyebrow">In the Box</div>
        <h2 class="section-title">Everything You Need to Get Started</h2>
        <p class="mow-section-lead">Your S1 ships with everything shown below — unbox, charge, and mow in minutes.</p>
        <div class="box-image-wrap">
          <img src="/images/vesper/box/in-the-box.webp" alt="What's in the box" />
        </div>
      </div>
    </section>

    <!-- 13. Customer Spotlight -->
    <section class="mow-reviews">
      <div class="section-container">
        <div class="performance-eyebrow">Customer Spotlight</div>
        <h2 class="section-title">See It in Action. Real Stories</h2>
        <p class="mow-section-lead">Hear from homeowners who've traded push mowers, back pain, and weekend yard work for the S1.</p>
        <div class="reviews-grid">
          <div class="review-card">
            <p class="review-quote">"This machine is a beast. I have a hillside in front of my house that was impossible to mow safely. The S1 climbs it like a mountain goat. Best investment I've made for my property."</p>
            <p class="review-author">— Verified Owner, 50° 4WD Model</p>
          </div>
          <div class="review-card">
            <p class="review-quote">"I am 69, and I operate the S1 on my own. No pushing, no struggling on slopes, no sweat. I sit under my tree with the remote and mow the entire property. BEST investment."</p>
            <p class="review-author">— Verified Owner, 40° 4WD Model</p>
          </div>
          <div class="review-card">
            <p class="review-quote">"Neighbors are jealous seeing me sit in the shade mowing my lawn with what looks like a giant RC car. My yard has never looked better — the cut quality is honestly better than my old ride-on."</p>
            <p class="review-author">— Verified Owner, 37° 4WD Model</p>
          </div>
          <div class="review-card">
            <p class="review-quote">"I have a spine issue, so I bought this as a tool — not a toy. It's been a game changer. I can maintain my entire property without pain. The remote is so intuitive, my grandkids figured it out in 5 minutes."</p>
            <p class="review-author">— Verified Owner, 2WD 24° Model</p>
          </div>
          <div class="review-card">
            <p class="review-quote">"The unit handles all of the slope with ease and the finish of the cut is excellent. I was skeptical about the vacuum attachment but fall cleanup is actually fun now — one pass and the leaves are gone."</p>
            <p class="review-author">— Verified Owner, 50° 4WD Model</p>
          </div>
          <div class="review-card">
            <p class="review-quote">"These machines are durable and well built. I have 1 acre with steep hills and my S1 has been running strong for months. No oil changes, no fuel, no maintenance headaches — just charge and go."</p>
            <p class="review-author">— Verified Owner, 37° 4WD Model</p>
          </div>
        </div>
      </div>
    </section>

    </template>
    <!-- ===== /Vesper-Exclusive Sections ===== -->

    <!-- Learn More Section -->
    <section class="learn-more-section" v-motion-fade-visible :delay="300">
      <div class="section-container">
        <h2 class="section-title" v-motion-slide-visible-bottom :delay="300">
          Learn More About {{ product.code }} {{ product.name }}
        </h2>
        <div class="learn-more-cards">
          <div
            v-for="(card, idx) in learnMoreCards"
            :key="idx"
            class="learn-more-card"
            :class="{ 'card-reverse': idx % 2 === 1 }"
            :style="{ animationDelay: idx * 80 + 'ms' }"
          >
            <div class="learn-more-image">
              <img :src="card.image" :alt="card.title" @error="(e: any) => e.target.src = images.fallback.products.sm200" />
            </div>
            <div class="learn-more-content">
              <h3 class="learn-more-title">{{ card.title }}</h3>
              <p class="learn-more-description">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Applications -->
    <section v-if="product.applications && product.applications.length" class="applications-section" v-motion-fade-visible :delay="500">
      <div class="section-container">
        <h2 class="section-title" v-motion-slide-visible-bottom :delay="500">Core Applications</h2>
        <a-carousel arrows :slides-to-show="appSlidesPerView" :slides-to-scroll="1" autoplay class="applications-carousel">
          <div v-for="(app, idx) in product.applications" :key="idx" class="application-slide">
            <div class="application-card">
              <div class="application-icon-wrapper">
                <img v-if="getAppImage(app)" :src="getAppImage(app)" :alt="app" class="app-img" @error="(e: any) => e.target.style.display = 'none'" />
                <AppstoreOutlined v-else class="app-icon" />
              </div>
              <h3>{{ app }}</h3>
            </div>
          </div>
        </a-carousel>
      </div>
    </section>

    <!-- Specifications -->
    <section class="specs-section" id="specifications" v-motion-fade-visible :delay="600">
      <div class="section-container">
        <h2 class="section-title" v-motion-slide-visible-bottom :delay="600">Specifications</h2>
        <div v-if="product.specsGroups && product.specsGroups.length" class="specs-tabs-wrapper">
          <a-tabs v-model:activeKey="activeSpecsTab" class="specs-tabs" :tab-position="isMobile ? 'top' : 'top'">
            <a-tab-pane v-for="group in product.specsGroups" :key="group.title" :tab="group.title">
              <a-table
                :dataSource="Object.entries(group.specs).map(([key, value]) => ({ specification: key, value }))"
                :columns="specsColumns"
                :pagination="false"
                class="specs-table"
                size="small"
              />
            </a-tab-pane>
          </a-tabs>
        </div>
        <a-table
          v-else
          :dataSource="specsData"
          :columns="specsColumns"
          :pagination="false"
          class="specs-table"
          size="small"
        />
        <div class="specs-more">
          <a-button type="link" @click="openWhatsApp">Learn More About Specifications →</a-button>
        </div>
      </div>
    </section>

    <!-- FAQs -->
    <section v-if="product.faqs && product.faqs.length" class="faq-section" v-motion-fade-visible :delay="700">
      <div class="section-container">
        <h2 class="section-title" v-motion-slide-visible-bottom :delay="700">Frequently Asked Questions</h2>
        <a-collapse v-model:activeKey="activeFaqKeys" class="faq-collapse" expand-icon-position="end">
          <a-collapse-panel v-for="(faq, idx) in product.faqs" :key="idx" :header="faq.question">
            <p class="faq-answer">{{ faq.answer }}</p>
          </a-collapse-panel>
        </a-collapse>
        <div class="specs-more" v-if="product.faqs.length >= 2">
          <a-button type="link" @click="openWhatsApp">Learn More →</a-button>
        </div>
      </div>
    </section>

    <!-- Related Products Carousel -->
    <section v-if="relatedProducts.length" class="related-section" v-motion-fade-visible :delay="800">
      <div class="section-container">
        <h2 class="section-title" v-motion-slide-visible-bottom :delay="800">You May Also Like</h2>
        <div class="related-grid">
          <a-card v-for="related in relatedProducts" :key="related.id" class="related-card" hoverable @click="$router.push(`/product/${related.id}`)">
            <template #cover>
              <div class="related-cover">
                <img :src="related.image" :alt="related.name" @error="(e: any) => e.target.src = images.fallback.products.sm200" />
              </div>
            </template>
            <a-card-meta :title="related.code + ' ' + related.name">
              <template #description>
                {{ related.description.substring(0, 60) }}...
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" v-motion-fade-visible :delay="900">
      <div class="cta-container">
        <h2>Interested in {{ product.code }} {{ product.name }}?</h2>
        <p>Contact us today for more information or request a demo</p>
        <div class="cta-buttons">
          <a-button type="primary" size="large" class="btn-pill-primary" @click="openWhatsApp">
            <MessageOutlined /> Get A Quote
          </a-button>
          <a-button size="large" class="btn-pill" @click="$router.push('/contact_us')" style="background: white; color: #2e7d32; border-color: white;">
            Contact Us
          </a-button>
        </div>
      </div>
    </section>

    <!-- Sticky Bottom CTA Bar -->
    <div class="sticky-cta-bar" :class="{ visible: showStickyCta }">
      <div class="sticky-cta-container">
        <span class="sticky-cta-name">{{ product.code }} {{ product.name }}</span>
        <a-button type="primary" class="btn-pill-primary" size="small" @click="openWhatsApp">
          Get A Quote
        </a-button>
      </div>
    </div>

    <!-- Back to Top -->
    <a-back-top :visibility-height="400" />

    <Footer />
  </div>

  <!-- Not Found -->
  <div v-else class="not-found">
    <a-result status="404" title="Product Not Found" sub-title="Sorry, the product you are looking for does not exist.">
      <template #extra>
        <a-button type="primary" class="btn-pill-primary" @click="$router.push('/products-solutions')">Back to Products & Solutions</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  CheckCircleOutlined, MessageOutlined, TableOutlined, AppstoreOutlined,
  LinkedinOutlined, CalendarOutlined, PhoneOutlined, CustomerServiceOutlined,
  TwitterOutlined, FacebookOutlined
} from '@ant-design/icons-vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { products, getProductById, getProductsByCategory, type Product } from '../data/products'

const route = useRoute()
const productAccordionKeys = ref<string[]>([])
const activeFaqKeys = ref<number[]>([])
const activeSpecsTab = ref<string>('')
const showStickyCta = ref(false)
const isMobile = ref(false)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const galleryCarousel = ref<any>(null)
const activeSlideIdx = ref(0)

function goToSlide(idx: number) {
  activeSlideIdx.value = idx
  if (galleryCarousel.value) {
    try {
      if (typeof galleryCarousel.value.goTo === 'function') {
        galleryCarousel.value.goTo(idx)
      } else if (typeof galleryCarousel.value.$nextTick === 'function') {
        galleryCarousel.value.$nextTick(() => {
          if (typeof galleryCarousel.value.goTo === 'function') {
            galleryCarousel.value.goTo(idx)
          }
        })
      }
    } catch (e) {
      // swallow — UI will still highlight the active thumb
    }
  }
}

function onCarouselChange(idx: number) {
  if (typeof idx === 'number') {
    activeSlideIdx.value = idx
  } else if (idx && typeof idx.current === 'number') {
    activeSlideIdx.value = idx.current
  }
}

const product = computed(() => {
  const productId = route.params.id as string
  return getProductById(productId)
})

const productGallery = computed(() => {
  if (!product.value) return []
  if (product.value.gallery && product.value.gallery.length > 0) return product.value.gallery
  return [product.value.image]
})

const productWhyReasons = computed(() => {
  if (!product.value) return []
  const defaults = [
    'High-precision centimeter-level positioning for maximum field efficiency',
    'Robust hardware platform engineered for harsh agricultural environments',
    'Intelligent automation reduces operator fatigue and human errors',
    'Seamless OTA updates keep your system future-proof'
  ]
  return product.value.whyReasons ? product.value.whyReasons : defaults
})

const learnMoreCards = computed(() => {
  if (!product.value) return []
  const defaults: { title: string; description: string; image: string }[] = [
    {
      title: 'Powerful Hardware Platform',
      description: 'Equipped with a next-generation high-performance GNSS receiver featuring strong signal tracking, enhanced anti-interference, and fast convergence. The 12.1-inch high-brightness tablet with increased RAM/ROM delivers a smoother, more responsive user experience.',
      image: '/images/3U9A0093.webp'
    },
    {
      title: 'Future-Ready AI Expansion',
      description: 'Supports AI Visual Guidance (AN-V100) for real-time crop boundary detection and autonomous row following without pre-set AB lines. Modular design allows for easy upgrades as new AI capabilities emerge.',
      image: '/images/harvest-1543064.webp'
    },
    {
      title: 'Seamless Data Integration and Transfer',
      description: 'Built-in 4G/WiFi connectivity enables automatic job data synchronization between vehicles and the cloud platform. Share field boundaries, guidance lines, and task reports across your entire fleet.',
      image: '/images/agriculture-6502282.webp'
    },
    {
      title: 'Smarter Navigation & Operation',
      description: 'Intuitive touch interface with high-brightness display ensures clear visibility even in direct sunlight. Paddle controls and alert indicators allow quick operation in rough field conditions.',
      image: '/images/pexels-nc-farm-bureau-mark-2889442.webp'
    },
    {
      title: 'Collaborative Machine Operations',
      description: 'Multi-machine collaboration support enables synchronized operations across multiple vehicles in the same field. Track real-time progress, share waypoints, and optimize fleet efficiency.',
      image: '/images/pexels-nc-farm-bureau-mark-26256448.webp'
    },
    {
      title: 'One System, Multiple Scenarios',
      description: 'From plowing and planting to spraying and harvesting, the AF718 adapts to diverse farming applications. Support for implement guidance (±1.5 cm pass-to-pass accuracy) further extends its versatility.',
      image: '/images/sunrise-8218442.webp'
    }
  ]
  return product.value.learnMoreCards || defaults
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  const categoryProducts = getProductsByCategory(product.value.category)
  return categoryProducts.filter(p => p.id !== product.value?.id).slice(0, 8)
})

const specsData = computed(() => {
  if (!product.value) return []
  return Object.entries(product.value.specifications).map(([key, value]) => ({
    key,
    specification: key,
    value
  }))
})

const specsColumns = [
  { title: 'Specification', dataIndex: 'specification', key: 'specification', width: '45%' },
  { title: 'Value', dataIndex: 'value', key: 'value' }
]

const appSlidesPerView = computed(() => {
  if (windowWidth.value < 768) return 1
  if (windowWidth.value < 992) return 2
  return 3
})

const images = {
  fallback: {
    products: {
      sm200: '/images/agriculture-6502282.webp',
      ar300: '/images/harvest-1543064.webp',
      vg100: '/images/3U9A0093.webp'
    }
  }
}

const appImageMap: Record<string, string> = {
  'Multi-Machine Collaboration': '/images/af718/Multi-Machine-Collaboration-1.png',
  'Smart Path Planning': '/images/af718/Smart-Path-Planning-1.png',
  'AI Visual Guidance': '/images/af718/AI-Visual-Guidance-1.png',
  'Implement Guidance': '/images/af718/Implement-Guidance-1.png'
}

function getAppImage(appName: string): string | undefined {
  return appImageMap[appName]
}

function getBadges(product: Product): string[] {
  // Products with Vesper badge-style features (short labels, not descriptive text)
  const badgeStyleProducts = ['AF718', 'W20']
  if (badgeStyleProducts.includes(product.code)) {
    return product.features
  }
  const badges = []
  if (product.isNew) badges.push('COLLABORATIVE')
  badges.push('EFFICIENT', 'STABLE')
  if (product.isBestSeller) badges.push('PREMIUM')
  badges.push('ACCURATE', 'UPGRADABLE')
  return badges
}

function getMowSpec(key: string): string | undefined {
  if (!product.value?.specifications) return undefined
  return product.value.specifications[key]
}

function onGalleryImgError(e: Event) {
  const img = e.target as HTMLImageElement
  if (!img.dataset.fallbackUsed) {
    img.dataset.fallbackUsed = 'true'
    img.src = '/logo.png'
  }
}

function shareProduct(platform: string) {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(`${product.value?.code || ''} ${product.value?.name || ''}`)
  const shareUrls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
  }
  if (shareUrls[platform]) window.open(shareUrls[platform], '_blank', 'width=600,height=400')
}

function handleScroll() {
  showStickyCta.value = window.scrollY > 600
}

function handleResize() {
  windowWidth.value = window.innerWidth
  isMobile.value = window.innerWidth < 768
}

function openWhatsAppDemo() {
  const message = `Hello! I would like to request a demo of the ${product.value?.code} ${product.value?.name}.`
  window.open(`https://wa.me/61448290926?text=${encodeURIComponent(message)}`, '_blank')
}

function openWhatsApp() {
  const message = `Hello! I'm interested in getting a quote for the ${product.value?.code} ${product.value?.name}. Could you please provide more information?`
  window.open(`https://wa.me/61448290926?text=${encodeURIComponent(message)}`, '_blank')
}

function scrollToSpecs() {
  const element = document.getElementById('specifications')
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  if (product.value?.specsGroups?.length) {
    activeSpecsTab.value = product.value.specsGroups[0].title
  }
  handleResize()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Base */
.product-detail-page {
  font-family: 'Inter', 'Noto Sans', 'Noto Sans SC', sans-serif;
  background:
    radial-gradient(circle at top left, #eef8f0 0%, #f7f8fb 35%, #ffffff 100%);
  min-height: 100vh;
  line-height: 1.7;
  overflow: hidden;
}

.breadcrumb {
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 40px;
  color: #7f8b96;
  font-size: 14px;
  margin-bottom: 0;
}

.breadcrumb :deep(.ant-breadcrumb) {
  color: #7f8b96;
}

.breadcrumb :deep(.ant-breadcrumb a) {
  color: #7f8b96;
}

.breadcrumb :deep(.ant-breadcrumb-separator) {
  color: #bcc5cd;
}

.breadcrumb :deep(.ant-breadcrumb li:last-child) {
  color: #102132;
}

/* Hero wrapper */
.product-hero {
  background: transparent;
  padding: 24px 40px 32px;
  max-width: 1480px;
  margin: 0 auto;
}

.product-hero-container {
  background: var(--glass-card-bg);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: var(--glass-card-radius);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  align-items: start;
  box-shadow:
    0 10px 40px rgba(24, 42, 63, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Image section */
.product-image-section {
  background: linear-gradient(180deg, #f6fbf7 0%, #edf5ef 100%);
  padding: 40px;
  position: relative;
  min-width: 0;
  overflow: clip;
}

.product-gallery {
  width: 100%;
  min-width: 0;
  border-radius: 24px;
  overflow: clip;
  background: transparent;
  margin-bottom: 0;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
}

.product-carousel {
  min-width: 0;
  overflow: clip;
}

.gallery-slide {
  background: transparent;
}

.product-carousel :deep(.slick-slide) > div,
.product-carousel :deep(.slick-slide) {
  height: auto;
}

.product-carousel :deep(.slick-list) {
  overflow: hidden;
}

.product-carousel :deep(.slick-track) {
  display: flex;
  align-items: center;
}

.product-carousel :deep(.slick-slide img),
.gallery-image {
  display: block;
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: contain;
}

.main-product-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  max-height: 600px;
}

/* Thumbnail navigation strip (works for all products with > 1 gallery image) */
.gallery-thumbs {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  padding: 8px 4px 4px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: #c7d2cc transparent;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.gallery-thumbs::-webkit-scrollbar {
  height: 6px;
}

.gallery-thumbs::-webkit-scrollbar-thumb {
  background: #c7d2cc;
  border-radius: 3px;
}

.gallery-thumbs::-webkit-scrollbar-track {
  background: transparent;
}

.gallery-thumb {
  flex: 0 0 auto;
  width: 84px;
  height: 64px;
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 2px solid #e3ebe5;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  opacity: 0.7;
  transition: opacity 0.18s ease, border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-thumb:hover {
  opacity: 1;
  border-color: #b9c8be;
}

.gallery-thumb.is-active {
  opacity: 1;
  border-color: var(--vesper-green, #2f7a3f);
  box-shadow: 0 4px 12px rgba(47, 122, 63, 0.18);
  transform: translateY(-1px);
}

.gallery-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

@media (max-width: 768px) {
  .gallery-thumb {
    width: 68px;
    height: 52px;
  }
}

.product-badges {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
  z-index: 2;
}

.stock-badge {
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.stock-badge--in-stock {
  background: #e8f8ec;
  color: #1f8c49;
}

.stock-badge--best {
  background: #fff7e6;
  color: #b8860b;
}

.stock-badge--new {
  background: #eaf3ff;
  color: #2970ff;
}

.share-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px 0;
}

.share-section :deep(.ant-btn) {
  font-size: 20px;
  width: 36px;
  height: 36px;
  color: #637381;
}

.share-section :deep(.ant-btn:hover) {
  color: #178c45;
  background: #eef8f0;
}

.share-label {
  font-size: 14px;
  color: #7f8b96;
  margin-right: 4px;
  font-weight: 500;
}

/* Info section */
.product-info-section {
  padding: 64px;
}

.product-category-link {
  margin-bottom: 18px;
}

.product-category-link a {
  color: #1b8b4d;
  font-weight: 600;
  font-size: 18px;
}

.product-title {
  font-size: 54px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -2.5px;
  color: #102132;
  margin-bottom: 20px;
}

.product-tagline {
  font-size: 20px;
  color: #4d5f6d;
  line-height: 1.9;
  margin-bottom: 28px;
  max-width: 720px;
}

/* Feature badges */
.feature-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 28px;
}

.feature-badge {
  padding: 14px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  cursor: default;
  transition: all 0.25s ease;
}

.feature-badge:nth-child(1) { background: #eef8f0; color: #1f7c48; border: 1px solid #d8eedf; }
.feature-badge:nth-child(2) { background: #eaf3ff; color: #2970ff; border: 1px solid #d6e6ff; }
.feature-badge:nth-child(3) { background: #e6fcf7; color: #0d7377; border: 1px solid #c8f0e5; }
.feature-badge:nth-child(4) { background: #fff7e6; color: #b8860b; border: 1px solid #ffe8ba; }
.feature-badge:nth-child(5) { background: #f9f0ff; color: #722ed1; border: 1px solid #efdbff; }
.feature-badge:nth-child(6) { background: #fff1f0; color: #cf1322; border: 1px solid #ffd8d5; }

.feature-badge:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  filter: brightness(0.95);
}

/* Product accordion */
.product-accordion {
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: transparent;
}

.product-accordion :deep(.ant-collapse-item) {
  background: #ffffff;
  border: none !important;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(18, 38, 63, 0.05);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.product-accordion :deep(.ant-collapse-item:hover) {
  box-shadow: 0 8px 28px rgba(18, 38, 63, 0.1);
  transform: translateY(-2px);
}

.product-accordion :deep(.ant-collapse-item:last-child) {
  border-radius: 20px !important;
}

.product-accordion :deep(.ant-collapse-header) {
  font-weight: 600 !important;
  padding: 20px 26px !important;
  font-size: 16px;
  border-bottom: none !important;
  border-radius: 20px !important;
  transition: background 0.25s ease;
}

.product-accordion :deep(.ant-collapse-header:hover) {
  background: #eaf3ff;
}

.product-accordion :deep(.ant-collapse-content) {
  border-top: none !important;
}

.product-accordion :deep(.ant-collapse-content-box) {
  padding: 0 26px 16px !important;
}

.product-why-list,
.product-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-why-list li,
.product-features-list li {
  padding: 6px 0;
  color: #4d5f6d;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.5;
  font-size: 15px;
}

.why-icon,
.feature-icon {
  color: #1f8c49;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

/* CTA buttons */
.product-cta-buttons {
  display: flex;
  gap: 18px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.support-links {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.support-links :deep(.ant-btn-link) {
  color: #637381;
  font-size: 15px;
  font-weight: 500;
  padding: 0;
}

/* Learn More */
.learn-more-section {
  background: transparent;
  padding: 0 40px 24px;
  max-width: 1480px;
  margin: 0 auto;
}

.learn-more-cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.learn-more-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba(24, 42, 63, 0.04);
  animation: cardFadeIn 0.6s ease-out both;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.learn-more-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(24, 42, 63, 0.08);
}

.learn-more-card.card-reverse .learn-more-image {
  order: 2;
}

.learn-more-card.card-reverse .learn-more-content {
  order: 1;
  padding: 32px 0 32px 40px;
}

.learn-more-image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  min-height: 220px;
}

.learn-more-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.learn-more-card:hover .learn-more-image img {
  transform: scale(1.12) translateX(-2%);
}

.learn-more-content {
  padding: 32px 40px 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.learn-more-title {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #178c45, #0f5c2e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.learn-more-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 4px;
  background: linear-gradient(90deg, #1a66e5, #4d8ff7, #1a66e5);
  border-radius: 0 0 4px 4px;
  margin-top: 10px;
  margin-bottom: 6px;
  box-shadow: 0 1px 4px rgba(26, 102, 229, 0.25);
}

.learn-more-description {
  font-size: 20px;
  color: #4d5f6d;
  line-height: 1.9;
}

/* Applications */
.applications-section {
  background: transparent;
}

.applications-carousel {
  max-width: 900px;
  margin: 0 auto;
}

.applications-carousel :deep(.slick-slide) {
  padding: 0 12px;
}

.applications-carousel :deep(.slick-arrow) {
  color: #2e7d32 !important;
}

.application-slide {
  padding: 0 4px;
}

.application-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 32px 20px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(24, 42, 63, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.application-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(24, 42, 63, 0.08);
}

.application-icon-wrapper {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #e8f5e9, #d0ebd6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-icon {
  font-size: 28px;
  color: #1f8c49;
}

.app-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.application-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

/* Specifications */
.specs-section {
  background: transparent;
}

.specs-tabs-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.specs-tabs :deep(.ant-tabs-nav) {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.specs-tabs :deep(.ant-tabs-tab) {
  padding: 12px 24px;
  font-weight: 500;
  font-size: 15px;
}

.specs-tabs :deep(.ant-tabs-tab-active) {
  color: #2e7d32 !important;
}

.specs-tabs :deep(.ant-tabs-ink-bar) {
  background: #2e7d32;
}

.specs-table {
  border-radius: 12px;
  overflow: hidden;
}

.specs-table :deep(.ant-table) {
  border-radius: 12px;
}

.specs-table :deep(.ant-table-thead > tr > th) {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.specs-table :deep(.ant-table-tbody > tr > td) {
  font-size: 20px;
  color: #4d5f6d;
  line-height: 1.9;
}

.specs-table :deep(.ant-table-tbody > tr:nth-child(even) > td) {
  background: #eaf3ff;
}

.specs-table :deep(.ant-table-tbody > tr:hover > td) {
  background: #dceeff !important;
}

.specs-more {
  text-align: center;
  margin-top: 24px;
}

.specs-more :deep(.ant-btn-link) {
  color: #2e7d32;
  font-weight: 500;
}

/* FAQs */
.faq-section {
  background: transparent;
}

.faq-collapse {
  max-width: 900px;
  margin: 0 auto;
  background: transparent;
}

.faq-collapse :deep(.ant-collapse-item) {
  background: #ffffff;
  border: none !important;
  border-radius: 20px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(18, 38, 63, 0.05);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.faq-collapse :deep(.ant-collapse-item:hover) {
  box-shadow: 0 8px 28px rgba(18, 38, 63, 0.1);
  transform: translateY(-2px);
}

.faq-collapse :deep(.ant-collapse-item:last-child) {
  border-radius: 20px !important;
}

.faq-collapse :deep(.ant-collapse-header) {
  font-weight: 600 !important;
  padding: 24px 26px !important;
  font-size: 16px;
  border-bottom: none !important;
  border-radius: 20px !important;
  transition: background 0.25s ease;
}

.faq-collapse :deep(.ant-collapse-header:hover) {
  background: #eaf3ff;
}

.faq-collapse :deep(.ant-collapse-content) {
  border-top: none !important;
}

.faq-collapse :deep(.ant-collapse-content-box) {
  padding: 0 26px 24px !important;
}

.faq-answer {
  font-size: 20px;
  color: #4d5f6d;
  line-height: 1.9;
}

/* Related Grid */
.related-section {
  background: transparent;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1480px;
  margin: 0 auto;
}

.related-card {
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.related-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 40px rgba(24, 42, 63, 0.1);
}

.related-cover {
  height: 180px;
  overflow: hidden;
}

.related-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-card:hover .related-cover img {
  transform: scale(1.08);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #178c45, #0f5c2e);
  padding: 80px 40px;
  text-align: center;
  color: white;
}

.cta-container h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.cta-container p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.cta-buttons {
  display: flex;
  gap: 18px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Sticky bottom CTA bar */
.sticky-cta-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  padding: 16px 40px;
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.sticky-cta-bar.visible {
  transform: translateY(0);
}

.sticky-cta-container {
  max-width: 1480px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sticky-cta-name {
  font-size: 18px;
  font-weight: 600;
  color: #102132;
}

/* Section shared */
.section-container {
  max-width: 1480px;
  margin: 0 auto;
  padding: 24px 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
  color: #102132;
  letter-spacing: -1px;
  position: relative;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%);
  width: 200px;
  height: 12px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(26, 102, 229, 0.08) 15%,
    rgba(26, 102, 229, 0.6) 30%,
    rgba(77, 143, 247, 0.8) 50%,
    rgba(26, 102, 229, 0.6) 70%,
    rgba(26, 102, 229, 0.08) 85%,
    transparent 100%
  );
  border-radius: 50%;
  filter: blur(4px);
  animation: ribbonGlow 3s ease-in-out infinite;
  z-index: -1;
}

.section-title::after {
  content: '';
  display: block;
  width: 140px;
  height: 6px;
  background: linear-gradient(90deg,
    #1a66e5 0%,
    #4d8ff7 20%,
    #7bb3ff 40%,
    #4d8ff7 60%,
    #1a66e5 80%,
    #1555c0 100%
  );
  background-size: 200% 100%;
  border-radius: 0 0 8px 8px;
  margin: 16px auto 0;
  box-shadow:
    0 2px 8px rgba(26, 102, 229, 0.35),
    0 0 20px rgba(26, 102, 229, 0.15);
  animation: ribbonWave 4s ease-in-out infinite;
  position: relative;
}

@keyframes ribbonWave {
  0%, 100% {
    background-position: 0% 50%;
    transform: scaleX(1) translateY(0);
  }
  25% {
    background-position: 50% 50%;
    transform: scaleX(1.08) translateY(-1px);
  }
  50% {
    background-position: 100% 50%;
    transform: scaleX(1) translateY(0);
  }
  75% {
    background-position: 50% 50%;
    transform: scaleX(1.08) translateY(-1px);
  }
}

@keyframes ribbonGlow {
  0%, 100% {
    opacity: 0.5;
    transform: translateX(-50%) scaleX(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scaleX(1.15);
  }
}

/* Not found */
.not-found {
  padding: 100px 20px;
  text-align: center;
}

/* ============================================
   Vesper-Exclusive Sections
   ============================================ */
.mow-slope-strip {
  background: linear-gradient(135deg, #178c45 0%, #0f5c2e 100%);
  padding: clamp(40px, 5vw, 64px) clamp(16px, 3vw, 24px);
  color: white;
}

.slope-strip-grid {
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.slope-stat-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.slope-stat-label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.85;
  margin-bottom: 8px;
}

.slope-stat-value {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 6px;
  background: linear-gradient(180deg, #ffffff 0%, #d4f4dd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.slope-stat-sub {
  font-size: 13px;
  opacity: 0.75;
}

.mow-section-lead {
  text-align: center;
  max-width: 760px;
  margin: -16px auto 40px;
  color: #4d5f6d;
  font-size: clamp(15px, 1.3vw, 17px);
  line-height: 1.7;
}

/* No Friction */
.mow-no-friction {
  background: #ffffff;
  padding: clamp(48px, 6vw, 80px) clamp(16px, 3vw, 24px);
}

.no-friction-grid {
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}

.no-friction-card {
  background: rgba(238, 248, 240, 0.6);
  border: 1px solid rgba(24, 138, 69, 0.15);
  border-radius: 20px;
  padding: 32px 28px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.no-friction-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(24, 138, 69, 0.12);
}

.no-friction-card img {
  height: 120px;
  margin: 0 auto 20px;
  display: block;
  object-fit: contain;
}

.no-friction-card h3 {
  font-size: 24px;
  font-weight: 700;
  color: #102132;
  margin-bottom: 10px;
}

.no-friction-card p {
  color: #4d5f6d;
  font-size: 15px;
  line-height: 1.6;
}

/* Scenarios Grid */
.mow-scenarios {
  background: #f7faf8;
  padding: clamp(48px, 6vw, 80px) clamp(16px, 3vw, 24px);
}

.scenarios-grid {
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.scenario-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(18, 38, 63, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.scenario-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(18, 38, 63, 0.12);
}

.scenario-image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.scenario-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scenario-card h3 {
  padding: 20px 24px;
  font-size: 18px;
  font-weight: 700;
  color: #102132;
}

/* Engineering */
.mow-engineering {
  background: white;
  padding: clamp(48px, 6vw, 80px) clamp(16px, 3vw, 24px);
}

.engineering-grid {
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.engineering-card {
  background: linear-gradient(180deg, #ffffff 0%, #f0faf3 100%);
  border: 1px solid rgba(24, 138, 69, 0.12);
  border-radius: 20px;
  padding: 36px 28px;
  position: relative;
}

.engineering-num {
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #178c45 0%, #0f5c2e 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
  margin-bottom: 20px;
  font-family: 'JetBrains Mono', monospace;
}

.engineering-card h3 {
  font-size: 22px;
  font-weight: 700;
  color: #102132;
  margin-bottom: 12px;
}

.engineering-card p {
  color: #4d5f6d;
  font-size: 15px;
  line-height: 1.7;
}

/* Performance blocks (Tall Grass / Vacuum / Battery / Safety) */
.mow-performance,
.mow-vacuum,
.mow-battery,
.mow-safety {
  background: white;
  padding: clamp(48px, 6vw, 80px) clamp(16px, 3vw, 24px);
}

.mow-vacuum-flip,
.mow-safety-flip {
  background: #f7faf8;
}

.performance-grid {
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.performance-flip {
  direction: rtl;
}

.performance-flip > * {
  direction: ltr;
}

.performance-eyebrow {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #178c45;
  margin-bottom: 12px;
}

.performance-headline {
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800;
  line-height: 1.15;
  color: #102132;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.performance-lead {
  font-size: clamp(15px, 1.3vw, 17px);
  color: #4d5f6d;
  line-height: 1.8;
  margin-bottom: 24px;
}

.performance-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
}

.performance-bullets li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  color: #2c3e50;
  font-size: 15px;
  line-height: 1.5;
}

.performance-bullets li :deep(.anticon) {
  color: #178c45;
  font-size: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}

.performance-image img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 20px 48px rgba(18, 38, 63, 0.12);
}

/* Speed bars */
.mow-speed {
  background: linear-gradient(180deg, #f7faf8 0%, #eef8f0 100%);
  padding: clamp(48px, 6vw, 80px) clamp(16px, 3vw, 24px);
}

.speed-bars {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.speed-row {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 20px;
  align-items: center;
}

.speed-label {
  font-size: 15px;
  font-weight: 600;
  color: #102132;
}

.speed-bar {
  position: relative;
  height: 44px;
  background: rgba(24, 138, 69, 0.08);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.speed-fill {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  transition: width 1s ease-out;
}

.speed-bar-mow .speed-fill {
  background: linear-gradient(90deg, #178c45 0%, #0f5c2e 100%);
}

.speed-bar-walk .speed-fill {
  background: linear-gradient(90deg, #94a3b8 0%, #64748b 100%);
}

.speed-bar-smart .speed-fill {
  background: linear-gradient(90deg, #cbd5e1 0%, #94a3b8 100%);
}

.speed-value {
  position: relative;
  margin-left: 16px;
  color: white;
  font-weight: 700;
  font-size: 15px;
  z-index: 1;
}

.speed-bar-walk .speed-value,
.speed-bar-smart .speed-value {
  color: #102132;
}

/* Build */
.mow-build {
  background: white;
  padding: clamp(48px, 6vw, 80px) clamp(16px, 3vw, 24px);
}

.build-grid {
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
}

.build-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(24, 138, 69, 0.1);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(18, 38, 63, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.build-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(18, 38, 63, 0.1);
}

.build-image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f6fbf7;
}

.build-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.build-card h3 {
  padding: 20px 24px 6px;
  font-size: 20px;
  font-weight: 700;
  color: #102132;
}

.build-card p {
  padding: 0 24px 24px;
  color: #4d5f6d;
  font-size: 15px;
  line-height: 1.6;
}

/* Support */
.mow-support {
  background: #f7faf8;
  padding: clamp(48px, 6vw, 80px) clamp(16px, 3vw, 24px);
}

.support-grid {
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.support-image img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 20px 48px rgba(18, 38, 63, 0.12);
}

/* Then vs Now */
.mow-then-now {
  background: linear-gradient(180deg, #f7fbf8 0%, #edf5ef 100%);
  padding: 72px 0;
}

.then-now-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.then-now-card {
  text-align: center;
}

.then-now-img {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  display: block;
}

.then-now-label {
  font-size: 16px;
  font-weight: 700;
  margin-top: 16px;
}

.then-now-card:first-child .then-now-label {
  color: #8b9a95;
  text-decoration: line-through;
}

.then-now-card:last-child .then-now-label {
  color: #2f7a3f;
}

@media (max-width: 768px) {
  .then-now-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
}

/* Spring to Fall */
.mow-spring-fall {
  background: #ffffff;
  padding: 72px 0;
}

.spring-fall-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.spring-fall-card {
  background: #f7fbf8;
  border: 1px solid #e3ebe5;
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
}

.sf-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.spring-fall-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #102132;
  margin: 0 0 8px;
}

.spring-fall-card p {
  font-size: 14px;
  color: #5a6b66;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 900px) {
  .spring-fall-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .spring-fall-grid {
    grid-template-columns: 1fr;
  }
}

/* Section Video */
.section-video {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
}

/* RC Track */
.mow-rc-track {
  background: #ffffff;
  padding: 72px 0;
}

.mow-rc-track .performance-image img {
  width: 100%;
  border-radius: 20px;
  display: block;
}

@media (max-width: 768px) {
  .mow-rc-track .performance-grid {
    grid-template-columns: 1fr;
  }
  .mow-rc-track .performance-image {
    order: -1;
  }
}

@media (max-width: 768px) {
  .mow-wet-grass .performance-grid,
  .mow-tough-grass .performance-grid {
    grid-template-columns: 1fr;
  }
}

/* Video Section */
.mow-video {
  background: #ffffff;
  padding: 72px 0;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

.video-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.video-player {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
}

.video-label {
  font-size: 15px;
  font-weight: 600;
  color: #2d3f3a;
  text-align: center;
  margin: 0;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}

/* In the Box */
.mow-in-the-box {
  background: linear-gradient(180deg, #f7fbf8 0%, #edf5ef 100%);
  padding: 72px 0;
}

.box-image-wrap {
  max-width: 900px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
}

.box-image-wrap img {
  width: 100%;
  height: auto;
  display: block;
}

/* Customer Reviews */
.mow-reviews {
  background: #ffffff;
  padding: 72px 0;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

.review-card {
  background: #f7fbf8;
  border: 1px solid #e3ebe5;
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-quote {
  font-size: 15px;
  line-height: 1.7;
  color: #2d3f3a;
  font-style: italic;
  margin: 0;
}

.review-author {
  font-size: 13px;
  color: #7f8b96;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 768px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}

/* Vesper responsive */
@media (max-width: 1100px) {
  .performance-grid,
  .performance-flip,
  .support-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .performance-flip {
    direction: ltr;
  }
}

@media (max-width: 768px) {
  .speed-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .speed-label {
    text-align: center;
  }

  .support-image {
    order: -1;
  }
}

/* Responsive */
@media (max-width: 1100px) {
  .product-hero-container {
    grid-template-columns: 1fr;
  }

  .product-title {
    font-size: 40px;
    letter-spacing: -1.5px;
  }

  .product-image-section {
    position: static;
  }

  .product-info-section {
    padding: 42px;
  }

  .product-hero {
    padding: 24px 16px 40px;
  }

  .learn-more-card {
    grid-template-columns: 1fr;
    gap: 0;
    align-items: center;
  }

  .learn-more-card.card-reverse .learn-more-image {
    order: -1;
  }

  .learn-more-card.card-reverse .learn-more-content {
    order: 1;
    padding: 24px;
  }

  .learn-more-image {
    aspect-ratio: 16/9;
    min-height: 180px;
  }

  .learn-more-content {
    padding: 24px;
  }

  .learn-more-title {
    font-size: 20px;
  }

  .learn-more-description {
    font-size: 17px;
  }

  .faq-answer {
    font-size: 17px;
  }

  .specs-table :deep(.ant-table-tbody > tr > td) {
    font-size: 17px;
  }

  .sticky-cta-name {
    display: none;
  }

  .sticky-cta-container {
    justify-content: center;
  }

  .cta-section {
    padding-bottom: 100px;
  }

  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
  }

  .product-hero {
    padding: 12px 12px 24px;
  }

  .breadcrumb {
    padding: 0 16px;
    font-size: 13px;
  }

  .product-image-section {
    padding: 24px 24px 0;
  }

  .product-info-section {
    padding: 32px 24px;
  }

  .product-title {
    font-size: 29px;
    letter-spacing: -1px;
  }

  .product-tagline {
    font-size: 17px;
  }

  .feature-badge {
    font-size: 12px;
    padding: 10px 16px;
  }

  .product-accordion :deep(.ant-collapse-header) {
    padding: 18px 20px !important;
    font-size: 15px;
  }

  .product-cta-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .product-cta-buttons .ant-btn {
    width: 100%;
  }

  .learn-more-section {
    padding: 0 16px 20px;
  }

  .section-container {
    padding: 20px 16px;
  }

  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .support-links {
    flex-direction: column;
    gap: 12px;
  }

  .sticky-cta-bar {
    padding: 12px 16px;
  }

  .cta-section {
    padding: 60px 20px;
  }

  .cta-container h2 {
    font-size: 28px;
  }
}
</style>
