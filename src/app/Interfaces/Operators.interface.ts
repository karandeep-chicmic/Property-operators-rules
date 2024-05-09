export interface operators {
  startsWith?: boolean;
  endsWith?: boolean;
  includes?: boolean;
  domainName?: boolean;
  usa?: boolean;
  india?: boolean;
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
}
