<template>
  <div class="pane-parent">
    <div class="pane-left">
      <Field ref="field" />
    </div>
    <div class="pane-right">
      <div class="status">
        <h1>Maze Attack</h1>
      </div>
      <div class="status">
        <h2 v-if="statusGame == 1">Game Start !</h2>
        <h2 v-if="statusGame == 8">Game Over !</h2>
        <h2 v-if="statusGame == 9">Game Clear !</h2>
      </div>
      <div class="status">
        <label v-for="(i, v) in this.levelList" :key="i">
          <input type="radio" v-model="size" v-bind:value="i" @change="reset()">Lv. {{v}}
        </label>
      </div>
      <div class="status">
        <button v-on:click="start()">START</button> |
        <button v-on:click="btnOpend()"  v-bind:disabled="statusGame!=1">Opend</button> |
        <button v-on:click="btnClosed()" v-bind:disabled="statusGame!=1">Closed</button>
      </div>
      <div class="status counter">
        <div v-bind:style="'width:'+(counterAll/counterMax*100)+'%'">
        </div>
      </div>
      <div class="status">
        <h2><Timer ref="timer" /></h2>
      </div>
      <div class="status">
        <img alt="OK" src="../assets/img-ok.drawio.png" v-if="statusResult==1">
        <img alt="NG" src="../assets/img-ng.drawio.png" v-if="statusResult==2">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Timer from './Timer.vue';
import Field from './Field.vue';
import KeyHandler from '../KeyHandler';

@Options({
  components: {
    Timer,
    Field,
  }
})
export default class Board extends Vue {
  keyHandler = new KeyHandler(this);
  counterAll = 0;
  counterMax = 10; // fixme: 10
  counterOk = 0;
  statusResult = 0; // 0:結果表示なし / 1:OK / 2:NG
  statusGame = 0;   // 0:停止 / 1:実行中 / 8: / 9:

  timer:Timer|null = null;
  field:Field|null = null;

  levelList = {1:10, 2:20, 3:40, 4:80};
  size = 10;

  soundOk = require('@/assets/sounds/ok.mp3');
  soundNg = require('@/assets/sounds/ng.mp3');

  mounted() {
    this.timer = this.$refs.timer as Timer;
    this.field = this.$refs.field as Field;
  }

  data() {
    return {};
  }

  reset() {
    this.counterAll = 0;
    this.counterOk = 0;
    this.statusResult = 0;
    this.statusGame = 0;
    this.field!.maze!.size = this.size;
    this.field!.reset();
    this.timer!.reset();
  }

  start() {
    this.reset();
    this.statusGame = 1;
    this.field!.start();
    this.timer!.start();
  }

  updateStatus(s: boolean) {
    if(s) {
      // OK の時
      this.counterOk++;
      this.statusResult = 1;
      (new Audio(this.soundOk)).play();
    } else {
      // NG の時
      this.statusResult = 2;
      this.statusGame = 8;
      (new Audio(this.soundNg)).play();
    }
    if(this.counterOk == this.counterMax) {
      this.statusGame = 9;
    }
    if(this.statusGame != 1) {
      this.timer!.stop();
    }
    return s;
  }

  next() {
    this.counterAll++;
    if(this.statusGame == 1) this.field!.maze.main();
  }

  btnOpend() {
    if(this.statusGame!=1) return;
    this.updateStatus(!this.field!.maze.closed);
    this.next();
  }

  btnClosed() {
    if(this.statusGame!=1) return;
    this.updateStatus(this.field!.maze.closed);
    this.next();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  background-color: #eef;
  align: center;
}

h1,h2 {
  margin-block-start: 0px;
  margin-block-end: 0px;
  font-size: xxx-large;
}

div.pane-parent {
  display:flex;
}

div.pane-left {
  width: 70%;
}

div.pane-left {
  width: 70%;
}

div.pane-right {
  width: 30%;
}

/****************************************************************/
/**                                                            **/
/**  status                                                    **/
/**                                                            **/
/****************************************************************/

div.status {
  height: 80px;
}

div.status img {
  width: 100%;
}

div.status.counter {
  background-color: #ccc;
}

div.status.counter div {
  background-color: #0f0;
}

</style>
