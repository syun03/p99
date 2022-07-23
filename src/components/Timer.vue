<template>
  <div>
    {{time.toFixed(1)}} sec
  </div>
</template>

<script lang="ts">
import { Options,Vue } from 'vue-class-component';

@Options({
  props: {
    interval: Number
  }
})
export default class Timer extends Vue {
  interval = 100;
  timer:number|null = null;
  startedAt:Date | null = null;
  time = 0;

  mounted() {
    const self = this;
    this.timer = setInterval(()=>{self.onTimer()}, this.interval);
  }
  beforeDestroy() {
      if(this.timer) {
          clearInterval(this.timer);
      }
  }

  start() {
      this.startedAt = new Date();
      this.onTimer();
  }
  stop() {
      this.onTimer();
      this.startedAt = null;
  }
  reset() {
      this.startedAt = null;
      this.time = 0;
  }

  onTimer() {
    if(!this.startedAt) return;

    const t:Date = this.startedAt!;
    const n = new Date();
    this.time = (n.getTime() - t.getTime()) / 1000;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
