(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const isCustomerEntry = urlParams.get("entry") === "client" || urlParams.get("entry") === "customer";

  const routeTitles = {
    home: "首页工作台",
    client: "客户端",
    shop: "本地购物",
    admin: "运营后台",
    supportDesk: "客服端",
    store: "门店端",
    rider: "配送员端",
    service: "维修安装",
    finance: "财务数据",
    city: "同城服务",
    support: "同城审核",
    ops: "同城复盘",
  };

  const storageKey = "dililife_main_orders_v1";
  const products = [
    { sku: "DL-FSH-101", name: "男士透气 Polo 衫", category: "服装鞋包", price: 12.9, stock: "现货 18 件", store: "Comoro Store", tag: "热卖", spec: "M/L/XL · 黑/白/深绿", delivery: "轻小件，今日可送", desc: "适合日常上班和门店员工穿搭，客服下单后确认颜色和尺码。", marker: "衣", image: "../assets/product-images-real/dl-polo-shirt-real.png" },
    { sku: "DL-FSH-118", name: "男士直筒牛仔裤", category: "服装鞋包", price: 18.5, stock: "现货 9 件", store: "Comoro Store", tag: "尺码确认", spec: "28-36 码 · 深蓝", delivery: "轻小件，今日可送", desc: "下单后客服通过 WhatsApp 确认腰围、裤长和替代尺码。", marker: "裤", image: "../assets/product-images-real/dl-jeans-real.png" },
    { sku: "DL-FSH-126", name: "女士夏季连衣裙", category: "服装鞋包", price: 16.8, stock: "少量 6 件", store: "Becora Store", tag: "款式确认", spec: "S/M/L · 粉/米白", delivery: "轻小件，今日可送", desc: "适合测试款式、颜色、尺码确认流程，客服可发送门店实拍图。", marker: "裙", image: "../assets/product-images-real/dl-dress-real.png" },
    { sku: "DL-FSH-142", name: "轻便运动鞋", category: "服装鞋包", price: 24.5, stock: "现货 12 双", store: "Comoro Store", tag: "高频咨询", spec: "39-44 码 · 橙/灰", delivery: "轻小件，今日可送", desc: "适合测试鞋码、颜色和缺货替代流程，支持货到付款。", marker: "鞋", image: "../assets/product-images-real/dl-sneakers-real.png" },
    { sku: "DL-KIT-205", name: "不锈钢高压锅 6L", category: "厨房用品", price: 42, stock: "现货 4 台", store: "Becora Store", tag: "大件确认", spec: "6L · 燃气灶适用", delivery: "需确认配送区域", desc: "厨房高客单商品，适合测试客服确认、门店备货、骑手搬运备注。", marker: "锅", image: "../assets/product-images-real/dl-pressure-cooker-real.png" },
    { sku: "DL-KIT-218", name: "智能电饭煲 3L", category: "厨房用品", price: 32, stock: "现货 7 台", store: "Comoro Store", tag: "支持售后", spec: "3L · 家庭款", delivery: "今日可送", desc: "带基础电器售后记录，适合测试售后维修安装入口。", marker: "饭", image: "../assets/product-images-real/dl-rice-cooker-real.png" },
    { sku: "DL-APP-301", name: "双门冰箱 160L", category: "大家电", price: 265, stock: "需确认", store: "Comoro Store", tag: "高客单", spec: "160L · 银色 · 送货上门", delivery: "大件配送费需客服确认", desc: "适合测试高客单、大件配送、搬运费、货到付款现金风险。", marker: "冰", image: "../assets/product-images-real/dl-fridge-real.png" },
    { sku: "DL-APP-318", name: "家用落地风扇", category: "大家电", price: 38, stock: "现货 5 台", store: "Comoro Store", tag: "季节热卖", spec: "16 寸 · 三档风速", delivery: "今日可送", desc: "夏季常见商品，适合测试门店快速备货和配送员取货。", marker: "风", image: "../assets/product-images-real/dl-floor-fan-real.png" },
    { sku: "DL-DAY-401", name: "家庭清洁套装", category: "生活用品", price: 12.5, stock: "现货 30 套", store: "Comoro Store", tag: "高频复购", spec: "洗洁精+抹布+地板清洁", delivery: "轻小件，今日可送", desc: "适合日常补货和复购测试，库存稳定，适合跑完整订单闭环。", marker: "清", image: "../assets/product-images-real/dl-cleaning-set-real.png" },
    { sku: "DL-HDW-501", name: "浴室花洒套装", category: "五金卫浴", price: 22, stock: "需确认", store: "Becora Store", tag: "可预约安装", spec: "软管+喷头+固定座", delivery: "可与安装服务联动", desc: "适合测试商品下单后转维修安装预约，配件和人工费客服先确认。", marker: "卫", image: "../assets/product-images-real/dl-shower-set-real.png" },
    { sku: "DL-BAG-601", name: "学生双肩包", category: "母婴学生", price: 15, stock: "现货 14 个", store: "Comoro Store", tag: "开学季", spec: "中号 · 防泼水", delivery: "轻小件，今日可送", desc: "适合测试颜色款式咨询、门店实拍确认和轻小件配送。", marker: "包", image: "../assets/product-images-real/dl-backpack-real.png" },
    { sku: "DL-BAB-701", name: "婴儿纸尿裤 M 码", category: "母婴学生", price: 13.8, stock: "现货 20 包", store: "Becora Store", tag: "复购商品", spec: "M 码 · 48 片", delivery: "轻小件，今日可送", desc: "适合测试高频复购、客服快捷确认和多件购物车结算。", marker: "婴", image: "../assets/product-images-real/dl-diapers-real.png" },
  ];

  const statusMeta = {
    pending_support: { label: "待客服确认", port: "客服端", tone: "warn" },
    confirmed_store: { label: "已确认待备货", port: "门店端", tone: "ok" },
    picking: { label: "门店备货中", port: "门店端", tone: "warn" },
    missing_followup: { label: "缺货待客服跟进", port: "客服端", tone: "danger" },
    ready_for_rider: { label: "已备货待取货", port: "配送员端", tone: "ok" },
    picked_up: { label: "配送员已取货", port: "配送员端", tone: "warn" },
    delivering: { label: "配送中", port: "配送员端", tone: "warn" },
    delivered_pending_cod: { label: "已送达待回款", port: "财务端", tone: "danger" },
    cod_exception: { label: "COD 差异待处理", port: "财务端", tone: "danger" },
    completed: { label: "已完成", port: "运营后台", tone: "ok" },
    cancelled: { label: "已取消", port: "运营后台", tone: "danger" },
  };

  const serviceItems = [
    {
      id: "svc-tv-install",
      category: "家电安装",
      name: "电视挂墙安装",
      price: "$18 起",
      duration: "60-90 分钟",
      area: "Dili 市区优先",
      image: "../assets/service-city-images-real/service-tv-install.png",
      desc: "适合电视、支架、墙面固定等基础安装。墙体复杂、打孔、走线和支架配件需师傅到场确认。",
      checklist: ["确认电视尺寸和墙体类型", "确认是否已有支架", "确认上门地址和可施工时间", "额外配件需再次报价"],
    },
    {
      id: "svc-washer-install",
      category: "家电安装",
      name: "洗衣机接水安装",
      price: "$12 起",
      duration: "40-70 分钟",
      area: "Comoro / Becora",
      image: "../assets/service-city-images-real/service-washer-install.png",
      desc: "检查进水、排水、电源和摆放位置，适合新购洗衣机送达后的基础安装测试。",
      checklist: ["确认水龙头和排水口位置", "确认电源安全", "现场拍照留存", "漏水风险需用户确认"],
    },
    {
      id: "svc-shower-install",
      category: "五金卫浴",
      name: "花洒套装安装",
      price: "$10 起",
      duration: "30-60 分钟",
      area: "Dili 市区",
      image: "../assets/service-city-images-real/service-shower-install.png",
      desc: "更换花洒、软管、固定座等基础卫浴配件。旧件拆卸、墙面问题和额外配件另行确认。",
      checklist: ["确认配件是否齐全", "确认旧件是否需要拆卸", "确认是否漏水", "配件费用单独记录"],
    },
    {
      id: "svc-fan-repair",
      category: "小家电维修",
      name: "风扇检测维修",
      price: "$6 检测起",
      duration: "当天检测",
      area: "门店送修优先",
      image: "../assets/service-city-images-real/service-fan-repair.png",
      desc: "针对不转、异响、开关失灵等问题先检测再报价。低价商品维修不划算时建议换新。",
      checklist: ["先收故障视频或照片", "检测费先说明", "维修前确认报价", "不维修也要记录原因"],
    },
    {
      id: "svc-rice-cooker",
      category: "小家电维修",
      name: "电饭煲检测",
      price: "$6 检测起",
      duration: "1-2 天",
      area: "Comoro Store",
      image: "../assets/service-city-images-real/service-rice-cooker-repair.png",
      desc: "适合测试商品售后和维修入口，客服先核对购买记录、故障描述和是否仍在质保期。",
      checklist: ["核对订单或购买凭证", "记录故障现象", "确认是否进水或人为损坏", "维修报价需用户确认"],
    },
    {
      id: "svc-lock-repair",
      category: "五金维修",
      name: "门锁更换维修",
      price: "$15 起",
      duration: "60 分钟起",
      area: "需确认地址",
      image: "../assets/service-city-images-real/service-lock-repair.png",
      desc: "门锁松动、损坏、更换锁芯等基础五金服务。涉及安全和产权时必须核实用户身份。",
      checklist: ["确认房屋/店面归属", "确认门锁型号", "配件单价单独记录", "完工拍照留档"],
    },
    {
      id: "svc-support",
      category: "客服售后",
      name: "订单售后工单",
      price: "按订单处理",
      duration: "当天响应",
      area: "WhatsApp 确认",
      image: "../assets/service-city-images-real/service-customer-desk.png",
      desc: "用于缺件、破损、无法使用等售后问题。客服核对订单、照片、责任方和处理方案。",
      checklist: ["核对订单号", "收集照片/视频", "判断责任方", "补发、退款或维修需闭环"],
    },
    {
      id: "svc-handover",
      category: "完工验收",
      name: "完工验收记录",
      price: "服务后记录",
      duration: "5 分钟",
      area: "所有服务适用",
      image: "../assets/service-city-images-real/service-handover.png",
      desc: "完工后记录服务结果、费用、配件、照片和质保日期，方便后续投诉、返修和复盘。",
      checklist: ["记录实收费用", "上传完工照片", "确认质保边界", "用户评价和异常备注"],
    },
  ];

  const cart = new Map([[products[0].sku, 1]]);
  let selectedCategory = "全部";
  let productSearch = "";
  let activeDetailSku = "";

  function money(value) {
    return `$${Number(value || 0).toFixed(2)}`;
  }

  function productMedia(item, className = "product-thumb") {
    if (item?.image) {
      return `<div class="${className}"><img src="${item.image}" alt="${item.name}" loading="lazy" /></div>`;
    }
    return `<div class="${className}">${item?.marker || "货"}</div>`;
  }

  function productMetaText(product) {
    return [product.sku, product.stock, product.store, product.spec].filter(Boolean).join(" · ");
  }

  function productIntro(product) {
    return `${product.name}属于${product.category}测试商品，当前价格为${money(product.price)}。${product.desc} 该商品用于模拟真实客户咨询、客服确认、门店备货、配送交接和货到付款回款流程。`;
  }

  function detailChecklist(product) {
    return [
      `确认规格：${product.spec}`,
      `确认库存：${product.stock}`,
      `备货门店：${product.store}`,
      `配送说明：${product.delivery}`,
    ];
  }

  function todayCode() {
    const date = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  }

  function loadOrders() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(storageKey, JSON.stringify(orders));
  }

  function createLog(action, actor) {
    return {
      action,
      actor,
      at: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
  }

  function orderTotal(items, deliveryFee) {
    const productTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    return {
      productTotal,
      deliveryFee,
      total: productTotal + deliveryFee,
    };
  }

  function buildDemoOrder({ idSuffix, status, customer, area, address, note, skus, rider = "未分配", collected = 0, codReturned = 0, exception = "" }) {
    const items = skus
      .map(([sku, qty]) => {
        const product = products.find((item) => item.sku === sku);
        return product ? { ...product, qty } : null;
      })
      .filter(Boolean);
    const totals = orderTotal(items, 3);
    const logs = [createLog("系统生成测试订单", "运营")];
    const statusLogMap = {
      pending_support: [],
      confirmed_store: [["客服已确认订单，交给门店备货", "客服"]],
      picking: [
        ["客服已确认订单，交给门店备货", "客服"],
        ["门店开始备货", "门店"],
      ],
      ready_for_rider: [
        ["客服已确认订单，交给门店备货", "客服"],
        ["门店开始备货", "门店"],
        ["门店备货完成，等待配送员取货", "门店"],
      ],
      delivering: [
        ["客服已确认订单，交给门店备货", "客服"],
        ["门店备货完成，等待配送员取货", "门店"],
        ["配送员已取货签收", "配送员"],
        ["配送员开始配送", "配送员"],
      ],
      delivered_pending_cod: [
        ["客服已确认订单，交给门店备货", "客服"],
        ["门店备货完成，等待配送员取货", "门店"],
        ["配送员已取货签收", "配送员"],
        ["配送员送达并记录实收现金", "配送员"],
      ],
      cod_exception: [
        ["客服已确认订单，交给门店备货", "客服"],
        ["配送员上报配送或现金异常", "配送员"],
      ],
      completed: [
        ["客服已确认订单，交给门店备货", "客服"],
        ["门店备货完成，等待配送员取货", "门店"],
        ["配送员送达并记录实收现金", "配送员"],
        ["财务确认 COD 回款，订单完成", "财务"],
      ],
    };
    (statusLogMap[status] || []).forEach(([action, actor]) => logs.push(createLog(action, actor)));
    return {
      id: `DL-${todayCode()}-${idSuffix}`,
      status,
      customer,
      phone: "+670 7xxx 100",
      whatsapp: "+670 7xxx 100",
      area,
      address,
      note,
      store: [...new Set(items.map((item) => item.store))].join(" / "),
      rider,
      items,
      productTotal: totals.productTotal,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      collected,
      codReturned,
      exception,
      logs,
    };
  }

  function demoOrders() {
    return [
      buildDemoOrder({
        idSuffix: "T01",
        status: "pending_support",
        customer: "Maria Test",
        area: "Comoro",
        address: "Comoro 主路附近，黄色门店旁",
        note: "客服先确认尺码和配送费",
        skus: [["DL-FSH-101", 1], ["DL-DAY-401", 1]],
      }),
      buildDemoOrder({
        idSuffix: "T02",
        status: "confirmed_store",
        customer: "Joao Test",
        area: "Becora",
        address: "Becora 市场后面第二条巷",
        note: "高压锅需要确认包装完好",
        skus: [["DL-KIT-205", 1]],
      }),
      buildDemoOrder({
        idSuffix: "T03",
        status: "ready_for_rider",
        customer: "Ana Test",
        area: "Timor Plaza",
        address: "Timor Plaza 附近办公室",
        note: "冰箱大件，送达前电话联系",
        skus: [["DL-APP-301", 1], ["DL-HDW-501", 1]],
        rider: "Martinho",
      }),
      buildDemoOrder({
        idSuffix: "T04",
        status: "delivered_pending_cod",
        customer: "Luis Test",
        area: "Dili Centro",
        address: "Dili Centro 商店街",
        note: "已送达，待财务确认现金交回",
        skus: [["DL-FSH-118", 1], ["DL-BAG-601", 1]],
        rider: "Martinho",
        collected: 36.5,
      }),
      buildDemoOrder({
        idSuffix: "T05",
        status: "cod_exception",
        customer: "Nina Test",
        area: "Comoro",
        address: "Comoro 学校附近",
        note: "客户少付 $5，财务待核实",
        skus: [["DL-KIT-218", 1], ["DL-BAB-701", 2]],
        rider: "Martinho",
        collected: 54.6,
        exception: "COD 少收 $5",
      }),
      buildDemoOrder({
        idSuffix: "T06",
        status: "completed",
        customer: "Pedro Test",
        area: "Becora",
        address: "Becora 临街店面",
        note: "已完成，用于 GMV 和复盘统计",
        skus: [["DL-APP-318", 1], ["DL-DAY-401", 2]],
        rider: "Martinho",
        collected: 66,
        codReturned: 66,
      }),
    ];
  }

  function renderToast(message) {
    const toast = document.querySelector("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function exportOrders() {
    const payload = {
      app: "DiliLife",
      type: "orders-backup",
      exportedAt: new Date().toISOString(),
      orders: loadOrders(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `dililife-orders-${todayCode()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    renderToast("订单数据已导出。");
  }

  function importOrders(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        const orders = Array.isArray(parsed) ? parsed : parsed.orders;
        if (!Array.isArray(orders)) throw new Error("invalid orders");
        saveOrders(orders);
        renderAllLive();
        renderToast(`已导入 ${orders.length} 条订单。`);
      } catch {
        renderToast("导入失败：请选择正确的订单 JSON 文件。");
      }
    });
    reader.readAsText(file);
  }

  function seedDemoOrders() {
    const existing = loadOrders();
    const seeded = demoOrders();
    const existingIds = new Set(existing.map((order) => order.id));
    const nextOrders = [...seeded.filter((order) => !existingIds.has(order.id)), ...existing];
    saveOrders(nextOrders);
    renderAllLive();
    renderToast("已生成多状态测试订单。");
  }

  function setRoute(route) {
    const nextRoute = isCustomerEntry ? "client" : routeTitles[route] ? route : "home";
    const routePanelMap = {
      client: "shop",
      city: "city",
      support: "city",
      ops: "city",
    };
    const panelRoute = routePanelMap[nextRoute] || nextRoute;
    document.querySelectorAll(".nav-item").forEach((button) => {
      button.classList.toggle("active", button.dataset.route === nextRoute);
    });

    document.querySelectorAll(".route").forEach((panel) => {
      panel.classList.remove("active");
    });

    const panel = document.querySelector(`#${panelRoute}Route`);
    panel.classList.add("active");
    document.querySelector("#pageTitle").textContent = routeTitles[nextRoute];

    const nextUrl = isCustomerEntry ? `${location.pathname}?entry=client#client` : `#${nextRoute}`;
    history.replaceState(null, "", nextUrl);
    if (nextRoute === "client") {
      productSearch = document.querySelector("#clientSearch")?.value || "";
      renderProducts();
    }
    window.dispatchEvent(new CustomEvent("dililife:city-view", { detail: { route: nextRoute } }));
  }

  function selectedCartItems() {
    return [...cart.entries()]
      .map(([sku, qty]) => {
        const product = products.find((item) => item.sku === sku);
        return product ? { ...product, qty } : null;
      })
      .filter(Boolean);
  }

  function renderProducts() {
    const productList = document.querySelector("#clientProductList");
    const cartSummary = document.querySelector("#clientCartSummary");
    const cartItems = document.querySelector("#clientCartItems");
    const categoryChips = document.querySelector("#clientCategoryChips");
    const productCount = document.querySelector("#clientProductCount");
    if (!productList || !cartSummary) return;

    if (categoryChips) {
      const categories = ["全部", ...new Set(products.map((product) => product.category))];
      categoryChips.innerHTML = categories
        .map((category) => `<button class="${category === selectedCategory ? "active" : ""}" data-client-category="${category}" type="button">${category}</button>`)
        .join("");
    }

    const query = productSearch.trim().toLowerCase();
    const visibleProducts = products.filter((product) => {
      const matchesCategory = selectedCategory === "全部" || product.category === selectedCategory;
      const text = `${product.name} ${product.category} ${product.sku} ${product.desc} ${product.spec} ${product.store} ${product.tag}`.toLowerCase();
      return matchesCategory && (!query || text.includes(query));
    });

    if (productCount) productCount.textContent = `${visibleProducts.length} 件`;

    productList.innerHTML = visibleProducts
      .map((product) => {
        const qty = cart.get(product.sku) || 0;
        return `
          <article class="live-product-card" data-product-detail="${product.sku}" role="button" tabindex="0" aria-label="查看 ${product.name} 详情">
            ${productMedia(product)}
            <div class="product-info">
              <span>${product.category} · ${product.tag}</span>
              <b>${product.name}</b>
              <p>${product.desc}</p>
              <small>${productMetaText(product)}</small>
              <em>${product.delivery}</em>
              <button class="product-detail-link" data-product-detail="${product.sku}" type="button">查看详情</button>
            </div>
            <strong class="product-price">${money(product.price)}</strong>
            <div class="quantity-actions">
              <button data-cart-minus="${product.sku}" type="button">-</button>
              <span>${qty}</span>
              <button data-cart-plus="${product.sku}" type="button">+</button>
            </div>
          </article>
        `;
      })
      .join("") || `<div class="live-empty">没有找到匹配商品。</div>`;

    const items = selectedCartItems();
    const totals = orderTotal(items, 3);
    if (cartItems) {
      cartItems.innerHTML = items.length
        ? items
            .filter((item) => item.qty > 0)
            .map(
              (item) => `
                <div>
                  ${productMedia(item, "cart-thumb")}
                  <span>${item.name}<small>${item.spec}</small><strong>x${item.qty}</strong></span>
                  <b>${money(item.price * item.qty)}</b>
                </div>
              `
            )
            .join("")
        : `<div><span>购物车为空</span><b>$0.00</b></div>`;
    }
    cartSummary.innerHTML = `
      <div><span>商品数量</span><b>${items.reduce((sum, item) => sum + item.qty, 0)}</b></div>
      <div><span>商品金额</span><b>${money(totals.productTotal)}</b></div>
      <div><span>预计配送费</span><b>${money(totals.deliveryFee)}</b></div>
      <div><span>COD 应收</span><b>${money(totals.total)}</b></div>
    `;
  }

  function openProductDetail(sku) {
    const product = products.find((item) => item.sku === sku);
    const dialog = document.querySelector("#productDetailDialog");
    if (!product || !dialog) return;
    activeDetailSku = sku;
    document.querySelector("#productDetailMedia").innerHTML = productMedia(product, "product-detail-image");
    document.querySelector("#productDetailCategory").textContent = `${product.category} · ${product.tag}`;
    document.querySelector("#productDetailName").textContent = product.name;
    document.querySelector("#productDetailPrice").textContent = money(product.price);
    document.querySelector("#productDetailDesc").textContent = product.desc;
    document.querySelector("#productDetailIntro").textContent = productIntro(product);
    document.querySelector("#productDetailMeta").innerHTML = [
      ["SKU", product.sku],
      ["规格", product.spec],
      ["库存", product.stock],
      ["门店", product.store],
      ["配送", product.delivery],
    ]
      .map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`)
      .join("");
    document.querySelector("#productDetailChecklist").innerHTML = detailChecklist(product)
      .map((item) => `<li>${item}</li>`)
      .join("");
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closeProductDetail() {
    const dialog = document.querySelector("#productDetailDialog");
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  function renderServiceCards() {
    const grid = document.querySelector("#serviceRealGrid");
    if (!grid) return;
    grid.innerHTML = serviceItems
      .map(
        (item) => `
          <article class="service-card service-real-card" data-service-detail="${item.id}" role="button" tabindex="0" aria-label="查看 ${item.name} 详情">
            <div class="service-card-image"><img src="${item.image}" alt="${item.name}" loading="lazy" /></div>
            <span>${item.category}</span>
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="service-card-meta">
              <b>${item.price}</b>
              <small>${item.duration}</small>
            </div>
            <button class="service-detail-link" data-service-detail="${item.id}" type="button">查看详情</button>
          </article>
        `
      )
      .join("");
  }

  function openServiceDetail(id) {
    const item = serviceItems.find((service) => service.id === id);
    const dialog = document.querySelector("#serviceDetailDialog");
    if (!item || !dialog) return;
    document.querySelector("#serviceDetailMedia").innerHTML = `<img src="${item.image}" alt="${item.name}" />`;
    document.querySelector("#serviceDetailCategory").textContent = item.category;
    document.querySelector("#serviceDetailName").textContent = item.name;
    document.querySelector("#serviceDetailPrice").textContent = item.price;
    document.querySelector("#serviceDetailDesc").textContent = item.desc;
    document.querySelector("#serviceDetailMeta").innerHTML = [
      ["预计时间", item.duration],
      ["服务区域", item.area],
      ["预约方式", "WhatsApp / 客服确认"],
      ["费用规则", "上门前先确认"],
    ]
      .map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`)
      .join("");
    document.querySelector("#serviceDetailChecklist").innerHTML = item.checklist.map((text) => `<li>${text}</li>`).join("");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeServiceDetail() {
    const dialog = document.querySelector("#serviceDetailDialog");
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function createOrder(form) {
    const items = selectedCartItems().filter((item) => item.qty > 0);
    if (!items.length) {
      renderToast("请至少选择 1 个商品。");
      return;
    }
    const orders = loadOrders();
    const totals = orderTotal(items, 3);
    const order = {
      id: `DL-${todayCode()}-${String(orders.length + 1).padStart(3, "0")}`,
      status: "pending_support",
      customer: form.get("customer").trim(),
      phone: form.get("phone").trim(),
      whatsapp: form.get("whatsapp").trim(),
      area: form.get("area").trim(),
      address: form.get("address").trim(),
      note: form.get("note").trim(),
      store: [...new Set(items.map((item) => item.store))].join(" / "),
      rider: "未分配",
      items,
      productTotal: totals.productTotal,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      collected: 0,
      codReturned: 0,
      exception: "",
      logs: [createLog("客户端提交订单", "客户")],
    };
    orders.unshift(order);
    saveOrders(orders);
    renderAllLive();
    setRoute("supportDesk");
    renderToast("测试订单已提交，已进入客服端。");
  }

  function updateOrder(id, nextStatus, action, actor, patch = {}) {
    const orders = loadOrders();
    const nextOrders = orders.map((order) => {
      if (order.id !== id) return order;
      return {
        ...order,
        ...patch,
        status: nextStatus,
        logs: [...order.logs, createLog(action, actor)],
      };
    });
    saveOrders(nextOrders);
    renderAllLive();
    renderToast(action);
  }

  function statusBadge(status) {
    const meta = statusMeta[status] || { label: status, tone: "warn", port: "" };
    return `<span class="live-status ${meta.tone}">${meta.label}</span>`;
  }

  function orderCard(order, actions = []) {
    const itemRows = order.items
      .map(
        (item) => `
          <div class="order-item-row">
            ${productMedia(item, "order-thumb")}
            <div>
              <b>${item.name} x${item.qty}</b>
              <span>${[item.sku, item.spec, item.store].filter(Boolean).join(" · ")}</span>
            </div>
            <strong>${money(item.price * item.qty)}</strong>
          </div>
        `
      )
      .join("");
    const logText = order.logs.slice(-3).map((log) => `${log.at} ${log.actor}：${log.action}`).join("<br />");
    const actionHtml = actions.length
      ? `<div class="live-actions">${actions
          .map((action) => `<button class="${action.className || "secondary"}" data-order-action="${action.key}" data-order-id="${order.id}" type="button">${action.label}</button>`)
          .join("")}</div>`
      : "";
    return `
      <article class="live-order-card">
        <div class="live-order-head">
          <div>
            <b>${order.id}</b>
            <span>${order.customer} · ${order.area} · ${order.whatsapp}</span>
          </div>
          ${statusBadge(order.status)}
        </div>
        <div class="order-item-list">${itemRows}</div>
        <div class="live-order-grid">
          <span>门店：${order.store}</span>
          <span>配送员：${order.rider}</span>
          <span>商品：${money(order.productTotal)}</span>
          <span>配送费：${money(order.deliveryFee)}</span>
          <span>COD 应收：${money(order.total)}</span>
          <span>实收：${money(order.collected)}</span>
        </div>
        <p class="live-note">地址：${order.address}${order.note ? ` / ${order.note}` : ""}</p>
        <div class="live-log">${logText}</div>
        ${actionHtml}
      </article>
    `;
  }

  function emptyState(message) {
    return `<div class="live-empty">${message}</div>`;
  }

  function renderOrderList(selector, orders, actionsForOrder, emptyMessage) {
    const target = document.querySelector(selector);
    if (!target) return;
    target.innerHTML = orders.length ? orders.map((order) => orderCard(order, actionsForOrder(order))).join("") : emptyState(emptyMessage);
  }

  function renderClientOrders(orders) {
    renderOrderList("#clientLiveOrders", orders.slice(0, 4), () => [], "还没有测试订单，先在上方提交一单。");
  }

  function renderSupportOrders(orders) {
    const queue = orders.filter((order) => ["pending_support", "missing_followup"].includes(order.status));
    renderOrderList(
      "#supportLiveOrders",
      queue,
      (order) => [
        { key: "support-confirm", label: "确认订单", className: "primary" },
        { key: "support-missing", label: "反馈缺货" },
        { key: "support-cancel", label: "取消订单" },
      ],
      "暂无待客服确认订单。"
    );
  }

  function renderStoreOrders(orders) {
    const queue = orders.filter((order) => ["confirmed_store", "picking"].includes(order.status));
    renderOrderList(
      "#storeLiveOrders",
      queue,
      (order) =>
        order.status === "confirmed_store"
          ? [
              { key: "store-start", label: "开始备货", className: "primary" },
              { key: "store-missing", label: "缺货反馈" },
            ]
          : [
              { key: "store-ready", label: "备货完成", className: "primary" },
              { key: "store-missing", label: "缺货反馈" },
            ],
      "暂无门店备货任务。"
    );
  }

  function renderRiderOrders(orders) {
    const queue = orders.filter((order) => ["ready_for_rider", "picked_up", "delivering"].includes(order.status));
    renderOrderList(
      "#riderLiveOrders",
      queue,
      (order) => {
        if (order.status === "ready_for_rider") return [{ key: "rider-pickup", label: "确认取货", className: "primary" }];
        if (order.status === "picked_up") return [{ key: "rider-delivering", label: "标记配送中", className: "primary" }];
        return [
          { key: "rider-delivered", label: "送达并收款", className: "primary" },
          { key: "rider-exception", label: "上报异常" },
        ];
      },
      "暂无配送任务。"
    );
  }

  function renderFinanceOrders(orders) {
    const queue = orders.filter((order) => ["delivered_pending_cod", "cod_exception"].includes(order.status));
    renderOrderList(
      "#financeLiveOrders",
      queue,
      (order) => [
        { key: "finance-confirm", label: "确认回款完成", className: "primary" },
        { key: "finance-diff", label: "标记 COD 差异" },
      ],
      "暂无待对账 COD 订单。"
    );
  }

  function renderAdmin(orders) {
    const statsTarget = document.querySelector("#adminLiveStats");
    if (statsTarget) {
      const completed = orders.filter((order) => order.status === "completed");
      const pendingCash = orders.filter((order) => order.status === "delivered_pending_cod");
      const gmv = completed.reduce((sum, order) => sum + order.productTotal, 0);
      statsTarget.innerHTML = [
        ["全部订单", orders.length],
        ["待客服", orders.filter((order) => order.status === "pending_support").length],
        ["门店处理中", orders.filter((order) => ["confirmed_store", "picking"].includes(order.status)).length],
        ["配送处理中", orders.filter((order) => ["ready_for_rider", "picked_up", "delivering"].includes(order.status)).length],
        ["待回款", pendingCash.length],
        ["完成 GMV", money(gmv)],
      ]
        .map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`)
        .join("");
    }
    renderOrderList("#adminLiveOrders", orders, () => [], "暂无订单。");
  }

  function renderAllLive() {
    const orders = loadOrders();
    renderProducts();
    renderServiceCards();
    renderClientOrders(orders);
    renderSupportOrders(orders);
    renderStoreOrders(orders);
    renderRiderOrders(orders);
    renderFinanceOrders(orders);
    renderAdmin(orders);
  }

  function handleOrderAction(action, id) {
    const order = loadOrders().find((item) => item.id === id);
    if (!order) return;
    const actionMap = {
      "support-confirm": () => updateOrder(id, "confirmed_store", "客服已确认订单，交给门店备货", "客服", { rider: "未分配" }),
      "support-missing": () => updateOrder(id, "missing_followup", "客服记录缺货，等待客户选择替代/等待/取消", "客服", { exception: "缺货待跟进" }),
      "support-cancel": () => updateOrder(id, "cancelled", "客服取消订单", "客服"),
      "store-start": () => updateOrder(id, "picking", "门店开始备货", "门店"),
      "store-ready": () => updateOrder(id, "ready_for_rider", "门店备货完成，等待配送员取货", "门店", { rider: "Martinho" }),
      "store-missing": () => updateOrder(id, "missing_followup", "门店反馈缺货，退回客服处理", "门店", { exception: "门店缺货" }),
      "rider-pickup": () => updateOrder(id, "picked_up", "配送员已取货签收", "配送员", { rider: "Martinho" }),
      "rider-delivering": () => updateOrder(id, "delivering", "配送员开始配送", "配送员"),
      "rider-delivered": () => updateOrder(id, "delivered_pending_cod", "配送员送达并记录实收现金", "配送员", { collected: order.total }),
      "rider-exception": () => updateOrder(id, "cod_exception", "配送员上报配送或现金异常", "配送员", { exception: "配送异常待财务/调度处理" }),
      "finance-confirm": () => updateOrder(id, "completed", "财务确认 COD 回款，订单完成", "财务", { codReturned: order.collected || order.total }),
      "finance-diff": () => updateOrder(id, "cod_exception", "财务标记 COD 差异，暂不完成", "财务", { exception: "COD 差异待关闭" }),
    };
    actionMap[action]?.();
  }

  function bindEvents() {
    if (isCustomerEntry) {
      document.body.classList.add("customer-entry");
      document.querySelector(".topbar .eyebrow").textContent = "DiliLife / 帝力生活";
      document.querySelector(".topbar h1").textContent = "本地购物";
    }

    document.querySelectorAll("[data-route]").forEach((button) => {
      button.addEventListener("click", () => setRoute(button.dataset.route));
    });

    document.querySelectorAll("[data-route-jump]").forEach((button) => {
      button.addEventListener("click", () => setRoute(button.dataset.routeJump));
    });

    document.body.addEventListener("click", (event) => {
      const plus = event.target.closest("[data-cart-plus]");
      if (plus) {
        const sku = plus.dataset.cartPlus;
        cart.set(sku, (cart.get(sku) || 0) + 1);
        renderProducts();
        return;
      }

      const minus = event.target.closest("[data-cart-minus]");
      if (minus) {
        const sku = minus.dataset.cartMinus;
        cart.set(sku, Math.max(0, (cart.get(sku) || 0) - 1));
        renderProducts();
        return;
      }

      const category = event.target.closest("[data-client-category]");
      if (category) {
        selectedCategory = category.dataset.clientCategory;
        renderProducts();
        return;
      }

      const detailTrigger = event.target.closest("[data-product-detail]");
      if (detailTrigger) {
        openProductDetail(detailTrigger.dataset.productDetail);
        return;
      }

      const detailAdd = event.target.closest("#productDetailAdd");
      if (detailAdd && activeDetailSku) {
        cart.set(activeDetailSku, (cart.get(activeDetailSku) || 0) + 1);
        renderProducts();
        renderToast("已加入购物车。");
        return;
      }

      const detailClose = event.target.closest("[data-detail-close]");
      if (detailClose) {
        closeProductDetail();
        return;
      }

      const serviceTrigger = event.target.closest("[data-service-detail]");
      if (serviceTrigger) {
        openServiceDetail(serviceTrigger.dataset.serviceDetail);
        return;
      }

      const serviceClose = event.target.closest("[data-service-close]");
      if (serviceClose) {
        closeServiceDetail();
        return;
      }

      const orderAction = event.target.closest("[data-order-action]");
      if (orderAction) {
        handleOrderAction(orderAction.dataset.orderAction, orderAction.dataset.orderId);
      }
    });

    document.body.addEventListener("keydown", (event) => {
      const productCard = event.target.closest?.(".live-product-card[data-product-detail]");
      const serviceCard = event.target.closest?.(".service-real-card[data-service-detail]");
      if (!["Enter", " "].includes(event.key)) return;
      if (!productCard && !serviceCard) return;
      event.preventDefault();
      if (productCard) openProductDetail(productCard.dataset.productDetail);
      if (serviceCard) openServiceDetail(serviceCard.dataset.serviceDetail);
    });

    document.querySelector("#productDetailDialog")?.addEventListener("click", (event) => {
      if (event.target.id === "productDetailDialog") closeProductDetail();
    });

    document.querySelector("#serviceDetailDialog")?.addEventListener("click", (event) => {
      if (event.target.id === "serviceDetailDialog") closeServiceDetail();
    });

    document.querySelector("#clientOrderForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      createOrder(new FormData(event.currentTarget));
    });

    document.querySelector("#clientSearch")?.addEventListener("input", (event) => {
      productSearch = event.target.value;
      renderProducts();
    });

    document.querySelector("#resetDemoOrders")?.addEventListener("click", () => {
      localStorage.removeItem(storageKey);
      renderAllLive();
      renderToast("演示订单已重置。");
    });

    document.querySelector("#seedDemoOrders")?.addEventListener("click", seedDemoOrders);

    document.querySelector("#exportDemoOrders")?.addEventListener("click", exportOrders);

    document.querySelector("#importDemoOrders")?.addEventListener("change", (event) => {
      importOrders(event.target.files?.[0]);
      event.target.value = "";
    });

    window.addEventListener("hashchange", () => {
      setRoute(location.hash.replace("#", ""));
    });
  }

  bindEvents();
  renderAllLive();
  setRoute(isCustomerEntry ? "client" : location.hash.replace("#", "") || "home");
})();
