/* =====================================================================
   フィルケア お知らせ 記事データ
   ---------------------------------------------------------------------
   ■ 記事を公開するとき
     該当する行の  published: false  を  published: true  に書き換えるだけです。
     トップページの「新着情報」と、お知らせ一覧の両方に自動で追加されます。
     並び順は date（日付）の新しい順に自動で並びます。

   ■ 記事を非公開に戻すとき
     published を false に戻してください。

   ■ 新しい記事を足すとき
     news フォルダに ○○.html を置き、下に1行追加してください。
     cat は「制度のこと／お知らせ／連携の方へ／季節の話題／ステーションから」
   ===================================================================== */
var FILLCARE_NEWS = [
  { slug: "riyou-no-nagare", date: "2026-08-01", cat: "制度のこと", title: "訪問看護を利用するまでの流れ", published: true },
  { slug: "jiritsushien-shinsei", date: "2026-08-01", cat: "制度のこと", title: "自立支援医療（精神通院）の申請方法", published: true },
  { slug: "koufun-bougen-case", date: "2026-08-01", cat: "連携の方へ", title: "興奮や暴言がみられるケースへの訪問看護", published: true },
  { slug: "obon-2026", date: "2026-08-03", cat: "お知らせ", title: "お盆期間の営業についてのご案内", published: true },
  { slug: "hoken-tsukaiwake", date: "2026-09-01", cat: "制度のこと", title: "訪問看護は医療保険？ 介護保険？ どちらを使うのか", published: true },
  { slug: "taiou-case", date: "2026-10-01", cat: "連携の方へ", title: "お受けできるケース一覧（ケアマネジャー・退院支援ご担当の方へ）", published: false },
  { slug: "touki-utsu", date: "2026-11-02", cat: "季節の話題", title: "冬になると落ち込む ― 季節性感情障害（冬季うつ）をご存じですか", published: false },
  { slug: "nenmatsu-nenshi-2026", date: "2026-12-01", cat: "お知らせ", title: "年末年始の営業についてのご案内", published: false },
  { slug: "shijisho-tanomikata", date: "2027-01-04", cat: "制度のこと", title: "主治医に「訪問看護指示書」を書いてもらう頼み方", published: false },
  { slug: "jiritsushien-koushin", date: "2027-02-01", cat: "季節の話題", title: "自立支援医療の更新、忘れていませんか", published: false },
  { slug: "shokai-houmon-nissu", date: "2027-03-01", cat: "連携の方へ", title: "ご依頼から初回訪問までの日数の目安", published: false },
  { slug: "shinnendo-taisei-2027", date: "2027-04-01", cat: "ステーションから", title: "新年度の体制についてのご案内", published: false },
  { slug: "gogatsubyou", date: "2027-05-03", cat: "季節の話題", title: "連休明けの不調（5月病）との付き合い方", published: false },
  { slug: "seishin-techou", date: "2027-06-01", cat: "制度のこと", title: "精神障害者保健福祉手帳でできること", published: false },
  { slug: "necchusho-to-kusuri", date: "2027-07-01", cat: "季節の話題", title: "向精神薬と熱中症 ― 汗をかきにくくなる薬があります", published: false },
  { slug: "shougai-nenkin", date: "2027-09-01", cat: "制度のこと", title: "障害年金の基礎知識 ― 精神疾患も対象になります", published: false },
  { slug: "kazoku-no-kyori", date: "2027-10-01", cat: "制度のこと", title: "ご家族はどこまで関わればいい？ 距離の取り方について", published: false },
  { slug: "seishinka-to-ippan", date: "2028-01-04", cat: "連携の方へ", title: "精神科訪問看護と一般の訪問看護、何が違うのか", published: false },
  { slug: "saigai-sonae", date: "2028-03-01", cat: "制度のこと", title: "災害への備え ― お薬の備蓄はできていますか", published: false },
  { slug: "kenshu-houkoku-2028", date: "2028-04-03", cat: "ステーションから", title: "研修参加・資格取得のご報告", published: false },
  { slug: "renkei-to-houkoku", date: "2028-06-01", cat: "連携の方へ", title: "主治医・関係機関との連携と、ご報告の頻度について", published: false },
];

/* 以下は表示処理です。通常は編集不要です。 */
var FILLCARE_NEWS_CLS = {"制度のこと": "", "お知らせ": "c-oshirase", "連携の方へ": "c-renkei", "季節の話題": "c-kisetsu", "ステーションから": "c-station"};

function fillcareRenderNews(elId, opts) {
  var el = document.getElementById(elId);
  if (!el) return;
  opts = opts || {};
  var prefix = opts.prefix || "";
  var limit  = opts.limit  || 0;
  var cls    = opts.itemClass || "topnews";
  var list = FILLCARE_NEWS.filter(function(a){ return a.published; })
                          .sort(function(a,b){ return a.date < b.date ? 1 : -1; });
  if (limit > 0) list = list.slice(0, limit);
  if (!list.length) { el.innerHTML = '<p style="color:#7a8a7e;font-size:.9rem;padding:1rem 0">現在、公開中のお知らせはありません。</p>'; return; }
  el.innerHTML = list.map(function(a){
    var c = FILLCARE_NEWS_CLS[a.cat] || "";
    var d = a.date.replace(/-/g, ".");
    return '<a class="' + cls + '-item" href="' + prefix + 'news/' + a.slug + '.html">' +
             '<span class="' + cls + '-date">' + d + '</span>' +
             '<span class="' + cls + '-cat ' + c + '">' + a.cat + '</span>' +
             '<span class="' + cls + '-title">' + a.title + '</span>' +
           '</a>';
  }).join("");
}
