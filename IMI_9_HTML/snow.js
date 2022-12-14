!(function (t, i) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = i())
    : "function" == typeof define && define.amd
    ? define(i)
    : (t.Snow = i());
})(this, function () {
  "use strict";
  var t = window.document,
    i = {},
    e = {
      index: 0,
      x: 0,
      y: 0,
      context: "",
      color: "rgb(255, 255, 255)",
      r: 1,

    };
  function n(t) {
    return Math.PI * (t / 180);
  }
  var h = function (t, i) {
      if (!(t instanceof i))
        throw new TypeError("Cannot call a class as a function");
    },
    o = (function () {
      function t(t, i) {
        for (var e = 0; e < i.length; e++) {
          var n = i[e];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      return function (i, e, n) {
        return e && t(i.prototype, e), n && t(i, n), i;
      };
    })(),
    a = (function () {
      function t() {
        var i =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        h(this, t), (this.option = Object.assign({}, e, i));
        var n = this.option,
          o = n.content,
          a = n.color,
          r = n.x,
          s = n.y,
          c = n.r,
          l = n.v;
        (this.color =
          a.replace("rgb", "rgba").split(")")[0] +
          "," +
          (Math.floor(50 * Math.random()) + 50) / 100 +
          ")"),
          (this.content = o),
          (this.r = c * (0.4 * Math.random() + 0.6)),
          (this.x = r),
          (this.y = s),
          (this.v = l),
          (this.angle = Math.PI * Math.random());
      }
      return (
        o(t, [
          {
            key: "draw",
            value: function () {
              var t = this.content,
                i = this.color,
                e = this.x,
                n = this.y,
                h = this.r;
              t.beginPath(),
                t.arc(Math.floor(e), Math.floor(n), h, 0, 2 * Math.PI, !0),
                t.closePath(),
                (t.fillStyle = i),
                t.fill();
            },
          },
          {
            key: "move",
            value: function () {
              var t,
                i,
                e = this.option,
                h = e.width,
                o = e.height;
              (this.x +=
                this.v *
                Math.cos(
                  ((t = this.angle) > n(15) && t <= n(90)
                    ? (t -= Math.PI / 6)
                    : t > n(90) && t <= n(165) && (t += Math.PI / 6),
                  t)
                ) *
                0.3),
                (this.y +=
                  this.v *
                  Math.sin(
                    ((i = this.angle) > n(165)
                      ? (i -= Math.PI / 4)
                      : i < n(15) && (i += Math.PI / 4),
                    i)
                  )),
                (this.y > o || this.x > h || this.x < 0) &&
                  ((this.y = 0),
                  (this.x = Math.random() * h),
                  (this.angle = Math.PI * Math.random()));
            },
          },
        ]),
        t
      );
    })();
  return (function () {
    function e(n) {
      var o =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      h(this, e),
        (this.element = t.querySelector(n)),
        (this.canvas = ""),
        (this.ctx = ""),
        (this.width = 0),
        (this.height = 0),
        (this.option = Object.assign({}, i, o)),
        (this.number = this.option.number),
        (this.partiles = []),
        this.init();
    }
    return (
      o(e, [
        {
          key: "init",
          value: function () {
            var t = this.element,
              i = t.clientWidth,
              e = t.clientHeight;
            (this.width = i),
              (this.height = e),
              this.createCanvas(),
              this.createParticle();
          },
        },
        {
          key: "createCanvas",
          value: function () {
            var i = this.element,
              e = this.width,
              n = this.height,
              h = t.createElement("canvas");
            (h.width = e),
              (h.height = n),
              (h.style.cssText =
                "position:absolute;top:0;left:0;background:rgba(0,0,0,0);pointer-events:none;z-index:1;"),
              i.appendChild(h),
              (this.canvas = h),
              (this.ctx = h.getContext("2d"));
          },
        },
        {
          key: "createParticle",
          value: function () {
            for (
              var t = this.option,
                i = t.r,
                e = t.v,
                n = this.ctx,
                h = this.width,
                o = this.height,
                r = this.number,
                s = this.partiles,
                c = 0;
              c < r;
              c += 1
            ) {
              var l = new a({
                color: "rgb(255,255,255)",
                content: n,
                y: Math.floor(Math.random() * o),
                x: Math.floor(Math.random() * h),
                r: i,
                v: e,
                width: this.width,
                height: this.height,
              });
              s.push(l), l.draw();
            }
            !(function t() {
              n.clearRect(0, 0, h, o),
                s.forEach(function (t) {
                  t.move(), t.draw();
                }),
                requestAnimationFrame(t);
            })();
          },
        },
      ]),
      e
    );
  })();
});
