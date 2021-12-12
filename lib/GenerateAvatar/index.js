"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html2canvas = _interopRequireDefault(require("html2canvas"));

var _fs = require("@tms/fs.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenerateAvatar = // 需要生成头像的人员信息
// 接收人员信息列表
function GenerateAvatar(personnelInfo) {
  var _this = this;

  _classCallCheck(this, GenerateAvatar);

  this.personnelInfo = [];

  this.getAvatarDom = function (obj) {
    var nickName = obj.nickName,
        fileUrl = obj.fileUrl;

    if (fileUrl) {
      return "\n        <div class=\"avatar-box\">\n          <img src=\"".concat(fileUrl, "\" crossOrigin=\"anonymous\" alt=\"\">\n        </div>\n      ");
    }

    if (nickName) {
      if (new RegExp("[\\u4E00-\\u9FFF]+", 'g').test(nickName)) {
        return "\n          <div class=\"avatar-box\">\n            <span class=\"nick-text\">".concat(nickName === null || nickName === void 0 ? void 0 : nickName.slice(-2), "</span>\n          </div>\n        ");
      }

      return "\n        <div class=\"avatar-box\">\n          <span class=\"nick-text\">".concat(nickName === null || nickName === void 0 ? void 0 : nickName.slice(0, 2), "</span>\n        </div>\n      ");
    }

    return '';
  };

  this.renderDom = function () {
    var containerDiv = document.createElement('div');
    containerDiv.className = 'generate—avatar--wrapper';
    containerDiv.id = 'generate—avatar--wrapper';
    var imgDomArr = '';

    _this.personnelInfo.forEach(function (item) {
      var imgDom = _this.getAvatarDom(item);

      imgDomArr += imgDom;
    });

    containerDiv.innerHTML = imgDomArr;
    document.body.appendChild(containerDiv);
  };

  this.removeDom = function () {
    try {
      var targetDom = document.getElementById('generate—avatar--wrapper');

      if (!targetDom) {
        throw Error('未找到实例DOM节点！');
      }

      document.body.removeChild(targetDom);
    } catch (e) {
      console.log(e);
    }
  };

  this.screenshot = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var targetDom, tmpCanvas, tmpImgBase64Str;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            targetDom = document.getElementById('generate—avatar--wrapper');

            if (targetDom) {
              _context.next = 4;
              break;
            }

            throw Error('未找到实例DOM节点！');

          case 4:
            _context.next = 6;
            return (0, _html2canvas.default)(targetDom, {
              useCORS: true // 是否尝试使用CORS从服务器加载图像

            });

          case 6:
            tmpCanvas = _context.sent;
            tmpImgBase64Str = tmpCanvas.toDataURL("image/png");
            console.log(tmpImgBase64Str, '--tmpImgBase64Str--');
            return _context.abrupt("return", tmpImgBase64Str);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  this.uploadImg = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var imgBase64Str, uploadRes, data, success, errors, fileInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _this.screenshot();

          case 3:
            imgBase64Str = _context2.sent;

            if (imgBase64Str) {
              _context2.next = 6;
              break;
            }

            throw Error('生成图片失败！');

          case 6:
            _context2.next = 8;
            return (0, _fs.commonUpload)({
              fileList: [imgBase64Str],
              appId: '09',
              repositoryName: 'trialos'
            });

          case 8:
            uploadRes = _context2.sent;
            data = uploadRes.data, success = uploadRes.success, errors = uploadRes.errors;

            if (!success) {
              _context2.next = 14;
              break;
            }

            // 删除节点
            _this.removeDom();

            fileInfo = data[0] || {};
            return _context2.abrupt("return", fileInfo.previewUrl);

          case 14:
            if (!(errors && (errors === null || errors === void 0 ? void 0 : errors.length) > 0)) {
              _context2.next = 16;
              break;
            }

            throw Error(errors === null || errors === void 0 ? void 0 : errors[0].message);

          case 16:
            throw Error('上传fs出现异常！');

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 19]]);
  }));
  this.personnelInfo = personnelInfo.slice(0, 4); // 生成Dom节点

  this.renderDom();
} // 用户头像渲染逻辑 
;

var _default = GenerateAvatar;
exports.default = _default;