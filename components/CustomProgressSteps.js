import { ProgressSteps } from '@tkkortit/own-stepper'
import React from 'react'
import { Dimensions } from 'react-native'
import { colors } from '../constants/colors'
import { dimensions } from '../constants/dimensions'

export default function CustomProgressSteps({ children, getRef, startStep = 0, activeStep = 0 }) {

  const { width, height } = Dimensions.get('window')


  return (
    <ProgressSteps
      ref={getRef}
      completedProgressBarColor={colors.progressBarCompletedColor}
      completedStepIconColor={colors.progressDoneIconColor}
      progressBarColor={colors.progressBarNotCompletedColor}
      activeStepNumColor={colors.progressNumColor}
      activeStepIconBorderColor={colors.progressActiveIconColor}
      disabledStepIconColor={colors.progressNotDoneIconColor}
      marginBottom={height <= dimensions.phoneMaxHeight ? 60 : 200}
      startStep={startStep}
      activeStep={activeStep}
    >
      {children}
    </ProgressSteps>
  )

}