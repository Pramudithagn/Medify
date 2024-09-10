import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I book an appointment with a doctor?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To book an appointment, log in to your account, navigate to the "Appointments" page, and select the doctor and time slot that best fits your schedule. Once you've confirmed the details, click on "Book Appointment."
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I view my medical records online?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, you can access your medical records by logging into your account and visiting the "Medical Records" page. There, you'll find details about your past diagnoses, treatments, and prescriptions.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I pay my medical bills?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can pay your medical bills online via the "Payments" page. Select the unpaid bill, choose your preferred payment method, and follow the instructions to complete the transaction.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I contact my doctor?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can contact your assigned doctor by booking a consultation via the "Appointments" page. For urgent concerns, please visit your nearest healthcare center.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I update my personal information?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To update your personal information, you will have to ask for it from the administration. You can update details such as your address, contact information, and emergency contacts.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
