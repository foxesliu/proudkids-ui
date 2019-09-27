<template>
  <div class="main">
    <div class="main-tabs-change">
      <div
        @click="tabChange(0, 2, 2)"
        :class="
          tabsStatus === 0
            ? 'active pull-left c-pointer'
            : 'pull-left c-pointer'
        "
      >
        当前页
      </div>
      <div
        @click="tabChange(1, 0, 1, false)"
        :class="
          tabsStatus === 1
            ? 'active pull-left c-pointer'
            : 'pull-left c-pointer'
        "
      >
        （未读）老师的批注（{{ qaCount.teacherUnReadCount }}）
      </div>
      <div
        @click="tabChange(2, 1, 1, false)"
        :class="
          tabsStatus === 2
            ? 'active pull-left c-pointer'
            : 'pull-left c-pointer'
        "
      >
        （已读）老师的批注（{{ qaCount.teacherReadCount }}）
      </div>
      <div
        @click="tabChange(3, 0, 0, true)"
        :class="
          tabsStatus === 3
            ? 'active pull-left c-pointer'
            : 'pull-left c-pointer'
        "
      >
        （未读）学生的提问（{{ qaCount.stuUnReadCount }}）
      </div>
      <div
        @click="tabChange(4, 1, 0, true)"
        :class="
          tabsStatus === 4
            ? 'active pull-left c-pointer'
            : 'pull-left c-pointer'
        "
      >
        （已读）学生的提问（{{ qaCount.stuReadCount }}）
      </div>
    </div>
    <!--画图题并且是当前页-->
    <div v-if="swiperType == 0 && currentStat">
      <div v-for="(item, index) in listData" :key="index">
        <template v-if="item.type == 1">
          <marktag
            v-if="item.answerValue"
            class="marktag"
            :markVal="item.answerValue"
            :markItem="item"
          ></marktag>
          <marktag
            v-else
            class="marktag"
            :markVal="item.value"
            :markItem="item"
          ></marktag>
        </template>

        <!--音频题-->
        <div class="audio-container-question" v-if="item.type == 2">
          <VueAudio
            :theUrl="item.value"
            type="question"
            class="VueAudio"
            :theControlList="'onlyOnePlaying'"
          />
          <!--qaId false可以点击 音频的url存在可以点击-->
          <operatingBtns
            v-if="!item.qaId && item.value"
            type="primary"
            content="点击进行批注"
            class="operatingBtns"
            @postil="currentDetail(item, 1)"
          ></operatingBtns>
          <operatingBtns
            v-else-if="!item.value"
            type="danger"
            content="未作答"
            class="operatingBtns"
            :disabled="true"
          ></operatingBtns>
          <operatingBtns
            v-else
            type="danger"
            :content="'已批注' + '（批注' + item.qaRank + ')'"
            class="operatingBtns"
            :disabled="true"
          ></operatingBtns>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="main-tabs-change-cont" v-if="tabsStatus == 0">
        <div v-for="(item, index) in listData" :key="item.id">
          <!--文本题-->
          <div class="text-container-question" v-if="item.type == 0">
            <fText
              type="question"
              class="questionText"
              :content="item.value"
            ></fText>
            <operatingBtns
              v-if="!item.qaId"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>
            <operatingBtns
              v-else
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
          </div>
          <!--图片题-->
          <div
            class="pic-container-question"
            v-loading="item.imgflag"
            v-if="item.type == 1"
          >
            <template>
              <questionPicture
                v-if="item.answerValue"
                type="question"
                class="questionPicture"
                :src="item.answerValue"
                ref="uploadImg"
              ></questionPicture>

              <questionPicture
                v-else
                type="question"
                class="questionPicture"
                :src="item.value"
                ref="uploadImg"
              ></questionPicture>
            </template>

            <operatingBtns
              v-if="!item.qaId"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>
            <operatingBtns
              v-else
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>

            <template>
              <operatingBtns
                type="primary"
                :content="'添加到素材库'"
                class="addMaterialBtns"
                v-if="item.answerValue"
                @click.native="addToMaterial(item.answerValue, index)"
              ></operatingBtns>

              <operatingBtns
                type="primary"
                :content="'添加到素材库'"
                class="addMaterialBtns"
                v-else
                @click.native="addToMaterial(item.value, index)"
              ></operatingBtns>
            </template>
            <operatingBtns
              :type="'success'"
              :content="'点击进入画板模式'"
              :stat="3"
              class="drawingBtns"
              @click="handleDraw(item)"
            ></operatingBtns>
          </div>

          <!-- 画板题 -->

          <div
            class="pic-container-question"
            v-loading="item.imgflag"
            v-if="item.type == 12"
          >
            <template>
              <questionPicture
                v-if="item.answerValue"
                type="answer"
                class="questionPicture"
                :src="item.answerValue"
                ref="uploadImg"
              ></questionPicture>

              <questionPicture
                v-else
                type="answer"
                class="questionPicture"
                :src="item.value"
                ref="uploadImg"
              ></questionPicture>
            </template>

            <operatingBtns
              v-if="!item.qaId && item.answerValue"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>
            <operatingBtns
              v-else-if="!item.answerValue"
              type="danger"
              content="未作答"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
            <operatingBtns
              v-else
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
            <!-- 
            <operatingBtns
              v-if="!item.qaId"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>
            <operatingBtns
              v-else
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns> -->

            <template>
              <operatingBtns
                type="primary"
                :content="'添加到素材库'"
                class="addMaterialBtns"
                v-if="item.answerValue"
                @click.native="addToMaterial(item.answerValue, index)"
              ></operatingBtns>
            </template>
            <operatingBtns
              v-if="item.answerValue"
              :type="'success'"
              :content="'点击进入画板模式'"
              :stat="3"
              class="drawingBtns"
              @click="handleDraw(item)"
            ></operatingBtns>
          </div>
          <!--音频题-->
          <div class="audio-container-question" v-if="item.type == 2">
            <VueAudio
              :theUrl="item.value"
              type="question"
              class="VueAudio"
              :theControlList="'onlyOnePlaying'"
            />
            <!--<operatingBtns v-if="!item.qaId" type='primary' content="点击进行批注" class="operatingBtns"-->
            <!--@postil="currentDetail(item,1)"></operatingBtns>-->
            <!--<operatingBtns v-else type='danger' :content='"已批注"+"（批注"+item.qaRank+")"' class="operatingBtns"-->
            <!--:disabled="true"></operatingBtns>-->
            <operatingBtns
              v-if="!item.qaId && item.value"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>
            <operatingBtns
              v-else-if="!item.value"
              type="danger"
              content="未作答"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
            <operatingBtns
              v-else
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
          </div>
          <!--视频题-->
          <div class="questionaudio-container-question" v-if="item.type == 3">
            <questionVideo
              type="question"
              class="questionVideo"
              :videoSrc="item.value"
            ></questionVideo>
            <operatingBtns
              v-if="!item.qaId"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>
            <operatingBtns
              v-else
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
          </div>

          <!--图片作答-->
          <div
            class="pic-container-question"
            v-loading="item.imgflag"
            v-if="item.type == 5"
          >
            <questionPicture
              type="answer"
              class="questionPicture"
              :src="item.answerValue"
              ref="uploadImg"
            ></questionPicture>

            <operatingBtns
              v-if="!item.qaId && item.answerValue"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>
            <operatingBtns
              v-else-if="!item.answerValue"
              type="danger"
              content="未作答"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
            <operatingBtns
              v-else
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
            <!-- <operatingBtns
              v-if="!item.qaId"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>
            <operatingBtns
              v-else
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns> -->
            <template>
              <operatingBtns
                type="primary"
                :content="'添加到素材库'"
                class="addMaterialBtns"
                v-if="item.answerValue"
                @click.native="addToMaterial(item.answerValue, index)"
              ></operatingBtns>

              <!-- <operatingBtns
                type="primary"
                :content="'添加到素材库'"
                class="addMaterialBtns"
                v-else
                @click.native="addToMaterial(item.value, index)"
              ></operatingBtns> -->
            </template>
            <operatingBtns
              v-if="item.answerValue"
              :type="'success'"
              content="点击进入画板模式"
              :stat="3"
              class="drawingBtns"
              @click="handleDraw(item)"
            ></operatingBtns>
          </div>

          <!--视频作答-->
          <div class="questionaudio-container-question" v-if="item.type == 6">
            <questionVideo
              type="answer"
              class="questionVideo"
              :videoSrc="item.answerValue"
            ></questionVideo>
            <operatingBtns
              v-if="!item.qaId"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>
            <operatingBtns
              v-else
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
          </div>

          <!--音频作答-->
          <div class="questionRecordContainer" v-if="item.type == 7">
            <template>
              <questionRecord
                :theUrl="item.answerValue"
                :theControlList="'onlyOnePlaying'"
                v-if="item.open"
                :questionAudioType="false"
                :answerScore="item.answerScore"
                :recordStat="item.answerValue"
                :content="item.value"
                :questionRecordType="false"
                class="questionRecord"
              />

              <AnswerAudio
                :theUrl="item.answerValue"
                class="VueAudio"
                :theControlList="'onlyOnePlaying'"
                type="answer"
                v-else
              />
            </template>
            <!--<operatingBtns v-if="!item.qaId" type='primary' content="点击进行批注" class="operatingBtns"-->
            <!--@postil="currentDetail(item,1)"></operatingBtns>-->
            <!--<operatingBtns v-else type='danger' :content='"已批注"+"（批注"+item.qaRank+")"' class="operatingBtns"-->
            <!--:disabled="true"></operatingBtns>-->

            <operatingBtns
              v-if="!item.qaId && item.answerValue"
              type="primary"
              content="点击进行批注"
              class="operatingBtns"
              @postil="currentDetail(item, 1)"
            ></operatingBtns>

            <operatingBtns
              v-else-if="item.qaId && item.answerValue"
              type="danger"
              :content="'已批注' + '（批注' + item.qaRank + ')'"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>

            <operatingBtns
              v-else
              type="danger"
              content="未作答"
              class="operatingBtns"
              :disabled="true"
            ></operatingBtns>
          </div>
        </div>
      </div>
      <div class="main-tabs" v-else>
        <p v-if="listData.length == 0" class="noData">暂无数据</p>
        <div
          class="expansion-item"
          v-for="(item, index) in listData"
          :key="item.id"
          :ref="index"
        >
          <!--<div class="expansion-item" v-for="(item,index) in listData" :key="index" :ref="index" @click="getPhRuserContentList(item,index)">-->
          <div
            class="expansion-item-header"
            @click="getPhRuserContentList(item, index)"
          >
            <!--描述-->
            <div class="item-header-desc">
              <h1>{{ currentName(tabsStatus) }}{{ item.qaRank }}</h1>
              <span>页面{{ swiperItem.serialIndex }}</span>
            </div>
            <!--学生状态-->
            <div class="item-header-ruser">
              <div class="person">
                <div>
                  <img
                    :src="
                      (item.originator &&
                        JSON.parse(item.originator).avatarUrl) ||
                        'https://files.proudkids.cn/default/avate.png'
                    "
                    alt="originator头像"
                  />
                  <span>{{
                    item.originator && JSON.parse(item.originator).nickName
                  }}</span>
                </div>
                <!--sourceType 1 stat0 学生未读 4.27-->
                <!--sourceType 0 代表学生发起，状态显示老师-->
                <!--sourceType 0 stat 0 需要老师确认-->
                <!--<span class="position" v-if="item.stat==1||item.readStat"></span>-->
                <!--<span class="position" v-if="item.stat==1||item.readStat">学生：<i  class="stat red">已读</i></span>-->
                <!--<span class="position" v-else>{{item.sourceType ==0?'中教':'学生'}}：<i class="stat" :class="{red: item.stat,green:!item.stat }">{{item.stat|statFilter}}</i></span>-->

                <!--<span class="position" v-if="item.stat==1||item.readStat">学生：<i class="stat red">已读</i></span>-->
                <span class="position" v-if="ruserRead(item)"
                  >学生：<i class="stat red">已读</i></span
                >
                <span class="position" v-if="isReadShow(item)"
                  >学生：<i
                    class="stat"
                    :class="{ red: item.stat, green: !item.stat }"
                    >{{ item.stat | statFilter }}</i
                  ></span
                >
              </div>
              <div class="time">
                <el-button
                  type="primary"
                  @click="confirmReaded(item, index, $event)"
                  v-if="item.sourceType == 0 && item.stat == 0"
                >
                  确认已读
                </el-button>
                <el-button type="info" disabled v-else>确认已读</el-button>
                <span>最新回复时间：{{ item.updateTime }}</span>
                <i class="el-icon-arrow-down" v-if="!item.flag"></i>
                <i class="el-icon-arrow-up" v-if="item.flag"></i>
              </div>
            </div>
          </div>
          <div class="expansion-list" v-if="item.flag" v-loading="listLoading">
            <p v-if="!ruserContentList.length">暂无数据</p>
            <div
              class="expansion-list-item"
              v-for="item in ruserContentList"
              :key="item.id"
            >
              <!--文本题-->
              <div class="text-container-question" v-if="item.filesType == 0">
                <fText
                  type="question"
                  class="questionText"
                  :content="JSON.parse(item.value).value"
                  v-if="flag"
                ></fText>
                <fText
                  type="question"
                  class="questionText"
                  :content="item.value"
                  v-else
                ></fText>
              </div>

              <!--图片题-->
              <div
                class="pic-container-question"
                v-loading="item.imgflag"
                v-if="item.filesType == 1"
              >
                <questionPicture
                  v-if="flag"
                  type="question"
                  class="questionPicture"
                  :src="JSON.parse(item.value).value"
                  ref="uploadImg"
                ></questionPicture>

                <questionPicture
                  v-else
                  type="question"
                  class="questionPicture"
                  :src="item.value"
                  ref="uploadImg"
                ></questionPicture>
              </div>

              <!--音频题-->
              <div class="audio-container-question" v-if="item.filesType == 2">
                <VueAudio
                  v-if="flag"
                  :theUrl="JSON.parse(item.value).value"
                  type="question"
                  class="VueAudio"
                  :theControlList="'onlyOnePlaying'"
                />
                <VueAudio
                  v-else
                  :theUrl="item.value"
                  type="question"
                  class="VueAudio"
                  :theControlList="'onlyOnePlaying'"
                />
              </div>

              <!--视频题-->
              <div
                class="questionaudio-container-question"
                v-if="item.filesType == 3"
              >
                <questionVideo
                  type="question"
                  class="questionVideo"
                  v-if="flag"
                  :videoSrc="JSON.parse(item.value).value"
                ></questionVideo>
                <questionVideo
                  type="question"
                  class="questionVideo"
                  :videoSrc="item.value"
                  v-else
                ></questionVideo>
              </div>

              <!--图片作答-->
              <div
                class="pic-container-question"
                v-loading="item.imgflag"
                v-if="item.filesType == 5"
              >
                <questionPicture
                  type="answer"
                  class="questionPicture"
                  v-if="flag"
                  :src="JSON.parse(item.value).value"
                  ref="uploadImg"
                ></questionPicture>
                <questionPicture
                  type="answer"
                  class="questionPicture"
                  :src="item.value"
                  v-else
                  ref="uploadImg"
                ></questionPicture>
              </div>

              <!--视频作答-->
              <div
                class="questionaudio-container-question"
                v-if="item.filesType == 6"
              >
                <questionVideo
                  type="answer"
                  class="questionVideo"
                  v-if="flag"
                  :videoSrc="JSON.parse(item.value).value"
                ></questionVideo>
                <questionVideo
                  type="answer"
                  class="questionVideo"
                  :videoSrc="item.value"
                  v-else
                ></questionVideo>
              </div>

              <!--音频作答-->
              <div class="questionRecordContainer" v-if="item.filesType == 7">
                <AnswerAudio
                  class="VueAudio"
                  :theControlList="'onlyOnePlaying'"
                  v-if="flag"
                  type="answer"
                  :theUrl="JSON.parse(item.value).value"
                />
                <AnswerAudio
                  :theUrl="item.value"
                  class="VueAudio"
                  :theControlList="'onlyOnePlaying'"
                  type="answer"
                  v-else
                />
              </div>

              <!--文本-->
              <div class="text-container" v-if="item.filesType == 8">
                <img
                  :src="
                    item.avatarUrl ||
                      'https://files.proudkids.cn/default/avate.png'
                  "
                  alt=""
                />
                <div>
                  <p>
                    <span>{{ item.nickName }}</span>
                    <span>{{ item.datatime }}</span>
                  </p>
                  <bubbleText
                    :type="item.sourcePosition"
                    class="questionText"
                    :content="item.value"
                    :record="item"
                  ></bubbleText>
                </div>
              </div>

              <!--图片-->
              <div class="pic-container" v-if="item.filesType == 9">
                <img
                  :src="
                    item.avatarUrl ||
                      'https://files.proudkids.cn/default/avate.png'
                  "
                  alt=""
                />
                <div>
                  <p>
                    <span>{{ item.nickName }}</span>
                    <span>{{ item.datatime }}</span>
                  </p>
                  <bubble-img
                    :type="item.sourcePosition"
                    class="questionText"
                    :src="item.value"
                    :record="item"
                  ></bubble-img>
                </div>
              </div>

              <!--音频-->
              <div class="audio-container" v-if="item.filesType == 10">
                <img
                  :src="
                    item.avatarUrl ||
                      'https://files.proudkids.cn/default/avate.png'
                  "
                  alt=""
                />
                <div>
                  <p>
                    <span>{{ item.nickName }}</span>
                    <span>{{ item.datatime }}</span>
                  </p>
                  <bubble-audio
                    :type="item.sourcePosition"
                    class="questionText"
                    :record="item"
                    :theUrl="item.value"
                    :contentId="item.id"
                    :theControlList="'onlyOnePlaying'"
                  ></bubble-audio>
                </div>
              </div>

              <!--视频-->
              <div class="pic-container" v-if="item.filesType == 11">
                <img
                  :src="
                    item.avatarUrl ||
                      'https://files.proudkids.cn/default/avate.png'
                  "
                  alt=""
                />
                <div>
                  <p>
                    <span>{{ item.nickName }}</span>
                    <span>{{ item.datatime }}</span>
                  </p>
                  <bubble-video
                    :type="item.sourcePosition"
                    class="questionText"
                    :src="item.value"
                    :record="item"
                  ></bubble-video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--选择一种回复方式-->
    <replay
      v-model="material"
      :type="replayType"
      title=""
      v-on:cancel="clickCancel()"
    ></replay>
    <!--添加素材库成功提示框-->
    <dialog-bar
      v-model="addImgStat"
      type="danger"
      title=""
      content="成功添加到素材库"
      v-on:cancel="clickCancel()"
    ></dialog-bar>
    <!--素材库-->
    <div class="position-box" v-if="selectFodder">
      <div class="img-box">
        <img
          src="../../../../../assets/workDetail/positionQuit.png"
          alt=""
          @click="isselectFodder"
        />
        <materiaLib ref="materiaLib"></materiaLib>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/utils/auth"; // 验权
