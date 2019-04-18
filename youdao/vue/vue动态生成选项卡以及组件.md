##### vue动态生成选项卡和组件
    <template>
        <div>
            <!-- 选项卡目录 -->
            <ul class="tabs-menu">
                <li :class="{'right-tabs-active':isActive == index}" 
                    :key="index"
                    @click="isActive=index"
                    v-for="(item, index) in tabsName"
                >{{item.name}}</li>
            </ul>
            <!-- 选项卡内容 -->
            <ul class="tabs-content">
            <li v-for="(item, index) in tabsName" v-if="isActive == index">
                <component :is="item.componentName" :key="index"></component>
            </li>
            </ul>
        </div>
    </template>
    
    <script>
        import ComponentPage1 from '../components/ComponentPage1';
        import ComponentPage2 from '../components/ComponentPage2';
        import ComponentPage3 from '../components/ComponentPage3';
        import ComponentPage4 from '../components/ComponentPage4';
        import ComponentPage5 from '../components/ComponentPage5';
        import ComponentPage6 from '../components/ComponentPage6';
        
        export default {
            name: 'tabs',
            components: {
                ComponentPage1,
                ComponentPage2,
                ComponentPage3,
                ComponentPage4,
                ComponentPage5,
                ComponentPage6
            }
            data() {
                return {
                    isActive: 0,
                    tabsName: [
                    { name: '选项卡-1', componentName: 'ComponentPage1' }, 
                    { name: '选项卡-2', componentName: 'ComponentPage2' }, 
                    { name: '选项卡-3', componentName: 'ComponentPage3' }, 
                    { name: '选项卡-4', componentName: 'ComponentPage4' }, 
                    { name: '选项卡-5', componentName: 'ComponentPage5' }, 
                    { name: '选项卡-6', componentName: 'ComponentPage6' }, 
                ]
                }
            }
        }
        
    </script>