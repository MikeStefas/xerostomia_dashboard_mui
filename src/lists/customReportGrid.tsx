import { Report } from "@/types/report";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { memo } from "react";

function CustomReportGrid({
  reports,
  setSelectedReportID,
}: {
  reports: Report[];
  setSelectedReportID: (id: number) => void;
}) {
  //id needed for datagrid
  const rows = reports.map((report) => ({
    id: report.reportId,
    reportId: report.reportId,
    userID: report.userID,
    createdAt: report.createdAt,
    tongue: report.tongue,
    tonguePercentage: report.tonguePercentage,
    teeth: report.teeth,
    teethPercentage: report.teethPercentage,
    saliva: report.saliva,
    salivaPercentage: report.salivaPercentage,
    pain: report.pain,
    painPercentage: report.painPercentage,
  }));
  const columns: GridColDef[] = [
    { field: "reportId", headerName: "reportID", width: 70 },
    { field: "userID", headerName: "userID", width: 70 },
    { field: "createdAt", headerName: "Date", width: 130 },
    { field: "tongue", headerName: "Tongue", width: 130 },
    { field: "tonguePercentage", headerName: "Tongue %", width: 130 },
    { field: "teeth", headerName: "Teeth", width: 130 },
    { field: "teethPercentage", headerName: "Teeth %", width: 130 },
    { field: "saliva", headerName: "Saliva", width: 130 },
    { field: "salivaPercentage", headerName: "Saliva %", width: 130 },
    { field: "pain", headerName: "Pain", width: 130 },
    { field: "painPercentage", headerName: "Pain %", width: 130 },
  ];
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      onRowClick={(params) => {
        // params.row contains the entire row object
        setSelectedReportID(params.row.reportId);
      }}
    ></DataGrid>
  );
}

export default memo(CustomReportGrid);
