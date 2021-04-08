import { Stages } from "components/registration/stages";
import { SponsorForm } from "components/registration/forms/sponsor";

const RegistrationPage = () => {
  return (
    <div>
      <Stages>
        <SponsorForm />
      </Stages>
    </div>
  );
};

export default RegistrationPage;
