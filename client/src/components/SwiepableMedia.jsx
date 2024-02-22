import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';


export default function SwipeableMedia({ media }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = media.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: 255, maxWidth: 400, width: '100%', position: 'relative' }} >
        <img src={media[activeStep]} width={`100%`} height={`100%`} style={{ objectFit: 'cover' }} />
        <Box
          sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', opacity: 0.8 }}
          width="100%"
          bgcolor={theme.palette.background.default}
          p={1}
        >
          <TextField
            fullWidth
            variant='standard'
            name='text'
          />
        </Box>
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box >
  );
}
