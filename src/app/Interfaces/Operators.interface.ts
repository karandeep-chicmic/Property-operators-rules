export interface operators {
  startsWith?: boolean;
  endsWith?: boolean;
  includes?: boolean;
  domainName?: boolean;
  beforeDate?: boolean;
  afterDate?: boolean;
  lessThan?: boolean;
  greaterThan?: boolean;
  status?: boolean;
  equalsTo?: boolean;
}

export interface properties {
  id?: number;
  name?: string;
  type?: string;
  active?: boolean;
  operators?: operators;
  index?: number;
}

export interface rules {
  property?: string;
  operators?: string;
  value?: string;
}

export interface criteria {
  id?: number;
  name?: string;
  rules?: rules[];
}

export interface userData {
  id?: number;
  userId?: number;
  name?: string;
  email?: string;
  phone_number?: number;
  date?: string;
  salary?: number;
}

export interface criteriaSatisfies {
  id?: number;
  fieldName?: string;
  criteria?: string[];
}
