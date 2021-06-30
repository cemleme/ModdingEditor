<template>
  <select @change="changeValue">
      <option hidden value selected> -- change value -- </option>
    <option value="true">true</option>
    <option value="false">false</option>
  </select>
</template>

<script>
export default {
  inject: ["changeValue"],
};
</script>
