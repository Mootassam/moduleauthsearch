import React, { useEffect } from 'react';
import ProgressBar from '@view/shared/ProgressBar';

export default function LoadingComponent() {
  useEffect(() => {
    ProgressBar.start();
    return () => {
      ProgressBar.done();
    };
  }, []);

  return <div />;
}
