import React, { useState } from 'react';

export default function InterestAccrualExample() {
  const [interestRate, setInterestRate] = useState(10);

  return (
    <React.Fragment>
      <label htmlFor="interestRate">Interest Rate:&nbsp;</label>
      <input name="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.valueAsNumber)} inputMode="numeric" />
    </React.Fragment>
  );
}
