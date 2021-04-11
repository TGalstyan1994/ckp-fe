import React, { useState } from 'react';
import { Input } from 'ui/components/common/input';

const PersonalDetailsForm: React.FC = () => {
  const [objective, setObjective] = useState<string>('');
  const [objectiveNote, setObjectiveNote] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [maritalStatus, setMaritalStatus] = useState<string>('');
  const [isEmployed, setEmployed] = useState<boolean>(false);
  const [isOwner, setOwner] = useState<boolean>(false);
  const [haveTrade, setTrade] = useState<boolean>(false);
  const [haveTechSkills, setTechSkills] = useState<boolean>(false);
  const [haveAthleticSkills, setAthleticSkills] = useState<boolean>(false);
  const [haveDependend, setDependend] = useState<boolean>(false);
  const [beneficiaryName, setBeneficiaryName] = useState<string>('');
  const [
    beneficiaryRelationship,
    setBeneficiaryRelationship,
  ] = useState<string>('');
  const [beneficiaryPhone, setBeneficiaryPhone] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [isConditionsAccepted, setAccepted] = useState<string>('');
  return (
    <div>
      <select>
        <option>Start a business</option>
        <option>Buy income generating property</option>
        <option>Secure college funds</option>
        <option>Home ownership</option>
        <option>Better health care</option>
        <option>Dream vacation</option>
        <option>Furnish home</option>
        <option>Buy new vehicle</option>
        <option>Other</option>
      </select>
      <textarea
        value={objectiveNote}
        onChange={({ target }) => setObjectiveNote(target.value)}
      />
      <Input
        label={'First name'}
        placeholder={'First name'}
        value={firstName}
        onChange={(val) => setFirstName(val)}
        required
      />
      <Input
        label={'Last name'}
        placeholder={'Last name'}
        value={lastName}
        onChange={(val) => setLastName(val)}
        required
      />
      <Input
        label={'Phone number'}
        placeholder={'Phone number'}
        value={phone}
        onChange={(val) => setPhone(val)}
        required
      />
      <Input
        label={'Address'}
        placeholder={'Address'}
        value={address}
        onChange={(val) => setAddress(val)}
        required
      />
    </div>
  );
};

export default PersonalDetailsForm
