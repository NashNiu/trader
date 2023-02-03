<template>
  <div class="chartContainer">
    <div id="tv_chart_container" class="tradingViewChart"></div>
    <el-dialog
      v-model="indicatorModal"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <div class="indicatorsBox">
        <div class="typeBox">
          <div class="itemBox">
            <p
              v-for="item in mainStudies"
              :key="item.name"
              class="item"
              :class="{ active: activeMainStudyName === item.name }"
              @click="changeStudy(item, 'main')"
            >
              {{ item.name }}
            </p>
          </div>
        </div>
        <div class="separator"></div>
        <div class="typeBox">
          <div class="itemBox">
            <p
              v-for="item in viceStudies"
              :key="item.name"
              class="item"
              :class="{ active: activeViceStudyName === item.name }"
              @click="changeStudy(item, 'vice')"
            >
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { useCommonStore, useChartStore } from '@/store/index.js';
import Widget from './chart_library.min.js';
import { computed, onMounted, ref, watch } from 'vue';
import widgetOption from './widgetOption';
import { useI18n } from 'vue-i18n';
import { chartLocal } from '@/lib/i18n/index.js';
const { locale } = useI18n();
const commonStore = useCommonStore();
const chartStore = useChartStore();
const activeChartName = computed(() => commonStore.chartData);
const tvWidget = computed(() => chartStore.tvWidget);
const activeMainStudyName = ref('');
const activeViceStudyName = ref('');
const indicatorsStyle = ref({
  left: '426px',
  top: '575px',
});
const indicatorModal = ref(false);
const mainStudies = computed(() => [
  {
    name: 'MA',
    value: 'Customer Moving Average',
    action: () =>
      tvWidget.value
        ?.activeChart()
        .createStudy('Customer Moving Average', false, false),
  },
  {
    name: 'BOLL',
    value: 'Bollinger Bands',
    action: () =>
      tvWidget.value
        ?.activeChart()
        .createStudy('Bollinger Bands', false, false),
  },
]);
const viceStudies = computed(() => [
  {
    name: 'MACD',
    value: 'MACD',
    action: () =>
      tvWidget.value
        ?.activeChart()
        .createStudy('MACD', false, false, [12, 26, 'close', 9]),
  },
  {
    name: 'KDJ',
    value: 'KDJ',
    action: () =>
      tvWidget.value?.activeChart().createStudy('KDJ', false, false, [9, 3, 3]),
  },
  {
    name: 'RSI',
    value: 'Customer RSI',
    action: () =>
      tvWidget.value
        ?.activeChart()
        .createStudy('Customer RSI', false, false, [6, 12, 24]),
  },
]);

// 初始化图表
const initChart = () => {
  if (activeChartName.value.symbol) {
    const widgetOptions = widgetOption({
      symbol: activeChartName.value.symbol,
      locale: chartLocal[locale.value] || 'en',
    });
    const tvWidget = new Widget(widgetOptions);
    chartStore.setWidget(tvWidget);
    tvWidget.onChartReady(() => {
      // 创建指标
      // changeStudy(mainStudies.value[0], 'main');
      // changeStudy(viceStudies.value[0], 'vice');
    });
    tvWidget.headerReady().then(() => {
      // js隐藏工具栏
      if (!tvWidget.hideAllDrawingTools().value()) {
        tvWidget.activeChart().executeActionById('drawingToolbarAction');
      }
      // createStudyBtn();
    });
  }
};
// 切换指标
const changeStudy = (study, type) => {
  const allStudy = tvWidget.value?.activeChart().getAllStudies();
  const viceStudyArr = viceStudies.value.map((item) => item.value);
  const mainStudyArr = mainStudies.value.map((item) => item.value);
  const otherType = type === 'main' ? viceStudyArr : mainStudyArr;
  const removeTarget = allStudy.filter(
    (item) => item.name !== study.value && !otherType.includes(item.name)
  );
  const activeTarget = allStudy.filter((item) => item.name === study.value);
  if (type === 'main') {
    if (activeMainStudyName.value === study.name) {
      activeMainStudyName.value = '';
    } else {
      activeMainStudyName.value = study.name;
    }
  }
  if (type === 'vice') {
    if (activeViceStudyName.value === study.name) {
      activeViceStudyName.value = '';
    } else {
      activeViceStudyName.value = study.name;
    }
  }
  if (activeTarget.length) {
    activeTarget.forEach((item) => {
      tvWidget.value?.activeChart().removeEntity(item.id);
    });
    return;
  }
  if (removeTarget) {
    removeTarget.forEach((item) => {
      tvWidget.value?.activeChart().removeEntity(item.id);
    });
  }
  study.action();
};
// 创建头部指标按钮
const createStudyBtn = () => {
  const button = tvWidget.value?.createButton?.();
  button.setAttribute('title', 'Indicators');
  button.innerHTML = `<span id="indicatorBtn">Indicators</span>`;
  button.addEventListener('click', (e) => {
    const container = document.getElementById('tv_chart_container');
    const containerLeft = container.offsetLeft;
    const containerTop = container.offsetTop;
    const rectObj = e.target?.parentNode?.parentNode?.getBoundingClientRect();
    indicatorsStyle.value = {
      left: containerLeft + rectObj.left + 'px',
      top: containerTop + rectObj.bottom + 'px',
    };
    indicatorModal.value = !indicatorModal.value;
  });
};

// 监听产品改变，切换图表
watch(activeChartName, (nv) => {
  if (nv.symbol && nv.id) {
    chartStore.changeSymbol(nv.symbol);
  } else {
    chartStore.$reset();
  }
});
onMounted(() => {
  initChart();
});
</script>
<style scoped lang="less">
.chartContainer {
  width: 100%;
  height: 100%;
  .tradingViewChart {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="less">
.chartContainer {
  .el-overlay {
    background-color: rgba(0, 0, 0, 0);
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
    .indicatorsBox {
      width: 115px;
      padding: 0.125rem 0;
      box-shadow: 0 2px 4px 0 #6b798866;
      position: fixed;
      background: #fff;
      font-size: 14px;
      top: v-bind('indicatorsStyle.top');
      left: v-bind('indicatorsStyle.left');
      .separator {
        margin: 6px 0;
        height: 1px;
        background-color: #e1ecf2;
      }
      .typeBox {
        .indicatorType {
          margin: 10px 10px 10px 5px;
          span {
            padding: 3px;
            border-radius: 4px;
          }
        }
        .itemBox {
          .item {
            padding: 2px 10px 2px 8px;
            height: 32px;
            box-sizing: border-box;
            line-height: 30px;
            cursor: pointer;
            /* border-radius: .1875rem; */
            &.active {
              background-color: #2196f3;
              color: #fff;
            }
          }
        }
      }
      &.dark {
        background: #1e222d;
        .separator {
          background-color: #363c4e;
        }
        .typeBox {
          .itemBox {
            .item {
              color: #b2b5be;
              &.active {
                color: #131722;
              }
            }
          }
        }
      }
    }
  }
}
</style>
