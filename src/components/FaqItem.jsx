import { styled } from '@mui/system';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: 'transparent',
  border: 0,
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary 
    {...props}
  />
))(({ theme }) => ({
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  '&.Mui-expanded': {
    backgroundColor: "#8888881A",
    '& .MuiAccordionSummary-content': {
      color: "var(--color-text2)"
    },
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(45deg)',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    borderRadius: 20,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  backgroundColor: '#8888881A'
}));


function FaqItem (props) {
  return (
    <Accordion className="faq-item">
      <AccordionSummary
        className="question"
        expandIcon={<AddIcon className="btn-expand" sx={{fontSize:18}} />}
      >
        {props.question}
      </AccordionSummary>
      <AccordionDetails className="answer">
        {props.answer}
      </AccordionDetails>
    </Accordion>
  )
}

export default FaqItem;