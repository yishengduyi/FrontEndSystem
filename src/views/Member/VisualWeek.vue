<template>
  <div class="client-list">
    <el-button type="primary" @click="$router.push('/add-client')">添加客户端</el-button>
    <el-table :data="clients" style="width: 100%">
      <el-table-column prop="name" label="客户端名称" width="180"></el-table-column>
      <el-table-column label="是否在线" width="120">
        <template v-slot:default="{ row }">
          <el-tag :type="row.isOnline ? 'success' : 'danger'">{{ row.isOnline ? '在线' : '离线' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lastReportTime" label="最后上报数据时间" width="180"></el-table-column>
      <el-table-column prop="addedTime" label="添加时间" width="180"></el-table-column>
      <el-table-column prop="reportCount" label="上报数据条数" width="150"></el-table-column>
      <el-table-column prop="dohCount" label="DOH数据条数" width="150"></el-table-column>
      <el-table-column label="操作" width="360">
        <template v-slot:default="{ row }">
          <el-button size="mini" @click="$router.push(`/edit-client/${row.id}`)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteClient(row.id)">删除</el-button>
          <el-button size="mini" type="info" @click="$router.push(`/client-details/${row.id}`)">详细信息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clients: this.generateClients(15) // 假设我们要生成 15 条客户端数据
    };
  },
  methods: {
    generateClients(count) {
      return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        name: `客户端${index + 1}`,
        isOnline: Math.random() >= 0.5,
        lastReportTime: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)).toLocaleString(),
        addedTime: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)).toDateString(),
        reportCount: Math.floor(Math.random() * 50000), // 随机生成上报数据条数，假设最多 5000 条
        dohCount: Math.floor(Math.random() * 50) // 随机生成含有 DOH 数据的数量，假设最多 500 条
      }));
    },
    deleteClient(id) {
      this.clients = this.clients.filter(client => client.id !== id);
    }
  }
};
</script>
