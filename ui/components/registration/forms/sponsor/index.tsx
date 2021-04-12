import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSponsorByQuery } from 'utils';
import { setSponsorNameAction } from 'redux/registration';
import { useDispatch } from 'react-redux';

const SponsorForm: React.FC = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const sponsorName = getSponsorByQuery(query);

  useEffect(() => {
    dispatch(setSponsorNameAction(sponsorName));
  }, []);

  return (
    <div>
      <span>Sponsor: {sponsorName}</span>
    </div>
  );
};

export default SponsorForm;
