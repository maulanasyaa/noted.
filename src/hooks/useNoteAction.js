import { useCallback, useState } from 'react';

function useNoteAction() {
  const [actionError, setActionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const executeAction = useCallback(async (action, ...args) => {
    setActionError('');
    setIsSubmitting(true);

    try {
      const result = await action(...args);

      if (result.error) {
        setActionError(result.message);
      }

      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { actionError, isSubmitting, executeAction };
}

export default useNoteAction;
