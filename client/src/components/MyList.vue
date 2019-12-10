<template>
  <div>
    <b-button class="my-button" pill variant="success" v-on:click="update">Update Files</b-button>
    <div>
      <b-modal ref="modal" id="modal-center" centered size="xl" scrollable=true hide-footer=true hide-header=true>
        <div id="dplayer"></div>
      </b-modal>
    </div>

    <div role="tablist">
      <b-card no-body class="mb-1"
        v-for="(value, key, index) in this.$store.state.files"
        v-bind:key="index"
      >
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle="'accordion-' + index" variant="light">{{get_folder_name(key)}}</b-button>
        </b-card-header>
        <b-collapse :id="'accordion-'+index" accordion="my-accordion" role="tabpanel">
          <b-list-group v-for="(file) in value" v-bind:key="file">
            <b-list-group-item variant="primary" v-on:click="start_to_play(file)">{{get_file_name(key, file)}}</b-list-group-item>
          </b-list-group>
        </b-collapse>
      </b-card>
    </div>

  </div>
</template>

<script>
import "dplayer/dist/DPlayer.min.css";
import DPlayer from "dplayer";

export default {
  name: "MyList",
  props: {
    files: String
  },
  methods: {
    update() {
      //this.$store.dispatch("updateFiles");
      this.$store.dispatch("update_and_filter_files");
    },
    get_folder_name(key) {
      return key.replace(this.$store.state.info["root_folder"] + "/", "");
    },
    get_file_name(key, value) {
      return value.replace(key + "/", "");
    },
    start_to_play(file) {
      let real_path = this.$store.state.host + "media/" + file.replace(this.$store.state.info["root_folder"] + "/", "")

      this.$refs['modal'].show()

      setTimeout(function(){ 
        let dp = new DPlayer({
          container: document.getElementById("dplayer"),
          autoplay: true,
          video: {
            url: real_path,
          },
        })
        window.console.log(dp)
      }, 200);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-button {
  margin: 20px;
}
</style>
