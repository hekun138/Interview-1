#### vue原生拖拽上传
  1. 在根节点取消浏览器默认拖拽事件，防止拖拽文件丢入浏览器时直接打开文件，替换当前网站
  <template>
    <div ref="root_page"></div>
  </template>
  
  <script>
     export default {
        mounted() {
          // 组织文件拖入浏览器中直接打开文件
          this.$refs.root_frame.ondragleave = e => {
              e.preventDefault();
          };
          this.$refs.root_frame.ondrop = (e) => {
              e.preventDefault();
          };
          this.$refs.root_frame.ondragenter = (e) => {
              e.preventDefault();
          };
          this.$refs.root_frame.ondragover = (e) => {
              e.preventDefault();
          };
      },
     }
  </script>
  
  2. 在目标上传dom中处理拖拽事件，获取文件内容
  <template>
    <div ref="select_frame">
      <textarea @input="data = $event.target.value" :value="data"></textarea>
    </div>
  </template>
  <script>
      export default {
        data() {
          return {
            data: '', // 保存文件内容
          }
        }
      
        mounted() {
          this.dragLoadEvent();
        },
        
        methods: {
          // 拖动文件上传事件
          dragLoadEvent() {
            this.$refs.select_frame.ondragleave = e => {
                    e.preventDefault(); 
                    this.$refs.select_frame.childNodes[0].style.borderColor = '#9ea3a8';
                };
                this.$refs.select_frame.ondrop = (e) => {
                    e.preventDefault();   
                    this.$refs.select_frame.childNodes[0].style.borderColor = '#9ea3a8';
                    const data = e.dataTransfer.files;  // 获取文件对象
                    if (data.length < 1) {
                        return;  // 检测是否有文件拖拽到页面     
                    }
                    const formData = new FormData();
                    for (let i = 0; i < e.dataTransfer.files.length; i++) {
                        if (e.dataTransfer.files[i].name.indexOf('txt') === -1) {
                            alert('只允许上传.txt文件');
                            return;
                        }
                        formData.append('uploadfile', e.dataTransfer.files[i], e.dataTransfer.files[i].name);
                    }

                    const file = e.dataTransfer.files[0];
                    const reader = new FileReader();
                    reader.onload = e => {
                        this.data = this.dealNum(e.target.result);
                    };
                    reader.readAsText(file);
                };
                this.$refs.select_frame.ondragenter = (e) => {
                    e.preventDefault();
                    this.$refs.select_frame.childNodes[0].style.borderColor = 'red';
                };
                this.$refs.select_frame.ondragover = (e) => {
                    e.preventDefault();
                };
          }
        }
     }
  </script>
