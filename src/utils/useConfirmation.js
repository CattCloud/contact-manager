// useConfirmation.js
import { useState } from 'react';

export function useConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({});

  const confirm = ({ title, message, onConfirm, onCancel }) => {
    setConfig({ title, message, onConfirm, onCancel });
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    config.onConfirm?.();
  };

  const handleCancel = () => {
    setIsOpen(false);
    config.onCancel?.();
  };

  const modal = isOpen ? {
    isOpen: true,
    onClose: handleCancel,
    onConfirm: handleConfirm,
    title: config.title,
    message: config.message
  } : { isOpen: false };

  return [confirm, modal];
}