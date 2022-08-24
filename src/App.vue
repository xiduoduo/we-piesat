<template>
      <div id="app">
            <router-view/>
      </div>
</template>

<style lang="less">
body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      width: 100%;
      /deep/.el-select-dropdown {
            background: rgba(19, 23, 35, 0.8);
            color: #ffffff;
            margin-left: -20px;
      }
      /deep/.el-select-dropdown__item.hover {
            background: linear-gradient(180deg, #68e8a8, #3781d6);
            color: #ffffff;
      }
      /deep/.el-select-dropdown__item {
            color: #ffffff;
      }
}
</style>
