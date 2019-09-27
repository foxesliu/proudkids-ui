<script>
  export default {
    name: 'base-button',
    props: [],

    render(createElement) {
      return createElement(
        'a',
        {
          class: ['button', 'ripple', 'answer-ripple', 'question-ripple'],
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
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  a.button {
    font-family: PingFangSC-Regular;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    border: none;
    position: relative;
    width: 129px;
    height: 42px;
    line-height: 42px;
    border-radius: 35px;
    margin: 10px 1px;
    font-weight: 500;
    text-transform: uppercase;
    will-change: box-shadow, transform;
    transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    font-size: 18px;
    letter-spacing: 0.1px;
    padding-left: 18px;
  }


  a.button.question {
    background-image: linear-gradient(0deg, #ff6800 0%, #ff8d00 100%);
    box-shadow: 0px 6px 0px 0px #e04b00;
    color: #ffffff;

    i {
      width: 12px;
      height: 16px;
      color: #fff200;
    }
  }

  a.button.answer {
    background-image: linear-gradient(0deg, #ceff7c 0%, #f8fff0 100%);
    box-shadow: 0px 6px 0px 0px #5ca900;
    color: #548e05;

    i {
      width: 12px;
      height: 16px;
      color: #548e05;
    }
  }

  a.button:active {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }


  .ripple {
    position: relative;
    overflow: hidden
  }

  .ripple:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 1.2s, opacity 1s;
    background-image: radial-gradient(circle, #ff8d00 10%, transparent 10.01%)
  }

  .answer-ripple:after {
    background-image: radial-gradient(circle, #ff8d00 10%, transparent 10.01%);
  }

  .question-ripple:after {
    background-image: radial-gradient(circle, #548e05 10%, transparent 10.01%);
  }

  .ripple:active:after {
    transform: scale(0, 0);
    opacity: .2;
    transition: 0s
  }
</style>
