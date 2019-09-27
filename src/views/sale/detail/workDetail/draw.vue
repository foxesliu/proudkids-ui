<template>
  <div>
    <div class="imageEditorApp">
      <tui-image-editor
        ref="tuiImageEditor"
        :include-ui="useDefaultUI"
        :options="options"
        @addText="onAddText"
        @objectMoved="onObjectMoved"
        @toDataURL="toDataURL"
      ></tui-image-editor>

      <button @click="submit">提交图片</button>
    </div>
  </div>
</template>
<script>
//引入icon
const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
//引入样式
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";

import { ImageEditor } from "./ImageEditor/index";
import { closeTagView } from "@/utils/index";
import huaban from "../../../../assets/img/huaban.png";

//中文配置
var locale_ru_ZH = {
  Crop: "裁剪",
  Delete: "删除",
  "Delete-all": "删除所有",
  Load: "选择图片",
  Download: "下载图片",
  Sharpen: "锐化",
  Emboss: "浮雕",
  Blur: "模糊",
  Sepia: "深褐色",
  Sepia2: "深褐色2",
  Invert: "反色",
  Grayscale: "灰度化",
  "Remove White": "移除白色",
  Threshold: "阈值",
  Distance: "距离",
  Filter: "滤镜",
  "Color Filter": "颜色滤镜",
  Pixelate: "像素化",
  Noise: "噪点",
  Brightness: "亮度",
  Redo: "重做",
  Undo: "撤销",
  Reset: "重设",
  Flip: "翻转",
  Rotate: "旋转",
  Draw: "绘画",
  Shape: "图形",
  Icon: "图标",
  Text: "文字",
  Mask: "遮罩",
  Apply: "应用",
  Cancel: "取消",
  Custom: "自定义",
  Square: "正方形",
  "Load Mask Image": "选择遮罩图片",
  Range: "角度",
  Color: "颜色",
  Fill: "填充",
  Stroke: "边框",
  Rectangle: "长方形",
  Circle: "圆形",
  Triangle: "三角形",
  Bold: "加粗",
  Italic: "倾斜",
  Underline: "下横线",
  Left: "左对齐",
  Center: "居中",
  Right: "右对齐",
  "Text size": "文本大小",
  Arrow: "箭头",
  "Arrow-2": "箭头2",
  "Arrow-3": "箭头3",
  Value: "值",
  "Custom icon": "自定义图标",
  "Gradient transparency": "渐变透明",
  Blend: "混合",
  Multiply: "叠加",
  Tint: "色调",
  Heart: "心",
  Bubble: "泡泡",
  Location: "位置",
  Polygon: "多变形",
  "Star-1": "星星1",
  "Star-2": "星星2",
  Free: "自由",
  Straight: "直线"
  // etc...
};

//主题配置
const whiteTheme = {
  "common.bi.image":
    "https://files.proudkids.cn/default/bg-draw.png",
  // header
  "header.backgroundImage": "none",
  "header.backgroundColor": "transparent",
  "header.border": "0px",
  // main icons
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
  // submenu icons
  "submenu.normalIcon.path": icond,
  "submenu.activeIcon.path": iconc
};

var selectedImage = huaban;

import demoImg from "../../../../assets/img/15.png";
import axios from "axios";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth"; // 验权
import {
  response,
  addQaResponse,
  phRuserLessonAnswerContent
} from "@/api/teachers.js";

