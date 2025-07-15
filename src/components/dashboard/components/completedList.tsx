import Stack from '@mui/material/Stack'
import { ICompletedMode } from '../types'
import ModeCard from './modeCard'
interface IProps {
    completedModes: ICompletedMode[]
}
const CompletedList = ({completedModes}: IProps) => {
    return (
        <Stack spacing={2}>
            {
                completedModes.map((completed) => (
                    <ModeCard
                        key={completed.mode}
                        modeData={completed}
                    />
                ))
            }
        </Stack>
    )

}

export default CompletedList