<script>
export default {
  name: "Modal",
  props:{
    prevCount: {
      type: Number
    },    
    count: {
      type: Number
    },

  },
  data: () => ({
    aprevCount: 1,
    acount: 2
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    cancel(){
        this.$emit("revert");
        this.$emit("close");
    }
  }
};
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <div>Current: {{ prevCount }}</div>
        <div>Next: {{ count }}</div>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-green" @click="cancel">
              Cancel
            </button>
            <button type="button" class="btn-green" @click="close">
              Confirm
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.1s ease;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
.modal-header,
.modal-footer {
  padding: 5px;
  text-align: center;
}
.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}
.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #000;
  background: transparent;
  text-align: right;
}
.btn-green {
  color: white;
  background: #828282;
  border: 1px solid #828282;
  border-radius: 2px;
  margin: 5px;
}
.added-text {
  margin-block-end: -10px;
  margin-block-start: 0.5rem;
}
</style>