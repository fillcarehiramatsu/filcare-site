/* =====================================================================
   フィルケア アクセス解析（Google Analytics 4）

   ■ 設定は下の1行だけです
     GA4の「測定ID」（G- で始まる文字列）を貼り付けてください。
     取得方法：analytics.google.com → 管理 → データストリーム → ウェブ

   ■ 自動で記録される主なもの
     ・ページの閲覧
     ・電話番号のタップ           → イベント名 tel_click
     ・LINEボタンのクリック        → イベント名 line_click
     ・お問い合わせフォームの送信  → イベント名 form_submit
     ・お知らせ記事へのクリック    → イベント名 news_click
   ===================================================================== */

var GA_ID = "G-3X4005NH3C";   // ← フィルケア公式サイトの測定ID（2026/07/29 設定）

(function () {
  if (!GA_ID || GA_ID.indexOf("G-X") === 0) {
    console.log("[analytics] 測定IDが未設定です。analytics.js の GA_ID を書き換えてください。");
    return;
  }

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  function send(name, params) {
    if (window.gtag) window.gtag("event", name, params || {});
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";

    if (href.indexOf("tel:") === 0) {
      send("tel_click", {
        link_url: href,
        page_title: document.title,
        place: a.className || "unknown"
      });
      return;
    }
    if (href.indexOf("line.me") > -1 || href.indexOf("lin.ee") > -1) {
      send("line_click", { link_url: href, page_title: document.title });
      return;
    }
    if (href.indexOf("mailto:") === 0) {
      send("mail_click", { link_url: href, page_title: document.title });
      return;
    }
    if (href.indexOf("news/") > -1 || /\/news\//.test(a.href)) {
      send("news_click", { link_url: a.href, link_text: (a.textContent || "").trim().slice(0, 60) });
    }
  }, true);

  document.addEventListener("submit", function (e) {
    if (e.target && e.target.tagName === "FORM") {
      send("form_submit", { form_id: e.target.id || "contact", page_title: document.title });
    }
  }, true);
})();
