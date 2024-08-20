type RowResponse = {
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
};

type TreeRowResponse = RowResponse & {
  child: TreeRowResponse;
};

type TreeResponse = TreeRowResponse[];

type EntityResponse = {
  id: number;
  rowName: string;
};

type OutlayRowRequest = {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId: number;
  rowName: string;
  salary: number;
  supportCosts: number;
};

type OutlayRowUpdateRequest = Omit<OutlayRowRequest, "parentId">;

type OutlayRowFullRequest = {
  eID: number;
  request: OutlayRowRequest;
};

type OutlayRowUpdateFullRequest = {
  eID: number;
  rID: number;
  request: OutlayRowUpdateRequest;
};

type OutlayRowDeleteRequest = {
  eID: number;
  rID: number;
};

type RecalculatedRows = {
  changed: RowResponse[];
  current: RowResponse;
};

export {
  TreeRowResponse,
  TreeResponse,
  EntityResponse,
  OutlayRowFullRequest,
  RecalculatedRows,
  OutlayRowUpdateFullRequest,
  OutlayRowDeleteRequest,
};
