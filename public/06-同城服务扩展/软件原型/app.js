const STORAGE_KEY = "dililife_city_services_v1";

const categories = {
  housing: { name: "找房", desc: "租房、合租、短租", icon: "房", mode: "开放" },
  jobs: { name: "找工作", desc: "招聘、求职、兼职", icon: "工", mode: "开放" },
  secondhand: { name: "二手", desc: "家电、家具、手机", icon: "物", mode: "开放" },
  shopspace: { name: "找店面", desc: "商铺出租、转让", icon: "店", mode: "开放" },
  ride: { name: "叫车", desc: "客服人工转接", icon: "车", mode: "试点" },
  rental: { name: "租车", desc: "客服确认后转接", icon: "租", mode: "试点" },
  food: { name: "外卖", desc: "需求收集中", icon: "餐", mode: "试点" },
};

const assetBase = document.querySelector(".main-app") ? "../assets/service-city-images-real/" : "../../assets/service-city-images-real/";
const listingImages = {
  housing: `${assetBase}city-rental-room.png`,
  jobs: `${assetBase}city-shop-cashier-job.png`,
  secondhand: `${assetBase}city-used-fridge.png`,
  shopspace: `${assetBase}city-shop-space.png`,
  ride: `${assetBase}city-ride-pickup.png`,
  rental: `${assetBase}city-rental-car.png`,
  food: `${assetBase}city-food-delivery.png`,
  default: `${assetBase}city-secondhand-items.png`,
};

const statusLabels = {
  pending: "待审核",
  reviewing: "待 WhatsApp 确认",
  published: "已发布",
  need_info: "待补充",
  rejected: "已拒绝",
  removed: "已下架",
  closed: "已结束",
};

const seedListings = [
  {
    id: "seed-1",
    category: "housing",
    identity: "个人",
    title: "Comoro 两房出租，近主路",
    description: "两间卧室，简单家具，适合小家庭。本周可入住，押金 1 个月。",
    area: "Comoro 主路附近",
    price: "150 USD/月",
    whatsapp: "+670 7xxx 001",
    imageStatus: "有真实图片",
    image: listingImages.housing,
    status: "published",
    createdAt: "2026-06-30 10:20",
    reports: [],
    views: 86,
    consults: 23,
  },
  {
    id: "seed-2",
    category: "jobs",
    identity: "公司/招聘方",
    title: "招聘门店收银员，Dili 市区",
    description: "需要基础中文或英文沟通能力，有门店经验优先。工作时间面议。",
    area: "Dili 市区",
    price: "薪资面议",
    whatsapp: "+670 7xxx 002",
    imageStatus: "有真实图片",
    image: listingImages.jobs,
    status: "published",
    createdAt: "2026-06-30 11:05",
    reports: [],
    views: 64,
    consults: 18,
  },
  {
    id: "seed-3",
    category: "secondhand",
    identity: "个人",
    title: "九成新冰箱出售，可自取",
    description: "冰箱使用正常，因搬家出售。建议当面验货后交易。",
    area: "Becora",
    price: "120 USD",
    whatsapp: "+670 7xxx 003",
    imageStatus: "有真实图片",
    image: listingImages.secondhand,
    status: "published",
    createdAt: "2026-06-30 12:40",
    reports: [],
    views: 52,
    consults: 15,
  },
  {
    id: "seed-4",
    category: "shopspace",
    identity: "中介",
    title: "Becora 临街店面出租",
    description: "临街位置，适合小零售或服务店。租金和合同需线下确认。",
    area: "Becora",
    price: "400 USD/月",
    whatsapp: "+670 7xxx 004",
    imageStatus: "待补充图片",
    image: listingImages.shopspace,
    status: "reviewing",
    createdAt: "2026-06-30 13:10",
    reports: [],
    views: 38,
    consults: 8,
  },
  {
    id: "seed-5",
    category: "ride",
    identity: "个人",
    title: "今天下午 Comoro 到机场",
    description: "2 人，有一个行李箱。叫车第一阶段只做人工转接。",
    area: "Comoro",
    price: "价格待确认",
    whatsapp: "+670 7xxx 005",
    imageStatus: "有真实图片",
    image: listingImages.ride,
    status: "pending",
    createdAt: "2026-06-30 14:05",
    reports: [],
    views: 24,
    consults: 5,
  },
];

