<template>
  <div class="pane-parent">
    <div class="pane-left">
      <h1>
        {{maze.question}} = <input v-model="answer" v-on:keydown.enter="onKeyDown" :disabled="statusGame!=1" />
      </h1>
    </div>
    <div class="pane-right">
      <div class="status">
        <h1>Attack</h1>
      </div>
      <div class="status">
        <h2 v-if="statusGame == 1">Game Start !</h2>
        <h2 v-if="statusGame == 8">Game Over !</h2>
        <h2 v-if="statusGame == 9">Game Clear !</h2>
      </div>
      <div class="status">
        <label v-for="it in this.levelList" :key="it">
          <input type="radio" v-model="maze.level" v-bind:value="it.id" @change="reset()" />{{it.name}}
        </label>
      </div>
      <div class="status">
        <button v-on:click="start()">START</button> |
        <button v-on:click="reset()">RESET</button>
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
import Maze from '../Maze';

@Options({
  components: {
    Timer,
  }
})
export default class Board extends Vue {
  maze = new Maze();

  counterAll = 0;
  counterMax = 10; // fixme: 10
  counterOk = 0;
  statusResult = 0; // 0:結果表示なし / 1:OK / 2:NG
  statusGame = 0;   // 0:停止 / 1:実行中 / 8: / 9:

  answer:string = "";

  timer:Timer|null = null;

  soundOk = require('@/assets/sounds/ok.mp3');
  soundNg = require('@/assets/sounds/ng.mp3');

  levelList = [{id:"add", name:"足し算"},{id:"sub", name:"引き算"},{id:"multi", name:"掛け算"}];

  mounted() {
    this.timer = this.$refs.timer as Timer;
  }

  data() {
    return {};
  }

  reset() {
    this.counterAll = 0;
    this.counterOk = 0;
    this.statusResult = 0;
    this.statusGame = 0;
    this.timer!.reset();
  }

  start() {
    this.reset();
    this.statusGame = 1;
    this.next();
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

  onKeyDown(e: any) {
    console.log(e.key);
    if(this.maze.check(this.answer)) {
      this.updateStatus(true);
      this.next();
    } else {
      this.updateStatus(false);
    }
  }

  next() {
    this.answer = "";
    this.counterAll++;
    if(this.statusGame == 1) this.maze.main();
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

h1 input {
  font-size: smaller;
}

div.pane-parent {
  display:flex;
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
