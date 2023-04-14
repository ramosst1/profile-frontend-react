
export interface IProfileAddressModel {
  profileId: number;
  addressId: number;
  address1: string;
  address2: string;
  city: string;
  stateAbrev: string;
  zipCode: string;
  isPrimary: boolean;
  isSecondary: boolean;
};

export interface IProfileAddressCreateModel {
  address1: string;
  address2: string;
  city: string;
  stateAbrev: string;
  zipCode: string;
  isPrimary: boolean;
  isSecondary: boolean;
};

export interface IProfileAddressUpdateModel {
  profileId: number;
  addressId: number;
  address1: string;
  address2: string;
  city: string;
  stateAbrev: string;
  zipCode: string;
  isPrimary: boolean;
  isSecondary: boolean;
};

export interface IProfileModel {
  profileId: number;
  firstName: string;
  lastName: string;
  active: boolean;
  addresses: IProfileAddressModel [] ;
};

export interface IProfileCreateModel {
  firstName: string;
  lastName: string;
  active: boolean;
  addresses: IProfileAddressCreateModel [] ;
};

export interface IProfileUpdateModel {
  profileId: number;
  firstName: string;
  lastName: string;
  active: boolean;
  addresses: IProfileAddressUpdateModel [] ;
}
