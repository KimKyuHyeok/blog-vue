<template>
    <div id="editor">
      <UpdateEditor/>
    </div>
  </template>
  
  <script>
  import UpdateEditor from '@/components/admin/post/UpdateEditor.vue';
  
  export default {
    name: 'PostEditAdmin',
    components: {
        UpdateEditor
    }
  }
  </script>
  
  <style>
  #editor {
    margin-top: 5%;
  }
  
  </style>