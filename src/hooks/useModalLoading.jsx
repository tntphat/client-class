import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { doPushIsLoadingModal } from '../redux/slice';

export const useModalLoading = () => {
  const dispatch = useDispatch();
  const isLoadingModal = useSelector((state) => state.modalLoading.isLoading);

  const handleCloseModalLoading = () => {
    dispatch(doPushIsLoadingModal(false));
  };

  const handleOpenModalLoading = () => {
    dispatch(doPushIsLoadingModal(true));
  };

  return { handleCloseModalLoading, handleOpenModalLoading, isLoadingModal };
};
