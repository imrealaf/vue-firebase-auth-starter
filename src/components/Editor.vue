<template>
  <TineMCE
    api-key="vmalv2n85kqixdmq2ctnbz46a2eix597asx5vsn0j9zek76e"
    :init="config"
    v-model="content"
  />
</template>
<script>
import TineMCE from '@tinymce/tinymce-vue';
import config from '@/config/tiny';

export default {
  components: {
    TineMCE
  },
  props: {
    content: String
  },
  data() {
    return {
      config
    };
  }
};
</script>