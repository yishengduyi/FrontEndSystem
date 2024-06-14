<template>
  <div class="container">
    <!-- 数据表格 -->
    <div class="table-wrapper">
      <el-table :data="filteredData" style="width: 100%" border stripe>
        <el-table-column fixed label="字段名称" width="150">
          <template #default="{row}">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column fixed label="值" width="300">
          <template #default="{row}">
            {{ row.value }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 操作按钮 -->

      <div style="margin-top: 20px;">
        <el-button type="danger" @click="deleteAll">删除数据包</el-button>
        <el-button type="primary" @click="reloadData">重新检测</el-button>
      </div>
    </div>

    <pre class="packet-data">

  <span v-for="line in rawPacketData" :key="line.offset">
    {{ line.offset }}  {{ line.hex }}  {{ line.ascii }}
  </span>
</pre>
  </div>
</template>

<style>
.packet-data {
  white-space: pre;
  font-family: 'Consolas', 'Monaco', monospace;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.table-wrapper {
  width: calc(100% - 500px); /* 保留空间给原始数据 */
}
.packet-data{
  width: 1000px; /* 设置原始数据区域的宽度 */
  overflow-x: auto; /* 如果内容太宽，则允许滚动 */
  white-space: pre-wrap; /* 保持文本格式，允许自动换行 */
  /*background-color: #f5f5f5; !* 背景色 *!*/
  /*border: 1px solid #eaecef; !* 边框颜色 *!*/
  padding: 10px; /* 内填充 */
  margin-left: 20px; /* 与表格之间的空隙 */
}
</style>

<script>
export default {
  name: 'NetworkPacketDetails',
  data() {
    return {
      packets: [], // JSON数据从外部加载
      filteredData: [],
      rawPacketData: [
        { offset: '0000', hex: '78 e4 00 6c 39 cd 38 72 c0 5e 6b 22 08 00 45 00', ascii: 'x..l9.8r.^k"..E.' },
        { offset: '0010', hex: '00 80 f8 92 00 00 34 11 73 a9 08 08 08 08 0a 00', ascii: '......4.s.......' },
        { offset: '0020', hex: '00 22 00 35 87 df 00 6c d6 1e 84 6c 81 80 00 01', ascii: '".5...l...l....' },
        { offset: '0030', hex: '00 02 00 00 00 00 03 6c 68 35 11 67 6f 6f 67 6c', ascii: '.......lh5.googl' },
        { offset: '0040', hex: '65 75 73 65 72 63 6f 6e 74 65 6e 74 03 63 6f 6d', ascii: 'eusercontent.com' },
        { offset: '0050', hex: '00 00 1c 00 01 c0 0c 00 05 00 01 00 00 54 49 00', ascii: '.............TI.' },
        { offset: '0060', hex: '11 0c 67 6f 6f 67 6c 65 68 6f 73 74 65 64 01 6c', ascii: '..googlehosted.l' },
        { offset: '0070', hex: 'c0 10 c0 37 00 1c 00 01 00 00 01 15 00 10 2a 00', ascii: '...7..........*.' },
        { offset: '0080', hex: '14 50 40 0c 0c 0a 00 00 00 00 00 00 00 84      ', ascii: '.P@...........' },
      ], // 存储原始数据的新属性
    };
  },
  created() {
    this.loadData();
    this.loadRawData();
  },
  methods: {
    loadData() {
      // 模拟从API获取数据，实际开发中请替换成API请求
      this.packets = [
        {

          "_source": {
            "layers": {
              "frame": {
                "frame.section_number": "1",
                "frame.interface_id": "0",
                "frame.interface_id_tree": {
                  "frame.interface_name": "unknown"
                },
                "frame.encap_type": "1",
                "frame.time": "Mar 25, 2015 01:24:08.057275000 中国标准时间",
                "frame.time_utc": "Mar 24, 2015 17:24:08.057275000 UTC",
                "frame.time_epoch": "1427217848.057275000",
                "frame.offset_shift": "0.000000000",
                "frame.time_delta": "0.000442000",
                "frame.time_delta_displayed": "0.000442000",
                "frame.time_relative": "35.437286000",
                "frame.number": "27",
                "frame.len": "142",
                "frame.cap_len": "142",
                "frame.marked": "0",
                "frame.ignored": "0",
                "frame.protocols": "eth:ethertype:ip:udp:dns",
                "frame.coloring_rule.name": "UDP",
                "frame.coloring_rule.string": "udp"
              },
              "eth": {
                "eth.dst": "78:e4:00:6c:39:cd",
                "eth.dst_tree": {
                  "eth.dst_resolved": "HonHaiPrecis_6c:39:cd",
                  "eth.dst.oui": "7922688",
                  "eth.dst.oui_resolved": "Hon Hai Precision Ind. Co.,Ltd.",
                  "eth.addr": "78:e4:00:6c:39:cd",
                  "eth.addr_resolved": "HonHaiPrecis_6c:39:cd",
                  "eth.addr.oui": "7922688",
                  "eth.addr.oui_resolved": "Hon Hai Precision Ind. Co.,Ltd.",
                  "eth.dst.lg": "0",
                  "eth.lg": "0",
                  "eth.dst.ig": "0",
                  "eth.ig": "0"
                },
                "eth.src": "38:72:c0:5e:6b:22",
                "eth.src_tree": {
                  "eth.src_resolved": "Comtrend_5e:6b:22",
                  "eth.src.oui": "3699392",
                  "eth.src.oui_resolved": "Comtrend Corporation",
                  "eth.addr": "38:72:c0:5e:6b:22",
                  "eth.addr_resolved": "Comtrend_5e:6b:22",
                  "eth.addr.oui": "3699392",
                  "eth.addr.oui_resolved": "Comtrend Corporation",
                  "eth.src.lg": "0",
                  "eth.lg": "0",
                  "eth.src.ig": "0",
                  "eth.ig": "0"
                },
                "eth.type": "0x0800"
              },
              "ip": {
                "ip.version": "4",
                "ip.hdr_len": "20",
                "ip.dsfield": "0x00",
                "ip.dsfield_tree": {
                  "ip.dsfield.dscp": "0",
                  "ip.dsfield.ecn": "0"
                },
                "ip.len": "128",
                "ip.id": "0xf892",
                "ip.flags": "0x00",
                "ip.flags_tree": {
                  "ip.flags.rb": "0",
                  "ip.flags.df": "0",
                  "ip.flags.mf": "0"
                },
                "ip.frag_offset": "0",
                "ip.ttl": "52",
                "ip.proto": "17",
                "ip.checksum": "0x73a9",
                "ip.checksum.status": "2",
                "ip.src": "8.8.8.8",
                "ip.addr": "8.8.8.8",
                "ip.src_host": "8.8.8.8",
                "ip.host": "8.8.8.8",
                "ip.dst": "10.0.0.34",
                "ip.addr": "10.0.0.34",
                "ip.dst_host": "10.0.0.34",
                "ip.host": "10.0.0.34"
              },
              "udp": {
                "udp.srcport": "53",
                "udp.dstport": "34783",
                "udp.port": "53",
                "udp.port": "34783",
                "udp.length": "108",
                "udp.checksum": "0xd61e",
                "udp.checksum.status": "2",
                "udp.stream": "6",
                "Timestamps": {
                  "udp.time_relative": "0.135413000",
                  "udp.time_delta": "0.000442000"
                },
                "udp.payload": "84:6c:81:80:00:01:00:02:00:00:00:00:03:6c:68:35:11:67:6f:6f:67:6c:65:75:73:65:72:63:6f:6e:74:65:6e:74:03:63:6f:6d:00:00:1c:00:01:c0:0c:00:05:00:01:00:00:54:49:00:11:0c:67:6f:6f:67:6c:65:68:6f:73:74:65:64:01:6c:c0:10:c0:37:00:1c:00:01:00:00:01:15:00:10:2a:00:14:50:40:0c:0c:0a:00:00:00:00:00:00:00:84"
              },
              "dns": {
                "dns.id": "0x846c",
                "dns.flags": "0x8180",
                "dns.flags_tree": {
                  "dns.flags.response": "1",
                  "dns.flags.opcode": "0",
                  "dns.flags.authoritative": "0",
                  "dns.flags.truncated": "0",
                  "dns.flags.recdesired": "1",
                  "dns.flags.recavail": "1",
                  "dns.flags.z": "0",
                  "dns.flags.authenticated": "0",
                  "dns.flags.checkdisable": "0",
                  "dns.flags.rcode": "0"
                },
                "dns.count.queries": "1",
                "dns.count.answers": "2",
                "dns.count.auth_rr": "0",
                "dns.count.add_rr": "0",
                "Queries": {
                  "lh5.googleusercontent.com: type AAAA, class IN": {
                    "dns.qry.name": "lh5.googleusercontent.com",
                    "dns.qry.name.len": "25",
                    "dns.count.labels": "3",
                    "dns.qry.type": "28",
                    "dns.qry.class": "0x0001"
                  }
                },
                "Answers": {
                  "lh5.googleusercontent.com: type CNAME, class IN, cname googlehosted.l.googleusercontent.com": {
                    "dns.resp.name": "lh5.googleusercontent.com",
                    "dns.resp.type": "5",
                    "dns.resp.class": "0x0001",
                    "dns.resp.ttl": "21577",
                    "dns.resp.len": "17",
                    "dns.cname": "googlehosted.l.googleusercontent.com"
                  },
                  "googlehosted.l.googleusercontent.com: type AAAA, class IN, addr 2a00:1450:400c:c0a::84": {
                    "dns.resp.name": "googlehosted.l.googleusercontent.com",
                    "dns.resp.type": "28",
                    "dns.resp.class": "0x0001",
                    "dns.resp.ttl": "277",
                    "dns.resp.len": "16",
                    "dns.aaaa": "2a00:1450:400c:c0a::84"
                  }
                },
                "dns.response_to": "19",
                "dns.time": "0.135376000"
              }
            }
          }
        }
      ]
      ; // 将您的JSON数据放在这里
      this.filteredData = [];
      this.packets.forEach(packet => {
        this.filteredData.push({ name: '时间', value: packet._source.layers.frame['frame.time'] });
        this.filteredData.push({ name: '捕获长度', value: packet._source.layers.frame['frame.cap_len'] });
        // this.filteredData.push({ name: '协议', value: packet._source.layers.frame['frame.protocols'].split(':').slice(2).join(':') });
        // this.filteredData.push({ name: '以太网', value: packet._source.layers.frame['frame.cap_len'] });

        this.filteredData.push({ name: '以太网源MAC地址', value: packet._source.layers.eth['eth.src'] });
        this.filteredData.push({ name: '以太网目的MAC地址', value: packet._source.layers.eth['eth.dst'] });
        this.filteredData.push({ name: '网络层协议', value:"ip"});
        this.filteredData.push({ name: '数据链路层协议', value:"udp"});
        this.filteredData.push({ name: '应用层协议', value:"dns"});

        this.filteredData.push({ name: 'IP版本', value: packet._source.layers.ip['ip.version'] });
        this.filteredData.push({ name: '源IP地址', value: packet._source.layers.ip['ip.src'] });
        this.filteredData.push({ name: '目标IP地址', value: packet._source.layers.ip['ip.dst'] });
        this.filteredData.push({ name: 'UDP源端口', value: packet._source.layers.udp['udp.srcport'] });
        this.filteredData.push({ name: 'UDP目标端口', value: packet._source.layers.udp['udp.dstport'] });
        this.filteredData.push({ name: 'DNS响应名称', value: packet._source.layers.dns.Answers["lh5.googleusercontent.com: type CNAME, class IN, cname googlehosted.l.googleusercontent.com"]['dns.resp.name'] });
        this.filteredData.push({ name: 'DNS TTL', value: packet._source.layers.dns.Answers["lh5.googleusercontent.com: type CNAME, class IN, cname googlehosted.l.googleusercontent.com"]['dns.resp.ttl'] });
        this.filteredData.push({ name: 'DNS Answers类型', value:"TXT"});
      });
    },
    loadRawData() {

    }
  },
    deleteField(row) {
      this.filteredData = this.filteredData.filter(item => item !== row);
    },
    reloadField(row) {
      this.loadData(); // 模拟重新加载特定字段
    }

};
</script>

<style scoped>
.el-table .cell {
  text-align: center;
}
</style>
