import * as React from 'react';

interface CountDisplayProps {
  count: number;
}

export function CountDisplay({ count }: CountDisplayProps): JSX.Element {
  return (
    <div>
      <p>{count}</p>
    </div>
  );
}
