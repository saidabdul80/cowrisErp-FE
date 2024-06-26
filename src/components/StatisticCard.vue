<template>
<div class="tw-border tw-rounded tw-p-3">
    <div class="tw-text-gray-500 tw-font-bold tw-mb-2">{{ label }}</div>
      <v-card class="tw-flex tw-items-center tw-p-4 tw-shadow-lg tw-min-h-[160px]">
        <div class="tw-flex tw-justify-center tw-items-center tw-bg-gray-100 tw-rounded-full tw-p-2 tw-mb-2 tw-mr-4">
          <v-icon :color="iconColor" size="x-large" :icon="icon"></v-icon>
        </div>
        <div>        
          <div class="tw-text-2xl tw-font-bold tw-mb-1" ref="valueRef">{{helpers.formatMoney(animatedValue) }}</div>
          <div class="tw-flex tw-items-center">
            <v-icon small class="tw-mr-1" color="blue">{{ percentageIcon }}</v-icon>
            <div :class="percentageColorClass" class="tw-text-sm">{{ percentage.toFixed(1) }}% from previous</div>
          </div>
        </div>
        <!-- <v-btn icon class="tw-absolute tw-text-xl tw-top-2 tw-right-2" :color="buttonColor">
          <v-icon icon="mdi-plus"></v-icon>
        </v-btn> -->
      </v-card>
      <div class="">        
        <div class="tw-shadow-xl tw-p-2 tw-rounded tw-bg-white tw-my-3">
          <span> Completed Transactions:</span> <span class="tw-font-bold">{{ card?.completedTransactions }} </span></div>
        <div class="tw-shadow-xl tw-p-2 tw-rounded tw-bg-white tw-my-3">
          <span> Failed Transactions:</span> <span class="tw-font-bold">{{ card?.failedTransactions }} </span></div>
        <div class="tw-shadow-xl tw-p-2 tw-rounded tw-bg-white tw-my-3">
          <span> Total Transactions:</span> <span class="tw-font-bold">{{ card?.totalTransactions }} </span></div>
      </div>
</div>
  </template>
  
  <script>
  import { CountUp } from 'countup.js';
  import {helpers} from '@/helpers/utilities'
  export default {
    name: 'StatisticCard',
    props: {
      icon: {
        type: String,
        required: true
      },
      iconColor: {
        type: String,
        default: 'blue'
      },
      value: {
        type: [String, Number],
        required: true
      },
      label: {
        type: String,
        required: true
      },
      percentage: {
        type: Number,
        required: true
      },
      percentageIcon: {
        type: String,
        default: 'mdi-arrow-up'
      },
      buttonColor: {
        type: String,
        default: 'primary'
      },
      card:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        helpers:helpers,
        animatedValue: '0.00'
      };
    },
    computed: {
      percentageColorClass() {
        return this.percentage > 0 ? 'tw-text-green-700' : 'tw-text-red-500';
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(newVal) {
          this.startCountUp(newVal);
        }
      }
    },
    methods: {
        startCountUp(endValue) {
        const options = {
            startVal: 0,
            duration: 2
        };
        const countUp = new CountUp(this.$refs.valueRef, endValue, options);
        if (!countUp.error) {
            countUp.start(() => {
            this.animatedValue = countUp.endVal.toFixed(2);
            });
        } else {
            console.error(countUp.error);
        }
    }
    },
    mounted() {
      this.startCountUp(this.value);
    }
  };
  </script>
  
  <style scoped>
  .shadow-lg {
    box-shadow: 0 7px 7px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  </style>
  