import VueAudio from "./audio";
import AnswerAudio from "./answerAudio";
import questionPicture from "./picture";
import questionRecord from "./record";
import questionVideo from "./video";
import fText from "./text";
import operatingBtns from "./operatingBtns";
import replay from "./replay";
import dialogBar from "./dialog.vue";
import bubbleAudio from "./bubbleAudio";
import bubbleVideo from "./bubbleVideo";
import bubbleText from "./bubbleText";
import bubbleImg from "./bubbleImg";
import materiaLib from "./materialLibrart";
import marktag from "./mark.vue";
import { getImgToBase64, dataURLtoBlob } from "@/utils/index";
import { phRuserContentList, getRuserInfo, readStat } from "@/api/teachers.js";
import { mapGetters } from "vuex";

export default {
  components: {
    VueAudio,
    questionPicture,
    questionRecord,
    questionVideo,
    fText,
    operatingBtns,
    replay,
    dialogBar,
    bubbleAudio,
    bubbleText,
    bubbleImg,
    materiaLib,
    marktag,
    bubbleVideo,
    AnswerAudio
  },
  props: ["listData", "qaCount", "swiperType"],
  data() {
    return {
      currentStat: true,
      tabsStatus: 0,
      material: false,
      addImgStat: false,
      PhRuserLessonQa: {},
      ruserContentList: [],
      show: false,
      selectFodder: false,
      replayType: "",
      ruserPic: "",
      listLoading: false,
      flag: "",
      // readStat, qaType
      readStat: "",
      qaType: ""
    };
  },
  filters: {
    statFilter(stat) {
      const config = {
        0: "未读",
        1: "已读"
      };
      return config[stat];
    },
    nameFilter(json) {
      const config = JSON.parse(json);
      return config.nickName;
    }
  },
  computed: {
    ...mapGetters(["swiperItem", "qaFlag"]),

    ruserRead(item) {
      return item => {
        // sourceType 1 stat0 学生未读

        // sourceType 1 stat1
        // sourceType 0 stat1
        // sourceType 0 stat0
        if (item.sourceType == 1 && item.stat == 0 && !item.readStat) {
          return false;
        }
      };
    },
    isReadShow(item) {
      return item => {
        if (item.sourceType == 0 && item.stat == 0) {
          return false;
        } else {
          return true;
        }
      };
    }
  },
  watch: {
    tabsStatus(newVal, oldVal) {
      if (newVal) {
        this.tabsStatus = parseInt(newVal);
      }
    }
  },
  created() {
    // this.getRuserInfo()
    // 获取提问/批注的tabsStatus
    // this.tabsStatus = sessionStorage.getItem('qaTabsStatus')
    // this.qaType = sessionStorage.getItem('qaType')
    // this.readStat = sessionStorage.getItem('readStat')
    // sessionStorage.removeItem('tabsStatus')
    const { tabsStatus, qaType, readStat, qaFlag } = this.$route.query;
    if (tabsStatus != 0 && tabsStatus != undefined) {
      this.tabChange(tabsStatus, readStat, qaType, qaFlag);
    }
  },
  methods: {
    currentName(val) {
      const config = {
        1: "批注",
        2: "批注",
        3: "提问",
        4: "提问"
      };

      return config[val];
    },
    addLibrary() {
      this.selectFodder = true;
    },
    isselectFodder() {
      this.selectFodder = false;
    },
    //提问、批注确认已读提交
    async putReadStat(id, index) {
      const config = {
        qaId: id
      };
      const result = await readStat(config);
      if (result) {
        this.$parent.ruserLessonSectionList(true, this.$parent.swiperId, false);
        this.$parent.getTeacherQaCount();
        this.$parent.getQaCount();
        this.$parent.changePhRuserLessonQaList(this.readStat, this.qaType);
      }
    },
    //获取用户头像
    // async getRuserInfo() {
    //   const result = await getRuserInfo(this.$route.query.ruserId)
    //   this.ruserPic = result.data.pic
    // },
    //确认已读
    confirmReaded(item, index, e) {
      //阻止冒泡事件
      e.cancelBubble = true;
      e.stopPropagation();

      this.$set(this.listData[index], "readStat", true);
      this.putReadStat(item.id, index);
    },
    //批注提问内容列表
    async phRuserContentList(qaId) {
      this.listLoading = true;
      const result = await phRuserContentList(qaId);
      if (result) {
        this.listLoading = false;
      }
      result.data.forEach(item => {
        if (item.sourceJson) {
          const { avatarUrl = "", nickName = "" } =
            item.sourceJson && JSON.parse(item.sourceJson);
          item.avatarUrl = avatarUrl;
          item.nickName = nickName;
        } else {
          item.avatarUrl = "";
          item.nickName = "";
        }

        item.sourceType == 1
          ? (item.sourcePosition = "teacher")
          : (item.sourcePosition = "student");
      });
      this.ruserContentList = result.data;
    },
    //获取提问批注内容列表
    getPhRuserContentList(item, index) {
      var Flag = this.listData[index].flag; // 先用一个变量接收一个原来的状态值
      this.listData.forEach((item, index) => {
        item.flag = false;
      });
      this.listData[index].flag = !Flag;
      sessionStorage.setItem("qaId", item.id);
      this.phRuserContentList(item.id);
    },
    /**
     * @description  点击切换存储状态判断是否是当前页
     */
    tabChange(tabsStatus, readStat, qaType, flag) {
      const conifg = {
        0: true,
        1: false,
        2: false,
        3: false,
        4: false
      };
      this.readStat = readStat;
      this.qaType = qaType;
      this.flag = flag;
      this.currentStat = conifg[tabsStatus];
      this.tabsStatus = tabsStatus;
      sessionStorage.setItem("tabsStatus", tabsStatus);
      sessionStorage.setItem("qaType", qaType);
      sessionStorage.setItem("readStat", readStat);
      sessionStorage.setItem("qaFlag", flag);
      this.$store.commit("SET_QATYPE", qaType);
      this.$store.commit("SET_READSTAT", readStat);
      this.$store.commit("SET_QAFLAG", flag);
      this.$emit("click", readStat, qaType);
    },

    /*
     * 当前页批注
     * currentPage是否是当前页状态 1是当前页
     * */

    currentDetail(item, currentPage = "") {
      const conifg = {
        1: item.type,
        "": item.filesType
      };
      let value;
      if (item.type == 1 || item.type == 5 || item.type == 9) {
        if (item.answerValue) {
          value = item.answerValue;
        } else {
          value = item.value;
        }
      } else {
        value = item.value;
      }

      this.replayType = conifg[currentPage];
      sessionStorage.setItem("qaPic", value);
      sessionStorage.setItem("currentQaId", item.qaId);
      sessionStorage.setItem("qaType", item.type);
      sessionStorage.setItem("qaRuserId", this.$route.query.ruserId);
      sessionStorage.setItem("qaLessSecCid", item.id);
      sessionStorage.setItem("qaLessSecId", item.lessSecId);
      sessionStorage.setItem("isCurrentPage", currentPage);
      sessionStorage.setItem("serialNum", "");
      sessionStorage.setItem("qaSwiperId", item.lessSecId);
      this.material = true;
    },
    //添加到素材库
    addToMaterial(val, index) {
      // this.$forceUpdate();手动更新
      this.$set(this.listData[index], "imgflag", true);
      this.upload(val, index);
    },
    //上传
    upload(imgSrc, index) {
      getImgToBase64(imgSrc, data => {
        const blob = dataURLtoBlob(data);
        //此处用于上传等操作
        const files = new File([blob], new Date().toISOString() + ".png", {
          type: "image/png"
        });
        const formData = new FormData();
        formData.append("file", files);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        config.headers["Authorization"] = "Bearer " + getToken();
        //文件上传
        const { courseId, lessonId, ruserId } = this.$route.query;
        axios
          .post(
            "/zuul/apps/ph/material/uploadMaterial?lessonId=" +
              lessonId +
              "&courseId=" +
              courseId +
              "&ruserId=" +
              ruserId,
            formData,
            config
          )
          .then(async res => {
            const result = await res.data;
            this.$set(this.listData[index], "imgflag", false);
            this.addImgStat = true;
          })
          .catch(error => {
            this.$message({
              message: "加入素材库失败",
              type: "warning"
            });
          });
      });
    },
    /*
     * 点击进入画板模式
     * 通过answerDraw判断是是老师提示、学生作答内容提交，还是批注
     * serialNum mark标记才有
     * */

    handleDraw(item) {
      sessionStorage.setItem("serialNum", "");
      sessionStorage.setItem("qaType", item.type);
      sessionStorage.setItem("qaRuserId", this.$route.query.ruserId);
      sessionStorage.setItem("qaLessSecCid", item.id);
      sessionStorage.setItem("qaLessSecId", item.lessSecId);
      sessionStorage.setItem("qaRuserLessid", this.$route.query.id);
      let imgUrl;
      if (item.answerValue) {
        imgUrl = item.answerValue;
      } else {
        imgUrl = item.value;
      }
      this.$router.push({
        path: "./draw",
        query: {
          src: imgUrl,
          key: Date.now(),
          answerDraw: 1
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common.scss";

* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.main {
  margin: 10px 15px 0 15px;
  background-color: #ffffff;
  border-radius: 8px;
  border: solid 1px #dcdfe6;
  padding: 18px 20px 38px 20px;

  .main-tabs-change {
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    div {
      height: 68px;
      line-height: 68px;
      text-align: center;
      font-size: 20px;
      flex: 1;

      &.active {
        border-bottom: 2px solid #449cfd;
        color: #449cfc;
      }
    }
  }

  /*文本/音频/图片*/
  .text-container,
  .audio-container,
  .pic-container {
    display: flex;

    p {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #666666;
      padding: 0 7px 4px 34px;
    }
  }

  /*画图题*/
  .marktag {
    margin-bottom: 30px;
  }

  /*音频题/图片题/文本题*/
  .audio-container-question,
  .pic-container-question,
  .text-container-question {
    margin-top: 10px;
    margin-bottom: 30px;
    position: relative;

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #666666;
      padding: 0 7px 4px 34px;

      .info-pic {
        width: 28px;
        height: 28px;
      }
    }
  }

  /*音频题*/
  .audio-container-question {
    .operatingBtns {
      position: absolute;
      left: 683px;
      top: 50%;
      margin-top: -20px;
    }
  }

  /*文本题*/
  .text-container-question {
    .operatingBtns {
      position: absolute;
      left: 683px;
      top: 50%;
      margin-top: -20px;
    }
  }

  /*图片题*/
  .pic-container-question {
    .operatingBtns {
      position: absolute;
      left: 683px;
      top: 59px;
    }

    .addMaterialBtns {
      position: absolute;
      left: 683px;
      top: 112px;
    }

    .drawingBtns {
      position: absolute;
      left: 683px;
      top: 165px;
    }
  }

  .questionaudio-container-question {
    margin-bottom: 30px;
    position: relative;

    .operatingBtns {
      position: absolute;
      left: 683px;
      top: 50%;
      margin-top: -20px;
    }
  }

  .questionRecordContainer {
    position: relative;

    .operatingBtns {
      position: absolute;
      left: 683px;
      top: 22px;
    }
  }

  .main-tabs-change-cont {
    padding-top: 42px;

    .VueAudio,
    .questionPicture,
    .Text,
    .questionRecord,
    .questionVideo {
      margin-bottom: 27px;
    }
  }

  .main-tabs {
    .noData {
      margin-top: 10px;
      line-height: 30px;
    }

    .expansion-list-item {
      margin-top: 27px;
      display: flex;
      flex: 1;

      img {
        width: 68px;
        height: 68px;
        border-radius: 100%;
        align-self: flex-end;
        margin-right: 33px;
      }

      .expansion-list-introduce {
        display: flex;
        justify-content: space-between;
        padding: 0 8px 7px 13px;
        font-size: 12px;
        color: #666666;
      }
    }

    .expansion-item-header {
      cursor: pointer;
      height: 73px;
      background-color: #f9fafc;
      border-radius: 4px 0 0 0;
      border: solid 1px #dcdfe6;
      margin-bottom: 10px;
      padding-right: 30px;
      display: flex;
      align-items: center;

      &:first-child {
        margin-top: 15px;
      }

      .item-header-desc {
        width: 180px;
        height: 73px;
        background-color: #f9fafc;
        border-radius: 4px 0 0 0;
        border: solid 1px #dcdfe6;
        border-left: none;
        display: flex;
        align-items: center;

        h1 {
          margin: 0 8px 0 11px;
          font-size: 26px;
        }
      }

      .item-header-ruser {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-family: PingFangSC-Regular;

        .person {
          width: 29.8%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            width: 46px;
            height: 46px;
            border-radius: 100%;
            margin: 0 16px 0 30px;
          }
        }

        .position {
          .red {
            color: #ff5a4e;
          }

          .green {
            color: #3eb982;
          }
        }

        .time {
          align-items: flex-end;

          span {
            margin: 0 22px 0 29px;
          }

          i {
            cursor: pointer;
          }
        }
      }
    }
  }

  .position-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 150px;
    align-items: center;

    .img-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        align-self: flex-end;
        margin-bottom: 10px;
        margin-right: 8px;
        cursor: pointer;
      }
    }
  }
}
</style>