const state = {
  listings: loadListings(),
  selectedCategory: "all",
  search: "",
  selectedReviewId: null,
};

const isEmbeddedInMainApp = Boolean(document.querySelector(".main-app"));

function loadListings() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return seedListings.map(enrichListing);
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.map(enrichListing) : seedListings.map(enrichListing);
  } catch {
    return seedListings.map(enrichListing);
  }
}

function enrichListing(item) {
  const seed = seedListings.find((listing) => listing.id === item.id);
  return {
    ...item,
    image: item.image || seed?.image || listingImages[item.category] || listingImages.default,
    highlights: item.highlights || seed?.highlights || defaultListingHighlights(item.category),
  };
}

function defaultListingHighlights(category) {
  const map = {
    housing: ["看房前确认押金和合同", "建议实地查看房屋", "不要提前转账"],
    jobs: ["确认工作时间和薪资", "不押证件", "面试地址需核实"],
    secondhand: ["当面验货", "确认能否配送", "高价值物品建议留凭证"],
    shopspace: ["确认租期和押金", "核实产权或授权", "合同线下复核"],
    ride: ["确认上车点和时间", "价格先确认", "不要提前大额付款"],
    rental: ["确认证件和押金规则", "验车拍照", "油费和超时费先说明"],
    food: ["确认数量和送达时间", "价格以商家确认为准", "大单先客服确认"],
  };
  return map[category] || ["客服先确认", "交易前自行核实", "保留聊天记录"];
}

function saveListings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.listings));
}

function nowText() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function statusBadge(status) {
  return `<span class="badge ${status}">${statusLabels[status] || status}</span>`;
}

function categoryBadge(category) {
  const info = categories[category];
  return `<span class="badge">${info?.name || category}</span>`;
}

function publicListings() {
  return state.listings.filter((item) => item.status === "published");
}

