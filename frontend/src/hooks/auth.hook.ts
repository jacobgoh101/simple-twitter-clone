import { Ref, computed, ComputedRef, watch, ref } from '@vue/composition-api';
import { IResponse } from 'swrv/dist/types';
import router, { ROUTE_NAME } from '../router';
import { $axios } from '../util/$axios.util';
import { useSwrvExtra } from '../util/swrv.util';

interface User {
  username: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface UseAuth {
  isAuthenticated: Ref<boolean>;
  user: ComputedRef<User | undefined | null>;
  mutate: IResponse['mutate'];
}

interface LoginPayload {
  username: string;
  password: string;
}

interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

enum SWR_KEYS {
  GET_ME = 'GET_ME',
  LOGOUT = 'LOGOUT',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

export const useAuth: () => UseAuth = () => {
  const { data: user, mutate } = useSwrvExtra(
    SWR_KEYS.GET_ME,
    () => $axios.get<User>('me').then((d) => d.data),
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );

  const isAuthenticated = computed(() => !!user.value);

  return { isAuthenticated, user, mutate };
};

export const useAuthInvalidation = (isSuccess: Ref<boolean>) => {
  const { mutate: invalidateAuth } = useAuth();
  watch(isSuccess, (v, ov) => {
    if (v && !ov) {
      invalidateAuth();
      if (router.currentRoute.fullPath !== '/') router.push('/');
    }
  });
};

export const useLogout = () => {
  const shouldLogout = ref(false);
  const { error, mutate: mutateLogout, isSuccess } = useSwrvExtra(
    () => (shouldLogout.value ? SWR_KEYS.LOGOUT : null),
    () => $axios.delete('sessions').then(() => true),
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );
  useAuthInvalidation(isSuccess);
  const logout = () => {
    if (shouldLogout.value) mutateLogout();
    else shouldLogout.value = true;
  };
  return { error, logout };
};

export const useLogin = () => {
  const payload = ref<LoginPayload | null>(null);
  const { error, mutate: mutateLogin, isSuccess } = useSwrvExtra(
    () => (payload.value ? SWR_KEYS.LOGIN : null),
    () => $axios.post('sessions', { ...payload.value }).then(() => true),
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );
  useAuthInvalidation(isSuccess);
  const login = (data: LoginPayload) => {
    payload.value = data;
    mutateLogin();
  };
  return { error, login };
};

export const useSignup = () => {
  const payload = ref<SignupPayload | null>(null);
  const { error, mutate: mutateSignup, isSuccess } = useSwrvExtra(
    () => (payload.value ? SWR_KEYS.SIGNUP : null),
    () =>
      $axios
        .post<User>('users', { ...payload.value })
        .then((d) => d.data),
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );
  useAuthInvalidation(isSuccess);
  const signup = (data: SignupPayload) => {
    payload.value = data;
    mutateSignup();
  };
  return { error, signup };
};
