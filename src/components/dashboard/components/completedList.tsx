import Stack from '@mui/material/Stack';
import { ICompletedMode } from '../types';
import ModeCard from './modeCard';
import Box from '@mui/material/Box';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { GameThemeContext } from '@/providers/theme/themeContext';
interface IProps {
    completedModes: ICompletedMode[]
}
const CompletedList = ({completedModes}: IProps) => {
    const {theme} = useContext(GameThemeContext);
    return (
        <Stack spacing={2}>
            {
                completedModes.length == 0 
                ? (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 4,
                            px: 2,
                            borderRadius: 4,
                            backgroundColor:
                            theme.palette.mode === 'light'
                                ? 'rgba(0,0,0,0.04)'
                                : 'rgba(255,255,255,0.02)',
                            border: `1px dashed ${theme.palette.divider}`,
                        }}
                        >
                        <SentimentDissatisfiedIcon
                            sx={{
                            fontSize: 50,
                            mb: 1,
                            color: theme.palette.text.secondary,
                            }}
                        />
                        <Typography
                            variant="h6"
                            fontWeight={500}
                            color="text.secondary"
                        >
                            You haven’t completed any level yet!
                        </Typography>
                    </Box>
                )
                : (
                    completedModes.map((completed) => (
                        <ModeCard
                            key={completed.mode}
                            modeData={completed}
                        />
                    ))

                )
            }
        </Stack>
    )

}

export default CompletedList