<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>

        <!-- 提示区 -->
        <el-alert
          title="添加商品信息" center show-icon :closable="false" type="info">
        </el-alert>

        <!-- 步骤条区 -->
        <!-- :active="activeIndex 接收选中的项 -->
        <el-steps align-center :space="200" :active="activeIndex - 0" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>

        <el-form :model="goodslist" :rules="editFormRules" ref="editFormRef" label-width="100px" label-position="top">
          <!-- tab栏区域 -->
          <!-- :tab-position="'left'" 设置为左侧tab -->
          <el-tabs @tab-click="tabclicked" :before-leave="beforTabLeave" v-model="activeIndex" :tab-position="'left'">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="goodslist.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="goodslist.goods_price" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model="goodslist.goods_weight" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model="goodslist.goods_number" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="goods_cat">
                <el-cascader
                v-model="goodslist.goods_cat"
                :options="catelist"
                expand-trigger="hover"
                :props="cateProps"
                @change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
              <!-- 渲染表单的Item项 -->
              <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                <!-- 复选框组 -->
                 <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox border :label="cb" v-for="(cb, i) in item.attr_vals" :key="i"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <!-- action 表示图片要上传到的api地址 -->
              <!-- on-preview 图片预览-->
              <!-- on-remove 关闭预览 -->
              <!-- list-type 类型 -->
              <!-- headers 请求头 -->
              <!-- on-success 图片上传成功的钩子 -->
              <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <!-- 富文本编辑器组件 -->
              <quill-editor v-model="goodslist.goods_introduce"></quill-editor>
              <!-- 添加商品 -->
              <el-button type="primary" class="btnAdd" >添加商品</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>

    </el-card>

     <!-- 预览图片  -->
    <!-- <el-dialog
    title="图片预览"
    :visible.sync="previewVisible"
    width="50%"
    >
      <img :src="previewPath" alt="" class="previewImg">
    </el-dialog> -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      goodslist: [],
      editFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 获取所有商品分类数据
    async getGoodsList () {
      var id = parseInt(this.$route.query.id)
      const { data: res } = await this.$http.get(`goods/${id}`)
      console.log(res)

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }

      this.goodslist = res.data
    }

  },
  computed: {

  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.previewImg {
  width: 100%;
}

.btnAdd {
  margin-top: 15px;
}

</style>
