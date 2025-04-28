import { useMutation } from '@tanstack/react-query';
import {LoginAuth } from '../api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: LoginAuth,
  });
};
