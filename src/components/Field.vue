<template>
  <div v-bind:class="getBoadStyle()">
    <div class="tr"></div>
    <div v-for="y in maze.size" :key="y" class="tr">
      <div class="cm"></div>
      <div v-for="x in maze.size" :key="x" v-bind:class="maze.getCell(x-1, y-1)">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import Maze from '../Maze';

export default class Field extends Vue {
  maze: Maze = new Maze();

  mounted() {
  }

  start() {
    this.maze.main();
  }

  reset() {
    this.maze.clear();
  }

  getBoadStyle(): String {
    return "s" + this.maze.size;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/****************************************************************/
/**                                                            **/
/**  board                                                     **/
/**                                                            **/
/****************************************************************/

div.s10 div.tr { height: 80px; }
div.s10 div.tr div { width: 80px; border-width: 16px 0px 0px 16px; }
div.s20 div.tr { height: 40px; }
div.s20 div.tr div { width: 40px; border-width: 8px 0px 0px 8px; }
div.s40 div.tr { height: 20px; }
div.s40 div.tr div { width: 20px; border-width: 4px 0px 0px 4px; }
div.s80 div.tr { height: 10px; }
div.s80 div.tr div { width: 10px; border-width: 2px 0px 0px 2px; }

/****************************************************************/
/**                                                            **/
/**  board                                                     **/
/**                                                            **/
/****************************************************************/

div {
  background-color: #eee;
}
div div.tr {
  display:flex;
}
div div.tr div {
  border:solid #fff;
  width: 100%;
  height: 100%;
  border-width: 3px 0px 0px 3px;
}
div div.tr div:last-child {
  width: 0px;
}
div div.tr:last-child {
  height: 0px;
}
div div.tr:last-child div {
  background-color: #fff;
}

div div.tr div.cm {
  border: none;
}

div div.tr div.c0 {
  border-color:#fff #fff #fff #fff;
}
div div.tr div.c8 {
  border-color: #fff #fff #fff #000;
}
div div.tr div.c4 {
  border-color:#000 #fff #fff #fff;
}
div div.tr div.c12 {
  border-color: #000 #fff #fff #000;
}
/* START */
div div.tr:nth-child(2) div:nth-child(2) {
  background-color: #fcc;
}
/* GOAL */
div div.tr:nth-last-child(2) div:nth-last-child(2) {
  background-color: #cfc;
}
</style>
