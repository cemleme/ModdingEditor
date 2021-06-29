<template>
  <li :class="isHeading ? 'heading' : ''">{{title}}</li>
  <ul v-if="value.length > 0">
    <component
      v-for="comp in value"
      :key="comp.title"
      :is="$store.getters.GetComponentName(comp.type)"
      :title="comp.title"
      :value="comp.value"
      :parentName="title"
    />
  </ul>
</template>

<script>

export default{
    props: {
        title: {
            type: String
        },
        value: {
        },
        isHeading: {
            type: Boolean,
            default:false
        }
    },
}
</script>


<style scoped>
.title{
    font-weight: bold;
}

.heading{
    background-color: coral;
}
</style>