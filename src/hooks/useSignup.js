import { useMutation } from '@tanstack/react-query';
import { SignupAuth } from '../api/auth';

export const useSignup = () => {
  return useMutation({
    mutationFn: SignupAuth,
  });
};
