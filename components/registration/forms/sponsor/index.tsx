import React from "react";
import { useRouter } from "next/router";
import { getSponsorByQuery } from "utils";

export const SponsorForm: React.FC = () => {
  const { query } = useRouter();

  const sponsorName = getSponsorByQuery(query);

  return (
    <div>
      <span>Sponsor: {sponsorName}</span>
    </div>
  );
};