function filteredPublicListings() {
  const query = state.search.trim().toLowerCase();
  return publicListings().filter((item) => {
    const matchesCategory = state.selectedCategory === "all" || item.category === state.selectedCategory;
    const haystack = `${item.title} ${item.description} ${item.area} ${item.price}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });
}

function renderCategories() {
  const grid = document.querySelector("#categoryGrid");
  grid.innerHTML = Object.entries(categories)
    .map(([key, item]) => {
      const active = state.selectedCategory === key ? " active" : "";
      return `
        <button class="category-card${active}" data-category="${key}" type="button">
          <strong>${item.icon} ${item.name}</strong>
          <span>${item.desc} · ${item.mode}</span>
        </button>
      `;
    })
    .join("");
}

function listingCard(item, options = {}) {
  const info = categories[item.category];
  const actionButtons =
    options.mode === "mine"
      ? `
        <button class="ghost-button" data-action="detail" data-id="${item.id}" type="button">查看详情</button>
        <button class="ghost-button" data-action="close" data-id="${item.id}" type="button">标记已结束</button>
        <button class="secondary-button" data-action="remove" data-id="${item.id}" type="button">申请下架</button>
      `
      : `
        <button class="ghost-button" data-action="detail" data-id="${item.id}" type="button">查看详情</button>
        <a class="primary-button" href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp 咨询</a>
        <button class="secondary-button" data-action="report" data-id="${item.id}" type="button">举报</button>
      `;

  return `
    <article class="listing-card">
      <div class="thumb listing-thumb"><img src="${item.image || listingImages.default}" alt="${item.title}" loading="lazy" /></div>
      <div>
        <div class="listing-head">
          <div>
            <h3 class="listing-title">${item.title}</h3>
            <div class="listing-meta">
              ${categoryBadge(item.category)}
              ${statusBadge(item.status)}
              <span>${item.area}</span>
              <span>${item.price}</span>
              <span>${item.identity}</span>
            </div>
          </div>
        </div>
        <p class="listing-description">${item.description}</p>
        <div class="listing-meta">
          <span>${item.imageStatus}</span>
          <span>${item.createdAt}</span>
          <span>咨询 ${item.consults || 0}</span>
        </div>
        <div class="card-actions">${actionButtons}</div>
      </div>
    </article>
  `;
}

function renderBrowse() {
  renderCategories();
  const list = filteredPublicListings();
  document.querySelector("#browseCount").textContent = `${list.length} 条`;
  document.querySelector("#listingList").innerHTML = list.length
    ? list.map((item) => listingCard(item)).join("")
    : `<div class="empty-state">暂无信息，您可以先发布一条。</div>`;
}

function renderMine() {
  const myItems = state.listings.filter((item) => !item.id.startsWith("seed-") || item.status !== "published");
  document.querySelector("#myPostList").innerHTML = myItems.length
    ? myItems.map((item) => listingCard(item, { mode: "mine" })).join("")
    : `<div class="empty-state">还没有发布记录。</div>`;
}

function reviewableListings() {
  return state.listings.filter((item) => ["pending", "reviewing", "need_info"].includes(item.status) || item.reports?.length);
}

function renderSupport() {
  const queue = reviewableListings();
  document.querySelector("#queueCount").textContent = `${queue.length} 条`;
  if (!state.selectedReviewId && queue.length) state.selectedReviewId = queue[0].id;

  document.querySelector("#reviewQueue").innerHTML = queue.length
    ? queue
        .map((item) => {
          const active = item.id === state.selectedReviewId ? " active" : "";
          const reportText = item.reports?.length ? ` · 举报 ${item.reports.length}` : "";
          return `
            <button class="queue-item${active}" data-review-id="${item.id}" type="button">
              <strong>${item.title}</strong>
              <span>${categories[item.category]?.name} · ${statusLabels[item.status]}${reportText}</span>
            </button>
          `;
        })
        .join("")
    : `<div class="empty-state">暂无待处理信息。</div>`;

  const selected = state.listings.find((item) => item.id === state.selectedReviewId) || queue[0];
  renderReviewPanel(selected);
}

function renderReviewPanel(item) {
  const panel = document.querySelector("#reviewPanel");
  if (!item) {
    panel.innerHTML = `<div class="empty-state">选择一条信息查看审核详情。</div>`;
    return;
  }

  const reports = item.reports?.length
    ? item.reports.map((report) => `${report.reason}${report.note ? `：${report.note}` : ""}`).join("；")
    : "无";

  panel.innerHTML = `
    <div class="section-heading compact">
      <h2>审核详情</h2>
      ${statusBadge(item.status)}
    </div>
    <div class="review-image"><img src="${item.image || listingImages.default}" alt="${item.title}" /></div>
    <h3>${item.title}</h3>
    <p class="listing-description">${item.description}</p>
    <div class="detail-grid">
      <div class="detail-field"><span>分类</span>${categories[item.category]?.name}</div>
      <div class="detail-field"><span>发布身份</span>${item.identity}</div>
      <div class="detail-field"><span>区域</span>${item.area}</div>
      <div class="detail-field"><span>价格/租金/薪资</span>${item.price}</div>
      <div class="detail-field"><span>WhatsApp</span>${item.whatsapp}</div>
      <div class="detail-field"><span>图片状态</span>${item.imageStatus}</div>
      <div class="detail-field"><span>创建时间</span>${item.createdAt}</div>
      <div class="detail-field"><span>举报</span>${reports}</div>
    </div>
    <p class="field-note">审核口径：先 WhatsApp 确认，再发布。涉及押金、预付款、扣证件或高价值物品时必须二次复核。</p>
    <ul class="review-checklist">${(item.highlights || defaultListingHighlights(item.category)).map((text) => `<li>${text}</li>`).join("")}</ul>
    <div class="review-actions">
      <button class="primary-button" data-review-action="publish" data-id="${item.id}" type="button">通过发布</button>
      <button class="ghost-button" data-review-action="reviewing" data-id="${item.id}" type="button">待 WhatsApp 确认</button>
      <button class="secondary-button" data-review-action="need_info" data-id="${item.id}" type="button">要求补充</button>
      <button class="danger-button" data-review-action="reject" data-id="${item.id}" type="button">拒绝</button>
      <button class="secondary-button" data-review-action="remove" data-id="${item.id}" type="button">下架</button>
    </div>
  `;
}

function openListingDetail(id) {
  const item = state.listings.find((listing) => listing.id === id);
  const dialog = document.querySelector("#listingDetailDialog");
  if (!item || !dialog) return;
  const info = categories[item.category];
  dialog.querySelector("#listingDetailMedia").innerHTML = `<img src="${item.image || listingImages.default}" alt="${item.title}" />`;
  dialog.querySelector("#listingDetailCategory").textContent = `${info?.name || item.category} · ${item.identity}`;
  dialog.querySelector("#listingDetailTitle").textContent = item.title;
  dialog.querySelector("#listingDetailPrice").textContent = item.price;
  dialog.querySelector("#listingDetailDesc").textContent = item.description;
  dialog.querySelector("#listingDetailMeta").innerHTML = [
    ["区域", item.area],
    ["状态", statusLabels[item.status] || item.status],
    ["图片", item.imageStatus],
    ["发布时间", item.createdAt],
    ["咨询", `${item.consults || 0} 次`],
    ["浏览", `${item.views || 0} 次`],
  ]
    .map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`)
    .join("");
  dialog.querySelector("#listingDetailChecklist").innerHTML = (item.highlights || defaultListingHighlights(item.category))
    .map((text) => `<li>${text}</li>`)
    .join("");
  dialog.querySelector("#listingDetailWhatsapp").href = `https://wa.me/?text=${encodeURIComponent(`您好，我想咨询 DiliLife 同城服务：${item.title}`)}`;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeListingDetail() {
  const dialog = document.querySelector("#listingDetailDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}

function renderOps() {
  const total = state.listings.length;
  const published = state.listings.filter((item) => item.status === "published").length;
  const pending = state.listings.filter((item) => ["pending", "reviewing", "need_info"].includes(item.status)).length;
  const reports = state.listings.reduce((sum, item) => sum + (item.reports?.length || 0), 0);
  const consults = state.listings.reduce((sum, item) => sum + (item.consults || 0), 0);

  const metrics = [
    ["总发布", total],
    ["已发布", published],
    ["待处理", pending],
    ["WhatsApp 咨询", consults],
    ["举报", reports],
    ["商城回流", Math.max(6, Math.round(consults * 0.22))],
    ["拒绝/下架", state.listings.filter((item) => ["rejected", "removed"].includes(item.status)).length],
    ["客服处理耗时", "当天"],
  ];

  document.querySelector("#metricGrid").innerHTML = metrics
    .map(([label, value]) => `<div class="metric-card"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  const counts = Object.keys(categories).map((key) => {
    const categoryItems = state.listings.filter((item) => item.category === key);
    return [key, categoryItems.reduce((sum, item) => sum + (item.consults || 0) + (item.views || 0), 0)];
  });
  const max = Math.max(...counts.map(([, count]) => count), 1);

  document.querySelector("#categoryBars").innerHTML = counts
    .map(([key, count]) => {
      const width = Math.max(8, Math.round((count / max) * 100));
      return `
        <div class="bar-row">
          <strong>${categories[key].name}</strong>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
          <span>${count}</span>
        </div>
      `;
    })
    .join("");
}

function renderAll() {
  renderBrowse();
  renderMine();
  renderSupport();
  renderOps();
}

function setView(view) {
  const nextView = document.querySelector(`#${view}View`) ? view : "browse";
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === nextView));
  document.querySelectorAll(".view").forEach((panel) => panel.classList.remove("active"));
  document.querySelector(`#${nextView}View`).classList.add("active");
  if (!isEmbeddedInMainApp && location.hash.replace("#", "") !== nextView) {
    history.replaceState(null, "", `#${nextView}`);
  }
}

function updateStatus(id, status) {
  const item = state.listings.find((listing) => listing.id === id);
  if (!item) return;
  item.status = status;
  saveListings();
  renderAll();
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setView(tab.dataset.view));
  });

  document.querySelector("#openPublish").addEventListener("click", () => {
    document.querySelector("#publishDialog").showModal();
  });

  document.querySelector("#searchInput").addEventListener("input", (event) => {
    state.search = event.target.value;
    renderBrowse();
  });

  document.querySelector("#categoryFilter").addEventListener("change", (event) => {
    state.selectedCategory = event.target.value;
    renderBrowse();
  });

  document.querySelector("#categoryGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-category]");
    if (!card) return;
    state.selectedCategory = card.dataset.category;
    document.querySelector("#categoryFilter").value = state.selectedCategory;
    renderBrowse();
  });

  document.querySelector("#publishForm").addEventListener("submit", (event) => {
    if (event.submitter?.value === "cancel") return;
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const listing = {
      id: `post-${Date.now()}`,
      category: form.get("category"),
      identity: form.get("identity"),
      title: form.get("title").trim(),
      description: form.get("description").trim(),
      area: form.get("area").trim(),
      price: form.get("price").trim(),
      whatsapp: form.get("whatsapp").trim(),
      imageStatus: form.get("imageStatus"),
      image: listingImages[form.get("category")] || listingImages.default,
      highlights: defaultListingHighlights(form.get("category")),
      status: "pending",
      createdAt: nowText(),
      reports: [],
      views: 0,
      consults: 0,
    };
    state.listings.unshift(listing);
    state.selectedReviewId = listing.id;
    saveListings();
    event.currentTarget.reset();
    document.querySelector("#publishDialog").close();
    renderAll();
    showToast("已提交，等待人工审核。客服会通过 WhatsApp 确认。");
    setView("mine");
  });

  document.body.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-action='detail']");
    if (detailButton) {
      openListingDetail(detailButton.dataset.id);
      return;
    }

    const detailClose = event.target.closest("[data-listing-detail-close]");
    if (detailClose) {
      closeListingDetail();
      return;
    }

    const reportButton = event.target.closest("[data-action='report']");
    if (reportButton) {
      const dialog = document.querySelector("#reportDialog");
      dialog.querySelector("[name='listingId']").value = reportButton.dataset.id;
      dialog.showModal();
      return;
    }

    const closeButton = event.target.closest("[data-action='close']");
    if (closeButton) {
      updateStatus(closeButton.dataset.id, "closed");
      showToast("已标记为已结束。");
      return;
    }

    const removeButton = event.target.closest("[data-action='remove']");
    if (removeButton) {
      updateStatus(removeButton.dataset.id, "removed");
      showToast("已下架该信息。");
      return;
    }

    const queueButton = event.target.closest("[data-review-id]");
    if (queueButton) {
      state.selectedReviewId = queueButton.dataset.reviewId;
      renderSupport();
      return;
    }

    const reviewButton = event.target.closest("[data-review-action]");
    if (reviewButton) {
      const action = reviewButton.dataset.reviewAction;
      const map = {
        publish: "published",
        reviewing: "reviewing",
        need_info: "need_info",
        reject: "rejected",
        remove: "removed",
      };
      updateStatus(reviewButton.dataset.id, map[action]);
      showToast("审核状态已更新。");
    }
  });

  document.querySelector("#listingDetailDialog")?.addEventListener("click", (event) => {
    if (event.target.id === "listingDetailDialog") closeListingDetail();
  });

  document.querySelector("#reportForm").addEventListener("submit", (event) => {
    if (event.submitter?.value === "cancel") return;
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const item = state.listings.find((listing) => listing.id === form.get("listingId"));
    if (item) {
      item.reports = item.reports || [];
      item.reports.push({ reason: form.get("reason"), note: form.get("note").trim(), at: nowText() });
      state.selectedReviewId = item.id;
      saveListings();
      renderAll();
    }
    event.currentTarget.reset();
    document.querySelector("#reportDialog").close();
    showToast("举报已提交，客服会复核处理。");
  });

  const resetDemo = document.querySelector("#resetDemo");
  if (resetDemo) {
    resetDemo.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      state.listings = seedListings.map((item) => ({ ...item, reports: [...item.reports] }));
      state.selectedCategory = "all";
      state.search = "";
      state.selectedReviewId = null;
      document.querySelector("#searchInput").value = "";
      document.querySelector("#categoryFilter").value = "all";
      renderAll();
      showToast("演示数据已重置。");
    });
  }
}

bindEvents();
renderAll();
setView(isEmbeddedInMainApp ? "browse" : location.hash.replace("#", "") || "browse");

if (!isEmbeddedInMainApp) {
  window.addEventListener("hashchange", () => {
    setView(location.hash.replace("#", "") || "browse");
  });
}

window.addEventListener("dililife:city-view", (event) => {
  const route = event.detail?.route;
  if (["city", "support", "ops"].includes(route)) {
    setView(route === "city" ? "browse" : route);
  }
});
