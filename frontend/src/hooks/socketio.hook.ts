import { onBeforeUnmount, ref } from '@vue/composition-api';
import io from 'socket.io-client';
import { Tweet } from '../api/tweet.api';

export const useTwtListEvent = () => {
  const socket = io(process.env.VUE_APP_SOCKET_IO_BASE_URL, {
    path: '/api/v1/socket.io',
  });
  const data = ref<Tweet[] | null>(null);
  socket.emit('join-tweet-channel', (payload: Tweet[]) => {
    data.value = payload;
  });
  socket.on('new-twt-list', (payload: Tweet[]) => {
    data.value = payload;
  });
  onBeforeUnmount(() => {
    socket.close();
  });
  return { data };
};
