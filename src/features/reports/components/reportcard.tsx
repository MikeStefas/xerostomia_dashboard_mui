import { Report } from "../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function ReportCard({ report, setselectedReportID }: { report: Report, setselectedReportID: (id: number | null) => void }) {
  return (
    <Box sx={{p:5}}>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={() => setselectedReportID(null)}> <ArrowBackIcon /> </Button>
      </Stack>
      <Typography variant="h6">Report #{report.reportId}</Typography>

      <Typography>
        Date: {new Date(report.createdAt).toLocaleString()}
      </Typography>
      <Typography>
        Tongue: {report.tongue} ({report.tonguePercentage}%)
      </Typography>
      <Typography>
        Teeth: {report.teeth} ({report.teethPercentage}%)
      </Typography>
      <Typography>
        Saliva: {report.saliva} ({report.salivaPercentage}%)
      </Typography>
      <Typography>
        Pain: {report.pain} ({report.painPercentage}%)
      </Typography>
    </Box>
  );
}