export default {
  components: {
    "tui-image-editor": ImageEditor
  },
  computed: {
    ...mapGetters(["userId", "qaType"])
  },

  data() {
    return {
      listData: [],
      options: {
        includeUI: {
          theme: whiteTheme, // or whiteTheme
          menuBarPosition: "bottom",
          menu: [
            "crop",
            "flip",
            "rotate",
            "draw",
            "shape",
            "icon",
            "text",
            "mask",
            "filter"
          ],
          loadImage: {
            path: selectedImage,
            name: "SampleImage"
          },
          initMenu: "draw",
          locale: locale_ru_ZH,
          theme: whiteTheme,
          initMenu: "filter",
          menuBarPosition: "left"
        }
        // cssMaxWidth: 750,
        // cssMaxHeight: 1080
      }
    };
  },
  created() {
    /*
     * 获取路由信息判断是否是进入画板模式传参 $route.query.key
     * sessionStorage.getItem('originalDrawing')判断是否在原图上作画 true在原图上作画
     * sessionStorage.getItem('qaPic')获取原图地址
     * */

    if (this.$route.query.key) {
      //进入画板模式
      //获取路由参数
      this.options = {
        includeUI: {
          theme: whiteTheme, // or whiteTheme
          menuBarPosition: "bottom",
          menu: [
            "crop",
            "flip",
            "rotate",
            "draw",
            "shape",
            "icon",
            "text",
            "mask",
            "filter"
          ],
          loadImage: {
            path: this.$route.query.src,
            name: "SampleImage"
          },
          locale: locale_ru_ZH,
          theme: whiteTheme,
          initMenu: "draw",
          menuBarPosition: "left"
        },
        cssMaxWidth: 750,
        cssMaxHeight: 1080
      };
    } else {
      let obj1 = { key: Date.now(), src: sessionStorage.getItem("qaPic") };
      let obj2 = { key: Date.now(), src: huaban };
      const config = {
        true: obj1, //在原图上作画
        false: obj2
      };
      let result = config[sessionStorage.getItem("originalDrawing")];
      this.options = {
        includeUI: {
          theme: whiteTheme, // or whiteTheme
          menuBarPosition: "bottom",
          menu: [
            "crop",
            "flip",
            "rotate",
            "draw",
            "shape",
            "icon",
            "text",
            "mask",
            "filter"
          ],
          loadImage: {
            path: result.src,
            name: "SampleImage"
          },
          locale: locale_ru_ZH,
          theme: whiteTheme,
          initMenu: "draw",
          menuBarPosition: "left"
        },
        cssMaxWidth: 750,
        cssMaxHeight: 1080
      };
    }
  },
  methods: {
    /*
     * 提交
     *
     * */
    submit() {
      //获取canvas图片
      const base64 = this.$refs.tuiImageEditor.invoke("toDataURL", {
        format: "png"
      });
      //图片转为文件并上传
      this.saveCanvasAsImage(this.dataURLtoFile(base64, "file"));
    },

    /*
     * 将base64转换为文件
     *
     * */
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], new Date().toISOString() + ".png", {
        type: "image/png"
      });
    },

    /*
     * 图片处理 上传 提交等操作
     * listData 图片上传参数
     * answerDraw 1老师提示、学生作答内容提交
     * isCurrentPage 是否是当前页
     *
     * */
    saveCanvasAsImage(file) {
      const formData = new FormData();
      formData.append("file", file);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      config.headers["Authorization"] = "Bearer " + getToken();
      //文件上传
      axios.post("apps/file/upload", formData, config).then(async res => {
        const url = await `https://files.proudkids.cn${res.data.data.fileUrl}`;
        this.imgUrl = url;
        this.listData.push({ contentValue: url, filesType: 9 });
        const { answerDraw } = this.$route.query;

        if (answerDraw) {
          //老师提示、学生作答内容提交
          this.postPhRuserLessonAnswerContent();
        } else {
          //批注
          if (sessionStorage.getItem("isCurrentPage") == 1) {
            this.postAddQaResponse();
          } else {
            this.postResponse();
          }
        }
      });
    },

    /*
     * 新增批注，当前页的时候调用
     * ruserId： 学生ruserId
     * type: 类型 0提问 1批注
     * sourceType: 消息来源类型 0学生发起 1老师发起
     * serialNum:mark标记的时候需要传
     * */
    async postAddQaResponse() {
      const ruserId = sessionStorage.getItem("qaRuserId");
      const lessSecCid = sessionStorage.getItem("qaLessSecCid");
      const type = 1;
      const sourceType = 1;
      const lessSecId = sessionStorage.getItem("qaLessSecId");
      const ruserLessid = sessionStorage.getItem("qaRuserLessid");
      const serialNum = sessionStorage.getItem("serialNum");
      const obj = {
        ruserId,
        lessSecCid,
        userId: this.userId,
        type,
        sourceType,
        lessSecId,
        ruserLessid,
        serialNum
      };
      const result = await addQaResponse(obj);
      this.postResponse(result.data.data.id);
    },

    /*
     * 提交提问批注内容回复
     * 当前页的时候 qaId 从postAddQaResponse接口返回
     * 非当前页qaId 从session中获取
     *
     * */
    async postResponse(qaId) {
      let obj;
      if (sessionStorage.getItem("isCurrentPage") == 1) {
        // const qaId = sessionStorage.getItem('qaId')
        obj = {
          qaId,
          contents: this.listData,
          userId: this.userId
        };
      } else {
        const qaContentId = sessionStorage.getItem("qaLessSecCid");
        const qaId = sessionStorage.getItem("qaId");
        obj = {
          qaId,
          qaContentId,
          contents: this.listData,
          userId: this.userId
        };
      }
      const result = await response(obj);
      if (result) {
        this.loading = false;
        this.$message({
          message: "恭喜你，提交批注成功",
          type: "success"
        });
      }
      const id = sessionStorage.getItem("correctId");
      const ruserId = sessionStorage.getItem("correctRuserId");
      const lessonId = sessionStorage.getItem("correctLessonId");
      const courseId = sessionStorage.getItem("correctCourseId");

      const qaSwiperId = sessionStorage.getItem("qaSwiperId");
      const tabsStatus = sessionStorage.getItem("tabsStatus");
      const qaType = sessionStorage.getItem("qaType");
      const readStat = sessionStorage.getItem("readStat");
      const qaFlag = sessionStorage.getItem("qaFlag");
      let that = this;
      const query = {
        path: "./currentPage",
        query: {
          id,
          ruserId,
          lessonId,
          courseId,
          qaSwiperId,
          tabsStatus,
          qaType,
          readStat,
          qaFlag
        }
      };
      closeTagView(
        { name: "画板详情", path: "/detail/draw", title: "画板详情" },
        that,
        query
      );
    },

    /*
     * 老师提示、学生作答内容提交
     * lessSecId
     * ruserId
     * lessSecCid
     * ruserLessId  作业/预习id
     * value
     * type
     *
     * */
    async postPhRuserLessonAnswerContent() {
      const ruserId = sessionStorage.getItem("qaRuserId");
      const lessSecCid = sessionStorage.getItem("qaLessSecCid");
      const lessSecId = sessionStorage.getItem("qaLessSecId");
      const ruserLessId = sessionStorage.getItem("qaRuserLessid");
      const qaSwiperId = sessionStorage.getItem("qaSwiperId");
      const tabsStatus = sessionStorage.getItem("tabsStatus");
      const qaType = sessionStorage.getItem("qaType");
      //进入画板模式type 5
      // const type = sessionStorage.getItem('qaType')
      const type = 5;
      const readStat = sessionStorage.getItem("readStat");
      const qaFlag = sessionStorage.getItem("qaFlag");
      const value = this.imgUrl;
      const config = {
        lessSecId,
        ruserId,
        lessSecCid,
        ruserLessId,
        value,
        type
      };
      const result = await phRuserLessonAnswerContent(config);
      if (result) {
        this.loading = false;
        this.$message({
          message: "恭喜你，画板修改成功",
          type: "success"
        });
      }
      const id = sessionStorage.getItem("correctId");
      const lessonId = sessionStorage.getItem("correctLessonId");
      const courseId = sessionStorage.getItem("correctCourseId");
      let that = this;
      const query = {
        path: "./currentPage",
        query: {
          id,
          ruserId,
          lessonId,
          courseId,
          qaSwiperId,
          tabsStatus,
          qaType,
          readStat,
          qaFlag
        }
      };
      closeTagView(
        { name: "画板详情", path: "/detail/draw", title: "画板详情" },
        that,
        query
      );
    }
  }
};
</script>
<style scoped>
.imageEditorApp {
  width: 100%;
  height: 1200px;
  position: relative;
}

.tui-image-editor-header-logo {
  display: none;
  opacity: 0;
}

button {
  position: absolute;
  right: 260px;
  top: 8px;
  cursor: pointer;
  width: 120px;
  height: 40px;
  z-index: 100000;
  background-color: #fdba3b;
  border: 1px solid #fdba3b;
  color: #fff;
  font-family: "Noto Sans", sans-serif;
  font-size: 12px;
  border-radius: 20px;
}
</style>
