<template>
  <button @click="addSubComponent">
    Add
  </button>
</template>


<script>
export default {
  inject: ["addSubComponent"],
}
</script>