import { Report } from "@/types/report";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function ReportViewer({ report }: { report: Report }) {
    return (
        <Box sx={{ p: 2, flex: 1 }}>
      <Typography variant="h6">Report #{report.id}</Typography>
      <Typography>Email: {report.email}</Typography>
      <Typography>Date: {new Date(report.createdAt).toLocaleString()}</Typography>
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