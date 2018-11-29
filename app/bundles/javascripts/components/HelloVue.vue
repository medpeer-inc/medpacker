<template>
  <div class="hello-vue">
    <span class="message">{{ message }}</span>
  </div>
</template>

<script>
export default {
	data () {
		return {
			message: 'Hello Vue!!'
		};
	}
};
</script>

<style lang="scss" scoped>
.hello-vue {
  text-align: center;
  background-color: gray;

  .message {
    color: white;
  }
}
</style>
