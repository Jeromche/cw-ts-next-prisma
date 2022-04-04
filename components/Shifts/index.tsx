import Timer from '../../components/Timer';
import ShiftList from '../../components/ShiftList';
import { ShiftProvider } from "../../store";
import styles from './Shifts.module.css'

const Shifts: React.FC = () => (
  <ShiftProvider>
    <div className={styles.container}>
      <Timer />
      <ShiftList />
    </div>
  </ShiftProvider>
)

export default Shifts
