import { ChainId, MaxUint256, sqrt, Price, CurrencyAmount, Percent, TradeType, Fraction, sortedInsert, validateAndParseAddress } from '@storyhunt/sdk-core';
import JSBI from 'jsbi';
import invariant from 'tiny-invariant';
import DEFAULT_ADDRESS_LIST from '@storyhunt/default-list/build/storyhunt-default.constantlist.json';
import { defaultAbiCoder, Interface } from '@ethersproject/abi';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelperLoose(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function () {
      return o >= r.length ? {
        done: !0
      } : {
        done: !1,
        value: r[o++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var _TICK_SPACINGS;
var FACTORY_ADDRESS = DEFAULT_ADDRESS_LIST.constants[ChainId.ODYSSEY].V3_FACTORY_CONTRACT.address;
var DEPLOYER_ADDRESS = DEFAULT_ADDRESS_LIST.constants[ChainId.ODYSSEY].V3_POOL_DEPLOYER.address;
var ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
var POOL_INIT_CODE_HASH = '0x5c1ebb91ef1669cb3e664cbf78650858b19d8a4247ca18abab152d5d4f1604db';
/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
var FeeAmount;
(function (FeeAmount) {
  FeeAmount[FeeAmount["LOWEST"] = 100] = "LOWEST";
  FeeAmount[FeeAmount["LOW_200"] = 200] = "LOW_200";
  FeeAmount[FeeAmount["LOW_300"] = 300] = "LOW_300";
  FeeAmount[FeeAmount["LOW_400"] = 400] = "LOW_400";
  FeeAmount[FeeAmount["LOW"] = 500] = "LOW";
  FeeAmount[FeeAmount["MEDIUM"] = 3000] = "MEDIUM";
  FeeAmount[FeeAmount["HIGH"] = 10000] = "HIGH";
})(FeeAmount || (FeeAmount = {}));
/**
 * The default factory tick spacings by fee amount.
 */
var TICK_SPACINGS = (_TICK_SPACINGS = {}, _TICK_SPACINGS[FeeAmount.LOWEST] = 1, _TICK_SPACINGS[FeeAmount.LOW_200] = 4, _TICK_SPACINGS[FeeAmount.LOW_300] = 6, _TICK_SPACINGS[FeeAmount.LOW_400] = 8, _TICK_SPACINGS[FeeAmount.LOW] = 10, _TICK_SPACINGS[FeeAmount.MEDIUM] = 60, _TICK_SPACINGS[FeeAmount.HIGH] = 200, _TICK_SPACINGS);

// constants used internally but not expected to be used externally
var NEGATIVE_ONE = /*#__PURE__*/JSBI.BigInt(-1);
var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
// used in liquidity amount math
var Q96 = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(96));
var Q192 = /*#__PURE__*/JSBI.exponentiate(Q96, /*#__PURE__*/JSBI.BigInt(2));

/**
 * Computes a pool address
 * @param factoryAddress The StoryHunt V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @param chainId
 * @returns The pool address
 */
function computePoolAddress(_ref) {
  var tokenA = _ref.tokenA,
    tokenB = _ref.tokenB,
    fee = _ref.fee,
    deployerAddressManualOverride = _ref.deployerAddressManualOverride,
    initCodeHashManualOverride = _ref.initCodeHashManualOverride;
  var _ref2 = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA],
    token0 = _ref2[0],
    token1 = _ref2[1]; // does safety checks
  var salt = keccak256(['bytes'], [defaultAbiCoder.encode(['address', 'address', 'uint24'], [token0.address, token1.address, fee])]);
  var initCodeHash = initCodeHashManualOverride != null ? initCodeHashManualOverride : POOL_INIT_CODE_HASH;
  var deployerAddress = deployerAddressManualOverride != null ? deployerAddressManualOverride : DEPLOYER_ADDRESS;
  return getCreate2Address(deployerAddress, salt, initCodeHash);
}

var FullMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function FullMath() {}
  FullMath.mulDivRoundingUp = function mulDivRoundingUp(a, b, denominator) {
    var product = JSBI.multiply(a, b);
    var result = JSBI.divide(product, denominator);
    if (JSBI.notEqual(JSBI.remainder(product, denominator), ZERO)) result = JSBI.add(result, ONE);
    return result;
  };
  return FullMath;
}();

var MaxUint160 = /*#__PURE__*/JSBI.subtract(/*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(160)), ONE);
function multiplyIn256(x, y) {
  var product = JSBI.multiply(x, y);
  return JSBI.bitwiseAnd(product, MaxUint256);
}
function addIn256(x, y) {
  var sum = JSBI.add(x, y);
  return JSBI.bitwiseAnd(sum, MaxUint256);
}
var SqrtPriceMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SqrtPriceMath() {}
  SqrtPriceMath.getAmount0Delta = function getAmount0Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
    if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
      var _ref = [sqrtRatioBX96, sqrtRatioAX96];
      sqrtRatioAX96 = _ref[0];
      sqrtRatioBX96 = _ref[1];
    }
    var numerator1 = JSBI.leftShift(liquidity, JSBI.BigInt(96));
    var numerator2 = JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96);
    return roundUp ? FullMath.mulDivRoundingUp(FullMath.mulDivRoundingUp(numerator1, numerator2, sqrtRatioBX96), ONE, sqrtRatioAX96) : JSBI.divide(JSBI.divide(JSBI.multiply(numerator1, numerator2), sqrtRatioBX96), sqrtRatioAX96);
  };
  SqrtPriceMath.getAmount1Delta = function getAmount1Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
    if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
      var _ref2 = [sqrtRatioBX96, sqrtRatioAX96];
      sqrtRatioAX96 = _ref2[0];
      sqrtRatioBX96 = _ref2[1];
    }
    return roundUp ? FullMath.mulDivRoundingUp(liquidity, JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96), Q96) : JSBI.divide(JSBI.multiply(liquidity, JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96)), Q96);
  };
  SqrtPriceMath.getNextSqrtPriceFromInput = function getNextSqrtPriceFromInput(sqrtPX96, liquidity, amountIn, zeroForOne) {
    !JSBI.greaterThan(sqrtPX96, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
    !JSBI.greaterThan(liquidity, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
    return zeroForOne ? this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountIn, true) : this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountIn, true);
  };
  SqrtPriceMath.getNextSqrtPriceFromOutput = function getNextSqrtPriceFromOutput(sqrtPX96, liquidity, amountOut, zeroForOne) {
    !JSBI.greaterThan(sqrtPX96, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
    !JSBI.greaterThan(liquidity, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
    return zeroForOne ? this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountOut, false) : this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountOut, false);
  };
  SqrtPriceMath.getNextSqrtPriceFromAmount0RoundingUp = function getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amount, add) {
    if (JSBI.equal(amount, ZERO)) return sqrtPX96;
    var numerator1 = JSBI.leftShift(liquidity, JSBI.BigInt(96));
    if (add) {
      var product = multiplyIn256(amount, sqrtPX96);
      if (JSBI.equal(JSBI.divide(product, amount), sqrtPX96)) {
        var denominator = addIn256(numerator1, product);
        if (JSBI.greaterThanOrEqual(denominator, numerator1)) {
          return FullMath.mulDivRoundingUp(numerator1, sqrtPX96, denominator);
        }
      }
      return FullMath.mulDivRoundingUp(numerator1, ONE, JSBI.add(JSBI.divide(numerator1, sqrtPX96), amount));
    } else {
      var _product = multiplyIn256(amount, sqrtPX96);
      !JSBI.equal(JSBI.divide(_product, amount), sqrtPX96) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
      !JSBI.greaterThan(numerator1, _product) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
      var _denominator = JSBI.subtract(numerator1, _product);
      return FullMath.mulDivRoundingUp(numerator1, sqrtPX96, _denominator);
    }
  };
  SqrtPriceMath.getNextSqrtPriceFromAmount1RoundingDown = function getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amount, add) {
    if (add) {
      var quotient = JSBI.lessThanOrEqual(amount, MaxUint160) ? JSBI.divide(JSBI.leftShift(amount, JSBI.BigInt(96)), liquidity) : JSBI.divide(JSBI.multiply(amount, Q96), liquidity);
      return JSBI.add(sqrtPX96, quotient);
    } else {
      var _quotient = FullMath.mulDivRoundingUp(amount, Q96, liquidity);
      !JSBI.greaterThan(sqrtPX96, _quotient) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
      return JSBI.subtract(sqrtPX96, _quotient);
    }
  };
  return SqrtPriceMath;
}();

var MAX_FEE = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(10), /*#__PURE__*/JSBI.BigInt(6));
var SwapMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SwapMath() {}
  SwapMath.computeSwapStep = function computeSwapStep(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, amountRemaining, feePips) {
    var returnValues = {};
    feePips = JSBI.BigInt(feePips);
    var zeroForOne = JSBI.greaterThanOrEqual(sqrtRatioCurrentX96, sqrtRatioTargetX96);
    var exactIn = JSBI.greaterThanOrEqual(amountRemaining, ZERO);
    if (exactIn) {
      var amountRemainingLessFee = JSBI.divide(JSBI.multiply(amountRemaining, JSBI.subtract(MAX_FEE, feePips)), MAX_FEE);
      returnValues.amountIn = zeroForOne ? SqrtPriceMath.getAmount0Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, true) : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, true);
      if (JSBI.greaterThanOrEqual(amountRemainingLessFee, returnValues.amountIn)) {
        returnValues.sqrtRatioNextX96 = sqrtRatioTargetX96;
      } else {
        returnValues.sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromInput(sqrtRatioCurrentX96, liquidity, amountRemainingLessFee, zeroForOne);
      }
    } else {
      returnValues.amountOut = zeroForOne ? SqrtPriceMath.getAmount1Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, false) : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, false);
      if (JSBI.greaterThanOrEqual(JSBI.multiply(amountRemaining, NEGATIVE_ONE), returnValues.amountOut)) {
        returnValues.sqrtRatioNextX96 = sqrtRatioTargetX96;
      } else {
        returnValues.sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromOutput(sqrtRatioCurrentX96, liquidity, JSBI.multiply(amountRemaining, NEGATIVE_ONE), zeroForOne);
      }
    }
    var max = JSBI.equal(sqrtRatioTargetX96, returnValues.sqrtRatioNextX96);
    if (zeroForOne) {
      returnValues.amountIn = max && exactIn ? returnValues.amountIn : SqrtPriceMath.getAmount0Delta(returnValues.sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, true);
      returnValues.amountOut = max && !exactIn ? returnValues.amountOut : SqrtPriceMath.getAmount1Delta(returnValues.sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, false);
    } else {
      returnValues.amountIn = max && exactIn ? returnValues.amountIn : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, returnValues.sqrtRatioNextX96, liquidity, true);
      returnValues.amountOut = max && !exactIn ? returnValues.amountOut : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, returnValues.sqrtRatioNextX96, liquidity, false);
    }
    if (!exactIn && JSBI.greaterThan(returnValues.amountOut, JSBI.multiply(amountRemaining, NEGATIVE_ONE))) {
      returnValues.amountOut = JSBI.multiply(amountRemaining, NEGATIVE_ONE);
    }
    if (exactIn && JSBI.notEqual(returnValues.sqrtRatioNextX96, sqrtRatioTargetX96)) {
      // we didn't reach the target, so take the remainder of the maximum input as fee
      returnValues.feeAmount = JSBI.subtract(amountRemaining, returnValues.amountIn);
    } else {
      returnValues.feeAmount = FullMath.mulDivRoundingUp(returnValues.amountIn, feePips, JSBI.subtract(MAX_FEE, feePips));
    }
    return [returnValues.sqrtRatioNextX96, returnValues.amountIn, returnValues.amountOut, returnValues.feeAmount];
  };
  return SwapMath;
}();

var LiquidityMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function LiquidityMath() {}
  LiquidityMath.addDelta = function addDelta(x, y) {
    if (JSBI.lessThan(y, ZERO)) {
      return JSBI.subtract(x, JSBI.multiply(y, NEGATIVE_ONE));
    } else {
      return JSBI.add(x, y);
    }
  };
  return LiquidityMath;
}();

var TWO = /*#__PURE__*/JSBI.BigInt(2);
var POWERS_OF_2 = /*#__PURE__*/[128, 64, 32, 16, 8, 4, 2, 1].map(function (pow) {
  return [pow, JSBI.exponentiate(TWO, JSBI.BigInt(pow))];
});
function mostSignificantBit(x) {
  !JSBI.greaterThan(x, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ZERO') : invariant(false) : void 0;
  !JSBI.lessThanOrEqual(x, MaxUint256) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX') : invariant(false) : void 0;
  var msb = 0;
  for (var _iterator = _createForOfIteratorHelperLoose(POWERS_OF_2), _step; !(_step = _iterator()).done;) {
    var _step$value = _step.value,
      power = _step$value[0],
      min = _step$value[1];
    if (JSBI.greaterThanOrEqual(x, min)) {
      x = JSBI.signedRightShift(x, JSBI.BigInt(power));
      msb += power;
    }
  }
  return msb;
}

function mulShift(val, mulBy) {
  return JSBI.signedRightShift(JSBI.multiply(val, JSBI.BigInt(mulBy)), JSBI.BigInt(128));
}
var Q32 = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(32));
var TickMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function TickMath() {}
  /**
   * Returns the sqrt ratio as a Q64.96 for the given tick. The sqrt ratio is computed as sqrt(1.0001)^tick
   * @param tick the tick for which to compute the sqrt ratio
   */
  TickMath.getSqrtRatioAtTick = function getSqrtRatioAtTick(tick) {
    !(tick >= TickMath.MIN_TICK && tick <= TickMath.MAX_TICK && Number.isInteger(tick)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK') : invariant(false) : void 0;
    var absTick = tick < 0 ? tick * -1 : tick;
    var ratio = (absTick & 0x1) !== 0 ? JSBI.BigInt('0xfffcb933bd6fad37aa2d162d1a594001') : JSBI.BigInt('0x100000000000000000000000000000000');
    if ((absTick & 0x2) !== 0) ratio = mulShift(ratio, '0xfff97272373d413259a46990580e213a');
    if ((absTick & 0x4) !== 0) ratio = mulShift(ratio, '0xfff2e50f5f656932ef12357cf3c7fdcc');
    if ((absTick & 0x8) !== 0) ratio = mulShift(ratio, '0xffe5caca7e10e4e61c3624eaa0941cd0');
    if ((absTick & 0x10) !== 0) ratio = mulShift(ratio, '0xffcb9843d60f6159c9db58835c926644');
    if ((absTick & 0x20) !== 0) ratio = mulShift(ratio, '0xff973b41fa98c081472e6896dfb254c0');
    if ((absTick & 0x40) !== 0) ratio = mulShift(ratio, '0xff2ea16466c96a3843ec78b326b52861');
    if ((absTick & 0x80) !== 0) ratio = mulShift(ratio, '0xfe5dee046a99a2a811c461f1969c3053');
    if ((absTick & 0x100) !== 0) ratio = mulShift(ratio, '0xfcbe86c7900a88aedcffc83b479aa3a4');
    if ((absTick & 0x200) !== 0) ratio = mulShift(ratio, '0xf987a7253ac413176f2b074cf7815e54');
    if ((absTick & 0x400) !== 0) ratio = mulShift(ratio, '0xf3392b0822b70005940c7a398e4b70f3');
    if ((absTick & 0x800) !== 0) ratio = mulShift(ratio, '0xe7159475a2c29b7443b29c7fa6e889d9');
    if ((absTick & 0x1000) !== 0) ratio = mulShift(ratio, '0xd097f3bdfd2022b8845ad8f792aa5825');
    if ((absTick & 0x2000) !== 0) ratio = mulShift(ratio, '0xa9f746462d870fdf8a65dc1f90e061e5');
    if ((absTick & 0x4000) !== 0) ratio = mulShift(ratio, '0x70d869a156d2a1b890bb3df62baf32f7');
    if ((absTick & 0x8000) !== 0) ratio = mulShift(ratio, '0x31be135f97d08fd981231505542fcfa6');
    if ((absTick & 0x10000) !== 0) ratio = mulShift(ratio, '0x9aa508b5b7a84e1c677de54f3e99bc9');
    if ((absTick & 0x20000) !== 0) ratio = mulShift(ratio, '0x5d6af8dedb81196699c329225ee604');
    if ((absTick & 0x40000) !== 0) ratio = mulShift(ratio, '0x2216e584f5fa1ea926041bedfe98');
    if ((absTick & 0x80000) !== 0) ratio = mulShift(ratio, '0x48a170391f7dc42444e8fa2');
    if (tick > 0) ratio = JSBI.divide(MaxUint256, ratio);
    // back to Q96
    return JSBI.greaterThan(JSBI.remainder(ratio, Q32), ZERO) ? JSBI.add(JSBI.divide(ratio, Q32), ONE) : JSBI.divide(ratio, Q32);
  }
  /**
   * Returns the tick corresponding to a given sqrt ratio, s.t. #getSqrtRatioAtTick(tick) <= sqrtRatioX96
   * and #getSqrtRatioAtTick(tick + 1) > sqrtRatioX96
   * @param sqrtRatioX96 the sqrt ratio as a Q64.96 for which to compute the tick
   */;
  TickMath.getTickAtSqrtRatio = function getTickAtSqrtRatio(sqrtRatioX96) {
    !(JSBI.greaterThanOrEqual(sqrtRatioX96, TickMath.MIN_SQRT_RATIO) && JSBI.lessThan(sqrtRatioX96, TickMath.MAX_SQRT_RATIO)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SQRT_RATIO') : invariant(false) : void 0;
    var sqrtRatioX128 = JSBI.leftShift(sqrtRatioX96, JSBI.BigInt(32));
    var msb = mostSignificantBit(sqrtRatioX128);
    var r;
    if (JSBI.greaterThanOrEqual(JSBI.BigInt(msb), JSBI.BigInt(128))) {
      r = JSBI.signedRightShift(sqrtRatioX128, JSBI.BigInt(msb - 127));
    } else {
      r = JSBI.leftShift(sqrtRatioX128, JSBI.BigInt(127 - msb));
    }
    var log_2 = JSBI.leftShift(JSBI.subtract(JSBI.BigInt(msb), JSBI.BigInt(128)), JSBI.BigInt(64));
    for (var i = 0; i < 14; i++) {
      r = JSBI.signedRightShift(JSBI.multiply(r, r), JSBI.BigInt(127));
      var f = JSBI.signedRightShift(r, JSBI.BigInt(128));
      log_2 = JSBI.bitwiseOr(log_2, JSBI.leftShift(f, JSBI.BigInt(63 - i)));
      r = JSBI.signedRightShift(r, f);
    }
    var log_sqrt10001 = JSBI.multiply(log_2, JSBI.BigInt('255738958999603826347141'));
    var tickLow = JSBI.toNumber(JSBI.signedRightShift(JSBI.subtract(log_sqrt10001, JSBI.BigInt('3402992956809132418596140100660247210')), JSBI.BigInt(128)));
    var tickHigh = JSBI.toNumber(JSBI.signedRightShift(JSBI.add(log_sqrt10001, JSBI.BigInt('291339464771989622907027621153398088495')), JSBI.BigInt(128)));
    return tickLow === tickHigh ? tickLow : JSBI.lessThanOrEqual(TickMath.getSqrtRatioAtTick(tickHigh), sqrtRatioX96) ? tickHigh : tickLow;
  };
  return TickMath;
}();
/**
 * The minimum tick that can be used on any pool.
 */
TickMath.MIN_TICK = -887272;
/**
 * The maximum tick that can be used on any pool.
 */
TickMath.MAX_TICK = -TickMath.MIN_TICK;
/**
 * The sqrt ratio corresponding to the minimum tick that could be used on any pool.
 */
TickMath.MIN_SQRT_RATIO = /*#__PURE__*/JSBI.BigInt('4295128739');
/**
 * The sqrt ratio corresponding to the maximum tick that could be used on any pool.
 */
TickMath.MAX_SQRT_RATIO = /*#__PURE__*/JSBI.BigInt('1461446703485210103287273052203988822378723970342');

function v3Swap(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
  return _v3Swap.apply(this, arguments);
}
function _v3Swap() {
  _v3Swap = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(fee, sqrtRatioX96, tickCurrent, liquidity, tickSpacing, tickDataProvider, zeroForOne, amountSpecified, sqrtPriceLimitX96) {
    var exactInput, state, step, _yield$tickDataProvid, _SwapMath$computeSwap, liquidityNet;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!sqrtPriceLimitX96) sqrtPriceLimitX96 = zeroForOne ? JSBI.add(TickMath.MIN_SQRT_RATIO, ONE) : JSBI.subtract(TickMath.MAX_SQRT_RATIO, ONE);
          if (zeroForOne) {
            !JSBI.greaterThan(sqrtPriceLimitX96, TickMath.MIN_SQRT_RATIO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RATIO_MIN') : invariant(false) : void 0;
            !JSBI.lessThan(sqrtPriceLimitX96, sqrtRatioX96) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RATIO_CURRENT') : invariant(false) : void 0;
          } else {
            !JSBI.lessThan(sqrtPriceLimitX96, TickMath.MAX_SQRT_RATIO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RATIO_MAX') : invariant(false) : void 0;
            !JSBI.greaterThan(sqrtPriceLimitX96, sqrtRatioX96) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RATIO_CURRENT') : invariant(false) : void 0;
          }
          exactInput = JSBI.greaterThanOrEqual(amountSpecified, ZERO); // keep track of swap state
          state = {
            amountSpecifiedRemaining: amountSpecified,
            amountCalculated: ZERO,
            sqrtPriceX96: sqrtRatioX96,
            tick: tickCurrent,
            liquidity: liquidity
          }; // start swap while loop
        case 4:
          if (!(JSBI.notEqual(state.amountSpecifiedRemaining, ZERO) && state.sqrtPriceX96 !== sqrtPriceLimitX96)) {
            _context.next = 35;
            break;
          }
          step = {};
          step.sqrtPriceStartX96 = state.sqrtPriceX96;
          _context.next = 9;
          return tickDataProvider.nextInitializedTickWithinOneWord(state.tick, zeroForOne, tickSpacing);
        case 9:
          _yield$tickDataProvid = _context.sent;
          step.tickNext = _yield$tickDataProvid[0];
          step.initialized = _yield$tickDataProvid[1];
          if (step.tickNext < TickMath.MIN_TICK) {
            step.tickNext = TickMath.MIN_TICK;
          } else if (step.tickNext > TickMath.MAX_TICK) {
            step.tickNext = TickMath.MAX_TICK;
          }
          step.sqrtPriceNextX96 = TickMath.getSqrtRatioAtTick(step.tickNext);
          _SwapMath$computeSwap = SwapMath.computeSwapStep(state.sqrtPriceX96, (zeroForOne ? JSBI.lessThan(step.sqrtPriceNextX96, sqrtPriceLimitX96) : JSBI.greaterThan(step.sqrtPriceNextX96, sqrtPriceLimitX96)) ? sqrtPriceLimitX96 : step.sqrtPriceNextX96, state.liquidity, state.amountSpecifiedRemaining, fee);
          state.sqrtPriceX96 = _SwapMath$computeSwap[0];
          step.amountIn = _SwapMath$computeSwap[1];
          step.amountOut = _SwapMath$computeSwap[2];
          step.feeAmount = _SwapMath$computeSwap[3];
          if (exactInput) {
            state.amountSpecifiedRemaining = JSBI.subtract(state.amountSpecifiedRemaining, JSBI.add(step.amountIn, step.feeAmount));
            state.amountCalculated = JSBI.subtract(state.amountCalculated, step.amountOut);
          } else {
            state.amountSpecifiedRemaining = JSBI.add(state.amountSpecifiedRemaining, step.amountOut);
            state.amountCalculated = JSBI.add(state.amountCalculated, JSBI.add(step.amountIn, step.feeAmount));
          }
          if (!JSBI.equal(state.sqrtPriceX96, step.sqrtPriceNextX96)) {
            _context.next = 32;
            break;
          }
          if (!step.initialized) {
            _context.next = 29;
            break;
          }
          _context.t0 = JSBI;
          _context.next = 25;
          return tickDataProvider.getTick(step.tickNext);
        case 25:
          _context.t1 = _context.sent.liquidityNet;
          liquidityNet = _context.t0.BigInt.call(_context.t0, _context.t1);
          // if we're moving leftward, we interpret liquidityNet as the opposite sign
          // safe because liquidityNet cannot be type(int128).min
          if (zeroForOne) liquidityNet = JSBI.multiply(liquidityNet, NEGATIVE_ONE);
          state.liquidity = LiquidityMath.addDelta(state.liquidity, liquidityNet);
        case 29:
          state.tick = zeroForOne ? step.tickNext - 1 : step.tickNext;
          _context.next = 33;
          break;
        case 32:
          if (JSBI.notEqual(state.sqrtPriceX96, step.sqrtPriceStartX96)) {
            // updated comparison function
            // recompute unless we're on a lower tick boundary (i.e. already transitioned ticks), and haven't moved
            state.tick = TickMath.getTickAtSqrtRatio(state.sqrtPriceX96);
          }
        case 33:
          _context.next = 4;
          break;
        case 35:
          return _context.abrupt("return", {
            amountCalculated: state.amountCalculated,
            sqrtRatioX96: state.sqrtPriceX96,
            liquidity: state.liquidity,
            tickCurrent: state.tick
          });
        case 36:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _v3Swap.apply(this, arguments);
}

/**
 * This tick data provider does not know how to fetch any tick data. It throws whenever it is required. Useful if you
 * do not need to load tick data for your use case.
 */
var NoTickDataProvider = /*#__PURE__*/function () {
  function NoTickDataProvider() {}
  var _proto = NoTickDataProvider.prototype;
  _proto.getTick = /*#__PURE__*/function () {
    var _getTick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_tick) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            throw new Error(NoTickDataProvider.ERROR_MESSAGE);
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getTick(_x) {
      return _getTick.apply(this, arguments);
    }
    return getTick;
  }();
  _proto.nextInitializedTickWithinOneWord = /*#__PURE__*/function () {
    var _nextInitializedTickWithinOneWord = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_tick, _lte, _tickSpacing) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            throw new Error(NoTickDataProvider.ERROR_MESSAGE);
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function nextInitializedTickWithinOneWord(_x2, _x3, _x4) {
      return _nextInitializedTickWithinOneWord.apply(this, arguments);
    }
    return nextInitializedTickWithinOneWord;
  }();
  return NoTickDataProvider;
}();
NoTickDataProvider.ERROR_MESSAGE = 'No tick data provider was given';

/**
 * Determines if a tick list is sorted
 * @param list The tick list
 * @param comparator The comparator
 * @returns true if sorted
 */
function isSorted(list, comparator) {
  for (var i = 0; i < list.length - 1; i++) {
    if (comparator(list[i], list[i + 1]) > 0) {
      return false;
    }
  }
  return true;
}

function tickComparator(a, b) {
  return a.index - b.index;
}
/**
 * Utility methods for interacting with sorted lists of ticks
 */
var TickList = /*#__PURE__*/function () {
  /**
   * Cannot be constructed
   */
  function TickList() {}
  TickList.validateList = function validateList(ticks, tickSpacing) {
    !(tickSpacing > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_SPACING_NONZERO') : invariant(false) : void 0;
    // ensure ticks are spaced appropriately
    !ticks.every(function (_ref) {
      var index = _ref.index;
      return index % tickSpacing === 0;
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_SPACING') : invariant(false) : void 0;
    // ensure tick liquidity deltas sum to 0
    !JSBI.equal(ticks.reduce(function (accumulator, _ref2) {
      var liquidityNet = _ref2.liquidityNet;
      return JSBI.add(accumulator, liquidityNet);
    }, ZERO), ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ZERO_NET') : invariant(false) : void 0;
    !isSorted(ticks, tickComparator) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SORTED') : invariant(false) : void 0;
  };
  TickList.isBelowSmallest = function isBelowSmallest(ticks, tick) {
    !(ticks.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LENGTH') : invariant(false) : void 0;
    return tick < ticks[0].index;
  };
  TickList.isAtOrAboveLargest = function isAtOrAboveLargest(ticks, tick) {
    !(ticks.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LENGTH') : invariant(false) : void 0;
    return tick >= ticks[ticks.length - 1].index;
  };
  TickList.getTick = function getTick(ticks, index) {
    var tick = ticks[this.binarySearch(ticks, index)];
    !(tick.index === index) ? process.env.NODE_ENV !== "production" ? invariant(false, 'NOT_CONTAINED') : invariant(false) : void 0;
    return tick;
  }
  /**
   * Finds the largest tick in the list of ticks that is less than or equal to tick
   * @param ticks list of ticks
   * @param tick tick to find the largest tick that is less than or equal to tick
   * @private
   */;
  TickList.binarySearch = function binarySearch(ticks, tick) {
    !!this.isBelowSmallest(ticks, tick) ? process.env.NODE_ENV !== "production" ? invariant(false, 'BELOW_SMALLEST') : invariant(false) : void 0;
    var l = 0;
    var r = ticks.length - 1;
    var i;
    while (true) {
      i = Math.floor((l + r) / 2);
      if (ticks[i].index <= tick && (i === ticks.length - 1 || ticks[i + 1].index > tick)) {
        return i;
      }
      if (ticks[i].index < tick) {
        l = i + 1;
      } else {
        r = i - 1;
      }
    }
  };
  TickList.nextInitializedTick = function nextInitializedTick(ticks, tick, lte) {
    if (lte) {
      !!TickList.isBelowSmallest(ticks, tick) ? process.env.NODE_ENV !== "production" ? invariant(false, 'BELOW_SMALLEST') : invariant(false) : void 0;
      if (TickList.isAtOrAboveLargest(ticks, tick)) {
        return ticks[ticks.length - 1];
      }
      var index = this.binarySearch(ticks, tick);
      return ticks[index];
    } else {
      !!this.isAtOrAboveLargest(ticks, tick) ? process.env.NODE_ENV !== "production" ? invariant(false, 'AT_OR_ABOVE_LARGEST') : invariant(false) : void 0;
      if (this.isBelowSmallest(ticks, tick)) {
        return ticks[0];
      }
      var _index = this.binarySearch(ticks, tick);
      return ticks[_index + 1];
    }
  };
  TickList.nextInitializedTickWithinOneWord = function nextInitializedTickWithinOneWord(ticks, tick, lte, tickSpacing) {
    var compressed = Math.floor(tick / tickSpacing); // matches rounding in the code
    if (lte) {
      var wordPos = compressed >> 8;
      var minimum = (wordPos << 8) * tickSpacing;
      if (TickList.isBelowSmallest(ticks, tick)) {
        return [minimum, false];
      }
      var index = TickList.nextInitializedTick(ticks, tick, lte).index;
      var nextInitializedTick = Math.max(minimum, index);
      return [nextInitializedTick, nextInitializedTick === index];
    } else {
      var _wordPos = compressed + 1 >> 8;
      var maximum = ((_wordPos + 1 << 8) - 1) * tickSpacing;
      if (this.isAtOrAboveLargest(ticks, tick)) {
        return [maximum, false];
      }
      var _index2 = this.nextInitializedTick(ticks, tick, lte).index;
      var _nextInitializedTick = Math.min(maximum, _index2);
      return [_nextInitializedTick, _nextInitializedTick === _index2];
    }
  };
  return TickList;
}();

/**
 * Converts a big int to a hex string
 * @param bigintIsh
 * @returns The hex encoded calldata
 */
function toHex(bigintIsh) {
  var bigInt = JSBI.BigInt(bigintIsh);
  var hex = bigInt.toString(16);
  if (hex.length % 2 !== 0) {
    hex = "0" + hex;
  }
  return "0x" + hex;
}

/**
 * Converts a route to a hex encoded path
 * @param route the v3 path to convert to an encoded path
 * @param exactOutput whether the route should be encoded in reverse, for making exact output swaps
 */
function encodeRouteToPath(route, exactOutput) {
  var firstInputToken = route.input.wrapped;
  var _route$pools$reduce = route.pools.reduce(function (_ref, pool, index) {
      var inputToken = _ref.inputToken,
        path = _ref.path,
        types = _ref.types;
      var outputToken = pool.token0.equals(inputToken) ? pool.token1 : pool.token0;
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ['address', 'uint24', 'address'],
          path: [inputToken.address, pool.fee, outputToken.address]
        };
      } else {
        return {
          inputToken: outputToken,
          types: [].concat(types, ['uint24', 'address']),
          path: [].concat(path, [pool.fee, outputToken.address])
        };
      }
    }, {
      inputToken: firstInputToken,
      path: [],
      types: []
    }),
    path = _route$pools$reduce.path,
    types = _route$pools$reduce.types;
  return exactOutput ? pack(types.reverse(), path.reverse()) : pack(types, path);
}

/**
 * Returns the sqrt ratio as a Q64.96 corresponding to a given ratio of amount1 and amount0
 * @param amount1 The numerator amount i.e., the amount of token1
 * @param amount0 The denominator amount i.e., the amount of token0
 * @returns The sqrt ratio
 */
function encodeSqrtRatioX96(amount1, amount0) {
  var numerator = JSBI.leftShift(JSBI.BigInt(amount1), JSBI.BigInt(192));
  var denominator = JSBI.BigInt(amount0);
  var ratioX192 = JSBI.divide(numerator, denominator);
  return sqrt(ratioX192);
}

/**
 * Returns an imprecise maximum amount of liquidity received for a given amount of token 0.
 * This function is available to accommodate LiquidityAmounts#getLiquidityForAmount0 in the v3 periphery,
 * which could be more precise by at least 32 bits by dividing by Q64 instead of Q96 in the intermediate step,
 * and shifting the subtracted ratio left by 32 bits. This imprecise calculation will likely be replaced in a future
 * v3 router contract.
 * @param sqrtRatioAX96 The price at the lower boundary
 * @param sqrtRatioBX96 The price at the upper boundary
 * @param amount0 The token0 amount
 * @returns liquidity for amount0, imprecise
 */
function maxLiquidityForAmount0Imprecise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    var _ref = [sqrtRatioBX96, sqrtRatioAX96];
    sqrtRatioAX96 = _ref[0];
    sqrtRatioBX96 = _ref[1];
  }
  var intermediate = JSBI.divide(JSBI.multiply(sqrtRatioAX96, sqrtRatioBX96), Q96);
  return JSBI.divide(JSBI.multiply(JSBI.BigInt(amount0), intermediate), JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96));
}
/**
 * Returns a precise maximum amount of liquidity received for a given amount of token 0 by dividing by Q64 instead of Q96 in the intermediate step,
 * and shifting the subtracted ratio left by 32 bits.
 * @param sqrtRatioAX96 The price at the lower boundary
 * @param sqrtRatioBX96 The price at the upper boundary
 * @param amount0 The token0 amount
 * @returns liquidity for amount0, precise
 */
function maxLiquidityForAmount0Precise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    var _ref2 = [sqrtRatioBX96, sqrtRatioAX96];
    sqrtRatioAX96 = _ref2[0];
    sqrtRatioBX96 = _ref2[1];
  }
  var numerator = JSBI.multiply(JSBI.multiply(JSBI.BigInt(amount0), sqrtRatioAX96), sqrtRatioBX96);
  var denominator = JSBI.multiply(Q96, JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96));
  return JSBI.divide(numerator, denominator);
}
/**
 * Computes the maximum amount of liquidity received for a given amount of token1
 * @param sqrtRatioAX96 The price at the lower tick boundary
 * @param sqrtRatioBX96 The price at the upper tick boundary
 * @param amount1 The token1 amount
 * @returns liquidity for amount1
 */
function maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1) {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    var _ref3 = [sqrtRatioBX96, sqrtRatioAX96];
    sqrtRatioAX96 = _ref3[0];
    sqrtRatioBX96 = _ref3[1];
  }
  return JSBI.divide(JSBI.multiply(JSBI.BigInt(amount1), Q96), JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96));
}
/**
 * Computes the maximum amount of liquidity received for a given amount of token0, token1,
 * and the prices at the tick boundaries.
 * @param sqrtRatioCurrentX96 the current price
 * @param sqrtRatioAX96 price at lower boundary
 * @param sqrtRatioBX96 price at upper boundary
 * @param amount0 token0 amount
 * @param amount1 token1 amount
 * @param useFullPrecision if false, liquidity will be maximized according to what the router can calculate,
 * not what core can theoretically support
 */
function maxLiquidityForAmounts(sqrtRatioCurrentX96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1, useFullPrecision) {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    var _ref4 = [sqrtRatioBX96, sqrtRatioAX96];
    sqrtRatioAX96 = _ref4[0];
    sqrtRatioBX96 = _ref4[1];
  }
  var maxLiquidityForAmount0 = useFullPrecision ? maxLiquidityForAmount0Precise : maxLiquidityForAmount0Imprecise;
  if (JSBI.lessThanOrEqual(sqrtRatioCurrentX96, sqrtRatioAX96)) {
    return maxLiquidityForAmount0(sqrtRatioAX96, sqrtRatioBX96, amount0);
  } else if (JSBI.lessThan(sqrtRatioCurrentX96, sqrtRatioBX96)) {
    var liquidity0 = maxLiquidityForAmount0(sqrtRatioCurrentX96, sqrtRatioBX96, amount0);
    var liquidity1 = maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioCurrentX96, amount1);
    return JSBI.lessThan(liquidity0, liquidity1) ? liquidity0 : liquidity1;
  } else {
    return maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1);
  }
}

/**
 * Returns the closest tick that is nearest a given tick and usable for the given tick spacing
 * @param tick the target tick
 * @param tickSpacing the spacing of the pool
 */
function nearestUsableTick(tick, tickSpacing) {
  !(Number.isInteger(tick) && Number.isInteger(tickSpacing)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INTEGERS') : invariant(false) : void 0;
  !(tickSpacing > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_SPACING') : invariant(false) : void 0;
  !(tick >= TickMath.MIN_TICK && tick <= TickMath.MAX_TICK) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_BOUND') : invariant(false) : void 0;
  var rounded = Math.round(tick / tickSpacing) * tickSpacing;
  if (rounded < TickMath.MIN_TICK) return rounded + tickSpacing;else if (rounded > TickMath.MAX_TICK) return rounded - tickSpacing;else return rounded;
}

var Q128 = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(128));
var PositionLibrary = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function PositionLibrary() {}
  // replicates the portions of Position#update required to compute unaccounted fees
  PositionLibrary.getTokensOwed = function getTokensOwed(feeGrowthInside0LastX128, feeGrowthInside1LastX128, liquidity, feeGrowthInside0X128, feeGrowthInside1X128) {
    var tokensOwed0 = JSBI.divide(JSBI.multiply(subIn256(feeGrowthInside0X128, feeGrowthInside0LastX128), liquidity), Q128);
    var tokensOwed1 = JSBI.divide(JSBI.multiply(subIn256(feeGrowthInside1X128, feeGrowthInside1LastX128), liquidity), Q128);
    return [tokensOwed0, tokensOwed1];
  };
  return PositionLibrary;
}();

/**
 * Returns a price object corresponding to the input tick and the base/quote token
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
function tickToPrice(baseToken, quoteToken, tick) {
  var sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick);
  var ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);
  return baseToken.sortsBefore(quoteToken) ? new Price(baseToken, quoteToken, Q192, ratioX192) : new Price(baseToken, quoteToken, ratioX192, Q192);
}
/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */
function priceToClosestTick(price) {
  var sorted = price.baseCurrency.sortsBefore(price.quoteCurrency);
  var sqrtRatioX96 = sorted ? encodeSqrtRatioX96(price.numerator, price.denominator) : encodeSqrtRatioX96(price.denominator, price.numerator);
  var tick = TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  var nextTickPrice = tickToPrice(price.baseCurrency, price.quoteCurrency, tick + 1);
  if (sorted) {
    if (!price.lessThan(nextTickPrice)) {
      tick++;
    }
  } else {
    if (!price.greaterThan(nextTickPrice)) {
      tick++;
    }
  }
  return tick;
}

var Q256 = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(256));
function subIn256(x, y) {
  var difference = JSBI.subtract(x, y);
  if (JSBI.lessThan(difference, ZERO)) {
    return JSBI.add(Q256, difference);
  } else {
    return difference;
  }
}
var TickLibrary = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function TickLibrary() {}
  TickLibrary.getFeeGrowthInside = function getFeeGrowthInside(feeGrowthOutsideLower, feeGrowthOutsideUpper, tickLower, tickUpper, tickCurrent, feeGrowthGlobal0X128, feeGrowthGlobal1X128) {
    var feeGrowthBelow0X128;
    var feeGrowthBelow1X128;
    if (tickCurrent >= tickLower) {
      feeGrowthBelow0X128 = feeGrowthOutsideLower.feeGrowthOutside0X128;
      feeGrowthBelow1X128 = feeGrowthOutsideLower.feeGrowthOutside1X128;
    } else {
      feeGrowthBelow0X128 = subIn256(feeGrowthGlobal0X128, feeGrowthOutsideLower.feeGrowthOutside0X128);
      feeGrowthBelow1X128 = subIn256(feeGrowthGlobal1X128, feeGrowthOutsideLower.feeGrowthOutside1X128);
    }
    var feeGrowthAbove0X128;
    var feeGrowthAbove1X128;
    if (tickCurrent < tickUpper) {
      feeGrowthAbove0X128 = feeGrowthOutsideUpper.feeGrowthOutside0X128;
      feeGrowthAbove1X128 = feeGrowthOutsideUpper.feeGrowthOutside1X128;
    } else {
      feeGrowthAbove0X128 = subIn256(feeGrowthGlobal0X128, feeGrowthOutsideUpper.feeGrowthOutside0X128);
      feeGrowthAbove1X128 = subIn256(feeGrowthGlobal1X128, feeGrowthOutsideUpper.feeGrowthOutside1X128);
    }
    return [subIn256(subIn256(feeGrowthGlobal0X128, feeGrowthBelow0X128), feeGrowthAbove0X128), subIn256(subIn256(feeGrowthGlobal1X128, feeGrowthBelow1X128), feeGrowthAbove1X128)];
  };
  return TickLibrary;
}();

var Tick = function Tick(_ref) {
  var index = _ref.index,
    liquidityGross = _ref.liquidityGross,
    liquidityNet = _ref.liquidityNet;
  !(index >= TickMath.MIN_TICK && index <= TickMath.MAX_TICK) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK') : invariant(false) : void 0;
  this.index = index;
  this.liquidityGross = JSBI.BigInt(liquidityGross);
  this.liquidityNet = JSBI.BigInt(liquidityNet);
};

/**
 * A data provider for ticks that is backed by an in-memory array of ticks.
 */
var TickListDataProvider = /*#__PURE__*/function () {
  function TickListDataProvider(ticks, tickSpacing) {
    var ticksMapped = ticks.map(function (t) {
      return t instanceof Tick ? t : new Tick(t);
    });
    TickList.validateList(ticksMapped, tickSpacing);
    this.ticks = ticksMapped;
  }
  var _proto = TickListDataProvider.prototype;
  _proto.getTick = /*#__PURE__*/function () {
    var _getTick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(tick) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", TickList.getTick(this.ticks, tick));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function getTick(_x) {
      return _getTick.apply(this, arguments);
    }
    return getTick;
  }();
  _proto.nextInitializedTickWithinOneWord = /*#__PURE__*/function () {
    var _nextInitializedTickWithinOneWord = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(tick, lte, tickSpacing) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", TickList.nextInitializedTickWithinOneWord(this.ticks, tick, lte, tickSpacing));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function nextInitializedTickWithinOneWord(_x2, _x3, _x4) {
      return _nextInitializedTickWithinOneWord.apply(this, arguments);
    }
    return nextInitializedTickWithinOneWord;
  }();
  return TickListDataProvider;
}();

/**
 * By default, pools will not allow operations that require ticks.
 */
var NO_TICK_DATA_PROVIDER_DEFAULT = /*#__PURE__*/new NoTickDataProvider();
/**
 * Represents a V3 pool
 */
var Pool = /*#__PURE__*/function () {
  /**
   * Construct a pool
   * @param tokenA One of the tokens in the pool
   * @param tokenB The other token in the pool
   * @param fee The fee in hundredths of a bips of the input amount of every swap that is collected by the pool
   * @param sqrtRatioX96 The sqrt of the current ratio of amounts of token1 to token0
   * @param liquidity The current value of in range liquidity
   * @param tickCurrent The current tick of the pool
   * @param ticks The current state of the pool ticks or a data provider that can return tick data
   */
  function Pool(tokenA, tokenB, fee, sqrtRatioX96, liquidity, tickCurrent, ticks) {
    if (ticks === void 0) {
      ticks = NO_TICK_DATA_PROVIDER_DEFAULT;
    }
    !(Number.isInteger(fee) && fee < 1000000) ? process.env.NODE_ENV !== "production" ? invariant(false, 'FEE') : invariant(false) : void 0;
    var tickCurrentSqrtRatioX96 = TickMath.getSqrtRatioAtTick(tickCurrent);
    var nextTickSqrtRatioX96 = TickMath.getSqrtRatioAtTick(tickCurrent + 1);
    !(JSBI.greaterThanOrEqual(JSBI.BigInt(sqrtRatioX96), tickCurrentSqrtRatioX96) && JSBI.lessThanOrEqual(JSBI.BigInt(sqrtRatioX96), nextTickSqrtRatioX96)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PRICE_BOUNDS') : invariant(false) : void 0;
    var _ref = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
    this.token0 = _ref[0];
    this.token1 = _ref[1];
    this.fee = fee;
    this.sqrtRatioX96 = JSBI.BigInt(sqrtRatioX96);
    this.liquidity = JSBI.BigInt(liquidity);
    this.tickCurrent = tickCurrent;
    this.tickDataProvider = Array.isArray(ticks) ? new TickListDataProvider(ticks, TICK_SPACINGS[fee]) : ticks;
  }
  Pool.getAddress = function getAddress(tokenA, tokenB, fee, initCodeHashManualOverride, deployerAddressManualOverride) {
    return computePoolAddress({
      fee: fee,
      tokenA: tokenA,
      tokenB: tokenB,
      deployerAddressManualOverride: deployerAddressManualOverride,
      initCodeHashManualOverride: initCodeHashManualOverride
    });
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token The token to check
   * @returns True if token is either token0 or token
   */;
  var _proto = Pool.prototype;
  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pool in terms of token0, i.e. the ratio of token1 over token0
   */;
  /**
   * Return the price of the given token in terms of the other token in the pool.
   * @param token The token to return price of
   * @returns The price of the given token, in terms of the other.
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pool.
   */;
  /**
   * Given an input amount of a token, return the computed output amount, and a pool with state updated after the trade
   * @param inputAmount The input amount for which to quote the output amount
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit
   * @returns The output amount and the pool with updated state
   */
  _proto.getOutputAmount =
  /*#__PURE__*/
  function () {
    var _getOutputAmount = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(inputAmount, sqrtPriceLimitX96) {
      var zeroForOne, _yield$this$swap, outputAmount, sqrtRatioX96, liquidity, tickCurrent, outputToken;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            !this.involvesToken(inputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
            zeroForOne = inputAmount.currency.equals(this.token0);
            _context.next = 4;
            return this.swap(zeroForOne, inputAmount.quotient, sqrtPriceLimitX96);
          case 4:
            _yield$this$swap = _context.sent;
            outputAmount = _yield$this$swap.amountCalculated;
            sqrtRatioX96 = _yield$this$swap.sqrtRatioX96;
            liquidity = _yield$this$swap.liquidity;
            tickCurrent = _yield$this$swap.tickCurrent;
            outputToken = zeroForOne ? this.token1 : this.token0;
            return _context.abrupt("return", [CurrencyAmount.fromRawAmount(outputToken, JSBI.multiply(outputAmount, NEGATIVE_ONE)), new Pool(this.token0, this.token1, this.fee, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)]);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function getOutputAmount(_x, _x2) {
      return _getOutputAmount.apply(this, arguments);
    }
    return getOutputAmount;
  }()
  /**
   * Given a desired output amount of a token, return the computed input amount and a pool with state updated after the trade
   * @param outputAmount the output amount for which to quote the input amount
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns The input amount and the pool with updated state
   */
  ;
  _proto.getInputAmount =
  /*#__PURE__*/
  function () {
    var _getInputAmount = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(outputAmount, sqrtPriceLimitX96) {
      var zeroForOne, _yield$this$swap2, inputAmount, sqrtRatioX96, liquidity, tickCurrent, inputToken;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            !(outputAmount.currency.isToken && this.involvesToken(outputAmount.currency)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
            zeroForOne = outputAmount.currency.equals(this.token1);
            _context2.next = 4;
            return this.swap(zeroForOne, JSBI.multiply(outputAmount.quotient, NEGATIVE_ONE), sqrtPriceLimitX96);
          case 4:
            _yield$this$swap2 = _context2.sent;
            inputAmount = _yield$this$swap2.amountCalculated;
            sqrtRatioX96 = _yield$this$swap2.sqrtRatioX96;
            liquidity = _yield$this$swap2.liquidity;
            tickCurrent = _yield$this$swap2.tickCurrent;
            inputToken = zeroForOne ? this.token0 : this.token1;
            return _context2.abrupt("return", [CurrencyAmount.fromRawAmount(inputToken, inputAmount), new Pool(this.token0, this.token1, this.fee, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)]);
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function getInputAmount(_x3, _x4) {
      return _getInputAmount.apply(this, arguments);
    }
    return getInputAmount;
  }()
  /**
   * Executes a swap
   * @param zeroForOne Whether the amount in is token0 or token1
   * @param amountSpecified The amount of the swap, which implicitly configures the swap as exact input (positive), or exact output (negative)
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns amountCalculated
   * @returns sqrtRatioX96
   * @returns liquidity
   * @returns tickCurrent
   */
  ;
  _proto.swap =
  /*#__PURE__*/
  function () {
    var _swap = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(zeroForOne, amountSpecified, sqrtPriceLimitX96) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", v3Swap(JSBI.BigInt(this.fee), this.sqrtRatioX96, this.tickCurrent, this.liquidity, this.tickSpacing, this.tickDataProvider, zeroForOne, amountSpecified, sqrtPriceLimitX96));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function swap(_x5, _x6, _x7) {
      return _swap.apply(this, arguments);
    }
    return swap;
  }();
  return _createClass(Pool, [{
    key: "token0Price",
    get: function get() {
      var _this$_token0Price;
      return (_this$_token0Price = this._token0Price) != null ? _this$_token0Price : this._token0Price = new Price(this.token0, this.token1, Q192, JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96));
    }
    /**
     * Returns the current mid price of the pool in terms of token1, i.e. the ratio of token0 over token1
     */
  }, {
    key: "token1Price",
    get: function get() {
      var _this$_token1Price;
      return (_this$_token1Price = this._token1Price) != null ? _this$_token1Price : this._token1Price = new Price(this.token1, this.token0, JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96), Q192);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "tickSpacing",
    get: function get() {
      return TICK_SPACINGS[this.fee];
    }
  }]);
}();

/**
 * Represents a position on a StoryHunt V3 Pool
 */
var Position = /*#__PURE__*/function () {
  /**
   * Constructs a position for a given pool with the given liquidity
   * @param pool For which pool the liquidity is assigned
   * @param liquidity The amount of liquidity that is in the position
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   */
  function Position(_ref) {
    var pool = _ref.pool,
      liquidity = _ref.liquidity,
      tickLower = _ref.tickLower,
      tickUpper = _ref.tickUpper;
    // cached resuts for the getters
    this._token0Amount = null;
    this._token1Amount = null;
    this._mintAmounts = null;
    !(tickLower < tickUpper) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_ORDER') : invariant(false) : void 0;
    !(tickLower >= TickMath.MIN_TICK && tickLower % pool.tickSpacing === 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_LOWER') : invariant(false) : void 0;
    !(tickUpper <= TickMath.MAX_TICK && tickUpper % pool.tickSpacing === 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_UPPER') : invariant(false) : void 0;
    this.pool = pool;
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.liquidity = JSBI.BigInt(liquidity);
  }
  /**
   * Returns the price of token0 at the lower tick
   */
  var _proto = Position.prototype;
  /**
   * Returns the lower and upper sqrt ratios if the price 'slips' up to slippage tolerance percentage
   * @param slippageTolerance The amount by which the price can 'slip' before the transaction will revert
   * @returns The sqrt ratios after slippage
   */
  _proto.ratiosAfterSlippage = function ratiosAfterSlippage(slippageTolerance) {
    var priceLower = this.pool.token0Price.asFraction.multiply(new Percent(1).subtract(slippageTolerance));
    var priceUpper = this.pool.token0Price.asFraction.multiply(slippageTolerance.add(1));
    var sqrtRatioX96Lower = encodeSqrtRatioX96(priceLower.numerator, priceLower.denominator);
    if (JSBI.lessThanOrEqual(sqrtRatioX96Lower, TickMath.MIN_SQRT_RATIO)) {
      sqrtRatioX96Lower = JSBI.add(TickMath.MIN_SQRT_RATIO, JSBI.BigInt(1));
    }
    var sqrtRatioX96Upper = encodeSqrtRatioX96(priceUpper.numerator, priceUpper.denominator);
    if (JSBI.greaterThanOrEqual(sqrtRatioX96Upper, TickMath.MAX_SQRT_RATIO)) {
      sqrtRatioX96Upper = JSBI.subtract(TickMath.MAX_SQRT_RATIO, JSBI.BigInt(1));
    }
    return {
      sqrtRatioX96Lower: sqrtRatioX96Lower,
      sqrtRatioX96Upper: sqrtRatioX96Upper
    };
  }
  /**
   * Returns the minimum amounts that must be sent in order to safely mint the amount of liquidity held by the position
   * with the given slippage tolerance
   * @param slippageTolerance Tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */;
  _proto.mintAmountsWithSlippage = function mintAmountsWithSlippage(slippageTolerance) {
    // get lower/upper prices
    var _this$ratiosAfterSlip = this.ratiosAfterSlippage(slippageTolerance),
      sqrtRatioX96Upper = _this$ratiosAfterSlip.sqrtRatioX96Upper,
      sqrtRatioX96Lower = _this$ratiosAfterSlip.sqrtRatioX96Lower;
    // construct counterfactual pools
    var poolLower = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX96Lower, 0 /* liquidity doesn't matter */, TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower));
    var poolUpper = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX96Upper, 0 /* liquidity doesn't matter */, TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper));
    // because the router is imprecise, we need to calculate the position that will be created (assuming no slippage)
    var positionThatWillBeCreated = Position.fromAmounts(_extends({
      pool: this.pool,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }, this.mintAmounts, {
      useFullPrecision: false
    }));
    // we want the smaller amounts...
    // ...which occurs at the upper price for amount0...
    var amount0 = new Position({
      pool: poolUpper,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts.amount0;
    // ...and the lower for amount1
    var amount1 = new Position({
      pool: poolLower,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts.amount1;
    return {
      amount0: amount0,
      amount1: amount1
    };
  }
  /**
   * Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
   * position with the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */;
  _proto.burnAmountsWithSlippage = function burnAmountsWithSlippage(slippageTolerance) {
    // get lower/upper prices
    var _this$ratiosAfterSlip2 = this.ratiosAfterSlippage(slippageTolerance),
      sqrtRatioX96Upper = _this$ratiosAfterSlip2.sqrtRatioX96Upper,
      sqrtRatioX96Lower = _this$ratiosAfterSlip2.sqrtRatioX96Lower;
    // construct counterfactual pools
    var poolLower = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX96Lower, 0 /* liquidity doesn't matter */, TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower));
    var poolUpper = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX96Upper, 0 /* liquidity doesn't matter */, TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper));
    // we want the smaller amounts...
    // ...which occurs at the upper price for amount0...
    var amount0 = new Position({
      pool: poolUpper,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount0;
    // ...and the lower for amount1
    var amount1 = new Position({
      pool: poolLower,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount1;
    return {
      amount0: amount0.quotient,
      amount1: amount1.quotient
    };
  }
  /**
   * Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
   * the current price for the pool
   */;
  /**
   * Computes the maximum amount of liquidity received for a given amount of token0, token1,
   * and the prices at the tick boundaries.
   * @param pool The pool for which the position should be created
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   * @param amount0 token0 amount
   * @param amount1 token1 amount
   * @param useFullPrecision If false, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The amount of liquidity for the position
   */
  Position.fromAmounts = function fromAmounts(_ref2) {
    var pool = _ref2.pool,
      tickLower = _ref2.tickLower,
      tickUpper = _ref2.tickUpper,
      amount0 = _ref2.amount0,
      amount1 = _ref2.amount1,
      useFullPrecision = _ref2.useFullPrecision;
    var sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
    var sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);
    return new Position({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      liquidity: maxLiquidityForAmounts(pool.sqrtRatioX96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1, useFullPrecision)
    });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount0 The desired amount of token0
   * @param useFullPrecision If true, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The position
   */;
  Position.fromAmount0 = function fromAmount0(_ref3) {
    var pool = _ref3.pool,
      tickLower = _ref3.tickLower,
      tickUpper = _ref3.tickUpper,
      amount0 = _ref3.amount0,
      useFullPrecision = _ref3.useFullPrecision;
    return Position.fromAmounts({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      amount0: amount0,
      amount1: MaxUint256,
      useFullPrecision: useFullPrecision
    });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount1 The desired amount of token1
   * @returns The position
   */;
  Position.fromAmount1 = function fromAmount1(_ref4) {
    var pool = _ref4.pool,
      tickLower = _ref4.tickLower,
      tickUpper = _ref4.tickUpper,
      amount1 = _ref4.amount1;
    // this function always uses full precision,
    return Position.fromAmounts({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      amount0: MaxUint256,
      amount1: amount1,
      useFullPrecision: true
    });
  };
  return _createClass(Position, [{
    key: "token0PriceLower",
    get: function get() {
      return tickToPrice(this.pool.token0, this.pool.token1, this.tickLower);
    }
    /**
     * Returns the price of token0 at the upper tick
     */
  }, {
    key: "token0PriceUpper",
    get: function get() {
      return tickToPrice(this.pool.token0, this.pool.token1, this.tickUpper);
    }
    /**
     * Returns the amount of token0 that this position's liquidity could be burned for at the current pool price
     */
  }, {
    key: "amount0",
    get: function get() {
      if (this._token0Amount === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          this._token0Amount = CurrencyAmount.fromRawAmount(this.pool.token0, SqrtPriceMath.getAmount0Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        } else if (this.pool.tickCurrent < this.tickUpper) {
          this._token0Amount = CurrencyAmount.fromRawAmount(this.pool.token0, SqrtPriceMath.getAmount0Delta(this.pool.sqrtRatioX96, TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        } else {
          this._token0Amount = CurrencyAmount.fromRawAmount(this.pool.token0, ZERO);
        }
      }
      return this._token0Amount;
    }
    /**
     * Returns the amount of token1 that this position's liquidity could be burned for at the current pool price
     */
  }, {
    key: "amount1",
    get: function get() {
      if (this._token1Amount === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          this._token1Amount = CurrencyAmount.fromRawAmount(this.pool.token1, ZERO);
        } else if (this.pool.tickCurrent < this.tickUpper) {
          this._token1Amount = CurrencyAmount.fromRawAmount(this.pool.token1, SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), this.pool.sqrtRatioX96, this.liquidity, false));
        } else {
          this._token1Amount = CurrencyAmount.fromRawAmount(this.pool.token1, SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        }
      }
      return this._token1Amount;
    }
  }, {
    key: "mintAmounts",
    get: function get() {
      if (this._mintAmounts === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          return {
            amount0: SqrtPriceMath.getAmount0Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true),
            amount1: ZERO
          };
        } else if (this.pool.tickCurrent < this.tickUpper) {
          return {
            amount0: SqrtPriceMath.getAmount0Delta(this.pool.sqrtRatioX96, TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true),
            amount1: SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), this.pool.sqrtRatioX96, this.liquidity, true)
          };
        } else {
          return {
            amount0: ZERO,
            amount1: SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true)
          };
        }
      }
      return this._mintAmounts;
    }
  }]);
}();

/**
 * Represents a list of pools through which a swap can occur
 * @template TInput The input token
 * @template TOutput The output token
 */
var Route = /*#__PURE__*/function () {
  /**
   * Creates an instance of route.
   * @param pools An array of `Pool` objects, ordered by the route the swap will take
   * @param input The input token
   * @param output The output token
   */
  function Route(pools, input, output) {
    this._midPrice = null;
    !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
    var chainId = pools[0].chainId;
    var allOnSameChain = pools.every(function (pool) {
      return pool.chainId === chainId;
    });
    !allOnSameChain ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_IDS') : invariant(false) : void 0;
    var wrappedInput = input.wrapped;
    !pools[0].involvesToken(wrappedInput) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
    !pools[pools.length - 1].involvesToken(output.wrapped) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
    /**
     * Normalizes token0-token1 order and selects the next token/fee step to add to the path
     * */
    var tokenPath = [wrappedInput];
    for (var _iterator = _createForOfIteratorHelperLoose(pools.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        i = _step$value[0],
        pool = _step$value[1];
      var currentInputToken = tokenPath[i];
      !(currentInputToken.equals(pool.token0) || currentInputToken.equals(pool.token1)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PATH') : invariant(false) : void 0;
      var nextToken = currentInputToken.equals(pool.token0) ? pool.token1 : pool.token0;
      tokenPath.push(nextToken);
    }
    this.pools = pools;
    this.tokenPath = tokenPath;
    this.input = input;
    this.output = output != null ? output : tokenPath[tokenPath.length - 1];
  }
  return _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pools[0].chainId;
    }
    /**
     * Returns the mid price of the route
     */
  }, {
    key: "midPrice",
    get: function get() {
      if (this._midPrice !== null) return this._midPrice;
      var price = this.pools.slice(1).reduce(function (_ref, pool) {
        var nextInput = _ref.nextInput,
          price = _ref.price;
        return nextInput.equals(pool.token0) ? {
          nextInput: pool.token1,
          price: price.multiply(pool.token0Price)
        } : {
          nextInput: pool.token0,
          price: price.multiply(pool.token1Price)
        };
      }, this.pools[0].token0.equals(this.input.wrapped) ? {
        nextInput: this.pools[0].token1,
        price: this.pools[0].token0Price
      } : {
        nextInput: this.pools[0].token0,
        price: this.pools[0].token1Price
      }).price;
      return this._midPrice = new Price(this.input, this.output, price.denominator, price.numerator);
    }
  }]);
}();

/**
 * Trades comparator, an extension of the input output comparator that also considers other dimensions of the trade in ranking them
 * @template TInput The input token, either IP or an ERC-20
 * @template TOutput The output token, either IP or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 * @param a The first trade to compare
 * @param b The second trade to compare
 * @returns A sorted ordering for two neighboring elements in a trade array
 */
function tradeComparator(a, b) {
  // must have same input and output token for comparison
  !a.inputAmount.currency.equals(b.inputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT_CURRENCY') : invariant(false) : void 0;
  !a.outputAmount.currency.equals(b.outputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT_CURRENCY') : invariant(false) : void 0;
  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      // consider the number of hops since each hop costs gas
      var aHops = a.swaps.reduce(function (total, cur) {
        return total + cur.route.tokenPath.length;
      }, 0);
      var bHops = b.swaps.reduce(function (total, cur) {
        return total + cur.route.tokenPath.length;
      }, 0);
      return aHops - bHops;
    }
    // trade A requires less input than trade B, so A should come first
    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
}
/**
 * Represents a trade executed against a set of routes where some percentage of the input is
 * split across each route.
 *
 * Each route has its own set of pools. Pools can not be re-used across routes.
 *
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 * @template TInput The input token, either IP or an ERC-20
 * @template TOutput The output token, either IP or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 */
var Trade = /*#__PURE__*/function () {
  /**
   * Construct a trade by passing in the pre-computed property values
   * @param routes The routes through which the trade occurs
   * @param tradeType The type of trade, exact input or exact output
   */
  function Trade(_ref) {
    var routes = _ref.routes,
      tradeType = _ref.tradeType;
    var inputCurrency = routes[0].inputAmount.currency;
    var outputCurrency = routes[0].outputAmount.currency;
    !routes.every(function (_ref2) {
      var route = _ref2.route;
      return inputCurrency.wrapped.equals(route.input.wrapped);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT_CURRENCY_MATCH') : invariant(false) : void 0;
    !routes.every(function (_ref3) {
      var route = _ref3.route;
      return outputCurrency.wrapped.equals(route.output.wrapped);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT_CURRENCY_MATCH') : invariant(false) : void 0;
    var numPools = routes.map(function (_ref4) {
      var route = _ref4.route;
      return route.pools.length;
    }).reduce(function (total, cur) {
      return total + cur;
    }, 0);
    var poolAddressSet = new Set();
    for (var _iterator = _createForOfIteratorHelperLoose(routes), _step; !(_step = _iterator()).done;) {
      var route = _step.value.route;
      for (var _iterator2 = _createForOfIteratorHelperLoose(route.pools), _step2; !(_step2 = _iterator2()).done;) {
        var pool = _step2.value;
        poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee));
      }
    }
    !(numPools === poolAddressSet.size) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS_DUPLICATED') : invariant(false) : void 0;
    this.swaps = routes;
    this.tradeType = tradeType;
  }
  /**
   * @deprecated Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
   * this will return an error.
   *
   * When the trade consists of just a single route, this returns the route of the trade,
   * i.e. which pools the trade goes through.
   */
  /**
   * Constructs an exact in trade with the given amount in and route
   * @template TInput The input token, either IP or an ERC-20
   * @template TOutput The output token, either IP or an ERC-20
   * @param route The route of the exact in trade
   * @param amountIn The amount being passed in
   * @returns The exact in trade
   */
  Trade.exactIn =
  /*#__PURE__*/
  function () {
    var _exactIn = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(route, amountIn) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", Trade.fromRoute(route, amountIn, TradeType.EXACT_INPUT));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function exactIn(_x, _x2) {
      return _exactIn.apply(this, arguments);
    }
    return exactIn;
  }()
  /**
   * Constructs an exact out trade with the given amount out and route
   * @template TInput The input token, either IP or an ERC-20
   * @template TOutput The output token, either IP or an ERC-20
   * @param route The route of the exact out trade
   * @param amountOut The amount returned by the trade
   * @returns The exact out trade
   */
  ;
  Trade.exactOut =
  /*#__PURE__*/
  function () {
    var _exactOut = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(route, amountOut) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", Trade.fromRoute(route, amountOut, TradeType.EXACT_OUTPUT));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function exactOut(_x3, _x4) {
      return _exactOut.apply(this, arguments);
    }
    return exactOut;
  }()
  /**
   * Constructs a trade by simulating swaps through the given route
   * @template TInput The input token, either IP or an ERC-20.
   * @template TOutput The output token, either IP or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param route route to swap through
   * @param amount the amount specified, either input or output, depending on tradeType
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The route
   */
  ;
  Trade.fromRoute =
  /*#__PURE__*/
  function () {
    var _fromRoute = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(route, amount, tradeType) {
      var amounts, inputAmount, outputAmount, i, pool, _yield$pool$getOutput, _outputAmount, _i, _pool, _yield$_pool$getInput, _inputAmount;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            amounts = new Array(route.tokenPath.length);
            if (!(tradeType === TradeType.EXACT_INPUT)) {
              _context3.next = 19;
              break;
            }
            !amount.currency.equals(route.input) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
            amounts[0] = amount.wrapped;
            i = 0;
          case 5:
            if (!(i < route.tokenPath.length - 1)) {
              _context3.next = 15;
              break;
            }
            pool = route.pools[i];
            _context3.next = 9;
            return pool.getOutputAmount(amounts[i]);
          case 9:
            _yield$pool$getOutput = _context3.sent;
            _outputAmount = _yield$pool$getOutput[0];
            amounts[i + 1] = _outputAmount;
          case 12:
            i++;
            _context3.next = 5;
            break;
          case 15:
            inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
            outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amounts[amounts.length - 1].numerator, amounts[amounts.length - 1].denominator);
            _context3.next = 34;
            break;
          case 19:
            !amount.currency.equals(route.output) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
            amounts[amounts.length - 1] = amount.wrapped;
            _i = route.tokenPath.length - 1;
          case 22:
            if (!(_i > 0)) {
              _context3.next = 32;
              break;
            }
            _pool = route.pools[_i - 1];
            _context3.next = 26;
            return _pool.getInputAmount(amounts[_i]);
          case 26:
            _yield$_pool$getInput = _context3.sent;
            _inputAmount = _yield$_pool$getInput[0];
            amounts[_i - 1] = _inputAmount;
          case 29:
            _i--;
            _context3.next = 22;
            break;
          case 32:
            inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator);
            outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
          case 34:
            return _context3.abrupt("return", new Trade({
              routes: [{
                inputAmount: inputAmount,
                outputAmount: outputAmount,
                route: route
              }],
              tradeType: tradeType
            }));
          case 35:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function fromRoute(_x5, _x6, _x7) {
      return _fromRoute.apply(this, arguments);
    }
    return fromRoute;
  }()
  /**
   * Constructs a trade from routes by simulating swaps
   *
   * @template TInput The input token, either IP or an ERC-20.
   * @template TOutput The output token, either IP or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param routes the routes to swap through and how much of the amount should be routed through each
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The trade
   */
  ;
  Trade.fromRoutes =
  /*#__PURE__*/
  function () {
    var _fromRoutes = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(routes, tradeType) {
      var populatedRoutes, _iterator3, _step3, _step3$value, route, amount, amounts, inputAmount, outputAmount, i, pool, _yield$pool$getOutput2, _outputAmount2, _i2, _pool2, _yield$_pool2$getInpu, _inputAmount2;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            populatedRoutes = [];
            _iterator3 = _createForOfIteratorHelperLoose(routes);
          case 2:
            if ((_step3 = _iterator3()).done) {
              _context4.next = 43;
              break;
            }
            _step3$value = _step3.value, route = _step3$value.route, amount = _step3$value.amount;
            amounts = new Array(route.tokenPath.length);
            inputAmount = void 0;
            outputAmount = void 0;
            if (!(tradeType === TradeType.EXACT_INPUT)) {
              _context4.next = 25;
              break;
            }
            !amount.currency.equals(route.input) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
            inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
            amounts[0] = CurrencyAmount.fromFractionalAmount(route.input.wrapped, amount.numerator, amount.denominator);
            i = 0;
          case 12:
            if (!(i < route.tokenPath.length - 1)) {
              _context4.next = 22;
              break;
            }
            pool = route.pools[i];
            _context4.next = 16;
            return pool.getOutputAmount(amounts[i]);
          case 16:
            _yield$pool$getOutput2 = _context4.sent;
            _outputAmount2 = _yield$pool$getOutput2[0];
            amounts[i + 1] = _outputAmount2;
          case 19:
            i++;
            _context4.next = 12;
            break;
          case 22:
            outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amounts[amounts.length - 1].numerator, amounts[amounts.length - 1].denominator);
            _context4.next = 40;
            break;
          case 25:
            !amount.currency.equals(route.output) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
            outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
            amounts[amounts.length - 1] = CurrencyAmount.fromFractionalAmount(route.output.wrapped, amount.numerator, amount.denominator);
            _i2 = route.tokenPath.length - 1;
          case 29:
            if (!(_i2 > 0)) {
              _context4.next = 39;
              break;
            }
            _pool2 = route.pools[_i2 - 1];
            _context4.next = 33;
            return _pool2.getInputAmount(amounts[_i2]);
          case 33:
            _yield$_pool2$getInpu = _context4.sent;
            _inputAmount2 = _yield$_pool2$getInpu[0];
            amounts[_i2 - 1] = _inputAmount2;
          case 36:
            _i2--;
            _context4.next = 29;
            break;
          case 39:
            inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator);
          case 40:
            populatedRoutes.push({
              route: route,
              inputAmount: inputAmount,
              outputAmount: outputAmount
            });
          case 41:
            _context4.next = 2;
            break;
          case 43:
            return _context4.abrupt("return", new Trade({
              routes: populatedRoutes,
              tradeType: tradeType
            }));
          case 44:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function fromRoutes(_x8, _x9) {
      return _fromRoutes.apply(this, arguments);
    }
    return fromRoutes;
  }()
  /**
   * Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either IP or an ERC-20
   * @template TOutput The output token, either IP or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  ;
  Trade.createUncheckedTrade = function createUncheckedTrade(constructorArguments) {
    return new Trade(_extends({}, constructorArguments, {
      routes: [{
        inputAmount: constructorArguments.inputAmount,
        outputAmount: constructorArguments.outputAmount,
        route: constructorArguments.route
      }]
    }));
  }
  /**
   * Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either IP or an ERC-20
   * @template TOutput The output token, either IP or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */;
  Trade.createUncheckedTradeWithMultipleRoutes = function createUncheckedTradeWithMultipleRoutes(constructorArguments) {
    return new Trade(constructorArguments);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */;
  var _proto = Trade.prototype;
  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance, amountOut) {
    if (amountOut === void 0) {
      amountOut = this.outputAmount;
    }
    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */;
  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance, amountIn) {
    if (amountIn === void 0) {
      amountIn = this.inputAmount;
    }
    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
    }
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */;
  _proto.worstExecutionPrice = function worstExecutionPrice(slippageTolerance) {
    return new Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
  }
  /**
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact in trade
   */;
  Trade.bestTradeExactIn =
  /*#__PURE__*/
  function () {
    var _bestTradeExactIn = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(pools, currencyAmountIn, currencyOut, _temp,
    // used in recursion.
    currentPools, nextAmountIn, bestTrades) {
      var _ref5, _ref5$maxNumResults, maxNumResults, _ref5$maxHops, maxHops, amountIn, tokenOut, i, pool, amountOut, _yield$pool$getOutput3, poolsExcludingThisPool;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _ref5 = _temp === void 0 ? {} : _temp, _ref5$maxNumResults = _ref5.maxNumResults, maxNumResults = _ref5$maxNumResults === void 0 ? 3 : _ref5$maxNumResults, _ref5$maxHops = _ref5.maxHops, maxHops = _ref5$maxHops === void 0 ? 3 : _ref5$maxHops;
            if (currentPools === void 0) {
              currentPools = [];
            }
            if (nextAmountIn === void 0) {
              nextAmountIn = currencyAmountIn;
            }
            if (bestTrades === void 0) {
              bestTrades = [];
            }
            !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
            !(maxHops > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_HOPS') : invariant(false) : void 0;
            !(currencyAmountIn === nextAmountIn || currentPools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INVALID_RECURSION') : invariant(false) : void 0;
            amountIn = nextAmountIn.wrapped;
            tokenOut = currencyOut.wrapped;
            i = 0;
          case 10:
            if (!(i < pools.length)) {
              _context5.next = 46;
              break;
            }
            pool = pools[i]; // pool irrelevant
            if (!(!pool.token0.equals(amountIn.currency) && !pool.token1.equals(amountIn.currency))) {
              _context5.next = 14;
              break;
            }
            return _context5.abrupt("continue", 43);
          case 14:
            amountOut = void 0;
            _context5.prev = 15;
            _context5.next = 19;
            return pool.getOutputAmount(amountIn);
          case 19:
            _yield$pool$getOutput3 = _context5.sent;
            amountOut = _yield$pool$getOutput3[0];
            _context5.next = 28;
            break;
          case 23:
            _context5.prev = 23;
            _context5.t0 = _context5["catch"](15);
            if (!_context5.t0.isInsufficientInputAmountError) {
              _context5.next = 27;
              break;
            }
            return _context5.abrupt("continue", 43);
          case 27:
            throw _context5.t0;
          case 28:
            if (!(amountOut.currency.isToken && amountOut.currency.equals(tokenOut))) {
              _context5.next = 39;
              break;
            }
            _context5.t1 = sortedInsert;
            _context5.t2 = bestTrades;
            _context5.next = 33;
            return Trade.fromRoute(new Route([].concat(currentPools, [pool]), currencyAmountIn.currency, currencyOut), currencyAmountIn, TradeType.EXACT_INPUT);
          case 33:
            _context5.t3 = _context5.sent;
            _context5.t4 = maxNumResults;
            _context5.t5 = tradeComparator;
            (0, _context5.t1)(_context5.t2, _context5.t3, _context5.t4, _context5.t5);
            _context5.next = 43;
            break;
          case 39:
            if (!(maxHops > 1 && pools.length > 1)) {
              _context5.next = 43;
              break;
            }
            poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops
            _context5.next = 43;
            return Trade.bestTradeExactIn(poolsExcludingThisPool, currencyAmountIn, currencyOut, {
              maxNumResults: maxNumResults,
              maxHops: maxHops - 1
            }, [].concat(currentPools, [pool]), amountOut, bestTrades);
          case 43:
            i++;
            _context5.next = 10;
            break;
          case 46:
            return _context5.abrupt("return", bestTrades);
          case 47:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[15, 23]]);
    }));
    function bestTradeExactIn(_x10, _x11, _x12, _x13, _x14, _x15, _x16) {
      return _bestTradeExactIn.apply(this, arguments);
    }
    return bestTradeExactIn;
  }()
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the desired currency amount out
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact out trade
   */
  ;
  Trade.bestTradeExactOut =
  /*#__PURE__*/
  function () {
    var _bestTradeExactOut = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(pools, currencyIn, currencyAmountOut, _temp2,
    // used in recursion.
    currentPools, nextAmountOut, bestTrades) {
      var _ref6, _ref6$maxNumResults, maxNumResults, _ref6$maxHops, maxHops, amountOut, tokenIn, i, pool, amountIn, _yield$pool$getInputA, poolsExcludingThisPool;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _ref6 = _temp2 === void 0 ? {} : _temp2, _ref6$maxNumResults = _ref6.maxNumResults, maxNumResults = _ref6$maxNumResults === void 0 ? 3 : _ref6$maxNumResults, _ref6$maxHops = _ref6.maxHops, maxHops = _ref6$maxHops === void 0 ? 3 : _ref6$maxHops;
            if (currentPools === void 0) {
              currentPools = [];
            }
            if (nextAmountOut === void 0) {
              nextAmountOut = currencyAmountOut;
            }
            if (bestTrades === void 0) {
              bestTrades = [];
            }
            !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
            !(maxHops > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_HOPS') : invariant(false) : void 0;
            !(currencyAmountOut === nextAmountOut || currentPools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INVALID_RECURSION') : invariant(false) : void 0;
            amountOut = nextAmountOut.wrapped;
            tokenIn = currencyIn.wrapped;
            i = 0;
          case 10:
            if (!(i < pools.length)) {
              _context6.next = 46;
              break;
            }
            pool = pools[i]; // pool irrelevant
            if (!(!pool.token0.equals(amountOut.currency) && !pool.token1.equals(amountOut.currency))) {
              _context6.next = 14;
              break;
            }
            return _context6.abrupt("continue", 43);
          case 14:
            amountIn = void 0;
            _context6.prev = 15;
            _context6.next = 19;
            return pool.getInputAmount(amountOut);
          case 19:
            _yield$pool$getInputA = _context6.sent;
            amountIn = _yield$pool$getInputA[0];
            _context6.next = 28;
            break;
          case 23:
            _context6.prev = 23;
            _context6.t0 = _context6["catch"](15);
            if (!_context6.t0.isInsufficientReservesError) {
              _context6.next = 27;
              break;
            }
            return _context6.abrupt("continue", 43);
          case 27:
            throw _context6.t0;
          case 28:
            if (!amountIn.currency.equals(tokenIn)) {
              _context6.next = 39;
              break;
            }
            _context6.t1 = sortedInsert;
            _context6.t2 = bestTrades;
            _context6.next = 33;
            return Trade.fromRoute(new Route([pool].concat(currentPools), currencyIn, currencyAmountOut.currency), currencyAmountOut, TradeType.EXACT_OUTPUT);
          case 33:
            _context6.t3 = _context6.sent;
            _context6.t4 = maxNumResults;
            _context6.t5 = tradeComparator;
            (0, _context6.t1)(_context6.t2, _context6.t3, _context6.t4, _context6.t5);
            _context6.next = 43;
            break;
          case 39:
            if (!(maxHops > 1 && pools.length > 1)) {
              _context6.next = 43;
              break;
            }
            poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops
            _context6.next = 43;
            return Trade.bestTradeExactOut(poolsExcludingThisPool, currencyIn, currencyAmountOut, {
              maxNumResults: maxNumResults,
              maxHops: maxHops - 1
            }, [pool].concat(currentPools), amountIn, bestTrades);
          case 43:
            i++;
            _context6.next = 10;
            break;
          case 46:
            return _context6.abrupt("return", bestTrades);
          case 47:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[15, 23]]);
    }));
    function bestTradeExactOut(_x17, _x18, _x19, _x20, _x21, _x22, _x23) {
      return _bestTradeExactOut.apply(this, arguments);
    }
    return bestTradeExactOut;
  }();
  return _createClass(Trade, [{
    key: "route",
    get: function get() {
      !(this.swaps.length === 1) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MULTIPLE_ROUTES') : invariant(false) : void 0;
      return this.swaps[0].route;
    }
    /**
     * The input amount for the trade assuming no slippage.
     */
  }, {
    key: "inputAmount",
    get: function get() {
      if (this._inputAmount) {
        return this._inputAmount;
      }
      var inputCurrency = this.swaps[0].inputAmount.currency;
      var totalInputFromRoutes = this.swaps.map(function (_ref7) {
        var inputAmount = _ref7.inputAmount;
        return inputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(inputCurrency, 0));
      this._inputAmount = totalInputFromRoutes;
      return this._inputAmount;
    }
    /**
     * The output amount for the trade assuming no slippage.
     */
  }, {
    key: "outputAmount",
    get: function get() {
      if (this._outputAmount) {
        return this._outputAmount;
      }
      var outputCurrency = this.swaps[0].outputAmount.currency;
      var totalOutputFromRoutes = this.swaps.map(function (_ref8) {
        var outputAmount = _ref8.outputAmount;
        return outputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(outputCurrency, 0));
      this._outputAmount = totalOutputFromRoutes;
      return this._outputAmount;
    }
    /**
     * The price expressed in terms of output amount/input amount.
     */
  }, {
    key: "executionPrice",
    get: function get() {
      var _this$_executionPrice;
      return (_this$_executionPrice = this._executionPrice) != null ? _this$_executionPrice : this._executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient);
    }
    /**
     * Returns the percent difference between the route's mid price and the price impact
     */
  }, {
    key: "priceImpact",
    get: function get() {
      if (this._priceImpact) {
        return this._priceImpact;
      }
      var spotOutputAmount = CurrencyAmount.fromRawAmount(this.outputAmount.currency, 0);
      for (var _iterator4 = _createForOfIteratorHelperLoose(this.swaps), _step4; !(_step4 = _iterator4()).done;) {
        var _step4$value = _step4.value,
          route = _step4$value.route,
          inputAmount = _step4$value.inputAmount;
        var midPrice = route.midPrice;
        spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount));
      }
      var priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount);
      this._priceImpact = new Percent(priceImpact.numerator, priceImpact.denominator);
      return this._priceImpact;
    }
  }]);
}();

var _format = "hh-sol-artifact-1";
var contractName = "IMulticall";
var sourceName = "contracts/interfaces/IMulticall.sol";
var abi = [
	{
		inputs: [
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	}
];
var bytecode = "0x";
var deployedBytecode = "0x";
var linkReferences = {
};
var deployedLinkReferences = {
};
var IMulticall = {
	_format: _format,
	contractName: contractName,
	sourceName: sourceName,
	abi: abi,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	linkReferences: linkReferences,
	deployedLinkReferences: deployedLinkReferences
};

var Multicall = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Multicall() {}
  Multicall.encodeMulticall = function encodeMulticall(calldatas) {
    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas];
    }
    return calldatas.length === 1 ? calldatas[0] : Multicall.INTERFACE.encodeFunctionData('multicall', [calldatas]);
  };
  Multicall.decodeMulticall = function decodeMulticall(multicall) {
    return Multicall.INTERFACE.decodeFunctionData('multicall', multicall).data;
  };
  return Multicall;
}();
Multicall.INTERFACE = /*#__PURE__*/new Interface(IMulticall.abi);

var _format$1 = "hh-sol-artifact-1";
var contractName$1 = "NonfungiblePositionManager";
var sourceName$1 = "contracts/NonfungiblePositionManager.sol";
var abi$1 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "_WIP9",
				type: "address"
			},
			{
				internalType: "address",
				name: "_tokenDescriptor_",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Collect",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "DecreaseLiquidity",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "IncreaseLiquidity",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "WIP9",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "baseURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "burn",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint128",
						name: "amount0Max",
						type: "uint128"
					},
					{
						internalType: "uint128",
						name: "amount1Max",
						type: "uint128"
					}
				],
				internalType: "struct INonfungiblePositionManager.CollectParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "collect",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token0",
				type: "address"
			},
			{
				internalType: "address",
				name: "token1",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceX96",
				type: "uint160"
			}
		],
		name: "createAndInitializePoolIfNecessary",
		outputs: [
			{
				internalType: "address",
				name: "pool",
				type: "address"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "uint128",
						name: "liquidity",
						type: "uint128"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct INonfungiblePositionManager.DecreaseLiquidityParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "decreaseLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "getApproved",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct INonfungiblePositionManager.IncreaseLiquidityParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "increaseLiquidity",
		outputs: [
			{
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "token0",
						type: "address"
					},
					{
						internalType: "address",
						name: "token1",
						type: "address"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "int24",
						name: "tickLower",
						type: "int24"
					},
					{
						internalType: "int24",
						name: "tickUpper",
						type: "int24"
					},
					{
						internalType: "uint256",
						name: "amount0Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct INonfungiblePositionManager.MintParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "ownerOf",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "positions",
		outputs: [
			{
				internalType: "uint96",
				name: "nonce",
				type: "uint96"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "address",
				name: "token0",
				type: "address"
			},
			{
				internalType: "address",
				name: "token1",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "int24",
				name: "tickLower",
				type: "int24"
			},
			{
				internalType: "int24",
				name: "tickUpper",
				type: "int24"
			},
			{
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				internalType: "uint256",
				name: "feeGrowthInside0LastX128",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "feeGrowthInside1LastX128",
				type: "uint256"
			},
			{
				internalType: "uint128",
				name: "tokensOwed0",
				type: "uint128"
			},
			{
				internalType: "uint128",
				name: "tokensOwed1",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "refundIP",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "_data",
				type: "bytes"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermit",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowed",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowedIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Owed",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Owed",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "storyHuntV3MintCallback",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "tokenByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "tokenOfOwnerByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "tokenURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "unwrapWIP9",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
];
var bytecode$1 = "0x610120604052600d80546001600160b01b0319166001176001600160b01b0316600160b01b1790553480156200003457600080fd5b50604051620062e9380380620062e98339810160408190526200005791620002db565b82826040518060400160405280601d81526020017f53746f727948756e7420563320506f736974696f6e73204e46542d56310000008152506040518060400160405280600a8152602001695354482d56332d504f5360b01b815250604051806040016040528060018152602001603160f81b8152508282620000e66301ffc9a760e01b6200018d60201b60201c565b8151620000fb90600690602085019062000212565b5080516200011190600790602084019062000212565b50620001246380ac58cd60e01b6200018d565b62000136635b5e139f60e01b6200018d565b6200014863780e9d6360e01b6200018d565b50508251602093840120608052805192019190912060a052506001600160601b0319606092831b811660c05290821b811660e05291901b166101005250620003249050565b6001600160e01b03198082161415620001ed576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200024a576000855562000295565b82601f106200026557805160ff191683800117855562000295565b8280016001018555821562000295579182015b828111156200029557825182559160200191906001019062000278565b50620002a3929150620002a7565b5090565b5b80821115620002a35760008155600101620002a8565b80516001600160a01b0381168114620002d657600080fd5b919050565b600080600060608486031215620002f0578283fd5b620002fb84620002be565b92506200030b60208501620002be565b91506200031b60408501620002be565b90509250925092565b60805160a05160c05160601c60e05160601c6101005160601c615f40620003a96000398061298152508061029952806127f15280612b215280612c175280613a405280613a865280613afa525080610aa75280610dcc5280610e93528061147f528061291b5280612e4452806136e152508061157d52508061155c5250615f406000f3fe6080604052600436106102895760003560e01c80636c0360eb11610153578063addc9699116100cb578063df2ab5bb1161007f578063eff7a11311610064578063eff7a11314610702578063f3995c6714610715578063fc6f7865146107285761030d565b8063df2ab5bb146106cf578063e985e9c5146106e25761030d565b8063c2e3140a116100b0578063c2e3140a14610687578063c45a01551461069a578063c87b56dd146106af5761030d565b8063addc969914610652578063b88d4fde146106675761030d565b806395d89b4111610122578063a22cb46511610107578063a22cb465146105ff578063a4a78f0c1461061f578063ac9650d8146106325761030d565b806395d89b41146105b257806399fbab88146105c75761030d565b80636c0360eb1461054757806370a082311461055c5780637ac2ff7b1461057c578063883164561461058f5761030d565b806323b872dd1161020157806342842e0e116101b55780634659a4941161019a5780634659a494146104f45780634f6ccce7146105075780636352211e146105275761030d565b806342842e0e146104c157806342966c68146104e15761030d565b80632f745c59116101e65780632f745c591461047757806330adf81f146104975780633644e515146104ac5761030d565b806323b872dd146104375780632dac2256146104575761030d565b80630c49ccbe1161025857806318160ddd1161023d57806318160ddd146103eb5780631f9709821461040d578063219f5d17146104155761030d565b80630c49ccbe146103b757806313ead562146103d85761030d565b806301ffc9a71461031257806306fdde0314610348578063081812fc1461036a578063095ea7b3146103975761030d565b3661030d57336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461030b576040805162461bcd60e51b815260206004820152600860248201527f4e6f742057495039000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b005b600080fd5b34801561031e57600080fd5b5061033261032d3660046153a6565b61073b565b60405161033f919061591e565b60405180910390f35b34801561035457600080fd5b5061035d610776565b60405161033f9190615971565b34801561037657600080fd5b5061038a6103853660046156b8565b61080c565b60405161033f91906157e2565b3480156103a357600080fd5b5061030b6103b2366004615270565b610868565b6103ca6103c5366004615483565b61093e565b60405161033f929190615b42565b61038a6103e6366004615103565b610daa565b3480156103f757600080fd5b506104006110b7565b60405161033f9190615929565b61030b6110c8565b610428610423366004615494565b6110da565b60405161033f93929190615afd565b34801561044357600080fd5b5061030b61045236600461515c565b611413565b34801561046357600080fd5b5061030b610472366004615717565b61146a565b34801561048357600080fd5b50610400610492366004615270565b6114e8565b3480156104a357600080fd5b50610400611513565b3480156104b857600080fd5b50610400611537565b3480156104cd57600080fd5b5061030b6104dc36600461515c565b6115f5565b61030b6104ef3660046156b8565b611610565b61030b6105023660046152dc565b6116df565b34801561051357600080fd5b506104006105223660046156b8565b611792565b34801561053357600080fd5b5061038a6105423660046156b8565b6117a8565b34801561055357600080fd5b5061035d6117d0565b34801561056857600080fd5b506104006105773660046150af565b6117d5565b61030b61058a3660046152dc565b61183d565b6105a261059d366004615550565b611ce9565b60405161033f9493929190615b1e565b3480156105be57600080fd5b5061035d61224a565b3480156105d357600080fd5b506105e76105e23660046156b8565b6122ab565b60405161033f9c9b9a99989796959493929190615b50565b34801561060b57600080fd5b5061030b61061a366004615243565b6124da565b61030b61062d3660046152dc565b6125fd565b610645610640366004615337565b6126af565b60405161033f91906158a0565b34801561065e57600080fd5b5061038a6127ef565b34801561067357600080fd5b5061030b61068236600461519c565b612813565b61030b6106953660046152dc565b612871565b3480156106a657600080fd5b5061038a612919565b3480156106bb57600080fd5b5061035d6106ca3660046156b8565b61293d565b61030b6106dd36600461529b565b612a0c565b3480156106ee57600080fd5b506103326106fd3660046150cb565b612aef565b61030b6107103660046156d0565b612b1d565b61030b6107233660046152dc565b612c9d565b6103ca61073636600461546c565b612d28565b7fffffffff00000000000000000000000000000000000000000000000000000000811660009081526020819052604090205460ff165b919050565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108025780601f106107d757610100808354040283529160200191610802565b820191906000526020600020905b8154815290600101906020018083116107e557829003601f168201915b5050505050905090565b600061081782613246565b61083c5760405162461bcd60e51b8152600401610833906159bb565b60405180910390fd5b506000908152600c60205260409020546c0100000000000000000000000090046001600160a01b031690565b6000610873826117a8565b9050806001600160a01b0316836001600160a01b031614156108c65760405162461bcd60e51b8152600401808060200182810382526021815260200180615ee26021913960400191505060405180910390fd5b806001600160a01b03166108d8613253565b6001600160a01b031614806108f457506108f4816106fd613253565b61092f5760405162461bcd60e51b8152600401808060200182810382526038815260200180615e0c6038913960400191505060405180910390fd5b6109398383613257565b505050565b600080823561094d33826132db565b6109695760405162461bcd60e51b815260040161083390615984565b836080013580610977613377565b11156109ca576040805162461bcd60e51b815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b60006109dc6040870160208801615562565b6001600160801b0316116109ef57600080fd5b84356000908152600c602090815260409182902060018101549092600160801b9091046001600160801b031691610a2a918901908901615562565b6001600160801b0316816001600160801b03161015610a4857600080fd5b60018281015469ffffffffffffffffffff166000908152600b60209081526040808320815160608101835281546001600160a01b039081168252919095015490811692850192909252600160a01b90910462ffffff1690830152610acc7f00000000000000000000000000000000000000000000000000000000000000008361337b565b60018501549091506001600160a01b0382169063a34123a7906a01000000000000000000008104600290810b91600160681b9004900b610b1260408e0160208f01615562565b6040518463ffffffff1660e01b8152600401610b309392919061594b565b6040805180830381600087803b158015610b4957600080fd5b505af1158015610b5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b8191906156f4565b909850965060408901358810801590610b9e575088606001358710155b610bba5760405162461bcd60e51b815260040161083390615a18565b6001840154600090610bea9030906a01000000000000000000008104600290810b91600160681b9004900b613477565b9050600080836001600160a01b031663514ea4bf846040518263ffffffff1660e01b8152600401610c1b9190615929565b60a06040518083038186803b158015610c3357600080fd5b505afa158015610c47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c6b91906155ac565b50509250925050610c9087600201548303876001600160801b0316600160801b6134d1565b6004880180546fffffffffffffffffffffffffffffffff198116928e016001600160801b039182160181169290921790556003880154610cda91908303908816600160801b6134d1565b6004880180546001600160801b03808216938e01600160801b9283900482160116029190911790556002870182905560038701819055610d2060408d0160208e01615562565b86038760010160106101000a8154816001600160801b0302191690836001600160801b031602179055508b600001357f26f6a048ee9138f2c0ce266f322cb99228e8d619ae2bff30c67f8dcf9d2377b48d6020016020810190610d839190615562565b8d8d604051610d9493929190615afd565b60405180910390a2505050505050505050915091565b6000836001600160a01b0316856001600160a01b031610610dca57600080fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316631698ee828686866040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018262ffffff168152602001935050505060206040518083038186803b158015610e5557600080fd5b505afa158015610e69573d6000803e3d6000fd5b505050506040513d6020811015610e7f57600080fd5b505190506001600160a01b038116610fce577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a16712958686866040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018262ffffff1681526020019350505050602060405180830381600087803b158015610f1e57600080fd5b505af1158015610f32573d6000803e3d6000fd5b505050506040513d6020811015610f4857600080fd5b5051604080517ff637731d0000000000000000000000000000000000000000000000000000000081526001600160a01b03858116600483015291519293509083169163f637731d9160248082019260009290919082900301818387803b158015610fb157600080fd5b505af1158015610fc5573d6000803e3d6000fd5b505050506110af565b6000816001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e06040518083038186803b15801561100957600080fd5b505afa15801561101d573d6000803e3d6000fd5b505050506040513d60e081101561103357600080fd5b505190506001600160a01b0381166110ad57816001600160a01b031663f637731d846040518263ffffffff1660e01b815260040180826001600160a01b03168152602001915050600060405180830381600087803b15801561109457600080fd5b505af11580156110a8573d6000803e3d6000fd5b505050505b505b949350505050565b60006110c36002613580565b905090565b47156110d8576110d8334761358b565b565b60008060008360a00135806110ed613377565b1115611140576040805162461bcd60e51b815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b84356000908152600c6020908152604080832060018082015469ffffffffffffffffffff81168652600b855283862084516060808201875282546001600160a01b039081168352929094015480831682890190815262ffffff600160a01b9092048216838901908152885161014081018a528451861681529151909416818a01529251168287015230828501526a01000000000000000000008304600290810b810b608080850191909152600160681b909404810b900b60a0830152958c013560c0820152938b013560e0850152908a0135610100840152890135610120830152929061122c90613694565b6001870154939a50919850965091506000906112669030906a01000000000000000000008104600290810b91600160681b9004900b613477565b9050600080836001600160a01b031663514ea4bf846040518263ffffffff1660e01b81526004016112979190615929565b60a06040518083038186803b1580156112af57600080fd5b505afa1580156112c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112e791906155ac565b50509250925050611323866002015483038760010160109054906101000a90046001600160801b03166001600160801b0316600160801b6134d1565b6004870180546001600160801b0380821690930183166fffffffffffffffffffffffffffffffff19909116179055600387015460018801546113739291840391600160801b9182900416906134d1565b6004870180546001600160801b03600160801b80830482169094018116840291811691909117909155600288018490556003880183905560018801805483810483168e018316909302929091169190911790556040518b35907f3067048beee31b25b2f1681f88dac838c8bba36af25bfb2b7cf7473a5847e35f906113fd908d908d908d90615afd565b60405180910390a2505050505050509193909250565b61142461141e613253565b826132db565b61145f5760405162461bcd60e51b8152600401808060200182810382526031815260200180615f036031913960400191505060405180910390fd5b6109398383836138cf565b6000611478828401846154a5565b90506114a87f00000000000000000000000000000000000000000000000000000000000000008260000151613a1b565b5084156114c35780515160208201516114c391903388613a3e565b83156114e1576114e181600001516020015182602001513387613a3e565b5050505050565b6001600160a01b038216600090815260016020526040812061150a9083613bce565b90505b92915050565b7f49ecf333e5b8c95c40fdafc95c1ad136e8914a8fb55e9dc8bb01eaa83a2df9ad81565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000006115a4613bda565b3060405160200180868152602001858152602001848152602001838152602001826001600160a01b031681526020019550505050505060405160208183030381529060405280519060200120905090565b61093983838360405180602001604052806000815250612813565b8061161b33826132db565b6116375760405162461bcd60e51b815260040161083390615984565b6000828152600c602052604090206001810154600160801b90046001600160801b0316158015611672575060048101546001600160801b0316155b801561169057506004810154600160801b90046001600160801b0316155b6116ac5760405162461bcd60e51b815260040161083390615a86565b6000838152600c602052604081208181556001810182905560028101829055600381018290556004015561093983613bde565b604080517f8fcbaf0c00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101879052606481018690526001608482015260ff851660a482015260c4810184905260e4810183905290516001600160a01b03881691638fcbaf0c9161010480830192600092919082900301818387803b15801561177257600080fd5b505af1158015611786573d6000803e3d6000fd5b50505050505050505050565b6000806117a0600284613cab565b509392505050565b600061150d82604051806060016040528060298152602001615e6e6029913960029190613cc9565b606090565b60006001600160a01b03821661181c5760405162461bcd60e51b815260040180806020018281038252602a815260200180615e44602a913960400191505060405180910390fd5b6001600160a01b038216600090815260016020526040902061150d90613580565b83611846613377565b1115611899576040805162461bcd60e51b815260206004820152600e60248201527f5065726d69742065787069726564000000000000000000000000000000000000604482015290519081900360640190fd5b60006118a3611537565b7f49ecf333e5b8c95c40fdafc95c1ad136e8914a8fb55e9dc8bb01eaa83a2df9ad88886118cf81613cd6565b604080516020808201969096526001600160a01b03909416848201526060840192909252608083015260a08083018a90528151808403909101815260c0830182528051908401207f190100000000000000000000000000000000000000000000000000000000000060e084015260e283019490945261010280830194909452805180830390940184526101229091019052815191012090506000611972876117a8565b9050806001600160a01b0316886001600160a01b031614156119c55760405162461bcd60e51b8152600401808060200182810382526027815260200180615d6f6027913960400191505060405180910390fd5b6119ce81613d15565b15611ba9576040805160208082018790528183018690527fff0000000000000000000000000000000000000000000000000000000000000060f889901b16606083015282516041818403018152606183018085527f1626ba7e0000000000000000000000000000000000000000000000000000000090526065830186815260858401948552815160a585015281516001600160a01b03871695631626ba7e958995919260c59091019185019080838360005b83811015611a98578181015183820152602001611a80565b50505050905090810190601f168015611ac55780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b158015611ae357600080fd5b505afa158015611af7573d6000803e3d6000fd5b505050506040513d6020811015611b0d57600080fd5b50517fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e0000000000000000000000000000000000000000000000000000000014611ba4576040805162461bcd60e51b815260206004820152600c60248201527f556e617574686f72697a65640000000000000000000000000000000000000000604482015290519081900360640190fd5b611cd5565b600060018387878760405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015611c05573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611c6d576040805162461bcd60e51b815260206004820152601160248201527f496e76616c6964207369676e6174757265000000000000000000000000000000604482015290519081900360640190fd5b816001600160a01b0316816001600160a01b031614611cd3576040805162461bcd60e51b815260206004820152600c60248201527f556e617574686f72697a65640000000000000000000000000000000000000000604482015290519081900360640190fd5b505b611cdf8888613257565b5050505050505050565b60008060008084610140013580611cfe613377565b1115611d51576040805162461bcd60e51b815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b604080516101408101909152600090611e1d9080611d7260208b018b6150af565b6001600160a01b03168152602001896020016020810190611d9391906150af565b6001600160a01b03168152602001611db160608b0160408c0161569e565b62ffffff168152306020820152604001611dd160808b0160608c016153e6565b60020b8152602001611de960a08b0160808c016153e6565b60020b81526020018960a0013581526020018960c0013581526020018960e001358152602001896101000135815250613694565b92975090955093509050611e91611e3c61014089016101208a016150af565b600d80547fffffffffffffffffffff000000000000000000000000000000000000000000008116600175ffffffffffffffffffffffffffffffffffffffffffff92831690810190921617909155975087613d1b565b6000611ebc30611ea760808b0160608c016153e6565b611eb760a08c0160808d016153e6565b613477565b9050600080836001600160a01b031663514ea4bf846040518263ffffffff1660e01b8152600401611eed9190615929565b60a06040518083038186803b158015611f0557600080fd5b505afa158015611f19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f3d91906155ac565b505092509250506000611fb68560405180606001604052808e6000016020810190611f6891906150af565b6001600160a01b031681526020018e6020016020810190611f8991906150af565b6001600160a01b031681526020018e6040016020810190611faa919061569e565b62ffffff169052613e49565b905060405180610140016040528060006bffffffffffffffffffffffff16815260200160006001600160a01b031681526020018269ffffffffffffffffffff1681526020018c606001602081019061200e91906153e6565b60020b815260200161202660a08e0160808f016153e6565b60020b81526020018a6001600160801b0316815260200184815260200183815260200160006001600160801b0316815260200160006001600160801b0316815250600c60008c815260200190815260200160002060008201518160000160006101000a8154816bffffffffffffffffffffffff02191690836bffffffffffffffffffffffff160217905550602082015181600001600c6101000a8154816001600160a01b0302191690836001600160a01b0316021790555060408201518160010160006101000a81548169ffffffffffffffffffff021916908369ffffffffffffffffffff160217905550606082015181600101600a6101000a81548162ffffff021916908360020b62ffffff160217905550608082015181600101600d6101000a81548162ffffff021916908360020b62ffffff16021790555060a08201518160010160106101000a8154816001600160801b0302191690836001600160801b0316021790555060c0820151816002015560e082015181600301556101008201518160040160006101000a8154816001600160801b0302191690836001600160801b031602179055506101208201518160040160106101000a8154816001600160801b0302191690836001600160801b03160217905550905050897f3067048beee31b25b2f1681f88dac838c8bba36af25bfb2b7cf7473a5847e35f8a8a8a60405161223593929190615afd565b60405180910390a25050505050509193509193565b60078054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108025780601f106107d757610100808354040283529160200191610802565b6000818152600c6020908152604080832081516101408101835281546bffffffffffffffffffffffff811682526001600160a01b036c010000000000000000000000009091041693810193909352600181015469ffffffffffffffffffff81169284018390526a01000000000000000000008104600290810b810b810b6060860152600160681b8204810b810b810b60808601526001600160801b03600160801b92839004811660a08701529083015460c0860152600383015460e0860152600490920154808316610100860152041661012083015282918291829182918291829182918291829182918291906123b45760405162461bcd60e51b815260040161083390615a4f565b6000600b6000836040015169ffffffffffffffffffff1669ffffffffffffffffffff1681526020019081526020016000206040518060600160405290816000820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b031681526020016001820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b031681526020016001820160149054906101000a900462ffffff1662ffffff1662ffffff1681525050905081600001518260200151826000015183602001518460400151866060015187608001518860a001518960c001518a60e001518b61010001518c61012001519d509d509d509d509d509d509d509d509d509d509d509d50505091939597999b5091939597999b565b6124e2613253565b6001600160a01b0316826001600160a01b03161415612548576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b8060056000612555613253565b6001600160a01b0390811682526020808301939093526040918201600090812091871680825291909352912080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016921515929092179091556125b7613253565b6001600160a01b03167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b604080517fdd62ed3e0000000000000000000000000000000000000000000000000000000081523360048201523060248201529051600019916001600160a01b0389169163dd62ed3e91604480820192602092909190829003018186803b15801561266757600080fd5b505afa15801561267b573d6000803e3d6000fd5b505050506040513d602081101561269157600080fd5b505110156126a7576126a78686868686866116df565b505050505050565b60608167ffffffffffffffff811180156126c857600080fd5b506040519080825280602002602001820160405280156126fc57816020015b60608152602001906001900390816126e75790505b50905060005b828110156127e8576000803086868581811061271a57fe5b905060200281019061272c9190615bef565b60405161273a9291906157d2565b600060405180830381855af49150503d8060008114612775576040519150601f19603f3d011682016040523d82523d6000602084013e61277a565b606091505b5091509150816127c65760448151101561279357600080fd5b600481019050808060200190518101906127ad9190615402565b60405162461bcd60e51b81526004016108339190615971565b808484815181106127d357fe5b60209081029190910101525050600101612702565b5092915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b61282461281e613253565b836132db565b61285f5760405162461bcd60e51b8152600401808060200182810382526031815260200180615f036031913960400191505060405180910390fd5b61286b84848484613f99565b50505050565b604080517fdd62ed3e000000000000000000000000000000000000000000000000000000008152336004820152306024820152905186916001600160a01b0389169163dd62ed3e91604480820192602092909190829003018186803b1580156128d957600080fd5b505afa1580156128ed573d6000803e3d6000fd5b505050506040513d602081101561290357600080fd5b505110156126a7576126a7868686868686612c9d565b7f000000000000000000000000000000000000000000000000000000000000000081565b606061294882613246565b61295157600080fd5b6040517fe9dc63750000000000000000000000000000000000000000000000000000000081526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063e9dc6375906129b89030908690600401615932565b60006040518083038186803b1580156129d057600080fd5b505afa1580156129e4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261150d9190810190615402565b6000836001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015612a5b57600080fd5b505afa158015612a6f573d6000803e3d6000fd5b505050506040513d6020811015612a8557600080fd5b5051905082811015612ade576040805162461bcd60e51b815260206004820152601260248201527f496e73756666696369656e7420746f6b656e0000000000000000000000000000604482015290519081900360640190fd5b801561286b5761286b848383613feb565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015612b8c57600080fd5b505afa158015612ba0573d6000803e3d6000fd5b505050506040513d6020811015612bb657600080fd5b5051905082811015612c0f576040805162461bcd60e51b815260206004820152601160248201527f496e73756666696369656e742057495039000000000000000000000000000000604482015290519081900360640190fd5b8015610939577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316632e1a7d4d826040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b158015612c7b57600080fd5b505af1158015612c8f573d6000803e3d6000fd5b50505050610939828261358b565b604080517fd505accf000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018790526064810186905260ff8516608482015260a4810184905260c4810183905290516001600160a01b0388169163d505accf9160e480830192600092919082900301818387803b15801561177257600080fd5b6000808235612d3733826132db565b612d535760405162461bcd60e51b815260040161083390615984565b6000612d656060860160408701615562565b6001600160801b03161180612d9257506000612d876080860160608701615562565b6001600160801b0316115b612d9b57600080fd5b600080612dae60408701602088016150af565b6001600160a01b031614612dd157612dcc60408601602087016150af565b612dd3565b305b85356000908152600c6020908152604080832060018082015469ffffffffffffffffffff168552600b8452828520835160608101855281546001600160a01b039081168252919092015490811694820194909452600160a01b90930462ffffff169183019190915292935090612e697f00000000000000000000000000000000000000000000000000000000000000008361337b565b600484015460018501549192506001600160801b0380821692600160801b92839004821692900416156130865760018501546040517fa34123a70000000000000000000000000000000000000000000000000000000081526001600160a01b0385169163a34123a791612f00916a01000000000000000000008104600290810b92600160681b909204900b9060009060040161594b565b6040805180830381600087803b158015612f1957600080fd5b505af1158015612f2d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f5191906156f4565b5050600185015460009081906001600160a01b0386169063514ea4bf90612f969030906a01000000000000000000008104600290810b91600160681b9004900b613477565b6040518263ffffffff1660e01b8152600401612fb29190615929565b60a06040518083038186803b158015612fca57600080fd5b505afa158015612fde573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061300291906155ac565b5050925092505061303e876002015483038860010160109054906101000a90046001600160801b03166001600160801b0316600160801b6134d1565b84019350613077876003015482038860010160109054906101000a90046001600160801b03166001600160801b0316600160801b6134d1565b60028801929092556003870155015b6000806001600160801b0384166130a360608e0160408f01615562565b6001600160801b0316116130c6576130c160608d0160408e01615562565b6130c8565b835b836001600160801b03168d60600160208101906130e59190615562565b6001600160801b0316116131085761310360808e0160608f01615562565b61310a565b835b60018901546040517f4f1eb3d80000000000000000000000000000000000000000000000000000000081529294509092506001600160a01b03871691634f1eb3d89161317d918c916a01000000000000000000008104600290810b92600160681b909204900b9088908890600401615839565b6040805180830381600087803b15801561319657600080fd5b505af11580156131aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131ce919061557e565b6004890180546fffffffffffffffffffffffffffffffff196001600160801b03918216600160801b878a0384160217168689038216179091556040519281169d50169a508c35907f40d0efd1a53d60ecbf40971b9daf7dc90178c3aadc7aab1765632738fa8b8f0190610d94908b9086908690615876565b600061150d60028361417b565b3390565b6000818152600c6020526040902080546bffffffffffffffffffffffff166c010000000000000000000000006001600160a01b0385169081029190911790915581906132a2826117a8565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006132e682613246565b6133215760405162461bcd60e51b815260040180806020018281038252602c815260200180615de0602c913960400191505060405180910390fd5b600061332c836117a8565b9050806001600160a01b0316846001600160a01b031614806133675750836001600160a01b031661335c8461080c565b6001600160a01b0316145b806110af57506110af8185612aef565b4290565b600081602001516001600160a01b031682600001516001600160a01b0316106133a357600080fd5b50805160208083015160409384015184516001600160a01b0394851681850152939091168385015262ffffff166060808401919091528351808403820181526080840185528051908301207fff0000000000000000000000000000000000000000000000000000000000000060a085015294901b6bffffffffffffffffffffffff191660a183015260b58201939093527f5cea2eb9879ca53b37c03e28e630340a0e2b1575e3df2ba4b38a11af3946ac9260d5808301919091528251808303909101815260f5909101909152805191012090565b604080516bffffffffffffffffffffffff19606086901b16602080830191909152600285810b60e890811b60348501529085900b901b60378301528251601a818403018152603a90920190925280519101205b9392505050565b600080806000198587098686029250828110908390030390508061350757600084116134fc57600080fd5b5082900490506134ca565b80841161351357600080fd5b6000848688096000868103871696879004966002600389028118808a02820302808a02820302808a02820302808a02820302808a02820302808a02909103029181900381900460010186841190950394909402919094039290920491909117919091029150509392505050565b600061150d82614187565b604080516000808252602082019092526001600160a01b0384169083906040518082805190602001908083835b602083106135d75780518252601f1990920191602091820191016135b8565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114613639576040519150601f19603f3d011682016040523d82523d6000602084013e61363e565b606091505b5050905080610939576040805162461bcd60e51b815260206004820152600360248201527f5354450000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000806000806000604051806060016040528087600001516001600160a01b0316815260200187602001516001600160a01b03168152602001876040015162ffffff1681525090506137067f00000000000000000000000000000000000000000000000000000000000000008261337b565b91506000826001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e06040518083038186803b15801561374357600080fd5b505afa158015613757573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061377b919061560d565b50505050505090506000613792886080015161418b565b905060006137a38960a0015161418b565b90506137ba8383838c60c001518d60e001516144d9565b9750505050816001600160a01b0316633c8a7d8d876060015188608001518960a00151896040518060400160405280888152602001336001600160a01b031681525060405160200161380c9190615abd565b6040516020818303038152906040526040518663ffffffff1660e01b815260040161383b9594939291906157f6565b6040805180830381600087803b15801561385457600080fd5b505af1158015613868573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061388c91906156f4565b610100880151919550935084108015906138ab57508561012001518310155b6138c75760405162461bcd60e51b815260040161083390615a18565b509193509193565b826001600160a01b03166138e2826117a8565b6001600160a01b0316146139275760405162461bcd60e51b8152600401808060200182810382526029815260200180615eb96029913960400191505060405180910390fd5b6001600160a01b03821661396c5760405162461bcd60e51b8152600401808060200182810382526024815260200180615d966024913960400191505060405180910390fd5b613977838383610939565b613982600082613257565b6001600160a01b03831660009081526001602052604090206139a4908261459d565b506001600160a01b03821660009081526001602052604090206139c790826145a9565b506139d4600282846145b5565b5080826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6000613a27838361337b565b9050336001600160a01b0382161461150d57600080fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316846001600160a01b0316148015613a7f5750804710155b15613ba1577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d0e30db0826040518263ffffffff1660e01b81526004016000604051808303818588803b158015613adf57600080fd5b505af1158015613af3573d6000803e3d6000fd5b50505050507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a9059cbb83836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015613b6f57600080fd5b505af1158015613b83573d6000803e3d6000fd5b505050506040513d6020811015613b9957600080fd5b5061286b9050565b6001600160a01b038316301415613bc257613bbd848383613feb565b61286b565b61286b848484846145cb565b600061150a8383614763565b4690565b6000613be9826117a8565b9050613bf781600084610939565b613c02600083613257565b6000828152600860205260409020546002600019610100600184161502019091160415613c40576000828152600860205260408120613c409161501f565b6001600160a01b0381166000908152600160205260409020613c62908361459d565b50613c6e6002836147c7565b5060405182906000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6000808080613cba86866147d3565b909450925050505b9250929050565b60006110af84848461484e565b6000908152600c6020526040902080546bffffffffffffffffffffffff19811660016bffffffffffffffffffffffff9283169081019092161790915590565b3b151590565b6001600160a01b038216613d76576040805162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015290519081900360640190fd5b613d7f81613246565b15613dd1576040805162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015290519081900360640190fd5b613ddd60008383610939565b6001600160a01b0382166000908152600160205260409020613dff90826145a9565b50613e0c600282846145b5565b5060405181906001600160a01b038416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6001600160a01b0382166000908152600a602052604090205469ffffffffffffffffffff168061150d5750600d8054600169ffffffffffffffffffff76010000000000000000000000000000000000000000000080840482168381019092160275ffffffffffffffffffffffffffffffffffffffffffff909316929092179092556001600160a01b038085166000908152600a6020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffff000000000000000000001686179055848352600b825291829020865181549085167fffffffffffffffffffffffff000000000000000000000000000000000000000091821617825591870151950180549287015162ffffff16600160a01b027fffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffff969094169290911691909117939093161790915592915050565b613fa48484846138cf565b613fb084848484614918565b61286b5760405162461bcd60e51b8152600401808060200182810382526032815260200180615d3d6032913960400191505060405180910390fd5b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251825160009485949389169392918291908083835b602083106140955780518252601f199092019160209182019101614076565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146140f7576040519150601f19603f3d011682016040523d82523d6000602084013e6140fc565b606091505b509150915081801561412a57508051158061412a575080806020019051602081101561412757600080fd5b50515b6114e1576040805162461bcd60e51b815260206004820152600260248201527f5354000000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b600061150a8383614af4565b5490565b60008060008360020b126141a2578260020b6141aa565b8260020b6000035b9050620d89e8811115614204576040805162461bcd60e51b815260206004820152600160248201527f5400000000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b60006001821661421857600160801b61422a565b6ffffcb933bd6fad37aa2d162d1a5940015b70ffffffffffffffffffffffffffffffffff169050600282161561425e576ffff97272373d413259a46990580e213a0260801c5b600482161561427d576ffff2e50f5f656932ef12357cf3c7fdcc0260801c5b600882161561429c576fffe5caca7e10e4e61c3624eaa0941cd00260801c5b60108216156142bb576fffcb9843d60f6159c9db58835c9266440260801c5b60208216156142da576fff973b41fa98c081472e6896dfb254c00260801c5b60408216156142f9576fff2ea16466c96a3843ec78b326b528610260801c5b6080821615614318576ffe5dee046a99a2a811c461f1969c30530260801c5b610100821615614338576ffcbe86c7900a88aedcffc83b479aa3a40260801c5b610200821615614358576ff987a7253ac413176f2b074cf7815e540260801c5b610400821615614378576ff3392b0822b70005940c7a398e4b70f30260801c5b610800821615614398576fe7159475a2c29b7443b29c7fa6e889d90260801c5b6110008216156143b8576fd097f3bdfd2022b8845ad8f792aa58250260801c5b6120008216156143d8576fa9f746462d870fdf8a65dc1f90e061e50260801c5b6140008216156143f8576f70d869a156d2a1b890bb3df62baf32f70260801c5b618000821615614418576f31be135f97d08fd981231505542fcfa60260801c5b62010000821615614439576f09aa508b5b7a84e1c677de54f3e99bc90260801c5b62020000821615614459576e5d6af8dedb81196699c329225ee6040260801c5b62040000821615614478576d2216e584f5fa1ea926041bedfe980260801c5b62080000821615614495576b048a170391f7dc42444e8fa20260801c5b60008460020b13156144b05780600019816144ac57fe5b0490505b6401000000008106156144c45760016144c7565b60005b60ff16602082901c0192505050919050565b6000836001600160a01b0316856001600160a01b031611156144f9579293925b846001600160a01b0316866001600160a01b0316116145245761451d858585614b0c565b9050614594565b836001600160a01b0316866001600160a01b0316101561458657600061454b878686614b0c565b9050600061455a878986614b78565b9050806001600160801b0316826001600160801b03161061457b578061457d565b815b92505050614594565b614591858584614b78565b90505b95945050505050565b600061150a8383614bbe565b600061150a8383614c84565b60006110af84846001600160a01b038516614cce565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd00000000000000000000000000000000000000000000000000000000178152925182516000948594938a169392918291908083835b6020831061467d5780518252601f19909201916020918201910161465e565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146146df576040519150601f19603f3d011682016040523d82523d6000602084013e6146e4565b606091505b5091509150818015614712575080511580614712575080806020019051602081101561470f57600080fd5b50515b6126a7576040805162461bcd60e51b815260206004820152600360248201527f5354460000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b815460009082106147a55760405162461bcd60e51b8152600401808060200182810382526022815260200180615d1b6022913960400191505060405180910390fd5b8260000182815481106147b457fe5b9060005260206000200154905092915050565b600061150a8383614d65565b8154600090819083106148175760405162461bcd60e51b8152600401808060200182810382526022815260200180615e976022913960400191505060405180910390fd5b600084600001848154811061482857fe5b906000526020600020906002020190508060000154816001015492509250509250929050565b600082815260018401602052604081205482816148e95760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156148ae578181015183820152602001614896565b50505050905090810190601f1680156148db5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508460000160018203815481106148fc57fe5b9060005260206000209060020201600101549150509392505050565b600061492c846001600160a01b0316613d15565b614938575060016110af565b6000614a897f150b7a0200000000000000000000000000000000000000000000000000000000614966613253565b88878760405160240180856001600160a01b03168152602001846001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156149cd5781810151838201526020016149b5565b50505050905090810190601f1680156149fa5780820380516001836020036101000a031916815260200191505b5095505050505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051806060016040528060328152602001615d3d603291396001600160a01b0388169190614e39565b90506000818060200190516020811015614aa257600080fd5b50517fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a02000000000000000000000000000000000000000000000000000000001492505050949350505050565b60009081526001919091016020526040902054151590565b6000826001600160a01b0316846001600160a01b03161115614b2c579192915b6000614b58856001600160a01b0316856001600160a01b03166c010000000000000000000000006134d1565b9050614594614b7384838888036001600160a01b03166134d1565b614e48565b6000826001600160a01b0316846001600160a01b03161115614b98579192915b6110af614b73836c010000000000000000000000008787036001600160a01b03166134d1565b60008181526001830160205260408120548015614c7a5783546000198083019190810190600090879083908110614bf157fe5b9060005260206000200154905080876000018481548110614c0e57fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080614c3e57fe5b6001900381819060005260206000200160009055905586600101600087815260200190815260200160002060009055600194505050505061150d565b600091505061150d565b6000614c908383614af4565b614cc65750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561150d565b50600061150d565b600082815260018401602052604081205480614d335750506040805180820182528381526020808201848152865460018181018955600089815284812095516002909302909501918255915190820155865486845281880190925292909120556134ca565b82856000016001830381548110614d4657fe5b90600052602060002090600202016001018190555060009150506134ca565b60008181526001830160205260408120548015614c7a5783546000198083019190810190600090879083908110614d9857fe5b9060005260206000209060020201905080876000018481548110614db857fe5b600091825260208083208454600290930201918255600193840154918401919091558354825289830190526040902090840190558654879080614df757fe5b600082815260208082206002600019909401938402018281556001908101839055929093558881528982019092526040822091909155945061150d9350505050565b60606110af8484600085614e5e565b806001600160801b038116811461077157600080fd5b606082471015614e9f5760405162461bcd60e51b8152600401808060200182810382526026815260200180615dba6026913960400191505060405180910390fd5b614ea885613d15565b614ef9576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600080866001600160a01b031685876040518082805190602001908083835b60208310614f375780518252601f199092019160209182019101614f18565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114614f99576040519150601f19603f3d011682016040523d82523d6000602084013e614f9e565b606091505b5091509150614fae828286614fb9565b979650505050505050565b60608315614fc85750816134ca565b825115614fd85782518084602001fd5b60405162461bcd60e51b81526020600482018181528451602484015284518593919283926044019190850190808383600083156148ae578181015183820152602001614896565b50805460018160011615610100020316600290046000825580601f106150455750615063565b601f0160209004906000526020600020908101906150639190615066565b50565b5b8082111561507b5760008155600101615067565b5090565b803561077181615cc4565b805161ffff8116811461077157600080fd5b803562ffffff8116811461077157600080fd5b6000602082840312156150c0578081fd5b81356134ca81615cc4565b600080604083850312156150dd578081fd5b82356150e881615cc4565b915060208301356150f881615cc4565b809150509250929050565b60008060008060808587031215615118578182fd5b843561512381615cc4565b9350602085013561513381615cc4565b92506151416040860161509c565b9150606085013561515181615cc4565b939692955090935050565b600080600060608486031215615170578081fd5b833561517b81615cc4565b9250602084013561518b81615cc4565b929592945050506040919091013590565b600080600080608085870312156151b1578182fd5b84356151bc81615cc4565b935060208501356151cc81615cc4565b925060408501359150606085013567ffffffffffffffff8111156151ee578182fd5b8501601f810187136151fe578182fd5b803561521161520c82615c76565b615c52565b818152886020838501011115615225578384fd5b81602084016020830137908101602001929092525092959194509250565b60008060408385031215615255578182fd5b823561526081615cc4565b915060208301356150f881615cd9565b60008060408385031215615282578182fd5b823561528d81615cc4565b946020939093013593505050565b6000806000606084860312156152af578081fd5b83356152ba81615cc4565b92506020840135915060408401356152d181615cc4565b809150509250925092565b60008060008060008060c087890312156152f4578384fd5b86356152ff81615cc4565b95506020870135945060408701359350606087013561531d81615d0b565b9598949750929560808101359460a0909101359350915050565b60008060208385031215615349578182fd5b823567ffffffffffffffff80821115615360578384fd5b818501915085601f830112615373578384fd5b813581811115615381578485fd5b8660208083028501011115615394578485fd5b60209290920196919550909350505050565b6000602082840312156153b7578081fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146134ca578182fd5b6000602082840312156153f7578081fd5b81356134ca81615ce7565b600060208284031215615413578081fd5b815167ffffffffffffffff811115615429578182fd5b8201601f81018413615439578182fd5b805161544761520c82615c76565b81815285602083850101111561545b578384fd5b614594826020830160208601615c98565b60006080828403121561547d578081fd5b50919050565b600060a0828403121561547d578081fd5b600060c0828403121561547d578081fd5b600081830360808112156154b7578182fd5b6040516040810167ffffffffffffffff82821081831117156154d557fe5b8160405260608412156154e6578485fd5b60a08301935081841081851117156154fa57fe5b50826040528435925061550c83615cc4565b91825260208401359161551e83615cc4565b8260608301526155306040860161509c565b608083015281526155436060850161507f565b6020820152949350505050565b6000610160828403121561547d578081fd5b600060208284031215615573578081fd5b81356134ca81615cf6565b60008060408385031215615590578182fd5b825161559b81615cf6565b60208401519092506150f881615cf6565b600080600080600060a086880312156155c3578283fd5b85516155ce81615cf6565b80955050602086015193506040860151925060608601516155ee81615cf6565b60808701519092506155ff81615cf6565b809150509295509295909350565b600080600080600080600060e0888a031215615627578485fd5b875161563281615cc4565b602089015190975061564381615ce7565b95506156516040890161508a565b945061565f6060890161508a565b935061566d6080890161508a565b925060a088015161567d81615d0b565b60c089015190925061568e81615cd9565b8091505092959891949750929550565b6000602082840312156156af578081fd5b61150a8261509c565b6000602082840312156156c9578081fd5b5035919050565b600080604083850312156156e2578182fd5b8235915060208301356150f881615cc4565b60008060408385031215615706578182fd5b505080516020909101519092909150565b6000806000806060858703121561572c578182fd5b8435935060208501359250604085013567ffffffffffffffff80821115615751578384fd5b818701915087601f830112615764578384fd5b813581811115615772578485fd5b886020828501011115615783578485fd5b95989497505060200194505050565b600081518084526157aa816020860160208601615c98565b601f01601f19169290920160200192915050565b60020b9052565b6001600160801b03169052565b6000828483379101908152919050565b6001600160a01b0391909116815260200190565b60006001600160a01b03871682528560020b60208301528460020b60408301526001600160801b038416606083015260a06080830152614fae60a0830184615792565b6001600160a01b03959095168552600293840b60208601529190920b60408401526001600160801b03918216606084015216608082015260a00190565b6001600160a01b039390931683526001600160801b03918216602084015216604082015260600190565b6000602080830181845280855180835260408601915060408482028701019250838701855b82811015615911577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08886030184526158ff858351615792565b945092850192908501906001016158c5565b5092979650505050505050565b901515815260200190565b90815260200190565b6001600160a01b03929092168252602082015260400190565b600293840b81529190920b60208201526001600160801b03909116604082015260600190565b60006020825261150a6020830184615792565b6020808252600c908201527f4e6f7420617070726f7665640000000000000000000000000000000000000000604082015260600190565b6020808252602c908201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860408201527f697374656e7420746f6b656e0000000000000000000000000000000000000000606082015260800190565b60208082526014908201527f507269636520736c69707061676520636865636b000000000000000000000000604082015260600190565b60208082526010908201527f496e76616c696420746f6b656e20494400000000000000000000000000000000604082015260600190565b6020808252600b908201527f4e6f7420636c6561726564000000000000000000000000000000000000000000604082015260600190565b815180516001600160a01b03908116835260208083015182168185015260409283015162ffffff1692840192909252920151909116606082015260800190565b6001600160801b039390931683526020830191909152604082015260600190565b9384526001600160801b039290921660208401526040830152606082015260800190565b918252602082015260400190565b6bffffffffffffffffffffffff8d1681526001600160a01b038c811660208301528b811660408301528a16606082015262ffffff89166080820152600288900b60a08201526101808101615ba760c08301896157be565b615bb460e08301886157c5565b8561010083015284610120830152615bd06101408301856157c5565b615bde6101608301846157c5565b9d9c50505050505050505050505050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112615c23578283fd5b83018035915067ffffffffffffffff821115615c3d578283fd5b602001915036819003821315613cc257600080fd5b60405181810167ffffffffffffffff81118282101715615c6e57fe5b604052919050565b600067ffffffffffffffff821115615c8a57fe5b50601f01601f191660200190565b60005b83811015615cb3578181015183820152602001615c9b565b8381111561286b5750506000910152565b6001600160a01b038116811461506357600080fd5b801515811461506357600080fd5b8060020b811461506357600080fd5b6001600160801b038116811461506357600080fd5b60ff8116811461506357600080fdfe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732315065726d69743a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e7366657220746f20746865207a65726f2061646472657373416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c4552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e456e756d657261626c654d61703a20696e646578206f7574206f6620626f756e64734552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a164736f6c6343000706000a";
var deployedBytecode$1 = "0x6080604052600436106102895760003560e01c80636c0360eb11610153578063addc9699116100cb578063df2ab5bb1161007f578063eff7a11311610064578063eff7a11314610702578063f3995c6714610715578063fc6f7865146107285761030d565b8063df2ab5bb146106cf578063e985e9c5146106e25761030d565b8063c2e3140a116100b0578063c2e3140a14610687578063c45a01551461069a578063c87b56dd146106af5761030d565b8063addc969914610652578063b88d4fde146106675761030d565b806395d89b4111610122578063a22cb46511610107578063a22cb465146105ff578063a4a78f0c1461061f578063ac9650d8146106325761030d565b806395d89b41146105b257806399fbab88146105c75761030d565b80636c0360eb1461054757806370a082311461055c5780637ac2ff7b1461057c578063883164561461058f5761030d565b806323b872dd1161020157806342842e0e116101b55780634659a4941161019a5780634659a494146104f45780634f6ccce7146105075780636352211e146105275761030d565b806342842e0e146104c157806342966c68146104e15761030d565b80632f745c59116101e65780632f745c591461047757806330adf81f146104975780633644e515146104ac5761030d565b806323b872dd146104375780632dac2256146104575761030d565b80630c49ccbe1161025857806318160ddd1161023d57806318160ddd146103eb5780631f9709821461040d578063219f5d17146104155761030d565b80630c49ccbe146103b757806313ead562146103d85761030d565b806301ffc9a71461031257806306fdde0314610348578063081812fc1461036a578063095ea7b3146103975761030d565b3661030d57336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461030b576040805162461bcd60e51b815260206004820152600860248201527f4e6f742057495039000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b005b600080fd5b34801561031e57600080fd5b5061033261032d3660046153a6565b61073b565b60405161033f919061591e565b60405180910390f35b34801561035457600080fd5b5061035d610776565b60405161033f9190615971565b34801561037657600080fd5b5061038a6103853660046156b8565b61080c565b60405161033f91906157e2565b3480156103a357600080fd5b5061030b6103b2366004615270565b610868565b6103ca6103c5366004615483565b61093e565b60405161033f929190615b42565b61038a6103e6366004615103565b610daa565b3480156103f757600080fd5b506104006110b7565b60405161033f9190615929565b61030b6110c8565b610428610423366004615494565b6110da565b60405161033f93929190615afd565b34801561044357600080fd5b5061030b61045236600461515c565b611413565b34801561046357600080fd5b5061030b610472366004615717565b61146a565b34801561048357600080fd5b50610400610492366004615270565b6114e8565b3480156104a357600080fd5b50610400611513565b3480156104b857600080fd5b50610400611537565b3480156104cd57600080fd5b5061030b6104dc36600461515c565b6115f5565b61030b6104ef3660046156b8565b611610565b61030b6105023660046152dc565b6116df565b34801561051357600080fd5b506104006105223660046156b8565b611792565b34801561053357600080fd5b5061038a6105423660046156b8565b6117a8565b34801561055357600080fd5b5061035d6117d0565b34801561056857600080fd5b506104006105773660046150af565b6117d5565b61030b61058a3660046152dc565b61183d565b6105a261059d366004615550565b611ce9565b60405161033f9493929190615b1e565b3480156105be57600080fd5b5061035d61224a565b3480156105d357600080fd5b506105e76105e23660046156b8565b6122ab565b60405161033f9c9b9a99989796959493929190615b50565b34801561060b57600080fd5b5061030b61061a366004615243565b6124da565b61030b61062d3660046152dc565b6125fd565b610645610640366004615337565b6126af565b60405161033f91906158a0565b34801561065e57600080fd5b5061038a6127ef565b34801561067357600080fd5b5061030b61068236600461519c565b612813565b61030b6106953660046152dc565b612871565b3480156106a657600080fd5b5061038a612919565b3480156106bb57600080fd5b5061035d6106ca3660046156b8565b61293d565b61030b6106dd36600461529b565b612a0c565b3480156106ee57600080fd5b506103326106fd3660046150cb565b612aef565b61030b6107103660046156d0565b612b1d565b61030b6107233660046152dc565b612c9d565b6103ca61073636600461546c565b612d28565b7fffffffff00000000000000000000000000000000000000000000000000000000811660009081526020819052604090205460ff165b919050565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108025780601f106107d757610100808354040283529160200191610802565b820191906000526020600020905b8154815290600101906020018083116107e557829003601f168201915b5050505050905090565b600061081782613246565b61083c5760405162461bcd60e51b8152600401610833906159bb565b60405180910390fd5b506000908152600c60205260409020546c0100000000000000000000000090046001600160a01b031690565b6000610873826117a8565b9050806001600160a01b0316836001600160a01b031614156108c65760405162461bcd60e51b8152600401808060200182810382526021815260200180615ee26021913960400191505060405180910390fd5b806001600160a01b03166108d8613253565b6001600160a01b031614806108f457506108f4816106fd613253565b61092f5760405162461bcd60e51b8152600401808060200182810382526038815260200180615e0c6038913960400191505060405180910390fd5b6109398383613257565b505050565b600080823561094d33826132db565b6109695760405162461bcd60e51b815260040161083390615984565b836080013580610977613377565b11156109ca576040805162461bcd60e51b815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b60006109dc6040870160208801615562565b6001600160801b0316116109ef57600080fd5b84356000908152600c602090815260409182902060018101549092600160801b9091046001600160801b031691610a2a918901908901615562565b6001600160801b0316816001600160801b03161015610a4857600080fd5b60018281015469ffffffffffffffffffff166000908152600b60209081526040808320815160608101835281546001600160a01b039081168252919095015490811692850192909252600160a01b90910462ffffff1690830152610acc7f00000000000000000000000000000000000000000000000000000000000000008361337b565b60018501549091506001600160a01b0382169063a34123a7906a01000000000000000000008104600290810b91600160681b9004900b610b1260408e0160208f01615562565b6040518463ffffffff1660e01b8152600401610b309392919061594b565b6040805180830381600087803b158015610b4957600080fd5b505af1158015610b5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b8191906156f4565b909850965060408901358810801590610b9e575088606001358710155b610bba5760405162461bcd60e51b815260040161083390615a18565b6001840154600090610bea9030906a01000000000000000000008104600290810b91600160681b9004900b613477565b9050600080836001600160a01b031663514ea4bf846040518263ffffffff1660e01b8152600401610c1b9190615929565b60a06040518083038186803b158015610c3357600080fd5b505afa158015610c47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c6b91906155ac565b50509250925050610c9087600201548303876001600160801b0316600160801b6134d1565b6004880180546fffffffffffffffffffffffffffffffff198116928e016001600160801b039182160181169290921790556003880154610cda91908303908816600160801b6134d1565b6004880180546001600160801b03808216938e01600160801b9283900482160116029190911790556002870182905560038701819055610d2060408d0160208e01615562565b86038760010160106101000a8154816001600160801b0302191690836001600160801b031602179055508b600001357f26f6a048ee9138f2c0ce266f322cb99228e8d619ae2bff30c67f8dcf9d2377b48d6020016020810190610d839190615562565b8d8d604051610d9493929190615afd565b60405180910390a2505050505050505050915091565b6000836001600160a01b0316856001600160a01b031610610dca57600080fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316631698ee828686866040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018262ffffff168152602001935050505060206040518083038186803b158015610e5557600080fd5b505afa158015610e69573d6000803e3d6000fd5b505050506040513d6020811015610e7f57600080fd5b505190506001600160a01b038116610fce577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a16712958686866040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018262ffffff1681526020019350505050602060405180830381600087803b158015610f1e57600080fd5b505af1158015610f32573d6000803e3d6000fd5b505050506040513d6020811015610f4857600080fd5b5051604080517ff637731d0000000000000000000000000000000000000000000000000000000081526001600160a01b03858116600483015291519293509083169163f637731d9160248082019260009290919082900301818387803b158015610fb157600080fd5b505af1158015610fc5573d6000803e3d6000fd5b505050506110af565b6000816001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e06040518083038186803b15801561100957600080fd5b505afa15801561101d573d6000803e3d6000fd5b505050506040513d60e081101561103357600080fd5b505190506001600160a01b0381166110ad57816001600160a01b031663f637731d846040518263ffffffff1660e01b815260040180826001600160a01b03168152602001915050600060405180830381600087803b15801561109457600080fd5b505af11580156110a8573d6000803e3d6000fd5b505050505b505b949350505050565b60006110c36002613580565b905090565b47156110d8576110d8334761358b565b565b60008060008360a00135806110ed613377565b1115611140576040805162461bcd60e51b815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b84356000908152600c6020908152604080832060018082015469ffffffffffffffffffff81168652600b855283862084516060808201875282546001600160a01b039081168352929094015480831682890190815262ffffff600160a01b9092048216838901908152885161014081018a528451861681529151909416818a01529251168287015230828501526a01000000000000000000008304600290810b810b608080850191909152600160681b909404810b900b60a0830152958c013560c0820152938b013560e0850152908a0135610100840152890135610120830152929061122c90613694565b6001870154939a50919850965091506000906112669030906a01000000000000000000008104600290810b91600160681b9004900b613477565b9050600080836001600160a01b031663514ea4bf846040518263ffffffff1660e01b81526004016112979190615929565b60a06040518083038186803b1580156112af57600080fd5b505afa1580156112c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112e791906155ac565b50509250925050611323866002015483038760010160109054906101000a90046001600160801b03166001600160801b0316600160801b6134d1565b6004870180546001600160801b0380821690930183166fffffffffffffffffffffffffffffffff19909116179055600387015460018801546113739291840391600160801b9182900416906134d1565b6004870180546001600160801b03600160801b80830482169094018116840291811691909117909155600288018490556003880183905560018801805483810483168e018316909302929091169190911790556040518b35907f3067048beee31b25b2f1681f88dac838c8bba36af25bfb2b7cf7473a5847e35f906113fd908d908d908d90615afd565b60405180910390a2505050505050509193909250565b61142461141e613253565b826132db565b61145f5760405162461bcd60e51b8152600401808060200182810382526031815260200180615f036031913960400191505060405180910390fd5b6109398383836138cf565b6000611478828401846154a5565b90506114a87f00000000000000000000000000000000000000000000000000000000000000008260000151613a1b565b5084156114c35780515160208201516114c391903388613a3e565b83156114e1576114e181600001516020015182602001513387613a3e565b5050505050565b6001600160a01b038216600090815260016020526040812061150a9083613bce565b90505b92915050565b7f49ecf333e5b8c95c40fdafc95c1ad136e8914a8fb55e9dc8bb01eaa83a2df9ad81565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000006115a4613bda565b3060405160200180868152602001858152602001848152602001838152602001826001600160a01b031681526020019550505050505060405160208183030381529060405280519060200120905090565b61093983838360405180602001604052806000815250612813565b8061161b33826132db565b6116375760405162461bcd60e51b815260040161083390615984565b6000828152600c602052604090206001810154600160801b90046001600160801b0316158015611672575060048101546001600160801b0316155b801561169057506004810154600160801b90046001600160801b0316155b6116ac5760405162461bcd60e51b815260040161083390615a86565b6000838152600c602052604081208181556001810182905560028101829055600381018290556004015561093983613bde565b604080517f8fcbaf0c00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101879052606481018690526001608482015260ff851660a482015260c4810184905260e4810183905290516001600160a01b03881691638fcbaf0c9161010480830192600092919082900301818387803b15801561177257600080fd5b505af1158015611786573d6000803e3d6000fd5b50505050505050505050565b6000806117a0600284613cab565b509392505050565b600061150d82604051806060016040528060298152602001615e6e6029913960029190613cc9565b606090565b60006001600160a01b03821661181c5760405162461bcd60e51b815260040180806020018281038252602a815260200180615e44602a913960400191505060405180910390fd5b6001600160a01b038216600090815260016020526040902061150d90613580565b83611846613377565b1115611899576040805162461bcd60e51b815260206004820152600e60248201527f5065726d69742065787069726564000000000000000000000000000000000000604482015290519081900360640190fd5b60006118a3611537565b7f49ecf333e5b8c95c40fdafc95c1ad136e8914a8fb55e9dc8bb01eaa83a2df9ad88886118cf81613cd6565b604080516020808201969096526001600160a01b03909416848201526060840192909252608083015260a08083018a90528151808403909101815260c0830182528051908401207f190100000000000000000000000000000000000000000000000000000000000060e084015260e283019490945261010280830194909452805180830390940184526101229091019052815191012090506000611972876117a8565b9050806001600160a01b0316886001600160a01b031614156119c55760405162461bcd60e51b8152600401808060200182810382526027815260200180615d6f6027913960400191505060405180910390fd5b6119ce81613d15565b15611ba9576040805160208082018790528183018690527fff0000000000000000000000000000000000000000000000000000000000000060f889901b16606083015282516041818403018152606183018085527f1626ba7e0000000000000000000000000000000000000000000000000000000090526065830186815260858401948552815160a585015281516001600160a01b03871695631626ba7e958995919260c59091019185019080838360005b83811015611a98578181015183820152602001611a80565b50505050905090810190601f168015611ac55780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b158015611ae357600080fd5b505afa158015611af7573d6000803e3d6000fd5b505050506040513d6020811015611b0d57600080fd5b50517fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e0000000000000000000000000000000000000000000000000000000014611ba4576040805162461bcd60e51b815260206004820152600c60248201527f556e617574686f72697a65640000000000000000000000000000000000000000604482015290519081900360640190fd5b611cd5565b600060018387878760405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015611c05573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611c6d576040805162461bcd60e51b815260206004820152601160248201527f496e76616c6964207369676e6174757265000000000000000000000000000000604482015290519081900360640190fd5b816001600160a01b0316816001600160a01b031614611cd3576040805162461bcd60e51b815260206004820152600c60248201527f556e617574686f72697a65640000000000000000000000000000000000000000604482015290519081900360640190fd5b505b611cdf8888613257565b5050505050505050565b60008060008084610140013580611cfe613377565b1115611d51576040805162461bcd60e51b815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b604080516101408101909152600090611e1d9080611d7260208b018b6150af565b6001600160a01b03168152602001896020016020810190611d9391906150af565b6001600160a01b03168152602001611db160608b0160408c0161569e565b62ffffff168152306020820152604001611dd160808b0160608c016153e6565b60020b8152602001611de960a08b0160808c016153e6565b60020b81526020018960a0013581526020018960c0013581526020018960e001358152602001896101000135815250613694565b92975090955093509050611e91611e3c61014089016101208a016150af565b600d80547fffffffffffffffffffff000000000000000000000000000000000000000000008116600175ffffffffffffffffffffffffffffffffffffffffffff92831690810190921617909155975087613d1b565b6000611ebc30611ea760808b0160608c016153e6565b611eb760a08c0160808d016153e6565b613477565b9050600080836001600160a01b031663514ea4bf846040518263ffffffff1660e01b8152600401611eed9190615929565b60a06040518083038186803b158015611f0557600080fd5b505afa158015611f19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f3d91906155ac565b505092509250506000611fb68560405180606001604052808e6000016020810190611f6891906150af565b6001600160a01b031681526020018e6020016020810190611f8991906150af565b6001600160a01b031681526020018e6040016020810190611faa919061569e565b62ffffff169052613e49565b905060405180610140016040528060006bffffffffffffffffffffffff16815260200160006001600160a01b031681526020018269ffffffffffffffffffff1681526020018c606001602081019061200e91906153e6565b60020b815260200161202660a08e0160808f016153e6565b60020b81526020018a6001600160801b0316815260200184815260200183815260200160006001600160801b0316815260200160006001600160801b0316815250600c60008c815260200190815260200160002060008201518160000160006101000a8154816bffffffffffffffffffffffff02191690836bffffffffffffffffffffffff160217905550602082015181600001600c6101000a8154816001600160a01b0302191690836001600160a01b0316021790555060408201518160010160006101000a81548169ffffffffffffffffffff021916908369ffffffffffffffffffff160217905550606082015181600101600a6101000a81548162ffffff021916908360020b62ffffff160217905550608082015181600101600d6101000a81548162ffffff021916908360020b62ffffff16021790555060a08201518160010160106101000a8154816001600160801b0302191690836001600160801b0316021790555060c0820151816002015560e082015181600301556101008201518160040160006101000a8154816001600160801b0302191690836001600160801b031602179055506101208201518160040160106101000a8154816001600160801b0302191690836001600160801b03160217905550905050897f3067048beee31b25b2f1681f88dac838c8bba36af25bfb2b7cf7473a5847e35f8a8a8a60405161223593929190615afd565b60405180910390a25050505050509193509193565b60078054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108025780601f106107d757610100808354040283529160200191610802565b6000818152600c6020908152604080832081516101408101835281546bffffffffffffffffffffffff811682526001600160a01b036c010000000000000000000000009091041693810193909352600181015469ffffffffffffffffffff81169284018390526a01000000000000000000008104600290810b810b810b6060860152600160681b8204810b810b810b60808601526001600160801b03600160801b92839004811660a08701529083015460c0860152600383015460e0860152600490920154808316610100860152041661012083015282918291829182918291829182918291829182918291906123b45760405162461bcd60e51b815260040161083390615a4f565b6000600b6000836040015169ffffffffffffffffffff1669ffffffffffffffffffff1681526020019081526020016000206040518060600160405290816000820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b031681526020016001820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b031681526020016001820160149054906101000a900462ffffff1662ffffff1662ffffff1681525050905081600001518260200151826000015183602001518460400151866060015187608001518860a001518960c001518a60e001518b61010001518c61012001519d509d509d509d509d509d509d509d509d509d509d509d50505091939597999b5091939597999b565b6124e2613253565b6001600160a01b0316826001600160a01b03161415612548576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b8060056000612555613253565b6001600160a01b0390811682526020808301939093526040918201600090812091871680825291909352912080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016921515929092179091556125b7613253565b6001600160a01b03167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b604080517fdd62ed3e0000000000000000000000000000000000000000000000000000000081523360048201523060248201529051600019916001600160a01b0389169163dd62ed3e91604480820192602092909190829003018186803b15801561266757600080fd5b505afa15801561267b573d6000803e3d6000fd5b505050506040513d602081101561269157600080fd5b505110156126a7576126a78686868686866116df565b505050505050565b60608167ffffffffffffffff811180156126c857600080fd5b506040519080825280602002602001820160405280156126fc57816020015b60608152602001906001900390816126e75790505b50905060005b828110156127e8576000803086868581811061271a57fe5b905060200281019061272c9190615bef565b60405161273a9291906157d2565b600060405180830381855af49150503d8060008114612775576040519150601f19603f3d011682016040523d82523d6000602084013e61277a565b606091505b5091509150816127c65760448151101561279357600080fd5b600481019050808060200190518101906127ad9190615402565b60405162461bcd60e51b81526004016108339190615971565b808484815181106127d357fe5b60209081029190910101525050600101612702565b5092915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b61282461281e613253565b836132db565b61285f5760405162461bcd60e51b8152600401808060200182810382526031815260200180615f036031913960400191505060405180910390fd5b61286b84848484613f99565b50505050565b604080517fdd62ed3e000000000000000000000000000000000000000000000000000000008152336004820152306024820152905186916001600160a01b0389169163dd62ed3e91604480820192602092909190829003018186803b1580156128d957600080fd5b505afa1580156128ed573d6000803e3d6000fd5b505050506040513d602081101561290357600080fd5b505110156126a7576126a7868686868686612c9d565b7f000000000000000000000000000000000000000000000000000000000000000081565b606061294882613246565b61295157600080fd5b6040517fe9dc63750000000000000000000000000000000000000000000000000000000081526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063e9dc6375906129b89030908690600401615932565b60006040518083038186803b1580156129d057600080fd5b505afa1580156129e4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261150d9190810190615402565b6000836001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015612a5b57600080fd5b505afa158015612a6f573d6000803e3d6000fd5b505050506040513d6020811015612a8557600080fd5b5051905082811015612ade576040805162461bcd60e51b815260206004820152601260248201527f496e73756666696369656e7420746f6b656e0000000000000000000000000000604482015290519081900360640190fd5b801561286b5761286b848383613feb565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015612b8c57600080fd5b505afa158015612ba0573d6000803e3d6000fd5b505050506040513d6020811015612bb657600080fd5b5051905082811015612c0f576040805162461bcd60e51b815260206004820152601160248201527f496e73756666696369656e742057495039000000000000000000000000000000604482015290519081900360640190fd5b8015610939577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316632e1a7d4d826040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b158015612c7b57600080fd5b505af1158015612c8f573d6000803e3d6000fd5b50505050610939828261358b565b604080517fd505accf000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018790526064810186905260ff8516608482015260a4810184905260c4810183905290516001600160a01b0388169163d505accf9160e480830192600092919082900301818387803b15801561177257600080fd5b6000808235612d3733826132db565b612d535760405162461bcd60e51b815260040161083390615984565b6000612d656060860160408701615562565b6001600160801b03161180612d9257506000612d876080860160608701615562565b6001600160801b0316115b612d9b57600080fd5b600080612dae60408701602088016150af565b6001600160a01b031614612dd157612dcc60408601602087016150af565b612dd3565b305b85356000908152600c6020908152604080832060018082015469ffffffffffffffffffff168552600b8452828520835160608101855281546001600160a01b039081168252919092015490811694820194909452600160a01b90930462ffffff169183019190915292935090612e697f00000000000000000000000000000000000000000000000000000000000000008361337b565b600484015460018501549192506001600160801b0380821692600160801b92839004821692900416156130865760018501546040517fa34123a70000000000000000000000000000000000000000000000000000000081526001600160a01b0385169163a34123a791612f00916a01000000000000000000008104600290810b92600160681b909204900b9060009060040161594b565b6040805180830381600087803b158015612f1957600080fd5b505af1158015612f2d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f5191906156f4565b5050600185015460009081906001600160a01b0386169063514ea4bf90612f969030906a01000000000000000000008104600290810b91600160681b9004900b613477565b6040518263ffffffff1660e01b8152600401612fb29190615929565b60a06040518083038186803b158015612fca57600080fd5b505afa158015612fde573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061300291906155ac565b5050925092505061303e876002015483038860010160109054906101000a90046001600160801b03166001600160801b0316600160801b6134d1565b84019350613077876003015482038860010160109054906101000a90046001600160801b03166001600160801b0316600160801b6134d1565b60028801929092556003870155015b6000806001600160801b0384166130a360608e0160408f01615562565b6001600160801b0316116130c6576130c160608d0160408e01615562565b6130c8565b835b836001600160801b03168d60600160208101906130e59190615562565b6001600160801b0316116131085761310360808e0160608f01615562565b61310a565b835b60018901546040517f4f1eb3d80000000000000000000000000000000000000000000000000000000081529294509092506001600160a01b03871691634f1eb3d89161317d918c916a01000000000000000000008104600290810b92600160681b909204900b9088908890600401615839565b6040805180830381600087803b15801561319657600080fd5b505af11580156131aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131ce919061557e565b6004890180546fffffffffffffffffffffffffffffffff196001600160801b03918216600160801b878a0384160217168689038216179091556040519281169d50169a508c35907f40d0efd1a53d60ecbf40971b9daf7dc90178c3aadc7aab1765632738fa8b8f0190610d94908b9086908690615876565b600061150d60028361417b565b3390565b6000818152600c6020526040902080546bffffffffffffffffffffffff166c010000000000000000000000006001600160a01b0385169081029190911790915581906132a2826117a8565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006132e682613246565b6133215760405162461bcd60e51b815260040180806020018281038252602c815260200180615de0602c913960400191505060405180910390fd5b600061332c836117a8565b9050806001600160a01b0316846001600160a01b031614806133675750836001600160a01b031661335c8461080c565b6001600160a01b0316145b806110af57506110af8185612aef565b4290565b600081602001516001600160a01b031682600001516001600160a01b0316106133a357600080fd5b50805160208083015160409384015184516001600160a01b0394851681850152939091168385015262ffffff166060808401919091528351808403820181526080840185528051908301207fff0000000000000000000000000000000000000000000000000000000000000060a085015294901b6bffffffffffffffffffffffff191660a183015260b58201939093527f5cea2eb9879ca53b37c03e28e630340a0e2b1575e3df2ba4b38a11af3946ac9260d5808301919091528251808303909101815260f5909101909152805191012090565b604080516bffffffffffffffffffffffff19606086901b16602080830191909152600285810b60e890811b60348501529085900b901b60378301528251601a818403018152603a90920190925280519101205b9392505050565b600080806000198587098686029250828110908390030390508061350757600084116134fc57600080fd5b5082900490506134ca565b80841161351357600080fd5b6000848688096000868103871696879004966002600389028118808a02820302808a02820302808a02820302808a02820302808a02820302808a02909103029181900381900460010186841190950394909402919094039290920491909117919091029150509392505050565b600061150d82614187565b604080516000808252602082019092526001600160a01b0384169083906040518082805190602001908083835b602083106135d75780518252601f1990920191602091820191016135b8565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114613639576040519150601f19603f3d011682016040523d82523d6000602084013e61363e565b606091505b5050905080610939576040805162461bcd60e51b815260206004820152600360248201527f5354450000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000806000806000604051806060016040528087600001516001600160a01b0316815260200187602001516001600160a01b03168152602001876040015162ffffff1681525090506137067f00000000000000000000000000000000000000000000000000000000000000008261337b565b91506000826001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e06040518083038186803b15801561374357600080fd5b505afa158015613757573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061377b919061560d565b50505050505090506000613792886080015161418b565b905060006137a38960a0015161418b565b90506137ba8383838c60c001518d60e001516144d9565b9750505050816001600160a01b0316633c8a7d8d876060015188608001518960a00151896040518060400160405280888152602001336001600160a01b031681525060405160200161380c9190615abd565b6040516020818303038152906040526040518663ffffffff1660e01b815260040161383b9594939291906157f6565b6040805180830381600087803b15801561385457600080fd5b505af1158015613868573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061388c91906156f4565b610100880151919550935084108015906138ab57508561012001518310155b6138c75760405162461bcd60e51b815260040161083390615a18565b509193509193565b826001600160a01b03166138e2826117a8565b6001600160a01b0316146139275760405162461bcd60e51b8152600401808060200182810382526029815260200180615eb96029913960400191505060405180910390fd5b6001600160a01b03821661396c5760405162461bcd60e51b8152600401808060200182810382526024815260200180615d966024913960400191505060405180910390fd5b613977838383610939565b613982600082613257565b6001600160a01b03831660009081526001602052604090206139a4908261459d565b506001600160a01b03821660009081526001602052604090206139c790826145a9565b506139d4600282846145b5565b5080826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6000613a27838361337b565b9050336001600160a01b0382161461150d57600080fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316846001600160a01b0316148015613a7f5750804710155b15613ba1577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d0e30db0826040518263ffffffff1660e01b81526004016000604051808303818588803b158015613adf57600080fd5b505af1158015613af3573d6000803e3d6000fd5b50505050507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a9059cbb83836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015613b6f57600080fd5b505af1158015613b83573d6000803e3d6000fd5b505050506040513d6020811015613b9957600080fd5b5061286b9050565b6001600160a01b038316301415613bc257613bbd848383613feb565b61286b565b61286b848484846145cb565b600061150a8383614763565b4690565b6000613be9826117a8565b9050613bf781600084610939565b613c02600083613257565b6000828152600860205260409020546002600019610100600184161502019091160415613c40576000828152600860205260408120613c409161501f565b6001600160a01b0381166000908152600160205260409020613c62908361459d565b50613c6e6002836147c7565b5060405182906000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6000808080613cba86866147d3565b909450925050505b9250929050565b60006110af84848461484e565b6000908152600c6020526040902080546bffffffffffffffffffffffff19811660016bffffffffffffffffffffffff9283169081019092161790915590565b3b151590565b6001600160a01b038216613d76576040805162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015290519081900360640190fd5b613d7f81613246565b15613dd1576040805162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015290519081900360640190fd5b613ddd60008383610939565b6001600160a01b0382166000908152600160205260409020613dff90826145a9565b50613e0c600282846145b5565b5060405181906001600160a01b038416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6001600160a01b0382166000908152600a602052604090205469ffffffffffffffffffff168061150d5750600d8054600169ffffffffffffffffffff76010000000000000000000000000000000000000000000080840482168381019092160275ffffffffffffffffffffffffffffffffffffffffffff909316929092179092556001600160a01b038085166000908152600a6020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffff000000000000000000001686179055848352600b825291829020865181549085167fffffffffffffffffffffffff000000000000000000000000000000000000000091821617825591870151950180549287015162ffffff16600160a01b027fffffffffffffffffff000000ffffffffffffffffffffffffffffffffffffffff969094169290911691909117939093161790915592915050565b613fa48484846138cf565b613fb084848484614918565b61286b5760405162461bcd60e51b8152600401808060200182810382526032815260200180615d3d6032913960400191505060405180910390fd5b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251825160009485949389169392918291908083835b602083106140955780518252601f199092019160209182019101614076565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146140f7576040519150601f19603f3d011682016040523d82523d6000602084013e6140fc565b606091505b509150915081801561412a57508051158061412a575080806020019051602081101561412757600080fd5b50515b6114e1576040805162461bcd60e51b815260206004820152600260248201527f5354000000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b600061150a8383614af4565b5490565b60008060008360020b126141a2578260020b6141aa565b8260020b6000035b9050620d89e8811115614204576040805162461bcd60e51b815260206004820152600160248201527f5400000000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b60006001821661421857600160801b61422a565b6ffffcb933bd6fad37aa2d162d1a5940015b70ffffffffffffffffffffffffffffffffff169050600282161561425e576ffff97272373d413259a46990580e213a0260801c5b600482161561427d576ffff2e50f5f656932ef12357cf3c7fdcc0260801c5b600882161561429c576fffe5caca7e10e4e61c3624eaa0941cd00260801c5b60108216156142bb576fffcb9843d60f6159c9db58835c9266440260801c5b60208216156142da576fff973b41fa98c081472e6896dfb254c00260801c5b60408216156142f9576fff2ea16466c96a3843ec78b326b528610260801c5b6080821615614318576ffe5dee046a99a2a811c461f1969c30530260801c5b610100821615614338576ffcbe86c7900a88aedcffc83b479aa3a40260801c5b610200821615614358576ff987a7253ac413176f2b074cf7815e540260801c5b610400821615614378576ff3392b0822b70005940c7a398e4b70f30260801c5b610800821615614398576fe7159475a2c29b7443b29c7fa6e889d90260801c5b6110008216156143b8576fd097f3bdfd2022b8845ad8f792aa58250260801c5b6120008216156143d8576fa9f746462d870fdf8a65dc1f90e061e50260801c5b6140008216156143f8576f70d869a156d2a1b890bb3df62baf32f70260801c5b618000821615614418576f31be135f97d08fd981231505542fcfa60260801c5b62010000821615614439576f09aa508b5b7a84e1c677de54f3e99bc90260801c5b62020000821615614459576e5d6af8dedb81196699c329225ee6040260801c5b62040000821615614478576d2216e584f5fa1ea926041bedfe980260801c5b62080000821615614495576b048a170391f7dc42444e8fa20260801c5b60008460020b13156144b05780600019816144ac57fe5b0490505b6401000000008106156144c45760016144c7565b60005b60ff16602082901c0192505050919050565b6000836001600160a01b0316856001600160a01b031611156144f9579293925b846001600160a01b0316866001600160a01b0316116145245761451d858585614b0c565b9050614594565b836001600160a01b0316866001600160a01b0316101561458657600061454b878686614b0c565b9050600061455a878986614b78565b9050806001600160801b0316826001600160801b03161061457b578061457d565b815b92505050614594565b614591858584614b78565b90505b95945050505050565b600061150a8383614bbe565b600061150a8383614c84565b60006110af84846001600160a01b038516614cce565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd00000000000000000000000000000000000000000000000000000000178152925182516000948594938a169392918291908083835b6020831061467d5780518252601f19909201916020918201910161465e565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146146df576040519150601f19603f3d011682016040523d82523d6000602084013e6146e4565b606091505b5091509150818015614712575080511580614712575080806020019051602081101561470f57600080fd5b50515b6126a7576040805162461bcd60e51b815260206004820152600360248201527f5354460000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b815460009082106147a55760405162461bcd60e51b8152600401808060200182810382526022815260200180615d1b6022913960400191505060405180910390fd5b8260000182815481106147b457fe5b9060005260206000200154905092915050565b600061150a8383614d65565b8154600090819083106148175760405162461bcd60e51b8152600401808060200182810382526022815260200180615e976022913960400191505060405180910390fd5b600084600001848154811061482857fe5b906000526020600020906002020190508060000154816001015492509250509250929050565b600082815260018401602052604081205482816148e95760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156148ae578181015183820152602001614896565b50505050905090810190601f1680156148db5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508460000160018203815481106148fc57fe5b9060005260206000209060020201600101549150509392505050565b600061492c846001600160a01b0316613d15565b614938575060016110af565b6000614a897f150b7a0200000000000000000000000000000000000000000000000000000000614966613253565b88878760405160240180856001600160a01b03168152602001846001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156149cd5781810151838201526020016149b5565b50505050905090810190601f1680156149fa5780820380516001836020036101000a031916815260200191505b5095505050505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051806060016040528060328152602001615d3d603291396001600160a01b0388169190614e39565b90506000818060200190516020811015614aa257600080fd5b50517fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a02000000000000000000000000000000000000000000000000000000001492505050949350505050565b60009081526001919091016020526040902054151590565b6000826001600160a01b0316846001600160a01b03161115614b2c579192915b6000614b58856001600160a01b0316856001600160a01b03166c010000000000000000000000006134d1565b9050614594614b7384838888036001600160a01b03166134d1565b614e48565b6000826001600160a01b0316846001600160a01b03161115614b98579192915b6110af614b73836c010000000000000000000000008787036001600160a01b03166134d1565b60008181526001830160205260408120548015614c7a5783546000198083019190810190600090879083908110614bf157fe5b9060005260206000200154905080876000018481548110614c0e57fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080614c3e57fe5b6001900381819060005260206000200160009055905586600101600087815260200190815260200160002060009055600194505050505061150d565b600091505061150d565b6000614c908383614af4565b614cc65750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561150d565b50600061150d565b600082815260018401602052604081205480614d335750506040805180820182528381526020808201848152865460018181018955600089815284812095516002909302909501918255915190820155865486845281880190925292909120556134ca565b82856000016001830381548110614d4657fe5b90600052602060002090600202016001018190555060009150506134ca565b60008181526001830160205260408120548015614c7a5783546000198083019190810190600090879083908110614d9857fe5b9060005260206000209060020201905080876000018481548110614db857fe5b600091825260208083208454600290930201918255600193840154918401919091558354825289830190526040902090840190558654879080614df757fe5b600082815260208082206002600019909401938402018281556001908101839055929093558881528982019092526040822091909155945061150d9350505050565b60606110af8484600085614e5e565b806001600160801b038116811461077157600080fd5b606082471015614e9f5760405162461bcd60e51b8152600401808060200182810382526026815260200180615dba6026913960400191505060405180910390fd5b614ea885613d15565b614ef9576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600080866001600160a01b031685876040518082805190602001908083835b60208310614f375780518252601f199092019160209182019101614f18565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114614f99576040519150601f19603f3d011682016040523d82523d6000602084013e614f9e565b606091505b5091509150614fae828286614fb9565b979650505050505050565b60608315614fc85750816134ca565b825115614fd85782518084602001fd5b60405162461bcd60e51b81526020600482018181528451602484015284518593919283926044019190850190808383600083156148ae578181015183820152602001614896565b50805460018160011615610100020316600290046000825580601f106150455750615063565b601f0160209004906000526020600020908101906150639190615066565b50565b5b8082111561507b5760008155600101615067565b5090565b803561077181615cc4565b805161ffff8116811461077157600080fd5b803562ffffff8116811461077157600080fd5b6000602082840312156150c0578081fd5b81356134ca81615cc4565b600080604083850312156150dd578081fd5b82356150e881615cc4565b915060208301356150f881615cc4565b809150509250929050565b60008060008060808587031215615118578182fd5b843561512381615cc4565b9350602085013561513381615cc4565b92506151416040860161509c565b9150606085013561515181615cc4565b939692955090935050565b600080600060608486031215615170578081fd5b833561517b81615cc4565b9250602084013561518b81615cc4565b929592945050506040919091013590565b600080600080608085870312156151b1578182fd5b84356151bc81615cc4565b935060208501356151cc81615cc4565b925060408501359150606085013567ffffffffffffffff8111156151ee578182fd5b8501601f810187136151fe578182fd5b803561521161520c82615c76565b615c52565b818152886020838501011115615225578384fd5b81602084016020830137908101602001929092525092959194509250565b60008060408385031215615255578182fd5b823561526081615cc4565b915060208301356150f881615cd9565b60008060408385031215615282578182fd5b823561528d81615cc4565b946020939093013593505050565b6000806000606084860312156152af578081fd5b83356152ba81615cc4565b92506020840135915060408401356152d181615cc4565b809150509250925092565b60008060008060008060c087890312156152f4578384fd5b86356152ff81615cc4565b95506020870135945060408701359350606087013561531d81615d0b565b9598949750929560808101359460a0909101359350915050565b60008060208385031215615349578182fd5b823567ffffffffffffffff80821115615360578384fd5b818501915085601f830112615373578384fd5b813581811115615381578485fd5b8660208083028501011115615394578485fd5b60209290920196919550909350505050565b6000602082840312156153b7578081fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146134ca578182fd5b6000602082840312156153f7578081fd5b81356134ca81615ce7565b600060208284031215615413578081fd5b815167ffffffffffffffff811115615429578182fd5b8201601f81018413615439578182fd5b805161544761520c82615c76565b81815285602083850101111561545b578384fd5b614594826020830160208601615c98565b60006080828403121561547d578081fd5b50919050565b600060a0828403121561547d578081fd5b600060c0828403121561547d578081fd5b600081830360808112156154b7578182fd5b6040516040810167ffffffffffffffff82821081831117156154d557fe5b8160405260608412156154e6578485fd5b60a08301935081841081851117156154fa57fe5b50826040528435925061550c83615cc4565b91825260208401359161551e83615cc4565b8260608301526155306040860161509c565b608083015281526155436060850161507f565b6020820152949350505050565b6000610160828403121561547d578081fd5b600060208284031215615573578081fd5b81356134ca81615cf6565b60008060408385031215615590578182fd5b825161559b81615cf6565b60208401519092506150f881615cf6565b600080600080600060a086880312156155c3578283fd5b85516155ce81615cf6565b80955050602086015193506040860151925060608601516155ee81615cf6565b60808701519092506155ff81615cf6565b809150509295509295909350565b600080600080600080600060e0888a031215615627578485fd5b875161563281615cc4565b602089015190975061564381615ce7565b95506156516040890161508a565b945061565f6060890161508a565b935061566d6080890161508a565b925060a088015161567d81615d0b565b60c089015190925061568e81615cd9565b8091505092959891949750929550565b6000602082840312156156af578081fd5b61150a8261509c565b6000602082840312156156c9578081fd5b5035919050565b600080604083850312156156e2578182fd5b8235915060208301356150f881615cc4565b60008060408385031215615706578182fd5b505080516020909101519092909150565b6000806000806060858703121561572c578182fd5b8435935060208501359250604085013567ffffffffffffffff80821115615751578384fd5b818701915087601f830112615764578384fd5b813581811115615772578485fd5b886020828501011115615783578485fd5b95989497505060200194505050565b600081518084526157aa816020860160208601615c98565b601f01601f19169290920160200192915050565b60020b9052565b6001600160801b03169052565b6000828483379101908152919050565b6001600160a01b0391909116815260200190565b60006001600160a01b03871682528560020b60208301528460020b60408301526001600160801b038416606083015260a06080830152614fae60a0830184615792565b6001600160a01b03959095168552600293840b60208601529190920b60408401526001600160801b03918216606084015216608082015260a00190565b6001600160a01b039390931683526001600160801b03918216602084015216604082015260600190565b6000602080830181845280855180835260408601915060408482028701019250838701855b82811015615911577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08886030184526158ff858351615792565b945092850192908501906001016158c5565b5092979650505050505050565b901515815260200190565b90815260200190565b6001600160a01b03929092168252602082015260400190565b600293840b81529190920b60208201526001600160801b03909116604082015260600190565b60006020825261150a6020830184615792565b6020808252600c908201527f4e6f7420617070726f7665640000000000000000000000000000000000000000604082015260600190565b6020808252602c908201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860408201527f697374656e7420746f6b656e0000000000000000000000000000000000000000606082015260800190565b60208082526014908201527f507269636520736c69707061676520636865636b000000000000000000000000604082015260600190565b60208082526010908201527f496e76616c696420746f6b656e20494400000000000000000000000000000000604082015260600190565b6020808252600b908201527f4e6f7420636c6561726564000000000000000000000000000000000000000000604082015260600190565b815180516001600160a01b03908116835260208083015182168185015260409283015162ffffff1692840192909252920151909116606082015260800190565b6001600160801b039390931683526020830191909152604082015260600190565b9384526001600160801b039290921660208401526040830152606082015260800190565b918252602082015260400190565b6bffffffffffffffffffffffff8d1681526001600160a01b038c811660208301528b811660408301528a16606082015262ffffff89166080820152600288900b60a08201526101808101615ba760c08301896157be565b615bb460e08301886157c5565b8561010083015284610120830152615bd06101408301856157c5565b615bde6101608301846157c5565b9d9c50505050505050505050505050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112615c23578283fd5b83018035915067ffffffffffffffff821115615c3d578283fd5b602001915036819003821315613cc257600080fd5b60405181810167ffffffffffffffff81118282101715615c6e57fe5b604052919050565b600067ffffffffffffffff821115615c8a57fe5b50601f01601f191660200190565b60005b83811015615cb3578181015183820152602001615c9b565b8381111561286b5750506000910152565b6001600160a01b038116811461506357600080fd5b801515811461506357600080fd5b8060020b811461506357600080fd5b6001600160801b038116811461506357600080fd5b60ff8116811461506357600080fdfe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732315065726d69743a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e7366657220746f20746865207a65726f2061646472657373416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c4552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e456e756d657261626c654d61703a20696e646578206f7574206f6620626f756e64734552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a164736f6c6343000706000a";
var linkReferences$1 = {
};
var deployedLinkReferences$1 = {
};
var INonfungiblePositionManager = {
	_format: _format$1,
	contractName: contractName$1,
	sourceName: sourceName$1,
	abi: abi$1,
	bytecode: bytecode$1,
	deployedBytecode: deployedBytecode$1,
	linkReferences: linkReferences$1,
	deployedLinkReferences: deployedLinkReferences$1
};

var _format$2 = "hh-sol-artifact-1";
var contractName$2 = "ISelfPermit";
var sourceName$2 = "contracts/interfaces/ISelfPermit.sol";
var abi$2 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermit",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowed",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowedIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	}
];
var bytecode$2 = "0x";
var deployedBytecode$2 = "0x";
var linkReferences$2 = {
};
var deployedLinkReferences$2 = {
};
var ISelfPermit = {
	_format: _format$2,
	contractName: contractName$2,
	sourceName: sourceName$2,
	abi: abi$2,
	bytecode: bytecode$2,
	deployedBytecode: deployedBytecode$2,
	linkReferences: linkReferences$2,
	deployedLinkReferences: deployedLinkReferences$2
};

function isAllowedPermit(permitOptions) {
  return 'nonce' in permitOptions;
}
var SelfPermit = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SelfPermit() {}
  SelfPermit.encodePermit = function encodePermit(token, options) {
    return isAllowedPermit(options) ? SelfPermit.INTERFACE.encodeFunctionData('selfPermitAllowed', [token.address, toHex(options.nonce), toHex(options.expiry), options.v, options.r, options.s]) : SelfPermit.INTERFACE.encodeFunctionData('selfPermit', [token.address, toHex(options.amount), toHex(options.deadline), options.v, options.r, options.s]);
  };
  return SelfPermit;
}();
SelfPermit.INTERFACE = /*#__PURE__*/new Interface(ISelfPermit.abi);

var _format$3 = "hh-sol-artifact-1";
var contractName$3 = "IPeripheryPaymentsWithFee";
var sourceName$3 = "contracts/interfaces/IPeripheryPaymentsWithFee.sol";
var abi$3 = [
	{
		inputs: [
		],
		name: "refundIP",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "sweepTokenWithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "unwrapWIP9",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "unwrapWIP9WithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	}
];
var bytecode$3 = "0x";
var deployedBytecode$3 = "0x";
var linkReferences$3 = {
};
var deployedLinkReferences$3 = {
};
var IPeripheryPaymentsWithFee = {
	_format: _format$3,
	contractName: contractName$3,
	sourceName: sourceName$3,
	abi: abi$3,
	bytecode: bytecode$3,
	deployedBytecode: deployedBytecode$3,
	linkReferences: linkReferences$3,
	deployedLinkReferences: deployedLinkReferences$3
};

var Payments = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Payments() {}
  Payments.encodeFeeBips = function encodeFeeBips(fee) {
    return toHex(fee.multiply(10000).quotient);
  };
  Payments.encodeUnwrapWIP9 = function encodeUnwrapWIP9(amountMinimum, recipient, feeOptions) {
    recipient = validateAndParseAddress(recipient);
    if (!!feeOptions) {
      var feeBips = this.encodeFeeBips(feeOptions.fee);
      var feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return Payments.INTERFACE.encodeFunctionData('unwrapWIP9WithFee', [toHex(amountMinimum), recipient, feeBips, feeRecipient]);
    } else {
      return Payments.INTERFACE.encodeFunctionData('unwrapWIP9', [toHex(amountMinimum), recipient]);
    }
  };
  Payments.encodeSweepToken = function encodeSweepToken(token, amountMinimum, recipient, feeOptions) {
    recipient = validateAndParseAddress(recipient);
    if (!!feeOptions) {
      var feeBips = this.encodeFeeBips(feeOptions.fee);
      var feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return Payments.INTERFACE.encodeFunctionData('sweepTokenWithFee', [token.address, toHex(amountMinimum), recipient, feeBips, feeRecipient]);
    } else {
      return Payments.INTERFACE.encodeFunctionData('sweepToken', [token.address, toHex(amountMinimum), recipient]);
    }
  };
  Payments.encodeRefundIP = function encodeRefundIP() {
    return Payments.INTERFACE.encodeFunctionData('refundIP');
  };
  return Payments;
}();
Payments.INTERFACE = /*#__PURE__*/new Interface(IPeripheryPaymentsWithFee.abi);

var _excluded = ["expectedCurrencyOwed0", "expectedCurrencyOwed1"];
var MaxUint128 = /*#__PURE__*/toHex(/*#__PURE__*/JSBI.subtract(/*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(128)), /*#__PURE__*/JSBI.BigInt(1)));
// type guard
function isMint(options) {
  return Object.keys(options).some(function (k) {
    return k === 'recipient';
  });
}
var NFT_PERMIT_TYPES = {
  Permit: [{
    name: 'spender',
    type: 'address'
  }, {
    name: 'tokenId',
    type: 'uint256'
  }, {
    name: 'nonce',
    type: 'uint256'
  }, {
    name: 'deadline',
    type: 'uint256'
  }]
};
var NonfungiblePositionManager = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function NonfungiblePositionManager() {}
  NonfungiblePositionManager.encodeCreate = function encodeCreate(pool) {
    return NonfungiblePositionManager.INTERFACE.encodeFunctionData('createAndInitializePoolIfNecessary', [pool.token0.address, pool.token1.address, pool.fee, toHex(pool.sqrtRatioX96)]);
  };
  NonfungiblePositionManager.createCallParameters = function createCallParameters(pool) {
    return {
      calldata: this.encodeCreate(pool),
      value: toHex(0)
    };
  };
  NonfungiblePositionManager.addCallParameters = function addCallParameters(position, options) {
    !JSBI.greaterThan(position.liquidity, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ZERO_LIQUIDITY') : invariant(false) : void 0;
    var calldatas = [];
    // get amounts
    var _position$mintAmounts = position.mintAmounts,
      amount0Desired = _position$mintAmounts.amount0,
      amount1Desired = _position$mintAmounts.amount1;
    // adjust for slippage
    var minimumAmounts = position.mintAmountsWithSlippage(options.slippageTolerance);
    var amount0Min = toHex(minimumAmounts.amount0);
    var amount1Min = toHex(minimumAmounts.amount1);
    var deadline = toHex(options.deadline);
    // create pool if needed
    if (isMint(options) && options.createPool) {
      calldatas.push(this.encodeCreate(position.pool));
    }
    // permits if necessary
    if (options.token0Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token0, options.token0Permit));
    }
    if (options.token1Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token1, options.token1Permit));
    }
    // mint
    if (isMint(options)) {
      var recipient = validateAndParseAddress(options.recipient);
      calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData('mint', [{
        token0: position.pool.token0.address,
        token1: position.pool.token1.address,
        fee: position.pool.fee,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        amount0Desired: toHex(amount0Desired),
        amount1Desired: toHex(amount1Desired),
        amount0Min: amount0Min,
        amount1Min: amount1Min,
        recipient: recipient,
        deadline: deadline
      }]));
    } else {
      // increase
      calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData('increaseLiquidity', [{
        tokenId: toHex(options.tokenId),
        amount0Desired: toHex(amount0Desired),
        amount1Desired: toHex(amount1Desired),
        amount0Min: amount0Min,
        amount1Min: amount1Min,
        deadline: deadline
      }]));
    }
    var value = toHex(0);
    if (options.useNative) {
      var wrapped = options.useNative.wrapped;
      !(position.pool.token0.equals(wrapped) || position.pool.token1.equals(wrapped)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'NO_WIP') : invariant(false) : void 0;
      var wrappedValue = position.pool.token0.equals(wrapped) ? amount0Desired : amount1Desired;
      // we only need to refund if we're actually sending IP
      if (JSBI.greaterThan(wrappedValue, ZERO)) {
        calldatas.push(Payments.encodeRefundIP());
      }
      value = toHex(wrappedValue);
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: value
    };
  };
  NonfungiblePositionManager.encodeCollect = function encodeCollect(options) {
    var calldatas = [];
    var tokenId = toHex(options.tokenId);
    var involvesIP = options.expectedCurrencyOwed0.currency.isNative || options.expectedCurrencyOwed1.currency.isNative;
    var recipient = validateAndParseAddress(options.recipient);
    // collect
    calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData('collect', [{
      tokenId: tokenId,
      recipient: involvesIP ? ADDRESS_ZERO : recipient,
      amount0Max: MaxUint128,
      amount1Max: MaxUint128
    }]));
    if (involvesIP) {
      var IPAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed0.quotient : options.expectedCurrencyOwed1.quotient;
      var token = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.currency : options.expectedCurrencyOwed0.currency;
      var tokenAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.quotient : options.expectedCurrencyOwed0.quotient;
      calldatas.push(Payments.encodeUnwrapWIP9(IPAmount, recipient));
      calldatas.push(Payments.encodeSweepToken(token, tokenAmount, recipient));
    }
    return calldatas;
  };
  NonfungiblePositionManager.collectCallParameters = function collectCallParameters(options) {
    var calldatas = NonfungiblePositionManager.encodeCollect(options);
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  /**
   * Produces the calldata for completely or partially exiting a position
   * @param position The position to exit
   * @param options Additional information necessary for generating the calldata
   * @returns The call parameters
   */;
  NonfungiblePositionManager.removeCallParameters = function removeCallParameters(position, options) {
    var calldatas = [];
    var deadline = toHex(options.deadline);
    var tokenId = toHex(options.tokenId);
    // construct a partial position with a percentage of liquidity
    var partialPosition = new Position({
      pool: position.pool,
      liquidity: options.liquidityPercentage.multiply(position.liquidity).quotient,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper
    });
    !JSBI.greaterThan(partialPosition.liquidity, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ZERO_LIQUIDITY') : invariant(false) : void 0;
    // slippage-adjusted underlying amounts
    var _partialPosition$burn = partialPosition.burnAmountsWithSlippage(options.slippageTolerance),
      amount0Min = _partialPosition$burn.amount0,
      amount1Min = _partialPosition$burn.amount1;
    if (options.permit) {
      calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData('permit', [validateAndParseAddress(options.permit.spender), tokenId, toHex(options.permit.deadline), options.permit.v, options.permit.r, options.permit.s]));
    }
    // remove liquidity
    calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData('decreaseLiquidity', [{
      tokenId: tokenId,
      liquidity: toHex(partialPosition.liquidity),
      amount0Min: toHex(amount0Min),
      amount1Min: toHex(amount1Min),
      deadline: deadline
    }]));
    var _options$collectOptio = options.collectOptions,
      expectedCurrencyOwed0 = _options$collectOptio.expectedCurrencyOwed0,
      expectedCurrencyOwed1 = _options$collectOptio.expectedCurrencyOwed1,
      rest = _objectWithoutPropertiesLoose(_options$collectOptio, _excluded);
    calldatas.push.apply(calldatas, NonfungiblePositionManager.encodeCollect(_extends({
      tokenId: toHex(options.tokenId),
      // add the underlying value to the expected currency already owed
      expectedCurrencyOwed0: expectedCurrencyOwed0.add(CurrencyAmount.fromRawAmount(expectedCurrencyOwed0.currency, amount0Min)),
      expectedCurrencyOwed1: expectedCurrencyOwed1.add(CurrencyAmount.fromRawAmount(expectedCurrencyOwed1.currency, amount1Min))
    }, rest)));
    if (options.liquidityPercentage.equalTo(ONE)) {
      if (options.burnToken) {
        calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData('burn', [tokenId]));
      }
    } else {
      !(options.burnToken !== true) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CANNOT_BURN') : invariant(false) : void 0;
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  };
  NonfungiblePositionManager.safeTransferFromParameters = function safeTransferFromParameters(options) {
    var recipient = validateAndParseAddress(options.recipient);
    var sender = validateAndParseAddress(options.sender);
    var calldata;
    if (options.data) {
      calldata = NonfungiblePositionManager.INTERFACE.encodeFunctionData('safeTransferFrom(address,address,uint256,bytes)', [sender, recipient, toHex(options.tokenId), options.data]);
    } else {
      calldata = NonfungiblePositionManager.INTERFACE.encodeFunctionData('safeTransferFrom(address,address,uint256)', [sender, recipient, toHex(options.tokenId)]);
    }
    return {
      calldata: calldata,
      value: toHex(0)
    };
  }
  // Prepare the params for an EIP712 signTypedData request
  ;
  NonfungiblePositionManager.getPermitData = function getPermitData(permit, positionManagerAddress, chainId) {
    return {
      domain: {
        name: 'StoryHunt V3 Positions NFT-V1',
        chainId: chainId,
        version: '1',
        verifyingContract: positionManagerAddress
      },
      types: NFT_PERMIT_TYPES,
      values: permit
    };
  };
  return NonfungiblePositionManager;
}();
NonfungiblePositionManager.INTERFACE = /*#__PURE__*/new Interface(INonfungiblePositionManager.abi);

var _format$4 = "hh-sol-artifact-1";
var contractName$4 = "AlphaHunterV3";
var sourceName$4 = "contracts/AlphaHunterV3.sol";
var abi$4 = [
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_rewardTokens",
				type: "address[]"
			},
			{
				internalType: "contract INonfungiblePositionManager",
				name: "_nonfungiblePositionManager",
				type: "address"
			},
			{
				internalType: "address",
				name: "_WIP",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			}
		],
		name: "DuplicatedPool",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InconsistentAmount",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InsufficientAmount",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidNFT",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidPeriodDuration",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidPid",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NoBalance",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NoLMPool",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NoLiquidity",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NotEmpty",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NotOwner",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NotOwnerOrOperator",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NotStoryHuntNFT",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "RewardPeriodNotEnded",
		type: "error"
	},
	{
		inputs: [
		],
		name: "TooManyRewardTokens",
		type: "error"
	},
	{
		inputs: [
		],
		name: "WrongReceiver",
		type: "error"
	},
	{
		inputs: [
		],
		name: "ZeroAddress",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "allocPoint",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "contract IStoryHuntV3Pool",
				name: "v3Pool",
				type: "address"
			},
			{
				indexed: true,
				internalType: "contract ILMPool",
				name: "lmPool",
				type: "address"
			}
		],
		name: "AddPool",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "int24",
				name: "tickLower",
				type: "int24"
			},
			{
				indexed: false,
				internalType: "int24",
				name: "tickUpper",
				type: "int24"
			}
		],
		name: "Deposit",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "reward",
				type: "uint256"
			}
		],
		name: "Harvest",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "deployer",
				type: "address"
			}
		],
		name: "NewLMPoolDeployerAddress",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "NewOperatorAddress",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "periodDuration",
				type: "uint256"
			}
		],
		name: "NewPeriodDuration",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "receiver",
				type: "address"
			}
		],
		name: "NewReceiver",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "periodNumber",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "startTime",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "endTime",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "huntPerSecond",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "huntAmount",
				type: "uint256"
			}
		],
		name: "NewUpkeepPeriod",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferStarted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address[]",
				name: "tokens",
				type: "address[]"
			}
		],
		name: "RewardTokensAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "emergency",
				type: "bool"
			}
		],
		name: "SetEmergency",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "allocPoint",
				type: "uint256"
			}
		],
		name: "SetPool",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "farmBoostContract",
				type: "address"
			}
		],
		name: "UpdateFarmBoostContract",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "int128",
				name: "liquidity",
				type: "int128"
			},
			{
				indexed: false,
				internalType: "int24",
				name: "tickLower",
				type: "int24"
			},
			{
				indexed: false,
				internalType: "int24",
				name: "tickUpper",
				type: "int24"
			}
		],
		name: "UpdateLiquidity",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "periodNumber",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "oldEndTime",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newEndTime",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "remainingHunt",
				type: "uint256"
			}
		],
		name: "UpdateUpkeepPeriod",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Withdraw",
		type: "event"
	},
	{
		inputs: [
		],
		name: "BOOST_PRECISION",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "FARM_BOOSTER",
		outputs: [
			{
				internalType: "contract IFarmBooster",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "LMPoolDeployer",
		outputs: [
			{
				internalType: "contract ILMPoolDeployer",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "MAX_BOOST_PRECISION",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "MAX_DURATION",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "MAX_REWARD_TOKENS",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "MIN_DURATION",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "PERIOD_DURATION",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "PRECISION",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "WIP",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "acceptOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_allocPoint",
				type: "uint256"
			},
			{
				internalType: "contract IStoryHuntV3Pool",
				name: "_v3Pool",
				type: "address"
			},
			{
				internalType: "bool",
				name: "_withUpdate",
				type: "bool"
			}
		],
		name: "add",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256"
			}
		],
		name: "burn",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint128",
						name: "amount0Max",
						type: "uint128"
					},
					{
						internalType: "uint128",
						name: "amount1Max",
						type: "uint128"
					}
				],
				internalType: "struct INonfungiblePositionManagerStruct.CollectParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "collect",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint128",
						name: "amount0Max",
						type: "uint128"
					},
					{
						internalType: "uint128",
						name: "amount1Max",
						type: "uint128"
					}
				],
				internalType: "struct INonfungiblePositionManagerStruct.CollectParams",
				name: "params",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "collectTo",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "uint128",
						name: "liquidity",
						type: "uint128"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct INonfungiblePositionManagerStruct.DecreaseLiquidityParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "decreaseLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "emergency",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address"
			},
			{
				internalType: "address",
				name: "_v3Pool",
				type: "address"
			}
		],
		name: "getLatestPeriodInfo",
		outputs: [
			{
				internalType: "uint256",
				name: "rewardPerSecond",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "endTime",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			}
		],
		name: "getLatestPeriodInfoByPid",
		outputs: [
			{
				internalType: "uint256",
				name: "rewardPerSecond",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "endTime",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getRewardTokens",
		outputs: [
			{
				internalType: "address[]",
				name: "tokens",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			}
		],
		name: "harvest",
		outputs: [
			{
				internalType: "uint256",
				name: "reward",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct INonfungiblePositionManagerStruct.IncreaseLiquidityParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "increaseLiquidity",
		outputs: [
			{
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "nonfungiblePositionManager",
		outputs: [
			{
				internalType: "contract INonfungiblePositionManager",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "_from",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC721Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "operatorAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "pendingOwner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256"
			}
		],
		name: "pendingReward",
		outputs: [
			{
				internalType: "uint256",
				name: "reward",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "poolInfo",
		outputs: [
			{
				internalType: "contract IStoryHuntV3Pool",
				name: "v3Pool",
				type: "address"
			},
			{
				internalType: "address",
				name: "token0",
				type: "address"
			},
			{
				internalType: "address",
				name: "token1",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "uint256",
				name: "totalLiquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "totalBoostLiquidity",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "poolLength",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "receiver",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "rewardInfos",
		outputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "totalAllocPoint",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "rewardAmountBelongToMC",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "latestPeriodNumber",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "latestPeriodStartTime",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "latestPeriodEndTime",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "latestPeriodRewardPerSecond",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "rewardTokens",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_allocPoint",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "_withUpdate",
				type: "bool"
			}
		],
		name: "set",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "_emergency",
				type: "bool"
			}
		],
		name: "setEmergency",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "contract ILMPoolDeployer",
				name: "_LMPoolDeployer",
				type: "address"
			}
		],
		name: "setLMPoolDeployer",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_operatorAddress",
				type: "address"
			}
		],
		name: "setOperator",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_periodDuration",
				type: "uint256"
			}
		],
		name: "setPeriodDuration",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_receiver",
				type: "address"
			}
		],
		name: "setReceiver",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_tokens",
				type: "address[]"
			}
		],
		name: "setRewardTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "tokenOfOwnerByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "unwrapWIP9",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_newMultiplier",
				type: "uint256"
			}
		],
		name: "updateBoostMultiplier",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newFarmBoostContract",
				type: "address"
			}
		],
		name: "updateFarmBoostContract",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256"
			}
		],
		name: "updateLiquidity",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256[]",
				name: "pids",
				type: "uint256[]"
			}
		],
		name: "updatePools",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_duration",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "_withUpdate",
				type: "bool"
			}
		],
		name: "upkeep",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "userPositionInfos",
		outputs: [
			{
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				internalType: "uint128",
				name: "boostLiquidity",
				type: "uint128"
			},
			{
				internalType: "int24",
				name: "tickLower",
				type: "int24"
			},
			{
				internalType: "int24",
				name: "tickUpper",
				type: "int24"
			},
			{
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "boostMultiplier",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "userPositionRewards",
		outputs: [
			{
				internalType: "uint256",
				name: "rewardGrowthInside",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reward",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "v3PoolAddressPid",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			}
		],
		name: "withdraw",
		outputs: [
			{
				internalType: "uint256",
				name: "reward",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
];
var bytecode$4 = "0x60c0604052620151806013553480156200001857600080fd5b506040516200644b3803806200644b8339810160408190526200003b916200025d565b62000046336200012f565b60016002556001600160a01b0380831660a052811660805282516200007390600e906020860190620001a9565b5060005b600e548110156200012557600e818154811062000098576200009862000355565b9060005260206000200160009054906101000a90046001600160a01b0316600d6000600e8481548110620000d057620000d062000355565b6000918252602080832091909101546001600160a01b039081168452908301939093526040909101902080546001600160a01b03191692909116919091179055806200011c816200036b565b91505062000077565b5050505062000395565b600180546001600160a01b0319169055620001568162000159602090811b62003e6417901c565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b82805482825590600052602060002090810192821562000201579160200282015b828111156200020157825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190620001ca565b506200020f92915062000213565b5090565b5b808211156200020f576000815560010162000214565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b03811681146200025857600080fd5b919050565b6000806000606084860312156200027357600080fd5b83516001600160401b03808211156200028b57600080fd5b818601915086601f830112620002a057600080fd5b8151602082821115620002b757620002b76200022a565b8160051b604051601f19603f83011681018181108682111715620002df57620002df6200022a565b60405292835281830193508481018201928a841115620002fe57600080fd5b948201945b838610156200032757620003178662000240565b8552948201949382019362000303565b975062000338905088820162000240565b9550505050506200034c6040850162000240565b90509250925092565b634e487b7160e01b600052603260045260246000fd5b60006000198214156200038e57634e487b7160e01b600052601160045260246000fd5b5060010190565b60805160a051615fe8620004636000396000818161037e01528181610acb015281816110c7015281816114fd0152818161169f015281816117a50152818161182f01528181611e9b01528181611f2101528181611f6501528181611feb015281816125be0152818161291201528181613de5015281816144840152614d7d0152600081816103b201528181610a27015281816124f501528181612531015281816138510152818161390301528181614ab701528181614b0501528181614cbc0152614d370152615fe86000f3fe60806040526004361061036e5760003560e01c806379ba5097116101c6578063caa6fea4116100f7578063eff7a11311610095578063f54ac2461161006f578063f54ac24614610c75578063f7260d3e14610c95578063fbc911d014610cb5578063fc6f786514610cd557600080fd5b8063eff7a11314610c15578063f2fde38b14610c35578063f430cf0d14610c5557600080fd5b8063cf242849116100d1578063cf24284914610b97578063cfb8ccfb14610bb7578063df2ab5bb14610bd7578063e30c397814610bf757600080fd5b8063caa6fea414610b46578063cc6db2da14610a49578063ced0911214610b7757600080fd5b8063ac9650d811610164578063b44a27221161013e578063b44a272214610ab9578063b4ce128014610aed578063b6a6d17714610b0d578063c4f59f9b14610b2457600080fd5b8063ac9650d814610a62578063b1724b4614610a82578063b3ab15fb14610a9957600080fd5b80637c2d6e01116101a05780637c2d6e01146109d75780638da5cb5b146109f75780639ba879cf14610a15578063aaf5eb6814610a4957600080fd5b806379ba5097146109825780637bb21b46146109975780637bb7bed1146109b757600080fd5b8063233a48a2116102a05780636558954f1161023e57806369b021281161021857806369b021281461091357806370a082311461092d578063715018a61461094d578063718da7ee1461096257600080fd5b80636558954f146108bd57806369746a1d146108d3578063699233c3146108f357600080fd5b806342966c681161027a57806342966c681461084857806344780994146108685780635d0cde971461088857806364482f791461089d57600080fd5b8063233a48a2146106c15780632f745c59146107625780633b1acf741461078257600080fd5b80630d55f9131161030d5780631526fe27116102e75780631526fe27146105a15780631eaaa04514610649578063201e81a814610669578063219f5d171461068957600080fd5b80630d55f91314610510578063127effb214610530578063150b7a021461056857600080fd5b8063070f3c0711610349578063070f3c071461048d5780630743384d146104ad578063081e3eda146104da5780630c49ccbe146104f057600080fd5b8062f714ce146103e65780630327ae47146104195780630501d5561461046d57600080fd5b366103e157336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148015906103d55750336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614155b156103df57600080fd5b005b600080fd5b3480156103f257600080fd5b50610406610401366004615431565b610cf5565b6040519081526020015b60405180910390f35b34801561042557600080fd5b50610458610434366004615431565b600a6020908152600092835260408084209091529082529020805460019091015482565b60408051928352602083019190915201610410565b34801561047957600080fd5b506103df61048836600461546f565b611179565b34801561049957600080fd5b506103df6104a836600461548c565b6111ee565b3480156104b957600080fd5b506104066104c83660046154d6565b600c6020526000908152604090205481565b3480156104e657600080fd5b5061040660065481565b3480156104fc57600080fd5b5061045861050b36600461554f565b611467565b34801561051c57600080fd5b5061045861052b366004615648565b6115ec565b34801561053c57600080fd5b50601254610550906001600160a01b031681565b6040516001600160a01b039091168152602001610410565b34801561057457600080fd5b50610588610583366004615675565b611790565b6040516001600160e01b03199091168152602001610410565b3480156105ad57600080fd5b506106066105bc366004615714565b600760205260009081526040902080546001820154600283015460038401546004909401546001600160a01b039384169492841693821692600160a01b90920462ffffff16919086565b604080516001600160a01b0397881681529587166020870152939095169284019290925262ffffff166060830152608082015260a081019190915260c001610410565b34801561065557600080fd5b506103df61066436600461572d565b611c39565b34801561067557600080fd5b506103df61068436600461576f565b612238565b61069c610697366004615821565b61245c565b604080516001600160801b039094168452602084019290925290820152606001610410565b3480156106cd57600080fd5b506107236106dc3660046154d6565b600d6020526000908152604090208054600182015460028301546003840154600485015460058601546006909601546001600160a01b039095169593949293919290919087565b604080516001600160a01b0390981688526020880196909652948601939093526060850191909152608084015260a083015260c082015260e001610410565b34801561076e57600080fd5b5061040661077d36600461589b565b61271d565b34801561078e57600080fd5b506107f761079d366004615714565b6009602052600090815260409020805460018201546002808401546003909401546001600160801b0380851695600160801b909504169383830b936301000000810490930b92600160301b90046001600160a01b03169187565b604080516001600160801b039889168152979096166020880152600294850b958701959095529190920b60608501526001600160a01b03909116608084015260a083015260c082015260e001610410565b34801561085457600080fd5b506103df610863366004615714565b6127bb565b34801561087457600080fd5b506103df61088336600461590c565b6129c1565b34801561089457600080fd5b50610406600381565b3480156108a957600080fd5b506103df6108b836600461594e565b612b47565b3480156108c957600080fd5b5061040660135481565b3480156108df57600080fd5b506103df6108ee36600461597c565b612e1f565b3480156108ff57600080fd5b5061045861090e36600461589b565b612f0d565b34801561091f57600080fd5b506104066501d1a94a200081565b34801561093957600080fd5b506104066109483660046154d6565b612fa7565b34801561095957600080fd5b506103df613041565b34801561096e57600080fd5b506103df61097d3660046154d6565b613055565b34801561098e57600080fd5b506103df61318f565b3480156109a357600080fd5b506104586109b236600461599e565b613206565b3480156109c357600080fd5b506105506109d2366004615714565b61327c565b3480156109e357600080fd5b506103df6109f2366004615714565b6132a6565b348015610a0357600080fd5b506000546001600160a01b0316610550565b348015610a2157600080fd5b506105507f000000000000000000000000000000000000000000000000000000000000000081565b348015610a5557600080fd5b5061040664e8d4a5100081565b610a75610a7036600461590c565b613314565b6040516104109190615a24565b348015610a8e57600080fd5b5061040662278d0081565b348015610aa557600080fd5b506103df610ab43660046154d6565b61346c565b348015610ac557600080fd5b506105507f000000000000000000000000000000000000000000000000000000000000000081565b348015610af957600080fd5b50601054610550906001600160a01b031681565b348015610b1957600080fd5b506104066201518081565b348015610b3057600080fd5b50610b396134e9565b6040516104109190615a86565b348015610b5257600080fd5b50601154610b6790600160a01b900460ff1681565b6040519015158152602001610410565b348015610b8357600080fd5b506103df610b92366004615714565b61354b565b348015610ba357600080fd5b506103df610bb23660046154d6565b6135ee565b348015610bc357600080fd5b506103df610bd23660046154d6565b61366b565b348015610be357600080fd5b506103df610bf2366004615ad3565b6136bd565b348015610c0357600080fd5b506001546001600160a01b0316610550565b348015610c2157600080fd5b506103df610c30366004615431565b613831565b348015610c4157600080fd5b506103df610c503660046154d6565b613980565b348015610c6157600080fd5b50610406610c7036600461589b565b6139f1565b348015610c8157600080fd5b50610406610c90366004615ad3565b613c6d565b348015610ca157600080fd5b50600f54610550906001600160a01b031681565b348015610cc157600080fd5b50601154610550906001600160a01b031681565b348015610ce157600080fd5b50610458610cf0366004615b0a565b613d32565b6000610cff613eb4565b6001600160a01b038216301480610d1d57506001600160a01b038216155b15610d3b57604051631964c57360e11b815260040160405180910390fd5b60008381526009602052604090206001810154600160301b90046001600160a01b03163314610d7d576040516330cd747160e01b815260040160405180910390fd5b60005b600e54811015610ddb57610dbd82600e8381548110610da157610da1615b26565b6000918252602090912001546001600160a01b03168787613f0c565b610dc79084615b52565b925080610dd381615b6a565b915050610d80565b506002810154600081815260076020908152604080832080548251630a81a92360e31b815292519194936001600160a01b039091169263540d491892600480830193928290030181865afa158015610e37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e5b9190615b95565b90506001600160a01b03811615801590610e7f5750601154600160a01b900460ff16155b15610f7f578354600090610ea290600160801b90046001600160801b0316615bb2565b6001860154604051638910faf160e01b8152600282810b6004830152630100000090920490910b6024820152600f82900b60448201529091506001600160a01b03831690638910faf190606401600060405180830381600087803b158015610f0957600080fd5b505af1158015610f1d573d6000803e3d6000fd5b50505050600185015460408051600f84900b8152600283810b6020830152630100000090930490920b908201528890859033907fee8f6362d59839b4b3c990d7e085a63a0fe2c58f4eff4a9a2b6de93a4c645ae39060600160405180910390a4505b83546003830180546001600160801b0390921691600090610fa1908490615be2565b90915550508354600483018054600160801b9092046001600160801b031691600090610fce908490615be2565b9091555050600087815260096020526040812081815560018101805479ffffffffffffffffffffffffffffffffffffffffffffffffffff19169055600281018290556003015561101e338861426a565b6011546001600160a01b03161561109b5760115460405163622cd4e160e11b815233600482015260248101899052604481018590526001600160a01b039091169063c459a9c290606401600060405180830381600087803b15801561108257600080fd5b505af1158015611096573d6000803e3d6000fd5b505050505b604051632142170760e11b81523060048201526001600160a01b038781166024830152604482018990527f000000000000000000000000000000000000000000000000000000000000000016906342842e0e90606401600060405180830381600087803b15801561110b57600080fd5b505af115801561111f573d6000803e3d6000fd5b50506040516001600160a01b038916815289925085915033907ff341246adaac6f497bc2a656f546ab9e182111d630394f0c57c710a59a2cb5679060200160405180910390a4505050506111736001600255565b92915050565b611181614296565b6011805474ff00000000000000000000000000000000000000001916600160a01b8315158102919091179182905560405160ff9190920416151581527fc749456be5379ac4cfc1f856208b32ddcf01b9db3ce6c37784ad91a8390ae9a8906020015b60405180910390a150565b600f546001600160a01b0316331461124d5760405162461bcd60e51b815260206004820152600c60248201527f4e6f74207265636569766572000000000000000000000000000000000000000060448201526064015b60405180910390fd5b600f54611268906001600160a01b03868116911630866142f0565b6001600160a01b0384166000908152600d60205260409020600201805484019055801561129757611297614370565b6013546201518083108015906112b0575062278d008311155b156112b85750815b4260006112c58383615b52565b6001600160a01b0388166000908152600d60205260408120600501549192509087908410156113af576001600160a01b0389166000908152600d60205260408120600681015460059091015464e8d4a510009190611324908890615be2565b61132e9190615bf9565b6113389190615c18565b6001600160a01b038b166000818152600d6020908152604091829020600381015460059091015483519081529182018a9052918101849052929350917f220da7a534a80a110f7ff72f9922efb97f37355d49f903e0aaac1d19397458d19060600160405180910390a36113ab8183615b52565b9150505b846113bf64e8d4a5100083615bf9565b6113c99190615c18565b6001600160a01b038a166000818152600d6020526040902060038101805460019081019182905588810160048401556005830188905560069092018490559294507fadceb780601967fcb680db81d7a4540165bf0a39608785518a833a47683968cd90611437908890615b52565b604080519182526020820188905281018690526060810185905260800160405180910390a3505050505050505050565b600080611472613eb4565b825160009081526009602052604090206001810154600160301b90046001600160a01b031633146114b6576040516330cd747160e01b815260040160405180910390fd5b60408051630624e65f60e11b81528551600482015260208601516001600160801b0316602482015290850151604482015260608501516064820152608085015160848201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690630c49ccbe9060a40160408051808303816000875af115801561154d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115719190615c3a565b909350915060005b600e548110156115cb576115b882600e838154811061159a5761159a615b26565b600091825260208220015488516001600160a01b0390911691613f0c565b50806115c381615b6a565b915050611579565b506115dc818560000151600061447d565b506115e76001600255565b915091565b6000806115f7613eb4565b835160009081526009602052604090206001810154600160301b90046001600160a01b0316331461163b576040516330cd747160e01b815260040160405180910390fd5b60208501516001600160a01b0316611654573060208601525b6040805163fc6f786560e01b81528651600482015260208701516001600160a01b039081166024830152918701516001600160801b03908116604483015260608801511660648201527f00000000000000000000000000000000000000000000000000000000000000009091169063fc6f78659060840160408051808303816000875af11580156116e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061170d9190615c3a565b602087015191945092506001600160a01b031630141561177e57600281015460009081526007602052604090206001600160a01b03851661174c573394505b6001810154611764906001600160a01b03168661499c565b600281015461177c906001600160a01b03168661499c565b505b506117896001600255565b9250929050565b600061179a613eb4565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146117e3576040516314a5156160e21b815260040160405180910390fd5b6040805160c081018252600080825260208201819052818301819052606082018190526080820181905260a0820152905163133f757160e31b8152600481018690526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906399fbab889060240161018060405180830381865afa158015611877573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061189b9190615c8e565b505050506001600160801b031660a08901819052600291820b60808a015291900b606088015262ffffff9190911660408701526001600160a01b0391821660208701529116845215159150611905905057604051636180f03f60e11b815260040160405180910390fd5b80516001600160a01b039081166000908152600b602090815260408083208286015190941683529281528282208385015162ffffff168352905220548061195f5760405163079f151f60e11b815260040160405180910390fd5b6000818152600760209081526040808320815160c08101835281546001600160a01b039081168083526001840154821683870152600284015491821683860152600160a01b90910462ffffff1660608301526003830154608083015260049283015460a08301528351630a81a92360e31b81529351919594909363540d49189381810193918290030181865afa1580156119fd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a219190615b95565b90506001600160a01b038116611a4a5760405163ef3d9b2160e01b815260040160405180910390fd5b6000600960008a8152602001908152602001600020905084606001518160010160006101000a81548162ffffff021916908360020b62ffffff16021790555084608001518160010160036101000a81548162ffffff021916908360020b62ffffff160217905550898160010160066101000a8154816001600160a01b0302191690836001600160a01b03160217905550838160020181905550816001600160a01b031663214a6fe2426040518263ffffffff1660e01b8152600401611b1b919063ffffffff91909116815260200190565b600060405180830381600087803b158015611b3557600080fd5b505af1158015611b49573d6000803e3d6000fd5b50505050611b59818a600061447d565b611bac8a8a6001600160a01b039190911660008181526003602081815260408084208054600484528286208187528452828620889055968552600583529084209590955592909152905280546001019055565b60a08501516060808701516080880151604080516001600160801b039095168552600292830b6020860152910b908301528a9186916001600160a01b038e16917fb19157bff94fdd40c58c7d4a5d52e8eb8c2d570ca17b322b49a2bbbeedc82fbf910160405180910390a450630a85bd0160e11b945050505050611c306001600255565b95945050505050565b611c41614296565b8015611c4f57611c4f614370565b601054604051634c96a38960e01b81526001600160a01b0384811660048301526000921690634c96a389906024016020604051808303816000875af1158015611c9c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cc09190615b95565b90506000836001600160a01b0316630dfe16816040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d269190615b95565b90506000846001600160a01b031663d21220a76040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d8c9190615b95565b90506000856001600160a01b031663ddca3f436040518163ffffffff1660e01b8152600401602060405180830381865afa158015611dce573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611df29190615d6f565b6001600160a01b038085166000908152600b60209081526040808320938716835292815282822062ffffff851683529052205490915015611e7e576001600160a01b038381166000908152600b60209081526040808320938616835292815282822062ffffff851683529052819020549051637d38f65f60e01b81526004810191909152602401611244565b604051636eb1769f60e11b81523060048201526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116602483015284169063dd62ed3e90604401602060405180830381865afa158015611eea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f0e9190615d8a565b611f4857611f486001600160a01b0384167f0000000000000000000000000000000000000000000000000000000000000000600019614b9e565b604051636eb1769f60e11b81523060048201526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116602483015283169063dd62ed3e90604401602060405180830381865afa158015611fb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fd89190615d8a565b612012576120126001600160a01b0383167f0000000000000000000000000000000000000000000000000000000000000000600019614b9e565b600680546001908101918290556040805160c0810182526001600160a01b03808b168252878116602080840191825288831684860190815262ffffff808a166060870190815260006080880181815260a089018281529b82526007909552978820965187549087166001600160a01b0319918216178855945198870180549987169990951698909817909355516002850180549751909316600160a01b027fffffffffffffffffff0000000000000000000000000000000000000000000000909716931692909217949094179093559151600383015591516004909101555b600e548110156121af5787600d6000600e848154811061211357612113615b26565b60009182526020808320909101546001600160a01b031683528201929092526040018120600101805490919061214a908490615b52565b90915550506006546000908152600860205260408120600e80548b9391908590811061217857612178615b26565b60009182526020808320909101546001600160a01b03168352820192909252604001902055806121a781615b6a565b9150506120f1565b506006546001600160a01b038481166000908152600b602090815260408083208785168452825280832062ffffff8716845282528083208590558a8416808452600c835292819020859055518b81529288169391927f0621c8de33a230aec1aee0d4f7b6c81d97bd3ce0a2040ca33fbd668e521ecafe910160405180910390a450505050505050565b612240614296565b805161225f576040516332e7879360e01b815260040160405180910390fd5b600381511115612282576040516303451c2960e21b815260040160405180910390fd5b60005b600e54811015612406576000805b8351811015612308578381815181106122ae576122ae615b26565b60200260200101516001600160a01b0316600e84815481106122d2576122d2615b26565b6000918252602090912001546001600160a01b031614156122f65760019150612308565b8061230081615b6a565b915050612293565b50806123f3576000600d6000600e858154811061232757612327615b26565b60009182526020808320909101546001600160a01b039081168452838201949094526040928301909120825160e081018452815490941684526001810154918401919091526002810154918301919091526003810154606083015260048101546080830152600581015460a0830181905260069091015460c08301529091504210156123f157600e83815481106123c0576123c0615b26565b600091825260209091200154604051631901cdd360e31b81526001600160a01b039091166004820152602401611244565b505b50806123fe81615b6a565b915050612285565b50805161241a90600e9060208401906153ab565b50806040516124299190615da3565b604051908190038120907f68ba79316f2f1e5b9cbebbec19a0fbb2c29806dffa531995229a0bac2af9659590600090a250565b6000806000612469613eb4565b83516000908152600960205260409020600281015461249b5760405163079f151f60e11b815260040160405180910390fd5b6002810154600090815260076020908152604090912060018101549187015190916124d1916001600160a01b0390911690614cba565b600281015460408701516124ee916001600160a01b031690614cba565b60018101547f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03908116911614801590612560575060028101547f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03908116911614155b801561256c5750600034115b1561257657600080fd5b6040805163219f5d1760e01b81528751600482015260208801516024820152908701516044820152606087015160648201526080870151608482015260a087015160a48201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063219f5d1790349060c40160606040518083038185885af1158015612610573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906126359190615de2565b60208901519297509095509350600090612650908690615be2565b905060008488604001516126649190615be2565b90508115612684576001830154612684906001600160a01b031683614d35565b80156126a25760028301546126a2906001600160a01b031682614d35565b60005b600e548110156126f7576126e485600e83815481106126c6576126c6615b26565b60009182526020822001548c516001600160a01b0390911691613f0c565b50806126ef81615b6a565b9150506126a5565b50612708848960000151600061447d565b505050506127166001600255565b9193909250565b6001600160a01b03821660009081526003602052604081205482106127925760405162461bcd60e51b815260206004820152602560248201527f456e756d657261626c653a206f776e657220696e646578206f7574206f6620626044820152646f756e647360d81b6064820152608401611244565b506001600160a01b03919091166000908152600460209081526040808320938352929052205490565b6127c3613eb4565b60008181526009602052604090206001810154600160301b90046001600160a01b03163314612805576040516330cd747160e01b815260040160405180910390fd5b80546001600160801b03161561282e576040516332e7879360e01b815260040160405180910390fd5b600082815260096020526040812081815560018101805479ffffffffffffffffffffffffffffffffffffffffffffffffffff191690556002810182905560030155612879338361426a565b6011546001600160a01b0316156128fc57601154600282015460405163622cd4e160e11b81523360048201526024810185905260448101919091526001600160a01b039091169063c459a9c290606401600060405180830381600087803b1580156128e357600080fd5b505af11580156128f7573d6000803e3d6000fd5b505050505b604051630852cd8d60e31b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906342966c6890602401600060405180830381600087803b15801561295e57600080fd5b505af1158015612972573d6000803e3d6000fd5b50505060028201546040516000815284925033907ff341246adaac6f497bc2a656f546ab9e182111d630394f0c57c710a59a2cb5679060200160405180910390a4506129be6001600255565b50565b6012546001600160a01b031633148015906129e757506000546001600160a01b03163314155b15612a0557604051634c7bb68760e11b815260040160405180910390fd5b4260005b82811015612b4157600060076000868685818110612a2957612a29615b26565b905060200201358152602001908152602001600020905060008160000160009054906101000a90046001600160a01b03166001600160a01b031663540d49186040518163ffffffff1660e01b8152600401602060405180830381865afa158015612a97573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612abb9190615b95565b90506001600160a01b03811615612b2c576040516310a537f160e11b815263ffffffff851660048201526001600160a01b0382169063214a6fe290602401600060405180830381600087803b158015612b1357600080fd5b505af1158015612b27573d6000803e3d6000fd5b505050505b50508080612b3990615b6a565b915050612a09565b50505050565b612b4f614296565b82801580612b5e575060065481115b15612b7c576040516387e8068360e01b815260040160405180910390fd5b600084815260076020908152604080832080548251630a81a92360e31b815292514295929492936001600160a01b039092169263540d491892600480820193918290030181865afa158015612bd5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bf99190615b95565b90506001600160a01b03811615612c6a576040516310a537f160e11b815263ffffffff841660048201526001600160a01b0382169063214a6fe290602401600060405180830381600087803b158015612c5157600080fd5b505af1158015612c65573d6000803e3d6000fd5b505050505b8415612c7857612c78614370565b60005b600e54811015612ddb576000888152600860205260408120600e80548a93919085908110612cab57612cab615b26565b9060005260206000200160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b0316815260200190815260200160002054600d6000600e8581548110612d0157612d01615b26565b60009182526020808320909101546001600160a01b03168352820192909252604001902060010154612d339190615be2565b612d3d9190615b52565b600d6000600e8481548110612d5457612d54615b26565b60009182526020808320909101546001600160a01b031683528281019390935260409182018120600101939093558a835260089091528120600e80548a93919085908110612da457612da4615b26565b60009182526020808320909101546001600160a01b0316835282019290925260400190205580612dd381615b6a565b915050612c7b565b50867fc0cfd54d2de2b55f1e6e108d3ec53ff0a1abe6055401d32c61e9433b747ef9f887604051612e0e91815260200190565b60405180910390a250505050505050565b6011546001600160a01b03163314612e795760405162461bcd60e51b815260206004820152601760248201527f4e6f74206661726d20626f6f737420636f6e74726163740000000000000000006044820152606401611244565b60008281526009602052604090206002810154612ea95760405163079f151f60e11b815260040160405180910390fd5b60005b600e54811015612efc57612ee982600e8381548110612ecd57612ecd615b26565b60009182526020822001546001600160a01b0316908790613f0c565b5080612ef481615b6a565b915050612eac565b50612f0881848461447d565b505050565b6001600160a01b0382166000908152600d6020526040812060010154819015612f83576001600160a01b0384166000818152600d60208181526040808420600181015489865260088452828620968652958352932054919052600690910154612f769190615bf9565b612f809190615c18565b91505b506001600160a01b039092166000908152600d602052604090206005015491929050565b60006001600160a01b0382166130255760405162461bcd60e51b815260206004820152602d60248201527f456e756d657261626c653a2061646472657373207a65726f206973206e6f742060448201527f612076616c6964206f776e6572000000000000000000000000000000000000006064820152608401611244565b506001600160a01b031660009081526003602052604090205490565b613049614296565b6130536000614e0c565b565b61305d614296565b6001600160a01b0381166130845760405163d92e233d60e01b815260040160405180910390fd5b60005b600e5481101561314057600019600e82815481106130a7576130a7615b26565b600091825260209091200154604051636eb1769f60e11b81526001600160a01b0385811660048301523060248301529091169063dd62ed3e90604401602060405180830381865afa158015613100573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131249190615d8a565b1461312e57600080fd5b8061313881615b6a565b915050613087565b50600f80546001600160a01b0319166001600160a01b0383169081179091556040519081527f4a2963bfc20b87a0c055468a66e6638d57725e93fb4d65733fb2f25587ae8c4f906020016111e3565b60015433906001600160a01b031681146131fd5760405162461bcd60e51b815260206004820152602960248201527f4f776e61626c6532537465703a2063616c6c6572206973206e6f7420746865206044820152683732bb9037bbb732b960b91b6064820152608401611244565b6129be81614e0c565b6001600160a01b0382166000908152600d6020526040812060010154819015612f83576001600160a01b038085166000818152600d602081815260408084206001810154968a168552600c835281852054855260088352818520958552948252909220549152600690910154612f769190615bf9565b600e818154811061328c57600080fd5b6000918252602090912001546001600160a01b0316905081565b6132ae614296565b620151808110806132c1575062278d0081115b156132df57604051634f08daf360e11b815260040160405180910390fd5b60138190556040518181527fb5521c8a03b484502769158d9dd83186bd0748f3ece2fbf358233994c2a20976906020016111e3565b60608167ffffffffffffffff81111561332f5761332f6154f3565b60405190808252806020026020018201604052801561336257816020015b606081526020019060019003908161334d5790505b50905060005b82811015613465576000803086868581811061338657613386615b26565b90506020028101906133989190615e19565b6040516133a6929190615e60565b600060405180830381855af49150503d80600081146133e1576040519150601f19603f3d011682016040523d82523d6000602084013e6133e6565b606091505b509150915081613432576044815110156133ff57600080fd5b600481019050808060200190518101906134199190615e70565b60405162461bcd60e51b81526004016112449190615f04565b8084848151811061344557613445615b26565b60200260200101819052505050808061345d90615b6a565b915050613368565b5092915050565b613474614296565b6001600160a01b03811661349b5760405163d92e233d60e01b815260040160405180910390fd5b601280546001600160a01b0319166001600160a01b0383169081179091556040519081527fc47d127c07bdd56c5ccba00463ce3bd3c1bca71b4670eea6e5d0c02e4aa156e2906020016111e3565b6060600e80548060200260200160405190810160405280929190818152602001828054801561354157602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311613523575b5050505050905090565b613553613eb4565b600081815260096020526040902060028101546135835760405163079f151f60e11b815260040160405180910390fd5b60005b600e548110156135d6576135c382600e83815481106135a7576135a7615b26565b60009182526020822001546001600160a01b0316908690613f0c565b50806135ce81615b6a565b915050613586565b506135e38183600061447d565b506129be6001600255565b6135f6614296565b6001600160a01b03811661361d5760405163d92e233d60e01b815260040160405180910390fd5b601080546001600160a01b0319166001600160a01b0383169081179091556040519081527f29e3e57b4a1e4513d009781598c7e4b8b2a68e4b71fe977e362d1b591016fade906020016111e3565b613673614296565b601180546001600160a01b0319166001600160a01b0383169081179091556040517ff32244aa081c72b930bb47bb702115e112d779ed353d6b1a70b28babc9822b7a90600090a250565b6136c5613eb4565b6040516370a0823160e01b81523060048201526000906001600160a01b038516906370a0823190602401602060405180830381865afa15801561370c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906137309190615d8a565b905060005b600e5481101561382557600e818154811061375257613752615b26565b6000918252602090912001546001600160a01b03868116911614156137d8576001600160a01b0385166000908152600d602052604090206002015482106137b8576001600160a01b0385166000908152600d6020526040902060020154909103906137d8565b6001600160a01b0385166000908152600d60205260408120600201929092555b838210156137f957604051632ca2f52b60e11b815260040160405180910390fd5b8115613813576138136001600160a01b0386168484614e25565b8061381d81615b6a565b915050613735565b5050612f086001600255565b613839613eb4565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156138a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906138c49190615d8a565b9050828110156138e757604051632ca2f52b60e11b815260040160405180910390fd5b801561397157604051632e1a7d4d60e01b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b15801561394f57600080fd5b505af1158015613963573d6000803e3d6000fd5b505050506139718282614e55565b5061397c6001600255565b5050565b613988614296565b600180546001600160a01b0383166001600160a01b031990911681179091556139b96000546001600160a01b031690565b6001600160a01b03167f38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e2270060405160405180910390a350565b6000818152600960209081526040808320815160e08101835281546001600160801b038082168352600160801b90910416938101939093526001810154600281810b9385019390935263010000008104830b6060850152600160301b90046001600160a01b031660808401529081015460a0830181905260039091015460c0830152156134655760a0818101516000908152600760209081526040808320815160c08101835281546001600160a01b039081168083526001840154821683870152600284015491821683860152600160a01b90910462ffffff16606083015260038301546080830152600492830154968201969096528251630a81a92360e31b8152925190959363540d49189380840193919291908290030181865afa158015613b1f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613b439190615b95565b90506001600160a01b03811615613c3357604083810151606085015191516301e72ef560e71b81526001600160a01b038981166004830152600292830b60248301529290910b604482015260009183169063f3977a8090606401602060405180830381865afa158015613bba573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613bde9190615d8a565b6000878152600a602090815260408083206001600160a01b038c16845282529091205490860151919250820390600160801b90613c24906001600160801b031683615bf9565b613c2e9190615c18565b955050505b6000858152600a602090815260408083206001600160a01b038a168452909152902060010154613c639085615b52565b9695505050505050565b6000613c77613eb4565b60008381526009602052604090206001810154600160301b90046001600160a01b03163314613cb9576040516330cd747160e01b815260040160405180910390fd5b80546001600160801b0316158015613cf457506000848152600a602090815260408083206001600160a01b0389168452909152902060010154155b15613d1257604051636180f03f60e11b815260040160405180910390fd5b613d1e81868686613f0c565b915050613d2b6001600255565b9392505050565b600080613d3d613eb4565b825160009081526009602052604090206001810154600160301b90046001600160a01b03163314613d81576040516330cd747160e01b815260040160405180910390fd5b60208401516001600160a01b0316613d9a573060208501525b6040805163fc6f786560e01b81528551600482015260208601516001600160a01b039081166024830152918601516001600160801b03908116604483015260608701511660648201527f00000000000000000000000000000000000000000000000000000000000000009091169063fc6f78659060840160408051808303816000875af1158015613e2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613e539190615c3a565b90935091506115e790506001600255565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600280541415613f065760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401611244565b60028055565b6002848101546000908152600760209081526040808320815160c08101835281546001600160a01b0390811680835260018401548216838701529683015490811682850152600160a01b900462ffffff1660608201526003820154608082015260049182015460a08201528251630a81a92360e31b81529251949590948694919363540d4918938181019392918290030181865afa158015613fb2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613fd69190615b95565b90506001600160a01b03811615801590613ffa5750601154600160a01b900460ff16155b15614165576040516310a537f160e11b815263ffffffff421660048201526001600160a01b0382169063214a6fe290602401600060405180830381600087803b15801561404657600080fd5b505af115801561405a573d6000803e3d6000fd5b5050505060018701546040516301e72ef560e71b81526001600160a01b038881166004830152600283810b6024840152630100000090930490920b604482015260009183169063f3977a8090606401602060405180830381865afa1580156140c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906140ea9190615d8a565b6000878152600a602090815260408083206001600160a01b038c1684529091529020548954919250820390600160801b90614131908290046001600160801b031683615bf9565b61413b9190615c18565b6000888152600a602090815260408083206001600160a01b038d1684529091529020929092555092505b6000858152600a602090815260408083206001600160a01b038a1684529091529020600101546141959084615b52565b92508215614260576001600160a01b03841615614237576000858152600a602090815260408083206001600160a01b038a1684529091528120600101556141dd868585614eb5565b6002870154604080516001600160a01b0387811682528916602082015290810185905286919033907f282b9c6f6d6a6b0d9b4175a3af0be477af589c6cb2d91400d87972ef449876d79060600160405180910390a4614260565b6000858152600a602090815260408083206001600160a01b038a16845290915290206001018390555b5050949350505050565b6142748282614fb3565b506001600160a01b031660009081526003602052604090208054600019019055565b6000546001600160a01b031633146130535760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401611244565b6040516001600160a01b0380851660248301528316604482015260648101829052612b419085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166001600160e01b0319909316929092179091526150cd565b4260015b600654811161397c57600081815260076020908152604080832080548251630a81a92360e31b815292519194936001600160a01b039091169263540d491892600480830193928290030181865afa1580156143d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906143f79190615b95565b90506001600160a01b03811615614468576040516310a537f160e11b815263ffffffff851660048201526001600160a01b0382169063214a6fe290602401600060405180830381600087803b15801561444f57600080fd5b505af1158015614463573d6000803e3d6000fd5b505050505b5050808061447590615b6a565b915050614374565b60008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166399fbab88866040518263ffffffff1660e01b81526004016144d091815260200190565b61018060405180830381865afa1580156144ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906145129190615c8e565b5050505060028e015460009081526007602052604090208e54939b50919950975095506001600160801b03808816911614935061459e9250505057865460038201546001600160801b038085169261456c92911690615be2565b6145769190615b52565b600382015586546fffffffffffffffffffffffffffffffff19166001600160801b0383161787555b60115464e8d4a51000906001600160a01b0316158015906145bd575085155b1561463857601154604051632273df8360e11b8152600481018990526001600160a01b03909116906344e7bf06906024016020604051808303816000875af115801561460d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906146319190615d8a565b9050614641565b85156146415750845b64e8d4a5100081101561465a575064e8d4a51000614671565b6501d1a94a200081111561467157506501d1a94a20005b6003880181905560006146a564e8d4a51000614696846001600160801b038816615bf9565b6146a09190615c18565b6151b5565b89549091506000906146c790600160801b90046001600160801b031683615f17565b905080600f0b60001461499057895460048501546001600160801b03808516926146fc92600160801b90910490911690615be2565b6147069190615b52565b6004808601919091558a546001600160801b03808516600160801b029116178b55845460408051630a81a92360e31b815290516000936001600160a01b039093169263540d4918928082019260209290918290030181865afa158015614770573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906147949190615b95565b90506001600160a01b0381166147bd5760405163ef3d9b2160e01b815260040160405180910390fd5b604051638910faf160e01b8152600289810b600483015288900b6024820152600f83900b60448201526001600160a01b03821690638910faf190606401600060405180830381600087803b15801561481457600080fd5b505af1158015614828573d6000803e3d6000fd5b5050505060005b600e5481101561493d57816001600160a01b031663f3977a80600e838154811061485b5761485b615b26565b60009182526020909120015460405160e083901b6001600160e01b03191681526001600160a01b03909116600482015260028c810b60248301528b900b6044820152606401602060405180830381865afa1580156148bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906148e19190615d8a565b60008c8152600a60205260408120600e80549192918590811061490657614906615b26565b60009182526020808320909101546001600160a01b031683528201929092526040019020558061493581615b6a565b91505061482f565b5060028b81015460408051600f86900b81528b840b6020820152928a900b83820152518c9233917fee8f6362d59839b4b3c990d7e085a63a0fe2c58f4eff4a9a2b6de93a4c645ae39181900360600190a4505b50505050505050505050565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa1580156149e3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614a079190615d8a565b905060005b600e54811015612b4157600e8181548110614a2957614a29615b26565b6000918252602090912001546001600160a01b0385811691161415614aaf576001600160a01b0384166000908152600d60205260409020600201548210614a8f576001600160a01b0384166000908152600d602052604090206002015490910390614aaf565b6001600160a01b0384166000908152600d60205260408120600201929092555b8115614b8c577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316846001600160a01b03161415614b7857604051632e1a7d4d60e01b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b158015614b5157600080fd5b505af1158015614b65573d6000803e3d6000fd5b50505050614b738383614e55565b614b8c565b614b8c6001600160a01b0385168484614e25565b80614b9681615b6a565b915050614a0c565b801580614c185750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa158015614bf2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614c169190615d8a565b155b614c8a5760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401611244565b6040516001600160a01b038316602482015260448101829052612f0890849063095ea7b360e01b90606401614324565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316826001600160a01b0316148015614cfb5750600034115b15614d205780341461397c57604051634b508fef60e01b815260040160405180910390fd5b61397c6001600160a01b0383163330846142f0565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316826001600160a01b0316148015614d765750600034115b15614df8577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316631f9709826040518163ffffffff1660e01b8152600401600060405180830381600087803b158015614dd657600080fd5b505af1158015614dea573d6000803e3d6000fd5b5050505061397c3347614e55565b61397c6001600160a01b0383163383614e25565b600180546001600160a01b03191690556129be81613e64565b6040516001600160a01b038316602482015260448101829052612f0890849063a9059cbb60e01b90606401614324565b6000826001600160a01b03168260405160006040518083038185875af1925050503d8060008114614ea2576040519150601f19603f3d011682016040523d82523d6000602084013e614ea7565b606091505b5050905080612f0857600080fd5b8015612f08576040516370a0823160e01b81523060048201526000906001600160a01b038516906370a0823190602401602060405180830381865afa158015614f02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614f269190615d8a565b905081811015614f34578091505b6001600160a01b0384166000908152600d60205260409020600201548211614f7d576001600160a01b0384166000908152600d6020526040902060020180548390039055614f9f565b6001600160a01b0384166000908152600d602052604090208282036002909101555b612b416001600160a01b0385168484614e25565b6001600160a01b038216600090815260036020526040812054614fd890600190615be2565b6000838152600560209081526040808320546001600160a01b038816845260048352818420818552909252909120549192509083146150595760405162461bcd60e51b815260206004820152600f60248201527f496e76616c696420746f6b656e496400000000000000000000000000000000006044820152606401611244565b81811461509a576001600160a01b03841660009081526004602090815260408083208584528252808320548484528184208190558352600590915290208190555b5060009182526005602090815260408084208490556001600160a01b039094168352600481528383209183525290812055565b6000615122826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661521e9092919063ffffffff16565b90508051600014806151435750808060200190518101906151439190615f79565b612f085760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401611244565b6000600160801b821061521a5760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20316044820152663238206269747360c81b6064820152608401611244565b5090565b606061522d8484600085615235565b949350505050565b6060824710156152965760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401611244565b600080866001600160a01b031685876040516152b29190615f96565b60006040518083038185875af1925050503d80600081146152ef576040519150601f19603f3d011682016040523d82523d6000602084013e6152f4565b606091505b509150915061530587838387615310565b979650505050505050565b6060831561537c578251615375576001600160a01b0385163b6153755760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401611244565b508161522d565b61522d83838151156153915781518083602001fd5b8060405162461bcd60e51b81526004016112449190615f04565b828054828255906000526020600020908101928215615400579160200282015b8281111561540057825182546001600160a01b0319166001600160a01b039091161782556020909201916001909101906153cb565b5061521a9291505b8082111561521a5760008155600101615408565b6001600160a01b03811681146129be57600080fd5b6000806040838503121561544457600080fd5b8235915060208301356154568161541c565b809150509250929050565b80151581146129be57600080fd5b60006020828403121561548157600080fd5b8135613d2b81615461565b600080600080608085870312156154a257600080fd5b84356154ad8161541c565b9350602085013592506040850135915060608501356154cb81615461565b939692955090935050565b6000602082840312156154e857600080fd5b8135613d2b8161541c565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715615532576155326154f3565b604052919050565b6001600160801b03811681146129be57600080fd5b600060a0828403121561556157600080fd5b60405160a0810181811067ffffffffffffffff82111715615584576155846154f3565b6040528235815260208301356155998161553a565b806020830152506040830135604082015260608301356060820152608083013560808201528091505092915050565b6000608082840312156155da57600080fd5b6040516080810181811067ffffffffffffffff821117156155fd576155fd6154f3565b6040528235815290508060208301356156158161541c565b602082015260408301356156288161553a565b6040820152606083013561563b8161553a565b6060919091015292915050565b60008060a0838503121561565b57600080fd5b61566584846155c8565b915060808301356154568161541c565b60008060008060006080868803121561568d57600080fd5b85356156988161541c565b945060208601356156a88161541c565b935060408601359250606086013567ffffffffffffffff808211156156cc57600080fd5b818801915088601f8301126156e057600080fd5b8135818111156156ef57600080fd5b89602082850101111561570157600080fd5b9699959850939650602001949392505050565b60006020828403121561572657600080fd5b5035919050565b60008060006060848603121561574257600080fd5b8335925060208401356157548161541c565b9150604084013561576481615461565b809150509250925092565b6000602080838503121561578257600080fd5b823567ffffffffffffffff8082111561579a57600080fd5b818501915085601f8301126157ae57600080fd5b8135818111156157c0576157c06154f3565b8060051b91506157d1848301615509565b81815291830184019184810190888411156157eb57600080fd5b938501935b8385101561581557843592506158058361541c565b82825293850193908501906157f0565b98975050505050505050565b600060c0828403121561583357600080fd5b60405160c0810181811067ffffffffffffffff82111715615856576158566154f3565b8060405250823581526020830135602082015260408301356040820152606083013560608201526080830135608082015260a083013560a08201528091505092915050565b600080604083850312156158ae57600080fd5b82356158b98161541c565b946020939093013593505050565b60008083601f8401126158d957600080fd5b50813567ffffffffffffffff8111156158f157600080fd5b6020830191508360208260051b850101111561178957600080fd5b6000806020838503121561591f57600080fd5b823567ffffffffffffffff81111561593657600080fd5b615942858286016158c7565b90969095509350505050565b60008060006060848603121561596357600080fd5b8335925060208401359150604084013561576481615461565b6000806040838503121561598f57600080fd5b50508035926020909101359150565b600080604083850312156159b157600080fd5b82356159bc8161541c565b915060208301356154568161541c565b60005b838110156159e75781810151838201526020016159cf565b83811115612b415750506000910152565b60008151808452615a108160208601602086016159cc565b601f01601f19169290920160200192915050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015615a7957603f19888603018452615a678583516159f8565b94509285019290850190600101615a4b565b5092979650505050505050565b6020808252825182820181905260009190848201906040850190845b81811015615ac75783516001600160a01b031683529284019291840191600101615aa2565b50909695505050505050565b600080600060608486031215615ae857600080fd5b8335615af38161541c565b92506020840135915060408401356157648161541c565b600060808284031215615b1c57600080fd5b613d2b83836155c8565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60008219821115615b6557615b65615b3c565b500190565b6000600019821415615b7e57615b7e615b3c565b5060010190565b8051615b908161541c565b919050565b600060208284031215615ba757600080fd5b8151613d2b8161541c565b600081600f0b6f7fffffffffffffffffffffffffffffff19811415615bd957615bd9615b3c565b60000392915050565b600082821015615bf457615bf4615b3c565b500390565b6000816000190483118215151615615c1357615c13615b3c565b500290565b600082615c3557634e487b7160e01b600052601260045260246000fd5b500490565b60008060408385031215615c4d57600080fd5b505080516020909101519092909150565b805162ffffff81168114615b9057600080fd5b8051600281900b8114615b9057600080fd5b8051615b908161553a565b6000806000806000806000806000806000806101808d8f031215615cb157600080fd5b8c516bffffffffffffffffffffffff81168114615ccd57600080fd5b9b50615cdb60208e01615b85565b9a50615ce960408e01615b85565b9950615cf760608e01615b85565b9850615d0560808e01615c5e565b9750615d1360a08e01615c71565b9650615d2160c08e01615c71565b9550615d2f60e08e01615c83565b94506101008d015193506101208d01519250615d4e6101408e01615c83565b9150615d5d6101608e01615c83565b90509295989b509295989b509295989b565b600060208284031215615d8157600080fd5b613d2b82615c5e565b600060208284031215615d9c57600080fd5b5051919050565b815160009082906020808601845b83811015615dd65781516001600160a01b031685529382019390820190600101615db1565b50929695505050505050565b600080600060608486031215615df757600080fd5b8351615e028161553a565b602085015160409095015190969495509392505050565b6000808335601e19843603018112615e3057600080fd5b83018035915067ffffffffffffffff821115615e4b57600080fd5b60200191503681900382131561178957600080fd5b8183823760009101908152919050565b600060208284031215615e8257600080fd5b815167ffffffffffffffff80821115615e9a57600080fd5b818401915084601f830112615eae57600080fd5b815181811115615ec057615ec06154f3565b615ed3601f8201601f1916602001615509565b9150808252856020828501011115615eea57600080fd5b615efb8160208401602086016159cc565b50949350505050565b602081526000613d2b60208301846159f8565b600081600f0b83600f0b60008112816f7fffffffffffffffffffffffffffffff1901831281151615615f4b57615f4b615b3c565b816f7fffffffffffffffffffffffffffffff018313811615615f6f57615f6f615b3c565b5090039392505050565b600060208284031215615f8b57600080fd5b8151613d2b81615461565b60008251615fa88184602087016159cc565b919091019291505056fea26469706673582212206f0ffa98d21d31c66a8b4f336bfdb9332c57c0dd82845f91b3f9be62bf205d1364736f6c634300080a0033";
var deployedBytecode$4 = "0x60806040526004361061036e5760003560e01c806379ba5097116101c6578063caa6fea4116100f7578063eff7a11311610095578063f54ac2461161006f578063f54ac24614610c75578063f7260d3e14610c95578063fbc911d014610cb5578063fc6f786514610cd557600080fd5b8063eff7a11314610c15578063f2fde38b14610c35578063f430cf0d14610c5557600080fd5b8063cf242849116100d1578063cf24284914610b97578063cfb8ccfb14610bb7578063df2ab5bb14610bd7578063e30c397814610bf757600080fd5b8063caa6fea414610b46578063cc6db2da14610a49578063ced0911214610b7757600080fd5b8063ac9650d811610164578063b44a27221161013e578063b44a272214610ab9578063b4ce128014610aed578063b6a6d17714610b0d578063c4f59f9b14610b2457600080fd5b8063ac9650d814610a62578063b1724b4614610a82578063b3ab15fb14610a9957600080fd5b80637c2d6e01116101a05780637c2d6e01146109d75780638da5cb5b146109f75780639ba879cf14610a15578063aaf5eb6814610a4957600080fd5b806379ba5097146109825780637bb21b46146109975780637bb7bed1146109b757600080fd5b8063233a48a2116102a05780636558954f1161023e57806369b021281161021857806369b021281461091357806370a082311461092d578063715018a61461094d578063718da7ee1461096257600080fd5b80636558954f146108bd57806369746a1d146108d3578063699233c3146108f357600080fd5b806342966c681161027a57806342966c681461084857806344780994146108685780635d0cde971461088857806364482f791461089d57600080fd5b8063233a48a2146106c15780632f745c59146107625780633b1acf741461078257600080fd5b80630d55f9131161030d5780631526fe27116102e75780631526fe27146105a15780631eaaa04514610649578063201e81a814610669578063219f5d171461068957600080fd5b80630d55f91314610510578063127effb214610530578063150b7a021461056857600080fd5b8063070f3c0711610349578063070f3c071461048d5780630743384d146104ad578063081e3eda146104da5780630c49ccbe146104f057600080fd5b8062f714ce146103e65780630327ae47146104195780630501d5561461046d57600080fd5b366103e157336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148015906103d55750336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614155b156103df57600080fd5b005b600080fd5b3480156103f257600080fd5b50610406610401366004615431565b610cf5565b6040519081526020015b60405180910390f35b34801561042557600080fd5b50610458610434366004615431565b600a6020908152600092835260408084209091529082529020805460019091015482565b60408051928352602083019190915201610410565b34801561047957600080fd5b506103df61048836600461546f565b611179565b34801561049957600080fd5b506103df6104a836600461548c565b6111ee565b3480156104b957600080fd5b506104066104c83660046154d6565b600c6020526000908152604090205481565b3480156104e657600080fd5b5061040660065481565b3480156104fc57600080fd5b5061045861050b36600461554f565b611467565b34801561051c57600080fd5b5061045861052b366004615648565b6115ec565b34801561053c57600080fd5b50601254610550906001600160a01b031681565b6040516001600160a01b039091168152602001610410565b34801561057457600080fd5b50610588610583366004615675565b611790565b6040516001600160e01b03199091168152602001610410565b3480156105ad57600080fd5b506106066105bc366004615714565b600760205260009081526040902080546001820154600283015460038401546004909401546001600160a01b039384169492841693821692600160a01b90920462ffffff16919086565b604080516001600160a01b0397881681529587166020870152939095169284019290925262ffffff166060830152608082015260a081019190915260c001610410565b34801561065557600080fd5b506103df61066436600461572d565b611c39565b34801561067557600080fd5b506103df61068436600461576f565b612238565b61069c610697366004615821565b61245c565b604080516001600160801b039094168452602084019290925290820152606001610410565b3480156106cd57600080fd5b506107236106dc3660046154d6565b600d6020526000908152604090208054600182015460028301546003840154600485015460058601546006909601546001600160a01b039095169593949293919290919087565b604080516001600160a01b0390981688526020880196909652948601939093526060850191909152608084015260a083015260c082015260e001610410565b34801561076e57600080fd5b5061040661077d36600461589b565b61271d565b34801561078e57600080fd5b506107f761079d366004615714565b6009602052600090815260409020805460018201546002808401546003909401546001600160801b0380851695600160801b909504169383830b936301000000810490930b92600160301b90046001600160a01b03169187565b604080516001600160801b039889168152979096166020880152600294850b958701959095529190920b60608501526001600160a01b03909116608084015260a083015260c082015260e001610410565b34801561085457600080fd5b506103df610863366004615714565b6127bb565b34801561087457600080fd5b506103df61088336600461590c565b6129c1565b34801561089457600080fd5b50610406600381565b3480156108a957600080fd5b506103df6108b836600461594e565b612b47565b3480156108c957600080fd5b5061040660135481565b3480156108df57600080fd5b506103df6108ee36600461597c565b612e1f565b3480156108ff57600080fd5b5061045861090e36600461589b565b612f0d565b34801561091f57600080fd5b506104066501d1a94a200081565b34801561093957600080fd5b506104066109483660046154d6565b612fa7565b34801561095957600080fd5b506103df613041565b34801561096e57600080fd5b506103df61097d3660046154d6565b613055565b34801561098e57600080fd5b506103df61318f565b3480156109a357600080fd5b506104586109b236600461599e565b613206565b3480156109c357600080fd5b506105506109d2366004615714565b61327c565b3480156109e357600080fd5b506103df6109f2366004615714565b6132a6565b348015610a0357600080fd5b506000546001600160a01b0316610550565b348015610a2157600080fd5b506105507f000000000000000000000000000000000000000000000000000000000000000081565b348015610a5557600080fd5b5061040664e8d4a5100081565b610a75610a7036600461590c565b613314565b6040516104109190615a24565b348015610a8e57600080fd5b5061040662278d0081565b348015610aa557600080fd5b506103df610ab43660046154d6565b61346c565b348015610ac557600080fd5b506105507f000000000000000000000000000000000000000000000000000000000000000081565b348015610af957600080fd5b50601054610550906001600160a01b031681565b348015610b1957600080fd5b506104066201518081565b348015610b3057600080fd5b50610b396134e9565b6040516104109190615a86565b348015610b5257600080fd5b50601154610b6790600160a01b900460ff1681565b6040519015158152602001610410565b348015610b8357600080fd5b506103df610b92366004615714565b61354b565b348015610ba357600080fd5b506103df610bb23660046154d6565b6135ee565b348015610bc357600080fd5b506103df610bd23660046154d6565b61366b565b348015610be357600080fd5b506103df610bf2366004615ad3565b6136bd565b348015610c0357600080fd5b506001546001600160a01b0316610550565b348015610c2157600080fd5b506103df610c30366004615431565b613831565b348015610c4157600080fd5b506103df610c503660046154d6565b613980565b348015610c6157600080fd5b50610406610c7036600461589b565b6139f1565b348015610c8157600080fd5b50610406610c90366004615ad3565b613c6d565b348015610ca157600080fd5b50600f54610550906001600160a01b031681565b348015610cc157600080fd5b50601154610550906001600160a01b031681565b348015610ce157600080fd5b50610458610cf0366004615b0a565b613d32565b6000610cff613eb4565b6001600160a01b038216301480610d1d57506001600160a01b038216155b15610d3b57604051631964c57360e11b815260040160405180910390fd5b60008381526009602052604090206001810154600160301b90046001600160a01b03163314610d7d576040516330cd747160e01b815260040160405180910390fd5b60005b600e54811015610ddb57610dbd82600e8381548110610da157610da1615b26565b6000918252602090912001546001600160a01b03168787613f0c565b610dc79084615b52565b925080610dd381615b6a565b915050610d80565b506002810154600081815260076020908152604080832080548251630a81a92360e31b815292519194936001600160a01b039091169263540d491892600480830193928290030181865afa158015610e37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e5b9190615b95565b90506001600160a01b03811615801590610e7f5750601154600160a01b900460ff16155b15610f7f578354600090610ea290600160801b90046001600160801b0316615bb2565b6001860154604051638910faf160e01b8152600282810b6004830152630100000090920490910b6024820152600f82900b60448201529091506001600160a01b03831690638910faf190606401600060405180830381600087803b158015610f0957600080fd5b505af1158015610f1d573d6000803e3d6000fd5b50505050600185015460408051600f84900b8152600283810b6020830152630100000090930490920b908201528890859033907fee8f6362d59839b4b3c990d7e085a63a0fe2c58f4eff4a9a2b6de93a4c645ae39060600160405180910390a4505b83546003830180546001600160801b0390921691600090610fa1908490615be2565b90915550508354600483018054600160801b9092046001600160801b031691600090610fce908490615be2565b9091555050600087815260096020526040812081815560018101805479ffffffffffffffffffffffffffffffffffffffffffffffffffff19169055600281018290556003015561101e338861426a565b6011546001600160a01b03161561109b5760115460405163622cd4e160e11b815233600482015260248101899052604481018590526001600160a01b039091169063c459a9c290606401600060405180830381600087803b15801561108257600080fd5b505af1158015611096573d6000803e3d6000fd5b505050505b604051632142170760e11b81523060048201526001600160a01b038781166024830152604482018990527f000000000000000000000000000000000000000000000000000000000000000016906342842e0e90606401600060405180830381600087803b15801561110b57600080fd5b505af115801561111f573d6000803e3d6000fd5b50506040516001600160a01b038916815289925085915033907ff341246adaac6f497bc2a656f546ab9e182111d630394f0c57c710a59a2cb5679060200160405180910390a4505050506111736001600255565b92915050565b611181614296565b6011805474ff00000000000000000000000000000000000000001916600160a01b8315158102919091179182905560405160ff9190920416151581527fc749456be5379ac4cfc1f856208b32ddcf01b9db3ce6c37784ad91a8390ae9a8906020015b60405180910390a150565b600f546001600160a01b0316331461124d5760405162461bcd60e51b815260206004820152600c60248201527f4e6f74207265636569766572000000000000000000000000000000000000000060448201526064015b60405180910390fd5b600f54611268906001600160a01b03868116911630866142f0565b6001600160a01b0384166000908152600d60205260409020600201805484019055801561129757611297614370565b6013546201518083108015906112b0575062278d008311155b156112b85750815b4260006112c58383615b52565b6001600160a01b0388166000908152600d60205260408120600501549192509087908410156113af576001600160a01b0389166000908152600d60205260408120600681015460059091015464e8d4a510009190611324908890615be2565b61132e9190615bf9565b6113389190615c18565b6001600160a01b038b166000818152600d6020908152604091829020600381015460059091015483519081529182018a9052918101849052929350917f220da7a534a80a110f7ff72f9922efb97f37355d49f903e0aaac1d19397458d19060600160405180910390a36113ab8183615b52565b9150505b846113bf64e8d4a5100083615bf9565b6113c99190615c18565b6001600160a01b038a166000818152600d6020526040902060038101805460019081019182905588810160048401556005830188905560069092018490559294507fadceb780601967fcb680db81d7a4540165bf0a39608785518a833a47683968cd90611437908890615b52565b604080519182526020820188905281018690526060810185905260800160405180910390a3505050505050505050565b600080611472613eb4565b825160009081526009602052604090206001810154600160301b90046001600160a01b031633146114b6576040516330cd747160e01b815260040160405180910390fd5b60408051630624e65f60e11b81528551600482015260208601516001600160801b0316602482015290850151604482015260608501516064820152608085015160848201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690630c49ccbe9060a40160408051808303816000875af115801561154d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115719190615c3a565b909350915060005b600e548110156115cb576115b882600e838154811061159a5761159a615b26565b600091825260208220015488516001600160a01b0390911691613f0c565b50806115c381615b6a565b915050611579565b506115dc818560000151600061447d565b506115e76001600255565b915091565b6000806115f7613eb4565b835160009081526009602052604090206001810154600160301b90046001600160a01b0316331461163b576040516330cd747160e01b815260040160405180910390fd5b60208501516001600160a01b0316611654573060208601525b6040805163fc6f786560e01b81528651600482015260208701516001600160a01b039081166024830152918701516001600160801b03908116604483015260608801511660648201527f00000000000000000000000000000000000000000000000000000000000000009091169063fc6f78659060840160408051808303816000875af11580156116e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061170d9190615c3a565b602087015191945092506001600160a01b031630141561177e57600281015460009081526007602052604090206001600160a01b03851661174c573394505b6001810154611764906001600160a01b03168661499c565b600281015461177c906001600160a01b03168661499c565b505b506117896001600255565b9250929050565b600061179a613eb4565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146117e3576040516314a5156160e21b815260040160405180910390fd5b6040805160c081018252600080825260208201819052818301819052606082018190526080820181905260a0820152905163133f757160e31b8152600481018690526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906399fbab889060240161018060405180830381865afa158015611877573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061189b9190615c8e565b505050506001600160801b031660a08901819052600291820b60808a015291900b606088015262ffffff9190911660408701526001600160a01b0391821660208701529116845215159150611905905057604051636180f03f60e11b815260040160405180910390fd5b80516001600160a01b039081166000908152600b602090815260408083208286015190941683529281528282208385015162ffffff168352905220548061195f5760405163079f151f60e11b815260040160405180910390fd5b6000818152600760209081526040808320815160c08101835281546001600160a01b039081168083526001840154821683870152600284015491821683860152600160a01b90910462ffffff1660608301526003830154608083015260049283015460a08301528351630a81a92360e31b81529351919594909363540d49189381810193918290030181865afa1580156119fd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a219190615b95565b90506001600160a01b038116611a4a5760405163ef3d9b2160e01b815260040160405180910390fd5b6000600960008a8152602001908152602001600020905084606001518160010160006101000a81548162ffffff021916908360020b62ffffff16021790555084608001518160010160036101000a81548162ffffff021916908360020b62ffffff160217905550898160010160066101000a8154816001600160a01b0302191690836001600160a01b03160217905550838160020181905550816001600160a01b031663214a6fe2426040518263ffffffff1660e01b8152600401611b1b919063ffffffff91909116815260200190565b600060405180830381600087803b158015611b3557600080fd5b505af1158015611b49573d6000803e3d6000fd5b50505050611b59818a600061447d565b611bac8a8a6001600160a01b039190911660008181526003602081815260408084208054600484528286208187528452828620889055968552600583529084209590955592909152905280546001019055565b60a08501516060808701516080880151604080516001600160801b039095168552600292830b6020860152910b908301528a9186916001600160a01b038e16917fb19157bff94fdd40c58c7d4a5d52e8eb8c2d570ca17b322b49a2bbbeedc82fbf910160405180910390a450630a85bd0160e11b945050505050611c306001600255565b95945050505050565b611c41614296565b8015611c4f57611c4f614370565b601054604051634c96a38960e01b81526001600160a01b0384811660048301526000921690634c96a389906024016020604051808303816000875af1158015611c9c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cc09190615b95565b90506000836001600160a01b0316630dfe16816040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d269190615b95565b90506000846001600160a01b031663d21220a76040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d8c9190615b95565b90506000856001600160a01b031663ddca3f436040518163ffffffff1660e01b8152600401602060405180830381865afa158015611dce573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611df29190615d6f565b6001600160a01b038085166000908152600b60209081526040808320938716835292815282822062ffffff851683529052205490915015611e7e576001600160a01b038381166000908152600b60209081526040808320938616835292815282822062ffffff851683529052819020549051637d38f65f60e01b81526004810191909152602401611244565b604051636eb1769f60e11b81523060048201526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116602483015284169063dd62ed3e90604401602060405180830381865afa158015611eea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f0e9190615d8a565b611f4857611f486001600160a01b0384167f0000000000000000000000000000000000000000000000000000000000000000600019614b9e565b604051636eb1769f60e11b81523060048201526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116602483015283169063dd62ed3e90604401602060405180830381865afa158015611fb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fd89190615d8a565b612012576120126001600160a01b0383167f0000000000000000000000000000000000000000000000000000000000000000600019614b9e565b600680546001908101918290556040805160c0810182526001600160a01b03808b168252878116602080840191825288831684860190815262ffffff808a166060870190815260006080880181815260a089018281529b82526007909552978820965187549087166001600160a01b0319918216178855945198870180549987169990951698909817909355516002850180549751909316600160a01b027fffffffffffffffffff0000000000000000000000000000000000000000000000909716931692909217949094179093559151600383015591516004909101555b600e548110156121af5787600d6000600e848154811061211357612113615b26565b60009182526020808320909101546001600160a01b031683528201929092526040018120600101805490919061214a908490615b52565b90915550506006546000908152600860205260408120600e80548b9391908590811061217857612178615b26565b60009182526020808320909101546001600160a01b03168352820192909252604001902055806121a781615b6a565b9150506120f1565b506006546001600160a01b038481166000908152600b602090815260408083208785168452825280832062ffffff8716845282528083208590558a8416808452600c835292819020859055518b81529288169391927f0621c8de33a230aec1aee0d4f7b6c81d97bd3ce0a2040ca33fbd668e521ecafe910160405180910390a450505050505050565b612240614296565b805161225f576040516332e7879360e01b815260040160405180910390fd5b600381511115612282576040516303451c2960e21b815260040160405180910390fd5b60005b600e54811015612406576000805b8351811015612308578381815181106122ae576122ae615b26565b60200260200101516001600160a01b0316600e84815481106122d2576122d2615b26565b6000918252602090912001546001600160a01b031614156122f65760019150612308565b8061230081615b6a565b915050612293565b50806123f3576000600d6000600e858154811061232757612327615b26565b60009182526020808320909101546001600160a01b039081168452838201949094526040928301909120825160e081018452815490941684526001810154918401919091526002810154918301919091526003810154606083015260048101546080830152600581015460a0830181905260069091015460c08301529091504210156123f157600e83815481106123c0576123c0615b26565b600091825260209091200154604051631901cdd360e31b81526001600160a01b039091166004820152602401611244565b505b50806123fe81615b6a565b915050612285565b50805161241a90600e9060208401906153ab565b50806040516124299190615da3565b604051908190038120907f68ba79316f2f1e5b9cbebbec19a0fbb2c29806dffa531995229a0bac2af9659590600090a250565b6000806000612469613eb4565b83516000908152600960205260409020600281015461249b5760405163079f151f60e11b815260040160405180910390fd5b6002810154600090815260076020908152604090912060018101549187015190916124d1916001600160a01b0390911690614cba565b600281015460408701516124ee916001600160a01b031690614cba565b60018101547f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03908116911614801590612560575060028101547f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03908116911614155b801561256c5750600034115b1561257657600080fd5b6040805163219f5d1760e01b81528751600482015260208801516024820152908701516044820152606087015160648201526080870151608482015260a087015160a48201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063219f5d1790349060c40160606040518083038185885af1158015612610573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906126359190615de2565b60208901519297509095509350600090612650908690615be2565b905060008488604001516126649190615be2565b90508115612684576001830154612684906001600160a01b031683614d35565b80156126a25760028301546126a2906001600160a01b031682614d35565b60005b600e548110156126f7576126e485600e83815481106126c6576126c6615b26565b60009182526020822001548c516001600160a01b0390911691613f0c565b50806126ef81615b6a565b9150506126a5565b50612708848960000151600061447d565b505050506127166001600255565b9193909250565b6001600160a01b03821660009081526003602052604081205482106127925760405162461bcd60e51b815260206004820152602560248201527f456e756d657261626c653a206f776e657220696e646578206f7574206f6620626044820152646f756e647360d81b6064820152608401611244565b506001600160a01b03919091166000908152600460209081526040808320938352929052205490565b6127c3613eb4565b60008181526009602052604090206001810154600160301b90046001600160a01b03163314612805576040516330cd747160e01b815260040160405180910390fd5b80546001600160801b03161561282e576040516332e7879360e01b815260040160405180910390fd5b600082815260096020526040812081815560018101805479ffffffffffffffffffffffffffffffffffffffffffffffffffff191690556002810182905560030155612879338361426a565b6011546001600160a01b0316156128fc57601154600282015460405163622cd4e160e11b81523360048201526024810185905260448101919091526001600160a01b039091169063c459a9c290606401600060405180830381600087803b1580156128e357600080fd5b505af11580156128f7573d6000803e3d6000fd5b505050505b604051630852cd8d60e31b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906342966c6890602401600060405180830381600087803b15801561295e57600080fd5b505af1158015612972573d6000803e3d6000fd5b50505060028201546040516000815284925033907ff341246adaac6f497bc2a656f546ab9e182111d630394f0c57c710a59a2cb5679060200160405180910390a4506129be6001600255565b50565b6012546001600160a01b031633148015906129e757506000546001600160a01b03163314155b15612a0557604051634c7bb68760e11b815260040160405180910390fd5b4260005b82811015612b4157600060076000868685818110612a2957612a29615b26565b905060200201358152602001908152602001600020905060008160000160009054906101000a90046001600160a01b03166001600160a01b031663540d49186040518163ffffffff1660e01b8152600401602060405180830381865afa158015612a97573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612abb9190615b95565b90506001600160a01b03811615612b2c576040516310a537f160e11b815263ffffffff851660048201526001600160a01b0382169063214a6fe290602401600060405180830381600087803b158015612b1357600080fd5b505af1158015612b27573d6000803e3d6000fd5b505050505b50508080612b3990615b6a565b915050612a09565b50505050565b612b4f614296565b82801580612b5e575060065481115b15612b7c576040516387e8068360e01b815260040160405180910390fd5b600084815260076020908152604080832080548251630a81a92360e31b815292514295929492936001600160a01b039092169263540d491892600480820193918290030181865afa158015612bd5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bf99190615b95565b90506001600160a01b03811615612c6a576040516310a537f160e11b815263ffffffff841660048201526001600160a01b0382169063214a6fe290602401600060405180830381600087803b158015612c5157600080fd5b505af1158015612c65573d6000803e3d6000fd5b505050505b8415612c7857612c78614370565b60005b600e54811015612ddb576000888152600860205260408120600e80548a93919085908110612cab57612cab615b26565b9060005260206000200160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b0316815260200190815260200160002054600d6000600e8581548110612d0157612d01615b26565b60009182526020808320909101546001600160a01b03168352820192909252604001902060010154612d339190615be2565b612d3d9190615b52565b600d6000600e8481548110612d5457612d54615b26565b60009182526020808320909101546001600160a01b031683528281019390935260409182018120600101939093558a835260089091528120600e80548a93919085908110612da457612da4615b26565b60009182526020808320909101546001600160a01b0316835282019290925260400190205580612dd381615b6a565b915050612c7b565b50867fc0cfd54d2de2b55f1e6e108d3ec53ff0a1abe6055401d32c61e9433b747ef9f887604051612e0e91815260200190565b60405180910390a250505050505050565b6011546001600160a01b03163314612e795760405162461bcd60e51b815260206004820152601760248201527f4e6f74206661726d20626f6f737420636f6e74726163740000000000000000006044820152606401611244565b60008281526009602052604090206002810154612ea95760405163079f151f60e11b815260040160405180910390fd5b60005b600e54811015612efc57612ee982600e8381548110612ecd57612ecd615b26565b60009182526020822001546001600160a01b0316908790613f0c565b5080612ef481615b6a565b915050612eac565b50612f0881848461447d565b505050565b6001600160a01b0382166000908152600d6020526040812060010154819015612f83576001600160a01b0384166000818152600d60208181526040808420600181015489865260088452828620968652958352932054919052600690910154612f769190615bf9565b612f809190615c18565b91505b506001600160a01b039092166000908152600d602052604090206005015491929050565b60006001600160a01b0382166130255760405162461bcd60e51b815260206004820152602d60248201527f456e756d657261626c653a2061646472657373207a65726f206973206e6f742060448201527f612076616c6964206f776e6572000000000000000000000000000000000000006064820152608401611244565b506001600160a01b031660009081526003602052604090205490565b613049614296565b6130536000614e0c565b565b61305d614296565b6001600160a01b0381166130845760405163d92e233d60e01b815260040160405180910390fd5b60005b600e5481101561314057600019600e82815481106130a7576130a7615b26565b600091825260209091200154604051636eb1769f60e11b81526001600160a01b0385811660048301523060248301529091169063dd62ed3e90604401602060405180830381865afa158015613100573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131249190615d8a565b1461312e57600080fd5b8061313881615b6a565b915050613087565b50600f80546001600160a01b0319166001600160a01b0383169081179091556040519081527f4a2963bfc20b87a0c055468a66e6638d57725e93fb4d65733fb2f25587ae8c4f906020016111e3565b60015433906001600160a01b031681146131fd5760405162461bcd60e51b815260206004820152602960248201527f4f776e61626c6532537465703a2063616c6c6572206973206e6f7420746865206044820152683732bb9037bbb732b960b91b6064820152608401611244565b6129be81614e0c565b6001600160a01b0382166000908152600d6020526040812060010154819015612f83576001600160a01b038085166000818152600d602081815260408084206001810154968a168552600c835281852054855260088352818520958552948252909220549152600690910154612f769190615bf9565b600e818154811061328c57600080fd5b6000918252602090912001546001600160a01b0316905081565b6132ae614296565b620151808110806132c1575062278d0081115b156132df57604051634f08daf360e11b815260040160405180910390fd5b60138190556040518181527fb5521c8a03b484502769158d9dd83186bd0748f3ece2fbf358233994c2a20976906020016111e3565b60608167ffffffffffffffff81111561332f5761332f6154f3565b60405190808252806020026020018201604052801561336257816020015b606081526020019060019003908161334d5790505b50905060005b82811015613465576000803086868581811061338657613386615b26565b90506020028101906133989190615e19565b6040516133a6929190615e60565b600060405180830381855af49150503d80600081146133e1576040519150601f19603f3d011682016040523d82523d6000602084013e6133e6565b606091505b509150915081613432576044815110156133ff57600080fd5b600481019050808060200190518101906134199190615e70565b60405162461bcd60e51b81526004016112449190615f04565b8084848151811061344557613445615b26565b60200260200101819052505050808061345d90615b6a565b915050613368565b5092915050565b613474614296565b6001600160a01b03811661349b5760405163d92e233d60e01b815260040160405180910390fd5b601280546001600160a01b0319166001600160a01b0383169081179091556040519081527fc47d127c07bdd56c5ccba00463ce3bd3c1bca71b4670eea6e5d0c02e4aa156e2906020016111e3565b6060600e80548060200260200160405190810160405280929190818152602001828054801561354157602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311613523575b5050505050905090565b613553613eb4565b600081815260096020526040902060028101546135835760405163079f151f60e11b815260040160405180910390fd5b60005b600e548110156135d6576135c382600e83815481106135a7576135a7615b26565b60009182526020822001546001600160a01b0316908690613f0c565b50806135ce81615b6a565b915050613586565b506135e38183600061447d565b506129be6001600255565b6135f6614296565b6001600160a01b03811661361d5760405163d92e233d60e01b815260040160405180910390fd5b601080546001600160a01b0319166001600160a01b0383169081179091556040519081527f29e3e57b4a1e4513d009781598c7e4b8b2a68e4b71fe977e362d1b591016fade906020016111e3565b613673614296565b601180546001600160a01b0319166001600160a01b0383169081179091556040517ff32244aa081c72b930bb47bb702115e112d779ed353d6b1a70b28babc9822b7a90600090a250565b6136c5613eb4565b6040516370a0823160e01b81523060048201526000906001600160a01b038516906370a0823190602401602060405180830381865afa15801561370c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906137309190615d8a565b905060005b600e5481101561382557600e818154811061375257613752615b26565b6000918252602090912001546001600160a01b03868116911614156137d8576001600160a01b0385166000908152600d602052604090206002015482106137b8576001600160a01b0385166000908152600d6020526040902060020154909103906137d8565b6001600160a01b0385166000908152600d60205260408120600201929092555b838210156137f957604051632ca2f52b60e11b815260040160405180910390fd5b8115613813576138136001600160a01b0386168484614e25565b8061381d81615b6a565b915050613735565b5050612f086001600255565b613839613eb4565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156138a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906138c49190615d8a565b9050828110156138e757604051632ca2f52b60e11b815260040160405180910390fd5b801561397157604051632e1a7d4d60e01b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b15801561394f57600080fd5b505af1158015613963573d6000803e3d6000fd5b505050506139718282614e55565b5061397c6001600255565b5050565b613988614296565b600180546001600160a01b0383166001600160a01b031990911681179091556139b96000546001600160a01b031690565b6001600160a01b03167f38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e2270060405160405180910390a350565b6000818152600960209081526040808320815160e08101835281546001600160801b038082168352600160801b90910416938101939093526001810154600281810b9385019390935263010000008104830b6060850152600160301b90046001600160a01b031660808401529081015460a0830181905260039091015460c0830152156134655760a0818101516000908152600760209081526040808320815160c08101835281546001600160a01b039081168083526001840154821683870152600284015491821683860152600160a01b90910462ffffff16606083015260038301546080830152600492830154968201969096528251630a81a92360e31b8152925190959363540d49189380840193919291908290030181865afa158015613b1f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613b439190615b95565b90506001600160a01b03811615613c3357604083810151606085015191516301e72ef560e71b81526001600160a01b038981166004830152600292830b60248301529290910b604482015260009183169063f3977a8090606401602060405180830381865afa158015613bba573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613bde9190615d8a565b6000878152600a602090815260408083206001600160a01b038c16845282529091205490860151919250820390600160801b90613c24906001600160801b031683615bf9565b613c2e9190615c18565b955050505b6000858152600a602090815260408083206001600160a01b038a168452909152902060010154613c639085615b52565b9695505050505050565b6000613c77613eb4565b60008381526009602052604090206001810154600160301b90046001600160a01b03163314613cb9576040516330cd747160e01b815260040160405180910390fd5b80546001600160801b0316158015613cf457506000848152600a602090815260408083206001600160a01b0389168452909152902060010154155b15613d1257604051636180f03f60e11b815260040160405180910390fd5b613d1e81868686613f0c565b915050613d2b6001600255565b9392505050565b600080613d3d613eb4565b825160009081526009602052604090206001810154600160301b90046001600160a01b03163314613d81576040516330cd747160e01b815260040160405180910390fd5b60208401516001600160a01b0316613d9a573060208501525b6040805163fc6f786560e01b81528551600482015260208601516001600160a01b039081166024830152918601516001600160801b03908116604483015260608701511660648201527f00000000000000000000000000000000000000000000000000000000000000009091169063fc6f78659060840160408051808303816000875af1158015613e2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613e539190615c3a565b90935091506115e790506001600255565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600280541415613f065760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401611244565b60028055565b6002848101546000908152600760209081526040808320815160c08101835281546001600160a01b0390811680835260018401548216838701529683015490811682850152600160a01b900462ffffff1660608201526003820154608082015260049182015460a08201528251630a81a92360e31b81529251949590948694919363540d4918938181019392918290030181865afa158015613fb2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613fd69190615b95565b90506001600160a01b03811615801590613ffa5750601154600160a01b900460ff16155b15614165576040516310a537f160e11b815263ffffffff421660048201526001600160a01b0382169063214a6fe290602401600060405180830381600087803b15801561404657600080fd5b505af115801561405a573d6000803e3d6000fd5b5050505060018701546040516301e72ef560e71b81526001600160a01b038881166004830152600283810b6024840152630100000090930490920b604482015260009183169063f3977a8090606401602060405180830381865afa1580156140c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906140ea9190615d8a565b6000878152600a602090815260408083206001600160a01b038c1684529091529020548954919250820390600160801b90614131908290046001600160801b031683615bf9565b61413b9190615c18565b6000888152600a602090815260408083206001600160a01b038d1684529091529020929092555092505b6000858152600a602090815260408083206001600160a01b038a1684529091529020600101546141959084615b52565b92508215614260576001600160a01b03841615614237576000858152600a602090815260408083206001600160a01b038a1684529091528120600101556141dd868585614eb5565b6002870154604080516001600160a01b0387811682528916602082015290810185905286919033907f282b9c6f6d6a6b0d9b4175a3af0be477af589c6cb2d91400d87972ef449876d79060600160405180910390a4614260565b6000858152600a602090815260408083206001600160a01b038a16845290915290206001018390555b5050949350505050565b6142748282614fb3565b506001600160a01b031660009081526003602052604090208054600019019055565b6000546001600160a01b031633146130535760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401611244565b6040516001600160a01b0380851660248301528316604482015260648101829052612b419085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166001600160e01b0319909316929092179091526150cd565b4260015b600654811161397c57600081815260076020908152604080832080548251630a81a92360e31b815292519194936001600160a01b039091169263540d491892600480830193928290030181865afa1580156143d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906143f79190615b95565b90506001600160a01b03811615614468576040516310a537f160e11b815263ffffffff851660048201526001600160a01b0382169063214a6fe290602401600060405180830381600087803b15801561444f57600080fd5b505af1158015614463573d6000803e3d6000fd5b505050505b5050808061447590615b6a565b915050614374565b60008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166399fbab88866040518263ffffffff1660e01b81526004016144d091815260200190565b61018060405180830381865afa1580156144ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906145129190615c8e565b5050505060028e015460009081526007602052604090208e54939b50919950975095506001600160801b03808816911614935061459e9250505057865460038201546001600160801b038085169261456c92911690615be2565b6145769190615b52565b600382015586546fffffffffffffffffffffffffffffffff19166001600160801b0383161787555b60115464e8d4a51000906001600160a01b0316158015906145bd575085155b1561463857601154604051632273df8360e11b8152600481018990526001600160a01b03909116906344e7bf06906024016020604051808303816000875af115801561460d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906146319190615d8a565b9050614641565b85156146415750845b64e8d4a5100081101561465a575064e8d4a51000614671565b6501d1a94a200081111561467157506501d1a94a20005b6003880181905560006146a564e8d4a51000614696846001600160801b038816615bf9565b6146a09190615c18565b6151b5565b89549091506000906146c790600160801b90046001600160801b031683615f17565b905080600f0b60001461499057895460048501546001600160801b03808516926146fc92600160801b90910490911690615be2565b6147069190615b52565b6004808601919091558a546001600160801b03808516600160801b029116178b55845460408051630a81a92360e31b815290516000936001600160a01b039093169263540d4918928082019260209290918290030181865afa158015614770573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906147949190615b95565b90506001600160a01b0381166147bd5760405163ef3d9b2160e01b815260040160405180910390fd5b604051638910faf160e01b8152600289810b600483015288900b6024820152600f83900b60448201526001600160a01b03821690638910faf190606401600060405180830381600087803b15801561481457600080fd5b505af1158015614828573d6000803e3d6000fd5b5050505060005b600e5481101561493d57816001600160a01b031663f3977a80600e838154811061485b5761485b615b26565b60009182526020909120015460405160e083901b6001600160e01b03191681526001600160a01b03909116600482015260028c810b60248301528b900b6044820152606401602060405180830381865afa1580156148bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906148e19190615d8a565b60008c8152600a60205260408120600e80549192918590811061490657614906615b26565b60009182526020808320909101546001600160a01b031683528201929092526040019020558061493581615b6a565b91505061482f565b5060028b81015460408051600f86900b81528b840b6020820152928a900b83820152518c9233917fee8f6362d59839b4b3c990d7e085a63a0fe2c58f4eff4a9a2b6de93a4c645ae39181900360600190a4505b50505050505050505050565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa1580156149e3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614a079190615d8a565b905060005b600e54811015612b4157600e8181548110614a2957614a29615b26565b6000918252602090912001546001600160a01b0385811691161415614aaf576001600160a01b0384166000908152600d60205260409020600201548210614a8f576001600160a01b0384166000908152600d602052604090206002015490910390614aaf565b6001600160a01b0384166000908152600d60205260408120600201929092555b8115614b8c577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316846001600160a01b03161415614b7857604051632e1a7d4d60e01b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b158015614b5157600080fd5b505af1158015614b65573d6000803e3d6000fd5b50505050614b738383614e55565b614b8c565b614b8c6001600160a01b0385168484614e25565b80614b9681615b6a565b915050614a0c565b801580614c185750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa158015614bf2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614c169190615d8a565b155b614c8a5760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401611244565b6040516001600160a01b038316602482015260448101829052612f0890849063095ea7b360e01b90606401614324565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316826001600160a01b0316148015614cfb5750600034115b15614d205780341461397c57604051634b508fef60e01b815260040160405180910390fd5b61397c6001600160a01b0383163330846142f0565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316826001600160a01b0316148015614d765750600034115b15614df8577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316631f9709826040518163ffffffff1660e01b8152600401600060405180830381600087803b158015614dd657600080fd5b505af1158015614dea573d6000803e3d6000fd5b5050505061397c3347614e55565b61397c6001600160a01b0383163383614e25565b600180546001600160a01b03191690556129be81613e64565b6040516001600160a01b038316602482015260448101829052612f0890849063a9059cbb60e01b90606401614324565b6000826001600160a01b03168260405160006040518083038185875af1925050503d8060008114614ea2576040519150601f19603f3d011682016040523d82523d6000602084013e614ea7565b606091505b5050905080612f0857600080fd5b8015612f08576040516370a0823160e01b81523060048201526000906001600160a01b038516906370a0823190602401602060405180830381865afa158015614f02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190614f269190615d8a565b905081811015614f34578091505b6001600160a01b0384166000908152600d60205260409020600201548211614f7d576001600160a01b0384166000908152600d6020526040902060020180548390039055614f9f565b6001600160a01b0384166000908152600d602052604090208282036002909101555b612b416001600160a01b0385168484614e25565b6001600160a01b038216600090815260036020526040812054614fd890600190615be2565b6000838152600560209081526040808320546001600160a01b038816845260048352818420818552909252909120549192509083146150595760405162461bcd60e51b815260206004820152600f60248201527f496e76616c696420746f6b656e496400000000000000000000000000000000006044820152606401611244565b81811461509a576001600160a01b03841660009081526004602090815260408083208584528252808320548484528184208190558352600590915290208190555b5060009182526005602090815260408084208490556001600160a01b039094168352600481528383209183525290812055565b6000615122826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661521e9092919063ffffffff16565b90508051600014806151435750808060200190518101906151439190615f79565b612f085760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401611244565b6000600160801b821061521a5760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20316044820152663238206269747360c81b6064820152608401611244565b5090565b606061522d8484600085615235565b949350505050565b6060824710156152965760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401611244565b600080866001600160a01b031685876040516152b29190615f96565b60006040518083038185875af1925050503d80600081146152ef576040519150601f19603f3d011682016040523d82523d6000602084013e6152f4565b606091505b509150915061530587838387615310565b979650505050505050565b6060831561537c578251615375576001600160a01b0385163b6153755760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401611244565b508161522d565b61522d83838151156153915781518083602001fd5b8060405162461bcd60e51b81526004016112449190615f04565b828054828255906000526020600020908101928215615400579160200282015b8281111561540057825182546001600160a01b0319166001600160a01b039091161782556020909201916001909101906153cb565b5061521a9291505b8082111561521a5760008155600101615408565b6001600160a01b03811681146129be57600080fd5b6000806040838503121561544457600080fd5b8235915060208301356154568161541c565b809150509250929050565b80151581146129be57600080fd5b60006020828403121561548157600080fd5b8135613d2b81615461565b600080600080608085870312156154a257600080fd5b84356154ad8161541c565b9350602085013592506040850135915060608501356154cb81615461565b939692955090935050565b6000602082840312156154e857600080fd5b8135613d2b8161541c565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715615532576155326154f3565b604052919050565b6001600160801b03811681146129be57600080fd5b600060a0828403121561556157600080fd5b60405160a0810181811067ffffffffffffffff82111715615584576155846154f3565b6040528235815260208301356155998161553a565b806020830152506040830135604082015260608301356060820152608083013560808201528091505092915050565b6000608082840312156155da57600080fd5b6040516080810181811067ffffffffffffffff821117156155fd576155fd6154f3565b6040528235815290508060208301356156158161541c565b602082015260408301356156288161553a565b6040820152606083013561563b8161553a565b6060919091015292915050565b60008060a0838503121561565b57600080fd5b61566584846155c8565b915060808301356154568161541c565b60008060008060006080868803121561568d57600080fd5b85356156988161541c565b945060208601356156a88161541c565b935060408601359250606086013567ffffffffffffffff808211156156cc57600080fd5b818801915088601f8301126156e057600080fd5b8135818111156156ef57600080fd5b89602082850101111561570157600080fd5b9699959850939650602001949392505050565b60006020828403121561572657600080fd5b5035919050565b60008060006060848603121561574257600080fd5b8335925060208401356157548161541c565b9150604084013561576481615461565b809150509250925092565b6000602080838503121561578257600080fd5b823567ffffffffffffffff8082111561579a57600080fd5b818501915085601f8301126157ae57600080fd5b8135818111156157c0576157c06154f3565b8060051b91506157d1848301615509565b81815291830184019184810190888411156157eb57600080fd5b938501935b8385101561581557843592506158058361541c565b82825293850193908501906157f0565b98975050505050505050565b600060c0828403121561583357600080fd5b60405160c0810181811067ffffffffffffffff82111715615856576158566154f3565b8060405250823581526020830135602082015260408301356040820152606083013560608201526080830135608082015260a083013560a08201528091505092915050565b600080604083850312156158ae57600080fd5b82356158b98161541c565b946020939093013593505050565b60008083601f8401126158d957600080fd5b50813567ffffffffffffffff8111156158f157600080fd5b6020830191508360208260051b850101111561178957600080fd5b6000806020838503121561591f57600080fd5b823567ffffffffffffffff81111561593657600080fd5b615942858286016158c7565b90969095509350505050565b60008060006060848603121561596357600080fd5b8335925060208401359150604084013561576481615461565b6000806040838503121561598f57600080fd5b50508035926020909101359150565b600080604083850312156159b157600080fd5b82356159bc8161541c565b915060208301356154568161541c565b60005b838110156159e75781810151838201526020016159cf565b83811115612b415750506000910152565b60008151808452615a108160208601602086016159cc565b601f01601f19169290920160200192915050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015615a7957603f19888603018452615a678583516159f8565b94509285019290850190600101615a4b565b5092979650505050505050565b6020808252825182820181905260009190848201906040850190845b81811015615ac75783516001600160a01b031683529284019291840191600101615aa2565b50909695505050505050565b600080600060608486031215615ae857600080fd5b8335615af38161541c565b92506020840135915060408401356157648161541c565b600060808284031215615b1c57600080fd5b613d2b83836155c8565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60008219821115615b6557615b65615b3c565b500190565b6000600019821415615b7e57615b7e615b3c565b5060010190565b8051615b908161541c565b919050565b600060208284031215615ba757600080fd5b8151613d2b8161541c565b600081600f0b6f7fffffffffffffffffffffffffffffff19811415615bd957615bd9615b3c565b60000392915050565b600082821015615bf457615bf4615b3c565b500390565b6000816000190483118215151615615c1357615c13615b3c565b500290565b600082615c3557634e487b7160e01b600052601260045260246000fd5b500490565b60008060408385031215615c4d57600080fd5b505080516020909101519092909150565b805162ffffff81168114615b9057600080fd5b8051600281900b8114615b9057600080fd5b8051615b908161553a565b6000806000806000806000806000806000806101808d8f031215615cb157600080fd5b8c516bffffffffffffffffffffffff81168114615ccd57600080fd5b9b50615cdb60208e01615b85565b9a50615ce960408e01615b85565b9950615cf760608e01615b85565b9850615d0560808e01615c5e565b9750615d1360a08e01615c71565b9650615d2160c08e01615c71565b9550615d2f60e08e01615c83565b94506101008d015193506101208d01519250615d4e6101408e01615c83565b9150615d5d6101608e01615c83565b90509295989b509295989b509295989b565b600060208284031215615d8157600080fd5b613d2b82615c5e565b600060208284031215615d9c57600080fd5b5051919050565b815160009082906020808601845b83811015615dd65781516001600160a01b031685529382019390820190600101615db1565b50929695505050505050565b600080600060608486031215615df757600080fd5b8351615e028161553a565b602085015160409095015190969495509392505050565b6000808335601e19843603018112615e3057600080fd5b83018035915067ffffffffffffffff821115615e4b57600080fd5b60200191503681900382131561178957600080fd5b8183823760009101908152919050565b600060208284031215615e8257600080fd5b815167ffffffffffffffff80821115615e9a57600080fd5b818401915084601f830112615eae57600080fd5b815181811115615ec057615ec06154f3565b615ed3601f8201601f1916602001615509565b9150808252856020828501011115615eea57600080fd5b615efb8160208401602086016159cc565b50949350505050565b602081526000613d2b60208301846159f8565b600081600f0b83600f0b60008112816f7fffffffffffffffffffffffffffffff1901831281151615615f4b57615f4b615b3c565b816f7fffffffffffffffffffffffffffffff018313811615615f6f57615f6f615b3c565b5090039392505050565b600060208284031215615f8b57600080fd5b8151613d2b81615461565b60008251615fa88184602087016159cc565b919091019291505056fea26469706673582212206f0ffa98d21d31c66a8b4f336bfdb9332c57c0dd82845f91b3f9be62bf205d1364736f6c634300080a0033";
var linkReferences$4 = {
};
var deployedLinkReferences$4 = {
};
var alphaHunterV3Abi = {
	_format: _format$4,
	contractName: contractName$4,
	sourceName: sourceName$4,
	abi: abi$4,
	bytecode: bytecode$4,
	deployedBytecode: deployedBytecode$4,
	linkReferences: linkReferences$4,
	deployedLinkReferences: deployedLinkReferences$4
};

var _excluded$1 = ["expectedCurrencyOwed0", "expectedCurrencyOwed1"];
var AlphaHunterV3 = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line
  function AlphaHunterV3() {}
  // Copy from NonfungiblePositionManager
  // Only support increaseLiquidity
  AlphaHunterV3.addCallParameters = function addCallParameters(position, options) {
    !(position.liquidity > ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ZERO_LIQUIDITY') : invariant(false) : void 0;
    var calldatas = [];
    // get amounts
    var _position$mintAmounts = position.mintAmounts,
      amount0Desired = _position$mintAmounts.amount0,
      amount1Desired = _position$mintAmounts.amount1;
    // adjust for slippage
    var minimumAmounts = position.mintAmountsWithSlippage(options.slippageTolerance);
    var amount0Min = toHex(minimumAmounts.amount0);
    var amount1Min = toHex(minimumAmounts.amount1);
    var deadline = toHex(options.deadline);
    !!isMint(options) ? process.env.NODE_ENV !== "production" ? invariant(false, 'NO_MINT_SUPPORT') : invariant(false) : void 0;
    // permits if necessary
    if (options.token0Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token0, options.token0Permit));
    }
    if (options.token1Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token1, options.token1Permit));
    }
    // increase
    calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('increaseLiquidity', [{
      tokenId: toHex(options.tokenId),
      amount0Desired: toHex(amount0Desired),
      amount1Desired: toHex(amount1Desired),
      amount0Min: amount0Min,
      amount1Min: amount1Min,
      deadline: deadline
    }]));
    var value = toHex(0);
    if (options.useNative) {
      var wrapped = options.useNative.wrapped;
      !(position.pool.token0.equals(wrapped) || position.pool.token1.equals(wrapped)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'NO_WIP') : invariant(false) : void 0;
      var wrappedValue = position.pool.token0.equals(wrapped) ? amount0Desired : amount1Desired;
      // we only need to refund if we're actually sending IP
      if (JSBI.greaterThan(wrappedValue, ZERO)) {
        calldatas.push(Payments.encodeRefundIP());
      }
      value = toHex(wrappedValue);
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: value
    };
  }
  // Copy from NonfungiblePositionManager
  ;
  AlphaHunterV3.encodeCollect = function encodeCollect(options) {
    var calldatas = [];
    var tokenId = toHex(options.tokenId);
    var involvesIP = options.expectedCurrencyOwed0.currency.isNative || options.expectedCurrencyOwed1.currency.isNative;
    var recipient = validateAndParseAddress(options.recipient);
    calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('collect', [{
      tokenId: tokenId,
      recipient: involvesIP ? ADDRESS_ZERO : recipient,
      amount0Max: MaxUint128,
      amount1Max: MaxUint128
    }]));
    if (involvesIP) {
      var IPAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed0.quotient : options.expectedCurrencyOwed1.quotient;
      var token = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.currency : options.expectedCurrencyOwed0.currency;
      var tokenAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.quotient : options.expectedCurrencyOwed0.quotient;
      calldatas.push(Payments.encodeUnwrapWIP9(IPAmount, recipient));
      calldatas.push(Payments.encodeSweepToken(token, tokenAmount, recipient));
    }
    return calldatas;
  };
  AlphaHunterV3.collectCallParameters = function collectCallParameters(options) {
    var calldatas = AlphaHunterV3.encodeCollect(options);
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  };
  AlphaHunterV3.removeCallParameters = function removeCallParameters(position, options) {
    var calldatas = [];
    var deadline = toHex(options.deadline);
    var tokenId = toHex(options.tokenId);
    // construct a partial position with a percentage of liquidity
    var partialPosition = new Position({
      pool: position.pool,
      liquidity: options.liquidityPercentage.multiply(position.liquidity).quotient,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper
    });
    !(partialPosition.liquidity > ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ZERO_LIQUIDITY') : invariant(false) : void 0;
    // slippage-adjusted underlying amounts
    // const { amount0: amount0Min, amount1: amount1Min } = partialPosition.burnAmountsWithSlippage(
    //   options.slippageTolerance
    // )
    var amount0Min = JSBI.BigInt(0);
    var amount1Min = JSBI.BigInt(0);
    if (options.permit) {
      calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('permit', [validateAndParseAddress(options.permit.spender), tokenId, toHex(options.permit.deadline), options.permit.v, options.permit.r, options.permit.s]));
    }
    // remove liquidity
    calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('decreaseLiquidity', [{
      tokenId: tokenId,
      liquidity: toHex(partialPosition.liquidity),
      amount0Min: toHex(amount0Min),
      amount1Min: toHex(amount1Min),
      deadline: deadline
    }]));
    var _options$collectOptio = options.collectOptions,
      expectedCurrencyOwed0 = _options$collectOptio.expectedCurrencyOwed0,
      expectedCurrencyOwed1 = _options$collectOptio.expectedCurrencyOwed1,
      rest = _objectWithoutPropertiesLoose(_options$collectOptio, _excluded$1);
    calldatas.push.apply(calldatas, AlphaHunterV3.encodeCollect(_extends({
      tokenId: toHex(options.tokenId),
      // add the underlying value to the expected currency already owed
      expectedCurrencyOwed0: expectedCurrencyOwed0.add(CurrencyAmount.fromRawAmount(expectedCurrencyOwed0.currency, amount0Min)),
      expectedCurrencyOwed1: expectedCurrencyOwed1.add(CurrencyAmount.fromRawAmount(expectedCurrencyOwed1.currency, amount1Min))
    }, rest)));
    // if (rest?.recipient) {
    //   if (options.liquidityPercentage.equalTo(ONE)) {
    //     calldatas.push(
    //       AlphaHunterV3.INTERFACE.encodeFunctionData('withdraw',[tokenId, validateAndParseAddress(rest?.recipient)])
    //     )
    //   } else {
    //     calldatas.push(
    //       AlphaHunterV3.INTERFACE.encodeFunctionData('harvest',[tokenId, validateAndParseAddress(rest?.recipient)])
    //     )
    //   }
    // }
    if (options.liquidityPercentage.equalTo(ONE)) {
      if (options.burnToken) {
        calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('burn', [tokenId]));
      }
    } else {
      !(options.burnToken !== true) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CANNOT_BURN') : invariant(false) : void 0;
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  // public static updateCallParameters() {}
  ;
  AlphaHunterV3.harvestCallParameters = function harvestCallParameters(options) {
    var calldatas = this.encodeHarvest(options);
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  };
  AlphaHunterV3.batchHarvestCallParameters = function batchHarvestCallParameters(options) {
    var _this = this;
    var calldatas = options.map(function (option) {
      return _this.encodeHarvest(option);
    }).flat();
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  };
  AlphaHunterV3.encodeHarvest = function encodeHarvest(options) {
    var tokenId = options.tokenId,
      to = options.to;
    var calldatas = [];
    // harvest pendingHunt
    calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('harvest', [toHex(tokenId), validateAndParseAddress(to)]));
    return calldatas;
  };
  AlphaHunterV3.withdrawCallParameters = function withdrawCallParameters(options) {
    var tokenId = options.tokenId,
      to = options.to;
    var calldatas = [];
    // withdraw liquidity
    calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('withdraw', [toHex(tokenId), validateAndParseAddress(to)]));
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  };
  return AlphaHunterV3;
}();
AlphaHunterV3.ABI = alphaHunterV3Abi;
AlphaHunterV3.INTERFACE = /*#__PURE__*/new Interface(alphaHunterV3Abi.abi);

var _format$5 = "hh-sol-artifact-1";
var contractName$5 = "IQuoter";
var sourceName$5 = "contracts/interfaces/IQuoter.sol";
var abi$5 = [
	{
		inputs: [
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		name: "quoteExactInput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceLimitX96",
				type: "uint160"
			}
		],
		name: "quoteExactInputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			},
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		name: "quoteExactOutput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceLimitX96",
				type: "uint160"
			}
		],
		name: "quoteExactOutputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode$5 = "0x";
var deployedBytecode$5 = "0x";
var linkReferences$5 = {
};
var deployedLinkReferences$5 = {
};
var IQuoter = {
	_format: _format$5,
	contractName: contractName$5,
	sourceName: sourceName$5,
	abi: abi$5,
	bytecode: bytecode$5,
	deployedBytecode: deployedBytecode$5,
	linkReferences: linkReferences$5,
	deployedLinkReferences: deployedLinkReferences$5
};

var _format$6 = "hh-sol-artifact-1";
var contractName$6 = "IQuoterV2";
var sourceName$6 = "contracts/interfaces/IQuoterV2.sol";
var abi$6 = [
	{
		inputs: [
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		name: "quoteExactInput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint160[]",
				name: "sqrtPriceX96AfterList",
				type: "uint160[]"
			},
			{
				internalType: "uint32[]",
				name: "initializedTicksCrossedList",
				type: "uint32[]"
			},
			{
				internalType: "uint256",
				name: "gasEstimate",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "tokenIn",
						type: "address"
					},
					{
						internalType: "address",
						name: "tokenOut",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amountIn",
						type: "uint256"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "uint160",
						name: "sqrtPriceLimitX96",
						type: "uint160"
					}
				],
				internalType: "struct IQuoterV2.QuoteExactInputSingleParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "quoteExactInputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceX96After",
				type: "uint160"
			},
			{
				internalType: "uint32",
				name: "initializedTicksCrossed",
				type: "uint32"
			},
			{
				internalType: "uint256",
				name: "gasEstimate",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			},
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		name: "quoteExactOutput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint160[]",
				name: "sqrtPriceX96AfterList",
				type: "uint160[]"
			},
			{
				internalType: "uint32[]",
				name: "initializedTicksCrossedList",
				type: "uint32[]"
			},
			{
				internalType: "uint256",
				name: "gasEstimate",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "tokenIn",
						type: "address"
					},
					{
						internalType: "address",
						name: "tokenOut",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "uint160",
						name: "sqrtPriceLimitX96",
						type: "uint160"
					}
				],
				internalType: "struct IQuoterV2.QuoteExactOutputSingleParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "quoteExactOutputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceX96After",
				type: "uint160"
			},
			{
				internalType: "uint32",
				name: "initializedTicksCrossed",
				type: "uint32"
			},
			{
				internalType: "uint256",
				name: "gasEstimate",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode$6 = "0x";
var deployedBytecode$6 = "0x";
var linkReferences$6 = {
};
var deployedLinkReferences$6 = {
};
var IQuoterV2 = {
	_format: _format$6,
	contractName: contractName$6,
	sourceName: sourceName$6,
	abi: abi$6,
	bytecode: bytecode$6,
	deployedBytecode: deployedBytecode$6,
	linkReferences: linkReferences$6,
	deployedLinkReferences: deployedLinkReferences$6
};

/**
 * Represents the StoryHunt V3 QuoterV1 contract with a method for returning the formatted
 * calldata needed to call the quoter contract.
 */
var SwapQuoter = /*#__PURE__*/function () {
  function SwapQuoter() {}
  /**
   * Produces the on-chain method name of the appropriate function within QuoterV2,
   * and the relevant hex encoded parameters.
   * @template TInput The input token, either IP or an ERC-20
   * @template TOutput The output token, either IP or an ERC-20
   * @param route The swap route, a list of pools through which a swap can occur
   * @param amount The amount of the quote, either an amount in, or an amount out
   * @param tradeType The trade type, either exact input or exact output
   * @param options The optional params including price limit and Quoter contract switch
   * @returns The formatted calldata
   */
  SwapQuoter.quoteCallParameters = function quoteCallParameters(route, amount, tradeType, options) {
    if (options === void 0) {
      options = {};
    }
    var singleHop = route.pools.length === 1;
    var quoteAmount = toHex(amount.quotient);
    var calldata;
    var swapInterface = options.useQuoterV2 ? this.V2INTERFACE : this.V1INTERFACE;
    if (singleHop) {
      var _options$sqrtPriceLim, _options;
      var baseQuoteParams = {
        tokenIn: route.tokenPath[0].address,
        tokenOut: route.tokenPath[1].address,
        fee: route.pools[0].fee,
        sqrtPriceLimitX96: toHex((_options$sqrtPriceLim = (_options = options) == null ? void 0 : _options.sqrtPriceLimitX96) != null ? _options$sqrtPriceLim : 0)
      };
      var v2QuoteParams = _extends({}, baseQuoteParams, tradeType === TradeType.EXACT_INPUT ? {
        amountIn: quoteAmount
      } : {
        amount: quoteAmount
      });
      var v1QuoteParams = [baseQuoteParams.tokenIn, baseQuoteParams.tokenOut, baseQuoteParams.fee, quoteAmount, baseQuoteParams.sqrtPriceLimitX96];
      var tradeTypeFunctionName = tradeType === TradeType.EXACT_INPUT ? 'quoteExactInputSingle' : 'quoteExactOutputSingle';
      calldata = swapInterface.encodeFunctionData(tradeTypeFunctionName, options.useQuoterV2 ? [v2QuoteParams] : v1QuoteParams);
    } else {
      var _options2;
      !(((_options2 = options) == null ? void 0 : _options2.sqrtPriceLimitX96) === undefined) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MULTIHOP_PRICE_LIMIT') : invariant(false) : void 0;
      var path = encodeRouteToPath(route, tradeType === TradeType.EXACT_OUTPUT);
      var _tradeTypeFunctionName = tradeType === TradeType.EXACT_INPUT ? 'quoteExactInput' : 'quoteExactOutput';
      calldata = swapInterface.encodeFunctionData(_tradeTypeFunctionName, [path, quoteAmount]);
    }
    return {
      calldata: calldata,
      value: toHex(0)
    };
  };
  return SwapQuoter;
}();
SwapQuoter.V1INTERFACE = /*#__PURE__*/new Interface(IQuoter.abi);
SwapQuoter.V2INTERFACE = /*#__PURE__*/new Interface(IQuoterV2.abi);

var _format$7 = "hh-sol-artifact-1";
var contractName$7 = "SwapRouter";
var sourceName$7 = "contracts/SwapRouter.sol";
var abi$7 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "_WIP9",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		name: "WIP9",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "bytes",
						name: "path",
						type: "bytes"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountIn",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOutMinimum",
						type: "uint256"
					}
				],
				internalType: "struct ISwapRouter.ExactInputParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "exactInput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "tokenIn",
						type: "address"
					},
					{
						internalType: "address",
						name: "tokenOut",
						type: "address"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountIn",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOutMinimum",
						type: "uint256"
					},
					{
						internalType: "uint160",
						name: "sqrtPriceLimitX96",
						type: "uint160"
					}
				],
				internalType: "struct ISwapRouter.ExactInputSingleParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "exactInputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "bytes",
						name: "path",
						type: "bytes"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOut",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountInMaximum",
						type: "uint256"
					}
				],
				internalType: "struct ISwapRouter.ExactOutputParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "exactOutput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "tokenIn",
						type: "address"
					},
					{
						internalType: "address",
						name: "tokenOut",
						type: "address"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOut",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountInMaximum",
						type: "uint256"
					},
					{
						internalType: "uint160",
						name: "sqrtPriceLimitX96",
						type: "uint160"
					}
				],
				internalType: "struct ISwapRouter.ExactOutputSingleParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "exactOutputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "refundIP",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermit",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowed",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowedIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "int256",
				name: "amount0Delta",
				type: "int256"
			},
			{
				internalType: "int256",
				name: "amount1Delta",
				type: "int256"
			},
			{
				internalType: "bytes",
				name: "_data",
				type: "bytes"
			}
		],
		name: "storyHuntV3SwapCallback",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "sweepTokenWithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "unwrapWIP9",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "unwrapWIP9WithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
];
var bytecode$7 = "0x60c06040526000196000553480156200001757600080fd5b5060405162003035380380620030358339810160408190526200003a9162000076565b6001600160601b0319606092831b8116608052911b1660a052620000ad565b80516001600160a01b03811681146200007157600080fd5b919050565b6000806040838503121562000089578182fd5b620000948362000059565b9150620000a46020840162000059565b90509250929050565b60805160601c60a05160601c612f2c620001096000398061012f52806108ff5280610b775280610ca1528061118652806112b0528061183e528061189e528061191f5250806105c45280610b375280611e2c5250612f2c6000f3fe6080604052600436106101125760003560e01c8063c2e3140a116100a5578063df2ab5bb11610074578063eff7a11311610059578063eff7a11314610302578063f28c049814610315578063f3995c6714610328576101bd565b8063df2ab5bb146102dc578063e0e189a0146102ef576101bd565b8063c2e3140a1461028e578063c45a0155146102a1578063c654ba70146102b6578063db3e2198146102c9576101bd565b8063a4a78f0c116100e1578063a4a78f0c14610226578063ac9650d814610239578063addc969914610259578063c04b8d591461027b576101bd565b80631f970982146101c2578063414bf389146101ca5780634659a494146101f35780637454f50214610206576101bd565b366101bd573373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146101bb57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f4e6f742057495039000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b005b600080fd5b6101bb61033b565b6101dd6101d83660046129fe565b61034d565b6040516101ea9190612df7565b60405180910390f35b6101bb61020136600461277c565b6104bf565b34801561021257600080fd5b506101bb61022136600461286e565b61057f565b6101bb61023436600461277c565b6106c6565b61024c6102473660046127dc565b6107a3565b6040516101ea9190612cb0565b34801561026557600080fd5b5061026e6108fd565b6040516101ea9190612c3d565b6101dd610289366004612953565b610921565b6101bb61029c36600461277c565b610a80565b3480156102ad57600080fd5b5061026e610b35565b6101bb6102c4366004612b34565b610b59565b6101dd6102d73660046129fe565b610d6f565b6101bb6102ea3660046126dd565b610eff565b6101bb6102fd36600461271e565b61101c565b6101bb610310366004612b05565b611182565b6101dd610323366004612a1a565b611348565b6101bb61033636600461277c565b61147c565b471561034b5761034b3347611514565b565b600081608001358061035d611662565b11156103ca57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b61047060a08401356103e260808601606087016126ba565b6103f3610100870160e088016126ba565b604080518082019091528061040b60208a018a6126ba565b61041b60608b0160408c01612ae2565b61042b60408c0160208d016126ba565b60405160200161043d93929190612bc7565b60405160208183030381529060405281526020013373ffffffffffffffffffffffffffffffffffffffff16815250611666565b91508260c001358210156104b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b090612d78565b60405180910390fd5b50919050565b604080517f8fcbaf0c00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101879052606481018690526001608482015260ff851660a482015260c4810184905260e48101839052905173ffffffffffffffffffffffffffffffffffffffff881691638fcbaf0c9161010480830192600092919082900301818387803b15801561055f57600080fd5b505af1158015610573573d6000803e3d6000fd5b50505050505050505050565b600084138061058e5750600083135b61059757600080fd5b60006105a582840184612a52565b905060008060006105b984600001516117ec565b9250925092506105eb7f000000000000000000000000000000000000000000000000000000000000000084848461181d565b5060008060008a1361062c578473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16108961065d565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16108a5b91509150811561067c57610677858760200151338461183c565b610573565b855161068790611a1a565b156106ac57855161069790611a26565b86526106a68133600089611a61565b50610573565b80600081905550839450610573858760200151338461183c565b604080517fdd62ed3e00000000000000000000000000000000000000000000000000000000815233600482015230602482015290517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9173ffffffffffffffffffffffffffffffffffffffff89169163dd62ed3e91604480820192602092909190829003018186803b15801561075b57600080fd5b505afa15801561076f573d6000803e3d6000fd5b505050506040513d602081101561078557600080fd5b5051101561079b5761079b8686868686866104bf565b505050505050565b60608167ffffffffffffffff811180156107bc57600080fd5b506040519080825280602002602001820160405280156107f057816020015b60608152602001906001900390816107db5790505b50905060005b828110156108f6576000803086868581811061080e57fe5b90506020028101906108209190612e00565b60405161082e929190612c2d565b600060405180830381855af49150503d8060008114610869576040519150601f19603f3d011682016040523d82523d6000602084013e61086e565b606091505b5091509150816108d45760448151101561088757600080fd5b600481019050808060200190518101906108a191906128e9565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b09190612d2e565b808484815181106108e157fe5b602090810291909101015250506001016107f6565b5092915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000816040015180610931611662565b111561099e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b335b60006109af8560000151611a1a565b9050610a088560600151826109c85786602001516109ca565b305b600060405180604001604052806109e48b60000151611c1d565b81526020018773ffffffffffffffffffffffffffffffffffffffff16815250611666565b60608601528015610a28578451309250610a2190611a26565b8552610a35565b8460600151935050610a3b565b506109a0565b8360800151831015610a79576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b090612d78565b5050919050565b604080517fdd62ed3e0000000000000000000000000000000000000000000000000000000081523360048201523060248201529051869173ffffffffffffffffffffffffffffffffffffffff89169163dd62ed3e91604480820192602092909190829003018186803b158015610af557600080fd5b505afa158015610b09573d6000803e3d6000fd5b505050506040513d6020811015610b1f57600080fd5b5051101561079b5761079b86868686868661147c565b7f000000000000000000000000000000000000000000000000000000000000000081565b600082118015610b6a575060648211155b610b7357600080fd5b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610bfc57600080fd5b505afa158015610c10573d6000803e3d6000fd5b505050506040513d6020811015610c2657600080fd5b5051905084811015610c9957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e73756666696369656e742057495039000000000000000000000000000000604482015290519081900360640190fd5b8015610d68577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16632e1a7d4d826040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b158015610d1257600080fd5b505af1158015610d26573d6000803e3d6000fd5b505050506000612710610d428584611c2c90919063ffffffff16565b81610d4957fe5b0490508015610d5c57610d5c8382611514565b61079b85828403611514565b5050505050565b6000816080013580610d7f611662565b1115610dec57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b610e9560a0840135610e0460808601606087016126ba565b610e15610100870160e088016126ba565b6040518060400160405280886020016020810190610e3391906126ba565b610e4360608b0160408c01612ae2565b610e5060208c018c6126ba565b604051602001610e6293929190612bc7565b60405160208183030381529060405281526020013373ffffffffffffffffffffffffffffffffffffffff16815250611a61565b91508260c00135821115610ed5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b090612d41565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600055919050565b60008373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610f6857600080fd5b505afa158015610f7c573d6000803e3d6000fd5b505050506040513d6020811015610f9257600080fd5b505190508281101561100557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f496e73756666696369656e7420746f6b656e0000000000000000000000000000604482015290519081900360640190fd5b801561101657611016848383611c50565b50505050565b60008211801561102d575060648211155b61103657600080fd5b60008573ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561109f57600080fd5b505afa1580156110b3573d6000803e3d6000fd5b505050506040513d60208110156110c957600080fd5b505190508481101561113c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f496e73756666696369656e7420746f6b656e0000000000000000000000000000604482015290519081900360640190fd5b801561079b5760006127106111518386611c2c565b8161115857fe5b049050801561116c5761116c878483611c50565b6111798786838503611c50565b50505050505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561120b57600080fd5b505afa15801561121f573d6000803e3d6000fd5b505050506040513d602081101561123557600080fd5b50519050828110156112a857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e73756666696369656e742057495039000000000000000000000000000000604482015290519081900360640190fd5b8015611343577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16632e1a7d4d826040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561132157600080fd5b505af1158015611335573d6000803e3d6000fd5b505050506113438282611514565b505050565b6000816040013580611358611662565b11156113c557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b61143860608401356113dd60408601602087016126ba565b60408051808201909152600090806113f58980612e00565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050509082525033602090910152611a61565b5060005491508260800135821115610ed5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b090612d41565b604080517fd505accf000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018790526064810186905260ff8516608482015260a4810184905260c48101839052905173ffffffffffffffffffffffffffffffffffffffff88169163d505accf9160e480830192600092919082900301818387803b15801561055f57600080fd5b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff84169083906040518082805190602001908083835b6020831061158b57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0909201916020918201910161154e565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146115ed576040519150601f19603f3d011682016040523d82523d6000602084013e6115f2565b606091505b505090508061134357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600360248201527f5354450000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b4290565b600073ffffffffffffffffffffffffffffffffffffffff8416611687573093505b600080600061169985600001516117ec565b9194509250905073ffffffffffffffffffffffffffffffffffffffff808316908416106000806116ca868686611e25565b73ffffffffffffffffffffffffffffffffffffffff1663128acb088b856116f08f611e63565b73ffffffffffffffffffffffffffffffffffffffff8e1615611712578d611738565b876117315773fffd8963efd1fc6a506488495d951d5263988d25611738565b6401000276a45b8d6040516020016117499190612daf565b6040516020818303038152906040526040518663ffffffff1660e01b8152600401611778959493929190612c5e565b6040805180830381600087803b15801561179157600080fd5b505af11580156117a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117c9919061284b565b91509150826117d857816117da565b805b6000039b9a5050505050505050505050565b600080806117fa8482611e95565b9250611807846014611f95565b9050611814846017611e95565b91509193909250565b60006118338561182e868686612085565b612102565b95945050505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480156118975750804710155b156119e0577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663d0e30db0826040518263ffffffff1660e01b81526004016000604051808303818588803b15801561190457600080fd5b505af1158015611918573d6000803e3d6000fd5b50505050507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156119ae57600080fd5b505af11580156119c2573d6000803e3d6000fd5b505050506040513d60208110156119d857600080fd5b506110169050565b73ffffffffffffffffffffffffffffffffffffffff8316301415611a0e57611a09848383611c50565b611016565b61101684848484612132565b8051604211155b919050565b8051606090611a5b9083906017907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe90161230f565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff8416611a82573093505b6000806000611a9485600001516117ec565b9194509250905073ffffffffffffffffffffffffffffffffffffffff80841690831610600080611ac5858786611e25565b73ffffffffffffffffffffffffffffffffffffffff1663128acb088b85611aeb8f611e63565b60000373ffffffffffffffffffffffffffffffffffffffff8e1615611b10578d611b36565b87611b2f5773fffd8963efd1fc6a506488495d951d5263988d25611b36565b6401000276a45b8d604051602001611b479190612daf565b6040516020818303038152906040526040518663ffffffff1660e01b8152600401611b76959493929190612c5e565b6040805180830381600087803b158015611b8f57600080fd5b505af1158015611ba3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bc7919061284b565b91509150600083611bdc578183600003611be2565b82826000035b909850905073ffffffffffffffffffffffffffffffffffffffff8a16611c0e578b8114611c0e57600080fd5b50505050505050949350505050565b6060611a5b826000602b61230f565b6000821580611c4757505081810281838281611c4457fe5b04145b611a5b57600080fd5b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251825160009485949389169392918291908083835b60208310611d2557805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101611ce8565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611d87576040519150601f19603f3d011682016040523d82523d6000602084013e611d8c565b606091505b5091509150818015611dba575080511580611dba5750808060200190516020811015611db757600080fd5b50515b610d6857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600260248201527f5354000000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000611e5b7f0000000000000000000000000000000000000000000000000000000000000000611e56868686612085565b6124f6565b949350505050565b60007f80000000000000000000000000000000000000000000000000000000000000008210611e9157600080fd5b5090565b600081826014011015611f0957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f746f416464726573735f6f766572666c6f770000000000000000000000000000604482015290519081900360640190fd5b8160140183511015611f7c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f746f416464726573735f6f75744f66426f756e64730000000000000000000000604482015290519081900360640190fd5b5001602001516c01000000000000000000000000900490565b60008182600301101561200957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f746f55696e7432345f6f766572666c6f77000000000000000000000000000000604482015290519081900360640190fd5b816003018351101561207c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f746f55696e7432345f6f75744f66426f756e6473000000000000000000000000604482015290519081900360640190fd5b50016003015190565b61208d61262c565b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1611156120c5579192915b506040805160608101825273ffffffffffffffffffffffffffffffffffffffff948516815292909316602083015262ffffff169181019190915290565b600061210e83836124f6565b90503373ffffffffffffffffffffffffffffffffffffffff821614611a5b57600080fd5b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd00000000000000000000000000000000000000000000000000000000178152925182516000948594938a169392918291908083835b6020831061220f57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe090920191602091820191016121d2565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114612271576040519150601f19603f3d011682016040523d82523d6000602084013e612276565b606091505b50915091508180156122a45750805115806122a457508080602001905160208110156122a157600080fd5b50515b61079b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600360248201527f5354460000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b60608182601f01101561238357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f736c6963655f6f766572666c6f77000000000000000000000000000000000000604482015290519081900360640190fd5b8282840110156123f457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f736c6963655f6f766572666c6f77000000000000000000000000000000000000604482015290519081900360640190fd5b8183018451101561246657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f736c6963655f6f75744f66426f756e6473000000000000000000000000000000604482015290519081900360640190fd5b60608215801561248557604051915060008252602082016040526124ed565b6040519150601f8416801560200281840101858101878315602002848b0101015b818310156124be5780518352602092830192016124a6565b5050858452601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016604052505b50949350505050565b6000816020015173ffffffffffffffffffffffffffffffffffffffff16826000015173ffffffffffffffffffffffffffffffffffffffff161061253857600080fd5b508051602080830151604093840151845173ffffffffffffffffffffffffffffffffffffffff94851681850152939091168385015262ffffff166060808401919091528351808403820181526080840185528051908301207fff0000000000000000000000000000000000000000000000000000000000000060a085015294901b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660a183015260b58201939093527f5cea2eb9879ca53b37c03e28e630340a0e2b1575e3df2ba4b38a11af3946ac9260d5808301919091528251808303909101815260f5909101909152805191012090565b604080516060810182526000808252602082018190529181019190915290565b8035611a2181612efa565b600082601f830112612667578081fd5b813561267a61267582612e8e565b612e6a565b81815284602083860101111561268e578283fd5b816020850160208301379081016020019190915292915050565b600061010082840312156104b9578081fd5b6000602082840312156126cb578081fd5b81356126d681612efa565b9392505050565b6000806000606084860312156126f1578182fd5b83356126fc81612efa565b925060208401359150604084013561271381612efa565b809150509250925092565b600080600080600060a08688031215612735578081fd5b853561274081612efa565b945060208601359350604086013561275781612efa565b925060608601359150608086013561276e81612efa565b809150509295509295909350565b60008060008060008060c08789031215612794578081fd5b863561279f81612efa565b95506020870135945060408701359350606087013560ff811681146127c2578182fd5b9598949750929560808101359460a0909101359350915050565b600080602083850312156127ee578182fd5b823567ffffffffffffffff80821115612805578384fd5b818501915085601f830112612818578384fd5b813581811115612826578485fd5b8660208083028501011115612839578485fd5b60209290920196919550909350505050565b6000806040838503121561285d578182fd5b505080516020909101519092909150565b60008060008060608587031215612883578182fd5b8435935060208501359250604085013567ffffffffffffffff808211156128a8578384fd5b818701915087601f8301126128bb578384fd5b8135818111156128c9578485fd5b8860208285010111156128da578485fd5b95989497505060200194505050565b6000602082840312156128fa578081fd5b815167ffffffffffffffff811115612910578182fd5b8201601f81018413612920578182fd5b805161292e61267582612e8e565b818152856020838501011115612942578384fd5b611833826020830160208601612ece565b600060208284031215612964578081fd5b813567ffffffffffffffff8082111561297b578283fd5b9083019060a0828603121561298e578283fd5b60405160a0810181811083821117156129a357fe5b6040528235828111156129b4578485fd5b6129c087828601612657565b8252506129cf6020840161264c565b602082015260408301356040820152606083013560608201526080830135608082015280935050505092915050565b60006101008284031215612a10578081fd5b6126d683836126a8565b600060208284031215612a2b578081fd5b813567ffffffffffffffff811115612a41578182fd5b820160a081850312156126d6578182fd5b600060208284031215612a63578081fd5b813567ffffffffffffffff80821115612a7a578283fd5b9083019060408286031215612a8d578283fd5b604051604081018181108382111715612aa257fe5b604052823582811115612ab3578485fd5b612abf87828601612657565b82525060208301359250612ad283612efa565b6020810192909252509392505050565b600060208284031215612af3578081fd5b813562ffffff811681146126d6578182fd5b60008060408385031215612b17578182fd5b823591506020830135612b2981612efa565b809150509250929050565b60008060008060808587031215612b49578182fd5b843593506020850135612b5b81612efa565b9250604085013591506060850135612b7281612efa565b939692955090935050565b60008151808452612b95816020860160208601612ece565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b606093841b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000908116825260e89390931b7fffffff0000000000000000000000000000000000000000000000000000000000166014820152921b166017820152602b0190565b6000828483379101908152919050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b600073ffffffffffffffffffffffffffffffffffffffff8088168352861515602084015285604084015280851660608401525060a06080830152612ca560a0830184612b7d565b979650505050505050565b6000602080830181845280855180835260408601915060408482028701019250838701855b82811015612d21577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0888603018452612d0f858351612b7d565b94509285019290850190600101612cd5565b5092979650505050505050565b6000602082526126d66020830184612b7d565b60208082526012908201527f546f6f206d756368207265717565737465640000000000000000000000000000604082015260600190565b60208082526013908201527f546f6f206c6974746c6520726563656976656400000000000000000000000000604082015260600190565b600060208252825160406020840152612dcb6060840182612b7d565b905073ffffffffffffffffffffffffffffffffffffffff60208501511660408401528091505092915050565b90815260200190565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112612e34578283fd5b83018035915067ffffffffffffffff821115612e4e578283fd5b602001915036819003821315612e6357600080fd5b9250929050565b60405181810167ffffffffffffffff81118282101715612e8657fe5b604052919050565b600067ffffffffffffffff821115612ea257fe5b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b60005b83811015612ee9578181015183820152602001612ed1565b838111156110165750506000910152565b73ffffffffffffffffffffffffffffffffffffffff81168114612f1c57600080fd5b5056fea164736f6c6343000706000a";
var deployedBytecode$7 = "0x6080604052600436106101125760003560e01c8063c2e3140a116100a5578063df2ab5bb11610074578063eff7a11311610059578063eff7a11314610302578063f28c049814610315578063f3995c6714610328576101bd565b8063df2ab5bb146102dc578063e0e189a0146102ef576101bd565b8063c2e3140a1461028e578063c45a0155146102a1578063c654ba70146102b6578063db3e2198146102c9576101bd565b8063a4a78f0c116100e1578063a4a78f0c14610226578063ac9650d814610239578063addc969914610259578063c04b8d591461027b576101bd565b80631f970982146101c2578063414bf389146101ca5780634659a494146101f35780637454f50214610206576101bd565b366101bd573373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146101bb57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f4e6f742057495039000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b005b600080fd5b6101bb61033b565b6101dd6101d83660046129fe565b61034d565b6040516101ea9190612df7565b60405180910390f35b6101bb61020136600461277c565b6104bf565b34801561021257600080fd5b506101bb61022136600461286e565b61057f565b6101bb61023436600461277c565b6106c6565b61024c6102473660046127dc565b6107a3565b6040516101ea9190612cb0565b34801561026557600080fd5b5061026e6108fd565b6040516101ea9190612c3d565b6101dd610289366004612953565b610921565b6101bb61029c36600461277c565b610a80565b3480156102ad57600080fd5b5061026e610b35565b6101bb6102c4366004612b34565b610b59565b6101dd6102d73660046129fe565b610d6f565b6101bb6102ea3660046126dd565b610eff565b6101bb6102fd36600461271e565b61101c565b6101bb610310366004612b05565b611182565b6101dd610323366004612a1a565b611348565b6101bb61033636600461277c565b61147c565b471561034b5761034b3347611514565b565b600081608001358061035d611662565b11156103ca57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b61047060a08401356103e260808601606087016126ba565b6103f3610100870160e088016126ba565b604080518082019091528061040b60208a018a6126ba565b61041b60608b0160408c01612ae2565b61042b60408c0160208d016126ba565b60405160200161043d93929190612bc7565b60405160208183030381529060405281526020013373ffffffffffffffffffffffffffffffffffffffff16815250611666565b91508260c001358210156104b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b090612d78565b60405180910390fd5b50919050565b604080517f8fcbaf0c00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101879052606481018690526001608482015260ff851660a482015260c4810184905260e48101839052905173ffffffffffffffffffffffffffffffffffffffff881691638fcbaf0c9161010480830192600092919082900301818387803b15801561055f57600080fd5b505af1158015610573573d6000803e3d6000fd5b50505050505050505050565b600084138061058e5750600083135b61059757600080fd5b60006105a582840184612a52565b905060008060006105b984600001516117ec565b9250925092506105eb7f000000000000000000000000000000000000000000000000000000000000000084848461181d565b5060008060008a1361062c578473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16108961065d565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16108a5b91509150811561067c57610677858760200151338461183c565b610573565b855161068790611a1a565b156106ac57855161069790611a26565b86526106a68133600089611a61565b50610573565b80600081905550839450610573858760200151338461183c565b604080517fdd62ed3e00000000000000000000000000000000000000000000000000000000815233600482015230602482015290517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9173ffffffffffffffffffffffffffffffffffffffff89169163dd62ed3e91604480820192602092909190829003018186803b15801561075b57600080fd5b505afa15801561076f573d6000803e3d6000fd5b505050506040513d602081101561078557600080fd5b5051101561079b5761079b8686868686866104bf565b505050505050565b60608167ffffffffffffffff811180156107bc57600080fd5b506040519080825280602002602001820160405280156107f057816020015b60608152602001906001900390816107db5790505b50905060005b828110156108f6576000803086868581811061080e57fe5b90506020028101906108209190612e00565b60405161082e929190612c2d565b600060405180830381855af49150503d8060008114610869576040519150601f19603f3d011682016040523d82523d6000602084013e61086e565b606091505b5091509150816108d45760448151101561088757600080fd5b600481019050808060200190518101906108a191906128e9565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b09190612d2e565b808484815181106108e157fe5b602090810291909101015250506001016107f6565b5092915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000816040015180610931611662565b111561099e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b335b60006109af8560000151611a1a565b9050610a088560600151826109c85786602001516109ca565b305b600060405180604001604052806109e48b60000151611c1d565b81526020018773ffffffffffffffffffffffffffffffffffffffff16815250611666565b60608601528015610a28578451309250610a2190611a26565b8552610a35565b8460600151935050610a3b565b506109a0565b8360800151831015610a79576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b090612d78565b5050919050565b604080517fdd62ed3e0000000000000000000000000000000000000000000000000000000081523360048201523060248201529051869173ffffffffffffffffffffffffffffffffffffffff89169163dd62ed3e91604480820192602092909190829003018186803b158015610af557600080fd5b505afa158015610b09573d6000803e3d6000fd5b505050506040513d6020811015610b1f57600080fd5b5051101561079b5761079b86868686868661147c565b7f000000000000000000000000000000000000000000000000000000000000000081565b600082118015610b6a575060648211155b610b7357600080fd5b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610bfc57600080fd5b505afa158015610c10573d6000803e3d6000fd5b505050506040513d6020811015610c2657600080fd5b5051905084811015610c9957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e73756666696369656e742057495039000000000000000000000000000000604482015290519081900360640190fd5b8015610d68577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16632e1a7d4d826040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b158015610d1257600080fd5b505af1158015610d26573d6000803e3d6000fd5b505050506000612710610d428584611c2c90919063ffffffff16565b81610d4957fe5b0490508015610d5c57610d5c8382611514565b61079b85828403611514565b5050505050565b6000816080013580610d7f611662565b1115610dec57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b610e9560a0840135610e0460808601606087016126ba565b610e15610100870160e088016126ba565b6040518060400160405280886020016020810190610e3391906126ba565b610e4360608b0160408c01612ae2565b610e5060208c018c6126ba565b604051602001610e6293929190612bc7565b60405160208183030381529060405281526020013373ffffffffffffffffffffffffffffffffffffffff16815250611a61565b91508260c00135821115610ed5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b090612d41565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600055919050565b60008373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610f6857600080fd5b505afa158015610f7c573d6000803e3d6000fd5b505050506040513d6020811015610f9257600080fd5b505190508281101561100557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f496e73756666696369656e7420746f6b656e0000000000000000000000000000604482015290519081900360640190fd5b801561101657611016848383611c50565b50505050565b60008211801561102d575060648211155b61103657600080fd5b60008573ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561109f57600080fd5b505afa1580156110b3573d6000803e3d6000fd5b505050506040513d60208110156110c957600080fd5b505190508481101561113c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f496e73756666696369656e7420746f6b656e0000000000000000000000000000604482015290519081900360640190fd5b801561079b5760006127106111518386611c2c565b8161115857fe5b049050801561116c5761116c878483611c50565b6111798786838503611c50565b50505050505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561120b57600080fd5b505afa15801561121f573d6000803e3d6000fd5b505050506040513d602081101561123557600080fd5b50519050828110156112a857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e73756666696369656e742057495039000000000000000000000000000000604482015290519081900360640190fd5b8015611343577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16632e1a7d4d826040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561132157600080fd5b505af1158015611335573d6000803e3d6000fd5b505050506113438282611514565b505050565b6000816040013580611358611662565b11156113c557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f5472616e73616374696f6e20746f6f206f6c6400000000000000000000000000604482015290519081900360640190fd5b61143860608401356113dd60408601602087016126ba565b60408051808201909152600090806113f58980612e00565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050509082525033602090910152611a61565b5060005491508260800135821115610ed5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b090612d41565b604080517fd505accf000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018790526064810186905260ff8516608482015260a4810184905260c48101839052905173ffffffffffffffffffffffffffffffffffffffff88169163d505accf9160e480830192600092919082900301818387803b15801561055f57600080fd5b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff84169083906040518082805190602001908083835b6020831061158b57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0909201916020918201910161154e565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146115ed576040519150601f19603f3d011682016040523d82523d6000602084013e6115f2565b606091505b505090508061134357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600360248201527f5354450000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b4290565b600073ffffffffffffffffffffffffffffffffffffffff8416611687573093505b600080600061169985600001516117ec565b9194509250905073ffffffffffffffffffffffffffffffffffffffff808316908416106000806116ca868686611e25565b73ffffffffffffffffffffffffffffffffffffffff1663128acb088b856116f08f611e63565b73ffffffffffffffffffffffffffffffffffffffff8e1615611712578d611738565b876117315773fffd8963efd1fc6a506488495d951d5263988d25611738565b6401000276a45b8d6040516020016117499190612daf565b6040516020818303038152906040526040518663ffffffff1660e01b8152600401611778959493929190612c5e565b6040805180830381600087803b15801561179157600080fd5b505af11580156117a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117c9919061284b565b91509150826117d857816117da565b805b6000039b9a5050505050505050505050565b600080806117fa8482611e95565b9250611807846014611f95565b9050611814846017611e95565b91509193909250565b60006118338561182e868686612085565b612102565b95945050505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480156118975750804710155b156119e0577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663d0e30db0826040518263ffffffff1660e01b81526004016000604051808303818588803b15801561190457600080fd5b505af1158015611918573d6000803e3d6000fd5b50505050507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156119ae57600080fd5b505af11580156119c2573d6000803e3d6000fd5b505050506040513d60208110156119d857600080fd5b506110169050565b73ffffffffffffffffffffffffffffffffffffffff8316301415611a0e57611a09848383611c50565b611016565b61101684848484612132565b8051604211155b919050565b8051606090611a5b9083906017907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe90161230f565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff8416611a82573093505b6000806000611a9485600001516117ec565b9194509250905073ffffffffffffffffffffffffffffffffffffffff80841690831610600080611ac5858786611e25565b73ffffffffffffffffffffffffffffffffffffffff1663128acb088b85611aeb8f611e63565b60000373ffffffffffffffffffffffffffffffffffffffff8e1615611b10578d611b36565b87611b2f5773fffd8963efd1fc6a506488495d951d5263988d25611b36565b6401000276a45b8d604051602001611b479190612daf565b6040516020818303038152906040526040518663ffffffff1660e01b8152600401611b76959493929190612c5e565b6040805180830381600087803b158015611b8f57600080fd5b505af1158015611ba3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bc7919061284b565b91509150600083611bdc578183600003611be2565b82826000035b909850905073ffffffffffffffffffffffffffffffffffffffff8a16611c0e578b8114611c0e57600080fd5b50505050505050949350505050565b6060611a5b826000602b61230f565b6000821580611c4757505081810281838281611c4457fe5b04145b611a5b57600080fd5b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251825160009485949389169392918291908083835b60208310611d2557805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101611ce8565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611d87576040519150601f19603f3d011682016040523d82523d6000602084013e611d8c565b606091505b5091509150818015611dba575080511580611dba5750808060200190516020811015611db757600080fd5b50515b610d6857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600260248201527f5354000000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000611e5b7f0000000000000000000000000000000000000000000000000000000000000000611e56868686612085565b6124f6565b949350505050565b60007f80000000000000000000000000000000000000000000000000000000000000008210611e9157600080fd5b5090565b600081826014011015611f0957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f746f416464726573735f6f766572666c6f770000000000000000000000000000604482015290519081900360640190fd5b8160140183511015611f7c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f746f416464726573735f6f75744f66426f756e64730000000000000000000000604482015290519081900360640190fd5b5001602001516c01000000000000000000000000900490565b60008182600301101561200957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f746f55696e7432345f6f766572666c6f77000000000000000000000000000000604482015290519081900360640190fd5b816003018351101561207c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f746f55696e7432345f6f75744f66426f756e6473000000000000000000000000604482015290519081900360640190fd5b50016003015190565b61208d61262c565b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1611156120c5579192915b506040805160608101825273ffffffffffffffffffffffffffffffffffffffff948516815292909316602083015262ffffff169181019190915290565b600061210e83836124f6565b90503373ffffffffffffffffffffffffffffffffffffffff821614611a5b57600080fd5b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd00000000000000000000000000000000000000000000000000000000178152925182516000948594938a169392918291908083835b6020831061220f57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe090920191602091820191016121d2565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114612271576040519150601f19603f3d011682016040523d82523d6000602084013e612276565b606091505b50915091508180156122a45750805115806122a457508080602001905160208110156122a157600080fd5b50515b61079b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600360248201527f5354460000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b60608182601f01101561238357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f736c6963655f6f766572666c6f77000000000000000000000000000000000000604482015290519081900360640190fd5b8282840110156123f457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f736c6963655f6f766572666c6f77000000000000000000000000000000000000604482015290519081900360640190fd5b8183018451101561246657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f736c6963655f6f75744f66426f756e6473000000000000000000000000000000604482015290519081900360640190fd5b60608215801561248557604051915060008252602082016040526124ed565b6040519150601f8416801560200281840101858101878315602002848b0101015b818310156124be5780518352602092830192016124a6565b5050858452601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016604052505b50949350505050565b6000816020015173ffffffffffffffffffffffffffffffffffffffff16826000015173ffffffffffffffffffffffffffffffffffffffff161061253857600080fd5b508051602080830151604093840151845173ffffffffffffffffffffffffffffffffffffffff94851681850152939091168385015262ffffff166060808401919091528351808403820181526080840185528051908301207fff0000000000000000000000000000000000000000000000000000000000000060a085015294901b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660a183015260b58201939093527f5cea2eb9879ca53b37c03e28e630340a0e2b1575e3df2ba4b38a11af3946ac9260d5808301919091528251808303909101815260f5909101909152805191012090565b604080516060810182526000808252602082018190529181019190915290565b8035611a2181612efa565b600082601f830112612667578081fd5b813561267a61267582612e8e565b612e6a565b81815284602083860101111561268e578283fd5b816020850160208301379081016020019190915292915050565b600061010082840312156104b9578081fd5b6000602082840312156126cb578081fd5b81356126d681612efa565b9392505050565b6000806000606084860312156126f1578182fd5b83356126fc81612efa565b925060208401359150604084013561271381612efa565b809150509250925092565b600080600080600060a08688031215612735578081fd5b853561274081612efa565b945060208601359350604086013561275781612efa565b925060608601359150608086013561276e81612efa565b809150509295509295909350565b60008060008060008060c08789031215612794578081fd5b863561279f81612efa565b95506020870135945060408701359350606087013560ff811681146127c2578182fd5b9598949750929560808101359460a0909101359350915050565b600080602083850312156127ee578182fd5b823567ffffffffffffffff80821115612805578384fd5b818501915085601f830112612818578384fd5b813581811115612826578485fd5b8660208083028501011115612839578485fd5b60209290920196919550909350505050565b6000806040838503121561285d578182fd5b505080516020909101519092909150565b60008060008060608587031215612883578182fd5b8435935060208501359250604085013567ffffffffffffffff808211156128a8578384fd5b818701915087601f8301126128bb578384fd5b8135818111156128c9578485fd5b8860208285010111156128da578485fd5b95989497505060200194505050565b6000602082840312156128fa578081fd5b815167ffffffffffffffff811115612910578182fd5b8201601f81018413612920578182fd5b805161292e61267582612e8e565b818152856020838501011115612942578384fd5b611833826020830160208601612ece565b600060208284031215612964578081fd5b813567ffffffffffffffff8082111561297b578283fd5b9083019060a0828603121561298e578283fd5b60405160a0810181811083821117156129a357fe5b6040528235828111156129b4578485fd5b6129c087828601612657565b8252506129cf6020840161264c565b602082015260408301356040820152606083013560608201526080830135608082015280935050505092915050565b60006101008284031215612a10578081fd5b6126d683836126a8565b600060208284031215612a2b578081fd5b813567ffffffffffffffff811115612a41578182fd5b820160a081850312156126d6578182fd5b600060208284031215612a63578081fd5b813567ffffffffffffffff80821115612a7a578283fd5b9083019060408286031215612a8d578283fd5b604051604081018181108382111715612aa257fe5b604052823582811115612ab3578485fd5b612abf87828601612657565b82525060208301359250612ad283612efa565b6020810192909252509392505050565b600060208284031215612af3578081fd5b813562ffffff811681146126d6578182fd5b60008060408385031215612b17578182fd5b823591506020830135612b2981612efa565b809150509250929050565b60008060008060808587031215612b49578182fd5b843593506020850135612b5b81612efa565b9250604085013591506060850135612b7281612efa565b939692955090935050565b60008151808452612b95816020860160208601612ece565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b606093841b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000908116825260e89390931b7fffffff0000000000000000000000000000000000000000000000000000000000166014820152921b166017820152602b0190565b6000828483379101908152919050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b600073ffffffffffffffffffffffffffffffffffffffff8088168352861515602084015285604084015280851660608401525060a06080830152612ca560a0830184612b7d565b979650505050505050565b6000602080830181845280855180835260408601915060408482028701019250838701855b82811015612d21577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0888603018452612d0f858351612b7d565b94509285019290850190600101612cd5565b5092979650505050505050565b6000602082526126d66020830184612b7d565b60208082526012908201527f546f6f206d756368207265717565737465640000000000000000000000000000604082015260600190565b60208082526013908201527f546f6f206c6974746c6520726563656976656400000000000000000000000000604082015260600190565b600060208252825160406020840152612dcb6060840182612b7d565b905073ffffffffffffffffffffffffffffffffffffffff60208501511660408401528091505092915050565b90815260200190565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112612e34578283fd5b83018035915067ffffffffffffffff821115612e4e578283fd5b602001915036819003821315612e6357600080fd5b9250929050565b60405181810167ffffffffffffffff81118282101715612e8657fe5b604052919050565b600067ffffffffffffffff821115612ea257fe5b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b60005b83811015612ee9578181015183820152602001612ed1565b838111156110165750506000910152565b73ffffffffffffffffffffffffffffffffffffffff81168114612f1c57600080fd5b5056fea164736f6c6343000706000a";
var linkReferences$7 = {
};
var deployedLinkReferences$7 = {
};
var ISwapRouter = {
	_format: _format$7,
	contractName: contractName$7,
	sourceName: sourceName$7,
	abi: abi$7,
	bytecode: bytecode$7,
	deployedBytecode: deployedBytecode$7,
	linkReferences: linkReferences$7,
	deployedLinkReferences: deployedLinkReferences$7
};

/**
 * Represents the StoryHunt V3 SwapRouter, and has static methods for helping execute trades.
 */
var SwapRouter = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SwapRouter() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  SwapRouter.swapCallParameters = function swapCallParameters(trades, options) {
    if (!Array.isArray(trades)) {
      trades = [trades];
    }
    var sampleTrade = trades[0];
    var tokenIn = sampleTrade.inputAmount.currency.wrapped;
    var tokenOut = sampleTrade.outputAmount.currency.wrapped;
    // All trades should have the same starting and ending token.
    !trades.every(function (trade) {
      return trade.inputAmount.currency.wrapped.equals(tokenIn);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN_IN_DIFF') : invariant(false) : void 0;
    !trades.every(function (trade) {
      return trade.outputAmount.currency.wrapped.equals(tokenOut);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN_OUT_DIFF') : invariant(false) : void 0;
    var calldatas = [];
    var ZERO_IN = CurrencyAmount.fromRawAmount(trades[0].inputAmount.currency, 0);
    var ZERO_OUT = CurrencyAmount.fromRawAmount(trades[0].outputAmount.currency, 0);
    var totalAmountOut = trades.reduce(function (sum, trade) {
      return sum.add(trade.minimumAmountOut(options.slippageTolerance));
    }, ZERO_OUT);
    // flag for whether a refund needs to happen
    var mustRefund = sampleTrade.inputAmount.currency.isNative && sampleTrade.tradeType === TradeType.EXACT_OUTPUT;
    var inputIsNative = sampleTrade.inputAmount.currency.isNative;
    // flags for whether funds should be send first to the router
    var outputIsNative = sampleTrade.outputAmount.currency.isNative;
    var routerMustCustody = outputIsNative || !!options.fee;
    var totalValue = inputIsNative ? trades.reduce(function (sum, trade) {
      return sum.add(trade.maximumAmountIn(options.slippageTolerance));
    }, ZERO_IN) : ZERO_IN;
    // encode permit if necessary
    if (options.inputTokenPermit) {
      !sampleTrade.inputAmount.currency.isToken ? process.env.NODE_ENV !== "production" ? invariant(false, 'NON_TOKEN_PERMIT') : invariant(false) : void 0;
      calldatas.push(SelfPermit.encodePermit(sampleTrade.inputAmount.currency, options.inputTokenPermit));
    }
    var recipient = validateAndParseAddress(options.recipient);
    var deadline = toHex(options.deadline);
    for (var _iterator = _createForOfIteratorHelperLoose(trades), _step; !(_step = _iterator()).done;) {
      var trade = _step.value;
      for (var _iterator2 = _createForOfIteratorHelperLoose(trade.swaps), _step2; !(_step2 = _iterator2()).done;) {
        var _step2$value = _step2.value,
          route = _step2$value.route,
          inputAmount = _step2$value.inputAmount,
          outputAmount = _step2$value.outputAmount;
        var amountIn = toHex(trade.maximumAmountIn(options.slippageTolerance, inputAmount).quotient);
        var amountOut = toHex(trade.minimumAmountOut(options.slippageTolerance, outputAmount).quotient);
        // flag for whether the trade is single hop or not
        var singleHop = route.pools.length === 1;
        if (singleHop) {
          if (trade.tradeType === TradeType.EXACT_INPUT) {
            var _options$sqrtPriceLim;
            var exactInputSingleParams = {
              tokenIn: route.tokenPath[0].address,
              tokenOut: route.tokenPath[1].address,
              fee: route.pools[0].fee,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline: deadline,
              amountIn: amountIn,
              amountOutMinimum: amountOut,
              sqrtPriceLimitX96: toHex((_options$sqrtPriceLim = options.sqrtPriceLimitX96) != null ? _options$sqrtPriceLim : 0)
            };
            calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactInputSingle', [exactInputSingleParams]));
          } else {
            var _options$sqrtPriceLim2;
            var exactOutputSingleParams = {
              tokenIn: route.tokenPath[0].address,
              tokenOut: route.tokenPath[1].address,
              fee: route.pools[0].fee,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline: deadline,
              amountOut: amountOut,
              amountInMaximum: amountIn,
              sqrtPriceLimitX96: toHex((_options$sqrtPriceLim2 = options.sqrtPriceLimitX96) != null ? _options$sqrtPriceLim2 : 0)
            };
            calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactOutputSingle', [exactOutputSingleParams]));
          }
        } else {
          !(options.sqrtPriceLimitX96 === undefined) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MULTIHOP_PRICE_LIMIT') : invariant(false) : void 0;
          var path = encodeRouteToPath(route, trade.tradeType === TradeType.EXACT_OUTPUT);
          if (trade.tradeType === TradeType.EXACT_INPUT) {
            var exactInputParams = {
              path: path,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline: deadline,
              amountIn: amountIn,
              amountOutMinimum: amountOut
            };
            calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactInput', [exactInputParams]));
          } else {
            var exactOutputParams = {
              path: path,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline: deadline,
              amountOut: amountOut,
              amountInMaximum: amountIn
            };
            calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactOutput', [exactOutputParams]));
          }
        }
      }
    }
    // unwrap
    if (routerMustCustody) {
      if (!!options.fee) {
        if (outputIsNative) {
          calldatas.push(Payments.encodeUnwrapWIP9(totalAmountOut.quotient, recipient, options.fee));
        } else {
          calldatas.push(Payments.encodeSweepToken(sampleTrade.outputAmount.currency.wrapped, totalAmountOut.quotient, recipient, options.fee));
        }
      } else {
        calldatas.push(Payments.encodeUnwrapWIP9(totalAmountOut.quotient, recipient));
      }
    }
    // refund
    if (mustRefund) {
      calldatas.push(Payments.encodeRefundIP());
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(totalValue.quotient)
    };
  };
  return SwapRouter;
}();
SwapRouter.INTERFACE = /*#__PURE__*/new Interface(ISwapRouter.abi);

export { ADDRESS_ZERO, AlphaHunterV3, DEPLOYER_ADDRESS, FACTORY_ADDRESS, FeeAmount, FullMath, LiquidityMath, MaxUint128, Multicall, NoTickDataProvider, NonfungiblePositionManager, POOL_INIT_CODE_HASH, Payments, Pool, Position, PositionLibrary, Route, SelfPermit, SqrtPriceMath, SwapMath, SwapQuoter, SwapRouter, TICK_SPACINGS, Tick, TickLibrary, TickList, TickListDataProvider, TickMath, Trade, computePoolAddress, encodeRouteToPath, encodeSqrtRatioX96, isMint, isSorted, maxLiquidityForAmounts, mostSignificantBit, nearestUsableTick, priceToClosestTick, subIn256, tickToPrice, toHex, tradeComparator, v3Swap };
//# sourceMappingURL=v3-sdk.esm.js.map
