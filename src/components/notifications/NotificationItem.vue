<template>
  <div
    :class="success || info ? 'tw-bg-white' : 'tw-bg-red-50'"
    class="
      tw-max-w-sm
      tw-mb-3
      tw-rounded-lg
      tw-shadow-lg
      tw-cursor-pointer
      tw-pointer-events-auto
      tw-w-full
      tw-md:tw-w-96
    "
    @click.stop="hideNotificationAction"
    @mouseenter="clearNotificationTimeOut"
    @mouseleave="setNotificationTimeOut"
  >
    <div class="tw-overflow-hidden tw-rounded-lg tw-shadow-xs">
      <div class="tw-p-4">
        <div class="tw-flex tw-items-start">
          <div class="tw-shrink-0">
            <svg
              v-if="success"
              class="tw-w-6 tw-h-6 tw-text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              v-if="info"
              class="tw-w-6 tw-h-6 tw-text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-if="error"
              class="tw-w-6 tw-h-6 tw-text-red-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="tw-flex-1 tw-w-0 tw-ml-3 tw-text-left">
            <p
              :class="`tw-text-sm tw-leading-5 tw-font-medium ${
                success || info ? 'tw-text-gray-900' : 'tw-text-red-800'
              }`"
            >
              {{
                notification.title
                  ? notification.title
                  : success
                  ? 'Success!'
                  : 'Error'
              }}
            </p>
            <p
              :class="`tw-mt-1 tw-text-sm tw-leading-5 ${
                success || info ? 'tw-text-gray-500' : 'tw-text-red-700'
              }`"
            >
              {{
                notification.message
                  ? notification.message
                  : success
                  ? 'Successful'
                  : 'Something went wrong'
              }}
            </p>
          </div>
          <div class="tw-flex tw-shrink-0">
            <button
              :class="
                success || info
                  ? 'tw-text-gray-400 tw-focus:tw-text-gray-500'
                  : 'tw-text-red-400 tw-focus:tw-text-red-500'
              "
              class="
                tw-inline-flex
                tw-w-5
                tw-h-5
                tw-transition
                tw-duration-150
                tw-ease-in-out
                tw-focus:tw-outline-none
              "
              @click="hideNotificationAction"
            >
              <svg
                class="tw-w-6 tw-h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, computed, ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const props = defineProps({
  notification: {
    type: Object,
    default: null,
  },
})

const notificationStore = useNotificationStore()

let notiTimeOut = ref('')

const success = computed(() => {
  return props.notification.type == 'success'
})

const error = computed(() => {
  return props.notification.type == 'error'
})

const info = computed(() => {
  return props.notification.type == 'info'
})

function hideNotificationAction() {
  notificationStore.hideNotification(props.notification)
}

function clearNotificationTimeOut() {
  clearTimeout(notiTimeOut)
}

function setNotificationTimeOut() {
  notiTimeOut = setTimeout(() => {
    notificationStore.hideNotification(props.notification)
  }, props.notification.time || 5000)
}

onMounted(() => {
  setNotificationTimeOut()
})

</script>
