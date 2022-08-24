function showSelect(){
  let body = document.querySelector("body");
  let selectarea = document.querySelector(".showmore");
  let selectcourse = document.getElementsByName("select");
  let addElement = document.createElement("select");
  addElement.innerHTML = "<option>1Q</option> <option>2Q</option> <option>3Q</option> <option>4Q</option>";
  addElement.style.marginRight = "0.3em";
  addElement.setAttribute("id", "Qselecter");
  //console.log(selectcourse[0]);
  selectarea.insertBefore(addElement, selectcourse[0]);
}
showSelect();
let Qselecter = document.getElementById("Qselecter");
Qselecter.addEventListener("change", function(){
  console.log(Qselecter.value);
  chrome.storage.sync.set({"Qselecter":Qselecter.value},function(){
    console.log("Saved");
  });
  console.log(chrome.runtime.error);
  chrome.storage.sync.get(["Qselecter"],function(items){
    console.log(items.Qselecter);
  });

});
(() => {
  var e = {
      484: function (e) {
        e.exports = (function () {
          "use strict";
          var e = 6e4,
            t = 36e5,
            n = "millisecond",
            r = "second",
            i = "minute",
            o = "hour",
            l = "day",
            _ = "week",
            u = "month",
            s = "quarter",
            a = "year",
            c = "date",
            f = "Invalid Date",
            d =
              /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            h =
              /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            p = {
              name: "en",
              weekdays:
                "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                  "_"
                ),
              months:
                "January_February_March_April_May_June_July_August_September_October_November_December".split(
                  "_"
                ),
            },
            m = function (e, t, n) {
              var r = String(e);
              return !r || r.length >= t
                ? e
                : "" + Array(t + 1 - r.length).join(n) + e;
            },
            v = {
              s: m,
              z: function (e) {
                var t = -e.utcOffset(),
                  n = Math.abs(t),
                  r = Math.floor(n / 60),
                  i = n % 60;
                return (t <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
              },
              m: function e(t, n) {
                if (t.date() < n.date()) return -e(n, t);
                var r = 12 * (n.year() - t.year()) + (n.month() - t.month()),
                  i = t.clone().add(r, u),
                  o = n - i < 0,
                  l = t.clone().add(r + (o ? -1 : 1), u);
                return +(-(r + (n - i) / (o ? i - l : l - i)) || 0);
              },
              a: function (e) {
                return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
              },
              p: function (e) {
                return (
                  {
                    M: u,
                    y: a,
                    w: _,
                    d: l,
                    D: c,
                    h: o,
                    m: i,
                    s: r,
                    ms: n,
                    Q: s,
                  }[e] ||
                  String(e || "")
                    .toLowerCase()
                    .replace(/s$/, "")
                );
              },
              u: function (e) {
                return void 0 === e;
              },
            },
            y = "en",
            g = {};
          g[y] = p;
          var $ = function (e) {
              return e instanceof b;
            },
            M = function (e, t, n) {
              var r;
              if (!e) return y;
              if ("string" == typeof e)
                g[e] && (r = e), t && ((g[e] = t), (r = e));
              else {
                var i = e.name;
                (g[i] = e), (r = i);
              }
              return !n && r && (y = r), r || (!n && y);
            },
            w = function (e, t) {
              if ($(e)) return e.clone();
              var n = "object" == typeof t ? t : {};
              return (n.date = e), (n.args = arguments), new b(n);
            },
            k = v;
          (k.l = M),
            (k.i = $),
            (k.w = function (e, t) {
              return w(e, {
                locale: t.$L,
                utc: t.$u,
                x: t.$x,
                $offset: t.$offset,
              });
            });
          var b = (function () {
              function p(e) {
                (this.$L = M(e.locale, null, !0)), this.parse(e);
              }
              var m = p.prototype;
              return (
                (m.parse = function (e) {
                  (this.$d = (function (e) {
                    var t = e.date,
                      n = e.utc;
                    if (null === t) return new Date(NaN);
                    if (k.u(t)) return new Date();
                    if (t instanceof Date) return new Date(t);
                    if ("string" == typeof t && !/Z$/i.test(t)) {
                      var r = t.match(d);
                      if (r) {
                        var i = r[2] - 1 || 0,
                          o = (r[7] || "0").substring(0, 3);
                        return n
                          ? new Date(
                              Date.UTC(
                                r[1],
                                i,
                                r[3] || 1,
                                r[4] || 0,
                                r[5] || 0,
                                r[6] || 0,
                                o
                              )
                            )
                          : new Date(
                              r[1],
                              i,
                              r[3] || 1,
                              r[4] || 0,
                              r[5] || 0,
                              r[6] || 0,
                              o
                            );
                      }
                    }
                    return new Date(t);
                  })(e)),
                    (this.$x = e.x || {}),
                    this.init();
                }),
                (m.init = function () {
                  var e = this.$d;
                  (this.$y = e.getFullYear()),
                    (this.$M = e.getMonth()),
                    (this.$D = e.getDate()),
                    (this.$W = e.getDay()),
                    (this.$H = e.getHours()),
                    (this.$m = e.getMinutes()),
                    (this.$s = e.getSeconds()),
                    (this.$ms = e.getMilliseconds());
                }),
                (m.$utils = function () {
                  return k;
                }),
                (m.isValid = function () {
                  return !(this.$d.toString() === f);
                }),
                (m.isSame = function (e, t) {
                  var n = w(e);
                  return this.startOf(t) <= n && n <= this.endOf(t);
                }),
                (m.isAfter = function (e, t) {
                  return w(e) < this.startOf(t);
                }),
                (m.isBefore = function (e, t) {
                  return this.endOf(t) < w(e);
                }),
                (m.$g = function (e, t, n) {
                  return k.u(e) ? this[t] : this.set(n, e);
                }),
                (m.unix = function () {
                  return Math.floor(this.valueOf() / 1e3);
                }),
                (m.valueOf = function () {
                  return this.$d.getTime();
                }),
                (m.startOf = function (e, t) {
                  var n = this,
                    s = !!k.u(t) || t,
                    f = k.p(e),
                    d = function (e, t) {
                      var r = k.w(
                        n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e),
                        n
                      );
                      return s ? r : r.endOf(l);
                    },
                    h = function (e, t) {
                      return k.w(
                        n
                          .toDate()
                          [e].apply(
                            n.toDate("s"),
                            (s ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)
                          ),
                        n
                      );
                    },
                    p = this.$W,
                    m = this.$M,
                    v = this.$D,
                    y = "set" + (this.$u ? "UTC" : "");
                  switch (f) {
                    case a:
                      return s ? d(1, 0) : d(31, 11);
                    case u:
                      return s ? d(1, m) : d(0, m + 1);
                    case _:
                      var g = this.$locale().weekStart || 0,
                        $ = (p < g ? p + 7 : p) - g;
                      return d(s ? v - $ : v + (6 - $), m);
                    case l:
                    case c:
                      return h(y + "Hours", 0);
                    case o:
                      return h(y + "Minutes", 1);
                    case i:
                      return h(y + "Seconds", 2);
                    case r:
                      return h(y + "Milliseconds", 3);
                    default:
                      return this.clone();
                  }
                }),
                (m.endOf = function (e) {
                  return this.startOf(e, !1);
                }),
                (m.$set = function (e, t) {
                  var _,
                    s = k.p(e),
                    f = "set" + (this.$u ? "UTC" : ""),
                    d = ((_ = {}),
                    (_[l] = f + "Date"),
                    (_[c] = f + "Date"),
                    (_[u] = f + "Month"),
                    (_[a] = f + "FullYear"),
                    (_[o] = f + "Hours"),
                    (_[i] = f + "Minutes"),
                    (_[r] = f + "Seconds"),
                    (_[n] = f + "Milliseconds"),
                    _)[s],
                    h = s === l ? this.$D + (t - this.$W) : t;
                  if (s === u || s === a) {
                    var p = this.clone().set(c, 1);
                    p.$d[d](h),
                      p.init(),
                      (this.$d = p.set(
                        c,
                        Math.min(this.$D, p.daysInMonth())
                      ).$d);
                  } else d && this.$d[d](h);
                  return this.init(), this;
                }),
                (m.set = function (e, t) {
                  return this.clone().$set(e, t);
                }),
                (m.get = function (e) {
                  return this[k.p(e)]();
                }),
                (m.add = function (n, s) {
                  var c,
                    f = this;
                  n = Number(n);
                  var d = k.p(s),
                    h = function (e) {
                      var t = w(f);
                      return k.w(t.date(t.date() + Math.round(e * n)), f);
                    };
                  if (d === u) return this.set(u, this.$M + n);
                  if (d === a) return this.set(a, this.$y + n);
                  if (d === l) return h(1);
                  if (d === _) return h(7);
                  var p =
                      ((c = {}), (c[i] = e), (c[o] = t), (c[r] = 1e3), c)[d] ||
                      1,
                    m = this.$d.getTime() + n * p;
                  return k.w(m, this);
                }),
                (m.subtract = function (e, t) {
                  return this.add(-1 * e, t);
                }),
                (m.format = function (e) {
                  var t = this,
                    n = this.$locale();
                  if (!this.isValid()) return n.invalidDate || f;
                  var r = e || "YYYY-MM-DDTHH:mm:ssZ",
                    i = k.z(this),
                    o = this.$H,
                    l = this.$m,
                    _ = this.$M,
                    u = n.weekdays,
                    s = n.months,
                    a = function (e, n, i, o) {
                      return (e && (e[n] || e(t, r))) || i[n].substr(0, o);
                    },
                    c = function (e) {
                      return k.s(o % 12 || 12, e, "0");
                    },
                    d =
                      n.meridiem ||
                      function (e, t, n) {
                        var r = e < 12 ? "AM" : "PM";
                        return n ? r.toLowerCase() : r;
                      },
                    p = {
                      YY: String(this.$y).slice(-2),
                      YYYY: this.$y,
                      M: _ + 1,
                      MM: k.s(_ + 1, 2, "0"),
                      MMM: a(n.monthsShort, _, s, 3),
                      MMMM: a(s, _),
                      D: this.$D,
                      DD: k.s(this.$D, 2, "0"),
                      d: String(this.$W),
                      dd: a(n.weekdaysMin, this.$W, u, 2),
                      ddd: a(n.weekdaysShort, this.$W, u, 3),
                      dddd: u[this.$W],
                      H: String(o),
                      HH: k.s(o, 2, "0"),
                      h: c(1),
                      hh: c(2),
                      a: d(o, l, !0),
                      A: d(o, l, !1),
                      m: String(l),
                      mm: k.s(l, 2, "0"),
                      s: String(this.$s),
                      ss: k.s(this.$s, 2, "0"),
                      SSS: k.s(this.$ms, 3, "0"),
                      Z: i,
                    };
                  return r.replace(h, function (e, t) {
                    return t || p[e] || i.replace(":", "");
                  });
                }),
                (m.utcOffset = function () {
                  return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                }),
                (m.diff = function (n, c, f) {
                  var d,
                    h = k.p(c),
                    p = w(n),
                    m = (p.utcOffset() - this.utcOffset()) * e,
                    v = this - p,
                    y = k.m(this, p);
                  return (
                    (y =
                      ((d = {}),
                      (d[a] = y / 12),
                      (d[u] = y),
                      (d[s] = y / 3),
                      (d[_] = (v - m) / 6048e5),
                      (d[l] = (v - m) / 864e5),
                      (d[o] = v / t),
                      (d[i] = v / e),
                      (d[r] = v / 1e3),
                      d)[h] || v),
                    f ? y : k.a(y)
                  );
                }),
                (m.daysInMonth = function () {
                  return this.endOf(u).$D;
                }),
                (m.$locale = function () {
                  return g[this.$L];
                }),
                (m.locale = function (e, t) {
                  if (!e) return this.$L;
                  var n = this.clone(),
                    r = M(e, t, !0);
                  return r && (n.$L = r), n;
                }),
                (m.clone = function () {
                  return k.w(this.$d, this);
                }),
                (m.toDate = function () {
                  return new Date(this.valueOf());
                }),
                (m.toJSON = function () {
                  return this.isValid() ? this.toISOString() : null;
                }),
                (m.toISOString = function () {
                  return this.$d.toISOString();
                }),
                (m.toString = function () {
                  return this.$d.toUTCString();
                }),
                p
              );
            })(),
            S = b.prototype;
          return (
            (w.prototype = S),
            [
              ["$ms", n],
              ["$s", r],
              ["$m", i],
              ["$H", o],
              ["$W", l],
              ["$M", u],
              ["$y", a],
              ["$D", c],
            ].forEach(function (e) {
              S[e[1]] = function (t) {
                return this.$g(t, e[0], e[1]);
              };
            }),
            (w.extend = function (e, t) {
              return e.$i || (e(t, b, w), (e.$i = !0)), w;
            }),
            (w.locale = M),
            (w.isDayjs = $),
            (w.unix = function (e) {
              return w(1e3 * e);
            }),
            (w.en = g[y]),
            (w.Ls = g),
            (w.p = {}),
            w
          );
        })();
      },
      831: function (e, t, n) {
        e.exports = (function (e) {
          "use strict";
          var t = (function (e) {
              return e && "object" == typeof e && "default" in e
                ? e
                : { default: e };
            })(e),
            n = {
              name: "ja",
              weekdays:
                "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
              weekdaysShort: "日_月_火_水_木_金_土".split("_"),
              weekdaysMin: "日_月_火_水_木_金_土".split("_"),
              months:
                "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
              monthsShort:
                "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
              ordinal: function (e) {
                return e + "日";
              },
              formats: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY/MM/DD",
                LL: "YYYY年M月D日",
                LLL: "YYYY年M月D日 HH:mm",
                LLLL: "YYYY年M月D日 dddd HH:mm",
                l: "YYYY/MM/DD",
                ll: "YYYY年M月D日",
                lll: "YYYY年M月D日 HH:mm",
                llll: "YYYY年M月D日(ddd) HH:mm",
              },
              meridiem: function (e) {
                return e < 12 ? "午前" : "午後";
              },
              relativeTime: {
                future: "%s後",
                past: "%s前",
                s: "数秒",
                m: "1分",
                mm: "%d分",
                h: "1時間",
                hh: "%d時間",
                d: "1日",
                dd: "%d日",
                M: "1ヶ月",
                MM: "%dヶ月",
                y: "1年",
                yy: "%d年",
              },
            };
          return t.default.locale(n, null, !0), n;
        })(n(484));
      },
      110: function (e) {
        e.exports = (function () {
          "use strict";
          return function (e, t, n) {
            e = e || {};
            var r = t.prototype,
              i = {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years",
              };
            function o(e, t, n, i) {
              return r.fromToBase(e, t, n, i);
            }
            (n.en.relativeTime = i),
              (r.fromToBase = function (t, r, o, l, _) {
                for (
                  var u,
                    s,
                    a,
                    c = o.$locale().relativeTime || i,
                    f = e.thresholds || [
                      { l: "s", r: 44, d: "second" },
                      { l: "m", r: 89 },
                      { l: "mm", r: 44, d: "minute" },
                      { l: "h", r: 89 },
                      { l: "hh", r: 21, d: "hour" },
                      { l: "d", r: 35 },
                      { l: "dd", r: 25, d: "day" },
                      { l: "M", r: 45 },
                      { l: "MM", r: 10, d: "month" },
                      { l: "y", r: 17 },
                      { l: "yy", d: "year" },
                    ],
                    d = f.length,
                    h = 0;
                  h < d;
                  h += 1
                ) {
                  var p = f[h];
                  p.d && (u = l ? n(t).diff(o, p.d, !0) : o.diff(t, p.d, !0));
                  var m = (e.rounding || Math.round)(Math.abs(u));
                  if (((a = u > 0), m <= p.r || !p.r)) {
                    m <= 1 && h > 0 && (p = f[h - 1]);
                    var v = c[p.l];
                    _ && (m = _("" + m)),
                      (s =
                        "string" == typeof v
                          ? v.replace("%d", m)
                          : v(m, r, p.l, a));
                    break;
                  }
                }
                if (r) return s;
                var y = a ? c.future : c.past;
                return "function" == typeof y ? y(s) : y.replace("%s", s);
              }),
              (r.to = function (e, t) {
                return o(e, t, this, !0);
              }),
              (r.from = function (e, t) {
                return o(e, t, this);
              });
            var l = function (e) {
              return e.$u ? n.utc() : n();
            };
            (r.toNow = function (e) {
              return this.to(l(this), e);
            }),
              (r.fromNow = function (e) {
                return this.from(l(this), e);
              });
          };
        })();
      },
    },
    t = {};
  function n(r) {
    var i = t[r];
    if (void 0 !== i) return i.exports;
    var o = (t[r] = { exports: {} });
    return e[r].call(o.exports, o, o.exports, n), o.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      "use strict";
      var e,
        t,
        r,
        i,
        o,
        l,
        _ = n(484),
        u = n.n(_),
        s = (n(831), n(110)),
        a = n.n(s),
        c = {},
        f = [],
        d = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      function h(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
      }
      function p(e) {
        var t = e.parentNode;
        t && t.removeChild(e);
      }
      function m(e, n, i, o, l) {
        var _ = {
          type: e,
          props: n,
          key: i,
          ref: o,
          __k: null,
          __: null,
          __b: 0,
          __e: null,
          __d: void 0,
          __c: null,
          __h: null,
          constructor: void 0,
          __v: null == l ? ++r : l,
        };
        return null != t.vnode && t.vnode(_), _;
      }
      function v(e) {
        return e.children;
      }
      function y(e, t) {
        (this.props = e), (this.context = t);
      }
      function g(e, t) {
        if (null == t) return e.__ ? g(e.__, e.__.__k.indexOf(e) + 1) : null;
        for (var n; t < e.__k.length; t++)
          if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
        return "function" == typeof e.type ? g(e) : null;
      }
      function $(e) {
        var t, n;
        if (null != (e = e.__) && null != e.__c) {
          for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
            if (null != (n = e.__k[t]) && null != n.__e) {
              e.__e = e.__c.base = n.__e;
              break;
            }
          return $(e);
        }
      }
      function M(e) {
        ((!e.__d && (e.__d = !0) && i.push(e) && !w.__r++) ||
          l !== t.debounceRendering) &&
          ((l = t.debounceRendering) || o)(w);
      }
      function w() {
        for (var e; (w.__r = i.length); )
          (e = i.sort(function (e, t) {
            return e.__v.__b - t.__v.__b;
          })),
            (i = []),
            e.some(function (e) {
              var t, n, r, i, o, l;
              e.__d &&
                ((o = (i = (t = e).__v).__e),
                (l = t.__P) &&
                  ((n = []),
                  ((r = h({}, i)).__v = i.__v + 1),
                  T(
                    l,
                    i,
                    r,
                    t.__n,
                    void 0 !== l.ownerSVGElement,
                    null != i.__h ? [o] : null,
                    n,
                    null == o ? g(i) : o,
                    i.__h
                  ),
                  L(n, i),
                  i.__e != o && $(i)));
            });
      }
      function k(e, t, n, r, i, o, l, _, u, s) {
        var a,
          d,
          h,
          p,
          y,
          $,
          M,
          w = (r && r.__k) || f,
          k = w.length;
        for (n.__k = [], a = 0; a < t.length; a++)
          if (
            null !=
            (p = n.__k[a] =
              null == (p = t[a]) || "boolean" == typeof p
                ? null
                : "string" == typeof p ||
                  "number" == typeof p ||
                  "bigint" == typeof p
                ? m(null, p, null, null, p)
                : Array.isArray(p)
                ? m(v, { children: p }, null, null, null)
                : p.__b > 0
                ? m(p.type, p.props, p.key, null, p.__v)
                : p)
          ) {
            if (
              ((p.__ = n),
              (p.__b = n.__b + 1),
              null === (h = w[a]) || (h && p.key == h.key && p.type === h.type))
            )
              w[a] = void 0;
            else
              for (d = 0; d < k; d++) {
                if ((h = w[d]) && p.key == h.key && p.type === h.type) {
                  w[d] = void 0;
                  break;
                }
                h = null;
              }
            T(e, p, (h = h || c), i, o, l, _, u, s),
              (y = p.__e),
              (d = p.ref) &&
                h.ref != d &&
                (M || (M = []),
                h.ref && M.push(h.ref, null, p),
                M.push(d, p.__c || y, p)),
              null != y
                ? (null == $ && ($ = y),
                  "function" == typeof p.type &&
                  null != p.__k &&
                  p.__k === h.__k
                    ? (p.__d = u = b(p, u, e))
                    : (u = S(e, p, h, w, y, u)),
                  s || "option" !== n.type
                    ? "function" == typeof n.type && (n.__d = u)
                    : (e.value = ""))
                : u && h.__e == u && u.parentNode != e && (u = g(h));
          }
        for (n.__e = $, a = k; a--; )
          null != w[a] &&
            ("function" == typeof n.type &&
              null != w[a].__e &&
              w[a].__e == n.__d &&
              (n.__d = g(r, a + 1)),
            N(w[a], w[a]));
        if (M) for (a = 0; a < M.length; a++) C(M[a], M[++a], M[++a]);
      }
      function b(e, t, n) {
        var r, i;
        for (r = 0; r < e.__k.length; r++)
          (i = e.__k[r]) &&
            ((i.__ = e),
            (t =
              "function" == typeof i.type
                ? b(i, t, n)
                : S(n, i, i, e.__k, i.__e, t)));
        return t;
      }
      function S(e, t, n, r, i, o) {
        var l, _, u;
        if (void 0 !== t.__d) (l = t.__d), (t.__d = void 0);
        else if (null == n || i != o || null == i.parentNode)
          e: if (null == o || o.parentNode !== e) e.appendChild(i), (l = null);
          else {
            for (_ = o, u = 0; (_ = _.nextSibling) && u < r.length; u += 2)
              if (_ == i) break e;
            e.insertBefore(i, o), (l = o);
          }
        return void 0 !== l ? l : i.nextSibling;
      }
      function D(e, t, n) {
        "-" === t[0]
          ? e.setProperty(t, n)
          : (e[t] =
              null == n
                ? ""
                : "number" != typeof n || d.test(t)
                ? n
                : n + "px");
      }
      function H(e, t, n, r, i) {
        var o;
        e: if ("style" === t)
          if ("string" == typeof n) e.style.cssText = n;
          else {
            if (("string" == typeof r && (e.style.cssText = r = ""), r))
              for (t in r) (n && t in n) || D(e.style, t, "");
            if (n) for (t in n) (r && n[t] === r[t]) || D(e.style, t, n[t]);
          }
        else if ("o" === t[0] && "n" === t[1])
          (o = t !== (t = t.replace(/Capture$/, ""))),
            (t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2)),
            e.l || (e.l = {}),
            (e.l[t + o] = n),
            n
              ? r || e.addEventListener(t, o ? x : Y, o)
              : e.removeEventListener(t, o ? x : Y, o);
        else if ("dangerouslySetInnerHTML" !== t) {
          if (i) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
          else if (
            "href" !== t &&
            "list" !== t &&
            "form" !== t &&
            "tabIndex" !== t &&
            "download" !== t &&
            t in e
          )
            try {
              e[t] = null == n ? "" : n;
              break e;
            } catch (e) {}
          "function" == typeof n ||
            (null != n && (!1 !== n || ("a" === t[0] && "r" === t[1]))
              ? e.setAttribute(t, n)
              : e.removeAttribute(t));
        }
      }
      function Y(e) {
        this.l[e.type + !1](t.event ? t.event(e) : e);
      }
      function x(e) {
        this.l[e.type + !0](t.event ? t.event(e) : e);
      }
      function T(e, n, r, i, o, l, _, u, s) {
        var a,
          c,
          f,
          d,
          p,
          m,
          g,
          $,
          M,
          w,
          b,
          S = n.type;
        if (void 0 !== n.constructor) return null;
        null != r.__h &&
          ((s = r.__h), (u = n.__e = r.__e), (n.__h = null), (l = [u])),
          (a = t.__b) && a(n);
        try {
          e: if ("function" == typeof S) {
            if (
              (($ = n.props),
              (M = (a = S.contextType) && i[a.__c]),
              (w = a ? (M ? M.props.value : a.__) : i),
              r.__c
                ? (g = (c = n.__c = r.__c).__ = c.__E)
                : ("prototype" in S && S.prototype.render
                    ? (n.__c = c = new S($, w))
                    : ((n.__c = c = new y($, w)),
                      (c.constructor = S),
                      (c.render = A)),
                  M && M.sub(c),
                  (c.props = $),
                  c.state || (c.state = {}),
                  (c.context = w),
                  (c.__n = i),
                  (f = c.__d = !0),
                  (c.__h = [])),
              null == c.__s && (c.__s = c.state),
              null != S.getDerivedStateFromProps &&
                (c.__s == c.state && (c.__s = h({}, c.__s)),
                h(c.__s, S.getDerivedStateFromProps($, c.__s))),
              (d = c.props),
              (p = c.state),
              f)
            )
              null == S.getDerivedStateFromProps &&
                null != c.componentWillMount &&
                c.componentWillMount(),
                null != c.componentDidMount && c.__h.push(c.componentDidMount);
            else {
              if (
                (null == S.getDerivedStateFromProps &&
                  $ !== d &&
                  null != c.componentWillReceiveProps &&
                  c.componentWillReceiveProps($, w),
                (!c.__e &&
                  null != c.shouldComponentUpdate &&
                  !1 === c.shouldComponentUpdate($, c.__s, w)) ||
                  n.__v === r.__v)
              ) {
                (c.props = $),
                  (c.state = c.__s),
                  n.__v !== r.__v && (c.__d = !1),
                  (c.__v = n),
                  (n.__e = r.__e),
                  (n.__k = r.__k),
                  n.__k.forEach(function (e) {
                    e && (e.__ = n);
                  }),
                  c.__h.length && _.push(c);
                break e;
              }
              null != c.componentWillUpdate &&
                c.componentWillUpdate($, c.__s, w),
                null != c.componentDidUpdate &&
                  c.__h.push(function () {
                    c.componentDidUpdate(d, p, m);
                  });
            }
            (c.context = w),
              (c.props = $),
              (c.state = c.__s),
              (a = t.__r) && a(n),
              (c.__d = !1),
              (c.__v = n),
              (c.__P = e),
              (a = c.render(c.props, c.state, c.context)),
              (c.state = c.__s),
              null != c.getChildContext &&
                (i = h(h({}, i), c.getChildContext())),
              f ||
                null == c.getSnapshotBeforeUpdate ||
                (m = c.getSnapshotBeforeUpdate(d, p)),
              (b =
                null != a && a.type === v && null == a.key
                  ? a.props.children
                  : a),
              k(e, Array.isArray(b) ? b : [b], n, r, i, o, l, _, u, s),
              (c.base = n.__e),
              (n.__h = null),
              c.__h.length && _.push(c),
              g && (c.__E = c.__ = null),
              (c.__e = !1);
          } else
            null == l && n.__v === r.__v
              ? ((n.__k = r.__k), (n.__e = r.__e))
              : (n.__e = O(r.__e, n, r, i, o, l, _, s));
          (a = t.diffed) && a(n);
        } catch (e) {
          (n.__v = null),
            (s || null != l) &&
              ((n.__e = u), (n.__h = !!s), (l[l.indexOf(u)] = null)),
            t.__e(e, n, r);
        }
      }
      function L(e, n) {
        t.__c && t.__c(n, e),
          e.some(function (n) {
            try {
              (e = n.__h),
                (n.__h = []),
                e.some(function (e) {
                  e.call(n);
                });
            } catch (e) {
              t.__e(e, n.__v);
            }
          });
      }
      function O(t, n, r, i, o, l, _, u) {
        var s,
          a,
          f,
          d = r.props,
          h = n.props,
          m = n.type,
          v = 0;
        if (("svg" === m && (o = !0), null != l))
          for (; v < l.length; v++)
            if (
              (s = l[v]) &&
              (s === t || (m ? s.localName == m : 3 == s.nodeType))
            ) {
              (t = s), (l[v] = null);
              break;
            }
        if (null == t) {
          if (null === m) return document.createTextNode(h);
          (t = o
            ? document.createElementNS("http://www.w3.org/2000/svg", m)
            : document.createElement(m, h.is && h)),
            (l = null),
            (u = !1);
        }
        if (null === m) d === h || (u && t.data === h) || (t.data = h);
        else {
          if (
            ((l = l && e.call(t.childNodes)),
            (a = (d = r.props || c).dangerouslySetInnerHTML),
            (f = h.dangerouslySetInnerHTML),
            !u)
          ) {
            if (null != l)
              for (d = {}, v = 0; v < t.attributes.length; v++)
                d[t.attributes[v].name] = t.attributes[v].value;
            (f || a) &&
              ((f &&
                ((a && f.__html == a.__html) || f.__html === t.innerHTML)) ||
                (t.innerHTML = (f && f.__html) || ""));
          }
          if (
            ((function (e, t, n, r, i) {
              var o;
              for (o in n)
                "children" === o ||
                  "key" === o ||
                  o in t ||
                  H(e, o, null, n[o], r);
              for (o in t)
                (i && "function" != typeof t[o]) ||
                  "children" === o ||
                  "key" === o ||
                  "value" === o ||
                  "checked" === o ||
                  n[o] === t[o] ||
                  H(e, o, t[o], n[o], r);
            })(t, h, d, o, u),
            f)
          )
            n.__k = [];
          else if (
            ((v = n.props.children),
            k(
              t,
              Array.isArray(v) ? v : [v],
              n,
              r,
              i,
              o && "foreignObject" !== m,
              l,
              _,
              l ? l[0] : r.__k && g(r, 0),
              u
            ),
            null != l)
          )
            for (v = l.length; v--; ) null != l[v] && p(l[v]);
          u ||
            ("value" in h &&
              void 0 !== (v = h.value) &&
              (v !== t.value || ("progress" === m && !v)) &&
              H(t, "value", v, d.value, !1),
            "checked" in h &&
              void 0 !== (v = h.checked) &&
              v !== t.checked &&
              H(t, "checked", v, d.checked, !1));
        }
        return t;
      }
      function C(e, n, r) {
        try {
          "function" == typeof e ? e(n) : (e.current = n);
        } catch (e) {
          t.__e(e, r);
        }
      }
      function N(e, n, r) {
        var i, o;
        if (
          (t.unmount && t.unmount(e),
          (i = e.ref) && ((i.current && i.current !== e.__e) || C(i, null, n)),
          null != (i = e.__c))
        ) {
          if (i.componentWillUnmount)
            try {
              i.componentWillUnmount();
            } catch (e) {
              t.__e(e, n);
            }
          i.base = i.__P = null;
        }
        if ((i = e.__k))
          for (o = 0; o < i.length; o++)
            i[o] && N(i[o], n, "function" != typeof e.type);
        r || null == e.__e || p(e.__e), (e.__e = e.__d = void 0);
      }
      function A(e, t, n) {
        return this.constructor(e, n);
      }
      (e = f.slice),
        (t = {
          __e: function (e, t) {
            for (var n, r, i; (t = t.__); )
              if ((n = t.__c) && !n.__)
                try {
                  if (
                    ((r = n.constructor) &&
                      null != r.getDerivedStateFromError &&
                      (n.setState(r.getDerivedStateFromError(e)), (i = n.__d)),
                    null != n.componentDidCatch &&
                      (n.componentDidCatch(e), (i = n.__d)),
                    i)
                  )
                    return (n.__E = n);
                } catch (t) {
                  e = t;
                }
            throw e;
          },
        }),
        (r = 0),
        (y.prototype.setState = function (e, t) {
          var n;
          (n =
            null != this.__s && this.__s !== this.state
              ? this.__s
              : (this.__s = h({}, this.state))),
            "function" == typeof e && (e = e(h({}, n), this.props)),
            e && h(n, e),
            null != e && this.__v && (t && this.__h.push(t), M(this));
        }),
        (y.prototype.forceUpdate = function (e) {
          this.__v && ((this.__e = !0), e && this.__h.push(e), M(this));
        }),
        (y.prototype.render = v),
        (i = []),
        (o =
          "function" == typeof Promise
            ? Promise.prototype.then.bind(Promise.resolve())
            : setTimeout),
        (w.__r = 0);
      var E,
        P,
        U,
        W = 0,
        j = [],
        q = t.__b,
        F = t.__r,
        I = t.diffed,
        V = t.__c,
        B = t.unmount;
      function z(e, n) {
        t.__h && t.__h(P, e, W || n), (W = 0);
        var r = P.__H || (P.__H = { __: [], __h: [] });
        return e >= r.__.length && r.__.push({}), r.__[e];
      }
      function J(e) {
        return (
          (W = 1),
          (function (e, t, n) {
            var r = z(E++, 2);
            return (
              (r.t = e),
              r.__c ||
                ((r.__ = [
                  ee(void 0, t),
                  function (e) {
                    var t = r.t(r.__[0], e);
                    r.__[0] !== t &&
                      ((r.__ = [t, r.__[1]]), r.__c.setState({}));
                  },
                ]),
                (r.__c = P)),
              r.__
            );
          })(ee, e)
        );
      }
      function R(e, n) {
        var r = z(E++, 3);
        !t.__s && X(r.__H, n) && ((r.__ = e), (r.__H = n), P.__H.__h.push(r));
      }
      function Z() {
        j.forEach(function (e) {
          if (e.__P)
            try {
              e.__H.__h.forEach(Q), e.__H.__h.forEach(K), (e.__H.__h = []);
            } catch (n) {
              (e.__H.__h = []), t.__e(n, e.__v);
            }
        }),
          (j = []);
      }
      (t.__b = function (e) {
        (P = null), q && q(e);
      }),
        (t.__r = function (e) {
          F && F(e), (E = 0);
          var t = (P = e.__c).__H;
          t && (t.__h.forEach(Q), t.__h.forEach(K), (t.__h = []));
        }),
        (t.diffed = function (e) {
          I && I(e);
          var n = e.__c;
          n &&
            n.__H &&
            n.__H.__h.length &&
            ((1 !== j.push(n) && U === t.requestAnimationFrame) ||
              (
                (U = t.requestAnimationFrame) ||
                function (e) {
                  var t,
                    n = function () {
                      clearTimeout(r),
                        G && cancelAnimationFrame(t),
                        setTimeout(e);
                    },
                    r = setTimeout(n, 100);
                  G && (t = requestAnimationFrame(n));
                }
              )(Z)),
            (P = void 0);
        }),
        (t.__c = function (e, n) {
          n.some(function (e) {
            try {
              e.__h.forEach(Q),
                (e.__h = e.__h.filter(function (e) {
                  return !e.__ || K(e);
                }));
            } catch (r) {
              n.some(function (e) {
                e.__h && (e.__h = []);
              }),
                (n = []),
                t.__e(r, e.__v);
            }
          }),
            V && V(e, n);
        }),
        (t.unmount = function (e) {
          B && B(e);
          var n = e.__c;
          if (n && n.__H)
            try {
              n.__H.__.forEach(Q);
            } catch (e) {
              t.__e(e, n.__v);
            }
        });
      var G = "function" == typeof requestAnimationFrame;
      function Q(e) {
        var t = P;
        "function" == typeof e.__c && e.__c(), (P = t);
      }
      function K(e) {
        var t = P;
        (e.__c = e.__()), (P = t);
      }
      function X(e, t) {
        return (
          !e ||
          e.length !== t.length ||
          t.some(function (t, n) {
            return t !== e[n];
          })
        );
      }
      function ee(e, t) {
        return "function" == typeof t ? t(e) : t;
      }
      const te = {
          query: "https://manaba.ryukoku.ac.jp/s/home_summary_query",
          survey: "https://manaba.ryukoku.ac.jp/s/home_summary_survey",
          report: "https://manaba.ryukoku.ac.jp/s/home_summary_report",
        },
        ne = async (e) => {
          const t = await fetch(te[e]),
            n = await t.text(),
            r = new DOMParser().parseFromString(n, "text/html");
          return Array.from(
            r.querySelectorAll(".querylist > li > a, .reportlist > li > a")
          ).map((e) => {
            var t, n, r;
            const i = e.getAttribute("href"),
              o = null == i ? void 0 : i.replace(/_[a-z]+_[0-9]+/, "");
            return {
              url: i && `https://manaba.ryukoku.ac.jp/ct/${i}`,
              courseUrl: o && `https://manaba.ryukoku.ac.jp/ct/${o}`,
              title:
                null === (t = e.querySelector("h3")) || void 0 === t
                  ? void 0
                  : t.innerText.replace(/\s+/g, " "),
              course:
                null === (n = e.querySelector(".info1")) || void 0 === n
                  ? void 0
                  : n.innerText.replace(/\s+/g, " "),
              due:
                null === (r = e.querySelector(".info2")) || void 0 === r
                  ? void 0
                  : r.innerText.replace("受付終了日時：", ""),
            };
          });
        };
      var re = 0;
      function ie(e, n, r, i, o) {
        var l,
          _,
          u = {};
        for (_ in n) "ref" == _ ? (l = n[_]) : (u[_] = n[_]);
        var s = {
          type: e,
          props: u,
          key: r,
          ref: l,
          __k: null,
          __: null,
          __b: 0,
          __e: null,
          __d: void 0,
          __c: null,
          __h: null,
          constructor: void 0,
          __v: --re,
          __source: i,
          __self: o,
        };
        if ("function" == typeof e && (l = e.defaultProps))
          for (_ in l) void 0 === u[_] && (u[_] = l[_]);
        return t.vnode && t.vnode(s), s;
      }
      const oe = {
          all: "すべて",
          query: "小テスト",
          survey: "アンケート",
          report: "レポート",
        },
        le = (e) => {
          const t = u()(e).diff(u()(), "day");
          return t < 1
            ? {
                backgroundColor: " hsl(7deg 86% 86%)",
                color: "hsl(17deg 46% 33%)",
              }
            : t < 3
            ? {
                backgroundColor: " hsl(47deg 86% 86%)",
                color: "hsl(74deg 46% 33%)",
              }
            : t < 7
            ? {
                backgroundColor: " hsl(87deg 86% 86%)",
                color: "hsl(134deg 46% 33%)",
              }
            : void 0;
        },
        _e = (e, t, n, r) => (r(t) ? (r(e) ? n(e, t) : 1) : -1),
        ue = (e, t) => t.trim().localeCompare(e.trim());
      u().extend(a()), u().locale("ja");
      const se = document.createElement("div"),
        ae = document.querySelector(".contentbody-left");
      if (null == ae)
        throw new Error("parent element: `.contentbody-left` does not found.");
      ae.insertBefore(se, ae.children[0]),
        (function (n, r, i) {
          var o, l, _;
          t.__ && t.__(n, r),
            (l = (o = "function" == typeof i) ? null : (i && i.__k) || r.__k),
            (_ = []),
            T(
              r,
              (n = ((!o && i) || r).__k =
                (function (t, n, r) {
                  var i,
                    o,
                    l,
                    _ = {};
                  for (l in n)
                    "key" == l
                      ? (i = n[l])
                      : "ref" == l
                      ? (o = n[l])
                      : (_[l] = n[l]);
                  if (
                    (arguments.length > 2 &&
                      (_.children =
                        arguments.length > 3 ? e.call(arguments, 2) : r),
                    "function" == typeof t && null != t.defaultProps)
                  )
                    for (l in t.defaultProps)
                      void 0 === _[l] && (_[l] = t.defaultProps[l]);
                  return m(t, _, i, o, null);
                })(v, null, [n])),
              l || c,
              c,
              void 0 !== r.ownerSVGElement,
              !o && i
                ? [i]
                : l
                ? null
                : r.firstChild
                ? e.call(r.childNodes)
                : null,
              _,
              !o && i ? i : l ? l.__e : r.firstChild,
              o
            ),
            L(_, n);
        })(
          ie(() => {
            const [e, t] = J("all"),
              [n, r] = J(void 0),
              [i, o] = J(!1),
              l = (function (e, t) {
                return (
                  (W = 8),
                  (function (e, t) {
                    var n = z(E++, 7);
                    return (
                      X(n.__H, t) && ((n.__ = e()), (n.__H = t), (n.__h = e)),
                      n.__
                    );
                  })(function () {
                    return e;
                  }, t)
                );
              })(async () => {
                const e = !i;
                o(e), await chrome.storage.local.set({ taskListShowAll: e });
              }, [i]);
            R(() => {
              chrome.storage.local.get(
                "taskListShowAll",
                ({ taskListShowAll: e }) => o(e ?? !1)
              );
              const e = ({ tasksInfo: e }, t) => {
                "local" === t &&
                  null != (null == e ? void 0 : e.newValue) &&
                  r(e.newValue);
              };
              return (
                chrome.storage.onChanged.addListener(e),
                () => {
                  chrome.storage.onChanged.removeListener(e);
                }
              );
            }, []),
              R(() => {
                (async () => {
                  const e = ["query", "survey", "report"].map(async (e) => [
                    e,
                    await ne(e),
                  ]);
                  return Object.fromEntries(await Promise.all(e));
                })().then((e) => {
                  r(e);
                });
              }, []);
            const _ =
              n &&
              ((e, t) =>
                "all" !== t
                  ? e[t]
                  : Object.values(e)
                      .flat()
                      .sort(
                        (e, t) =>
                          _e(
                            e.due,
                            t.due,
                            (e, t) => u()(e).diff(t),
                            (e) => null != e && u()(e).isValid
                          ) ||
                          _e(e.course, t.course, ue, (e) => null != e) ||
                          _e(e.title, t.title, ue, (e) => null != e)
                      ))(n, e);
            return ie("div", {
              className: "my-infolist my-infolist-coursenews",
              children: [
                ie("div", {
                  className: "my-infolist-header",
                  children: ie("h2", { children: "課題" }),
                }),
                ie("ul", {
                  className: "infolist-tab",
                  children: ["all", "query", "survey", "report"].map((n) =>
                    ie(
                      "li",
                      {
                        className: n === e ? "current" : "",
                        children: ie("a", {
                          onClick: () => t(n),
                          children: oe[n],
                        }),
                      },
                      n
                    )
                  ),
                }),
                ie("div", {
                  className: "my-infolist-body",
                  children: [
                    ie("div", {
                      className: "groupthreadlist",
                      style: { minHeight: 156 },
                      children: [
                        null == _ &&
                          ie("p", {
                            children: [
                              "読み込み中...",
                            ],
                          }),
                        null != _ &&
                          0 === _.length &&
                          ie(v, {
                            children: [
                              ie("p", {
                                children: [
                                  "未提出の課題はありません",
                                ],
                              }),
                            ],
                          }),
                        null != _ &&
                          ie("table", {
                            children: ie("tbody", {
                              children: _.slice(0, i ? void 0 : 5).map((e) =>
                                ie(
                                  "tr",
                                  {
                                    style: null != e.due ? le(e.due) : void 0,
                                    children: [
                                      ie("td", {
                                        width: "15%",
                                        style:
                                          null != e.due &&
                                          u()(e.due).diff(u()(), "day") < 7
                                            ? { fontWeight: "bold" }
                                            : void 0,
                                        title: e.due ?? void 0,
                                        children: e.due && u()(e.due).fromNow(),
                                      }),
                                      ie("th", {
                                        style: {
                                          backgroundImage: "none",
                                          padding: 0,
                                        },
                                        children: ie("div", {
                                          className: "news-title newsentry",
                                          style: { width: 350 },
                                          children: [
                                            ie("img", {
                                              src: "/icon-coursedeadline-on.png",
                                              className: "inline",
                                              alt: "未提出の課題",
                                            }),
                                            ie("a", {
                                              href: e.url ?? "",
                                              title: e.title ?? "",
                                              style: {
                                                width: "auto",
                                                display: "inline",
                                              },
                                              children: e.title,
                                            }),
                                          ],
                                        }),
                                      }),
                                      ie("td", {
                                        children: ie("div", {
                                          className: "news-courseinfo",
                                          title: e.course ?? void 0,
                                          style: {
                                            width: 200,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                          },
                                          children:
                                            e.course &&
                                            ie("a", {
                                              href: e.courseUrl ?? "",
                                              children: e.course,
                                            }),
                                        }),
                                      }),
                                    ],
                                  },
                                  e.url
                                )
                              ),
                            }),
                          }),
                      ],
                    }),
                    ie("div", {
                      className: "showmore",
                      children: [
                        ie("img", {
                          src: "/icon_mypage_showmore.png",
                          alt: "",
                          className: "inline",
                          title: "",
                        }),
                        ie("a", {
                          href: "#",
                          onClick: l,
                          children: i ? "一部を表示" : "すべて表示",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          }, {}),
          se
        );
    })();
})();
