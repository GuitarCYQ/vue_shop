<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- gutter 每个col的间距  -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- @clear 清空的按钮 调用函数 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column width="95px" prop="goods_price" label="商品价格(元)"></el-table-column>
        <el-table-column width="70px" prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column width="140px" prop="add_time" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="goEditgoods(scope.row.goods_id)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 查询参数对象
      queryInfo: {
        // 搜索关键字
        query: '',
        // 显示第几页
        pagenum: 1,
        // 每页显示多少条
        pagesize: 10
      },
      // 商品列表
      goodslist: [],
      // 总数据条数
      total: 0
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList () {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }

      this.$message.success('获取商品列表成功！')
      this.goodslist = res.data.goods
      this.total = res.data.total
      console.log(res.data)
    },

    // 改变页数
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },

    // 改变每页显示的条数
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },

    // 根据id 删除
    async removeById (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message('已经取消删除')
      }

      const { data: res } = await this.$http.delete(`goods/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败')
      }

      this.$message.success('删除成功！')
      this.getGoodsList()
    },

    // 跳转到添加商品
    goAddpage () {
      // 跳转到goods/add页面
      this.$router.push('/goods/add')
    },

    // 跳转到修改商品
    goEditgoods (id) {
      // 跳转到goods/add页面
      this.$router.push({
        path: '/goods/edit',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
