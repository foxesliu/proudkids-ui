<script>
  import Button from './BaseButton.vue'

  export default {
    name: "type-button",
    props: {
      type: {
        validator: function (typeStr) {
          if (typeof typeStr === 'string') {
            switch (typeStr) {
              case 'question':
              case 'answer':
                return true;
              default:
                return false;
            }
          } else return false;
        }
      }
    },
    render(createElement) {
      return createElement(Button,
        {
          class: [this.type, this.type + '-ripple'],
          on: {
            click: this.click
          }
        },
        this.$slots.default
      )
    },
    methods: {
      click() {
        this.$emit('click')
      }
    },
    components: {}
  };
</script>

