<template>
  <Board />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Board from './components/Board.vue';

@Options({
  components: {
    Board,
  },
})
export default class App extends Vue {}
</script>

<style>
html,body,div {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>
