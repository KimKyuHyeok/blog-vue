<template>
  <div id="editor">
    <Editor/>
  </div>
</template>

<script>
import Editor from '@/components/admin/post/Editor.vue';

export default {
  name: 'PostWriteAdmin',
  components: {
    Editor
  }
}
</script>

<style>
#editor {
  margin-top: 5%;
}

</style>