import useSWRV from 'swrv';
import { fetcherFn, IConfig, IKey } from 'swrv/dist/types';
import { computed, Ref, ref, watchEffect } from '@vue/composition-api';

export function useSwrvExtra<Data>(
  key: IKey,
  fn?: fetcherFn<Data>,
  config?: IConfig
) {
  const { data, error, isValidating, mutate } = useSWRV(key, fn, config);
  const { state, STATES } = useSwrvState(data, error, isValidating);
  return {
    data,
    error,
    isValidating,
    mutate,
    isStaleIfError: computed(() => state.value === STATES.STALE_IF_ERROR),
    isPending: computed(() => state.value === STATES.PENDING),
    isSuccess: computed(() => state.value === STATES.SUCCESS),
    isErrored: computed(() => state.value === STATES.ERROR),
  };
}

const STATES = {
  VALIDATING: 'VALIDATING',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  STALE_IF_ERROR: 'STALE_IF_ERROR',
};

function useSwrvState<Data>(
  data: Ref<Data>,
  error: Ref<any>,
  isValidating: Ref<boolean>
) {
  const state = ref('idle');
  watchEffect(() => {
    if (data.value && isValidating.value) {
      state.value = STATES.VALIDATING;
      return;
    }
    if (data.value && error.value) {
      state.value = STATES.STALE_IF_ERROR;
      return;
    }
    if (data.value === undefined && !error.value) {
      state.value = STATES.PENDING;
      return;
    }
    if (data.value && !error.value) {
      state.value = STATES.SUCCESS;
      return;
    }
    if (data.value === undefined && error) {
      state.value = STATES.ERROR;
      return;
    }
  });

  return {
    state,
    STATES,
  };
}
