import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ReviewRateSettings } from '../../database';

type RateBarProps = {
  register: UseFormRegisterReturn;
}

function RateBar({ register }: RateBarProps): JSX.Element {
  const [rate, setRate] = useState<number>(0);

  return (
    <div className="rate__bar">
      <div className="rate__group">
        {
          ReviewRateSettings.map(({ Name, Value }) => (
            <React.Fragment key={Name}>
              <input
                className="visually-hidden"
                id={`star-${Value}`}
                {...register}
                type="radio"
                defaultValue={Value}
                onClick={() => setRate(Value)}
              />
              <label
                className="rate__label"
                htmlFor={`star-${Value}`}
                title={Name}
                tabIndex={0}
              >
              </label>
            </React.Fragment>
          ))
        }
      </div>

      <div className="rate__progress">
        <span className="rate__stars">{rate}</span>
        <span>/</span>
        <span className="rate__all-stars">{ReviewRateSettings.length}</span>
      </div>
    </div>
  );
}

export default RateBar;
