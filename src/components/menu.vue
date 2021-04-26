<template>
  <div>
    <el-submenu v-if="menu.children" :index="menu.url">
      <!--index是elemenui要求使用的一个属性名称,代表标签的唯一标识
      menu.xxx中的menu是父组件传进来的,父组件里有个:menu=item,item是数组中的某整个元素-->
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{ menu.name }}</span>
      </template>
      <nav-menu
        v-for="(item, index) in menu.children"
        :menu="item"
        :key="index"
      ></nav-menu>
    </el-submenu>
    
    <el-menu-item v-else :index="menu.url">
      <i :class="menu.icon"></i>
      <span slot="title">{{ menu.name }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    menu: {
      // 因为上面的组件属性里有menu.xxx,所以这里要必须有menu这个属性
      // 但是menu属性里有没有东西无所谓
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>