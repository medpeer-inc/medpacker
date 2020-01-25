<template>
  <div>
    <div class="hello-medbear" />
    <img :src="src" alt="Hello Medbear2" />
    <!-- wired... -->
    <img :src="require('@image/medbear.png').default" alt="Hello Medbear3" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import img from '@image/medbear.png';

export default Vue.extend({
  computed: {
    src(): string {
      return img;
    }
  }
});
</script>

<style lang="scss" scoped>
.hello-medbear {
  width: 400px;
  height: 400px;
  background-image: url('~@image/medbear.png');
  background-repeat: no-repeat;
}
</style>
