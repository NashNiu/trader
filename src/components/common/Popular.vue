<template>
  <el-table :data="tableData" style="width: 100%" height="300" class="table1">
    <el-table-column prop="d1" label="Financial tool" width="180" />
    <el-table-column prop="d2" label="Change" width="180" />
    <el-table-column prop="d3" label="Sell" />
    <el-table-column>
      <template #header> </template>
      <template #default="scope">
        <el-button
          round
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          >Sell</el-button
        >
      </template>
    </el-table-column>
    <el-table-column prop="d4" label="Buy" />
    <el-table-column>
      <template #header> </template>
      <template #default="scope">
        <el-button
          round
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          >Buy</el-button
        >
      </template>
    </el-table-column>
    <el-table-column prop="d5" label="High/low" />
  </el-table>
</template>

<script setup>
const handleEdit = () => {};
const tableData = [
  {
    d1: 'AUD/USD',
    d2: '-20%',
    d3: '45.25',
    d4: '46.25',
    d5: '0.354154/.0548484',
  },
  {
    d1: 'AUD/USD',
    d2: '-20%',
    d3: '45.25',
    d4: '46.25',
    d5: '0.354154/.0548484',
  },
  {
    d1: 'AUD/USD',
    d2: '-20%',
    d3: '45.25',
    d4: '46.25',
    d5: '0.354154/.0548484',
  },
  {
    d1: 'AUD/USD',
    d2: '-20%',
    d3: '45.25',
    d4: '46.25',
    d5: '0.354154/.0548484',
  },
];
</script>

<style scoped>
.table1 {
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  margin-top: 22px;
}
</style>
