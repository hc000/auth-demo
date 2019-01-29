<template>
    <div id="secure" class="center-back">
        <div class="center">
            <div id="counter">Counter: {{count}}  <button class="btn" @click="showModal">Increment</button></div>

        </div>
        <Modal v-show="isModalVisible" @close="closeModal" @revert="revertCount" :count="count" :prevCount="prevCount"/>
    </div>
</template>

<script>
import Modal from "../components/Modal.vue";

    export default {
        name: 'Secure',
        components:{
            Modal
        },
        data() {
            return {
                count: 0,
                prevCount: 0,
                isModalVisible: false
            }
        },
        methods: {
            showModal() {

                var config = {
                    headers:{
                        "x-access-token": this.$parent.token,
                        "Content-Type": "application/json"
                    }
                }

                this.$http.post("http://localhost:3000/api/auth/increment",{"count":this.count},config).then(function(res){
                    this.prevCount = this.count;
                    this.count = res.body.count;
                },function(error){
                    console.error(error);
                });
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            revertCount(){
                this.count = this.prevCount;
            }
        }
    }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }

.center-back {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
</style>